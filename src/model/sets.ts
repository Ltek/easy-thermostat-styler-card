import type { HomeAssistant, HassEntity } from './hass';
import type { ActionItem, ButtonSetConfig, CardConfig, ChipConfig, ModeSource, SetType, Zone } from './config';
import { DEFAULT_SETS } from './config';
import type { ServiceCall } from './service-call';

// Button-set view models. The option list logic (order / hide / rename /
// re-icon per option) follows simple-thermostat's mode lists; the set itself
// carries placement (zone / orientation / columns / align) and display mode.

export interface ButtonOption {
  value: string;
  label: string;
  icon: string;
  active: boolean;
  /** The color an active button takes by default (mode color for HVAC). */
  color: string;
}

/** One button in a set, whatever made it. */
export type Tile =
  | { kind: 'mode'; source: ModeSource; option: ButtonOption }
  | { kind: 'device'; chip: ChipConfig }
  | { kind: 'action'; item: ActionItem; label: string; icon: string };

export interface SetView {
  /** Stable key: `<type>-<index in config.sets>` (used for toggle memory). */
  key: string;
  index: number;
  type: SetType;
  title: string;
  zone: Zone;
  orientation: 'row' | 'column';
  columns: number;
  align: 'start' | 'center' | 'end' | 'stretch';
  display: 'always' | 'toggle' | 'menu';
  menuDirection: 'down' | 'up' | 'left' | 'right';
  menuShowName: boolean;
  toggleIcon: string;
  /** Mode buttons (built-in and added). */
  options: ButtonOption[];
  /** Every button, in order. */
  tiles: Tile[];
  config: ButtonSetConfig;
}

export const SET_TITLES: Record<SetType, string> = {
  hvac: 'Mode',
  preset: 'Preset',
  fan_mode: 'Fan',
  custom: 'Buttons',
  chips: 'Devices',
};

const SET_TOGGLE_ICONS: Record<SetType, string> = {
  hvac: 'mdi:thermostat',
  preset: 'mdi:home-thermometer-outline',
  fan_mode: 'mdi:fan',
  custom: 'mdi:gesture-tap-button',
  chips: 'mdi:devices',
};

/** Attribute that lists the options / holds the active one, per set type. */
const SOURCE: Record<ModeSource, { list: string; active: string | null }> = {
  hvac: { list: 'hvac_modes', active: null },
  preset: { list: 'preset_modes', active: 'preset_mode' },
  fan_mode: { list: 'fan_modes', active: 'fan_mode' },
};

export const MODE_ICONS: Record<string, string> = {
  off: 'mdi:power',
  heat: 'mdi:fire',
  cool: 'mdi:snowflake',
  heat_cool: 'mdi:sun-snowflake-variant',
  auto: 'mdi:thermostat-auto',
  dry: 'mdi:water-percent',
  fan_only: 'mdi:fan',
  // presets
  none: 'mdi:circle-off-outline',
  home: 'mdi:home',
  away: 'mdi:home-export-outline',
  sleep: 'mdi:power-sleep',
  eco: 'mdi:leaf',
  boost: 'mdi:rocket-launch',
  comfort: 'mdi:sofa',
  activity: 'mdi:run',
  vacation: 'mdi:airplane',
  // fan modes
  on: 'mdi:fan',
  low: 'mdi:fan-speed-1',
  medium: 'mdi:fan-speed-2',
  middle: 'mdi:fan-speed-2',
  high: 'mdi:fan-speed-3',
  circulate: 'mdi:autorenew',
  diffuse: 'mdi:weather-windy',
  focus: 'mdi:target',
};

const KNOWN_LABELS: Record<string, string> = {
  heat_cool: 'Heat/Cool',
  fan_only: 'Fan only',
  off: 'Off',
};

export const MODE_COLORS: Record<string, string> = {
  heat: 'var(--state-climate-heat-color, #ff8100)',
  cool: 'var(--state-climate-cool-color, #2b9af9)',
  heat_cool: 'var(--state-climate-heat-cool-color, #ffa600)',
  auto: 'var(--state-climate-auto-color, #008000)',
  dry: 'var(--state-climate-dry-color, #efbd07)',
  fan_only: 'var(--state-climate-fan-only-color, #009688)',
  off: 'var(--state-climate-off-color, #8a8a8a)',
};
export const ACCENT = 'var(--primary-color, #03a9f4)';

