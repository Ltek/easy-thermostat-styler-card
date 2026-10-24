import type { HomeAssistant, HassEntity } from './hass';
import type { ChipConfig, ChipHold, ChipTap } from './config';
import { UNAVAILABLE } from './climate';
import { num } from './parse';
import type { ServiceCall } from './service-call';

// Chips: small status buttons for linked devices. `rf_fan` is built in for the
// ha-rf-fan integration (platform `esphome_rf_fan`): pick the fan.* entity and
// the light and sleep-timer sensor on the same device are found automatically.

export const RF_FAN_PLATFORM = 'esphome_rf_fan';
export const RF_FAN_CARD = 'custom:rf-fan-ltek';

export interface ChipView {
  index: number;
  type: ChipConfig['type'];
  entity: string;
  name: string;
  icon: string;
  on: boolean;
  available: boolean;
  /** Short state text (e.g. "2", "On", "21.5 °C"). */
  state: string;
  /** rf_fan extras */
  speed: number | null; // 1..speedCount
  /** Auto-detected from percentage_step (100 ÷ speeds). */
  speedCount: number | null;
  percentage: number | null;
  direction: 'forward' | 'reverse' | null;
  natural: boolean;
  /** Breeze/natural level when the remote has numbered levels (`natural 2` → 2). */
  naturalLevel: number | null;
  /** How many numbered natural levels the fan offers (0 = a single natural mode). */
  naturalLevels: number;
  lightEntity: string | null;
  lightOn: boolean;
  timerEnds: Date | null;
  /** Spin duration (s) for a running fan icon; null = no spin. */
  spin: number | null;
  tap: ChipTap;
  hold: ChipHold;
  config: ChipConfig;
}

/** Siblings of `entityId` on the same device (via the entity registry). */
export function deviceSiblings(hass: HomeAssistant, entityId: string): string[] {
  const reg = hass.entities;
  const device = reg?.[entityId]?.device_id;
  if (!reg || !device) return [];
  return Object.values(reg)
    .filter((e) => e.device_id === device && e.entity_id !== entityId)
    .map((e) => e.entity_id);
}

export function findRfFanLight(hass: HomeAssistant, fanId: string): string | null {
  const sib = deviceSiblings(hass, fanId).filter((id) => id.startsWith('light.'));
  const reg = hass.entities ?? {};
  return sib.find((id) => reg[id]?.platform === RF_FAN_PLATFORM) ?? sib[0] ?? null;
}

export function findRfFanTimer(hass: HomeAssistant, fanId: string): string | null {
  const reg = hass.entities ?? {};
  const sib = deviceSiblings(hass, fanId).filter((id) => id.startsWith('sensor.'));
  return (
    sib.find((id) => reg[id]?.translation_key === 'sleep_timer') ??
    sib.find((id) => hass.states[id]?.attributes.device_class === 'timestamp') ??
    null
  );
}

function friendly(e: HassEntity | undefined, fallback: string): string {
  const n = e?.attributes.friendly_name;
  return typeof n === 'string' ? n : fallback;
}

function domainIcon(id: string, on: boolean): string {
  const d = id.split('.')[0];
  const icons: Record<string, [string, string]> = {
    fan: ['mdi:fan', 'mdi:fan-off'],
    light: ['mdi:lightbulb', 'mdi:lightbulb-outline'],
    switch: ['mdi:toggle-switch', 'mdi:toggle-switch-off-outline'],
    binary_sensor: ['mdi:checkbox-marked-circle', 'mdi:checkbox-blank-circle-outline'],
    sensor: ['mdi:eye', 'mdi:eye'],
  };
  const pair = icons[d ?? ''] ?? ['mdi:circle', 'mdi:circle-outline'];
  return on ? pair[0] : pair[1];
}

