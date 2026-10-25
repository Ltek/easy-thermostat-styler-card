// Card configuration: types, defaults and the byte-stable normalizer.
//
// Byte-stability (CARD_DESIGN_SYSTEM §0.2): every key is optional and stored
// only when it differs from "unset". `normalizeConfig` drops empty strings,
// undefined/null, empty objects/arrays and out-of-range numbers, and is
// idempotent — normalizing twice gives the same result, so a re-save of an
// untouched card never rewrites its YAML. Rendering defaults live in code
// (`DEFAULTS` below), never in the stored config.

export const CARD_VERSION = '2026.10.25.22';
export const CARD_TYPE = 'easy-thermostat-styler-card';
export const EDITOR_TYPE = 'easy-thermostat-styler-card-editor';

export type Zone = 'top' | 'bottom' | 'left' | 'right';
/** hvac / preset / fan_mode: built-in, filled from the thermostat. custom: only
 *  the buttons you add. chips: the older device-only set (read as custom). */
export type SetType = 'hvac' | 'preset' | 'fan_mode' | 'custom' | 'chips';
export const SET_TYPES: SetType[] = ['hvac', 'preset', 'fan_mode', 'custom', 'chips'];
export type ModeSource = 'hvac' | 'preset' | 'fan_mode';
export const BUILTIN_SETS: ModeSource[] = ['hvac', 'preset', 'fan_mode'];
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
  /** Button tiles or chips. Unset: chips for device sets, buttons for the rest. */
  look?: 'button' | 'chip';
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
  /** Space between icon and label, px. */
  icon_gap?: number;
  /** Size of the whole button, % (100 = normal). */
  scale?: number;
  border_width?: number;
  background?: string;
  color?: string;
  border_color?: string;
  active_background?: string;
  active_color?: string;
  active_border_color?: string;
}
export const BUTTON_STYLE_KEYS: (keyof ButtonStyle)[] = [
  'look',
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
  'icon_gap',
  'scale',
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
  /** rf_fan: how the speed reads — `4`, `4/10` or `40%`. */
  speed_format?: 'number' | 'fraction' | 'percent';
  /** Hide the button while the value is off, 0, none, idle, closed, unavailable… */
  hide_when_off?: boolean;
  tap?: ChipTap;
  hold?: ChipHold;
  /** Card config shown in the pop-up (tap: popup). Default for rf_fan:
   *  `{ type: 'custom:rf-fan-ltek', fan_entity: <entity> }`. */
  popup_card?: Record<string, unknown>;
}

/** A button you add to a set. */
export interface ModeItem {
  kind: 'mode';
  source: ModeSource;
  value: string;
  name?: string;
  icon?: string;
  hide?: boolean;
}
export interface DeviceItem extends ChipConfig {
  kind: 'device';
  hide?: boolean;
}
export interface ActionItem {
  kind: 'action';
  action?: 'script' | 'scene' | 'service';
  /** script.* / scene.* (or an optional target for a service). */
  entity?: string;
  /** domain.service, for action: service */
  service?: string;
  data?: Record<string, unknown>;
  name?: string;
  icon?: string;
  hide?: boolean;
}
export type ButtonItem = ModeItem | DeviceItem | ActionItem;