export function prettify(value: string): string {
  if (KNOWN_LABELS[value]) return KNOWN_LABELS[value]!;
  const s = value.replace(/_/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Localized label when the HA frontend offers one, else a prettified key. */
function optionLabel(hass: HomeAssistant, entity: HassEntity, type: SetType, value: string): string {
  const h = hass as HomeAssistant & {
    formatEntityState?: (s: HassEntity, v?: string) => string;
    formatEntityAttributeValue?: (s: HassEntity, a: string, v?: unknown) => string;
  };
  try {
    if (type === 'hvac' && h.formatEntityState) return h.formatEntityState(entity, value);
    if (type !== 'hvac' && type !== 'chips' && h.formatEntityAttributeValue) {
      const attr = type === 'preset' ? 'preset_mode' : 'fan_mode';
      const out = h.formatEntityAttributeValue(entity, attr, value);
      if (out) return out;
    }
  } catch {
    /* fall through */
  }
  return prettify(value);
}

/** The sets to show: the configured list, or the defaults. */
export function configuredSets(config: CardConfig): ButtonSetConfig[] {
  return Array.isArray(config.sets) ? config.sets : DEFAULT_SETS;
}

/** The option values a set type offers on this entity, in entity order. */
export function isBuiltin(type: SetType): type is ModeSource {
  return type === 'hvac' || type === 'preset' || type === 'fan_mode';
}

export function availableOptions(entity: HassEntity | undefined, type: SetType): string[] {
  if (!entity || !isBuiltin(type)) return [];
  const list = entity.attributes[SOURCE[type].list];
  return Array.isArray(list) ? list.map(String) : [];
}

/** Apply configured order (listed first), keep the rest in entity order. */
export function orderOptions(values: string[], order: string[] | undefined): string[] {
  if (!order?.length) return values;
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of order) if (values.includes(v) && !seen.has(v)) (out.push(v), seen.add(v));
  for (const v of values) if (!seen.has(v)) out.push(v);
  return out;
}

export function toSetViews(hass: HomeAssistant, config: CardConfig): SetView[] {
  const entity = hass.states[config.entity];
  const views: SetView[] = [];
  const modeOption = (source: ModeSource, value: string, name?: string, icon?: string): ButtonOption => {
    const activeAttr = SOURCE[source].active;
    const activeValue = activeAttr ? String(entity!.attributes[activeAttr] ?? '') : entity!.state;
    return {
      value,
      label: name ?? optionLabel(hass, entity!, source, value),
      icon: icon ?? MODE_ICONS[value.toLowerCase()] ?? 'mdi:circle-medium',
      active: value === activeValue,
      color: source === 'hvac' ? (MODE_COLORS[value] ?? ACCENT) : ACCENT,
    };
  };
  configuredSets(config).forEach((set, index) => {
    if (set.hidden) return;
    const type = set.type;
    const tiles: Tile[] = [];
    // Built-in sets: everything the thermostat offers (order / hide / rename).
    if (isBuiltin(type) && entity) {
      for (const value of orderOptions(availableOptions(entity, type), set.order)) {
        const o = set.options?.[value];
        if (o?.hide) continue;
        tiles.push({ kind: 'mode', source: type, option: modeOption(type, value, o?.name, o?.icon) });
      }
    }
    // The older device-only set.
    for (const chip of set.chips ?? []) if (!(chip.hide_when_off && valueIsOff(hass, chip.entity))) tiles.push({ kind: 'device', chip });
    // Buttons added by the user, in any set.
    for (const it of set.items ?? []) {
      if (it.hide) continue;
      if (it.kind === 'mode') {
        if (!entity || !availableOptions(entity, it.source).includes(it.value)) continue; // the thermostat no longer offers it
        tiles.push({ kind: 'mode', source: it.source, option: modeOption(it.source, it.value, it.name, it.icon) });
      } else if (it.kind === 'device') {
        const { kind: _k, hide: _h, ...chip } = it;
        if (it.hide_when_off && valueIsOff(hass, it.entity)) continue;
        tiles.push({ kind: 'device', chip: chip as ChipConfig });
      } else {
        tiles.push({ kind: 'action', item: it, label: it.name ?? actionLabel(hass, it), icon: it.icon ?? actionIcon(it) });
      }
    }
    if (!tiles.length) return;
    const options = tiles.flatMap((t) => (t.kind === 'mode' ? [t.option] : []));
        views.push({
      key: `${type}-${index}`,
      index,
      type,
      title: set.name ?? SET_TITLES[type],
      zone: set.zone ?? (config.toggles_zone || 'bottom'),
      orientation: set.orientation ?? (set.zone === 'left' || set.zone === 'right' ? 'column' : 'row'),
      columns: set.columns ?? 0,
      align: set.align ?? (type === 'chips' ? 'center' : 'stretch'),
      // Compact turns full-time sets into toggles; menus are already compact.
      display: set.display === 'menu' ? 'menu' : config.compact ? 'toggle' : (set.display ?? 'always'),
      menuDirection: set.menu_direction ?? defaultMenuDirection(set.zone ?? (config.toggles_zone || 'bottom')),
      menuShowName: set.menu_show_name ?? false,
      toggleIcon: set.toggle_icon ?? SET_TOGGLE_ICONS[type],
      options,
      tiles,
      config: set,
    });
  });
  return views;
}

/** Open away from the edge the set sits on: top → down, bottom → up, left → right, right → left. */
export function defaultMenuDirection(zone: Zone): 'down' | 'up' | 'left' | 'right' {
  return zone === 'bottom' ? 'up' : zone === 'left' ? 'right' : zone === 'right' ? 'left' : 'down';
}

const OFF_WORDS = new Set(['off', 'none', 'idle', 'closed', 'false', 'no', 'standby', 'stopped', 'not_home', 'unavailable', 'unknown', '']);

/** "Nothing to show": off, 0 (or less), none, idle, closed, unavailable… */
export function valueIsOff(hass: HomeAssistant, entityId: string): boolean {
  const e = hass.states[entityId];
  if (!e) return true;
  const s = String(e.state).trim().toLowerCase();
  if (OFF_WORDS.has(s)) return true;
  const n = Number(s);
  return s !== '' && Number.isFinite(n) && n <= 0;
}

const ACTION_ICONS = { script: 'mdi:script-text-play-outline', scene: 'mdi:palette-outline', service: 'mdi:flash-outline' };

export function actionIcon(it: ActionItem): string {
  return ACTION_ICONS[it.action ?? (it.entity?.startsWith('scene.') ? 'scene' : it.entity ? 'script' : 'service')];
}

export function actionLabel(hass: HomeAssistant, it: ActionItem): string {
  const n = it.entity ? hass.states[it.entity]?.attributes.friendly_name : undefined;
  if (typeof n === 'string') return n;
  if (it.service) return prettify(it.service.split('.').pop() ?? it.service);
  return it.entity ?? 'Action';
}

/** script / scene: turn it on. service: domain.service with its data (+ target). */
export function actionCall(it: ActionItem): ServiceCall | null {
  const kind = it.action ?? (it.entity?.startsWith('scene.') ? 'scene' : it.entity?.startsWith('script.') ? 'script' : 'service');
  if (kind === 'script' || kind === 'scene') {
    return it.entity ? { domain: kind, service: 'turn_on', data: { entity_id: it.entity } } : null;
  }
  const m = /^([a-z0-9_]+)\.([a-z0-9_]+)$/.exec(it.service ?? '');
  if (!m) return null;
  return { domain: m[1]!, service: m[2]!, data: { ...(it.data ?? {}), ...(it.entity ? { entity_id: it.entity } : {}) } };
}

export function optionCall(type: SetType, entityId: string, value: string): ServiceCall | null {
  switch (type) {
    case 'hvac':
      return { domain: 'climate', service: 'set_hvac_mode', data: { entity_id: entityId, hvac_mode: value } };
    case 'preset':
      return { domain: 'climate', service: 'set_preset_mode', data: { entity_id: entityId, preset_mode: value } };
    case 'fan_mode':
      return { domain: 'climate', service: 'set_fan_mode', data: { entity_id: entityId, fan_mode: value } };
    default:
      return null;
  }
}
