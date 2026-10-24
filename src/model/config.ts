// Card configuration: types, defaults and the byte-stable normalizer.
//
// Byte-stability (CARD_DESIGN_SYSTEM §0.2): every key is optional and stored
// only when it differs from "unset". `normalizeConfig` drops empty strings,
// undefined/null, empty objects/arrays and out-of-range numbers, and is
// idempotent — normalizing twice gives the same result, so a re-save of an
// untouched card never rewrites its YAML. Rendering defaults live in code
// (`DEFAULTS` below), never in the stored config.

export const CARD_VERSION = '2026.10.24.2';
export const CARD_TYPE = 'easy-thermostat-styler-card';
export const EDITOR_TYPE = 'easy-thermostat-styler-card-editor';

export type Zone = 'top' | 'bottom' | 'left' | 'right';
export type SetType = 'hvac' | 'preset' | 'fan_mode' | 'chips';
export const SET_TYPES: SetType[] = ['hvac', 'preset', 'fan_mode', 'chips'];
export const ZONES: Zone[] = ['top', 'bottom', 'left', 'right'];

export type TextRole =
  | 'name'
  | 'status'
  | 'current'
  | 'unit'
  | 'humidity'
  | 'pill'
  | 'wheel_value'
  | 'wheel_neighbor'
  | 'bar';
export const TEXT_ROLES: TextRole[] = [
  'name',
  'status',
  'current',
  'unit',
  'humidity',
  'pill',
  'wheel_value',
  'wheel_neighbor',
  'bar',
];

export interface TextStyle {
  size?: number; // px, 0/absent = inherit
  weight?: number; // 100–900
  color?: string; // four-mode color value
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  letter_spacing?: number; // em × 100 (e.g. 4 = 0.04em) — integer for sliders
  italic?: boolean; // three-state: absent = inherit
  opacity?: number; // 0–100
}

export type ButtonVariant = 'tonal' | 'filled' | 'outlined' | 'ghost';
export type ButtonContent = 'icon_label' | 'icon' | 'label';

/** The ONE button property set, offered identically at card and set level. */
export interface ButtonStyle {
  variant?: ButtonVariant;
  content?: ButtonContent;
  icon_position?: 'top' | 'left';
  radius?: number;
  height?: number;
  min_width?: number;
  gap?: number;
  icon_size?: number;
  font_size?: number;
  font_weight?: number;
  border_width?: number;
  background?: string;
  color?: string;
  border_color?: string;
  active_background?: string;
  active_color?: string;
  active_border_color?: string;
}
export const BUTTON_STYLE_KEYS: (keyof ButtonStyle)[] = [
  'variant',
  'content',
  'icon_position',
  'radius',
  'height',
  'min_width',
  'gap',
  'icon_size',
  'font_size',
  'font_weight',
  'border_width',
  'background',
  'color',
  'border_color',
  'active_background',
  'active_color',
  'active_border_color',
];

export interface SetOption {
  name?: string;
  icon?: string;
  hide?: boolean;
}

export type ChipTap = 'popup' | 'more-info' | 'toggle' | 'none';
export type ChipHold = 'toggle' | 'toggle_light' | 'more-info' | 'none';

export interface ChipConfig {
  type: 'rf_fan' | 'entity';
  entity: string;
  name?: string;
  icon?: string;
  show_name?: boolean;
  show_state?: boolean;
  tap?: ChipTap;
  hold?: ChipHold;
  /** Card config shown in the pop-up (tap: popup). Default for rf_fan:
   *  `{ type: 'custom:rf-fan-ltek', fan_entity: <entity> }`. */
  popup_card?: Record<string, unknown>;
}

export interface ButtonSetConfig {
  type: SetType;
  name?: string;
  zone?: Zone;
  orientation?: 'row' | 'column';
  columns?: number; // 0/absent = auto-fit
  align?: 'start' | 'center' | 'end' | 'stretch';
  display?: 'always' | 'toggle';
  toggle_icon?: string;
  hidden?: boolean;
  order?: string[];
  options?: Record<string, SetOption>;
  style?: ButtonStyle;
  chips?: ChipConfig[];
}

export type SetpointControl = 'wheel' | 'stepper' | 'bar' | 'none';

export interface BarConfig {
  position?: 'below' | 'above' | 'left' | 'right';
  length?: number; // vertical bar height (px)
  look?: 'zones' | 'gradient';
  height?: number;
  ticks?: number; // degrees between minor ticks, 0 = none
  labels?: number; // degrees between labels, 0 = none
  show_current?: boolean;
  flags?: boolean;
  handle_shape?: 'round' | 'square' | 'line' | 'diamond';
  handle_color?: string;
  range_min?: number;
  range_max?: number;
  heat_color?: string;
  cool_color?: string;
  comfort_color?: string;
  stops?: string[]; // gradient look: hex stops, cold → hot
}

export interface SetpointConfig {
  control?: SetpointControl;
  position?: 'left' | 'right' | 'center';
  scale?: number; // %
  neighbors?: number; // 0–3
  nudge?: 'beside' | 'stacked' | 'hidden';
  min_gap?: number;
  bar?: BarConfig;
}

export interface CardSurface {
  background?: string;
  border_color?: string;
  border_width?: number;
  radius?: number;
  padding?: number;
  glow?: boolean;
}

