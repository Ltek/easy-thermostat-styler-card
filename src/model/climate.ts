import type { HomeAssistant } from './hass';
import type { CardConfig } from './config';
import { num } from './parse';

// The climate view model: a pure function of hass + config. Every field whose
// backing data is absent is null/false, so the renderer shows "present → show,
// absent → hide" (ecosee's graceful-degradation rule, ADR-0001).

export type EquipmentStatus = 'heating' | 'cooling' | 'drying' | 'fan' | 'idle' | 'off';
export type SystemMode = 'heat' | 'cool' | 'heat_cool' | 'dry' | 'fan_only' | 'off' | 'unknown';

export interface Setpoints {
  heat: number | null;
  cool: number | null;
}

export interface ClimateView {
  available: boolean;
  name: string;
  currentTemp: number | null;
  unit: string;
  humidity: number | null;
  equipment: EquipmentStatus | null;
  mode: SystemMode;
  /** Raw HA state (e.g. `auto` is kept here while `mode` maps it to heat_cool). */
  state: string;
  setpoints: Setpoints | null;
}

export const UNAVAILABLE = new Set(['unavailable', 'unknown', 'none', '']);

export function toMode(state: string): SystemMode {
  switch (state) {
    case 'heat':
    case 'cool':
    case 'heat_cool':
    case 'dry':
    case 'fan_only':
    case 'off':
      return state;
    case 'auto':
      return 'heat_cool';
    default:
      return 'unknown';
  }
}

function fromHvacAction(action: unknown): EquipmentStatus | null {
  switch (action) {
    case 'heating':
    case 'preheating':
      return 'heating';
    case 'cooling':
      return 'cooling';
    case 'drying':
      return 'drying';
    case 'fan':
      return 'fan';
    case 'idle':
      return 'idle';
    case 'off':
      return 'off';
    default:
      return null;
  }
}

function inferEquipment(mode: SystemMode, t: number | null, sp: Setpoints | null): EquipmentStatus | null {
  if (mode === 'off') return 'off';
  if (t === null || sp === null) return null;
  if (sp.heat !== null && (mode === 'heat' || mode === 'heat_cool') && t < sp.heat) return 'heating';
  if (sp.cool !== null && (mode === 'cool' || mode === 'heat_cool') && t > sp.cool) return 'cooling';
  return mode === 'heat' || mode === 'cool' || mode === 'heat_cool' ? 'idle' : null;
}

function deriveSetpoints(mode: SystemMode, attrs: Record<string, unknown>): Setpoints | null {
  if (mode === 'heat_cool') {
    const heat = num(attrs.target_temp_low);
    const cool = num(attrs.target_temp_high);
    if (heat !== null || cool !== null) return { heat, cool };
    // Some integrations report a single `temperature` in auto.
    const single = num(attrs.temperature);
    return single === null ? null : { heat: single, cool: null };
  }
  const single = num(attrs.temperature);
  if (single === null) return null;
  if (mode === 'heat') return { heat: single, cool: null };
  if (mode === 'cool') return { heat: null, cool: single };
  return null;
}

export function toClimateView(hass: HomeAssistant, config: CardConfig): ClimateView {
  const entity = hass.states[config.entity];
  const unit = hass.config?.unit_system?.temperature ?? '°';
  const friendly = entity?.attributes.friendly_name;
  const name = config.name ?? (typeof friendly === 'string' ? friendly : config.entity);
  if (!entity || UNAVAILABLE.has(entity.state)) {
    return {
      available: false,
      name,
      currentTemp: null,
      unit,
      humidity: null,
      equipment: null,
      mode: 'unknown',
      state: entity?.state ?? 'unavailable',
      setpoints: null,
    };
  }
  const attrs = entity.attributes;
  const mode = toMode(entity.state);
  const currentTemp = num(attrs.current_temperature);
  const setpoints = deriveSetpoints(mode, attrs);
  return {
    available: true,
    name,
    currentTemp,
    unit,
    humidity: num(attrs.current_humidity),
    equipment: fromHvacAction(attrs.hvac_action) ?? inferEquipment(mode, currentTemp, setpoints),
    mode,
    state: entity.state,
    setpoints,
  };
}

/** Whole degrees in °F, half degrees in °C. */
export function formatTemp(value: number | null, unit: string): string {
  if (value === null) return '–';
  const celsius = unit.includes('C');
  const rounded = celsius ? Math.round(value * 2) / 2 : Math.round(value);
  return celsius && !Number.isInteger(rounded) ? rounded.toFixed(1) : String(rounded);
}

export const EQUIPMENT_LABEL: Record<EquipmentStatus, string> = {
  heating: 'Heating',
  cooling: 'Cooling',
  drying: 'Drying',
  fan: 'Fan',
  idle: 'Idle',
  off: 'Off',
};