export interface ButtonSetConfig {
  type: SetType;
  /** Stable id, only added when another set refers to this one. */
  id?: string;
  /** Sit in the same row as the set with this id (in its place). */
  row_with?: string;
  name?: string;
  zone?: Zone;
  orientation?: 'row' | 'column';
  columns?: number; // 0/absent = auto-fit
  align?: 'start' | 'center' | 'end' | 'stretch';
  display?: 'always' | 'toggle' | 'menu';
  /** menu: which way the list opens; default away from the card edge it sits on. */
  menu_direction?: 'down' | 'up' | 'left' | 'right';
  /** menu: show the set name above the current value (default true). */
  menu_show_name?: boolean;
  toggle_icon?: string;
  hidden?: boolean;
  order?: string[];
  options?: Record<string, SetOption>;
  style?: ButtonStyle;
  chips?: ChipConfig[];
  /** Buttons you added (after the built-in ones in Mode / Preset / Fan sets). */
  items?: ButtonItem[];
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
  /** Where Heating / Cooling / Idle sits: above the temperature, beside it, or below it. */
  status_position?: 'above' | 'beside' | 'below';
  flags?: boolean;
  handle_shape?: 'round' | 'square' | 'line' | 'diamond';
  handle_color?: string;
  /** Handle outline: a color, or 'none' for no border. Unset = heat / cool color. */
  handle_border_color?: string;
  /** Value flags: background and text color (unset = heat / cool color, white). */
  flag_color?: string;
  flag_text_color?: string;
  /** Where the flags sit: above / below a horizontal bar, left / right of a vertical one. */
  flag_position?: 'above' | 'below' | 'left' | 'right';
  /** Where tick marks and labels sit: below / above a horizontal bar, right / left of a vertical one. */
  tick_position?: 'above' | 'below' | 'left' | 'right';
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
  /** − / + placement. 'beside' is the older name for 'right'. */
  nudge?: 'right' | 'left' | 'above' | 'below' | 'stacked' | 'around' | 'hidden' | 'beside';
  /** Wheel center: the gradient bubble, or the same pill as the setpoint pills. */
  wheel_style?: 'bubble' | 'pill';
  min_gap?: number;
  bar?: BarConfig;
  /** `tap`: the control stays closed until you tap the pills / current temperature. */
  reveal?: 'always' | 'tap';
  /** What opens it (tap mode). */
  reveal_from?: 'both' | 'pills' | 'current';
  /** What shows while closed: the control's own value (bubble / value / read-only bar) or nothing. */
  collapsed?: 'visual' | 'hidden';
  /** Where it opens: its usual place, or in place of the current temperature. */
  open_in?: 'place' | 'current';
  /** Seconds without use before it closes again; 0 = stay open until tapped. */
  hide_after?: number;
  /** Tap mode: while closed, hide the setpoint once the room has reached it. */
  hide_at_target?: boolean;
  /** Tap mode: hide the setpoint pills while the controls are open (the control shows the setpoint). */
  hide_pills_open?: boolean;
}

export type FxValue = 'none' | 'glow' | 'pulse' | 'both';

/** Heating / cooling effects. Absent targets are off (card: follows `card.glow`). */
export interface EffectsConfig {
  card?: FxValue;
  setpoint?: FxValue;
  pill?: FxValue;
  mode_button?: FxValue;
  mode_icon?: FxValue;
  /** `running`: only while the system is actually heating / cooling (hvac_action).
   *  `mode`: whenever the mode is Heat or Cool, even when idle. */
  when?: 'running' | 'mode';
  size?: number; // glow size px
  speed?: number; // pulse period s
  heat_color?: string;
  cool_color?: string;
}

export type BgStyle = 'none' | 'plasma' | 'lava' | 'aurora' | 'flow' | 'shimmer' | 'particles' | 'core' | 'mesh' | 'beam';
export type BgStateKey = 'heating' | 'cooling' | 'idle_heat' | 'idle_cool' | 'fan' | 'off';