export interface CardConfig {
  type: string;
  entity: string;
  name?: string;
  show_name?: boolean;
  show_status?: boolean;
  show_humidity?: boolean;
  show_pills?: boolean;
  show_current?: boolean;
  core_align?: 'left' | 'center' | 'right';
  compact?: boolean;
  toggles_zone?: Zone;
  setpoint?: SetpointConfig;
  sets?: ButtonSetConfig[];
  buttons?: ButtonStyle;
  text?: Partial<Record<TextRole, TextStyle>>;
  card?: CardSurface;
  [key: string]: unknown;
}

/** Rendering defaults — code, not config. */
export const DEFAULTS = {
  show_name: true,
  show_status: true,
  show_humidity: true,
  show_pills: true,
  show_current: true,
  core_align: 'center' as const,
  toggles_zone: 'bottom' as Zone,
  control: 'wheel' as SetpointControl,
  position: 'right' as const,
  scale: 100,
  neighbors: 1,
  nudge: 'beside' as const,
  bar: {
    position: 'below' as const,
    look: 'zones' as const,
    height: 14,
    ticks: 1,
    labels: 5,
    show_current: true,
    flags: true,
    handle_shape: 'round' as const,
  },
  glow: true,
};

/** Default button sets when `sets` is absent: the card shows whichever of these
 *  the entity supports. HVAC modes full-time; presets and fan behind toggles. */
export const DEFAULT_SETS: ButtonSetConfig[] = [
  { type: 'hvac' },
  { type: 'preset', display: 'toggle' },
  { type: 'fan_mode', display: 'toggle' },
];

// ---------------------------------------------------------------------------
// Normalizer
// ---------------------------------------------------------------------------

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => !!v && typeof v === 'object' && !Array.isArray(v);

/** Recursively drop empty values. Arrays keep order; empty containers vanish. */
function prune(value: unknown): unknown {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (Array.isArray(value)) {
    const out = value.map(prune).filter((v) => v !== undefined);
    return out.length ? out : undefined;
  }
  if (isObj(value)) {
    const out: Obj = {};
    for (const [k, v] of Object.entries(value)) {
      const p = prune(v);
      if (p !== undefined) out[k] = p;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return value;
}

const clamp = (v: unknown, lo: number, hi: number): number | undefined => {
  const n = typeof v === 'number' ? v : typeof v === 'string' && v.trim() ? Number(v) : NaN;
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : undefined;
};

function normalizeSet(raw: unknown): ButtonSetConfig | undefined {
  if (!isObj(raw) || typeof raw.type !== 'string') return undefined;
  const set = { ...raw } as Obj;
  if ('columns' in set) set.columns = clamp(set.columns, 0, 12) || undefined;
  if (Array.isArray(set.chips)) {
    set.chips = set.chips.filter((c) => isObj(c) && typeof c.entity === 'string' && c.entity);
  }
  return set as unknown as ButtonSetConfig;
}

/** Normalize a raw config. Idempotent; preserves unknown keys verbatim. */
export function normalizeConfig(raw: unknown): CardConfig {
  if (!isObj(raw)) throw new Error('Invalid configuration');
  const cfg: Obj = { ...raw };
  if (typeof cfg.entity !== 'string' || !cfg.entity) {
    throw new Error('Easy Thermostat Styler Card: set an entity (a climate.* entity).');
  }
  const sp = isObj(cfg.setpoint) ? { ...cfg.setpoint } : undefined;
  if (sp) {
    if ('scale' in sp) sp.scale = clamp(sp.scale, 40, 250);
    if ('neighbors' in sp) sp.neighbors = clamp(sp.neighbors, 0, 3);
    if ('min_gap' in sp) sp.min_gap = clamp(sp.min_gap, 0, 20);
    cfg.setpoint = sp;
  }
  if (Array.isArray(cfg.sets)) {
    cfg.sets = cfg.sets.map(normalizeSet).filter(Boolean);
    // An explicitly empty list is meaningful ("no button sets"), keep it.
    if ((cfg.sets as unknown[]).length === 0) {
      const out = prune({ ...cfg, sets: undefined }) as Obj;
      return { ...out, sets: [] } as unknown as CardConfig;
    }
  }
  return prune(cfg) as CardConfig;
}

// ---------------------------------------------------------------------------
// Path helpers (editor writes; byte-stable)
// ---------------------------------------------------------------------------

export function getPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((o, k) => (isObj(o) || Array.isArray(o) ? (o as Obj)[k] : undefined), obj);
}

/** Immutable set; `undefined`/'' deletes the key and prunes now-empty parents. */
export function setPath<T extends Obj>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  const walk = (node: unknown, i: number): unknown => {
    const base: Obj | unknown[] = Array.isArray(node) ? [...node] : isObj(node) ? { ...node } : {};
    const k = keys[i]!;
    if (i === keys.length - 1) {
      if (value === undefined || value === '' || value === null) {
        if (Array.isArray(base)) base.splice(Number(k), 1);
        else delete (base as Obj)[k];
      } else (base as Obj)[k] = value;
    } else {
      const child = walk((base as Obj)[k], i + 1);
      if (child === undefined) delete (base as Obj)[k];
      else (base as Obj)[k] = child;
    }
    if (!Array.isArray(base) && Object.keys(base).length === 0) return undefined;
    return base;
  };
  return (walk(obj, 0) ?? {}) as T;
}
