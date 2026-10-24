// Screenshot page for `npm run screenshots`. Renders every shot from the BUILT
// bundle; each sits in a [data-shot] box that scripts/screenshots.mjs captures.
// Shots with an `action` are put into that state (menu open, controls revealed)
// before capture. Not shipped.
import { hass, fans } from './fixtures.js';
import { TEMPLATES, applyTemplate } from './.cache/templates.mjs';

const card = (slug, title, config, action) => ({ slug, title, config, action });

const FEATURES = [
  card('feature-menu-open', 'Expandable menu, open', {
    entity: 'climate.office',
    show_pills: false,
    setpoint: { control: 'stepper', position: 'right', scale: 80 },
    text: { current: { size: 56 } },
    sets: [{ type: 'hvac', display: 'menu' }, { type: 'preset', display: 'menu' }, { type: 'fan_mode', display: 'menu' }],
  }, 'menu'),
  card('feature-reveal-closed', 'Tap to reveal: closed', {
    entity: 'climate.hall',
    setpoint: { reveal: 'tap', collapsed: 'hidden', open_in: 'current' },
  }),
  card('feature-reveal-open', 'Tap to reveal: open in place of the temperature', {
    entity: 'climate.hall',
    setpoint: { reveal: 'tap', collapsed: 'hidden', open_in: 'current', hide_after: 0 },
  }, 'reveal'),
  card('feature-bar', 'Setpoint bar with flags, ticks and current marker', {
    entity: 'climate.hall',
    setpoint: { control: 'bar', bar: { range_min: 60, range_max: 85 } },
  }),
  card('feature-vertical-bar', 'Vertical setpoint bar', {
    entity: 'climate.office',
    core_align: 'left',
    setpoint: { control: 'bar', bar: { position: 'right', range_min: 55, range_max: 85, labels: 10, ticks: 2.5, length: 230 } },
  }),
  card('feature-effects', 'Effects while heating: card, setpoint value, pill, mode button and icon glow', {
    entity: 'climate.office',
    setpoint: { wheel_style: 'pill' },
    effects: { card: 'both', setpoint: 'glow', pill: 'glow', mode_button: 'glow', mode_icon: 'glow', size: 22 },
  }),
  card('feature-fan-chips', 'RF fan chips: Breeze level, light, timer, speed 4/10', {
    entity: 'climate.bed',
    sets: [fans, { type: 'hvac' }],
  }),
];

const SHOTS = [
  ...TEMPLATES.map((t) =>
    card(`template-${t.id}`, `${t.name}: ${t.hint}`, applyTemplate({ entity: 'climate.hall', sets: [fans] }, t)),
  ),
  ...FEATURES,
];

await import('../dist/easy-thermostat-styler-card.js');
const wall = document.getElementById('wall');
const els = [];
for (const s of SHOTS) {
  const box = document.createElement('div');
  box.className = 'shot';
  box.dataset.shot = s.slug;
  box.dataset.title = s.title;
  if (s.action) box.dataset.action = s.action;
  const el = document.createElement('easy-thermostat-styler-card');
  el.setConfig({ type: 'custom:easy-thermostat-styler-card', ...s.config });
  el.hass = hass;
  box.append(el);
  wall.append(box);
  els.push([s, el]);
}
await Promise.all(els.map(([, el]) => el.updateComplete));
// The screenshot script scrolls each shot into view and calls this to put it
// into its state (a menu is placed relative to the window, so it must be
// opened while its card is on screen).
window.etcShotAction = async (slug) => {
  const [s, el] = els.find(([x]) => x.slug === slug);
  if (s.action === 'menu') el.shadowRoot.querySelector('.menu .mt').click();
  if (s.action === 'reveal') el.shadowRoot.querySelector('button.current').click();
  await el.updateComplete;
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
};
document.body.dataset.ready = '1';
