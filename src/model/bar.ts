import type { BarConfig } from './config';
import type { TempAdjustModel } from './setpoint';

// Setpoint bar geometry: value ↔ fraction mapping, ticks and labels. Pure, so
// the drag math is unit-testable without a DOM.

export interface BarRange {
  min: number;
  max: number;
}

/** Display range: configured → entity limits → a sensible window per unit. */
export function barRange(model: TempAdjustModel, bar: BarConfig | undefined): BarRange {
  const edit = model.heat ?? model.cool;
  const celsius = model.unit.includes('C');
  let min = bar?.range_min ?? edit?.min ?? (celsius ? 10 : 50);
  let max = bar?.range_max ?? edit?.max ?? (celsius ? 32 : 90);
  if (!(max > min)) max = min + (celsius ? 10 : 20);
  // Keep the setpoints inside the window even if a custom range is too tight.
  for (const e of [model.heat, model.cool]) {
    if (!e) continue;
    min = Math.min(min, e.value);
    max = Math.max(max, e.value);
  }
  return { min, max };
}

export function toFraction(value: number, r: BarRange): number {
  return Math.min(1, Math.max(0, (value - r.min) / (r.max - r.min)));
}

export function fromFraction(f: number, r: BarRange): number {
  return r.min + Math.min(1, Math.max(0, f)) * (r.max - r.min);
}

export interface Tick {
  value: number;
  fraction: number;
  label: boolean;
}

/** Minor ticks every `every`, labelled every `labels` (both in degrees). */
export function barTicks(r: BarRange, every: number, labels: number): Tick[] {
  const step = every > 0 ? every : labels > 0 ? labels : 0;
  if (step <= 0) return [];
  const out: Tick[] = [];
  const start = Math.ceil(r.min / step) * step;
  // Guard against a degenerate step producing thousands of nodes.
  if ((r.max - start) / step > 200) return [];
  for (let v = start; v <= r.max + 1e-9; v = Math.round((v + step) * 1000) / 1000) {
    const isLabel = labels > 0 && Math.abs(v / labels - Math.round(v / labels)) < 1e-6;
    out.push({ value: v, fraction: toFraction(v, r), label: isLabel });
  }
  return out;
}

/** Which handle a press at `fraction` grabs: the nearer one (ties → active). */
export function nearestHandle(model: TempAdjustModel, fraction: number, r: BarRange): 'heat' | 'cool' {
  if (!model.heat) return 'cool';
  if (!model.cool) return 'heat';
  const dh = Math.abs(toFraction(model.heat.value, r) - fraction);
  const dc = Math.abs(toFraction(model.cool.value, r) - fraction);
  if (Math.abs(dh - dc) < 1e-6) return model.active;
  return dh < dc ? 'heat' : 'cool';
}
