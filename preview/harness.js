// Local preview harness: fake hass + stub HA elements, renders a wall of
// example cards from the BUILT bundle (dist/). Serve the repo root and open
// /preview/. Not shipped.
import * as mdi from '../node_modules/@mdi/js/mdi.js';

const toKey = (name) =>
  'mdi' + name.replace(/^mdi:/, '').split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');

class HaIcon extends HTMLElement {
  static get observedAttributes() { return ['icon']; }
  set icon(v) { this.setAttribute('icon', v); }
  get icon() { return this.getAttribute('icon'); }
  attributeChangedCallback() { this.render(); }
  connectedCallback() { this.render(); }
  render() {
    // Shadow DOM like the real ha-icon: filling light DOM would shift Lit's
    // template node indices while the template is being cloned.
    const path = mdi[toKey(this.getAttribute('icon') || '')] || mdi.mdiHelpCircleOutline;
    const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>:host{display:inline-flex;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);flex:none}</style><svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor"><path d="${path}"/></svg>`;
  }
}
customElements.define('ha-icon', HaIcon);
customElements.define('ha-card', class extends HTMLElement {
  connectedCallback() { this.style.display = 'block'; }
});
customElements.define('ha-selector', class extends HTMLElement {
  set value(v) { this._v = v; this.textContent = typeof v === 'object' ? JSON.stringify(v ?? {}) : String(v ?? '—'); this.style.cssText = 'display:block;padding:6px 10px;border:1px solid #444;border-radius:6px;font-size:12px;color:#aaa'; }
});

const hass = {
  states: {},
  entities: {},
  config: { unit_system: { temperature: '°F' } },
  callService: async (d, s, data) => console.log('call', d, s, data),
};
const add = (id, state, attributes = {}) => (hass.states[id] = { entity_id: id, state, attributes });
const RICH = {
  min_temp: 50, max_temp: 90, current_temperature: 72, current_humidity: 48,
  hvac_modes: ['off', 'heat', 'cool', 'heat_cool'], preset_modes: ['home', 'away', 'sleep', 'eco'], preset_mode: 'home',
  fan_modes: ['auto', 'on', 'circulate'], fan_mode: 'auto',
};
add('climate.hall', 'heat_cool', { ...RICH, friendly_name: 'Hallway', target_temp_low: 68, target_temp_high: 75, hvac_action: 'cooling', current_temperature: 76 });
add('climate.office', 'heat', { ...RICH, friendly_name: 'Office', temperature: 70, hvac_action: 'heating', current_temperature: 66 });
add('climate.bed', 'cool', { ...RICH, friendly_name: 'Bedroom', temperature: 71, hvac_action: 'idle', current_temperature: 71 });
add('climate.den', 'off', { ...RICH, friendly_name: 'Den', current_temperature: 69 });
add('fan.bedroom', 'on', { friendly_name: 'Bedroom fan', percentage: 66, percentage_step: 100 / 6, direction: 'forward', preset_mode: 'natural' });
add('light.bedroom_fan', 'on', {});
add('sensor.bedroom_fan_sleep_timer', new Date(Date.now() + 95 * 60000).toISOString(), { device_class: 'timestamp' });
add('fan.office', 'off', { friendly_name: 'Office fan', percentage: 0, percentage_step: 100 / 6, direction: 'reverse' });
for (const [id, dev] of [['fan.bedroom', 'd1'], ['light.bedroom_fan', 'd1'], ['sensor.bedroom_fan_sleep_timer', 'd1'], ['fan.office', 'd2']])
  hass.entities[id] = { entity_id: id, device_id: dev, platform: 'esphome_rf_fan', translation_key: id.includes('sleep') ? 'sleep_timer' : undefined };

const fans = { type: 'chips', zone: 'top', chips: [{ type: 'rf_fan', entity: 'fan.bedroom', name: 'Bedroom' }, { type: 'rf_fan', entity: 'fan.office', name: 'Office' }] };

const EXAMPLES = [
  ['Defaults — wheel right, Heat/Cool, cooling glow', { entity: 'climate.hall' }],
  ['Setpoint bar (zones) + fan chips on top', { entity: 'climate.hall', setpoint: { control: 'bar', bar: { range_min: 60, range_max: 85 } }, sets: [fans, { type: 'hvac' }, { type: 'preset', display: 'toggle' }, { type: 'fan_mode', display: 'toggle' }] }],
  ['Wheel left, 2 neighbours, stacked ±, heating', { entity: 'climate.office', setpoint: { position: 'left', neighbors: 2, nudge: 'stacked' } }],
  ['Compact: everything behind toggles', { entity: 'climate.bed', compact: true, setpoint: { control: 'stepper', position: 'center' }, sets: [fans, { type: 'hvac' }, { type: 'preset' }] }],
  ['Modes down the right side, icon-only, filled', { entity: 'climate.office', core_align: 'left', setpoint: { control: 'stepper', position: 'center', scale: 80 }, buttons: { variant: 'filled', content: 'icon', radius: 999 }, sets: [{ type: 'hvac', zone: 'right' }, { type: 'preset', zone: 'bottom', style: { variant: 'outlined', icon_position: 'left' } }] }],
  ['Gradient bar, ticks every 2°, custom text', { entity: 'climate.hall', show_humidity: false, text: { current: { size: 56, weight: 300 }, name: { transform: 'uppercase', letter_spacing: 8, size: 13, color: 'var(--secondary-text-color)' } }, setpoint: { control: 'bar', bar: { look: 'gradient', ticks: 2, labels: 10, handle_shape: 'diamond', range_min: 55, range_max: 90 } }, sets: [{ type: 'hvac', style: { content: 'label', variant: 'ghost' } }] }],
  ['Off', { entity: 'climate.den' }],
];

await import('../dist/easy-thermostat-styler-card.js');
const wall = document.getElementById('wall');
for (const [cap, cfg] of EXAMPLES) {
  const box = document.createElement('div');
  const el = document.createElement('easy-thermostat-styler-card');
  el.setConfig({ type: 'custom:easy-thermostat-styler-card', ...cfg });
  el.hass = hass;
  box.append(el);
  const p = document.createElement('p'); p.className = 'cap'; p.textContent = cap; box.append(p);
  wall.append(box);
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
