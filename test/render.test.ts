// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import '../src/easy-thermostat-styler-card';
import type { EasyThermostatStylerCard } from '../src/card';
import type { EasyThermostatStylerCardEditor } from '../src/editor/editor';
import { WRITE_DEBOUNCE_MS } from '../src/model/setpoint-controller';
import { climate, fakeHass, RICH, rfFan } from './helpers';

const base = { type: 'custom:easy-thermostat-styler-card', entity: 'climate.t' };

async function mount(config: Record<string, unknown>, hass = fakeHass([climate('heat', { ...RICH, temperature: 68, hvac_action: 'heating' })])) {
  const el = document.createElement('easy-thermostat-styler-card') as EasyThermostatStylerCard;
  el.setConfig({ ...base, ...config });
  el.hass = hass.hass;
  document.body.appendChild(el);
  await el.updateComplete;
  return { el, root: el.shadowRoot!, calls: hass.calls, hass: hass.hass };
}

afterEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  vi.useRealTimers();
});

describe('card render', () => {
  it('core: name, status, current, pills, wheel; glow while heating', async () => {
    const { root } = await mount({});
    expect(root.querySelector('.name')!.textContent).toContain('Hallway');
    expect(root.querySelector('.status')!.textContent).toContain('Heating');
    expect(root.querySelector('.current')!.textContent).toContain('72');
    expect(root.querySelector('.pill.heat')!.textContent).toContain('68');
    expect(root.querySelector('.wheel .bubble')!.textContent).toContain('68');
    expect(root.querySelectorAll('.wheel .nb')).toHaveLength(2);
    expect(root.querySelector('ha-card')!.classList.contains('glow')).toBe(true);
  });

  it('wheel neighbours 0–3 and ± hidden', async () => {
    const { root } = await mount({ setpoint: { neighbors: 3, nudge: 'hidden' } });
    expect(root.querySelectorAll('.wheel .nb')).toHaveLength(6);
    expect(root.querySelector('.wheel .round')).toBeNull();
  });

  it('+ coalesces into one set_temperature', async () => {
    vi.useFakeTimers();
    const { root, calls, el } = await mount({});
    const plus = () => root.querySelector<HTMLButtonElement>('.wheel [aria-label="Increase"]')!;
    plus().click();
    await el.updateComplete;
    plus().click();
    await el.updateComplete;
    expect(root.querySelector('.bubble')!.textContent).toContain('70');
    vi.advanceTimersByTime(WRITE_DEBOUNCE_MS + 5);
    expect(calls).toEqual([{ domain: 'climate', service: 'set_temperature', data: { entity_id: 'climate.t', temperature: 70 } }]);
  });

  it('stepper and none controls', async () => {
    const s = await mount({ setpoint: { control: 'stepper', position: 'center' } });
    expect(s.root.querySelector('.ctl-center .stepper .sv')!.textContent).toContain('68');
    document.body.innerHTML = '';
    const n = await mount({ setpoint: { control: 'none' } });
    expect(n.root.querySelector('.wheel, .stepper, .bar')).toBeNull();
  });

  it('bar: zones, both handles, flags, ticks, current marker in heat/cool', async () => {
    const h = fakeHass([climate('heat_cool', { ...RICH, target_temp_low: 68, target_temp_high: 75 })]);
    const { root } = await mount({ setpoint: { control: 'bar', bar: { range_min: 60, range_max: 80 } } }, h);
    expect(root.querySelectorAll('.bar .handle')).toHaveLength(2);
    expect(root.querySelectorAll('.bar .flag')).toHaveLength(2);
    expect(root.querySelector('.seg.comfort')).not.toBeNull();
    expect(root.querySelectorAll('.tick-l').length).toBe(5); // 60 65 70 75 80
    expect((root.querySelector('.marker') as HTMLElement).style.left).toBe('60.000%'); // 72 in 60..80
    expect((root.querySelector('.handle.heat') as HTMLElement).style.left).toBe('40.000%');
  });

  it('bar keyboard nudges respect the min gap (pushes the other setpoint)', async () => {
    vi.useFakeTimers();
    const h = fakeHass([climate('heat_cool', { ...RICH, target_temp_low: 70, target_temp_high: 73 })]);
    const { root, calls, el } = await mount({ setpoint: { control: 'bar' } }, h);
    const heat = root.querySelector<HTMLElement>('.handle.heat')!;
    heat.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;
    vi.advanceTimersByTime(WRITE_DEBOUNCE_MS + 5);
    expect(calls[0]!.data).toEqual({ entity_id: 'climate.t', target_temp_low: 71, target_temp_high: 74 });
  });

  it('vertical bar beside the core: bottom-anchored handles, drag uses Y', async () => {
    vi.useFakeTimers();
    const h = fakeHass([climate('heat', { ...RICH, temperature: 70 })]);
    const { root, el, calls } = await mount({ setpoint: { control: 'bar', bar: { position: 'right', range_min: 60, range_max: 80 } } }, h);
    const bar = root.querySelector('.core-row > .bar.vertical')!;
    expect(bar).not.toBeNull();
    const handle = root.querySelector<HTMLElement>('.handle.heat')!;
    expect(handle.style.bottom).toBe('50.000%');
    expect(handle.style.left).toBe('');
    const track = root.querySelector<HTMLElement>('.track')!;
    track.getBoundingClientRect = () => ({ left: 0, right: 14, top: 0, bottom: 200, width: 14, height: 200, x: 0, y: 0, toJSON() {} }) as DOMRect;
    // 25% up from the bottom = 65°
    track.dispatchEvent(new PointerEvent('pointerdown', { clientX: 7, clientY: 150, pointerId: 1 }));
    track.dispatchEvent(new PointerEvent('pointerup', { clientX: 7, clientY: 150, pointerId: 1 }));
    await el.updateComplete;
    vi.advanceTimersByTime(WRITE_DEBOUNCE_MS + 5);
    expect(calls.at(-1)!.data).toEqual({ entity_id: 'climate.t', temperature: 65 });
  });

  it('expandable menu: one trigger shows the active value; picking an item calls the service and closes', async () => {
    const { root, el, calls } = await mount({ sets: [{ type: 'hvac', display: 'menu' }, { type: 'preset', display: 'menu' }] });
    const row = root.querySelector('.zone.bottom .menus')!;
    expect(row.querySelectorAll('.menu')).toHaveLength(2); // both menus share one row
    const trigger = root.querySelector<HTMLButtonElement>('.menu .mt')!;
    expect(trigger.querySelector('.mt-name')!.textContent).toBe('Mode');
    expect(trigger.querySelector('.mt-value')!.textContent).toBe('Heat');
    expect(root.querySelector('.menu')!.classList.contains('d-up')).toBe(true);
    trigger.click();
    await el.updateComplete;
    const list = root.querySelector<HTMLElement>('.menu-list')!;
    const open = list.matches?.(':popover-open') || root.querySelector('.menu')!.classList.contains('open');
    expect(open).toBe(true);
    expect(list.querySelector('.mi.active')!.textContent!.trim()).toBe('Heat');
    list.querySelectorAll<HTMLButtonElement>('.mi')[2]!.click(); // cool
    await el.updateComplete;
    expect(calls.at(-1)).toEqual({ domain: 'climate', service: 'set_hvac_mode', data: { entity_id: 'climate.t', hvac_mode: 'cool' } });
    expect(root.querySelector('.menu')!.classList.contains('open')).toBe(false);
  });

  describe('tap to reveal', () => {
    const tapCfg = (extra: Record<string, unknown> = {}) => ({ setpoint: { reveal: 'tap', hide_after: 5, ...extra } });

    it('closed: shows the collapsed bubble; tapping the current temperature opens; auto-closes after N s', async () => {
      vi.useFakeTimers();
      const { root, el } = await mount(tapCfg());
      expect(root.querySelector('.wheel')).toBeNull();
      expect(root.querySelector('.collapsed .bubble')!.textContent).toContain('68');
      root.querySelector<HTMLButtonElement>('button.current')!.click();
      await el.updateComplete;
      expect(root.querySelector('.wheel')).not.toBeNull();
      // use resets the countdown
      vi.advanceTimersByTime(4000);
      root.querySelector<HTMLButtonElement>('.wheel [aria-label="Increase"]')!.click();
      vi.advanceTimersByTime(4000);
      await el.updateComplete;
      expect(root.querySelector('.wheel')).not.toBeNull();
      vi.advanceTimersByTime(1500);
      await el.updateComplete;
      expect(root.querySelector('.wheel')).toBeNull();
    });

    it('collapsed: hidden + open in place of the current temperature', async () => {
      const { root, el } = await mount(tapCfg({ collapsed: 'hidden', open_in: 'current', reveal_from: 'pills' }));
      expect(root.querySelector('.collapsed')).toBeNull();
      expect(root.querySelector('button.current')).toBeNull(); // only the pill opens it
      root.querySelector<HTMLButtonElement>('.pill.heat')!.click();
      await el.updateComplete;
      expect(root.querySelector('.in-current .wheel')).not.toBeNull();
      expect(root.querySelector('.current')).toBeNull();
      root.querySelector<HTMLButtonElement>('.pill.heat')!.click(); // same pill closes
      await el.updateComplete;
      expect(root.querySelector('.wheel')).toBeNull();
      expect(root.querySelector('.current')).not.toBeNull();
    });

    it('bar: collapsed shows a read-only bar that opens on tap', async () => {
      const { root, el } = await mount({ setpoint: { control: 'bar', reveal: 'tap' } });
      expect(root.querySelector('.bar-c .track.ro')).not.toBeNull();
      expect(root.querySelector('.bar-c .handle[role="slider"]')).toBeNull();
      root.querySelector<HTMLElement>('.bar-c')!.click();
      await el.updateComplete;
      expect(root.querySelector('.track:not(.ro)')).not.toBeNull();
    });

    it('hide_after 0 stays open', async () => {
      vi.useFakeTimers();
      const { root, el } = await mount(tapCfg({ hide_after: 0 }));
      root.querySelector<HTMLButtonElement>('.collapsed')!.click();
      vi.advanceTimersByTime(600000);
      await el.updateComplete;
      expect(root.querySelector('.wheel')).not.toBeNull();
    });
  });

  it('centered core: the info block does not stretch (the whole row centres)', async () => {
    const { root } = await mount({});
    const css = (root.host.constructor as unknown as { styles: { cssText: string } }).styles.cssText;
    expect(css).not.toMatch(/pos-right \.main\s*\{\s*flex:\s*1/);
    expect(root.querySelector('.core.al-center')).not.toBeNull();
  });

  it('hvac set full-time; preset/fan behind toggles that remember state', async () => {
    const { root, calls, el } = await mount({});
    expect(root.querySelectorAll('.set.t-hvac .btn')).toHaveLength(4);
    expect(root.querySelector('.set.t-preset')).toBeNull();
    const tgl = [...root.querySelectorAll<HTMLButtonElement>('.tgl')];
    expect(tgl.map((t) => t.textContent!.trim())).toEqual(['Preset', 'Fan']);
    tgl[0]!.click();
    await el.updateComplete;
    expect(root.querySelectorAll('.set.t-preset .btn')).toHaveLength(3);
    expect(localStorage.getItem('easy-thermostat-styler-card:open:climate.t')).toContain('preset-1');
    root.querySelector<HTMLButtonElement>('.set.t-hvac .btn[title="Cool"]')!.click();
    expect(calls.at(-1)).toEqual({ domain: 'climate', service: 'set_hvac_mode', data: { entity_id: 'climate.t', hvac_mode: 'cool' } });
  });

  it('sets go to their zone with orientation + columns', async () => {
    const { root } = await mount({ sets: [{ type: 'hvac', zone: 'right' }, { type: 'preset', zone: 'top', columns: 2 }] });
    expect(root.querySelector('.zone.right .set.t-hvac.o-column')).not.toBeNull();
    const top = root.querySelector<HTMLElement>('.zone.top .set.t-preset')!;
    expect(top.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))');
  });

  it('per-set button style overrides the card default via custom properties', async () => {
    const { root } = await mount({ buttons: { radius: 4, variant: 'filled' }, sets: [{ type: 'hvac', style: { radius: 22 } }] });
    const set = root.querySelector<HTMLElement>('.set.t-hvac')!;
    expect(set.classList.contains('v-filled')).toBe(true);
    expect(set.style.getPropertyValue('--etc-b-radius')).toBe('22px');
  });

  it('text styles land as custom properties on ha-card', async () => {
    const { root } = await mount({ text: { current: { size: 96, color: 'var(--primary-color)' } } });
    const card = root.querySelector<HTMLElement>('ha-card')!;
    expect(card.style.getPropertyValue('--etc-t-cur-fs')).toBe('96px');
    expect(card.style.getPropertyValue('--etc-t-cur-c')).toBe('var(--primary-color)');
  });

  it('RF fan chip: state, tap → more-info fallback, hold → toggle', async () => {
    vi.useFakeTimers();
    const f = rfFan({ on: true, pct: 100, light: true });
    const h = fakeHass([climate('heat', { ...RICH, temperature: 68 }), ...f.entities], { registry: f.registry });
    const { root, calls, el } = await mount({ sets: [{ type: 'chips', zone: 'top', chips: [{ type: 'rf_fan', entity: 'fan.bedroom' }] }] }, h);
    const chip = root.querySelector<HTMLButtonElement>('.chip')!;
    expect(chip.classList.contains('on')).toBe(true);
    expect(chip.querySelector('.badge')!.textContent).toBe('6');
    expect(chip.querySelector('.extra.light')).not.toBeNull();
    // rf-fan-ltek is not registered in the test → tap falls back to more-info
    const info = vi.fn();
    el.addEventListener('hass-more-info', info);
    chip.click();
    expect(info).toHaveBeenCalledOnce();
    // hold
    chip.dispatchEvent(new PointerEvent('pointerdown', { button: 0, pointerType: 'touch' }));
    vi.advanceTimersByTime(600);
    expect(calls.at(-1)).toEqual({ domain: 'homeassistant', service: 'toggle', data: { entity_id: 'fan.bedroom' } });
  });

  it('every card instance shares one stylesheet (no per-config CSS)', async () => {
    const a = await mount({ text: { current: { size: 40 } } });
    const b = await mount({ buttons: { radius: 2 }, setpoint: { control: 'bar' } });
    const css = (r: ShadowRoot) =>
      r.adoptedStyleSheets?.length
        ? r.adoptedStyleSheets.map((s) => [...s.cssRules].map((x) => x.cssText).join('\n'))
        : [...r.querySelectorAll('style')].map((s) => s.textContent);
    expect(css(a.root)).toEqual(css(b.root));
    expect(css(a.root).join('')).not.toContain('40px');
  });

  it('unavailable entity renders a quiet shell', async () => {
    const { root } = await mount({}, fakeHass([climate('unavailable')]));
    expect(root.querySelector('.unavailable-msg')).not.toBeNull();
  });
});

