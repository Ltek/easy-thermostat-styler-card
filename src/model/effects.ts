import type { CardConfig } from './config';
import type { ClimateView } from './climate';

// Heating / cooling effects: Glow and/or Pulse on chosen parts of the card.
// Pure resolver → a list of classes on <ha-card> plus a few custom properties;
// the stylesheet does the rest (static, identical for every instance).

export type FxMode = 'none' | 'glow' | 'pulse' | 'both';
export const FX_TARGETS = ['card', 'setpoint', 'pill', 'mode_button', 'mode_icon'] as const;
export type FxTarget = (typeof FX_TARGETS)[number];

export const FX_LABELS: Record<FxTarget, string> = {
  card: 'Entire card',
  setpoint: 'Setpoint value (wheel, stepper or bar handle)',
  pill: 'Setpoint pill',
  mode_button: 'Mode button',
  mode_icon: 'Mode icon',
};

export const FX_DEFAULTS = { when: 'running' as const, size: 18, speed: 2.4 };

/** The card glow predates Effects (`card.glow`, on by default): keep honouring it. */
export function fxMode(config: CardConfig, target: FxTarget): FxMode {
  const v = config.effects?.[target];
  if (v) return v;
  if (target === 'card') return (config.card?.glow ?? true) ? 'glow' : 'none';
  return 'none';
}

/** Which side is "active" right now, or null when effects are off. */
export function fxSide(config: CardConfig, view: ClimateView): 'heat' | 'cool' | null {
  if (!view.available) return null;
  if (view.equipment === 'heating') return 'heat';
  if (view.equipment === 'cooling') return 'cool';
  if ((config.effects?.when ?? FX_DEFAULTS.when) === 'mode') {
    if (view.mode === 'heat') return 'heat';
    if (view.mode === 'cool') return 'cool';
  }
  return null;
}

export function fxClasses(config: CardConfig, view: ClimateView): Record<string, boolean> {
  const side = fxSide(config, view);
  const out: Record<string, boolean> = {};
  if (!side) return out;
  out['fx-on'] = true;
  out[`fx-${side}`] = true;
  for (const t of FX_TARGETS) {
    const m = fxMode(config, t);
    if (m === 'glow' || m === 'both') out[`fx-${t}-glow`] = true;
    if (m === 'pulse' || m === 'both') out[`fx-${t}-pulse`] = true;
  }
  return out;
}

export function fxVars(config: CardConfig): Record<string, string> {
  const e = config.effects ?? {};
  const out: Record<string, string> = {};
  if (e.size !== undefined) out['--fx-size'] = `${e.size}px`;
  if (e.speed !== undefined) out['--fx-speed'] = `${e.speed}s`;
  if (e.heat_color) out['--fx-heat'] = e.heat_color;
  if (e.cool_color) out['--fx-cool'] = e.cool_color;
  return out;
}
