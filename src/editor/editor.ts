import { LitElement, html, nothing, unsafeCSS, css, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import type { HomeAssistant } from '../model/hass';
import {
  DEFAULTS,
  DEFAULT_SETS,
  EDITOR_TYPE,
  CARD_VERSION,
  TEXT_ROLES,
  getPath,
  normalizeConfig,
  setPath,
  type ButtonItem,
  type ButtonSetConfig,
  type ModeSource,
  type CardConfig,
  type ChipConfig,
  type SetType,
  type TextRole,
  type Zone,
} from '../model/config';
import { actionIcon, actionLabel, availableOptions, defaultMenuDirection, isBuiltin, MODE_ICONS, orderOptions, prettify, SET_TITLES } from '../model/sets';
import { resolveButtonStyle, BUTTON_DEFAULTS } from '../model/style';
import { EDITOR_CSS } from './editor-css';
import { toChipView } from '../model/chips';
import { FX_DEFAULTS, FX_LABELS, FX_TARGETS, fxMode } from '../model/effects';
import { BG_DEFAULTS, BG_PALETTE, BG_STATES, BG_STYLES } from '../model/background';
import { TEMPLATES, applyTemplate, hasTemplateKeys } from '../model/templates';
import { getTestMode, setTestMode, type TestState } from '../model/test-mode';

// Visual editor in the Ltek panel idiom (CARD_DESIGN_SYSTEM §2): top-level
// panels with accent border when open, flat sub-panels, content-width labels,
// sliders for sizes, the four-mode color control for every color (§3), and
// three-state selects for booleans that override a parent level (§5).

export const THEME_COLORS: [string, string][] = [
  ['var(--primary-color)', 'Primary'],
  ['var(--accent-color)', 'Accent'],
  ['var(--primary-text-color)', 'Primary text'],
  ['var(--secondary-text-color)', 'Secondary text'],
  ['var(--disabled-text-color)', 'Disabled text'],
  ['var(--state-active-color)', 'State active'],
  ['var(--error-color)', 'Error'],
  ['var(--warning-color)', 'Warning'],
  ['var(--success-color)', 'Success'],
  ['var(--info-color)', 'Info'],
];

export function colorMode(cur: unknown): 'default' | 'transparent' | 'theme' | 'custom' | 'css' {
  const v = cur == null ? '' : String(cur);
  if (v === '') return 'default';
  if (v === 'transparent') return 'transparent';
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return 'custom';
  if (/^var\(/.test(v) && THEME_COLORS.some(([t]) => t === v)) return 'theme';
  return 'css';
}

const TEXT_LABELS: Record<TextRole, string> = {
  name: 'Name',
  status: 'Status (Heating / Cooling)',
  current: 'Current temperature',
  unit: 'Unit (°)',
  humidity: 'Humidity',
  pill: 'Setpoint pills',
  wheel_value: 'Wheel / stepper value',
  wheel_neighbor: 'Wheel next values',
  bar: 'Bar labels',
};

const SET_ICONS: Record<SetType, string> = {
  hvac: 'mdi:thermostat',
  preset: 'mdi:home-thermometer-outline',
  fan_mode: 'mdi:fan',
  custom: 'mdi:gesture-tap-button',
  chips: 'mdi:devices',
};
const SOURCE_NAMES: Record<ModeSource, string> = { hvac: 'Mode', preset: 'Preset', fan_mode: 'Fan' };
const KIND_ICON: Record<ButtonItem['kind'], string> = { mode: 'mdi:thermostat', device: 'mdi:shape-outline', action: 'mdi:play-circle-outline' };

type Opt = [string, string];

export class EasyThermostatStylerCardEditor extends LitElement {
  static override styles = [
    unsafeCSS(EDITOR_CSS),
    css`
      :host { display: block; }
    `,
  ];

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: CardConfig;
  @state() private _open = new Set<string>(['thermostat']);
  @state() private _set: number | null = null;
  @state() private _chip: string | null = null;
  private _cmode: Record<string, string> = {};

  setConfig(config: CardConfig): void {
    const before = this._config?.entity;
    this._config = normalizeConfig(config);
    // Switching thermostat moves test mode with it.
    if (before && before !== this._config.entity) {
      const mode = getTestMode(before);
      if (mode) {
        setTestMode(before, null);
        setTestMode(this._config.entity, mode);
      }
    }
  }

  // ---- writes ---------------------------------------------------------------

  private _emit(next: CardConfig): void {
    this._config = normalizeConfig(next);
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config }, bubbles: true, composed: true }));
  }

  /** Set a path; `undefined`/'' or the built-in default removes the key. */
  private _put(path: string, value: unknown, def?: unknown): void {
    if (!this._config) return;
    const v = value === def ? undefined : value;
    this._emit(setPath(this._config as Record<string, unknown>, path, v) as CardConfig);
  }

  private _get(path: string): unknown {
    return getPath(this._config, path);
  }

  /** The configured sets, materialized from the defaults on first edit. */
  private _sets(): ButtonSetConfig[] {
    return Array.isArray(this._config?.sets) ? this._config!.sets : DEFAULT_SETS.map((s) => ({ ...s }));
  }

  private _writeSets(sets: ButtonSetConfig[]): void {
    this._emit({ ...this._config!, sets });
  }

  private _patchSet(i: number, path: string, value: unknown, def?: unknown): void {
    const sets = this._sets();
    const set = setPath((sets[i] ?? {}) as unknown as Record<string, unknown>, path, value === def ? undefined : value);
    sets[i] = { ...(set as unknown as ButtonSetConfig), type: sets[i]!.type };
    this._writeSets(sets);
  }

  // ---- primitives -------------------------------------------------------------

  private _toggleOpen(id: string, ev: Event, top = false): void {
    const open = (ev.currentTarget as HTMLDetailsElement).open;
    if (open === this._open.has(id)) return;
    const next = new Set(this._open);
    if (open) {
      // One top-level panel at a time; sub-panels keep their own state.
      if (top) for (const p of this._panels) if (p !== id) next.delete(p);
      next.add(id);
    } else next.delete(id);
    this._open = next;
  }

  /** Ids of the top-level panels (filled as they render). */
  private _panels = new Set<string>();

  /** Closing the editor always ends test mode. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (getTestMode(this._config?.entity)) setTestMode(this._config?.entity, null);
  }

  private _panel(id: string, icon: string, title: string, body: TemplateResult): TemplateResult {
    this._panels.add(id);
    return html`<details class="etce-sec" ?open=${this._open.has(id)} @toggle=${(e: Event) => this._toggleOpen(id, e, true)}>
      <summary><ha-icon icon=${icon}></ha-icon>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${body}</div>
    </details>`;
  }

  private _sub(id: string, title: string, body: () => TemplateResult): TemplateResult {
    return html`<details class="etce-sub" ?open=${this._open.has(id)} @toggle=${(e: Event) => this._toggleOpen(id, e)}>
      <summary>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${body()}</div>
    </details>`;
  }

  private _group(title: string, first = false): TemplateResult {
    return html`<div class="etce-group ${first ? 'first' : ''}">${title}</div>`;
  }

  private _hint(text: string): TemplateResult {
    return html`<p class="etce-hint">${text}</p>`;
  }

  private _check(label: string, cur: boolean, onChange: (v: boolean) => void): TemplateResult {
    return html`<label class="etce-check"
      ><input type="checkbox" .checked=${cur} @change=${(e: Event) => onChange((e.target as HTMLInputElement).checked)} />${label}</label
    >`;
  }

  private _bool(path: string, label: string, def: boolean): TemplateResult {
    const cur = (this._get(path) as boolean | undefined) ?? def;
    return this._check(label, cur, (v) => this._put(path, v, def));
  }

  private _selectRow(label: string, cur: string, opts: Opt[], onChange: (v: string) => void): TemplateResult {
    return html`<div class="etce-row">
      <label class="lbl">${label}</label>
      <select @change=${(e: Event) => onChange((e.target as HTMLSelectElement).value)}>
        ${opts.map(([v, n]) => html`<option value=${v} ?selected=${v === cur}>${n}</option>`)}
      </select>
    </div>`;
  }

  private _select(path: string, label: string, opts: Opt[], def: string): TemplateResult {
    const cur = String(this._get(path) ?? def);
    return this._selectRow(label, cur, opts, (v) => this._put(path, v, def));
  }

  private _sliderRow(
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    isSet: boolean,
    onChange: (v: number | undefined) => void,
    fmt: (n: number) => string = (n) => `${n}px`,
  ): TemplateResult {
    return html`<div class="etce-row etce-nowrap">
      <label class="lbl">${label}</label>
      <input
        type="range"
        min=${min}
        max=${max}
        step=${step}
        .value=${String(value)}
        @input=${(e: Event) => {
          const el = e.target as HTMLInputElement;
          (el.nextElementSibling as HTMLElement).textContent = fmt(Number(el.value));
        }}
        @change=${(e: Event) => onChange(Number((e.target as HTMLInputElement).value))}
      />
      <span class="etce-val">${fmt(value)}</span>
      ${isSet
        ? html`<button class="etce-reset" title="Back to default" @click=${() => onChange(undefined)}>
            <ha-icon icon="mdi:restore"></ha-icon>
          </button>`
        : nothing}
    </div>`;
  }

  private _slider(path: string, label: string, min: number, max: number, step: number, def: number, fmt?: (n: number) => string): TemplateResult {
    const raw = this._get(path) as number | undefined;
    return this._sliderRow(label, raw ?? def, min, max, step, raw !== undefined, (v) => this._put(path, v, def), fmt);
  }

  /** Four-mode color control (§3). `write(undefined)` = default (key removed). */
  private _colorRow(
    id: string,
    label: string,
    cur: string | undefined,
    defaultLabel: string,
    seedHex: string,
    write: (v: string | undefined) => void,
    opts: { transparent?: boolean } = {},
  ): TemplateResult {
    let mode = (this._cmode[id] as ReturnType<typeof colorMode>) || colorMode(cur);
    if (mode === 'transparent' && !opts.transparent) mode = 'css';
    let field: TemplateResult | typeof nothing = nothing;
    if (mode === 'theme') {
      field = html`<select @change=${(e: Event) => write((e.target as HTMLSelectElement).value)}>
        ${THEME_COLORS.map(([v, n]) => html`<option value=${v} ?selected=${v === cur}>${n}</option>`)}
      </select>`;
    } else if (mode === 'custom') {
      const hex = cur && /^#[0-9a-fA-F]{6}$/.test(cur) ? cur : seedHex;
      field = html`<input type="color" .value=${hex} @change=${(e: Event) => write((e.target as HTMLInputElement).value)} />`;
    } else if (mode === 'css') {
      field = html`<input
        type="text"
        .value=${cur ?? ''}
        placeholder="e.g. tomato, rgba(…), var(--my-color)"
        @change=${(e: Event) => write((e.target as HTMLInputElement).value || undefined)}
      />`;
    }
    const onMode = (m: string) => {
      this._cmode = { ...this._cmode, [id]: m };
      if (m === 'default') write(undefined);
      else if (m === 'transparent') write('transparent');
      else if (m === 'theme') write(THEME_COLORS.some(([v]) => v === cur) ? cur : THEME_COLORS[0]![0]);
      else if (m === 'custom') write(cur && /^#[0-9a-fA-F]{6}$/.test(cur) ? cur : seedHex);
      else this.requestUpdate(); // css: keep the current value, just show the text field
    };
    return html`<div class="etce-row">
      <label class="lbl">${label}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(e: Event) => onMode((e.target as HTMLSelectElement).value)}>
          ${[
            ['default', defaultLabel],
            ...(opts.transparent ? [['transparent', 'Transparent']] : []),
            ['theme', 'Theme color'],
            ['custom', 'Custom color'],
            ['css', 'Custom CSS'],
          ].map(
            ([m, n]) => html`<option value=${m!} ?selected=${m === mode}>${n}</option>`,
          )}
        </select>
        ${field}
      </div>
    </div>`;
  }

  private _color(path: string, label: string, defaultLabel: string, seedHex: string): TemplateResult {
    return this._colorRow(path, label, this._get(path) as string | undefined, defaultLabel, seedHex, (v) => this._put(path, v));
  }

  private _selector(label: string, selector: Record<string, unknown>, value: unknown, onChange: (v: unknown) => void): TemplateResult {
    return html`<div class="etce-row">
      ${label ? html`<label class="lbl">${label}</label>` : nothing}
      <ha-selector
        .hass=${this.hass}
        .selector=${selector}
        .value=${value}
        @value-changed=${(e: CustomEvent) => onChange((e.detail as { value: unknown }).value)}
      ></ha-selector>
    </div>`;
  }

  // ---- render -----------------------------------------------------------------

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config) return nothing;
    return html`<div class="etce">
      ${this._testBar()}
      ${this._panel('thermostat', 'mdi:thermostat', 'Thermostat', this._thermostatBody())}
      ${this._panel('templates', 'mdi:palette-outline', 'Quick Preset Templates', this._templatesBody())}
      ${this._panel('setpoint', 'mdi:knob', 'Setpoint control', this._setpointBody())}
      ${this._panel('sets', 'mdi:gesture-tap-button', 'Button sets', this._setsBody())}
      ${this._panel('buttons', 'mdi:palette-swatch-outline', 'Button style', this._buttonsBody())}
      ${this._panel('text', 'mdi:format-text', 'Text', this._textBody())}
      ${this._panel('card', 'mdi:card-outline', 'Card Shape', this._cardBody())}
      ${this._panel('background', 'mdi:image-filter-hdr', 'Background', this._backgroundBody())}
      ${this._panel('effects', 'mdi:shimmer', 'Heating & Cooling Effects', this._effectsBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${CARD_VERSION}</div>
    </div>`;
  }

  private _testBar(): TemplateResult {
    const cur = getTestMode(this._config!.entity) ?? '';
    return html`<div class="etce-test ${cur ? 'on' : ''}">
      ${this._selectRow(
        'Test mode',
        cur,
        [
          ['', 'Off'],
          ['heating', 'Heating'],
          ['cooling', 'Cooling'],
          ['idle', 'Idle'],
          ['fan', 'Fan / air movement'],
          ['off', 'System off'],
          ['cycle', 'Cycle through all (6 s each)'],
        ],
        (v) => {
          setTestMode(this._config!.entity, (v || null) as TestState | 'cycle' | null);
          this.requestUpdate();
        },
      )}
      <p class="etce-hint">
        ${cur
          ? 'The card acts as if it were in that state so you can see the effects and moving background. It is not saved with the card and switches off when you close the editor.'
          : 'Preview the heating, cooling, idle, fan and off looks (effects and moving background) without waiting for the real thing.'}
      </p>
    </div>`;
  }

  private _thermostatBody(): TemplateResult {
    const c = this._config!;
    return html`
      ${this._hint('The climate entity this card controls, and what the centre of the card shows.')}
      ${this._selector('Entity', { entity: { domain: 'climate' } }, c.entity, (v) => this._put('entity', v || undefined))}
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${c.name ?? ''} placeholder="Entity name" @change=${(e: Event) => this._put('name', (e.target as HTMLInputElement).value || undefined)} />
      </div>
      ${this._sub('th-show', 'Show', () => html`
        <div class="etce-checks">
          ${this._bool('show_name', 'Name', DEFAULTS.show_name)} ${this._bool('show_status', 'Status', DEFAULTS.show_status)}
          ${this._bool('show_humidity', 'Humidity', DEFAULTS.show_humidity)}
          ${this._bool('show_current', 'Current temperature', DEFAULTS.show_current)}
          ${this._bool('show_pills', 'Setpoint pills', DEFAULTS.show_pills)}
        </div>`)}
      ${this._sub('th-layout', 'Layout', () => html`
        ${this._select('core_align', 'Align', [['left', 'Left'], ['center', 'Center'], ['right', 'Right']], DEFAULTS.core_align)}
        ${this._select(
          'status_position',
          'Status',
          [['above', 'Above the temperature'], ['beside', 'Beside the temperature'], ['below', 'Below the temperature']],
          DEFAULTS.status_position,
        )}`)}
    `;
  }

  private _templatesBody(): TemplateResult {
    const apply = (id: string) => {
      const tpl = TEMPLATES.find((x) => x.id === id)!;
      if (
        hasTemplateKeys(this._config!) &&
        !window.confirm(
          `Apply the “${tpl.name}” template?\n\nIt replaces this card’s layout, setpoint control and styling. Your device chips, button order/names/icons and temperature range are kept.`,
        )
      )
        return;
      this._emit(applyTemplate(this._config!, tpl));
    };
    return html`
      ${this._hint('One-click starting points, each with its own setpoint control, button style and layout. Fine-tune anything afterwards; nothing stays linked to the template.')}
      <div class="etce-blist">
        ${TEMPLATES.map(
          (x) => html`<div class="etce-brow etce-tpl">
            <ha-icon class="etce-sicon" icon=${x.icon}></ha-icon>
            <div class="etce-tpl-text">
              <span class="etce-sname">${x.name}</span>
              <span class="etce-tpl-hint">${x.hint}</span>
              <span class="etce-tpl-tags">${x.tags.map((g) => html`<span>${g}</span>`)}</span>
            </div>
            <button class="etce-preset" @click=${() => apply(x.id)}>Apply</button>
          </div>`,
        )}
      </div>
    `;
  }

  private _setpointBody(): TemplateResult {
    const control = (this._get('setpoint.control') as string) ?? DEFAULTS.control;
    const name = control === 'wheel' ? 'Wheel' : control === 'stepper' ? 'Stepper' : 'Bar';
    return html`
      ${this._hint('How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.')}
      ${this._select(
        'setpoint.control',
        'Control',
        [['wheel', 'Wheel'], ['stepper', '− / + stepper'], ['bar', 'Setpoint bar'], ['none', 'None (display only)']],
        DEFAULTS.control,
      )}
      ${control === 'wheel' || control === 'stepper'
        ? this._sub('sp-ctl', name, () => html`
            ${this._group('Placement & size', true)}
            ${this._select('setpoint.position', 'Position', [['left', 'Left'], ['right', 'Right'], ['center', 'Center (below)']], DEFAULTS.position)}
            ${this._slider('setpoint.scale', 'Size', 40, 250, 5, DEFAULTS.scale, (n) => `${n}%`)}
            ${this._hint('Size scales the controls only; the current temperature has its own size under Text.')}
            ${this._group('Buttons')}
            ${this._nudgeSelect(control)}
            ${control === 'wheel'
              ? html`${this._group('Wheel')}
                ${this._slider('setpoint.neighbors', 'Next values shown', 0, 3, 1, DEFAULTS.neighbors, (n) => String(n))}
                ${this._select('setpoint.wheel_style', 'Centre value', [['bubble', 'Bubble'], ['pill', 'Pill (like the setpoint pills)']], DEFAULTS.wheel_style)}`
              : nothing}`)
        : nothing}
      ${control === 'bar' ? this._barBody() : nothing}
      ${control !== 'none' ? this._sub('sp-reveal', 'Show controls', () => this._revealBody()) : nothing}
      ${this._sub('sp-hc', 'Heat / Cool', () => html`
        ${this._slider('setpoint.min_gap', 'Minimum gap', 0, 10, 0.5, this._defaultGap(), (n) => `${n}°`)}
        ${this._hint('In Heat / Cool the two setpoints stay at least this far apart; dragging one pushes the other.')}`)}
    `;
  }

  private _nudgeSelect(control: string): TemplateResult {
    const def = control === 'stepper' ? 'around' : 'right';
    const raw = this._get('setpoint.nudge') as string | undefined;
    const cur = raw === 'beside' ? 'right' : (raw ?? def);
    const opts: Opt[] = [
      ['right', 'Right'],
      ['left', 'Left'],
      ['above', 'Both above'],
      ['below', 'Both below'],
      ['stacked', '+ above, − below'],
      ['around', '− left, + right'],
      ['hidden', 'Hidden'],
    ];
    return this._selectRow('− / + buttons', cur, opts, (v) => this._put('setpoint.nudge', v === def ? undefined : v));
  }

  private _revealBody(): TemplateResult {
    const tap = (this._get('setpoint.reveal') ?? DEFAULTS.reveal) === 'tap';
    const secs = (this._get('setpoint.hide_after') as number | undefined) ?? DEFAULTS.hide_after;
    return html`
      ${this._select('setpoint.reveal', 'Controls', [['always', 'Always shown'], ['tap', 'Shown when tapped']], DEFAULTS.reveal)}
      ${this._hint(
        tap
          ? 'The controls stay folded away until you tap. They fold away again after the time below without use.'
          : 'Choose “Shown when tapped” to keep the card calm: just the temperature and setpoint until you want to change it.',
      )}
      ${tap
        ? html`
            ${this._select(
              'setpoint.reveal_from',
              'Open by tapping',
              [['both', 'Setpoint pill or current temperature'], ['pills', 'Setpoint pill'], ['current', 'Current temperature']],
              DEFAULTS.reveal_from,
            )}
            ${this._select(
              'setpoint.collapsed',
              'While closed show',
              [['visual', 'The control’s value (tap it to open too)'], ['hidden', 'Nothing — just the pill / temperature']],
              DEFAULTS.collapsed,
            )}
            ${this._select(
              'setpoint.open_in',
              'Opens',
              [['place', 'In its own place'], ['current', 'In place of the current temperature']],
              DEFAULTS.open_in,
            )}
            ${this._hint('“In place of the current temperature” swaps the big number for the controls while they are open.')}
            ${this._bool('setpoint.hide_pills_open', 'Hide the setpoint pill while the controls are open', false)}
            ${this._hint('The control already shows the setpoint. In Heat / Cool a small heat/cool switch appears on the control instead. Tap the wheel (without dragging) to close it.')}
            ${this._bool('setpoint.hide_at_target', 'Hide the setpoint once the room reaches it', false)}
            ${this._hint('While closed, only the current temperature shows once it matches the setpoint; until then the setpoint shows beside it. Tap the temperature to open the controls at any time.')}
            ${this._sliderRow('Close after', secs, 0, 60, 1, this._get('setpoint.hide_after') !== undefined, (v) => this._put('setpoint.hide_after', v, DEFAULTS.hide_after), (n) =>
              n ? `${n}s` : 'Stay open',
            )}
          `
        : nothing}
    `;
  }

  /** A bar-side choice: above / below for a horizontal bar, left / right for a vertical one. */
  private _sidePlacement(key: string, label: string, defH: string, defV: string): TemplateResult {
    const pos = String(this._get('setpoint.bar.position') ?? DEFAULTS.bar.position);
    const vertical = pos === 'left' || pos === 'right';
    const opts: Opt[] = vertical ? [['left', 'Left of the bar'], ['right', 'Right of the bar']] : [['above', 'Above the bar'], ['below', 'Below the bar']];
    const def = vertical ? defV : defH;
    const cur = String(this._get(`setpoint.bar.${key}`) ?? def);
    return this._selectRow(label, opts.some(([v]) => v === cur) ? cur : def, opts, (v) => this._put(`setpoint.bar.${key}`, v, def));
  }

  private _defaultGap(): number {
    return (this.hass?.config?.unit_system?.temperature ?? '').includes('C') ? 1.5 : 3;
  }

  private _barBody(): TemplateResult {
    return html`${this._sub('sp-bar', 'Bar', () => this._barLook())}
      ${this._sub('sp-flags', 'Value flags', () => this._barFlags())}
      ${this._sub('sp-markers', 'Ticks, markers & range', () => this._barMarkers())}`;
  }

  private _barFlags(): TemplateResult {
    const b = DEFAULTS.bar;
    return html`
      ${this._bool('setpoint.bar.flags', 'Show value flags on the handles', b.flags)}
      ${(this._get('setpoint.bar.flags') ?? b.flags)
        ? html`${this._sidePlacement('flag_position', 'Flag placement', 'above', 'left')}
          ${this._color('setpoint.bar.flag_color', 'Flag colour', 'Heat / cool colour', '#ff8100')}
          ${this._color('setpoint.bar.flag_text_color', 'Flag text colour', 'White', '#ffffff')}`
        : nothing}
    `;
  }

  private _barMarkers(): TemplateResult {
    const b = DEFAULTS.bar;
    return html`
      ${this._group('Ticks & markers', true)}
      ${this._bool('setpoint.bar.show_current', 'Current temperature marker', b.show_current)}
      ${this._slider('setpoint.bar.ticks', 'Tick every', 0, 10, 0.5, b.ticks, (n) => (n ? `${n}°` : 'Off'))}
      ${this._slider('setpoint.bar.labels', 'Label every', 0, 20, 1, b.labels, (n) => (n ? `${n}°` : 'Off'))}
      ${(this._get('setpoint.bar.ticks') ?? b.ticks) || (this._get('setpoint.bar.labels') ?? b.labels)
        ? this._sidePlacement('tick_position', 'Ticks & labels', 'below', 'right')
        : nothing}
      ${this._group('Range')}
      ${this._hint('Leave empty to use the thermostat’s own limits.')}
      ${(['range_min', 'range_max'] as const).map(
        (k) => html`<div class="etce-row">
          <label class="lbl">${k === 'range_min' ? 'From' : 'To'}</label>
          <input
            type="number"
            .value=${String(this._get(`setpoint.bar.${k}`) ?? '')}
            @change=${(e: Event) => {
              const v = (e.target as HTMLInputElement).value;
              this._put(`setpoint.bar.${k}`, v === '' ? undefined : Number(v));
            }}
          />
        </div>`,
      )}
    `;
  }

  private _barLook(): TemplateResult {
    const b = DEFAULTS.bar;
    const look = (this._get('setpoint.bar.look') as string) ?? b.look;
    const stops = (this._get('setpoint.bar.stops') as string[] | undefined) ?? ['#2b9af9', '#7ccf8a', '#ff8100'];
    return html`
      ${this._group('Placement', true)}
      ${this._select(
        'setpoint.bar.position',
        'Position',
        [['below', 'Below (horizontal)'], ['above', 'Above (horizontal)'], ['left', 'Left (vertical)'], ['right', 'Right (vertical)']],
        b.position,
      )}
      ${['left', 'right'].includes(String(this._get('setpoint.bar.position') ?? ''))
        ? this._slider('setpoint.bar.length', 'Height', 100, 400, 10, 200)
        : nothing}
      ${this._slider('setpoint.bar.height', 'Thickness', 6, 40, 1, b.height)}
      ${this._group('Colours')}
      ${this._select('setpoint.bar.look', 'Look', [['zones', 'Heat / comfort / cool zones'], ['gradient', 'Gradient']], b.look)}
      ${look === 'gradient'
        ? html`<div class="etce-row">
            <label class="lbl">Gradient (cold → hot)</label>
            <div class="etce-stops">
              ${stops.map(
                (s, i) => html`<input
                  type="color"
                  .value=${s}
                  @change=${(e: Event) => {
                    const next = [...stops];
                    next[i] = (e.target as HTMLInputElement).value;
                    this._put('setpoint.bar.stops', next);
                  }}
                />`,
              )}
            </div>
          </div>`
        : html`${this._color('setpoint.bar.heat_color', 'Heat zone', 'Theme heat', '#ff8100')}
          ${this._color('setpoint.bar.comfort_color', 'Comfort zone', 'Green', '#4caf50')}
          ${this._color('setpoint.bar.cool_color', 'Cool zone', 'Theme cool', '#2b9af9')}`}
      ${this._group('Handles')}
      ${this._select(
        'setpoint.bar.handle_shape',
        'Handle',
        [['round', 'Round'], ['square', 'Square'], ['diamond', 'Diamond'], ['line', 'Line']],
        b.handle_shape,
      )}
      ${this._color('setpoint.bar.handle_color', 'Handle fill', 'White', '#ffffff')}
      ${this._check('Handle border', this._get('setpoint.bar.handle_border_color') !== 'none', (on) =>
        this._put('setpoint.bar.handle_border_color', on ? undefined : 'none'),
      )}
      ${this._get('setpoint.bar.handle_border_color') !== 'none'
        ? this._color('setpoint.bar.handle_border_color', 'Handle border colour', 'Heat / cool colour', '#ffffff')
        : nothing}
    `;
  }

  // ---- button sets --------------------------------------------------------------

  private _setsBody(): TemplateResult {
    const sets = this._sets();
    const entity = this.hass?.states[this._config!.entity];
    const add = (type: SetType) => {
      const n = sets.filter((x) => x.type === 'custom' || x.type === 'chips').length + 1;
      const next = [...sets, type === 'custom' ? { type, name: `Buttons ${n}` } : { type }];
      this._set = next.length - 1;
      this._writeSets(next as ButtonSetConfig[]);
    };
    return html`
      ${this._hint('Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.')}
      <div class="etce-addbar">
        ${(['hvac', 'preset', 'fan_mode', 'custom'] as SetType[]).map(
          (t) => html`<button class="etce-add" @click=${() => add(t)}>+ ${SET_TITLES[t]}</button>`,
        )}
      </div>
      <div class="etce-slist">
        ${sets.map((s, i) => {
          const count = (s.items?.length ?? 0) + (s.chips?.length ?? 0);
          const supported = isBuiltin(s.type) ? availableOptions(entity, s.type).length > 0 || count > 0 : true;
          const protectedSet = isBuiltin(s.type) && sets.filter((x) => x.type === s.type).length === 1;
          const open = this._set === i;
          return html`<div class="etce-srow ${s.hidden ? 'off' : ''} ${open ? 'open' : ''}">
              <ha-icon class="etce-sicon" icon=${SET_ICONS[s.type]}></ha-icon>
              <span class="etce-sname" @click=${() => (this._set = open ? null : i)}>${s.name ?? SET_TITLES[s.type]}</span>
              <span class="etce-stag"
                >${supported ? `${s.zone ?? this._defaultZone()} · ${this._displayTag(s)}` : 'not on this entity'}</span
              >
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => (this._set = open ? null : i)}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${i === 0} @click=${() => this._moveSet(i, -1)}>
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </button>
                <button class="etce-act" title="Move down" ?disabled=${i === sets.length - 1} @click=${() => this._moveSet(i, 1)}>
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </button>
                <button class="etce-act" title="Duplicate" @click=${() => this._duplicateSet(i)}>
                  <ha-icon icon="mdi:content-copy"></ha-icon>
                </button>
                <button class="etce-act etce-eye ${s.hidden ? 'off' : ''}" title=${s.hidden ? 'Show' : 'Hide'} @click=${() => this._patchSet(i, 'hidden', !s.hidden, false)}>
                  <ha-icon icon=${s.hidden ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}></ha-icon>
                </button>
                <button
                  class="etce-act del"
                  title=${protectedSet ? 'Built-in set: hide it instead' : 'Delete'}
                  ?disabled=${protectedSet}
                  @click=${() => this._deleteSet(i)}
                >
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${open ? html`<div class="etce-sedit">${this._setEditor(s, i)}</div>` : nothing}`;
        })}
      </div>
      ${this._sub('sets-layout', 'Layout & spacing', () => html`
        ${this._group('Location', true)}
        ${this._select('toggles_zone', 'Default location', [['bottom', 'Bottom'], ['top', 'Top'], ['left', 'Left'], ['right', 'Right']], DEFAULTS.toggles_zone)}
        ${this._hint('Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.')}
        ${this._group('Centring')}
        ${this._bool('zones.centered', 'Keep the main area centred', true)}
        ${this._hint('Balances the left and right sides so the temperature and controls stay on the card’s centre, whatever sits beside them.')}
        ${this._group('Distance from the main area')}
        ${this._slider('zones.gap', 'All sides', 0, 48, 1, 12)}
        ${(['top', 'bottom', 'left', 'right'] as const).map((k) => {
          const v = this._get(`zones.${k}`) as number | undefined;
          const def = (this._get('zones.gap') as number | undefined) ?? 12;
          return this._sliderRow(k.charAt(0).toUpperCase() + k.slice(1), v ?? def, 0, 48, 1, v !== undefined, (n) => this._put(`zones.${k}`, n));
        })}
        ${this._hint('Top, Bottom, Left and Right override “All sides” for one side; ↺ puts it back.')}`)}
      ${this._sub('sets-compact', 'Compact', () => html`
        ${this._bool('compact', 'Put every full-time set behind a toggle button', false)}
        ${this._hint('Keeps the card small until you open a set. Sets shown as expandable menus are already compact and are not changed.')}`)}
    `;
  }

  private _defaultZone(): Zone {
    return this._config?.toggles_zone ?? DEFAULTS.toggles_zone;
  }

  private _displayTag(s: ButtonSetConfig): string {
    if (s.display === 'menu' && s.type !== 'chips') return 'menu';
    if (this._config!.compact || s.display === 'toggle') return 'toggle';
    return 'full time';
  }

  /** "Share a row with": own row, or any other set (by id, added on demand). */
  private _shareRow(s: ButtonSetConfig, i: number): TemplateResult {
    const sets = this._sets();
    const label = (x: ButtonSetConfig, k: number) => `${x.name ?? SET_TITLES[x.type]} (#${k + 1})`;
    const others = sets.map((x, k) => [x, k] as const).filter(([, k]) => k !== i);
    const curIdx = s.row_with ? sets.findIndex((x) => x.id === s.row_with) : -1;
    const choose = (v: string) => {
      const next = sets.map((x) => ({ ...x }));
      if (v === '') delete next[i]!.row_with;
      else {
        const k = Number(v);
        let id = next[k]!.id;
        if (!id) {
          const used = new Set(next.map((x) => x.id).filter(Boolean));
          let n = 1;
          while (used.has(`set${n}`)) n++;
          id = `set${n}`;
          next[k]!.id = id;
        }
        next[i]!.row_with = id;
      }
      // Drop ids nobody points at any more (keeps the YAML tidy).
      const refs = new Set(next.map((x) => x.row_with).filter(Boolean));
      for (const x of next) if (x.id && !refs.has(x.id)) delete x.id;
      this._writeSets(next);
    };
    return html`${this._selectRow(
        'Share a row with',
        curIdx >= 0 ? String(curIdx) : '',
        [['', 'Own row'], ...others.map(([x, k]) => [String(k), label(x, k)] as Opt)],
        choose,
      )}
      ${curIdx >= 0 ? this._hint('Sits in that set’s row, on its side of the card; this set’s own Side is ignored.') : nothing}`;
  }

  private _moveSet(i: number, d: number): void {
    const sets = this._sets();
    const j = i + d;
    if (j < 0 || j >= sets.length) return;
    [sets[i], sets[j]] = [sets[j]!, sets[i]!];
    if (this._set === i) this._set = j;
    this._writeSets(sets);
  }

  private _duplicateSet(i: number): void {
    const sets = this._sets();
    const copy = structuredClone(sets[i]!);
    delete copy.id; // ids must stay unique; "Share a row with" links are kept
    copy.name = `${sets[i]!.name ?? SET_TITLES[sets[i]!.type]} copy`;
    sets.splice(i + 1, 0, copy);
    this._set = i + 1;
    this._writeSets(sets);
  }

  private _deleteSet(i: number): void {
    const sets = this._sets();
    sets.splice(i, 1);
    this._set = null;
    this._writeSets(sets);
  }

  private _setEditor(s: ButtonSetConfig, i: number): TemplateResult {
    const zone = s.zone ?? this._defaultZone();
    const sideZone = zone === 'left' || zone === 'right';
    const put = (path: string, v: unknown, def?: unknown) => this._patchSet(i, path, v, def);
    return html`
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input type="text" .value=${s.name ?? ''} placeholder=${SET_TITLES[s.type]} @change=${(e: Event) => put('name', (e.target as HTMLInputElement).value || undefined)} />
      </div>
      ${this._sub(`set-${i}-buttons`, 'Buttons in this set', () => this._buttonsEditor(s, i))}
      ${this._sub(`set-${i}-place`, 'Placement', () => html`
      ${this._group('Side & layout', true)}
      ${this._selectRow(
        'Side',
        s.zone ?? '',
        [['', `Default (${this._defaultZone()})`], ['bottom', 'Bottom'], ['top', 'Top'], ['left', 'Left'], ['right', 'Right']],
        (v) => put('zone', v || undefined),
      )}
      ${this._selectRow('Orientation', s.orientation ?? (sideZone ? 'column' : 'row'), [['row', 'Row'], ['column', 'Column']], (v) =>
        put('orientation', v, sideZone ? 'column' : 'row'),
      )}
      ${this._selectRow('Align', s.align ?? (s.type === 'chips' ? 'center' : 'stretch'), [['stretch', 'Fill width'], ['start', 'Start'], ['center', 'Center'], ['end', 'End']], (v) =>
        put('align', v, s.type === 'chips' ? 'center' : 'stretch'),
      )}
      ${(s.align ?? 'stretch') === 'stretch' && s.type !== 'chips'
        ? this._sliderRow('Columns', s.columns ?? 0, 0, 8, 1, s.columns !== undefined, (v) => put('columns', v, 0), (n) => (n ? String(n) : 'Auto'))
        : nothing}
      ${this._group('Row')}
      ${this._shareRow(s, i)}`)}
      ${this._sub(`set-${i}-display`, 'Display', () => html`
      ${this._selectRow(
        'Show',
        s.display ?? 'always',
        [['always', 'Full time'], ['toggle', 'Behind a toggle button'], ['menu', 'Expandable menu']],
        (v) => put('display', v, 'always'),
      )}
      ${s.display === 'menu'
        ? html`${this._hint('One button shows the current value; tap it to open the full list.')}
          ${this._selectRow(
            'Opens',
            s.menu_direction ?? defaultMenuDirection(zone),
            [['down', 'Down'], ['up', 'Up'], ['right', 'Right'], ['left', 'Left']],
            (v) => put('menu_direction', v, defaultMenuDirection(zone)),
          )}
          ${this._check('Show the set name on the button', s.menu_show_name ?? false, (v) => put('menu_show_name', v, false))}`
        : nothing}
      ${(s.display ?? 'always') === 'toggle' || (this._config!.compact && s.display !== 'menu')
        ? this._selector('Toggle icon', { icon: {} }, s.toggle_icon, (v) => put('toggle_icon', v || undefined))
        : nothing}`)}
      ${this._sub(`set-${i}-style`, 'Button style for this set', () => html`${this._buttonStyleEditor(`sets.${i}.style`, true, i)}${this._copyStyle(i)}`)}
    `;
  }

  private _optionsEditor(s: ButtonSetConfig, i: number): TemplateResult {
    const entity = this.hass?.states[this._config!.entity];
    const values = orderOptions(availableOptions(entity, s.type), s.order);
    if (!values.length) return this._hint('The thermostat offers nothing for this set right now.');
    const move = (k: number, d: number) => {
      const next = [...values];
      const j = k + d;
      if (j < 0 || j >= next.length) return;
      [next[k], next[j]] = [next[j]!, next[k]!];
      this._patchSet(i, 'order', next);
    };
    return html`${this._hint('Built-in buttons from the thermostat: order, hide, rename and re-icon them. They can’t be deleted.')}
      <div class="etce-blist">
        ${values.map((v, k) => {
          const o = s.options?.[v] ?? {};
          const id = `${i}:${v}`;
          return html`<div class="etce-brow ${o.hide ? 'off' : ''}">
              <ha-icon class="etce-sicon" icon=${o.icon ?? MODE_ICONS[v.toLowerCase()] ?? 'mdi:circle-medium'}></ha-icon>
              <span class="etce-sname" @click=${() => (this._chip = this._chip === id ? null : id)}>${o.name ?? prettify(v)}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => (this._chip = this._chip === id ? null : id)}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${k === 0} @click=${() => move(k, -1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${k === values.length - 1} @click=${() => move(k, 1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act etce-eye ${o.hide ? 'off' : ''}" @click=${() => this._patchSet(i, `options.${v}.hide`, !o.hide, false)}>
                  <ha-icon icon=${o.hide ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}></ha-icon>
                </button>
              </div>
            </div>
            ${this._chip === id
              ? html`<div class="etce-sedit">
                  <div class="etce-row">
                    <label class="lbl">Label</label>
                    <input type="text" .value=${o.name ?? ''} placeholder=${prettify(v)} @change=${(e: Event) => this._patchSet(i, `options.${v}.name`, (e.target as HTMLInputElement).value || undefined)} />
                  </div>
                  ${this._selector('Icon', { icon: {} }, o.icon, (val) => this._patchSet(i, `options.${v}.icon`, val || undefined))}
                  ${this._copyTo(i, { kind: 'mode', source: s.type as ModeSource, value: v, name: o.name, icon: o.icon })}
                </div>`
              : nothing}`;
        })}
      </div>`;
  }

  /** The set's added buttons (older device-only sets are read as device buttons). */
  private _itemsOf(s: ButtonSetConfig): ButtonItem[] {
    return [...(s.chips ?? []).map((c) => ({ kind: 'device' as const, ...c })), ...(s.items ?? [])];
  }

  /** Write a set's buttons. An older device-only set becomes a Buttons set that
   *  keeps its chip look, so nothing changes on the card. */
  private _setItems(sets: ButtonSetConfig[], i: number, list: ButtonItem[]): void {
    const set = { ...sets[i]! };
    delete set.chips;
    if (list.length) set.items = list;
    else delete set.items;
    if (set.type === 'chips') {
      set.type = 'custom';
      if (!set.style?.look) set.style = { ...(set.style ?? {}), look: 'chip' };
      set.align ??= 'center';
    }
    sets[i] = set;
  }

  private _writeItems(i: number, list: ButtonItem[]): void {
    const sets = this._sets();
    this._setItems(sets, i, list);
    this._writeSets(sets);
  }

  /** "Copy to set": add a copy of this button to another set. */
  private _copyTo(from: number, item: ButtonItem): TemplateResult {
    const sets = this._sets();
    const others = sets.map((x, k) => [x, k] as const).filter(([, k]) => k !== from);
    if (!others.length) return html``;
    return this._selectRow(
      'Copy to set',
      '',
      [['', 'Choose a set…'], ...others.map(([x, k]) => [String(k), `${x.name ?? SET_TITLES[x.type]} (#${k + 1})`] as Opt)],
      (v) => {
        if (v === '') return;
        const all = this._sets();
        const k = Number(v);
        const copy = structuredClone(item) as ButtonItem;
        delete (copy as { hide?: boolean }).hide;
        this._setItems(all, k, [...this._itemsOf(all[k]!), copy]);
        this._writeSets(all);
      },
    );
  }

  private _buttonsEditor(s: ButtonSetConfig, i: number): TemplateResult {
    const entity = this.hass?.states[this._config!.entity];
    const items = this._itemsOf(s);
    const sources = (['hvac', 'preset', 'fan_mode'] as ModeSource[]).filter((src) => availableOptions(entity, src).length);
    const add = (kind: ButtonItem['kind'], rf = false) => {
      let it: ButtonItem | null = null;
      if (kind === 'mode') {
        const src = isBuiltin(s.type) && sources.includes(s.type) ? s.type : sources[0];
        if (src) it = { kind: 'mode', source: src, value: availableOptions(entity, src)[0]! };
      } else if (kind === 'device') {
        // A device needs an entity before it is stored; seed one, pick below.
        const ent = rf ? this._firstRfFan() : undefined;
        const fallback = ent || Object.keys(this.hass?.states ?? {}).find((id) => id.startsWith(rf ? 'fan.' : 'sensor.'));
        if (fallback) it = { kind: 'device', type: rf ? 'rf_fan' : 'entity', entity: fallback };
      } else {
        const script = Object.keys(this.hass?.states ?? {}).find((id) => id.startsWith('script.'));
        it = script ? { kind: 'action', action: 'script', entity: script } : { kind: 'action', action: 'service' };
      }
      if (!it) return;
      this._chip = `item:${i}:${items.length}`;
      this._writeItems(i, [...items, it]);
    };
    return html`
      ${isBuiltin(s.type) ? html`${this._group('From the thermostat', true)}${this._optionsEditor(s, i)}${this._group('Added buttons')}` : nothing}
      ${this._hint(
        isBuiltin(s.type)
          ? 'Add any button to this set: another mode, a device or sensor, or an action.'
          : 'Add mode buttons, devices and sensors (shown with their value), or actions (script, scene or service).',
      )}
      <div class="etce-addbar">
        ${sources.length ? html`<button class="etce-add" @click=${() => add('mode')}>+ Mode button</button>` : nothing}
        <button class="etce-add" @click=${() => add('device')}>+ Device / sensor</button>
        <button class="etce-add" @click=${() => add('device', true)}>+ RF fan</button>
        <button class="etce-add" @click=${() => add('action')}>+ Action</button>
      </div>
      <div class="etce-blist">
        ${items.map((it, k) => {
          const id = `item:${i}:${k}`;
          const open = this._chip === id;
          const upd = (path: string, v: unknown, def?: unknown) => {
            const next = [...items];
            const merged = setPath(next[k] as unknown as Record<string, unknown>, path, v === def ? undefined : v) as unknown as ButtonItem;
            next[k] = { ...merged, kind: it.kind } as ButtonItem;
            if (it.kind === 'device') (next[k] as typeof it).entity ||= it.entity;
            this._writeItems(i, next);
          };
          const move = (d: number) => {
            const next = [...items];
            const j = k + d;
            if (j < 0 || j >= next.length) return;
            [next[k], next[j]] = [next[j]!, next[k]!];
            this._writeItems(i, next);
          };
          const { name, icon, tag } = this._itemSummary(it);
          return html`<div class="etce-brow ${it.hide ? 'off' : ''}">
              <ha-icon class="etce-sicon" icon=${icon}></ha-icon>
              <span class="etce-sname" @click=${() => (this._chip = open ? null : id)}>${name}</span>
              <span class="etce-stag">${tag}</span>
              <div class="etce-sctl">
                <button class="etce-act" title="Edit" @click=${() => (this._chip = open ? null : id)}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" title="Move up" ?disabled=${k === 0} @click=${() => move(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" title="Move down" ?disabled=${k === items.length - 1} @click=${() => move(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act" title="Duplicate" @click=${() => {
                  const next = [...items];
                  next.splice(k + 1, 0, structuredClone(it));
                  this._writeItems(i, next);
                }}><ha-icon icon="mdi:content-copy"></ha-icon></button>
                <button class="etce-act etce-eye ${it.hide ? 'off' : ''}" title=${it.hide ? 'Show' : 'Hide'} @click=${() => upd('hide', !it.hide, false)}>
                  <ha-icon icon=${it.hide ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._writeItems(i, items.filter((_, x) => x !== k))}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${open ? html`<div class="etce-sedit">${this._itemFields(it, upd)}${this._copyTo(i, it)}</div>` : nothing}`;
        })}
      </div>
    `;
  }

  private _itemSummary(it: ButtonItem): { name: string; icon: string; tag: string } {
    if (it.kind === 'mode') return { name: it.name ?? prettify(it.value), icon: it.icon ?? MODE_ICONS[it.value.toLowerCase()] ?? KIND_ICON.mode, tag: SOURCE_NAMES[it.source] };
    if (it.kind === 'device') {
      const st = this.hass?.states[it.entity];
      return {
        name: it.name ?? (st?.attributes.friendly_name as string | undefined) ?? it.entity,
        icon: it.icon ?? (it.type === 'rf_fan' ? 'mdi:ceiling-fan' : KIND_ICON.device),
        tag: it.type === 'rf_fan' ? 'RF fan' : 'Device',
      };
    }
    return { name: it.name ?? (this.hass ? actionLabel(this.hass, it) : 'Action'), icon: it.icon ?? actionIcon(it), tag: 'Action' };
  }

  private _itemFields(it: ButtonItem, upd: (path: string, v: unknown, def?: unknown) => void): TemplateResult {
    const nameIcon = (placeholder: string) => html`<div class="etce-row">
        <label class="lbl">Label</label>
        <input type="text" .value=${it.name ?? ''} placeholder=${placeholder} @change=${(e: Event) => upd('name', (e.target as HTMLInputElement).value || undefined)} />
      </div>
      ${this._selector('Icon', { icon: {} }, it.icon, (v) => upd('icon', v || undefined))}`;
    if (it.kind === 'mode') {
      const entity = this.hass?.states[this._config!.entity];
      const sources = (['hvac', 'preset', 'fan_mode'] as ModeSource[]).filter((s) => availableOptions(entity, s).length || s === it.source);
      const values = availableOptions(entity, it.source);
      return html`${this._selectRow('Sets', it.source, sources.map((s) => [s, SOURCE_NAMES[s]] as Opt), (v) => {
          const first = availableOptions(entity, v as ModeSource)[0];
          upd('source', v);
          if (first && !availableOptions(entity, v as ModeSource).includes(it.value)) upd('value', first);
        })}
        ${this._selectRow('Value', it.value, (values.includes(it.value) ? values : [it.value, ...values]).map((v) => [v, prettify(v)] as Opt), (v) => upd('value', v))}
        ${nameIcon(prettify(it.value))}`;
    }
    if (it.kind === 'action') {
      const kind = it.action ?? (it.entity?.startsWith('scene.') ? 'scene' : it.entity ? 'script' : 'service');
      return html`${this._selectRow('Runs', kind, [['script', 'A script'], ['scene', 'A scene'], ['service', 'A service']], (v) => upd('action', v))}
        ${kind === 'script' || kind === 'scene'
          ? this._selector(kind === 'script' ? 'Script' : 'Scene', { entity: { domain: kind } }, it.entity, (v) => upd('entity', v || undefined))
          : html`<div class="etce-row">
                <label class="lbl">Service</label>
                <input type="text" .value=${it.service ?? ''} placeholder="light.turn_on" @change=${(e: Event) => upd('service', (e.target as HTMLInputElement).value.trim() || undefined)} />
              </div>
              ${this._selector('Target (optional)', { entity: {} }, it.entity, (v) => upd('entity', v || undefined))}
              ${this._hint('Extra service data (optional).')}
              ${this._selector('', { object: {} }, it.data, (v) => upd('data', v && Object.keys(v as object).length ? v : undefined))}`}
        ${nameIcon(this.hass ? actionLabel(this.hass, it) : 'Action')}`;
    }
    // device
    const ch = it;
    return html`
      ${this._selector('Entity', { entity: ch.type === 'rf_fan' ? { domain: 'fan' } : {} }, ch.entity, (v) => v && upd('entity', v))}
      ${nameIcon('Entity name')}
      <div class="etce-checks">
        ${this._check('Show name', ch.show_name ?? true, (v) => upd('show_name', v, true))}
        ${this._check('Show value', ch.show_state ?? true, (v) => upd('show_state', v, true))}
      </div>
      ${ch.type === 'rf_fan' ? this._rfFanInfo(ch) : nothing}
      ${ch.type === 'rf_fan'
        ? this._selectRow('Speed shows as', ch.speed_format ?? 'number', [['number', 'Number (4)'], ['fraction', 'Fraction (4/10)'], ['percent', 'Percent (40%)']], (v) =>
            upd('speed_format', v, 'number'),
          )
        : nothing}
      ${this._selectRow(
        'Tap',
        ch.tap ?? (ch.type === 'rf_fan' ? 'popup' : 'more-info'),
        [['popup', 'Open card in pop-up'], ['more-info', 'More info'], ['toggle', 'Toggle'], ['none', 'Nothing']],
        (v) => upd('tap', v, ch.type === 'rf_fan' ? 'popup' : 'more-info'),
      )}
      ${this._selectRow(
        'Hold',
        ch.hold ?? (ch.type === 'rf_fan' ? 'toggle' : 'none'),
        [['toggle', 'Toggle'], ...(ch.type === 'rf_fan' ? [['toggle_light', 'Toggle light'] as Opt] : []), ['more-info', 'More info'], ['none', 'Nothing']],
        (v) => upd('hold', v, ch.type === 'rf_fan' ? 'toggle' : 'none'),
      )}
      ${(ch.tap ?? (ch.type === 'rf_fan' ? 'popup' : 'more-info')) === 'popup'
        ? html`${this._hint(ch.type === 'rf_fan' ? 'Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan.' : 'Pop-up card config (any card).')}
          ${this._selector('', { object: {} }, ch.popup_card, (v) => upd('popup_card', v && Object.keys(v as object).length ? v : undefined))}`
        : nothing}
    `;
  }

  /** Copy this set's button style to other sets. */
  private _copyStyle(i: number): TemplateResult {
    const sets = this._sets();
    const others = sets.map((x, k) => [x, k] as const).filter(([, k]) => k !== i);
    if (!others.length) return html``;
    return html`${this._group('Copy style')}
      ${this._selectRow(
        'Copy this style to',
        '',
        [['', 'Choose…'], ['all', 'All other sets'], ...others.map(([x, k]) => [String(k), `${x.name ?? SET_TITLES[x.type]} (#${k + 1})`] as Opt)],
        (v) => {
          if (v === '') return;
          const all = this._sets();
          const targets = v === 'all' ? others.map(([, k]) => k) : [Number(v)];
          const styled = targets.filter((k) => all[k]!.style && Object.keys(all[k]!.style!).length);
          if (styled.length && !window.confirm(`Replace the button style of ${styled.length === 1 ? 'that set' : `${styled.length} sets`}?`)) {
            this.requestUpdate();
            return;
          }
          const style = all[i]!.style;
          for (const k of targets) {
            const next = { ...all[k]! };
            if (style && Object.keys(style).length) next.style = structuredClone(style);
            else delete next.style;
            all[k] = next;
          }
          this._writeSets(all);
        },
      )}
      ${this._hint('Gives the chosen sets exactly this set’s button style (a set with no style of its own follows the card’s Button style).')}`;
  }

  /** What was detected for this fan (read-only hint). */
  private _rfFanInfo(ch: ChipConfig): TemplateResult | typeof nothing {
    if (!this.hass?.states[ch.entity]) return nothing;
    const v = toChipView(this.hass, ch, 0);
    const parts = [
      v.speedCount ? `${v.speedCount} speeds` : 'speed count unknown',
      v.naturalLevels ? `Breeze ${v.naturalLevels} levels` : Array.isArray(this.hass.states[ch.entity]!.attributes.preset_modes) ? 'Breeze' : '',
      v.lightEntity ? `light ${v.lightEntity}` : 'no light found',
    ].filter(Boolean);
    return this._hint(`Detected: ${parts.join(' · ')}.`);
  }

  private _firstRfFan(): string | undefined {
    const reg = this.hass?.entities ?? {};
    return Object.values(reg).find((e) => e.entity_id.startsWith('fan.') && e.platform === 'esphome_rf_fan')?.entity_id;
  }

  // ---- button style (card default + per set — same property set) ---------------

  private _buttonsBody(): TemplateResult {
    const c = this._config!;
    const on = !!(c.frosted ?? c.background?.frosted);
    // Moving it here also drops the older background.frosted / frost_blur keys.
    const writeFrost = (path: 'frosted' | 'frost_blur', v: unknown) => {
      let next = setPath(c as Record<string, unknown>, 'background.frosted', undefined);
      next = setPath(next, 'background.frost_blur', undefined);
      if (path === 'frosted') {
        next = setPath(next, 'frosted', v ? true : undefined);
        const blur = c.frost_blur ?? c.background?.frost_blur;
        next = setPath(next, 'frost_blur', v ? blur : undefined);
      } else {
        next = setPath(next, 'frosted', true);
        next = setPath(next, 'frost_blur', v === BG_DEFAULTS.frost_blur ? undefined : v);
      }
      this._emit(next as CardConfig);
    };
    const blur = c.frost_blur ?? c.background?.frost_blur;
    return html`${this._hint('The look of every button. Each button set can override any of these under “Button style for this set”.')}
      ${this._buttonStyleEditor('buttons', false)}
      ${this._sub('bs-frost', 'Frosted glass', () => html`
        ${this._check('Frosted glass controls', on, (v) => writeFrost('frosted', v))}
        ${this._hint('Buttons, menus, chips, toggles, setpoint pills and the wheel’s setpoint bubble turn see-through with a blur. Best over a moving background or an image.')}
        ${on
          ? this._sliderRow('Blur', blur ?? BG_DEFAULTS.frost_blur, 0, 40, 1, blur !== undefined, (v) => writeFrost('frost_blur', v))
          : nothing}`)}`;
  }

  private _buttonStyleEditor(base: string, isSet: boolean, setIndex?: number): TemplateResult {
    const cur = (isSet ? this._sets()[setIndex!]?.style : this._config!.buttons) ?? {};
    const inherited = isSet ? resolveButtonStyle(this._config!.buttons, undefined) : BUTTON_DEFAULTS;
    const def = isSet ? 'Card default' : 'Built-in';
    const put = (k: string, v: unknown) => {
      if (isSet) this._patchSet(setIndex!, `style.${k}`, v);
      else this._put(`${base}.${k}`, v);
    };
    const sel = (k: keyof typeof cur, label: string, opts: Opt[]) => {
      const inh = String((inherited as unknown as Record<string, unknown>)[k] ?? '');
      const name = opts.find(([v]) => v === inh)?.[1] ?? inh;
      return this._selectRow(label, String(cur[k] ?? ''), [['', `${def} (${name})`], ...opts], (v) => put(k, v || undefined));
    };
    const sl = (k: keyof typeof cur, label: string, min: number, max: number, fmt?: (n: number) => string, step = 1, fallback = 0) => {
      const inh = Number((inherited as unknown as Record<string, unknown>)[k] ?? fallback);
      const v = cur[k] as number | undefined;
      return this._sliderRow(label, v ?? inh, min, max, step, v !== undefined, (n) => put(k, n), fmt);
    };
    const col = (k: keyof typeof cur, label: string, seed: string) =>
      this._colorRow(`${base}.${k}`, label, cur[k] as string | undefined, isSet ? 'Card default' : 'Automatic', seed, (v) => put(k, v));
    let first = true;
    const section = (id: string, title: string, body: () => TemplateResult) => {
      if (!isSet) return this._sub(`bs-${id}`, title, body);
      const out = html`${this._group(title, first)}${body()}`;
      first = false;
      return out;
    };
    return html`
      ${section('look', 'Look & size', () => html`
      ${this._selectRow(
        'Look',
        String(cur.look ?? ''),
        [
          ['', isSet ? `Card default (${this._config!.buttons?.look === 'chip' ? 'Chip' : this._config!.buttons?.look === 'button' ? 'Button' : setIndex !== undefined && this._sets()[setIndex]?.type === 'chips' ? 'Chip' : 'Button'})` : 'Built-in (Chips for device sets, buttons for the rest)'],
          ['button', 'Button'],
          ['chip', 'Chip'],
        ],
        (v) => put('look', v || undefined),
      )}
      ${sl('scale', 'Scale', 50, 200, (n) => `${n}%`, 5, 100)}
      ${this._hint(isSet ? 'Scales every button in this set. Card default comes from Button style.' : 'Scales every button in every set. Each set can override it under “Button style for this set”.')}`)}
      ${section('shape', 'Shape', () => html`
      ${sel('variant', 'Style', [['tonal', 'Tonal (tinted)'], ['filled', 'Filled'], ['outlined', 'Outlined'], ['ghost', 'Ghost']])}
      ${sl('radius', 'Corner radius', 0, 40)} ${sl('height', 'Min height', 0, 120)} ${sl('min_width', 'Min width', 0, 200)}
      ${sl('gap', 'Spacing', 0, 32)} ${sl('border_width', 'Border width', 0, 6)}`)}
      ${section('content', 'Content', () => html`
      ${sel('content', 'Show', [['icon_label', 'Icon and label'], ['icon', 'Icon only'], ['label', 'Label only']])}
      ${sel('icon_position', 'Icon', [['top', 'Above label'], ['left', 'Left of label']])}
      ${sl('icon_size', 'Icon size', 10, 48)} ${sl('font_size', 'Text size', 8, 28)}
      ${sl('icon_gap', 'Icon to text spacing', 0, 30, undefined, 1, 4)}
      ${sel('font_weight' as keyof typeof cur, 'Text weight', [['300', 'Light'], ['400', 'Regular'], ['500', 'Medium'], ['600', 'Semibold'], ['700', 'Bold']])}
      `)}
      ${section('inactive', 'Colours: inactive', () => html`
      ${col('background', 'Background', '#2a2a2a')} ${col('color', 'Text & icon', '#cccccc')} ${col('border_color', 'Border', '#555555')}`)}
      ${section('active', 'Colours: active', () => html`
      ${this._hint('Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.')}
      ${col('active_background', 'Background', '#ff8100')} ${col('active_color', 'Text & icon', '#ffffff')}
      ${col('active_border_color', 'Border', '#ff8100')}`)}
    `;
  }

  // ---- text ---------------------------------------------------------------------

  private _textBody(): TemplateResult {
    return html`${this._hint('Size, weight, color and case for each piece of text. Unset keeps the built-in look.')}
      ${TEXT_ROLES.map((role) => this._sub(`text-${role}`, TEXT_LABELS[role], () => this._textRole(role)))}`;
  }

  private _textRole(role: TextRole): TemplateResult {
    const p = `text.${role}`;
    const t = (this._get(p) as Record<string, unknown> | undefined) ?? {};
    return html`
      ${this._sliderRow('Size', (t.size as number) ?? 0, 0, 160, 1, t.size !== undefined, (v) => this._put(`${p}.size`, v || undefined), (n) =>
        n ? `${n}px` : 'Auto',
      )}
      ${this._selectRow(
        'Weight',
        String(t.weight ?? ''),
        [['', 'Built-in'], ['100', 'Thin'], ['200', 'Extra light'], ['300', 'Light'], ['400', 'Regular'], ['500', 'Medium'], ['600', 'Semibold'], ['700', 'Bold'], ['800', 'Extra bold']],
        (v) => this._put(`${p}.weight`, v ? Number(v) : undefined),
      )}
      ${this._color(`${p}.color`, 'Color', 'Built-in', '#ffffff')}
      ${this._selectRow(
        'Case',
        String(t.transform ?? ''),
        [['', 'Built-in'], ['none', 'As written'], ['uppercase', 'UPPERCASE'], ['lowercase', 'lowercase'], ['capitalize', 'Capitalize']],
        (v) => this._put(`${p}.transform`, v || undefined),
      )}
      ${this._sliderRow('Letter spacing', (t.letter_spacing as number) ?? 0, -10, 30, 1, t.letter_spacing !== undefined, (v) => this._put(`${p}.letter_spacing`, v), (n) =>
        `${(n / 100).toFixed(2)}em`,
      )}
      ${this._selectRow('Italic', t.italic === undefined ? '' : t.italic ? 'on' : 'off', [['', 'Built-in'], ['off', 'Off'], ['on', 'On']], (v) =>
        this._put(`${p}.italic`, v === '' ? undefined : v === 'on'),
      )}
      ${this._sliderRow('Opacity', (t.opacity as number) ?? 100, 10, 100, 5, t.opacity !== undefined, (v) => this._put(`${p}.opacity`, v), (n) => `${n}%`)}
    `;
  }

  // ---- card -----------------------------------------------------------------------

  private _effectsBody(): TemplateResult {
    const c = this._config!;
    const opts: Opt[] = [['none', 'Off'], ['glow', 'Glow'], ['pulse', 'Pulse'], ['both', 'Glow + pulse']];
    const write = (t: string, v: string) => {
      // The card's old "glow" switch defaults the card to Glow; store the
      // choice in effects and drop the legacy key so there is one place.
      let next = setPath(c as Record<string, unknown>, `effects.${t}`, v === 'none' && t !== 'card' ? undefined : v) as CardConfig;
      if (t === 'card') {
        next = setPath(next as Record<string, unknown>, 'card.glow', undefined) as CardConfig;
        if (v === 'glow') next = setPath(next as Record<string, unknown>, 'effects.card', undefined) as CardConfig;
      }
      this._emit(next);
    };
    return html`
      ${this._hint('Make parts of the card glow or pulse in the heat colour while heating and the cool colour while cooling.')}
      ${this._sub('fx-parts', 'Parts', () => html`${FX_TARGETS.map((t) => this._selectRow(FX_LABELS[t], fxMode(c, t), opts, (v) => write(t, v)))}`)}
      ${this._sub('fx-when', 'When', () => html`
      ${this._select(
        'effects.when',
        'Active',
        [['running', 'Only while heating or cooling'], ['mode', 'Whenever the mode is Heat or Cool']],
        FX_DEFAULTS.when,
      )}
      ${this._hint('“Only while heating or cooling” follows what the system is doing right now; the other also lights up while it waits at the setpoint.')}`)}
      ${this._sub('fx-look', 'Look', () => html`
      ${this._slider('effects.size', 'Glow size', 2, 60, 1, FX_DEFAULTS.size)}
      ${this._slider('effects.speed', 'Pulse speed', 0.6, 8, 0.2, FX_DEFAULTS.speed, (n) => `${n.toFixed(1)}s`)}
      ${this._color('effects.heat_color', 'Heating colour', 'Theme heat', '#ff8100')}
      ${this._color('effects.cool_color', 'Cooling colour', 'Theme cool', '#2b9af9')}`)}
    `;
  }

  private _backgroundBody(): TemplateResult {
    const c = this._config!;
    const b = c.background ?? {};
    const fill = b.fill ?? 'color';
    const style = b.style ?? 'none';
    const put = (path: string, v: unknown, def?: unknown) => this._put(`background.${path}`, v, def);
    // One place owns the fill: writing it here also clears the older card.background.
    const writeColor = (v: string | undefined) => {
      let next = setPath(c as Record<string, unknown>, 'card.background', undefined);
      next = setPath(next, 'background.color', v);
      this._emit(next as CardConfig);
    };
    const pct = (n: number) => `${n}%`;
    return html`
      ${this._hint('The card’s surface. A moving background follows what the thermostat is doing: heat rises, cold sinks, a fan swirls, idle barely drifts.')}
      ${this._sub('bg-base', 'Base fill', () => html`
      ${this._selectRow('Fill', fill, [['color', 'Colour'], ['gradient', 'Gradient'], ['image', 'Image']], (v) => put('fill', v, 'color'))}
      ${fill === 'color'
        ? this._colorRow('background.color', 'Colour', b.color ?? (c.card?.background as string | undefined), 'Theme card', '#1c1c1c', writeColor, { transparent: true })
        : nothing}
      ${fill === 'gradient' ? this._gradientEditor() : nothing}
      ${fill === 'image' ? this._imageEditor() : nothing}`)}
      ${this._sub('bg-move', 'Moving background', () => html`
      ${this._selectRow('Style', style, BG_STYLES.map(([v, n]) => [v, n] as Opt), (v) => put('style', v, 'none'))}
      ${style !== 'none'
        ? html`
            ${this._hint(BG_STYLES.find(([v]) => v === style)?.[2] ?? '')}
            ${this._group('Motion')}
            ${this._slider('background.strength', 'Strength', 0, 100, 5, BG_DEFAULTS.strength, pct)}
            ${this._slider('background.speed', 'Speed', 25, 300, 5, BG_DEFAULTS.speed, pct)}
            ${this._bool('background.follow_gap', 'Follow the work', BG_DEFAULTS.follow_gap)}
            ${this._hint('Moves faster and glows stronger the further the room is from the setpoint, and settles as it gets close.')}
            ${this._select('background.off', 'When off', [['calm', 'A calm, near-still background'], ['none', 'No moving background']], BG_DEFAULTS.off)}
            ${this._select('background.quality', 'Quality', [['smooth', 'Smooth'], ['light', 'Light (older tablets)']], BG_DEFAULTS.quality)}
            ${this._group('Sync to Air Movement')}
            ${this._selector('Entity', { entity: {} }, b.air_entity ?? b.fan_entity, (v) => {
              let next = setPath(c as Record<string, unknown>, 'background.fan_entity', undefined);
              next = setPath(next, 'background.air_entity', v || undefined);
              this._emit(next as CardConfig);
            })}
            ${this._hint('Optional. Any entity that says how much air is moving: a fan (%), speed levels, on/off, low / medium / high, or an airflow sensor. While it shows air moving, the background swirls at that speed. Without one, Fan Only mode uses the thermostat’s own fan speed.')}
            ${b.air_entity || b.fan_entity
              ? html`<div class="etce-row">
                    <label class="lbl">Full speed at</label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      placeholder="Automatic"
                      .value=${b.air_max !== undefined ? String(b.air_max) : ''}
                      @change=${(e: Event) => {
                        const v = (e.target as HTMLInputElement).value;
                        put('air_max', v === '' ? undefined : Number(v));
                      }}
                    />
                  </div>
                  ${this._hint('For raw numbers only, e.g. 1200 for a 1200 CFM airflow sensor. Leave empty and percentages, number entities and speed names work on their own.')}`
              : nothing}
          `
        : nothing}`)}
      ${style !== 'none' ? this._sub('bg-colours', 'Colours by state', () => this._bgColours()) : nothing}
      ${this._sub('bg-finish', 'Finish', () => html`
      ${this._slider('background.scrim', 'Lighten / darken', -60, 60, 5, 0, (n) => (n > 0 ? `Darken ${n}%` : n < 0 ? `Lighten ${-n}%` : 'None'))}
      ${this._slider('background.vignette', 'Vignette', 0, 100, 5, 0, pct)}
      ${this._slider('background.grain', 'Grain', 0, 100, 5, 0, pct)}`)}
    `;
  }

  private _gradientEditor(): TemplateResult {
    const g = this._config!.background?.gradient ?? {};
    const stops = g.stops?.length ? [...g.stops] : ['#1c2a3a', '#3a1c2a'];
    const writeStops = (s: string[]) => this._put('background.gradient.stops', s);
    return html`
      ${this._selectRow('Type', g.type ?? 'linear', [['linear', 'Linear'], ['radial', 'Radial']], (v) => this._put('background.gradient.type', v, 'linear'))}
      ${(g.type ?? 'linear') === 'linear' ? this._slider('background.gradient.angle', 'Angle', 0, 360, 5, 135, (n) => `${n}°`) : nothing}
      ${stops.map(
        (s, i) => html`${this._colorRow(`bg-stop-${i}`, `Colour ${i + 1}`, s, 'Card colour', '#1c2a3a', (v) => {
            const next = [...stops];
            next[i] = v ?? 'var(--card-background-color)';
            writeStops(next);
          })}
          ${stops.length > 2
            ? html`<div class="etce-row"><button class="etce-act del" title="Remove colour" @click=${() => writeStops(stops.filter((_, k) => k !== i))}>
                <ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>`
            : nothing}`,
      )}
      ${stops.length < 4 ? html`<div class="etce-addbar"><button class="etce-add" @click=${() => writeStops([...stops, '#000000'])}>+ Colour</button></div>` : nothing}
    `;
  }

  private _imageEditor(): TemplateResult {
    const im = this._config!.background?.image ?? {};
    return html`
      <div class="etce-row">
        <label class="lbl">Image</label>
        <input
          type="text"
          .value=${im.url ?? ''}
          placeholder="/local/backgrounds/living-room.jpg"
          @change=${(e: Event) => this._put('background.image.url', (e.target as HTMLInputElement).value.trim() || undefined)}
        />
      </div>
      ${this._hint('A URL, or a file in your config’s www folder as /local/…')}
      ${this._selectRow('Fit', im.fit ?? 'cover', [['cover', 'Fill (crop)'], ['contain', 'Fit (whole image)'], ['tile', 'Tile']], (v) => this._put('background.image.fit', v, 'cover'))}
      ${this._slider('background.image.blur', 'Blur', 0, 40, 1, 0)}
      ${this._slider('background.image.darken', 'Darken', 0, 90, 5, 0, (n) => `${n}%`)}
    `;
  }

  private _bgColours(): TemplateResult {
    const own = this._config!.background?.colors ?? {};
    return html`${this._hint('Two colours per state. Unset follows your theme’s heat, cool and fan colours.')}
      ${BG_STATES.map(
        ([k, label], n) => html`<div class="etce-group ${n === 0 ? 'first' : ''}">${label}</div>
          ${this._colorRow(`bg-${k}-main`, 'Main', own[k]?.main, 'Automatic', /^#/.test(BG_PALETTE[k].main) ? BG_PALETTE[k].main : k.includes('cool') ? '#2b9af9' : k === 'fan' ? '#00bfa5' : '#ff8100', (v) =>
            this._put(`background.colors.${k}.main`, v),
          )}
          ${this._colorRow(`bg-${k}-second`, 'Second', own[k]?.second, 'Automatic', BG_PALETTE[k].second, (v) => this._put(`background.colors.${k}.second`, v))}`,
      )}`;
  }

  private _cardBody(): TemplateResult {
    return html`
      ${this._hint('The card’s border, corners and padding. Its fill and moving background are under Background.')}
      ${this._color('card.border_color', 'Border', 'Theme', '#444444')}
      ${this._slider('card.border_width', 'Border width', 0, 8, 1, 1)}
      ${this._slider('card.radius', 'Corner radius', 0, 48, 1, 16)}
      ${this._slider('card.padding', 'Padding', 0, 40, 1, 16)}
    `;
  }
}

if (!customElements.get(EDITOR_TYPE)) customElements.define(EDITOR_TYPE, EasyThermostatStylerCardEditor);
