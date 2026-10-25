import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

import type { HomeAssistant } from './model/hass';
import {
  CARD_TYPE,
  CARD_VERSION,
  DEFAULTS,
  EDITOR_TYPE,
  normalizeConfig,
  type CardConfig,
  type Zone,
} from './model/config';
import { EQUIPMENT_LABEL, formatTemp, toClimateView, type ClimateView } from './model/climate';
import {
  nudge,
  scrub,
  scrubberWindow,
  selectSetpoint,
  setValue,
  toTempAdjustModel,
  type Setpoint,
  type TempAdjustModel,
} from './model/setpoint';
import { SetpointController } from './model/setpoint-controller';
import { MODE_ICONS, optionCall, toSetViews, type SetView } from './model/sets';
import { buttonVars, resolveButtonStyle, surfaceVars, textVars } from './model/style';
import { barRange, barTicks, fromFraction, nearestHandle, toFraction } from './model/bar';
import {
  chipToggleCall,
  defaultPopupCard,
  formatRemaining,
  toChipView,
  type ChipView,
} from './model/chips';
import type { ServiceCall } from './model/service-call';
import { cardStyles } from './styles';
import { fxClasses, fxVars } from './model/effects';
import { airEntity, bgVars, frosted, toBgView } from './model/background';
import { renderBackground } from './components/background';
import { currentTest, getTestMode, simulateView, TEST_CYCLE_MS, TEST_EVENT, TEST_LABEL } from './model/test-mode';
import { backgroundStyles } from './background-styles';

const PX_PER_STEP = 18;

/** The room is at the setpoint(s) it is working towards (within half a step). */
export function reached(view: ClimateView, edit: TempAdjustModel | null): boolean {
  const t = view.currentTemp;
  if (t === null || !edit?.available) return false;
  const tol = (edit.heat ?? edit.cool)!.step / 2;
  const h = edit.heat?.value;
  const c = edit.cool?.value;
  if (h !== undefined && c !== undefined) return t >= h - tol && t <= c + tol;
  if (h !== undefined) return t >= h - tol;
  if (c !== undefined) return t <= c + tol;
  return false;
}
const HOLD_MS = 500;

type CardHelpers = { createCardElement(c: Record<string, unknown>): HTMLElement & { hass?: unknown } };

export class EasyThermostatStylerCard extends LitElement {
  static override styles = [cardStyles, backgroundStyles];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _open = new Set<string>();
  @state() private _tick = 0;
  @state() private _popupOpen = false;
  /** Open menu set key (fallback path when the Popover API is missing). */
  @state() private _menu: string | null = null;
  @state() private _revealed = false;
  /** Moving background paused (card off-screen or tab hidden). */
  @state() private _bgPaused = false;
  @state() private _cycle = 0;
  private _cycleTimer: ReturnType<typeof setInterval> | null = null;
  private _onScreen = true;
  private _io?: IntersectionObserver;
  private _revealTimer: ReturnType<typeof setTimeout> | null = null;

  private _sp = new SetpointController(
    () => this._config?.entity ?? '',
    (call) => this._call(call),
    () => {
      this._tick += 1;
      if (this._revealed) this._armReveal();
    },
  );
  private _drag: { startY: number; startValue: number } | null = null;
  private _barDrag: { handle: Setpoint; rect: DOMRect } | null = null;
  private _hold: { timer: ReturnType<typeof setTimeout>; fired: boolean } | null = null;
  private _popupEl?: HTMLElement & { hass?: unknown };

  // ---- Lovelace contract ----------------------------------------------------

  setConfig(config: unknown): void {
    this._config = normalizeConfig(config);
    this._open = this._loadOpen();
  }

