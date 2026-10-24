import { describe, it, expect, vi, afterEach } from 'vitest';
import { normalizeConfig, setPath, getPath } from '../src/model/config';
import { toSetViews, orderOptions, optionCall, configuredSets } from '../src/model/sets';
import { resolveButtonStyle, buttonVars, textVars, BUTTON_DEFAULTS } from '../src/model/style';
import { barRange, barTicks, toFraction, fromFraction, nearestHandle } from '../src/model/bar';
import { toChipView, chipToggleCall, defaultPopupCard, formatRemaining, spinSeconds } from '../src/model/chips';
import { toTempAdjustModel, nudge } from '../src/model/setpoint';
import { SetpointController, WRITE_DEBOUNCE_MS, RECONCILE_MS } from '../src/model/setpoint-controller';
import { toClimateView } from '../src/model/climate';
import { climate, fakeHass, RICH, rfFan } from './helpers';
import { LOOKS, applyLook, hasLookKeys } from '../src/model/looks';

const base = { type: 'custom:easy-thermostat-styler-card', entity: 'climate.t' };

describe('normalizeConfig — byte stability', () => {
  it('drops empties and is idempotent', () => {
    const raw = { ...base, name: '', text: { current: {} }, setpoint: { bar: {} }, sets: [{ type: 'hvac', options: {} }], extra: 'kept' };
    const once = normalizeConfig(raw);
    expect(once).toEqual({ ...base, sets: [{ type: 'hvac' }], extra: 'kept' });
    expect(normalizeConfig(once)).toEqual(once);
    expect(JSON.stringify(normalizeConfig(JSON.parse(JSON.stringify(once))))).toBe(JSON.stringify(once));
  });
  it('an untouched minimal config is unchanged', () => {
    expect(normalizeConfig(base)).toEqual(base);
  });
  it('keeps an explicitly empty sets list', () => {
    expect(normalizeConfig({ ...base, sets: [] }).sets).toEqual([]);
  });
  it('clamps numbers and drops chips without an entity', () => {
    const n = normalizeConfig({ ...base, setpoint: { neighbors: 9, scale: 1 }, sets: [{ type: 'chips', chips: [{ type: 'rf_fan', entity: '' }] }] });
    expect(n.setpoint).toEqual({ neighbors: 3, scale: 40 });
    expect(n.sets).toEqual([{ type: 'chips' }]);
  });
  it('requires an entity', () => {
    expect(() => normalizeConfig({ type: 'x' })).toThrow();
  });
});

describe('setPath / getPath', () => {
  it('sets nested and prunes on delete', () => {
    const a = setPath({ ...base }, 'setpoint.bar.ticks', 2);
    expect(getPath(a, 'setpoint.bar.ticks')).toBe(2);
    const b = setPath(a, 'setpoint.bar.ticks', undefined);
    expect(b).toEqual(base);
  });
  it('addresses array items', () => {
    const a = setPath({ ...base, sets: [{ type: 'hvac' }] }, 'sets.0.zone', 'top');
    expect(a.sets).toEqual([{ type: 'hvac', zone: 'top' }]);
  });
});

describe('button sets', () => {
  const { hass } = fakeHass([climate('heat', { ...RICH, temperature: 68 })]);
  it('defaults: hvac full-time, preset and fan behind toggles', () => {
    const v = toSetViews(hass, { ...base });
    expect(v.map((s) => [s.type, s.display])).toEqual([
      ['hvac', 'always'],
      ['preset', 'toggle'],
      ['fan_mode', 'toggle'],
    ]);
    expect(v[0]!.options.find((o) => o.value === 'heat')!.active).toBe(true);
  });
  it('hides sets the entity does not support', () => {
    const { hass: h } = fakeHass([climate('heat', { hvac_modes: ['off', 'heat'], temperature: 68 })]);
    expect(toSetViews(h, { ...base }).map((s) => s.type)).toEqual(['hvac']);
  });
  it('orders, hides, renames and re-icons options', () => {
    const v = toSetViews(hass, {
      ...base,
      sets: [{ type: 'hvac', order: ['cool', 'heat'], options: { off: { hide: true }, heat: { name: 'Warm', icon: 'mdi:x' } } }],
    });
    expect(v[0]!.options.map((o) => o.value)).toEqual(['cool', 'heat', 'heat_cool']);
    expect(v[0]!.options[1]).toMatchObject({ label: 'Warm', icon: 'mdi:x' });
  });
  it('compact forces every set behind a toggle', () => {
    expect(toSetViews(hass, { ...base, compact: true }).every((s) => s.display === 'toggle')).toBe(true);
  });
  it('side zones default to column orientation', () => {
    expect(toSetViews(hass, { ...base, sets: [{ type: 'hvac', zone: 'left' }] })[0]!.orientation).toBe('column');
  });
  it('orderOptions keeps unlisted values in entity order', () => {
    expect(orderOptions(['a', 'b', 'c'], ['c', 'zz'])).toEqual(['c', 'a', 'b']);
  });
  it('service calls', () => {
    expect(optionCall('preset', 'climate.t', 'away')).toEqual({
      domain: 'climate',
      service: 'set_preset_mode',
      data: { entity_id: 'climate.t', preset_mode: 'away' },
    });
    expect(configuredSets({ ...base, sets: [] })).toEqual([]);
  });
});

