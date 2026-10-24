import type { HassEntity, HomeAssistant, HassEntityRegistryEntry } from '../src/model/hass';

export interface Call {
  domain: string;
  service: string;
  data?: Record<string, unknown>;
}

export function climate(state: string, attributes: Record<string, unknown> = {}, id = 'climate.t'): HassEntity {
  return { entity_id: id, state, attributes };
}

/** A rich heat/cool thermostat (°F). */
export const RICH = {
  min_temp: 45,
  max_temp: 92,
  current_temperature: 72,
  current_humidity: 48,
  hvac_modes: ['off', 'heat', 'cool', 'heat_cool'],
  preset_modes: ['home', 'away', 'sleep'],
  preset_mode: 'home',
  fan_modes: ['auto', 'on'],
  fan_mode: 'auto',
  friendly_name: 'Hallway',
};

export function fakeHass(
  entities: HassEntity[],
  opts: { unit?: string; registry?: HassEntityRegistryEntry[] } = {},
): { hass: HomeAssistant; calls: Call[] } {
  const calls: Call[] = [];
  const states: Record<string, HassEntity> = {};
  for (const e of entities) states[e.entity_id] = e;
  const entitiesReg: Record<string, HassEntityRegistryEntry> = {};
  for (const r of opts.registry ?? []) entitiesReg[r.entity_id] = r;
  const hass: HomeAssistant = {
    states,
    entities: entitiesReg,
    config: { unit_system: { temperature: opts.unit ?? '°F' } },
    callService: async (domain, service, data) => {
      calls.push({ domain, service, data });
      return undefined;
    },
  };
  return { hass, calls };
}

/** RF fan device: fan + light + sleep timer on one device. */
export function rfFan(opts: { on?: boolean; pct?: number; dir?: string; preset?: string; light?: boolean; timer?: string } = {}) {
  const entities: HassEntity[] = [
    {
      entity_id: 'fan.bedroom',
      state: opts.on ? 'on' : 'off',
      attributes: {
        friendly_name: 'Bedroom fan',
        percentage: opts.on ? (opts.pct ?? 50) : 0,
        percentage_step: 100 / 6,
        direction: opts.dir ?? 'forward',
        preset_mode: opts.preset ?? 'normal',
        preset_modes: ['normal', 'natural'],
      },
    },
    { entity_id: 'light.bedroom_fan', state: opts.light ? 'on' : 'off', attributes: {} },
    { entity_id: 'sensor.bedroom_fan_sleep_timer', state: opts.timer ?? 'unknown', attributes: { device_class: 'timestamp' } },
  ];
  const registry: HassEntityRegistryEntry[] = [
    { entity_id: 'fan.bedroom', device_id: 'dev1', platform: 'esphome_rf_fan' },
    { entity_id: 'light.bedroom_fan', device_id: 'dev1', platform: 'esphome_rf_fan', translation_key: 'light' },
    { entity_id: 'sensor.bedroom_fan_sleep_timer', device_id: 'dev1', platform: 'esphome_rf_fan', translation_key: 'sleep_timer' },
  ];
  return { entities, registry };
}
