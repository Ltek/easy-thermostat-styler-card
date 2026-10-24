import type { HomeAssistant } from './hass';
import type { BackgroundConfig, BgStateKey, BgStyle, CardConfig } from './config';
import { UNAVAILABLE, type ClimateView } from './climate';
import { num } from './parse';

// Moving backgrounds. A pure resolver turns hass + config into a BgView:
// which style, which state (heating / cooling / idle / fan / off), which way
// it moves (heat rises, cold sinks, fan swirls), how fast and how strong.
// Colours and rates reach the stylesheet as custom properties only.

export const BG_STYLES: [BgStyle, string, string][] = [
  ['none', 'None', ''],
  ['plasma', 'Liquid Plasma', 'Soft glowing blobs that drift and blend into each other.'],
  ['lava', 'Lava Lamp', 'Molten blobs that merge and split, rising from a pool.'],
  ['aurora', 'Aurora', 'Ribbons of light flowing across the card.'],
  ['flow', 'Thermal Flow', 'Bands of colour streaming up while heating and down while cooling.'],
  ['shimmer', 'Heat Shimmer / Frost', 'Rising heat haze, or cold mist sinking with sparkles.'],
  ['particles', 'Embers / Snow', 'Sparks floating up, or snowflakes drifting down.'],
  ['core', 'Breathing Core', 'A glow behind the temperature that slowly swells.'],
  ['mesh', 'Mesh Gradient', 'Large soft colour fields that slowly orbit and blend.'],
  ['beam', 'Glow Beam', 'A soft diagonal beam of light that drifts.'],
];

export const BG_STATES: [BgStateKey, string][] = [
  ['heating', 'Heating'],
  ['cooling', 'Cooling'],
  ['idle_heat', 'Idle (heat)'],
  ['idle_cool', 'Idle (cool)'],
  ['fan', 'Air movement'],
  ['off', 'Off'],
];

const HEAT = 'var(--state-climate-heat-color, #ff8100)';
const COOL = 'var(--state-climate-cool-color, #2b9af9)';
export const BG_PALETTE: Record<BgStateKey, { main: string; second: string }> = {
  heating: { main: HEAT, second: '#d1342a' },
  cooling: { main: COOL, second: '#3446d6' },
  idle_heat: { main: HEAT, second: '#7a3d14' },
  idle_cool: { main: COOL, second: '#1b4c86' },
  fan: { main: 'var(--state-climate-fan-only-color, #00bfa5)', second: '#3d8fd1' },
  off: { main: '#8a8a92', second: '#3a3a4a' },
};

export const BG_DEFAULTS = {
  strength: 85,
  speed: 100,
  follow_gap: true,
  off: 'calm' as const,
  quality: 'smooth' as const,
  frost_blur: 12,
};

export type BgDir = 'up' | 'down' | 'swirl' | 'still';

export interface BgView {
  style: Exclude<BgStyle, 'none'>;
  state: BgStateKey;
  dir: BgDir;
  /** Animation speed multiplier (quantised so small changes don't restart motion). */
  rate: number;
  opacity: number;
  main: string;
  second: string;
  /** Fan state: soft rotating blades over the style. */
  blades: boolean;
}

const SPEED_WORDS: Record<string, number> = {
  quiet: 0.2, silent: 0.2, sleep: 0.2, lowest: 0.15, low: 0.33, 'medium-low': 0.45, medium_low: 0.45, med: 0.6,
  medium: 0.6, middle: 0.6, mid: 0.6, 'medium-high': 0.8, medium_high: 0.8, high: 0.9, highest: 1, max: 1, turbo: 1, boost: 1, powerful: 1,
};
const STILL = new Set(['off', 'idle', 'closed', 'false', 'no', 'none', 'stopped', 'standby', '0', 'not_running', 'clear']);
const MOVING = new Set(['on', 'true', 'yes', 'open', 'running', 'detected', 'active']);

const clamp01 = (n: number) => Math.min(1, Math.max(0.05, n));

/** Which entity drives "Sync to Air Movement" (newer key first). */
export function airEntity(config: CardConfig): string | undefined {
  return config.background?.air_entity || config.background?.fan_entity || undefined;
}

/**
 * How much air an entity says is moving, 0–1, or null when none (or unknown).
 * Handles a fan (percentage), a number / input_number (its own min…max), a raw
 * numeric sensor (%, a full-speed value, or a sensible guess), speed words
 * (low / medium / high …), a select's position in its options, and on/off.
 */
