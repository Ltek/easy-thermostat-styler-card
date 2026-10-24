import { describe, it, expect, vi, afterEach } from 'vitest';
import { normalizeConfig, setPath, getPath } from '../src/model/config';
import { toSetViews, orderOptions, optionCall, configuredSets } from '../src/model/sets';
import { resolveButtonStyle, buttonVars, textVars, BUTTON_DEFAULTS } from '../src/model/style';
import { barRange, barTicks, toFraction, fromFraction, nearestHandle } from '../src/model/bar';
import { toChipView, chipToggleCall, defaultPopupCard, formatRemaining, spinSeconds, speedCount, naturalLevelOf } from '../src/model/chips';
import { toTempAdjustModel, nudge } from '../src/model/setpoint';
import { SetpointController, WRITE_DEBOUNCE_MS, RECONCILE_MS } from '../src/model/setpoint-controller';
import { toClimateView } from '../src/model/climate';
import { climate, fakeHass, RICH, rfFan } from './helpers';
import { TEMPLATES, applyTemplate, hasTemplateKeys } from '../src/model/templates';
import { bgState, toBgView, bgItems, baseFill } from '../src/model/background';

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
  it('menu: direction defaults away from the edge; compact leaves menus alone; chips never menu', () => {
    const v = toSetViews(hass, {
      ...base,
      compact: true,
      sets: [
        { type: 'hvac', display: 'menu' },
        { type: 'preset', display: 'menu', zone: 'top' },
        { type: 'fan_mode', display: 'menu', zone: 'left', menu_direction: 'up' },
        { type: 'chips', display: 'menu', chips: [{ type: 'entity', entity: 'climate.t' }] },
      ],
    });
    expect(v.map((s) => [s.type, s.display, s.menuDirection])).toEqual([
      ['hvac', 'menu', 'up'],
      ['preset', 'menu', 'down'],
      ['fan_mode', 'menu', 'up'],
      ['chips', 'toggle', 'up'],
    ]);
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

describe('quick preset templates', () => {
  const chips = { type: 'chips' as const, zone: 'top' as const, chips: [{ type: 'rf_fan' as const, entity: 'fan.bedroom' }] };
  const cfg = {
    ...base,
    sets: [chips, { type: 'hvac' as const, order: ['cool'], options: { off: { hide: true } }, zone: 'left' as const }],
    setpoint: { control: 'wheel' as const, min_gap: 2, bar: { range_min: 60, range_max: 80, look: 'gradient' as const } },
    buttons: { radius: 3 },
  };
  it('every template is valid, byte-stable and keeps the user data', () => {
    for (const tpl of TEMPLATES) {
      const out = normalizeConfig(applyTemplate(cfg, tpl));
      expect(normalizeConfig(out)).toEqual(out);
      expect(out.entity).toBe(base.entity);
      expect(out.sets![0]).toEqual(chips); // chips kept, first
      const h = out.sets!.find((s) => s.type === 'hvac')!;
      expect(h.order).toEqual(['cool']);
      expect(h.options).toEqual({ off: { hide: true } });
      expect(out.setpoint!.min_gap).toBe(2);
      expect(out.setpoint!.bar?.range_min).toBe(60);
      expect(out.buttons?.radius).not.toBe(3); // old styling replaced
    }
  });
  it('templates are genuinely different', () => {
    const sig = (t: (typeof TEMPLATES)[number]) => JSON.stringify([t.values.setpoint?.control ?? 'wheel', t.values.setpoint?.bar?.position, t.values.buttons?.variant, t.values.buttons?.content, t.values.sets?.map((s) => [s.zone, s.display])]);
    expect(new Set(TEMPLATES.map(sig)).size).toBe(TEMPLATES.length);
    const controls = new Set(TEMPLATES.map((t) => t.values.setpoint?.control ?? 'wheel'));
    expect(controls).toEqual(new Set(['wheel', 'bar', 'stepper']));
    const variants = new Set(TEMPLATES.map((t) => t.values.buttons?.variant ?? 'tonal'));
    expect(variants).toEqual(new Set(['tonal', 'filled', 'outlined', 'ghost']));
  });
  it('detects existing keys', () => {
    expect(hasTemplateKeys(base)).toBe(false);
    expect(hasTemplateKeys(cfg)).toBe(true);
  });
  it('applying does not alias the template', () => {
    const out = applyTemplate(base, TEMPLATES[1]!);
    out.sets![0]!.zone = 'right';
    expect(TEMPLATES[1]!.values.sets![0]!.zone).toBe('top');
  });
});

describe('RF fan speeds — auto-detected', () => {
  const tenSpeed = (attrs: Record<string, unknown>) => {
    const f = rfFan({ on: true });
    f.entities[0]!.attributes = { ...f.entities[0]!.attributes, percentage_step: 10, preset_modes: ['normal', 'natural 1', 'natural 2', 'natural 3'], ...attrs };
    return fakeHass(f.entities, { registry: f.registry }).hass;
  };
  it('speed count from percentage_step', () => {
    expect(speedCount({ percentage_step: 10 })).toBe(10);
    expect(speedCount({ percentage_step: 100 / 6 })).toBe(6);
    expect(speedCount({ percentage_step: 100 / 3 })).toBe(3);
    expect(speedCount({ speed_count: 8, percentage_step: 10 })).toBe(8);
    expect(speedCount({})).toBeNull();
  });
  it('10 speeds: 40% is speed 4; formats', () => {
    const hass = tenSpeed({ percentage: 40 });
    expect(toChipView(hass, { type: 'rf_fan', entity: 'fan.bedroom' }, 0)).toMatchObject({ speed: 4, speedCount: 10, state: '4', naturalLevels: 3 });
    expect(toChipView(hass, { type: 'rf_fan', entity: 'fan.bedroom', speed_format: 'fraction' }, 0).state).toBe('4/10');
    expect(toChipView(hass, { type: 'rf_fan', entity: 'fan.bedroom', speed_format: 'percent' }, 0).state).toBe('40%');
    expect(toChipView(tenSpeed({ percentage: 100 }), { type: 'rf_fan', entity: 'fan.bedroom' }, 0).speed).toBe(10);
  });
  it('Breeze level replaces the speed', () => {
    const v = toChipView(tenSpeed({ percentage: 70, preset_mode: 'natural 2' }), { type: 'rf_fan', entity: 'fan.bedroom' }, 0);
    expect(v).toMatchObject({ natural: true, naturalLevel: 2, state: '2' });
  });
  it('single natural mode has no level', () => {
    expect(naturalLevelOf('natural')).toBeNull();
    expect(naturalLevelOf('natural 3')).toBe(3);
    expect(naturalLevelOf('normal')).toBeNull();
  });
});

describe('moving background', () => {
  const view = (state: string, attrs: Record<string, unknown>, extra: Record<string, unknown> = {}) => {
    const { hass } = fakeHass([climate(state, { ...RICH, ...attrs })]);
    const cfg = { ...base, background: { style: 'plasma' as const, ...extra } };
    return { hass, cfg, v: toClimateView(hass, cfg) };
  };
  it('state from what the system is doing', () => {
    const s = (state: string, attrs: Record<string, unknown>) => {
      const x = view(state, attrs);
      return bgState(x.hass, x.cfg, x.v);
    };
    expect(s('heat', { temperature: 72, hvac_action: 'heating' })).toBe('heating');
    expect(s('cool', { temperature: 70, hvac_action: 'cooling' })).toBe('cooling');
    expect(s('heat', { temperature: 72, hvac_action: 'idle' })).toBe('idle_heat');
    expect(s('cool', { temperature: 72, hvac_action: 'idle' })).toBe('idle_cool');
    expect(s('heat_cool', { target_temp_low: 68, target_temp_high: 74, current_temperature: 73, hvac_action: 'idle' })).toBe('idle_cool');
    expect(s('heat_cool', { target_temp_low: 68, target_temp_high: 74, current_temperature: 69, hvac_action: 'idle' })).toBe('idle_heat');
    expect(s('fan_only', {})).toBe('fan');
    expect(s('off', {})).toBe('off');
    expect(s('unavailable', {})).toBe('off');
  });
  it('a running ceiling fan swirls the background at its speed', () => {
    const f = rfFan({ on: true, pct: 90 });
    const { hass } = fakeHass([climate('heat', { ...RICH, temperature: 72, hvac_action: 'idle' }), ...f.entities], { registry: f.registry });
    const cfg = { ...base, background: { style: 'aurora' as const, fan_entity: 'fan.bedroom' } };
    const bv = toBgView(hass, cfg, toClimateView(hass, cfg))!;
    expect(bv).toMatchObject({ state: 'fan', dir: 'swirl', blades: true });
    expect(bv.rate).toBe(2.75); // 0.4 + 2.6 × 0.9 = 2.74 → nearest quarter
  });
  it('the further from the setpoint, the faster and stronger', () => {
    const near = view('heat', { temperature: 72, current_temperature: 71.5, hvac_action: 'heating' });
    const far = view('heat', { temperature: 72, current_temperature: 64, hvac_action: 'heating' });
    const a = toBgView(near.hass, near.cfg, near.v)!;
    const b = toBgView(far.hass, far.cfg, far.v)!;
    expect(b.rate).toBeGreaterThan(a.rate);
    expect(b.opacity).toBeGreaterThan(a.opacity);
    const flat = view('heat', { temperature: 72, current_temperature: 64, hvac_action: 'heating' }, { follow_gap: false });
    expect(toBgView(flat.hass, flat.cfg, flat.v)!.rate).toBe(toBgView(near.hass, { ...near.cfg, background: { style: 'plasma', follow_gap: false } }, near.v)!.rate);
  });
  it('idle drifts very slowly; speed and strength scale it; own colours win', () => {
    const idle = view('heat', { temperature: 72, hvac_action: 'idle' }, { speed: 200, strength: 50, colors: { idle_heat: { main: '#123456' } } });
    const bv = toBgView(idle.hass, idle.cfg, idle.v)!;
    expect(bv).toMatchObject({ state: 'idle_heat', dir: 'up', rate: 0.75, opacity: 0.28, main: '#123456' });
    expect(bv.second).toBe('#7a3d14');
  });
  it('layout is deterministic and lighter on the light setting', () => {
    expect(bgItems('particles', 'smooth')).toEqual(bgItems('particles', 'smooth'));
    expect(bgItems('particles', 'smooth')).toHaveLength(22);
    expect(bgItems('particles', 'light')).toHaveLength(10);
    expect(bgItems('flow', 'smooth')).toEqual([]);
  });
  it('base fill: colour, gradient (needs 2 stops), legacy card.background', () => {
    expect(baseFill({ ...base, background: { fill: 'gradient', gradient: { type: 'radial', stops: ['#000', '#fff'] } } })).toBe('radial-gradient(circle at 50% 40%, #000, #fff)');
    expect(baseFill({ ...base, background: { fill: 'gradient', gradient: { stops: ['#000'] } } })).toBeUndefined();
    expect(baseFill({ ...base, card: { background: '#111' } })).toBe('#111');
    expect(baseFill({ ...base, card: { background: '#111' }, background: { color: 'transparent' } })).toBe('transparent');
  });
  it('templates keep the user image', () => {
    const cfg = { ...base, background: { fill: 'image' as const, image: { url: '/local/x.jpg' } } };
    for (const tpl of TEMPLATES) {
      const out = applyTemplate(cfg, tpl);
      expect(out.background?.fill).toBe('image');
      expect(out.background?.image?.url).toBe('/local/x.jpg');
    }
  });
});
