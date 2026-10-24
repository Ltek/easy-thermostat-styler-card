import type { HomeAssistant, HassEntity } from './hass';
import type { ButtonSetConfig, CardConfig, SetType, Zone } from './config';
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
  options: ButtonOption[];
  config: ButtonSetConfig;
}

export const SET_TITLES: Record<SetType, string> = {
  hvac: 'Mode',
  preset: 'Preset',
  fan_mode: 'Fan',
  chips: 'Devices',
};

const SET_TOGGLE_ICONS: Record<SetType, string> = {
  hvac: 'mdi:thermostat',
  preset: 'mdi:home-thermometer-outline',
  fan_mode: 'mdi:fan',
  chips: 'mdi:devices',
};

/** Attribute that lists the options / holds the active one, per set type. */
const SOURCE: Record<Exclude<SetType, 'chips'>, { list: string; active: string | null }> = {
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
export function availableOptions(entity: HassEntity | undefined, type: SetType): string[] {
  if (!entity || type === 'chips') return [];
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
  configuredSets(config).forEach((set, index) => {
    if (set.hidden) return;
    const type = set.type;
    let options: ButtonOption[] = [];
    if (type !== 'chips') {
      if (!entity) return;
      const values = availableOptions(entity, type);
      if (!values.length) return; // entity doesn't support this set → hidden
      const activeAttr = SOURCE[type].active;
      const activeValue = activeAttr ? String(entity.attributes[activeAttr] ?? '') : entity.state;
      options = orderOptions(values, set.order)
        .filter((v) => !set.options?.[v]?.hide)
        .map((value) => {
          const o = set.options?.[value];
          return {
            value,
            label: o?.name ?? optionLabel(hass, entity, type, value),
            icon: o?.icon ?? MODE_ICONS[value.toLowerCase()] ?? 'mdi:circle-medium',
            active: value === activeValue,
            color: type === 'hvac' ? (MODE_COLORS[value] ?? ACCENT) : ACCENT,
          };
        });
      if (!options.length) return;
    } else if (!set.chips?.length) return;
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
      display: set.display === 'menu' && type !== 'chips' ? 'menu' : config.compact ? 'toggle' : (set.display ?? 'always'),
      menuDirection: set.menu_direction ?? defaultMenuDirection(set.zone ?? (config.toggles_zone || 'bottom')),
      menuShowName: set.menu_show_name ?? true,
      toggleIcon: set.toggle_icon ?? SET_TOGGLE_ICONS[type],
      options,
      config: set,
    });
  });
  return views;
}

/** Open away from the edge the set sits on: top → down, bottom → up, left → right, right → left. */
export function defaultMenuDirection(zone: Zone): 'down' | 'up' | 'left' | 'right' {
  return zone === 'bottom' ? 'up' : zone === 'left' ? 'right' : zone === 'right' ? 'left' : 'down';
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