describe('editor', () => {
  async function editor(config: Record<string, unknown>) {
    const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
    el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 })]).hass;
    el.setConfig({ ...base, ...config } as never);
    document.body.appendChild(el);
    await el.updateComplete;
    const events: Record<string, unknown>[] = [];
    el.addEventListener('config-changed', (e) => events.push((e as CustomEvent).detail.config));
    return { el, root: el.shadowRoot!, events };
  }

  it('renders panels with the token block root', async () => {
    const { root } = await editor({});
    expect(root.querySelector('.etce')).not.toBeNull();
    expect(root.querySelectorAll('details.etce-sec').length).toBe(7);
    expect(root.querySelectorAll('details.etce-sec summary')[1]!.textContent).toContain('Quick Preset Templates');
  });

  it('a checkbox writes only when it differs from the default', async () => {
    const { root, events, el } = await editor({});
    const cb = [...root.querySelectorAll<HTMLInputElement>('.etce-check input')].find((i) => i.parentElement!.textContent!.includes('Humidity'))!;
    cb.checked = false;
    cb.dispatchEvent(new Event('change'));
    expect(events.at(-1)).toEqual({ ...base, show_humidity: false });
    el.setConfig(events.at(-1) as never);
    await el.updateComplete;
    cb.checked = true;
    cb.dispatchEvent(new Event('change'));
    expect(events.at(-1)).toEqual(base);
  });

  it('adding a set materializes the defaults first', async () => {
    const { root, events, el } = await editor({});
    (root.querySelectorAll('details.etce-sec')[3] as HTMLDetailsElement).open = true;
    root.querySelectorAll('details.etce-sec')[3]!.dispatchEvent(new Event('toggle'));
    await el.updateComplete;
    const add = [...root.querySelectorAll<HTMLButtonElement>('.etce-add')].find((b) => b.textContent!.includes('Devices'))!;
    add.click();
    expect((events.at(-1)!.sets as unknown[]).map((s) => (s as { type: string }).type)).toEqual(['hvac', 'preset', 'fan_mode', 'chips']);
  });
});