  static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_TYPE);
  }

  static getStubConfig(hass: HomeAssistant): Record<string, unknown> {
    const entity = Object.keys(hass?.states ?? {}).find((id) => id.startsWith('climate.'));
    return { entity: entity ?? 'climate.thermostat' };
  }

  /** Test mode, as set in the open editor for this thermostat (never saved). */
  private _testMode() {
    return getTestMode(this._config?.entity);
  }

  private _onTest = (ev: Event): void => {
    if ((ev as CustomEvent<{ entity: string }>).detail?.entity === this._config?.entity) this.requestUpdate();
  };

  private _syncCycleTimer(): void {
    const want = this._testMode() === 'cycle';
    if (want && !this._cycleTimer) this._cycleTimer = setInterval(() => (this._cycle += 1), TEST_CYCLE_MS);
    if (!want && this._cycleTimer) {
      clearInterval(this._cycleTimer);
      this._cycleTimer = null;
    }
  }

  getCardSize(): number {
    return 5;
  }

  getGridOptions(): Record<string, unknown> {
    return { columns: 6, min_columns: 4, rows: 'auto' };
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof IntersectionObserver !== 'undefined') {
      this._io = new IntersectionObserver((entries) => {
        this._onScreen = entries.some((e) => e.isIntersecting);
        this._updatePause();
      });
      this._io.observe(this);
    }
    document.addEventListener('visibilitychange', this._updatePause);
    window.addEventListener(TEST_EVENT, this._onTest);
  }

  private _updatePause = (): void => {
    const paused = !this._onScreen || document.visibilityState === 'hidden';
    if (paused !== this._bgPaused) this._bgPaused = paused;
  };

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._io?.disconnect();
    this._io = undefined;
    if (this._cycleTimer) clearInterval(this._cycleTimer);
    this._cycleTimer = null;
    document.removeEventListener('visibilitychange', this._updatePause);
    window.removeEventListener(TEST_EVENT, this._onTest);
    this._sp.dispose();
    if (this._revealTimer) clearTimeout(this._revealTimer);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if ((changed.has('hass') || changed.has('_config' as keyof EasyThermostatStylerCard)) && this.hass && this._config) {
      this._sp.sync(toTempAdjustModel(this.hass, this._config));
    }
    if (changed.has('hass') && this._popupEl && this.hass) this._popupEl.hass = this.hass;
  }

  /** Only re-render for state that this card reads (not every hass push). */
  protected override shouldUpdate(changed: PropertyValues<this>): boolean {
    if (!changed.has('hass') || changed.size > 1) return true;
    const prev = changed.get('hass') as HomeAssistant | undefined;
    if (!prev || !this.hass || !this._config) return true;
    return this._watched().some((id) => prev.states[id] !== this.hass!.states[id]);
  }

  private _watched(): string[] {
    const c = this._config!;
    const ids = [c.entity];
    const air = airEntity(c);
    if (air) ids.push(air);
    for (const s of c.sets ?? []) for (const ch of s.chips ?? []) ids.push(ch.entity);
    if (this.hass) {
      for (const s of c.sets ?? [])
        for (const ch of s.chips ?? []) {
          if (ch.type !== 'rf_fan') continue;
          const v = toChipView(this.hass, ch, 0);
          if (v.lightEntity) ids.push(v.lightEntity);
        }
    }
    return ids;
  }

  // ---- helpers --------------------------------------------------------------

  private _call(call: ServiceCall): void {
    this.hass?.callService(call.domain, call.service, call.data).catch((err: unknown) => {
      console.error(`[easy-thermostat-styler-card] ${call.domain}.${call.service} failed`, err);
    });
  }

  private _fire(type: string, detail: unknown): void {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  }

  private _openKey(): string {
    return `easy-thermostat-styler-card:open:${this._config?.entity ?? ''}`;
  }

  private _loadOpen(): Set<string> {
    try {
      const raw = window.localStorage?.getItem(this._openKey());
      return new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      return new Set();
    }
  }

  private _toggleSet(key: string): void {
    const next = new Set(this._open);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._open = next;
    try {
      window.localStorage?.setItem(this._openKey(), JSON.stringify([...next]));
    } catch {
      /* private mode */
    }
  }

  // ---- render ---------------------------------------------------------------

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;
    const c = this._config;
    const real = toClimateView(this.hass, c);
    this._syncCycleTimer();
    const test = currentTest(this._testMode(), this._cycle);
    // Status, colours, effects and background follow the simulated state;
    // the temperature and setpoints shown stay real.
    const view = test ? { ...simulateView(real, test), currentTemp: real.currentTemp, setpoints: real.setpoints } : real;
    const fxView = test ? simulateView(real, test) : real;
    const sets = toSetViews(this.hass, c);
    const bg = toBgView(this.hass, c, fxView);
    const cls = {
      [`eq-${view.equipment ?? 'none'}`]: true,
      [`mode-${view.mode}`]: true,
      ...fxClasses(c, fxView),
      frosted: frosted(c),
      'bg-paused': !!bg && this._bgPaused,
    };
    const vars = { ...surfaceVars(c), ...textVars(c.text), ...this._barVars(), ...fxVars(c), ...bgVars(c, bg) };
    const zones: Record<Zone, TemplateResult[]> = { top: [], bottom: [], left: [], right: [] };
    const toggles = sets.filter((s) => s.display === 'toggle');
    // All menu sets in a zone share one row, placed where the first one is.
    const menus: Record<Zone, SetView[]> = { top: [], bottom: [], left: [], right: [] };
    for (const s of sets) if (s.display === 'menu') menus[s.zone].push(s);
    for (const s of sets) {
      if (s.display === 'menu') {
        if (menus[s.zone][0] === s) zones[s.zone].push(this._renderMenuRow(menus[s.zone], s.zone));
        continue;
      }
      if (s.display === 'toggle' && !this._open.has(s.key)) continue;
      zones[s.zone].push(this._renderSet(s));
    }
    const tz = c.toggles_zone ?? DEFAULTS.toggles_zone;
    if (toggles.length) zones[tz].push(this._renderToggles(toggles));

    return html`
      <ha-card class=${classMap(cls)} style=${styleMap(vars)}>
        ${renderBackground(c, bg)}
        ${test ? html`<div class="test-badge" title="Test mode switches off when the editor closes">TEST · ${TEST_LABEL[test]}</div>` : nothing}
        <div class="grid">
          ${(['top', 'left'] as Zone[]).map((z) => this._zone(z, zones[z]))}
          ${this._renderCore(view)}
          ${(['right', 'bottom'] as Zone[]).map((z) => this._zone(z, zones[z]))}
        </div>
        ${this._renderPopup()}
      </ha-card>
    `;
  }

  private _zone(z: Zone, items: TemplateResult[]): TemplateResult | typeof nothing {
    return items.length ? html`<div class="zone ${z}">${items}</div>` : nothing;
  }

  private _barVars(): Record<string, string> {
    const b = this._config?.setpoint?.bar ?? {};
    const out: Record<string, string> = {};
    if (b.height) out['--etc-bar-h'] = `${b.height}px`;
    if (b.length) out['--etc-bar-len'] = `${b.length}px`;
    if (b.heat_color) out['--bar-heat'] = b.heat_color;
    if (b.cool_color) out['--bar-cool'] = b.cool_color;
    if (b.comfort_color) out['--bar-comfort'] = b.comfort_color;
    if (b.handle_color) out['--bar-handle'] = b.handle_color;
    if (b.handle_border_color === 'none') out['--bar-hbw'] = '0px';
    else if (b.handle_border_color) out['--bar-hbc'] = b.handle_border_color;
    if (b.flag_color) out['--bar-flag'] = b.flag_color;
    if (b.flag_text_color) out['--bar-flag-fg'] = b.flag_text_color;
    return out;
  }

  // ---- core -----------------------------------------------------------------

  /** Tap-to-reveal is on (and there is a control to reveal). */
  private _tapMode(): boolean {
    const sp = this._config?.setpoint ?? {};
    return (sp.reveal ?? DEFAULTS.reveal) === 'tap' && (sp.control ?? DEFAULTS.control) !== 'none';
  }

  private _setRevealed(open: boolean): void {
    this._revealed = open;
    this._armReveal();
  }

  /** (Re)start the auto-close countdown; called on every interaction. */
  private _armReveal(): void {
    if (this._revealTimer) clearTimeout(this._revealTimer);
    this._revealTimer = null;
    if (!this._revealed || !this._tapMode()) return;
    const secs = this._config?.setpoint?.hide_after ?? DEFAULTS.hide_after;
    if (secs <= 0) return;
    this._revealTimer = setTimeout(() => {
      this._revealTimer = null;
      if (this._sp.dragging) {
        this._armReveal();
        return;
      }
      this._revealed = false;
    }, secs * 1000);
  }

  private _renderCore(view: ClimateView): TemplateResult {
    const c = this._config!;
    const sp = c.setpoint ?? {};
    const control = sp.control ?? DEFAULTS.control;
    const position = sp.position ?? DEFAULTS.position;
    const align = c.core_align ?? DEFAULTS.core_align;
    const edit = this._sp.edit;
    const editable = !!edit?.available && control !== 'none';
    const barPos = sp.bar?.position ?? DEFAULTS.bar.position;
    const barAbove = barPos === 'above';
    const barSide = barPos === 'left' || barPos === 'right';
    const eq = view.equipment ? `eq-${view.equipment}` : '';

    // Tap-to-reveal: what sits in the control's place, and whether the open
    // control has taken over the current temperature.
    const tap = editable && this._tapMode();
    const open = !tap || this._revealed;
    const from = sp.reveal_from ?? DEFAULTS.reveal_from;
    const fromCurrent = tap && (from === 'both' || from === 'current');
    const fromPills = tap && (from === 'both' || from === 'pills');
    const inCurrent = tap && open && (sp.open_in ?? DEFAULTS.open_in) === 'current';
    // Closed and at target: show only the current temperature (tap it to open).
    const atTarget = tap && !open && !!sp.hide_at_target && reached(view, edit);
    const fromCurrentNow = fromCurrent || atTarget;
    const full = editable
      ? control === 'bar'
        ? this._renderBar(edit!, view)
        : this._renderControl(edit!, control as 'wheel' | 'stepper')
      : null;
    let atPlace: TemplateResult | typeof nothing | null = null;
    if (editable) {
      if (!tap) atPlace = full;
      else if (open) atPlace = inCurrent ? null : full;
      else if (!atTarget && (sp.collapsed ?? DEFAULTS.collapsed) === 'visual') atPlace = this._renderCollapsed(edit!, view, control);
    }
    const ctl = control !== 'bar' ? atPlace : null;
    const bar = control === 'bar' ? atPlace : null;

    if (!view.available) {
      return html`<div class="core al-${align}">
        <div class="main">
          ${c.show_name ?? DEFAULTS.show_name ? html`<div class="name">${view.name}</div>` : nothing}
          <div class="unavailable-msg">Unavailable</div>
        </div>
      </div>`;
    }

    const temp = html`${formatTemp(view.currentTemp, view.unit)}<span class="unit">${view.unit}</span>`;
    const statusPos = c.status_position ?? DEFAULTS.status_position;
    const status =
      (c.show_status ?? DEFAULTS.show_status) && view.equipment
        ? html`<div class="status ${eq} sp-${statusPos}">
            <ha-icon icon=${MODE_ICONS[view.state] ?? 'mdi:thermostat'}></ha-icon>${EQUIPMENT_LABEL[view.equipment]}
          </div>`
        : nothing;
    const currentTpl = inCurrent
      ? html`<div class="in-current">${full}</div>`
      : (c.show_current ?? DEFAULTS.show_current)
        ? fromCurrentNow
          ? html`<button
              class="current tappable ${eq}"
              aria-expanded=${open}
              aria-label="Show temperature controls"
              @click=${() => this._setRevealed(!this._revealed)}
            >
              ${temp}
            </button>`
          : html`<div class="current ${eq}">${temp}</div>`
        : nothing;

    const main = html`<div class="main">
      ${c.show_name ?? DEFAULTS.show_name ? html`<div class="name">${view.name}</div>` : nothing}
      ${statusPos === 'above' ? status : nothing}
      ${(c.show_humidity ?? DEFAULTS.show_humidity) && view.humidity !== null
        ? html`<div class="humidity"><ha-icon icon="mdi:water-outline"></ha-icon>${Math.round(view.humidity)}%</div>`
        : nothing}
      ${statusPos === 'beside' && status !== nothing ? html`<div class="cur-row">${currentTpl}${status}</div>` : currentTpl}
      ${statusPos === 'below' ? status : nothing}
      ${(c.show_pills ?? DEFAULTS.show_pills) && edit?.available && !atTarget && !(tap && open && sp.hide_pills_open)
        ? this._renderPills(edit, fromPills, open)
        : nothing}
    </div>`;

    return html`<div class="core al-${align} pos-${position}">
      ${bar && barAbove ? bar : nothing}
      <div class="core-row">
        ${bar && barPos === 'left' ? bar : nothing} ${ctl && position === 'left' ? ctl : nothing} ${main}
        ${ctl && position === 'right' ? ctl : nothing} ${bar && barPos === 'right' ? bar : nothing}
      </div>
      ${ctl && position === 'center' ? html`<div class="ctl-center">${ctl}</div>` : nothing}
      ${bar && !barAbove && !barSide ? bar : nothing}
    </div>`;
  }

  /** The control's own value while it is folded away; tap to open. */
  private _renderCollapsed(edit: TempAdjustModel, view: ClimateView, control: string): TemplateResult | typeof nothing {
    const e = edit[edit.active];
    if (!e) return nothing;
    const openIt = () => this._setRevealed(true);
    if (control === 'bar') {
      return html`<div
        class="collapsed bar-c"
        role="button"
        tabindex="0"
        aria-label="Show temperature controls"
        @click=${openIt}
        @keydown=${(ev: KeyboardEvent) => {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            openIt();
          }
        }}
      >
        ${this._renderBar(edit, view, true)}
      </div>`;
    }
    const value = formatTemp(e.value, edit.unit);
    return html`<button class="collapsed" aria-label="Show temperature controls" @click=${openIt}>
      ${control === 'wheel'
        ? this._wheelCentre(edit.active, value)
        : html`<span class="sv" style=${styleMap({ '--c': edit.active === 'cool' ? 'var(--etc-cool)' : 'var(--etc-heat)' })}
            >${value}</span
          >`}
    </button>`;
  }

  /** `tapOpens`: the pills open the control (tap-to-reveal). In Heat/Cool a
   *  pill also picks which setpoint the wheel/stepper edits. */
  private _renderPills(edit: TempAdjustModel, tapOpens = false, open = true): TemplateResult {
    const dual = !!(edit.heat && edit.cool);
    const pill = (sp: Setpoint) => {
      const e = edit[sp];
      if (!e) return nothing;
      const body = html`<ha-icon icon=${sp === 'heat' ? 'mdi:fire' : 'mdi:snowflake'}></ha-icon>${formatTemp(
          e.value,
          edit.unit,
        )}`;
      const dim = dual && edit.active !== sp && this._usesActive() && open;
      if (!dual && !tapOpens) return html`<div class="pill ${sp}">${body}</div>`;
      return html`<button
        class="pill ${sp} ${dim ? 'dim' : ''} ${tapOpens ? 'tappable' : ''}"
        aria-pressed=${dual ? String(edit.active === sp) : nothing}
        aria-expanded=${tapOpens ? String(open) : nothing}
        aria-label=${`${sp === 'heat' ? 'Heat' : 'Cool'} setpoint`}
        @click=${() => this._pillTap(edit, sp, dual, tapOpens, open)}
      >
        ${body}
      </button>`;
    };
    return html`<div class="pills">${pill('heat')} ${pill('cool')}</div>`;
  }

  private _pillTap(edit: TempAdjustModel, sp: Setpoint, dual: boolean, tapOpens: boolean, open: boolean): void {
    if (dual) this._sp.select(selectSetpoint(edit, sp));
    if (!tapOpens) return;
    // Closed → open on that setpoint. Open: tapping the setpoint being edited
    // closes it; tapping the other one just switches to it.
    if (!open) this._setRevealed(true);
    else if (!dual || edit.active === sp) this._setRevealed(false);
    else this._armReveal();
  }

  /** Wheel and stepper edit one setpoint at a time; the pills pick which. */
  private _usesActive(): boolean {
    const control = this._config?.setpoint?.control ?? DEFAULTS.control;
    return control === 'wheel' || control === 'stepper';
  }

  private _renderControl(edit: TempAdjustModel, control: 'wheel' | 'stepper'): TemplateResult | typeof nothing {
    const e = edit[edit.active];
    if (!e) return nothing;
    const side = edit.active;
    const plus = html`<button
      class="round ${side}"
      aria-label="Increase"
      ?disabled=${e.max !== null && e.value >= e.max}
      @click=${() => this._sp.commit(nudge(edit, 1))}
    >
      <ha-icon icon="mdi:plus"></ha-icon>
    </button>`;
    const minus = html`<button
      class="round ${side}"
      aria-label="Decrease"
      ?disabled=${e.min !== null && e.value <= e.min}
      @click=${() => this._sp.commit(nudge(edit, -1))}
    >
      <ha-icon icon="mdi:minus"></ha-icon>
    </button>`;

    // Heat/Cool with the pills hidden: the pills normally pick which setpoint
    // is edited, so put a small heat/cool switch on the control instead.
    // Pills hidden (always, or while the tapped-open controls show): the
    // control gets its own heat/cool switch in Heat / Cool.
    const pillsHidden =
      (this._config?.show_pills ?? DEFAULTS.show_pills) === false ||
      (this._tapMode() && this._revealed && !!this._config?.setpoint?.hide_pills_open);
    const sw =
      pillsHidden && edit.heat && edit.cool
        ? html`<div class="hc-switch" role="group" aria-label="Setpoint">
            ${(['heat', 'cool'] as Setpoint[]).map(
              (s) => html`<button
                class="hc ${s} ${edit.active === s ? 'on' : ''}"
                aria-pressed=${String(edit.active === s)}
                aria-label=${s === 'heat' ? 'Edit heat setpoint' : 'Edit cool setpoint'}
                @click=${() => {
                  this._sp.select(selectSetpoint(edit, s));
                  this._armReveal();
                }}
              >
                <ha-icon icon=${s === 'heat' ? 'mdi:fire' : 'mdi:snowflake'}></ha-icon>${formatTemp(edit[s]!.value, edit.unit)}
              </button>`,
            )}
          </div>`
        : nothing;

    const raw = this._config?.setpoint?.nudge;
    const mode = raw === 'beside' ? 'right' : (raw ?? (control === 'stepper' ? 'around' : 'right'));
    const lay = (cls: string, value: TemplateResult) => {
      const col = html`<div class="nudges">${plus}${minus}</div>`;
      const row = html`<div class="nudges row">${minus}${plus}</div>`;
      const inner =
        mode === 'hidden' ? value
        : mode === 'left' ? html`${col}${value}`
        : mode === 'above' ? html`${row}${value}`
        : mode === 'below' ? html`${value}${row}`
        : mode === 'stacked' ? html`${plus}${value}${minus}`
        : mode === 'around' ? html`${minus}${value}${plus}`
        : html`${value}${col}`;
      const out = html`<div class="${cls} nud-${mode}">${inner}</div>`;
      return sw === nothing ? out : html`<div class="ctl-wrap">${sw}${out}</div>`;
    };

    if (control === 'stepper') {
      return lay(`stepper ${side}`, html`<span class="sv">${formatTemp(e.value, edit.unit)}</span>`);
    }

    const sp = this._config?.setpoint ?? {};
    const radius = sp.neighbors ?? DEFAULTS.neighbors;
    const values = scrubberWindow(e, radius);
    const above = values.filter((v) => v > e.value).reverse();
    const below = values.filter((v) => v < e.value).reverse();
    const nb = (v: number) =>
      html`<div class="nb ${Math.abs(v - e.value) > e.step * 1.5 ? 'far' : ''}">${formatTemp(v, edit.unit)}</div>`;
    const col = html`<div
      class="wheel-col"
      role="slider"
      tabindex="0"
      aria-label=${`${side === 'cool' ? 'Cool' : 'Heat'} setpoint`}
      aria-valuenow=${e.value}
      aria-valuemin=${e.min ?? nothing}
      aria-valuemax=${e.max ?? nothing}
      aria-valuetext=${formatTemp(e.value, edit.unit)}
      @pointerdown=${this._wheelDown}
      @pointermove=${this._wheelMove}
      @pointerup=${this._wheelUp}
      @pointercancel=${this._wheelUp}
      @keydown=${this._wheelKey}
      @wheel=${this._wheelScroll}
    >
      ${above.map(nb)}
      ${this._wheelCentre(side, formatTemp(e.value, edit.unit))}
      ${below.map(nb)}
    </div>`;
    return lay('wheel', col);
  }

  private _wheelCentre(side: Setpoint, value: string): TemplateResult {
    if ((this._config?.setpoint?.wheel_style ?? DEFAULTS.wheel_style) === 'pill') {
      return html`<div class="pill wheel-pill ${side}">
        <ha-icon icon=${side === 'heat' ? 'mdi:fire' : 'mdi:snowflake'}></ha-icon>${value}
      </div>`;
    }
    return html`<div class="bubble ${side}">${value}</div>`;
  }

  private _wheelDown = (ev: PointerEvent): void => {
    const edit = this._sp.edit;
    const e = edit?.[edit.active];
    if (!e) return;
    const el = ev.currentTarget as HTMLElement;
    el.focus({ preventScroll: true });
    this._drag = { startY: ev.clientY, startValue: e.value };
    this._sp.dragging = true;
    this._armReveal();
    el.setPointerCapture?.(ev.pointerId);
  };

  private _wheelMove = (ev: PointerEvent): void => {
    if (!this._drag || !this._sp.edit) return;
    // ecosee's inverted wheel: drag DOWN raises (values above slide down).
    this._sp.preview(scrub(this._sp.edit, this._drag.startValue, ev.clientY - this._drag.startY, PX_PER_STEP));
  };

  private _wheelUp = (ev: PointerEvent): void => {
    const drag = this._drag;
    if (!drag) return;
    this._drag = null;
    this._sp.dragging = false;
    const el = ev.currentTarget as HTMLElement;
    if (el.hasPointerCapture?.(ev.pointerId)) el.releasePointerCapture(ev.pointerId);
    const edit = this._sp.edit;
    if (edit && edit[edit.active]?.value !== drag.startValue) this._sp.commit(edit);
    // A plain tap (no drag) on the wheel closes tapped-open controls.
    else if (this._tapMode() && this._revealed && Math.abs(ev.clientY - drag.startY) < 6) this._setRevealed(false);
  };

  private _wheelKey = (ev: KeyboardEvent): void => {
    const edit = this._sp.edit;
    if (!edit) return;
    if (ev.key === 'ArrowUp' || ev.key === 'ArrowRight') {
      ev.preventDefault();
      this._sp.commit(nudge(edit, 1));
    } else if (ev.key === 'ArrowDown' || ev.key === 'ArrowLeft') {
      ev.preventDefault();
      this._sp.commit(nudge(edit, -1));
    }
  };

  private _wheelScroll = (ev: WheelEvent): void => {
    const edit = this._sp.edit;
    if (!edit || Math.abs(ev.deltaY) < 4) return;
    ev.preventDefault();
    this._sp.commit(nudge(edit, ev.deltaY < 0 ? 1 : -1));
  };

  // ---- bar ------------------------------------------------------------------

  private _renderBar(edit: TempAdjustModel, view: ClimateView, readOnly = false): TemplateResult {
    const b = { ...DEFAULTS.bar, ...(this._config?.setpoint?.bar ?? {}) };
    const r = barRange(edit, b);
    const pct = (v: number) => `${(toFraction(v, r) * 100).toFixed(3)}%`;
    const vertical = b.position === 'left' || b.position === 'right';
    // Along-axis property: horizontal grows left→right, vertical bottom→top.
    const at = (v: string): Record<string, string> => (vertical ? { bottom: v } : { left: v });
    const along = vertical ? 'height' : 'width';
    const far = vertical ? 'top' : 'right';
    const heat = edit.heat;
    const cool = edit.cool;
    const ticks = barTicks(r, b.ticks ?? 0, b.labels ?? 0);
    const segs: TemplateResult[] = [];
    if (b.look === 'gradient') {
      // Gradient stops are hex-only by design (they're blended in CSS space).
      const stops = b.stops?.length ? b.stops : ['#2b9af9', '#7ccf8a', '#ff8100'];
      segs.push(html`<div class="seg full" style=${styleMap({ background: `linear-gradient(to ${vertical ? 'top' : 'right'}, ${stops.join(', ')})` })}></div>`);
    } else {
      if (heat) segs.push(html`<div class="seg heat" style=${styleMap({ [along]: pct(heat.value) })}></div>`);
      if (cool) segs.push(html`<div class="seg cool" style=${styleMap({ ...at(pct(cool.value)), [far]: '0' })}></div>`);
      if (heat && cool)
        segs.push(html`<div class="seg comfort" style=${styleMap({ ...at(pct(heat.value)), [far]: `calc(100% - ${pct(cool.value)})` })}></div>`);
    }
    const handle = (sp: Setpoint) => {
      const e = edit[sp];
      if (!e) return nothing;
      return html`
        ${b.flags ? html`<div class="flag ${sp}" style=${styleMap(at(pct(e.value)))}>${formatTemp(e.value, edit.unit)}°</div>` : nothing}
        <div
          class="handle ${sp} s-${b.handle_shape ?? 'round'} ${edit.active === sp && heat && cool ? 'active' : ''}"
          style=${styleMap(at(pct(e.value)))}
          role=${readOnly ? nothing : 'slider'}
          aria-orientation=${vertical ? 'vertical' : 'horizontal'}
          tabindex=${readOnly ? nothing : '0'}
          aria-label=${`${sp === 'heat' ? 'Heat' : 'Cool'} setpoint`}
          aria-valuenow=${e.value}
          aria-valuemin=${r.min}
          aria-valuemax=${r.max}
          @focus=${() => this._sp.select(selectSetpoint(this._sp.edit!, sp))}
          @keydown=${(ev: KeyboardEvent) => this._barKey(ev, sp)}
        ></div>
      `;
    };
    const cur = view.currentTemp;
    const marker =
      b.show_current && cur !== null && cur >= r.min && cur <= r.max
        ? html`<div class="marker" style=${styleMap(at(pct(cur)))} title="Current"></div>`
        : nothing;
    const track = readOnly
      ? html`<div class="track ro">${segs}${marker}${handle('heat')} ${handle('cool')}</div>`
      : html`<div
          class="track"
          @pointerdown=${this._barDown}
          @pointermove=${this._barMove}
          @pointerup=${this._barUp}
          @pointercancel=${this._barUp}
        >
          ${segs}${marker}${handle('heat')} ${handle('cool')}
        </div>`;
    // Flag side follows the orientation; a side that doesn't fit falls back.
    const flagPos = vertical
      ? b.flag_position === 'right' ? 'right' : 'left'
      : b.flag_position === 'below' ? 'below' : 'above';
    const tickPos = vertical
      ? b.tick_position === 'left' ? 'left' : 'right'
      : b.tick_position === 'above' ? 'above' : 'below';
    return html`<div class="bar ${vertical ? `vertical side-${b.position}` : 'horizontal'} ${b.flags ? `flags-${flagPos}` : 'no-flags'} ticks-${tickPos}">
      ${track}
      ${ticks.length
        ? html`<div class="ticks">
            ${ticks.map(
              (t) => html`<div class="tick ${t.label ? 'lbl' : ''}" style=${styleMap(at(`${t.fraction * 100}%`))}></div>
                ${t.label ? html`<div class="tick-l" style=${styleMap(at(`${t.fraction * 100}%`))}>${t.value}</div>` : nothing}`,
            )}
          </div>`
        : nothing}
    </div>`;
  }

  private _barVertical(): boolean {
    const p = this._config?.setpoint?.bar?.position;
    return p === 'left' || p === 'right';
  }

  /** Pointer position as a 0–1 fraction along the bar (vertical: bottom = 0). */
  private _barFraction(ev: PointerEvent, rect: DOMRect): number {
    return this._barVertical()
      ? (rect.bottom - ev.clientY) / Math.max(1, rect.height)
      : (ev.clientX - rect.left) / Math.max(1, rect.width);
  }

  private _barValueAt(ev: PointerEvent, rect: DOMRect): number {
    const edit = this._sp.edit!;
    const r = barRange(edit, this._config?.setpoint?.bar);
    return fromFraction(this._barFraction(ev, rect), r);
  }

  private _barDown = (ev: PointerEvent): void => {
    const edit = this._sp.edit;
    if (!edit?.available) return;
    const el = ev.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const r = barRange(edit, this._config?.setpoint?.bar);
    const f = this._barFraction(ev, rect);
    const handle = nearestHandle(edit, f, r);
    this._barDrag = { handle, rect };
    this._sp.dragging = true;
    this._armReveal();
    el.setPointerCapture?.(ev.pointerId);
    this._sp.preview(setValue(selectSetpoint(edit, handle), this._barValueAt(ev, rect)));
  };

  private _barMove = (ev: PointerEvent): void => {
    if (!this._barDrag || !this._sp.edit) return;
    this._sp.preview(setValue(this._sp.edit, this._barValueAt(ev, this._barDrag.rect)));
  };

  private _barUp = (ev: PointerEvent): void => {
    if (!this._barDrag) return;
    this._barDrag = null;
    this._sp.dragging = false;
    const el = ev.currentTarget as HTMLElement;
    if (el.hasPointerCapture?.(ev.pointerId)) el.releasePointerCapture(ev.pointerId);
    if (this._sp.edit) this._sp.commit(this._sp.edit);
  };

  private _barKey(ev: KeyboardEvent, sp: Setpoint): void {
    const edit = this._sp.edit;
    if (!edit) return;
    const dir = ev.key === 'ArrowUp' || ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowDown' || ev.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    ev.preventDefault();
    this._sp.commit(nudge(selectSetpoint(edit, sp), dir));
  }

  // ---- button sets ------------------------------------------------------------

  private _renderSet(s: SetView): TemplateResult {
    const style = resolveButtonStyle(this._config?.buttons, s.config.style);
    const grid = s.type !== 'chips' && s.orientation === 'row' && s.align === 'stretch';
    const layout: Record<string, string> = { ...buttonVars(style) };
    if (grid) {
      layout['grid-template-columns'] = s.columns
        ? `repeat(${s.columns}, minmax(0, 1fr))`
        : `repeat(auto-fit, minmax(var(--etc-b-minw, 52px), 1fr))`;
    }
    const cls = {
      set: true,
      grid,
      flex: !grid,
      [`t-${s.type}`]: true,
      [`o-${s.orientation}`]: true,
      [`a-${s.align}`]: true,
      [`v-${style.variant}`]: true,
      [`ip-${style.icon_position}`]: true,
    };
    if (s.type === 'chips') {
      const chips = (s.config.chips ?? []).map((ch, i) => toChipView(this.hass!, ch, i));
      return html`<div class=${classMap(cls)} style=${styleMap(layout)} role="group" aria-label=${s.title}>
        ${chips.map((v) => this._renderChip(v, style.content))}
      </div>`;
    }
    const showIcon = style.content !== 'label';
    const showLabel = style.content !== 'icon';
    return html`<div class=${classMap(cls)} style=${styleMap(layout)} role="group" aria-label=${s.title}>
      ${s.options.map(
        (o) => html`<button
          class="btn ${o.active ? 'active' : ''}"
          style=${styleMap({ '--c': o.color })}
          aria-pressed=${o.active}
          title=${o.label}
          @click=${() => {
            const call = optionCall(s.type, this._config!.entity, o.value);
            if (call) this._call(call);
          }}
        >
          ${showIcon ? html`<ha-icon icon=${o.icon}></ha-icon>` : nothing}
          ${showLabel ? html`<span class="lbl">${o.label}</span>` : nothing}
        </button>`,
      )}
    </div>`;
  }

  // ---- expandable menus -------------------------------------------------------

  private _renderMenuRow(sets: SetView[], zone: Zone): TemplateResult {
    return html`<div class="menus z-${zone}">${sets.map((s) => this._renderMenu(s))}</div>`;
  }

  private _renderMenu(s: SetView): TemplateResult {
    const style = resolveButtonStyle(this._config?.buttons, s.config.style);
    const active = s.options.find((o) => o.active);
    const showIcon = style.content !== 'label';
    const open = this._menu === s.key;
    const native = typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;
    return html`<div class="menu t-${s.type} ${open ? 'open' : ''} d-${s.menuDirection} v-${style.variant}" style=${styleMap(buttonVars(style))}>
      <button
        class="mt ${active ? 'has-active' : ''}"
        style=${styleMap({ '--c': active?.color ?? 'var(--primary-color)' })}
        aria-haspopup="listbox"
        aria-expanded=${open}
        aria-label=${`${s.title}: ${active?.label ?? ''}`}
        @click=${(ev: Event) => this._toggleMenu(s, ev.currentTarget as HTMLElement)}
      >
        ${showIcon ? html`<ha-icon icon=${active?.icon ?? s.toggleIcon}></ha-icon>` : nothing}
        <span class="mt-text">
          ${s.menuShowName ? html`<span class="mt-name">${s.title}</span>` : nothing}
          <span class="mt-value">${active?.label ?? '—'}</span>
        </span>
      </button>
      <div
        class="menu-list"
        role="listbox"
        aria-label=${s.title}
        data-key=${s.key}
        popover=${native ? 'auto' : nothing}
        @toggle=${(ev: Event) => this._menuToggled(s, ev)}
        @keydown=${this._menuKey}
      >
        ${s.options.map(
          (o) => html`<button
            class="mi ${o.active ? 'active' : ''}"
            role="option"
            aria-selected=${o.active}
            style=${styleMap({ '--c': o.color })}
            @click=${() => this._pickMenu(s, o.value)}
          >
            ${showIcon ? html`<ha-icon icon=${o.icon}></ha-icon>` : nothing}<span>${o.label}</span>
          </button>`,
        )}
      </div>
    </div>`;
  }

  private _menuList(key: string): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>(`.menu-list[data-key="${key}"]`);
  }

  private _toggleMenu(s: SetView, trigger: HTMLElement): void {
    const list = this._menuList(s.key);
    if (!list) return;
    if (!('showPopover' in list)) {
      this._menu = this._menu === s.key ? null : s.key;
      return;
    }
    const pop = list as HTMLElement & { showPopover(): void; hidePopover(): void };
    if (list.matches(':popover-open')) {
      pop.hidePopover();
      return;
    }
    pop.showPopover();
    this._placeMenu(list, trigger, s.menuDirection);
    this._menu = s.key;
    (list.querySelector<HTMLElement>('.mi.active') ?? list.querySelector<HTMLElement>('.mi'))?.focus({ preventScroll: true });
  }

  /** Fixed-position the top-layer list next to its trigger, kept on screen. */
  private _placeMenu(list: HTMLElement, trigger: HTMLElement, dir: SetView['menuDirection']): void {
    const t = trigger.getBoundingClientRect();
    const gap = 6;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    list.style.minWidth = dir === 'up' || dir === 'down' ? `${Math.round(t.width)}px` : '';
    const l = list.getBoundingClientRect();
    let left = dir === 'right' ? t.right + gap : dir === 'left' ? t.left - gap - l.width : t.left;
    let top = dir === 'down' ? t.bottom + gap : dir === 'up' ? t.top - gap - l.height : t.top;
    // Flip if it would leave the screen, then clamp.
    if (dir === 'down' && top + l.height > vh) top = t.top - gap - l.height;
    if (dir === 'up' && top < 0) top = t.bottom + gap;
    if (dir === 'right' && left + l.width > vw) left = t.left - gap - l.width;
    if (dir === 'left' && left < 0) left = t.right + gap;
    left = Math.max(4, Math.min(left, vw - l.width - 4));
    top = Math.max(4, Math.min(top, vh - l.height - 4));
    list.style.left = `${Math.round(left)}px`;
    list.style.top = `${Math.round(top)}px`;
  }

  private _menuToggled(s: SetView, ev: Event): void {
    const open = (ev as Event & { newState?: string }).newState === 'open';
    if (!open && this._menu === s.key) this._menu = null;
  }

  private _closeMenus(): void {
    for (const el of this.renderRoot.querySelectorAll<HTMLElement & { hidePopover?: () => void }>('.menu-list')) {
      if (el.hidePopover && el.matches(':popover-open')) el.hidePopover();
    }
    this._menu = null;
  }

  private _pickMenu(s: SetView, value: string): void {
    const call = optionCall(s.type, this._config!.entity, value);
    if (call) this._call(call);
    this._fire('haptic', 'light');
    this._closeMenus();
  }

  private _menuKey = (ev: KeyboardEvent): void => {
    const items = [...(ev.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('.mi')];
    const i = items.indexOf((this.renderRoot as ShadowRoot).activeElement as HTMLElement);
    if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') items[(i + 1) % items.length]?.focus();
    else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') items[(i - 1 + items.length) % items.length]?.focus();
    else if (ev.key === 'Escape') this._closeMenus();
    else return;
    ev.preventDefault();
  };

  private _renderToggles(sets: SetView[]): TemplateResult {
    return html`<div class="toggles">
      ${sets.map((s) => {
        const open = this._open.has(s.key);
        return html`<button class="tgl ${open ? 'open' : ''}" aria-expanded=${open} @click=${() => this._toggleSet(s.key)}>
          <ha-icon icon=${s.toggleIcon}></ha-icon><span>${s.title}</span>
          <ha-icon class="chev" icon="mdi:chevron-down"></ha-icon>
        </button>`;
      })}
    </div>`;
  }

  // ---- chips --------------------------------------------------------------------

  private _renderChip(v: ChipView, content: string): TemplateResult {
    const showName = v.config.show_name ?? content !== 'icon';
    const showState = v.config.show_state ?? true;
    const rf = v.type === 'rf_fan';
    return html`<button
      class="chip ${v.on ? 'on' : ''} ${v.available ? '' : 'unavailable'} ${v.direction === 'reverse' ? 'rev' : ''}"
      aria-label=${`${v.name}: ${v.state}`}
      title=${`${v.name}: ${v.state}`}
      @pointerdown=${(ev: PointerEvent) => this._chipDown(ev, v)}
      @pointerup=${this._chipCancelHold}
      @pointerleave=${this._chipCancelHold}
      @pointercancel=${this._chipCancelHold}
      @click=${() => this._chipTap(v)}
      @contextmenu=${(ev: Event) => ev.preventDefault()}
    >
      <ha-icon class=${v.spin ? 'spin' : ''} style=${styleMap(v.spin ? { '--spin': `${v.spin}s` } : {})} icon=${v.icon}></ha-icon>
      ${showName ? html`<span>${v.name}</span>` : nothing}
      ${rf && v.natural
        ? html`<span class="badge natural" title=${v.naturalLevel !== null ? `Breeze ${v.naturalLevel}` : 'Breeze'}
            ><ha-icon icon="mdi:leaf"></ha-icon>${showState && v.naturalLevel !== null ? v.naturalLevel : nothing}</span
          >`
        : showState && (!rf || v.speed !== null || !v.on)
          ? html`<span class="badge">${v.state}</span>`
          : nothing}
      ${rf && v.lightOn ? html`<span class="extra light"><ha-icon icon="mdi:lightbulb"></ha-icon></span>` : nothing}
      ${rf && v.timerEnds
        ? html`<span class="extra"><ha-icon icon="mdi:timer-outline"></ha-icon>${formatRemaining(v.timerEnds)}</span>`
        : nothing}
    </button>`;
  }

  private _chipDown(ev: PointerEvent, v: ChipView): void {
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    this._chipCancelHold();
    if (v.hold === 'none') return;
    const hold = { fired: false, timer: setTimeout(() => {
      hold.fired = true;
      this._chipAction(v, v.hold);
      this._fire('haptic', 'medium');
    }, HOLD_MS) };
    this._hold = hold;
  }

  private _chipCancelHold = (): void => {
    if (this._hold && !this._hold.fired) clearTimeout(this._hold.timer);
  };

  private _chipTap(v: ChipView): void {
    if (this._hold?.fired) {
      this._hold = null;
      return;
    }
    this._hold = null;
    this._chipAction(v, v.tap);
  }

  private _chipAction(v: ChipView, action: string): void {
    switch (action) {
      case 'popup': {
        const card = defaultPopupCard(v.config);
        if (card && this._canCreate(card)) void this._showPopup(card);
        else this._fire('hass-more-info', { entityId: v.entity });
        break;
      }
      case 'more-info':
        this._fire('hass-more-info', { entityId: v.entity });
        break;
      case 'toggle':
      case 'toggle_light': {
        const call = chipToggleCall(v, action);
        if (call) this._call(call);
        break;
      }
    }
  }

  // ---- pop-up ------------------------------------------------------------------

  private _canCreate(card: Record<string, unknown>): boolean {
    const t = String(card.type ?? '');
    return !t.startsWith('custom:') || !!customElements.get(t.slice(7));
  }

  private async _showPopup(cardConfig: Record<string, unknown>): Promise<void> {
    let el: (HTMLElement & { hass?: unknown; setConfig?: (c: unknown) => void }) | undefined;
    try {
      const loader = (window as unknown as { loadCardHelpers?: () => Promise<CardHelpers> }).loadCardHelpers;
      if (loader) el = (await loader()).createCardElement(cardConfig);
      else {
        const t = String(cardConfig.type);
        el = document.createElement(t.startsWith('custom:') ? t.slice(7) : `hui-${t}-card`);
        el.setConfig?.(cardConfig);
      }
    } catch (err) {
      console.error('[easy-thermostat-styler-card] pop-up card failed', err);
      return;
    }
    el.hass = this.hass;
    this._popupEl = el;
    this._popupOpen = true;
    await this.updateComplete;
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>('dialog.popup');
    const host = this.renderRoot.querySelector('.popup-body');
    if (!dialog || !host) return;
    host.replaceChildren(el);
    if (!dialog.open) dialog.showModal?.();
  }

  private _closePopup = (): void => {
    const dialog = this.renderRoot.querySelector<HTMLDialogElement>('dialog.popup');
    if (dialog?.open) dialog.close();
    this._popupOpen = false;
    this._popupEl = undefined;
  };

  private _renderPopup(): TemplateResult | typeof nothing {
    if (!this._popupOpen) return nothing;
    return html`<dialog
      class="popup"
      @cancel=${this._closePopup}
      @click=${(ev: MouseEvent) => {
        if (ev.target === ev.currentTarget) this._closePopup();
      }}
    >
      <div class="popup-inner">
        <button class="popup-close" aria-label="Close" @click=${this._closePopup}><ha-icon icon="mdi:close"></ha-icon></button>
        <div class="popup-body"></div>
      </div>
    </dialog>`;
  }
}

if (!customElements.get(CARD_TYPE)) customElements.define(CARD_TYPE, EasyThermostatStylerCard);

const w = window as unknown as { customCards?: unknown[] };
w.customCards = w.customCards ?? [];
if (!w.customCards.some((c) => (c as { type?: string }).type === CARD_TYPE)) {
  w.customCards.push({
    type: CARD_TYPE,
    name: 'Easy Thermostat Styler Card (Ltek)',
    description: 'A modern thermostat card with a setpoint wheel or bar, movable button sets and device chips.',
    preview: true,
  });
}

console.info(`%c EASY-THERMOSTAT-STYLER-CARD %c v${CARD_VERSION} `, 'background:#ff8100;color:#fff', 'background:#333;color:#fff');