export function toChipView(hass: HomeAssistant, chip: ChipConfig, index: number): ChipView {
  const e = hass.states[chip.entity];
  const available = !!e && !UNAVAILABLE.has(e.state);
  const on = available && !['off', 'idle', 'closed', 'standby'].includes(e!.state);
  const base: ChipView = {
    index,
    type: chip.type,
    entity: chip.entity,
    name: chip.name ?? friendly(e, chip.entity),
    icon: chip.icon ?? (typeof e?.attributes.icon === 'string' ? (e.attributes.icon as string) : domainIcon(chip.entity, on)),
    on,
    available,
    state: available ? stateText(hass, e!) : 'Unavailable',
    speed: null,
    speedCount: null,
    naturalLevel: null,
    naturalLevels: 0,
    percentage: null,
    direction: null,
    natural: false,
    lightEntity: null,
    lightOn: false,
    timerEnds: null,
    spin: null,
    tap: chip.tap ?? (chip.type === 'rf_fan' ? 'popup' : 'more-info'),
    hold: chip.hold ?? (chip.type === 'rf_fan' ? 'toggle' : 'none'),
    config: chip,
  };
  if (chip.type !== 'rf_fan' || !e) return base;

  const a = e.attributes;
  const pct = num(a.percentage);
  const count = speedCount(a);
  const speed = on && pct !== null && count ? Math.max(1, Math.min(count, Math.round((pct * count) / 100))) : null;
  const light = findRfFanLight(hass, chip.entity);
  const timer = findRfFanTimer(hass, chip.entity);
  const timerState = timer ? hass.states[timer]?.state : undefined;
  const ends = timerState && !UNAVAILABLE.has(timerState) ? new Date(timerState) : null;
  const preset = typeof a.preset_mode === 'string' ? a.preset_mode : '';
  const natural = on && !!preset && preset !== 'normal';
  const naturalLevel = natural ? naturalLevelOf(preset) : null;
  const levels = Array.isArray(a.preset_modes) ? a.preset_modes.filter((p) => naturalLevelOf(String(p)) !== null).length : 0;
  const fmt = chip.speed_format ?? 'number';
  const speedText =
    speed === null ? 'On' : fmt === 'fraction' && count ? `${speed}/${count}` : fmt === 'percent' && pct !== null ? `${Math.round(pct)}%` : String(speed);
  return {
    ...base,
    icon: chip.icon ?? 'mdi:ceiling-fan',
    // In Breeze/natural mode the level is what matters, not the underlying speed.
    state: !available ? 'Unavailable' : !on ? 'Off' : naturalLevel !== null ? String(naturalLevel) : speedText,
    speed,
    speedCount: count,
    naturalLevel,
    naturalLevels: levels,
    percentage: pct,
    direction: a.direction === 'reverse' ? 'reverse' : a.direction === 'forward' ? 'forward' : null,
    natural,
    lightEntity: light,
    lightOn: !!light && hass.states[light]?.state === 'on',
    timerEnds: ends && !Number.isNaN(ends.getTime()) && ends.getTime() > Date.now() ? ends : null,
    spin: on ? spinSeconds(pct) : null,
  };
}

/** Speed count: HA publishes `percentage_step` = 100 ÷ speeds (6 speeds → 16.67). */
export function speedCount(attrs: Record<string, unknown>): number | null {
  const explicit = num(attrs.speed_count);
  if (explicit && explicit > 0) return Math.round(explicit);
  const step = num(attrs.percentage_step);
  return step && step > 0 && step < 100 ? Math.round(100 / step) : null;
}

/** `natural 2` → 2; `natural` / `normal` / anything else → null. */
export function naturalLevelOf(preset: string): number | null {
  const m = /^natural[ _]?(\d+)$/i.exec(preset.trim());
  return m ? Number(m[1]) : null;
}

/** Faster spin at higher speed: 3.0 s at 1 % → 0.6 s at 100 %. */
export function spinSeconds(pct: number | null): number {
  const p = Math.min(100, Math.max(1, pct ?? 50));
  return Math.round((3 - (p / 100) * 2.4) * 100) / 100;
}

export function formatRemaining(ends: Date, now = Date.now()): string {
  const mins = Math.max(0, Math.round((ends.getTime() - now) / 60000));
  const h = Math.floor(mins / 60);
  return h ? `${h}h${String(mins % 60).padStart(2, '0')}` : `${mins}m`;
}

function stateText(hass: HomeAssistant, e: HassEntity): string {
  const h = hass as HomeAssistant & { formatEntityState?: (s: HassEntity) => string };
  try {
    if (h.formatEntityState) return h.formatEntityState(e);
  } catch {
    /* ignore */
  }
  const unit = e.attributes.unit_of_measurement;
  return unit ? `${e.state} ${unit}` : e.state.charAt(0).toUpperCase() + e.state.slice(1);
}

export function defaultPopupCard(chip: ChipConfig): Record<string, unknown> | null {
  if (chip.popup_card) return chip.popup_card;
  if (chip.type === 'rf_fan') return { type: RF_FAN_CARD, fan_entity: chip.entity };
  return null;
}

/** The service call for a hold (or tap: toggle) gesture. */
export function chipToggleCall(view: ChipView, what: 'toggle' | 'toggle_light'): ServiceCall | null {
  if (what === 'toggle_light') {
    return view.lightEntity
      ? { domain: 'light', service: 'toggle', data: { entity_id: view.lightEntity } }
      : null;
  }
  const domain = view.entity.split('.')[0]!;
  const toggleable = ['fan', 'light', 'switch', 'input_boolean', 'climate', 'humidifier', 'media_player', 'cover'];
  if (!toggleable.includes(domain)) return null;
  return { domain: 'homeassistant', service: 'toggle', data: { entity_id: view.entity } };
}