describe('style resolver — same properties at both levels', () => {
  it('built-in ← card ← set', () => {
    const r = resolveButtonStyle({ radius: 4, variant: 'filled' }, { radius: 20 });
    expect(r.radius).toBe(20);
    expect(r.variant).toBe('filled');
    expect(r.content).toBe(BUTTON_DEFAULTS.content);
  });
  it('vars', () => {
    expect(buttonVars({ radius: 0, active_background: 'var(--primary-color)' })).toMatchObject({
      '--etc-b-radius': '0px',
      '--etc-b-abg': 'var(--primary-color)',
    });
    expect(textVars({ current: { size: 80, italic: false, letter_spacing: 4, opacity: 50 } })).toEqual({
      '--etc-t-cur-fs': '80px',
      '--etc-t-cur-fst': 'normal',
      '--etc-t-cur-ls': '0.04em',
      '--etc-t-cur-op': '0.5',
    });
    expect(textVars(undefined)).toEqual({});
  });
});

describe('setpoint bar geometry', () => {
  const { hass } = fakeHass([climate('heat_cool', { ...RICH, target_temp_low: 68, target_temp_high: 75 })]);
  const model = toTempAdjustModel(hass, base);
  it('uses entity limits, configurable', () => {
    expect(barRange(model, undefined)).toEqual({ min: 45, max: 92 });
    expect(barRange(model, { range_min: 60, range_max: 80 })).toEqual({ min: 60, max: 80 });
    // setpoints outside a too-tight range widen it
    expect(barRange(model, { range_min: 70, range_max: 72 })).toEqual({ min: 68, max: 75 });
  });
  it('maps both ways', () => {
    const r = { min: 60, max: 80 };
    expect(toFraction(70, r)).toBe(0.5);
    expect(fromFraction(0.25, r)).toBe(65);
    expect(toFraction(100, r)).toBe(1);
  });
  it('ticks and labels', () => {
    const t = barTicks({ min: 60, max: 70 }, 1, 5);
    expect(t).toHaveLength(11);
    expect(t.filter((x) => x.label).map((x) => x.value)).toEqual([60, 65, 70]);
    expect(barTicks({ min: 0, max: 10 }, 0, 0)).toEqual([]);
  });
  it('grabs the nearer handle', () => {
    const r = { min: 60, max: 80 };
    expect(nearestHandle(model, toFraction(66, r), r)).toBe('heat');
    expect(nearestHandle(model, toFraction(79, r), r)).toBe('cool');
  });
});