/** The card's surface: a base fill plus an optional moving layer. */
export interface BackgroundConfig {
  fill?: 'color' | 'gradient' | 'image';
  /** Base color (four-mode or 'transparent'); unset = theme card color. */
  color?: string;
  gradient?: { type?: 'linear' | 'radial'; angle?: number; stops?: string[] };
  image?: { url?: string; fit?: 'cover' | 'contain' | 'tile'; blur?: number; darken?: number };
  style?: BgStyle;
  strength?: number; // %
  speed?: number; // %
  /** Heating / cooling move faster and stronger the further the room is from the setpoint. */
  follow_gap?: boolean;
  /** Off: a calm, near-still layer, or none. */
  off?: 'calm' | 'none';
  /** Sync to Air Movement: any entity that says how much air is moving (fan %,
   *  speed levels, on/off, low/med/high, an airflow sensor). While it shows air
   *  moving the background swirls at that speed. */
  air_entity?: string;
  /** Value that means full speed, for raw numbers (e.g. 1200 for a CFM sensor). */
  air_max?: number;
  /** @deprecated v2026.10.24.10 name for air_entity; still read. */
  fan_entity?: string;
  colors?: Partial<Record<BgStateKey, { main?: string; second?: string }>>;
  quality?: 'smooth' | 'light';
  scrim?: number; // -60 (lighten) … 60 (darken)
  vignette?: number; // %
  grain?: number; // %
  /** @deprecated moved to the top-level `frosted` / `frost_blur`; still read. */
  frosted?: boolean;
  frost_blur?: number; // px
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
  /** Space between the button areas and the main area, and keeping it centered. */
  zones?: {
    centered?: boolean;
    gap?: number;
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
  effects?: EffectsConfig;
  background?: BackgroundConfig;
  /** Frosted glass controls: buttons, pills, chips, menus and the wheel bubble. */
  frosted?: boolean;
  frost_blur?: number; // px
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
  status_position: 'above' as const,
  wheel_style: 'bubble' as const,
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
  reveal: 'always' as const,
  reveal_from: 'both' as const,
  collapsed: 'visual' as const,
  open_in: 'place' as const,
  hide_after: 8,
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
  if (Array.isArray(set.items)) {
    set.items = set.items.filter((it) => {
      if (!isObj(it)) return false;
      if (it.kind === 'mode') return typeof it.value === 'string' && !!it.value && typeof it.source === 'string';
      if (it.kind === 'device') return typeof it.entity === 'string' && !!it.entity;
      if (it.kind === 'action') return true;
      return false;
    });
  }
  return set as unknown as ButtonSetConfig;
}

/** Normalize a raw config. Idempotent; preserves unknown keys verbatim. */
export function normalizeConfig(raw: unknown): CardConfig {
  if (!isObj(raw)) throw new Error('Invalid configuration');
  const cfg: Obj = { ...raw };
  delete cfg.test_mode; // v2026.10.24.13 stored it; test mode now lives in the open editor only
  if (typeof cfg.entity !== 'string' || !cfg.entity) {
    throw new Error('Easy Thermostat Styler Card: set an entity (a climate.* entity).');
  }
  const sp = isObj(cfg.setpoint) ? { ...cfg.setpoint } : undefined;
  if (sp) {
    if ('scale' in sp) sp.scale = clamp(sp.scale, 40, 250);
    if ('neighbors' in sp) sp.neighbors = clamp(sp.neighbors, 0, 3);
    if ('min_gap' in sp) sp.min_gap = clamp(sp.min_gap, 0, 20);
    if ('hide_after' in sp) sp.hide_after = clamp(sp.hide_after, 0, 300);
    cfg.setpoint = sp;
  }
  if (isObj(cfg.background)) {
    const bg = { ...cfg.background } as Obj;
    if ('strength' in bg) bg.strength = clamp(bg.strength, 0, 100);
    if ('speed' in bg) bg.speed = clamp(bg.speed, 25, 300);
    if ('scrim' in bg) bg.scrim = clamp(bg.scrim, -60, 60) || undefined;
    if ('vignette' in bg) bg.vignette = clamp(bg.vignette, 0, 100) || undefined;
    if ('grain' in bg) bg.grain = clamp(bg.grain, 0, 100) || undefined;
    if ('frost_blur' in bg) bg.frost_blur = clamp(bg.frost_blur, 0, 40);
    if ('air_max' in bg) bg.air_max = clamp(bg.air_max, 0.01, 1000000);
    if (isObj(bg.image)) {
      const im = { ...bg.image };
      if ('blur' in im) im.blur = clamp(im.blur, 0, 40) || undefined;
      if ('darken' in im) im.darken = clamp(im.darken, 0, 90) || undefined;
      bg.image = im;
    }
    if (isObj(bg.gradient) && 'angle' in bg.gradient) bg.gradient = { ...bg.gradient, angle: clamp(bg.gradient.angle, 0, 360) };
    cfg.background = bg;
  }
  if ('frost_blur' in cfg) cfg.frost_blur = clamp(cfg.frost_blur, 0, 40);
  if (isObj(cfg.effects)) {
    const fx = { ...cfg.effects };
    if ('size' in fx) fx.size = clamp(fx.size, 2, 60);
    if ('speed' in fx) fx.speed = clamp(fx.speed, 0.6, 8);
    cfg.effects = fx;
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
