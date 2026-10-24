import type { TempAdjustModel } from './setpoint';
import { setTemperatureCall } from './setpoint';
import type { ServiceCall } from './service-call';

// Debounced write + optimistic hold for setpoint edits, shared by the wheel,
// stepper and bar. Ported from ecosee's temperature overlay (#1 / #117):
// - a burst of nudges/drags coalesces into ONE climate.set_temperature call;
// - after writing, incoming hass state that still shows the OLD setpoints is
//   ignored until it catches up (or RECONCILE_MS passes), so the display
//   doesn't snap back while the device processes the change;
// - while dragging, hass updates never yank the value.

export const WRITE_DEBOUNCE_MS = 600;
export const RECONCILE_MS = 8000;

function same(a: TempAdjustModel, b: TempAdjustModel): boolean {
  return a.heat?.value === b.heat?.value && a.cool?.value === b.cool?.value;
}

export class SetpointController {
  edit: TempAdjustModel | null = null;
  dragging = false;
  private pending: TempAdjustModel | null = null;
  private writeTimer: ReturnType<typeof setTimeout> | null = null;
  private reconcileTimer: ReturnType<typeof setTimeout> | null = null;
  private latest: TempAdjustModel | null = null;

  constructor(
    private readonly entityId: () => string,
    private readonly send: (call: ServiceCall) => void,
    private readonly changed: () => void,
  ) {}

  /** Feed the model derived from the latest hass. */
  sync(incoming: TempAdjustModel): void {
    this.latest = incoming;
    if (this.dragging) return;
    if (this.pending && incoming.mode === this.pending.mode && !same(incoming, this.pending)) {
      // Keep the active-handle choice from the user's edit.
      return;
    }
    const active = this.edit && incoming[this.edit.active] ? this.edit.active : incoming.active;
    this.edit = { ...incoming, active };
    this.pending = null;
    this.clearReconcile();
  }

  /** Live preview without scheduling a write (used during a drag). */
  preview(next: TempAdjustModel): void {
    this.edit = next;
    this.changed();
  }

  commit(next: TempAdjustModel): void {
    this.edit = next;
    this.pending = next;
    if (this.writeTimer) clearTimeout(this.writeTimer);
    this.writeTimer = setTimeout(() => this.flush(), WRITE_DEBOUNCE_MS);
    this.changed();
  }

  /** Change only which setpoint is edited (no write). */
  select(next: TempAdjustModel): void {
    this.edit = next;
    if (this.pending) this.pending = { ...this.pending, active: next.active };
    this.changed();
  }

  flush(): void {
    if (this.writeTimer) clearTimeout(this.writeTimer);
    this.writeTimer = null;
    const call = this.edit ? setTemperatureCall(this.edit, this.entityId()) : null;
    if (call) this.send(call);
    this.clearReconcile();
    this.reconcileTimer = setTimeout(() => {
      this.reconcileTimer = null;
      this.pending = null;
      if (this.latest) {
        const want = this.edit?.active;
        this.edit = { ...this.latest, active: want && this.latest[want] ? want : this.latest.active };
        this.changed();
      }
    }, RECONCILE_MS);
  }

  /** On disconnect: send anything still queued, drop timers. */
  dispose(): void {
    if (this.writeTimer) this.flush();
    this.clearReconcile();
    this.pending = null;
  }

  private clearReconcile(): void {
    if (this.reconcileTimer) clearTimeout(this.reconcileTimer);
    this.reconcileTimer = null;
  }
}