describe('RF fan chip', () => {
  it('finds light + timer on the same device and reads state', () => {
    const ends = new Date(Date.now() + 90 * 60000).toISOString();
    const f = rfFan({ on: true, pct: 50, dir: 'reverse', preset: 'natural', light: true, timer: ends });
    const { hass } = fakeHass(f.entities, { registry: f.registry });
    const v = toChipView(hass, { type: 'rf_fan', entity: 'fan.bedroom' }, 0);
    expect(v).toMatchObject({
      on: true,
      speed: 3,
      direction: 'reverse',
      natural: true,
      lightEntity: 'light.bedroom_fan',
      lightOn: true,
      tap: 'popup',
      hold: 'toggle',
      state: '3',
    });
    expect(v.timerEnds).not.toBeNull();
    expect(v.spin).toBe(spinSeconds(50));
  });
  it('off fan: no speed, no spin', () => {
    const f = rfFan();
    const { hass } = fakeHass(f.entities, { registry: f.registry });
    const v = toChipView(hass, { type: 'rf_fan', entity: 'fan.bedroom' }, 0);
    expect(v).toMatchObject({ on: false, speed: null, spin: null, state: 'Off', timerEnds: null });
  });
  it('toggle calls and default pop-up', () => {
    const f = rfFan({ on: true });
    const { hass } = fakeHass(f.entities, { registry: f.registry });
    const v = toChipView(hass, { type: 'rf_fan', entity: 'fan.bedroom' }, 0);
    expect(chipToggleCall(v, 'toggle')).toEqual({ domain: 'homeassistant', service: 'toggle', data: { entity_id: 'fan.bedroom' } });
    expect(chipToggleCall(v, 'toggle_light')).toEqual({ domain: 'light', service: 'toggle', data: { entity_id: 'light.bedroom_fan' } });
    expect(defaultPopupCard({ type: 'rf_fan', entity: 'fan.bedroom' })).toEqual({ type: 'custom:rf-fan-ltek', fan_entity: 'fan.bedroom' });
    expect(defaultPopupCard({ type: 'entity', entity: 'sensor.x' })).toBeNull();
  });
  it('formats remaining time', () => {
    const now = Date.now();
    expect(formatRemaining(new Date(now + 85 * 60000), now)).toBe('1h25');
    expect(formatRemaining(new Date(now + 9 * 60000), now)).toBe('9m');
  });
});

describe('SetpointController — debounce + optimistic hold', () => {
  afterEach(() => vi.useRealTimers());
  it('coalesces a burst into one write and holds against stale state', () => {
    vi.useFakeTimers();
    const sent: unknown[] = [];
    const { hass } = fakeHass([climate('heat', { ...RICH, temperature: 68 })]);
    const ctl = new SetpointController(() => 'climate.t', (c) => sent.push(c), () => undefined);
    ctl.sync(toTempAdjustModel(hass, base));
    ctl.commit(nudge(ctl.edit!, 1));
    ctl.commit(nudge(ctl.edit!, 1));
    ctl.commit(nudge(ctl.edit!, 1));
    vi.advanceTimersByTime(WRITE_DEBOUNCE_MS + 1);
    expect(sent).toEqual([{ domain: 'climate', service: 'set_temperature', data: { entity_id: 'climate.t', temperature: 71 } }]);
    // stale hass (still 68) must not snap the display back
    ctl.sync(toTempAdjustModel(hass, base));
    expect(ctl.edit!.heat!.value).toBe(71);
    vi.advanceTimersByTime(RECONCILE_MS + 1);
    expect(ctl.edit!.heat!.value).toBe(68);
  });
});

describe('climate view', () => {
  it('infers equipment when hvac_action is absent', () => {
    const { hass } = fakeHass([climate('heat', { ...RICH, temperature: 75 })]);
    expect(toClimateView(hass, base).equipment).toBe('heating');
  });
  it('degrades when unavailable', () => {
    const { hass } = fakeHass([climate('unavailable')]);
    expect(toClimateView(hass, base)).toMatchObject({ available: false, setpoints: null });
  });
});

describe('looks', () => {
  const cfg = { ...base, sets: [{ type: 'hvac' as const }], setpoint: { control: 'bar' as const }, buttons: { radius: 3 }, show_pills: false };
  it('replace style keys, keep sets/setpoint, survive normalize', () => {
    for (const look of LOOKS) {
      const out = normalizeConfig(applyLook(cfg, look));
      expect(out.sets).toEqual(cfg.sets);
      expect(out.setpoint).toEqual(cfg.setpoint);
      expect(normalizeConfig(out)).toEqual(out);
    }
    expect(normalizeConfig(applyLook(cfg, LOOKS[0]!))).toEqual({ ...base, sets: cfg.sets, setpoint: cfg.setpoint });
  });
  it('detects existing style keys', () => {
    expect(hasLookKeys(base)).toBe(false);
    expect(hasLookKeys(cfg)).toBe(true);
  });
  it('applying does not alias the look definition', () => {
    const out = applyLook(base, LOOKS[1]!);
    (out.buttons as { radius?: number }).radius = 1;
    expect(LOOKS[1]!.values.buttons!.radius).toBe(10);
  });
});