export function airFraction(hass: HomeAssistant, id: string | undefined, max?: number): number | null {
  if (!id) return null;
  const e = hass.states[id];
  if (!e || UNAVAILABLE.has(e.state)) return null;
  const s = String(e.state).trim().toLowerCase();
  const domain = id.split('.')[0];
  if (STILL.has(s)) return null;
  const a = e.attributes;
  if (domain === 'fan') {
    const p = num(a.percentage);
    return p === null ? 0.6 : p <= 0 ? null : clamp01(p / 100);
  }
  const n = num(e.state);
  if (n !== null) {
    if (n <= 0) return null;
    if (max) return clamp01(n / max);
    const lo = num(a.min);
    const hi = num(a.max);
    if (hi !== null && hi > (lo ?? 0)) return clamp01((n - (lo ?? 0)) / (hi - (lo ?? 0)));
    if (String(a.unit_of_measurement ?? '').trim() === '%') return clamp01(n / 100);
    // Raw value without a stated range: assume the next "round" scale up.
    const scale = n <= 1 ? 1 : n <= 10 ? 10 : 10 ** Math.ceil(Math.log10(n));
    return clamp01(n / scale);
  }
  if (SPEED_WORDS[s] !== undefined) return SPEED_WORDS[s]!;
  const opts = Array.isArray(a.options) ? (a.options as unknown[]).map((o) => String(o).toLowerCase()).filter((o) => !STILL.has(o) && o !== 'auto') : [];
  const i = opts.indexOf(s);
  if (i >= 0) return clamp01((i + 1) / opts.length);
  if (MOVING.has(s)) return 0.6;
  return 0.5; // some other running state ("auto", "breeze", …)
}

/** 0–1 from the thermostat's own fan mode (low … high, or its position in the list). */
function climateFanFraction(hass: HomeAssistant, config: CardConfig): number {
  const e = hass.states[config.entity];
  const mode = String(e?.attributes.fan_mode ?? '').toLowerCase();
  const named: Record<string, number> = { quiet: 0.2, low: 0.33, medium: 0.6, middle: 0.6, high: 1, max: 1, turbo: 1 };
  if (named[mode] !== undefined) return named[mode]!;
  const list = (Array.isArray(e?.attributes.fan_modes) ? (e!.attributes.fan_modes as unknown[]) : [])
    .map((m) => String(m).toLowerCase())
    .filter((m) => !['auto', 'off', 'on', 'circulate', 'diffuse', 'focus'].includes(m));
  const i = list.indexOf(mode);
  return i >= 0 && list.length ? (i + 1) / list.length : 0.5;
}

export function bgState(hass: HomeAssistant, config: CardConfig, view: ClimateView): BgStateKey {
  if (!view.available) return 'off';
  if (view.equipment === 'heating') return 'heating';
  if (view.equipment === 'cooling') return 'cooling';
  if (view.mode === 'fan_only' || view.equipment === 'fan' || airFraction(hass, airEntity(config), config.background?.air_max) !== null) return 'fan';
  if (view.mode === 'off') return 'off';
  if (view.mode === 'cool' || view.mode === 'dry' || view.equipment === 'drying') return 'idle_cool';
  if (view.mode === 'heat_cool' && view.setpoints && view.currentTemp !== null) {
    const { heat, cool } = view.setpoints;
    if (heat !== null && cool !== null) return view.currentTemp >= (heat + cool) / 2 ? 'idle_cool' : 'idle_heat';
    if (cool !== null && heat === null) return 'idle_cool';
  }
  return 'idle_heat';
}

/** 0–1: how far the room is from the setpoint it's working towards. */
export function workIntensity(view: ClimateView, state: BgStateKey): number {
  const t = view.currentTemp;
  const sp = view.setpoints;
  const target = state === 'heating' ? (sp?.heat ?? sp?.cool) : (sp?.cool ?? sp?.heat);
  if (t === null || target === null || target === undefined) return 0.7;
  const scale = view.unit.includes('C') ? 3 : 5;
  return Math.round(Math.min(1, Math.abs(target - t) / scale) * 10) / 10;
}

const quarter = (n: number) => Math.max(0.1, Math.round(n * 4) / 4);

export function toBgView(hass: HomeAssistant, config: CardConfig, view: ClimateView): BgView | null {
  const b = config.background ?? {};
  const style = b.style ?? 'none';
  if (style === 'none') return null;
  const state = bgState(hass, config, view);
  if (state === 'off' && (b.off ?? BG_DEFAULTS.off) === 'none') return null;
  const speed = (b.speed ?? BG_DEFAULTS.speed) / 100;
  const strength = (b.strength ?? BG_DEFAULTS.strength) / 100;
  let rate: number;
  let op: number;
  if (state === 'heating' || state === 'cooling') {
    const k = (b.follow_gap ?? BG_DEFAULTS.follow_gap) ? workIntensity(view, state) : 0.7;
    rate = 0.6 + 1.4 * k;
    op = 0.6 + 0.4 * k;
  } else if (state === 'fan') {
    const f = airFraction(hass, airEntity(config), b.air_max) ?? climateFanFraction(hass, config);
    rate = 0.4 + 2.6 * f;
    op = 0.8;
  } else if (state === 'off') {
    rate = 0.2;
    op = 0.35;
  } else {
    rate = 0.35; // idle: a very slow drift
    op = 0.55;
  }
  const own = b.colors?.[state] ?? {};
  const pal = BG_PALETTE[state];
  return {
    style,
    state,
    dir: state === 'fan' ? 'swirl' : state === 'off' ? 'still' : state === 'heating' || state === 'idle_heat' ? 'up' : 'down',
    rate: quarter(rate * speed),
    opacity: Math.round(op * strength * 100) / 100,
    main: own.main || pal.main,
    second: own.second || pal.second,
    blades: state === 'fan',
  };
}

