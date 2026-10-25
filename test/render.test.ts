// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from 'vitest';
import '../src/easy-thermostat-styler-card';
import type { EasyThermostatStylerCard } from '../src/card';
import type { EasyThermostatStylerCardEditor } from '../src/editor/editor';
import { normalizeConfig } from '../src/model/config';
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
    expect(root.querySelector('ha-card')!.classList.contains('fx-card-glow')).toBe(true);
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
    expect(trigger.querySelector('.mt-name')).toBeNull(); // set name hidden by default
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
    const styles = (root.host.constructor as unknown as { styles: { cssText: string } | { cssText: string }[] }).styles;
    const css = (Array.isArray(styles) ? styles : [styles]).map((s) => s.cssText).join('\n');
    expect(css).not.toMatch(/pos-right \.main\s*\{\s*flex:\s*1/);
    expect(root.querySelector('.core.al-center')).not.toBeNull();
  });

  it('status position: beside / below the current temperature', async () => {
    const a = await mount({ status_position: 'beside' });
    expect(a.root.querySelector('.cur-row > .current + .status.sp-beside')).not.toBeNull();
    document.body.innerHTML = '';
    const b = await mount({ status_position: 'below' });
    const main = b.root.querySelector('.main')!;
    const kids = [...main.children].map((k) => k.className.split(' ')[0]);
    expect(kids.indexOf('status')).toBeGreaterThan(kids.indexOf('current'));
  });

  it('wheel centre can be a pill (live and collapsed)', async () => {
    const { root, el } = await mount({ setpoint: { wheel_style: 'pill' } });
    expect(root.querySelector('.wheel .wheel-pill.heat')!.textContent).toContain('68');
    expect(root.querySelector('.wheel .bubble')).toBeNull();
    el.setConfig({ ...base, setpoint: { wheel_style: 'pill', reveal: 'tap' } });
    await el.updateComplete;
    expect(root.querySelector('.collapsed .wheel-pill')).not.toBeNull();
  });

  it('pills hidden in Heat/Cool: the wheel gets a heat/cool switch', async () => {
    const h = fakeHass([climate('heat_cool', { ...RICH, target_temp_low: 68, target_temp_high: 75 })]);
    const { root, el } = await mount({ show_pills: false, status_position: 'below' }, h);
    expect(root.querySelector('.pill')).toBeNull();
    const sw = root.querySelectorAll<HTMLButtonElement>('.ctl-wrap .hc-switch .hc');
    expect(sw).toHaveLength(2);
    expect(root.querySelector('.wheel .bubble')!.textContent).toContain('75'); // cool is edited first
    sw[0]!.click();
    await el.updateComplete;
    expect(root.querySelector('.wheel .bubble')!.textContent).toContain('68');
    // single setpoint: no switch
    document.body.innerHTML = '';
    const s = await mount({ show_pills: false });
    expect(s.root.querySelector('.hc-switch')).toBeNull();
  });

  describe('effects', () => {
    const cls = (root: ShadowRoot) => [...root.querySelector('ha-card')!.classList].filter((c) => c.startsWith('fx-')).sort();

    it('heating: chosen parts get glow/pulse classes in the heat colour; legacy card.glow still works', async () => {
      const a = await mount({ effects: { setpoint: 'both', pill: 'pulse', mode_button: 'glow', mode_icon: 'pulse' } });
      expect(cls(a.root)).toEqual(
        ['fx-on', 'fx-heat', 'fx-card-glow', 'fx-setpoint-glow', 'fx-setpoint-pulse', 'fx-pill-pulse', 'fx-mode_button-glow', 'fx-mode_icon-pulse'].sort(),
      );
      document.body.innerHTML = '';
      const b = await mount({ card: { glow: false } });
      expect(cls(b.root)).toEqual(['fx-heat', 'fx-on']);
    });

    it('idle: nothing, unless "whenever the mode is Heat/Cool"', async () => {
      const idle = fakeHass([climate('cool', { ...RICH, temperature: 71, hvac_action: 'idle' })]);
      const a = await mount({ effects: { pill: 'glow' } }, idle);
      expect(cls(a.root)).toEqual([]);
      document.body.innerHTML = '';
      const b = await mount({ effects: { pill: 'glow', when: 'mode' } }, idle);
      expect(cls(b.root)).toContain('fx-cool');
      expect(cls(b.root)).toContain('fx-pill-glow');
    });

    it('size, speed and colours are custom properties', async () => {
      const { root } = await mount({ effects: { card: 'pulse', size: 30, speed: 1.5, heat_color: 'var(--error-color)' } });
      const card = root.querySelector<HTMLElement>('ha-card')!;
      expect(card.style.getPropertyValue('--fx-size')).toBe('30px');
      expect(card.style.getPropertyValue('--fx-speed')).toBe('1.5s');
      expect(card.style.getPropertyValue('--fx-heat')).toBe('var(--error-color)');
    });

    it('editor: choosing Glow for the card drops the legacy key (one source of truth)', async () => {
      const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
      el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 })]).hass;
      el.setConfig({ ...base, card: { glow: false } } as never);
      document.body.appendChild(el);
      await el.updateComplete;
      const events: Record<string, unknown>[] = [];
      el.addEventListener('config-changed', (e) => events.push((e as CustomEvent).detail.config));
      const panel = [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sec')].find((d) => d.querySelector('summary')!.textContent!.trim() === 'Heating & Cooling Effects')!;
      panel.open = true;
      panel.dispatchEvent(new Event('toggle'));
      await el.updateComplete;
      const sel = panel.querySelector<HTMLSelectElement>('.etce-row select')!; // Entire card
      expect(sel.value).toBe('none');
      sel.value = 'glow';
      sel.dispatchEvent(new Event('change'));
      expect(events.at(-1)).toEqual(base);
      sel.value = 'pulse';
      sel.dispatchEvent(new Event('change'));
      expect(events.at(-1)).toEqual({ ...base, effects: { card: 'pulse' } });
    });
  });

  it('bar: flag placement follows the orientation; handle border and flag colours are custom properties', async () => {
    const h = fakeHass([climate('heat', { ...RICH, temperature: 70 })]);
    const a = await mount({ setpoint: { control: 'bar', bar: { flag_position: 'below', handle_border_color: 'none', flag_color: '#123456', flag_text_color: 'var(--primary-text-color)' } } }, h);
    expect(a.root.querySelector('.bar.flags-below')).not.toBeNull();
    const card = a.root.querySelector<HTMLElement>('ha-card')!;
    expect(card.style.getPropertyValue('--bar-hbw')).toBe('0px');
    expect(card.style.getPropertyValue('--bar-flag')).toBe('#123456');
    expect(card.style.getPropertyValue('--bar-flag-fg')).toBe('var(--primary-text-color)');
    document.body.innerHTML = '';
    // 'below' on a vertical bar falls back to the left; 'right' is honoured
    const b = await mount({ setpoint: { control: 'bar', bar: { position: 'right', flag_position: 'below' } } }, h);
    expect(b.root.querySelector('.bar.vertical.flags-left')).not.toBeNull();
    document.body.innerHTML = '';
    const c = await mount({ setpoint: { control: 'bar', bar: { position: 'right', flag_position: 'right', handle_border_color: '#00ff00' } } }, h);
    expect(c.root.querySelector('.bar.vertical.flags-right')).not.toBeNull();
    expect(c.root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--bar-hbc')).toBe('#00ff00');
  });

  it('bar: tick side is independent of the flag side and follows the orientation', async () => {
    const h = fakeHass([climate('heat', { ...RICH, temperature: 70 })]);
    const a = await mount({ setpoint: { control: 'bar' } }, h);
    expect(a.root.querySelector('.bar.horizontal.flags-above.ticks-below')).not.toBeNull();
    document.body.innerHTML = '';
    const b = await mount({ setpoint: { control: 'bar', bar: { tick_position: 'above', flag_position: 'above' } } }, h);
    expect(b.root.querySelector('.bar.horizontal.flags-above.ticks-above')).not.toBeNull();
    document.body.innerHTML = '';
    const c = await mount({ setpoint: { control: 'bar', bar: { position: 'left', tick_position: 'left', flag_position: 'above' } } }, h);
    expect(c.root.querySelector('.bar.vertical.flags-left.ticks-left')).not.toBeNull();
  });

  describe('background', () => {
    it('no style: no moving layer; base colour and gradient fill', async () => {
      const a = await mount({ background: { color: 'transparent' } });
      expect(a.root.querySelector('.bg')).toBeNull();
      expect(a.root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--etc-card-bg')).toBe('transparent');
      document.body.innerHTML = '';
      const b = await mount({ background: { fill: 'gradient', gradient: { angle: 90, stops: ['#111111', 'var(--primary-color)'] } } });
      expect(b.root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--etc-card-bg')).toBe('linear-gradient(90deg, #111111, var(--primary-color))');
      document.body.innerHTML = '';
      // the older card.background still renders
      const c = await mount({ card: { background: '#222222' } });
      expect(c.root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--etc-card-bg')).toBe('#222222');
    });

    it('every style renders behind the content, heating rises with heat colours', async () => {
      for (const style of ['plasma', 'lava', 'aurora', 'flow', 'shimmer', 'particles', 'core', 'mesh', 'beam']) {
        document.body.innerHTML = '';
        const { root } = await mount({ background: { style } });
        const bg = root.querySelector('ha-card > .bg')!;
        expect(bg.className).toContain(`s-${style}`);
        expect(bg.className).toContain('st-heating');
        expect(bg.className).toContain('dir-up');
        expect(bg.nextElementSibling!.classList.contains('grid')).toBe(true);
        expect(root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--etc-bg-a')).toContain('--state-climate-heat-color');
      }
    });

    it('cooling sinks, fan swirls with blades, off can be turned off', async () => {
      const cool = await mount({ background: { style: 'plasma' } }, fakeHass([climate('cool', { ...RICH, temperature: 70, hvac_action: 'cooling' })]));
      expect(cool.root.querySelector('.bg.dir-down.st-cooling')).not.toBeNull();
      document.body.innerHTML = '';
      const fan = await mount({ background: { style: 'aurora' } }, fakeHass([climate('fan_only', { ...RICH, fan_mode: 'high' })]));
      expect(fan.root.querySelector('.bg.dir-swirl.st-fan .blades')).not.toBeNull();
      document.body.innerHTML = '';
      const off = await mount({ background: { style: 'mesh', off: 'none' } }, fakeHass([climate('off', { ...RICH })]));
      expect(off.root.querySelector('.bg')).toBeNull();
    });

    it('image layer, finish layer, frosted controls', async () => {
      const { root } = await mount({
        background: { fill: 'image', image: { url: '/local/a "b".jpg', darken: 40 }, scrim: 20, vignette: 30, grain: 10, frosted: true, frost_blur: 20 },
      });
      const card = root.querySelector<HTMLElement>('ha-card')!;
      expect(card.classList.contains('frosted')).toBe(true);
      expect(root.querySelector('.bg-base .bg-img.fit-cover')).not.toBeNull();
      expect(root.querySelector('.bg-base .bg-dark')).not.toBeNull();
      expect(root.querySelectorAll('.bg-finish i')).toHaveLength(3);
      expect(card.style.getPropertyValue('--bg-img')).toBe('url("/local/a \\"b\\".jpg")');
      expect(card.style.getPropertyValue('--frost')).toBe('20px');
    });

    it('editor: setting the colour here clears the older card.background', async () => {
      const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
      el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 })]).hass;
      el.setConfig({ ...base, card: { background: '#222222', radius: 4 } } as never);
      document.body.appendChild(el);
      await el.updateComplete;
      const events: Record<string, unknown>[] = [];
      el.addEventListener('config-changed', (e) => events.push((e as CustomEvent).detail.config));
      const panel = [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sec')].find((d) => d.querySelector('summary')!.textContent!.trim() === 'Background')!;
      panel.open = true;
      panel.dispatchEvent(new Event('toggle'));
      await el.updateComplete;
      const mode = panel.querySelector<HTMLSelectElement>('.etce-color .etce-cmode')!;
      expect([...mode.options].map((o) => o.value)).toContain('transparent');
      mode.value = 'transparent';
      mode.dispatchEvent(new Event('change'));
      expect(events.at(-1)).toEqual({ ...base, card: { radius: 4 }, background: { color: 'transparent' } });
    });
  });

  it('editor: Effects keeps its settings after other panels are opened and closed', async () => {
    const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
    el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 })]).hass;
    el.setConfig(base as never);
    document.body.appendChild(el);
    await el.updateComplete;
    const panel = (name: string) => [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sec')].find((d) => d.querySelector('summary')!.textContent!.trim() === name)!;
    for (const name of ['Heating & Cooling Effects', 'Background', 'Heating & Cooling Effects', 'Card Shape', 'Heating & Cooling Effects']) {
      const d = panel(name);
      d.open = !d.open;
      d.dispatchEvent(new Event('toggle'));
      await el.updateComplete;
    }
    const fx = panel('Heating & Cooling Effects');
    expect(fx.querySelectorAll('.etce-row').length).toBeGreaterThanOrEqual(10); // 5 parts + when + look
    expect(fx.textContent).toContain('Glow size');
  });

  it('frosted glass: top level, older background.frosted still works, wheel bubble included', async () => {
    const a = await mount({ frosted: true, frost_blur: 18 });
    expect(a.root.querySelector('ha-card')!.classList.contains('frosted')).toBe(true);
    expect(a.root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--frost')).toBe('18px');
    document.body.innerHTML = '';
    const b = await mount({ background: { frosted: true } });
    expect(b.root.querySelector('ha-card')!.classList.contains('frosted')).toBe(true);
    const css = (b.root.host.constructor as unknown as { styles: { cssText: string }[] }).styles.map((s) => s.cssText).join('');
    expect(css).toMatch(/ha-card\.frosted \.bubble\s*\{/);
  });

  it('Size scales the controls, not the current temperature', async () => {
    const css = (root: ShadowRoot) => (root.host.constructor as unknown as { styles: { cssText: string }[] }).styles.map((s) => s.cssText).join('');
    const { root } = await mount({ setpoint: { scale: 200 } });
    expect(css(root)).toMatch(/\.current \{[^}]*font-size: var\(--etc-t-cur-fs, 72px\);/);
    expect(root.querySelector<HTMLElement>('ha-card')!.style.getPropertyValue('--etc-scale')).toBe('2');
  });

  it('− / + placement for wheel and stepper', async () => {
    const order = (root: ShadowRoot, sel: string) =>
      [...root.querySelector(sel)!.children].map((k) => (k.classList.contains('nudges') ? `nudges${k.classList.contains('row') ? '-row' : ''}` : k.className.split(' ')[0] || k.getAttribute('aria-label')));
    const cases: [Record<string, unknown>, string, string[]][] = [
      [{}, '.wheel.nud-right', ['wheel-col', 'nudges']],
      [{ nudge: 'beside' }, '.wheel.nud-right', ['wheel-col', 'nudges']],
      [{ nudge: 'left' }, '.wheel.nud-left', ['nudges', 'wheel-col']],
      [{ nudge: 'above' }, '.wheel.nud-above', ['nudges-row', 'wheel-col']],
      [{ nudge: 'below' }, '.wheel.nud-below', ['wheel-col', 'nudges-row']],
      [{ control: 'stepper' }, '.stepper.nud-around', ['round', 'sv', 'round']],
      [{ control: 'stepper', nudge: 'above' }, '.stepper.nud-above', ['nudges-row', 'sv']],
    ];
    for (const [sp, sel, want] of cases) {
      document.body.innerHTML = '';
      const { root } = await mount({ setpoint: sp });
      expect(order(root, sel)).toEqual(want);
    }
  });

  it('tap mode + hide at target: setpoint shows until reached, then only the current temperature', async () => {
    const cfg = { setpoint: { reveal: 'tap', hide_at_target: true, reveal_from: 'pills' } };
    // heating to 70, room at 66: setpoint still shown
    const a = await mount(cfg, fakeHass([climate('heat', { ...RICH, temperature: 70, current_temperature: 66, hvac_action: 'heating' })]));
    expect(a.root.querySelector('.pill.heat')).not.toBeNull();
    expect(a.root.querySelector('.collapsed')).not.toBeNull();
    document.body.innerHTML = '';
    // reached: only the temperature, and it opens the controls even though only pills were set to open them
    const b = await mount(cfg, fakeHass([climate('heat', { ...RICH, temperature: 70, current_temperature: 70, hvac_action: 'idle' })]));
    expect(b.root.querySelector('.pill')).toBeNull();
    expect(b.root.querySelector('.collapsed')).toBeNull();
    b.root.querySelector<HTMLButtonElement>('button.current')!.click();
    await b.el.updateComplete;
    expect(b.root.querySelector('.wheel')).not.toBeNull();
    expect(b.root.querySelector('.pill.heat')).not.toBeNull(); // open: setpoint shows again
    document.body.innerHTML = '';
    // Heat/Cool: inside the band counts as reached
    const c = await mount(cfg, fakeHass([climate('heat_cool', { ...RICH, target_temp_low: 68, target_temp_high: 75, current_temperature: 72 })]));
    expect(c.root.querySelector('.pill')).toBeNull();
  });

  describe('test mode', () => {
    const idleCool = () => fakeHass([climate('cool', { ...RICH, temperature: 71, current_temperature: 71, hvac_action: 'idle' })]);
    const editorFor = async (cfg: Record<string, unknown>) => {
      const ed = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
      ed.hass = idleCool().hass;
      ed.setConfig({ ...base, ...cfg } as never);
      document.body.appendChild(ed);
      await ed.updateComplete;
      const sel = ed.shadowRoot!.querySelector<HTMLSelectElement>('.etce-test select')!;
      return { ed, pick: (v: string) => { sel.value = v; sel.dispatchEvent(new Event('change')); } };
    };

    it('set in the editor, never saved; effects, status and background follow; numbers stay real', async () => {
      const cfg = { background: { style: 'plasma' }, effects: { pill: 'glow' } };
      const { root, el } = await mount(cfg, idleCool());
      expect(root.querySelector('.test-badge')).toBeNull();
      const events: Record<string, unknown>[] = [];
      const { ed, pick } = await editorFor(cfg);
      ed.addEventListener('config-changed', (e) => events.push((e as CustomEvent).detail.config));
      pick('heating');
      await el.updateComplete;
      expect(events).toEqual([]); // nothing written to the card config
      expect(root.querySelector('.test-badge')!.textContent).toContain('Heating');
      expect(root.querySelector('.bg')!.className).toContain('st-heating');
      expect(root.querySelector('ha-card')!.classList.contains('fx-pill-glow')).toBe(true);
      expect(root.querySelector('.status')!.textContent).toContain('Heating');
      expect(root.querySelector('.current')!.textContent).toContain('71');
    });

    it('closing the editor switches it off', async () => {
      const { root, el } = await mount({ background: { style: 'plasma' } }, idleCool());
      const { ed, pick } = await editorFor({ background: { style: 'plasma' } });
      pick('fan');
      await el.updateComplete;
      expect(root.querySelector('.bg')!.className).toContain('st-fan');
      ed.remove();
      await el.updateComplete;
      expect(root.querySelector('.test-badge')).toBeNull();
      expect(root.querySelector('.bg')!.className).toContain('st-idle_cool');
    });

    it('cycle steps through every state', async () => {
      vi.useFakeTimers();
      const { root, el } = await mount({ background: { style: 'aurora' } }, idleCool());
      const { pick } = await editorFor({});
      pick('cycle');
      await el.updateComplete;
      const seen: string[] = [];
      for (let i = 0; i < 5; i++) {
        seen.push(root.querySelector('.test-badge')!.textContent!.replace('TEST · ', '').trim());
        vi.advanceTimersByTime(6000);
        await el.updateComplete;
      }
      expect(seen).toEqual(['Heating', 'Cooling', 'Idle', 'Fan', 'Off']);
    });

    it('a test_mode saved by v2026.10.24.13 is dropped', () => {
      expect(normalizeConfig({ ...base, test_mode: 'heating' })).toEqual(base);
    });
  });

  it('editor: opening a panel closes the others; titles renamed', async () => {
    const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
    el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 })]).hass;
    el.setConfig(base as never);
    document.body.appendChild(el);
    await el.updateComplete;
    const all = () => [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sec')];
    const titles = all().map((d) => d.querySelector('summary')!.textContent!.trim());
    expect(titles).toContain('Card Shape');
    expect(titles).toContain('Heating & Cooling Effects');
    for (const name of ['Background', 'Card Shape']) {
      const d = all().find((x) => x.querySelector('summary')!.textContent!.trim() === name)!;
      d.open = true;
      d.dispatchEvent(new Event('toggle'));
      await el.updateComplete;
      expect(all().filter((x) => x.open).map((x) => x.querySelector('summary')!.textContent!.trim())).toEqual([name]);
    }
    expect(el.shadowRoot!.querySelector('.etce-test select')).not.toBeNull();
  });

  it('buttons: scale (all sets or one set) and icon-to-text spacing are custom properties', async () => {
    const { root } = await mount({ buttons: { scale: 80, icon_gap: 10 }, sets: [{ type: 'hvac', style: { scale: 150 } }, { type: 'preset' }] });
    const hv = root.querySelector<HTMLElement>('.set.t-hvac')!;
    const pr = root.querySelector<HTMLElement>('.set.t-preset')!;
    expect(hv.style.getPropertyValue('--etc-b-scale')).toBe('1.5');
    expect(pr.style.getPropertyValue('--etc-b-scale')).toBe('0.8');
    expect(pr.style.getPropertyValue('--etc-b-igap')).toBe('10px');
  });

  it('tap mode: hide the pill while the controls are open; tapping the wheel closes', async () => {
    const cfg = { setpoint: { reveal: 'tap', collapsed: 'hidden', open_in: 'current', hide_pills_open: true } };
    const { root, el } = await mount(cfg);
    expect(root.querySelector('.pill.heat')).not.toBeNull(); // closed: pill shows
    root.querySelector<HTMLButtonElement>('button.current')!.click();
    await el.updateComplete;
    expect(root.querySelector('.in-current .wheel')).not.toBeNull();
    expect(root.querySelector('.pills')).toBeNull();
    const col = root.querySelector<HTMLElement>('.wheel-col')!;
    col.dispatchEvent(new PointerEvent('pointerdown', { clientY: 100, pointerId: 1 }));
    col.dispatchEvent(new PointerEvent('pointerup', { clientY: 101, pointerId: 1 }));
    await el.updateComplete;
    expect(root.querySelector('.wheel')).toBeNull();
    expect(root.querySelector('.pill.heat')).not.toBeNull();
    document.body.innerHTML = '';
    // Heat/Cool: the switch stands in for the pills while open
    const h = fakeHass([climate('heat_cool', { ...RICH, target_temp_low: 68, target_temp_high: 75 })]);
    const d = await mount(cfg, h);
    d.root.querySelector<HTMLButtonElement>('button.current')!.click();
    await d.el.updateComplete;
    expect(d.root.querySelectorAll('.hc-switch .hc')).toHaveLength(2);
  });

  describe('look, shared rows, distance', () => {
    it('Look: chip on a mode set, button on a device set', async () => {
      const f = rfFan({ on: true, pct: 40 });
      const h = fakeHass([climate('heat', { ...RICH, temperature: 68 }), ...f.entities], { registry: f.registry });
      const { root } = await mount(
        { sets: [{ type: 'hvac', style: { look: 'chip' } }, { type: 'chips', style: { look: 'button', variant: 'filled' }, chips: [{ type: 'rf_fan', entity: 'fan.bedroom', show_name: false }] }] },
        h,
      );
      expect(root.querySelector('.set.t-hvac.look-chip .btn')).not.toBeNull();
      const dev = root.querySelector<HTMLButtonElement>('.set.t-chips.look-button.v-filled button.btn.dev.active')!;
      expect(dev).not.toBeNull();
      expect(dev.querySelector('.lbl')!.textContent!.trim()).toBe('2'); // value only (40% of 6 speeds ≈ 2)
      expect(root.querySelector('.chip')).toBeNull();
    });

    it('Share a row with: sets join the named set\u2019s row and zone', async () => {
      const { root } = await mount({
        sets: [
          { type: 'hvac', id: 'm', zone: 'bottom' },
          { type: 'preset', row_with: 'm', zone: 'top' },
          { type: 'fan_mode', zone: 'top' },
        ],
      });
      const row = root.querySelector('.zone.bottom > .row-group')!;
      expect([...row.querySelectorAll(':scope > .set')].map((s) => [...s.classList].find((c) => c.startsWith('t-')))).toEqual(['t-hvac', 't-preset']);
      expect(root.querySelector('.zone.top .t-preset')).toBeNull();
      expect(root.querySelector('.zone.top .t-fan_mode')).not.toBeNull();
    });

    it('a cycle or a missing target falls back to its own row', async () => {
      const { root } = await mount({ sets: [{ type: 'hvac', id: 'a', row_with: 'b' }, { type: 'preset', id: 'b', row_with: 'a' }, { type: 'fan_mode', row_with: 'zz' }] });
      expect(root.querySelectorAll('.set').length).toBe(3);
    });

    it('distance and centring are set on the grid', async () => {
      const { root } = await mount({ zones: { gap: 4, left: 20 }, sets: [{ type: 'hvac', zone: 'right' }] });
      const g = root.querySelector<HTMLElement>('.grid')!;
      expect(g.classList.contains('centered')).toBe(true);
      expect(g.classList.contains('has-sides')).toBe(true);
      expect(g.style.getPropertyValue('--zg')).toBe('4px');
      expect(g.style.getPropertyValue('--zg-left')).toBe('20px');
      document.body.innerHTML = '';
      const b = await mount({ zones: { centered: false } });
      expect(b.root.querySelector('.grid')!.classList.contains('centered')).toBe(false);
    });

    it('editor: Share a row with adds an id to the target and removes it when unused', async () => {
      const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
      el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 })]).hass;
      el.setConfig({ ...base, sets: [{ type: 'hvac' }, { type: 'preset' }] } as never);
      document.body.appendChild(el);
      await el.updateComplete;
      const events: Record<string, unknown>[] = [];
      el.addEventListener('config-changed', (e) => {
        events.push((e as CustomEvent).detail.config);
        el.setConfig((e as CustomEvent).detail.config);
      });
      const panel = [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sec')].find((d) => d.querySelector('summary')!.textContent!.trim() === 'Button sets')!;
      panel.open = true;
      panel.dispatchEvent(new Event('toggle'));
      await el.updateComplete;
      panel.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.set-row > summary')[1]!.click();
      await el.updateComplete;
      const row = [...panel.querySelectorAll('.etce-row')].find((r) => r.textContent!.includes('Share a row with'))!;
      const sel = row.querySelector('select')!;
      sel.value = '0';
      sel.dispatchEvent(new Event('change'));
      expect((events.at(-1)!.sets as unknown[])).toEqual([{ type: 'hvac', id: 'set1' }, { type: 'preset', row_with: 'set1' }]);
      await el.updateComplete;
      const sel2 = [...panel.querySelectorAll('.etce-row')].find((r) => r.textContent!.includes('Share a row with'))!.querySelector('select')!;
      sel2.value = '';
      sel2.dispatchEvent(new Event('change'));
      expect((events.at(-1)!.sets as unknown[])).toEqual([{ type: 'hvac' }, { type: 'preset' }]);
    });
  });

  describe('buttons as items', () => {
    it('mixed set renders and each kind does its job', async () => {
      const h = fakeHass([climate('heat', { ...RICH, temperature: 68 }), { entity_id: 'sensor.hum', state: '48', attributes: {} }]);
      const { root, calls } = await mount(
        {
          sets: [
            {
              type: 'custom',
              items: [
                { kind: 'mode', source: 'hvac', value: 'cool' },
                { kind: 'device', type: 'entity', entity: 'sensor.hum', show_name: false },
                { kind: 'action', action: 'script', entity: 'script.boost', name: 'Boost' },
              ],
            },
          ],
        },
        h,
      );
      const btns = [...root.querySelectorAll<HTMLButtonElement>('.set.t-custom > button')];
      expect(btns.map((b) => b.classList.contains('dev') ? 'device' : b.classList.contains('act') ? 'action' : 'mode')).toEqual(['mode', 'device', 'action']);
      btns[0]!.click();
      expect(calls.at(-1)).toEqual({ domain: 'climate', service: 'set_hvac_mode', data: { entity_id: 'climate.t', hvac_mode: 'cool' } });
      btns[2]!.click();
      expect(calls.at(-1)).toEqual({ domain: 'script', service: 'turn_on', data: { entity_id: 'script.boost' } });
      expect(btns[1]!.textContent).toContain('48');
    });

    it('menu with mixed buttons: trigger shows the active mode; devices show their value in the list', async () => {
      const h = fakeHass([climate('heat', { ...RICH, temperature: 68 }), { entity_id: 'sensor.hum', state: '48', attributes: {} }]);
      const { root, el } = await mount({ sets: [{ type: 'custom', display: 'menu', items: [{ kind: 'mode', source: 'hvac', value: 'heat' }, { kind: 'device', type: 'entity', entity: 'sensor.hum' }] }] }, h);
      expect(root.querySelector('.mt .mt-value')!.textContent).toBe('Heat');
      root.querySelector<HTMLButtonElement>('.mt')!.click();
      await el.updateComplete;
      expect(root.querySelector('.mi.dev .mi-val')!.textContent).toBe('48');
      document.body.innerHTML = '';
      const d = await mount({ sets: [{ type: 'custom', display: 'menu', items: [{ kind: 'device', type: 'entity', entity: 'sensor.hum' }] }] }, h);
      expect(d.root.querySelector('.mt .mt-value')!.textContent).toBe('48'); // no mode: first device's value
    });

    const editorOn = async (cfg: Record<string, unknown>) => {
      const el = document.createElement('easy-thermostat-styler-card-editor') as EasyThermostatStylerCardEditor;
      el.hass = fakeHass([climate('heat', { ...RICH, temperature: 68 }), { entity_id: 'sensor.hum', state: '48', attributes: {} }]).hass;
      el.setConfig({ ...base, ...cfg } as never);
      document.body.appendChild(el);
      await el.updateComplete;
      const events: Record<string, unknown>[] = [];
      el.addEventListener('config-changed', (e) => {
        events.push((e as CustomEvent).detail.config);
        el.setConfig((e as CustomEvent).detail.config);
      });
      const panel = [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sec')].find((d) => d.querySelector('summary')!.textContent!.trim() === 'Button sets')!;
      panel.open = true;
      panel.dispatchEvent(new Event('toggle'));
      await el.updateComplete;
      const openSet = async (k: number) => {
        panel.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.set-row > summary')[k]!.click();
        await el.updateComplete;
        const sub = [...panel.querySelectorAll<HTMLDetailsElement>('details.etce-sub')].find((d) => d.querySelector('summary')!.textContent!.includes('Buttons in this set'))!;
        sub.open = true;
        sub.dispatchEvent(new Event('toggle'));
        await el.updateComplete;
        return sub;
      };
      return { el, panel, events, openSet };
    };

    it('editor: the only Mode set cannot be deleted; a duplicate can', async () => {
      const { el, panel, events } = await editorOn({ sets: [{ type: 'hvac' }, { type: 'custom', name: 'Buttons 1' }] });
      const del = () => [...panel.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.set-row > summary .etce-act.del')];
      expect(del()[0]!.disabled).toBe(true);
      expect(del()[1]!.disabled).toBe(false);
      panel.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.set-row > summary .etce-act[title="Duplicate"]')[0]!.click();
      await el.updateComplete;
      expect((events.at(-1)!.sets as { type: string; name?: string }[]).map((s) => [s.type, s.name])).toEqual([
        ['hvac', undefined],
        ['hvac', 'Mode copy'],
        ['custom', 'Buttons 1'],
      ]);
      expect(del()[0]!.disabled).toBe(false); // two Mode sets now: either may go
    });

    it('editor: add a device and an action, duplicate a button, copy a built-in button to another set', async () => {
      const { el, events, openSet } = await editorOn({ sets: [{ type: 'hvac' }, { type: 'custom', name: 'Buttons 1' }] });
      let sub = await openSet(1);
      [...sub.querySelectorAll<HTMLButtonElement>('.etce-add')].find((b) => b.textContent!.includes('Device'))!.click();
      await el.updateComplete;
      expect((events.at(-1)!.sets as { items?: unknown[] }[])[1]!.items).toEqual([{ kind: 'device', type: 'entity', entity: 'sensor.hum' }]);
      sub = [...el.shadowRoot!.querySelectorAll<HTMLDetailsElement>('details.etce-sub')].find((d) => d.querySelector('summary')!.textContent!.includes('Buttons in this set'))!;
      [...sub.querySelectorAll<HTMLButtonElement>('.etce-add')].find((b) => b.textContent!.includes('Action'))!.click();
      await el.updateComplete;
      sub.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.item-row > summary .etce-act[title="Duplicate"]')[0]!.click();
      await el.updateComplete;
      const items = (events.at(-1)!.sets as { items?: { kind: string }[] }[])[1]!.items!;
      expect(items.map((x) => x.kind)).toEqual(['device', 'device', 'action']);
    });

    it('editor: an older device-only set becomes a Buttons set with the same chip look on first edit', async () => {
      const { el, events, openSet } = await editorOn({ sets: [{ type: 'chips', chips: [{ type: 'entity', entity: 'sensor.hum' }] }] });
      const sub = await openSet(0);
      sub.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.item-row > summary .etce-act[title="Duplicate"]')[0]!.click();
      await el.updateComplete;
      expect((events.at(-1)!.sets as unknown[])[0]).toEqual({
        type: 'custom',
        style: { look: 'chip' },
        align: 'center',
        items: [
          { kind: 'device', type: 'entity', entity: 'sensor.hum' },
          { kind: 'device', type: 'entity', entity: 'sensor.hum' },
        ],
      });
    });

    it('editor: copy style to another set', async () => {
      const { el, panel, events } = await editorOn({ sets: [{ type: 'hvac', style: { radius: 3, look: 'chip' } }, { type: 'preset' }] });
      panel.querySelectorAll<HTMLButtonElement>('details.etce-rowsub.set-row > summary')[0]!.click();
      await el.updateComplete;
      const sel = [...panel.querySelectorAll('.etce-row')].find((r) => r.textContent!.includes('Copy this style to'))!.querySelector('select')!;
      sel.value = '1';
      sel.dispatchEvent(new Event('change'));
      expect((events.at(-1)!.sets as unknown[])[1]).toEqual({ type: 'preset', style: { radius: 3, look: 'chip' } });
    });
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
    const a = await mount({ text: { current: { size: 97 } } });
    const b = await mount({ buttons: { radius: 2 }, setpoint: { control: 'bar' } });
    const css = (r: ShadowRoot) =>
      r.adoptedStyleSheets?.length
        ? r.adoptedStyleSheets.map((s) => [...s.cssRules].map((x) => x.cssText).join('\n'))
        : [...r.querySelectorAll('style')].map((s) => s.textContent);
    expect(css(a.root)).toEqual(css(b.root));
    expect(css(a.root).join('')).not.toContain('97px');
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
    expect(root.querySelectorAll('details.etce-sec').length).toBe(9);
    expect(root.querySelectorAll('details.etce-sec > summary')[1]!.textContent).toContain('Quick Preset Templates');
    // Design guide: like Text, every panel body is a hint and fields, then flat
    // sub-panels; group subtitles live only inside sub-panels / set editors.
    for (const d of root.querySelectorAll<HTMLDetailsElement>('details.etce-sec')) {
      const loose = [...d.querySelector(':scope > .etce-body')!.children].filter((k) => k.classList.contains('etce-group'));
      expect(loose.map((k) => k.textContent), d.querySelector('summary')!.textContent!.trim()).toEqual([]);
    }
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
    const add = [...root.querySelectorAll<HTMLButtonElement>('.etce-add')].find((b) => b.textContent!.trim() === '+ Buttons')!;
    add.click();
    const sets = events.at(-1)!.sets as { type: string; name?: string }[];
    expect(sets.map((s) => s.type)).toEqual(['hvac', 'preset', 'fan_mode', 'custom']);
    expect(sets[3]!.name).toBe('Buttons 1');
  });
});
