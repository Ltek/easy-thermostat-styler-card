/** Lenient numeric coercion shared by the climate view-models: Home Assistant
 *  attributes arrive as numbers or numeric strings, and anything non-finite or
 *  unparseable degrades to `null` rather than `NaN` (ADR-0001). */
export function num(value: unknown): number | null {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}
