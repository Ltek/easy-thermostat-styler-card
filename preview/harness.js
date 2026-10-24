// Local preview wall: renders example cards from the BUILT bundle (dist/).
// Serve the repo root and open /preview/. Not shipped.
import { hass, fans } from './fixtures.js';

const EXAMPLES = [
  ['Defaults — wheel right, Heat/Cool, cooling glow', { entity: 'climate.hall' }],
  ['Setpoint bar (zones) + fan chips on top', { entity: 'climate.hall', setpoint: { control: 'bar', bar: { range_min: 60, range_max: 85 } }, sets: [fans, { type: 'hvac' }, { type: 'preset', display: 'toggle' }, { type: 'fan_mode', display: 'toggle' }] }],
  ['Wheel left, 2 neighbours, stacked ±, heating', { entity: 'climate.office', setpoint: { position: 'left', neighbors: 2, nudge: 'stacked' } }],
  ['Compact: everything behind toggles', { entity: 'climate.bed', compact: true, setpoint: { control: 'stepper', position: 'center' }, sets: [fans, { type: 'hvac' }, { type: 'preset' }] }],
  ['Modes down the right side, icon-only, filled', { entity: 'climate.office', core_align: 'left', setpoint: { control: 'stepper', position: 'center', scale: 80 }, buttons: { variant: 'filled', content: 'icon', radius: 999 }, sets: [{ type: 'hvac', zone: 'right' }, { type: 'preset', zone: 'bottom', style: { variant: 'outlined', icon_position: 'left' } }] }],
  ['Gradient bar, ticks every 2°, custom text', { entity: 'climate.hall', show_humidity: false, text: { current: { size: 56, weight: 300 }, name: { transform: 'uppercase', letter_spacing: 8, size: 13, color: 'var(--secondary-text-color)' } }, setpoint: { control: 'bar', bar: { look: 'gradient', ticks: 2, labels: 10, handle_shape: 'diamond', range_min: 55, range_max: 90 } }, sets: [{ type: 'hvac', style: { content: 'label', variant: 'ghost' } }] }],
  ['Off', { entity: 'climate.den' }],
  ['Your case: centered, wheel right, menus', { entity: 'climate.office', show_name: false, show_status: false, show_pills: false, sets: [{ type: 'hvac', display: 'menu' }, { type: 'preset', display: 'menu' }, { type: 'fan_mode', display: 'menu' }] }],
  ['Tap to reveal (closed)', { entity: 'climate.hall', setpoint: { reveal: 'tap' } }],
  ['Expandable menus (open up), slim card', { entity: 'climate.office', show_pills: false, setpoint: { control: 'stepper', position: 'right', scale: 80 }, text: { current: { size: 56 } }, sets: [fans, { type: 'hvac', display: 'menu' }, { type: 'preset', display: 'menu' }, { type: 'fan_mode', display: 'menu', menu_show_name: true }] }],
  ['Vertical bar on the right, Heat', { entity: 'climate.office', core_align: 'left', setpoint: { control: 'bar', bar: { position: 'right', range_min: 55, range_max: 85, labels: 10, ticks: 2.5, length: 230 } } }],
  ['Look: Outline', { entity: 'climate.bed', buttons: { variant: 'outlined', radius: 999, icon_position: 'left', height: 40 }, text: { current: { weight: 100 }, status: { letter_spacing: 12 } } }],
];

await import('../dist/easy-thermostat-styler-card.js');
const wall = document.getElementById('wall');
if (location.hash === '#templates') {
  const { TEMPLATES, applyTemplate } = await import('./.cache/templates.mjs');
  EXAMPLES.length = 0;
  for (const tpl of TEMPLATES) EXAMPLES.push([`${tpl.name} — ${tpl.tags.join(', ')}`, applyTemplate({ entity: 'climate.hall', sets: [fans] }, tpl)]);
}
for (const [cap, cfg] of EXAMPLES) {
  const box = document.createElement('div');
  const el = document.createElement('easy-thermostat-styler-card');
  el.setConfig({ type: 'custom:easy-thermostat-styler-card', ...cfg });
  el.hass = hass;
  box.append(el);
  const p = document.createElement('p'); p.className = 'cap'; p.textContent = cap; box.append(p);
  wall.append(box);
}
if (location.hash === '#menu') {
  const cards = [...wall.querySelectorAll('easy-thermostat-styler-card')];
  await Promise.all(cards.map((c) => c.updateComplete));
  const card = cards.find((c) => c.shadowRoot.querySelector('.menu .mt'));
  card.shadowRoot.querySelector('.menu .mt').click();
}
if (location.hash === '#editor') {
  const ed = document.createElement('easy-thermostat-styler-card-editor');
  ed.className = 'ed';
  ed.hass = hass;
  ed.setConfig({ type: 'custom:easy-thermostat-styler-card', ...EXAMPLES[1][1] });
  document.body.prepend(ed);
  await ed.updateComplete;
  for (const d of ed.shadowRoot.querySelectorAll('details.etce-sec')) { d.open = true; d.dispatchEvent(new Event('toggle')); }
  wall.remove();
}
document.body.dataset.ready = '1';
