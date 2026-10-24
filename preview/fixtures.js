// Shared by the preview wall (harness.js) and the screenshot page (shots.js):
// stub HA elements and a fake hass with demo thermostats and RF fans.
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

export const hass = {
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
add('fan.bedroom', 'on', { friendly_name: 'Bedroom fan', percentage: 70, percentage_step: 10, direction: 'forward', preset_mode: 'natural 2', preset_modes: ['normal', 'natural 1', 'natural 2', 'natural 3'] });
add('fan.living', 'on', { friendly_name: 'Living fan', percentage: 40, percentage_step: 10, direction: 'reverse', preset_mode: 'normal', preset_modes: ['normal', 'natural 1', 'natural 2', 'natural 3'] });
add('light.bedroom_fan', 'on', {});
add('sensor.bedroom_fan_sleep_timer', new Date(Date.now() + 95 * 60000).toISOString(), { device_class: 'timestamp' });
add('fan.office', 'off', { friendly_name: 'Office fan', percentage: 0, percentage_step: 100 / 6, direction: 'reverse' });
for (const [id, dev] of [['fan.bedroom', 'd1'], ['light.bedroom_fan', 'd1'], ['sensor.bedroom_fan_sleep_timer', 'd1'], ['fan.office', 'd2'], ['fan.living', 'd3']])
  hass.entities[id] = { entity_id: id, device_id: dev, platform: 'esphome_rf_fan', translation_key: id.includes('sleep') ? 'sleep_timer' : undefined };

export const fans = { type: 'chips', zone: 'top', chips: [{ type: 'rf_fan', entity: 'fan.bedroom', name: 'Bedroom' }, { type: 'rf_fan', entity: 'fan.living', name: 'Living', speed_format: 'fraction' }, { type: 'rf_fan', entity: 'fan.office', name: 'Office' }] };