/** Frosted glass controls (top-level; older cards kept it under background). */
export function frosted(config: CardConfig): boolean {
  return !!(config.frosted ?? config.background?.frosted);
}

/** The card's base fill: colour (or transparent) or a gradient. Unset = theme. */
export function baseFill(config: CardConfig): string | undefined {
  const b: BackgroundConfig = config.background ?? {};
  const stops = b.gradient?.stops?.filter(Boolean) ?? [];
  if (b.fill === 'gradient' && stops.length >= 2) {
    return b.gradient?.type === 'radial'
      ? `radial-gradient(circle at 50% 40%, ${stops.join(', ')})`
      : `linear-gradient(${b.gradient?.angle ?? 135}deg, ${stops.join(', ')})`;
  }
  return b.color ?? (config.card?.background as string | undefined);
}

/** Quote a URL for `url("…")` inside a custom property value. */
function cssUrl(u: string): string {
  return u.replace(/[\\"]/g, (c) => `\\${c}`).replace(/[\n\r]/g, '');
}

export function bgVars(config: CardConfig, bv: BgView | null): Record<string, string> {
  const b = config.background ?? {};
  const out: Record<string, string> = {};
  if (bv) {
    out['--etc-bg-a'] = bv.main;
    out['--etc-bg-b'] = bv.second;
    out['--etc-bg-op'] = String(bv.opacity);
    out['--bg-rate'] = String(bv.rate);
  }
  if ((b.quality ?? BG_DEFAULTS.quality) === 'light') out['--bg-blur-k'] = '0.6';
  if (b.scrim) {
    out['--bg-scrim'] = String(Math.abs(b.scrim) / 100);
    out['--bg-scrim-c'] = b.scrim > 0 ? '#000' : '#fff';
  }
  if (b.vignette) out['--bg-vig'] = String(b.vignette / 100);
  if (b.grain) out['--bg-grain'] = String(b.grain / 100);
  const blur = config.frost_blur ?? b.frost_blur;
  if (frosted(config) && blur !== undefined) out['--frost'] = `${blur}px`;
  if (b.fill === 'image' && b.image?.url) {
    out['--bg-img'] = `url("${cssUrl(b.image.url)}")`;
    if (b.image.blur) out['--bg-img-blur'] = `${b.image.blur}px`;
    if (b.image.darken) out['--bg-img-dark'] = String(b.image.darken / 100);
  }
  return out;
}

export interface BgItem {
  x: number; // %
  y: number; // %
  s: number; // size (% of width, px for particles)
  d: number; // duration s at rate 1
  dl: number; // delay s (negative: already under way)
}

/** Deterministic pseudo-random layout per style (same picture on every load). */
export function bgItems(style: BgStyle, quality: 'smooth' | 'light'): BgItem[] {
  const light = quality === 'light';
  const spec: Record<string, [n: number, nLight: number, sMin: number, sMax: number, dMin: number, dMax: number]> = {
    plasma: [5, 4, 45, 75, 18, 30],
    lava: [6, 4, 18, 34, 16, 26],
    shimmer: [7, 4, 40, 70, 9, 15],
    particles: [22, 10, 3, 9, 10, 20],
    aurora: [3, 2, 30, 42, 14, 22],
  };
  const sp = spec[style];
  if (!sp) return [];
  const [n0, n1, sMin, sMax, dMin, dMax] = sp;
  const n = light ? n1 : n0;
  let seed = style.length * 9973 + 17;
  const r = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  return Array.from({ length: n }, (_, i) => {
    const d = Math.round(dMin + r() * (dMax - dMin));
    return {
      x: Math.round(8 + r() * 84),
      y: style === 'aurora' ? [12, 38, 62][i % 3]! : Math.round(10 + r() * 80),
      s: Math.round(sMin + r() * (sMax - sMin)),
      d,
      // Spread evenly through the cycle, with a little jitter.
      dl: -Math.round(((i + r() * 0.5) / n) * d * 10) / 10,
    };
  });
}
