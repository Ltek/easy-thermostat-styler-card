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
  type ButtonSetConfig,
  type CardConfig,
  type ChipConfig,
  type SetType,
  type TextRole,
  type Zone,
} from '../model/config';
import { availableOptions, defaultMenuDirection, MODE_ICONS, orderOptions, prettify, SET_TITLES } from '../model/sets';
import { resolveButtonStyle, BUTTON_DEFAULTS } from '../model/style';
import { EDITOR_CSS } from './editor-css';
import { toChipView } from '../model/chips';
import { TEMPLATES, applyTemplate, hasTemplateKeys } from '../model/templates';

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

export function colorMode(cur: unknown): 'default' | 'theme' | 'custom' | 'css' {
  const v = cur == null ? '' : String(cur);
  if (v === '') return 'default';
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
  chips: 'mdi:devices',
};

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
    this._config = normalizeConfig(config);
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

  private _toggleOpen(id: string, ev: Event): void {
    const open = (ev.currentTarget as HTMLDetailsElement).open;
    const next = new Set(this._open);
    if (open) next.add(id);
    else next.delete(id);
    this._open = next;
  }

  private _panel(id: string, icon: string, title: string, body: TemplateResult): TemplateResult {
    return html`<details class="etce-sec" ?open=${this._open.has(id)} @toggle=${(e: Event) => this._toggleOpen(id, e)}>
      <summary><ha-icon icon=${icon}></ha-icon>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-body">${this._open.has(id) ? body : nothing}</div>
    </details>`;
  }

  private _sub(id: string, title: string, body: () => TemplateResult): TemplateResult {
    return html`<details class="etce-sub" ?open=${this._open.has(id)} @toggle=${(e: Event) => this._toggleOpen(id, e)}>
      <summary>${title}<ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></summary>
      <div class="etce-sub-body">${this._open.has(id) ? body() : nothing}</div>
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
  private _colorRow(id: string, label: string, cur: string | undefined, defaultLabel: string, seedHex: string, write: (v: string | undefined) => void): TemplateResult {
    const mode = (this._cmode[id] as ReturnType<typeof colorMode>) || colorMode(cur);
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
      else if (m === 'theme') write(THEME_COLORS.some(([v]) => v === cur) ? cur : THEME_COLORS[0]![0]);
      else if (m === 'custom') write(cur && /^#[0-9a-fA-F]{6}$/.test(cur) ? cur : seedHex);
      else this.requestUpdate(); // css: keep the current value, just show the text field
    };
    return html`<div class="etce-row">
      <label class="lbl">${label}</label>
      <div class="etce-color">
        <select class="etce-cmode" @change=${(e: Event) => onMode((e.target as HTMLSelectElement).value)}>
          ${[['default', defaultLabel], ['theme', 'Theme color'], ['custom', 'Custom color'], ['css', 'Custom CSS']].map(
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
      ${this._panel('thermostat', 'mdi:thermostat', 'Thermostat', this._thermostatBody())}
      ${this._panel('templates', 'mdi:palette-outline', 'Quick Preset Templates', this._templatesBody())}
      ${this._panel('setpoint', 'mdi:knob', 'Setpoint control', this._setpointBody())}
      ${this._panel('sets', 'mdi:gesture-tap-button', 'Button sets', this._setsBody())}
      ${this._panel('buttons', 'mdi:palette-swatch-outline', 'Button style', this._buttonsBody())}
      ${this._panel('text', 'mdi:format-text', 'Text', this._textBody())}
      ${this._panel('card', 'mdi:card-outline', 'Card', this._cardBody())}
      <div class="etce-foot">Easy Thermostat Styler Card v${CARD_VERSION}</div>
    </div>`;
  }

  private _thermostatBody(): TemplateResult {
    const c = this._config!;
    return html`
      ${this._hint('The climate entity this card controls, and what the centre of the card shows.')}
      ${this._selector('Entity', { entity: { domain: 'climate' } }, c.entity, (v) => this._put('entity', v || undefined))}
      <div class="etce-row">
        <label class="lbl">Name</label>
        <input
          type="text"
          .value=${c.name ?? ''}
          placeholder="Entity name"
          @change=${(e: Event) => this._put('name', (e.target as HTMLInputElement).value || undefined)}
        />
      </div>
      ${this._group('Show')}
      <div class="etce-checks">
        ${this._bool('show_name', 'Name', DEFAULTS.show_name)} ${this._bool('show_status', 'Status', DEFAULTS.show_status)}
        ${this._bool('show_humidity', 'Humidity', DEFAULTS.show_humidity)}
        ${this._bool('show_current', 'Current temperature', DEFAULTS.show_current)}
        ${this._bool('show_pills', 'Setpoint pills', DEFAULTS.show_pills)}
      </div>
      ${this._group('Layout')}
      ${this._select('core_align', 'Align', [['left', 'Left'], ['center', 'Center'], ['right', 'Right']], DEFAULTS.core_align)}
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
    return html`
      ${this._hint('How you change the target temperature. The wheel scrolls through values; the bar drags heat and cool handles.')}
      ${this._select(
        'setpoint.control',
        'Control',
        [['wheel', 'Wheel'], ['stepper', '− / + stepper'], ['bar', 'Setpoint bar'], ['none', 'None (display only)']],
        DEFAULTS.control,
      )}
      ${control === 'wheel' || control === 'stepper'
        ? html`
            ${this._select('setpoint.position', 'Position', [['left', 'Left'], ['right', 'Right'], ['center', 'Center (below)']], DEFAULTS.position)}
            ${this._slider('setpoint.scale', 'Size', 40, 250, 5, DEFAULTS.scale, (n) => `${n}%`)}
            ${control === 'wheel'
              ? html`${this._slider('setpoint.neighbors', 'Next values shown', 0, 3, 1, DEFAULTS.neighbors, (n) => String(n))}
                ${this._select('setpoint.nudge', '− / + buttons', [['beside', 'Beside'], ['stacked', 'Above & below'], ['hidden', 'Hidden']], DEFAULTS.nudge)}`
              : nothing}
          `
        : nothing}
      ${control === 'bar' ? this._barBody() : nothing}
      ${control !== 'none' ? this._revealBody() : nothing}
      ${this._group('Heat / Cool')}
      ${this._slider('setpoint.min_gap', 'Minimum gap', 0, 10, 0.5, this._defaultGap(), (n) => `${n}°`)}
    `;
  }

  private _revealBody(): TemplateResult {
    const tap = (this._get('setpoint.reveal') ?? DEFAULTS.reveal) === 'tap';
    const secs = (this._get('setpoint.hide_after') as number | undefined) ?? DEFAULTS.hide_after;
    return html`
      ${this._group('Show controls')}
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
            ${this._sliderRow('Close after', secs, 0, 60, 1, this._get('setpoint.hide_after') !== undefined, (v) => this._put('setpoint.hide_after', v, DEFAULTS.hide_after), (n) =>
              n ? `${n}s` : 'Stay open',
            )}
          `
        : nothing}
    `;
  }

  private _defaultGap(): number {
    return (this.hass?.config?.unit_system?.temperature ?? '').includes('C') ? 1.5 : 3;
  }

  private _barBody(): TemplateResult {
    const b = DEFAULTS.bar;
    const look = (this._get('setpoint.bar.look') as string) ?? b.look;
    const stops = (this._get('setpoint.bar.stops') as string[] | undefined) ?? ['#2b9af9', '#7ccf8a', '#ff8100'];
    return html`
      ${this._select(
        'setpoint.bar.position',
        'Position',
        [['below', 'Below (horizontal)'], ['above', 'Above (horizontal)'], ['left', 'Left (vertical)'], ['right', 'Right (vertical)']],
        b.position,
      )}
      ${['left', 'right'].includes(String(this._get('setpoint.bar.position') ?? ''))
        ? this._slider('setpoint.bar.length', 'Height', 100, 400, 10, 200)
        : nothing}
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
      ${this._slider('setpoint.bar.height', 'Thickness', 6, 40, 1, b.height)}
      ${this._select(
        'setpoint.bar.handle_shape',
        'Handle',
        [['round', 'Round'], ['square', 'Square'], ['diamond', 'Diamond'], ['line', 'Line']],
        b.handle_shape,
      )}
      ${this._color('setpoint.bar.handle_color', 'Handle fill', 'White', '#ffffff')}
      ${this._group('Markers')}
      ${this._bool('setpoint.bar.flags', 'Value flags above handles', b.flags)}
      ${this._bool('setpoint.bar.show_current', 'Current temperature marker', b.show_current)}
      ${this._slider('setpoint.bar.ticks', 'Tick every', 0, 10, 0.5, b.ticks, (n) => (n ? `${n}°` : 'Off'))}
      ${this._slider('setpoint.bar.labels', 'Label every', 0, 20, 1, b.labels, (n) => (n ? `${n}°` : 'Off'))}
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

  // ---- button sets --------------------------------------------------------------

  private _setsBody(): TemplateResult {
    const sets = this._sets();
    const entity = this.hass?.states[this._config!.entity];
    const add = (type: SetType) => {
      const next = [...sets, type === 'chips' ? { type, chips: [] } : { type }];
      this._set = next.length - 1;
      this._writeSets(next as ButtonSetConfig[]);
    };
    return html`
      ${this._hint('Groups of buttons. Each set picks its side of the card, its layout, and how it shows: full time, behind a toggle button, or as an expandable menu.')}
      ${this._select('toggles_zone', 'Default location', [['bottom', 'Bottom'], ['top', 'Top'], ['left', 'Left'], ['right', 'Right']], DEFAULTS.toggles_zone)}
      ${this._hint('Where sets go when they have no Side of their own, and where the toggle buttons sit. A set’s own Side always wins.')}
      ${this._bool('compact', 'Compact', false)}
      ${this._hint('Puts every full-time set behind a toggle button, so the card stays small until you open one. Sets shown as expandable menus are already compact and are not changed.')}
      ${this._group('Sets')}
      <div class="etce-addbar">
        ${(['hvac', 'preset', 'fan_mode', 'chips'] as SetType[]).map(
          (t) => html`<button class="etce-add" @click=${() => add(t)}>+ ${SET_TITLES[t]}</button>`,
        )}
      </div>
      <div class="etce-slist">
        ${sets.map((s, i) => {
          const supported = s.type === 'chips' || availableOptions(entity, s.type).length > 0;
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
                <button class="etce-act etce-eye ${s.hidden ? 'off' : ''}" title=${s.hidden ? 'Show' : 'Hide'} @click=${() => this._patchSet(i, 'hidden', !s.hidden, false)}>
                  <ha-icon icon=${s.hidden ? 'mdi:eye-off-outline' : 'mdi:eye-outline'}></ha-icon>
                </button>
                <button class="etce-act del" title="Delete" @click=${() => this._deleteSet(i)}>
                  <ha-icon icon="mdi:trash-can-outline"></ha-icon>
                </button>
              </div>
            </div>
            ${open ? html`<div class="etce-sedit">${this._setEditor(s, i)}</div>` : nothing}`;
        })}
      </div>
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

  private _moveSet(i: number, d: number): void {
    const sets = this._sets();
    const j = i + d;
    if (j < 0 || j >= sets.length) return;
    [sets[i], sets[j]] = [sets[j]!, sets[i]!];
    if (this._set === i) this._set = j;
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
      ${this._group('Placement')}
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
      ${this._group('Display')}
      ${this._selectRow(
        'Show',
        s.display ?? 'always',
        [['always', 'Full time'], ['toggle', 'Behind a toggle button'], ...(s.type === 'chips' ? [] : [['menu', 'Expandable menu'] as Opt])],
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
          ${this._check('Show the set name on the button', s.menu_show_name ?? true, (v) => put('menu_show_name', v, true))}`
        : nothing}
      ${(s.display ?? 'always') === 'toggle' || (this._config!.compact && s.display !== 'menu')
        ? this._selector('Toggle icon', { icon: {} }, s.toggle_icon, (v) => put('toggle_icon', v || undefined))
        : nothing}
      ${s.type === 'chips'
        ? this._sub(`set-${i}-chips`, 'Chips', () => this._chipsEditor(s, i))
        : this._sub(`set-${i}-options`, 'Buttons in this set', () => this._optionsEditor(s, i))}
      ${this._sub(`set-${i}-style`, 'Button style for this set', () => this._buttonStyleEditor(`sets.${i}.style`, true, i))}
    `;
  }

  private _optionsEditor(s: ButtonSetConfig, i: number): TemplateResult {
    const entity = this.hass?.states[this._config!.entity];
    const values = orderOptions(availableOptions(entity, s.type), s.order);
    if (!values.length) return this._hint('This entity has no options for this set.');
    const move = (k: number, d: number) => {
      const next = [...values];
      const j = k + d;
      if (j < 0 || j >= next.length) return;
      [next[k], next[j]] = [next[j]!, next[k]!];
      this._patchSet(i, 'order', next);
    };
    return html`${this._hint('Order, hide, rename and re-icon each button.')}
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
                </div>`
              : nothing}`;
        })}
      </div>`;
  }

  private _chipsEditor(s: ButtonSetConfig, i: number): TemplateResult {
    const chips = s.chips ?? [];
    const write = (next: ChipConfig[]) => this._patchSet(i, 'chips', next.length ? next : undefined);
    const addChip = (type: ChipConfig['type']) => {
      const ent = type === 'rf_fan' ? (this._firstRfFan() ?? '') : '';
      this._chip = `chip:${i}:${chips.length}`;
      // A chip needs an entity before it is stored (normalize drops empty ones),
      // so seed with the first match; the user picks the right one below.
      const fallback = ent || Object.keys(this.hass?.states ?? {}).find((id) => id.startsWith(type === 'rf_fan' ? 'fan.' : 'sensor.')) || '';
      if (!fallback) return;
      write([...chips, { type, entity: fallback }]);
    };
    return html`
      ${this._hint('Status chips for linked devices. RF fan chips find the fan’s light and sleep timer automatically. Tap opens the fan card in a pop-up; hold toggles.')}
      <div class="etce-addbar">
        <button class="etce-add" @click=${() => addChip('rf_fan')}>+ RF fan</button>
        <button class="etce-add" @click=${() => addChip('entity')}>+ Entity</button>
      </div>
      <div class="etce-blist">
        ${chips.map((ch, k) => {
          const id = `chip:${i}:${k}`;
          const open = this._chip === id;
          const st = this.hass?.states[ch.entity];
          const nm = ch.name ?? (st?.attributes.friendly_name as string | undefined) ?? ch.entity;
          const upd = (path: string, v: unknown, def?: unknown) => {
            const next = [...chips];
            next[k] = setPath(next[k] as unknown as Record<string, unknown>, path, v === def ? undefined : v) as unknown as ChipConfig;
            next[k] = { ...next[k]!, type: ch.type, entity: next[k]!.entity || ch.entity };
            write(next);
          };
          const move = (d: number) => {
            const next = [...chips];
            const j = k + d;
            if (j < 0 || j >= next.length) return;
            [next[k], next[j]] = [next[j]!, next[k]!];
            write(next);
          };
          return html`<div class="etce-brow">
              <ha-icon class="etce-sicon" icon=${ch.icon ?? (ch.type === 'rf_fan' ? 'mdi:ceiling-fan' : 'mdi:shape-outline')}></ha-icon>
              <span class="etce-sname" @click=${() => (this._chip = open ? null : id)}>${nm}</span>
              <span class="etce-stag">${ch.type === 'rf_fan' ? 'RF fan' : 'Entity'}</span>
              <div class="etce-sctl">
                <button class="etce-act" @click=${() => (this._chip = open ? null : id)}><ha-icon icon="mdi:pencil"></ha-icon></button>
                <button class="etce-act" ?disabled=${k === 0} @click=${() => move(-1)}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
                <button class="etce-act" ?disabled=${k === chips.length - 1} @click=${() => move(1)}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
                <button class="etce-act del" @click=${() => write(chips.filter((_, x) => x !== k))}><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>
              </div>
            </div>
            ${open
              ? html`<div class="etce-sedit">
                  ${this._selector('Entity', { entity: ch.type === 'rf_fan' ? { domain: 'fan' } : {} }, ch.entity, (v) => v && upd('entity', v))}
                  <div class="etce-row">
                    <label class="lbl">Name</label>
                    <input type="text" .value=${ch.name ?? ''} placeholder="Entity name" @change=${(e: Event) => upd('name', (e.target as HTMLInputElement).value || undefined)} />
                  </div>
                  ${this._selector('Icon', { icon: {} }, ch.icon, (v) => upd('icon', v || undefined))}
                  <div class="etce-checks">
                    ${this._check('Show name', ch.show_name ?? true, (v) => upd('show_name', v, true))}
                    ${this._check('Show state', ch.show_state ?? true, (v) => upd('show_state', v, true))}
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
                    ? html`${this._hint(
                        ch.type === 'rf_fan'
                          ? 'Pop-up card. Empty = the RF Fan card (custom:rf-fan-ltek) for this fan.'
                          : 'Pop-up card config (any card).',
                      )}
                      ${this._selector('', { object: {} }, ch.popup_card, (v) => upd('popup_card', v && Object.keys(v as object).length ? v : undefined))}`
                    : nothing}
                </div>`
              : nothing}`;
        })}
      </div>
    `;
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
    return html`${this._hint('The look of every button. Each button set can override any of these under “Button style for this set”.')}
      ${this._buttonStyleEditor('buttons', false)}`;
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
    const sl = (k: keyof typeof cur, label: string, min: number, max: number) => {
      const inh = Number((inherited as unknown as Record<string, unknown>)[k] ?? 0);
      const v = cur[k] as number | undefined;
      return this._sliderRow(label, v ?? inh, min, max, 1, v !== undefined, (n) => put(k, n));
    };
    const col = (k: keyof typeof cur, label: string, seed: string) =>
      this._colorRow(`${base}.${k}`, label, cur[k] as string | undefined, isSet ? 'Card default' : 'Automatic', seed, (v) => put(k, v));
    return html`
      ${this._group('Shape', true)}
      ${sel('variant', 'Style', [['tonal', 'Tonal (tinted)'], ['filled', 'Filled'], ['outlined', 'Outlined'], ['ghost', 'Ghost']])}
      ${sl('radius', 'Corner radius', 0, 40)} ${sl('height', 'Min height', 0, 120)} ${sl('min_width', 'Min width', 0, 200)}
      ${sl('gap', 'Spacing', 0, 32)} ${sl('border_width', 'Border width', 0, 6)}
      ${this._group('Content')}
      ${sel('content', 'Show', [['icon_label', 'Icon and label'], ['icon', 'Icon only'], ['label', 'Label only']])}
      ${sel('icon_position', 'Icon', [['top', 'Above label'], ['left', 'Left of label']])}
      ${sl('icon_size', 'Icon size', 10, 48)} ${sl('font_size', 'Text size', 8, 28)}
      ${sel('font_weight' as keyof typeof cur, 'Text weight', [['300', 'Light'], ['400', 'Regular'], ['500', 'Medium'], ['600', 'Semibold'], ['700', 'Bold']])}
      ${this._group('Colors — inactive')}
      ${col('background', 'Background', '#2a2a2a')} ${col('color', 'Text & icon', '#cccccc')} ${col('border_color', 'Border', '#555555')}
      ${this._group('Colors — active')}
      ${this._hint('Unset = the mode’s own color (heat orange, cool blue…), or the theme primary for presets and fan.')}
      ${col('active_background', 'Background', '#ff8100')} ${col('active_color', 'Text & icon', '#ffffff')}
      ${col('active_border_color', 'Border', '#ff8100')}
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

  private _cardBody(): TemplateResult {
    return html`
      ${this._hint('The card’s own surface.')}
      ${this._color('card.background', 'Background', 'Theme card', '#1c1c1c')}
      ${this._color('card.border_color', 'Border', 'Theme', '#444444')}
      ${this._slider('card.border_width', 'Border width', 0, 8, 1, 1)}
      ${this._slider('card.radius', 'Corner radius', 0, 48, 1, 16)}
      ${this._slider('card.padding', 'Padding', 0, 40, 1, 16)}
      ${this._bool('card.glow', 'Glow while heating or cooling', DEFAULTS.glow)}
    `;
  }
}

if (!customElements.get(EDITOR_TYPE)) customElements.define(EDITOR_TYPE, EasyThermostatStylerCardEditor);
