import type { ButtonSetConfig, CardConfig, SetType } from './config';

// Quick Preset Templates: one-click starting points that each combine a
// different setpoint control, button style and layout. Applying one replaces
// the card's look AND layout; the user's own data survives:
//   - device chip sets (kept as they are),
//   - per-button customizations of a set type (order, hidden, names, icons),
//   - Heat/Cool minimum gap and the bar's temperature range.
// Nothing records which template was applied — the result is ordinary config
// the user keeps editing (CARD_DESIGN_SYSTEM §6: no default pointer).

export const TEMPLATE_KEYS = [
  'buttons',
  'text',
  'card',
  'compact',
  'show_name',
  'show_status',
  'show_humidity',
  'show_pills',
  'show_current',
  'core_align',
  'toggles_zone',
  'setpoint',
  'sets',
] as const;

type TemplateValues = Partial<Pick<CardConfig, (typeof TEMPLATE_KEYS)[number]>>;

export interface Template {
  id: string;
  name: string;
  hint: string;
  icon: string;
  /** Short "what it uses" tags for the editor list. */
  tags: string[];
  values: TemplateValues;
}

const hvac = (extra: Partial<ButtonSetConfig> = {}): ButtonSetConfig => ({ type: 'hvac', ...extra });
const preset = (extra: Partial<ButtonSetConfig> = {}): ButtonSetConfig => ({ type: 'preset', ...extra });
const fan = (extra: Partial<ButtonSetConfig> = {}): ButtonSetConfig => ({ type: 'fan_mode', ...extra });

export const TEMPLATES: Template[] = [
  {
    id: 'ecosee',
    name: 'Ecosee',
    hint: 'The built-in look: big light number, scroll wheel on the right, tinted mode buttons.',
    icon: 'mdi:thermostat',
    tags: ['wheel', 'tonal', 'presets behind toggles'],
    values: { sets: [hvac(), preset({ display: 'toggle' }), fan({ display: 'toggle' })] },
  },
  {
    id: 'mission',
    name: 'Mission Control',
    hint: 'Setpoint bar with flags and ticks under the number. Round icon-only modes up top, preset and fan as menus below.',
    icon: 'mdi:tune-variant',
    tags: ['bar', 'filled icons', 'menus'],
    values: {
      setpoint: { control: 'bar', bar: { position: 'below', look: 'zones', flags: true, ticks: 1, labels: 5, height: 12 } },
      buttons: { variant: 'filled', content: 'icon', radius: 999, height: 44, min_width: 44 },
      text: { current: { size: 64, weight: 200 }, status: { letter_spacing: 10 } },
      sets: [
        hvac({ zone: 'top', align: 'center' }),
        preset({ display: 'menu', zone: 'bottom' }),
        fan({ display: 'menu', zone: 'bottom' }),
      ],
    },
  },
  {
    id: 'tap',
    name: 'Tap & Go',
    hint: 'Calm until you need it: tap the temperature or a pill and the wheel takes the number’s place, then folds away after 6 s.',
    icon: 'mdi:gesture-tap',
    tags: ['tap to reveal', 'wheel in place', 'ghost'],
    values: {
      setpoint: { control: 'wheel', reveal: 'tap', reveal_from: 'both', collapsed: 'hidden', open_in: 'current', hide_after: 6, neighbors: 2, scale: 120 },
      buttons: { variant: 'ghost', content: 'icon', icon_size: 26 },
      text: { current: { size: 96, weight: 100 } },
      sets: [hvac({ zone: 'top', align: 'center' }), preset({ display: 'toggle' }), fan({ display: 'toggle' })],
    },
  },
  {
    id: 'slim',
    name: 'Slim Strip',
    hint: 'One short row: name and number on the left, a small stepper on the right, every set as a menu.',
    icon: 'mdi:view-sequential-outline',
    tags: ['stepper', 'menus', 'left aligned'],
    values: {
      core_align: 'left',
      show_status: false,
      show_humidity: false,
      show_pills: false,
      setpoint: { control: 'stepper', position: 'right', scale: 70 },
      buttons: { radius: 10 },
      text: { current: { size: 44, weight: 300 }, name: { size: 14 } },
      card: { padding: 10, glow: false },
      sets: [
        hvac({ display: 'menu', menu_show_name: false }),
        preset({ display: 'menu', menu_show_name: false }),
        fan({ display: 'menu', menu_show_name: false }),
      ],
    },
  },
  {
    id: 'rail',
    name: 'Side Rail',
    hint: 'Modes stacked down the left as outlined circles, a vertical setpoint bar on the right, preset and fan menus below.',
    icon: 'mdi:dock-left',
    tags: ['vertical bar', 'outlined', 'left rail'],
    values: {
      setpoint: { control: 'bar', bar: { position: 'right', length: 210, labels: 5, ticks: 1, handle_shape: 'square' } },
      buttons: { variant: 'outlined', content: 'icon', radius: 999, height: 46, min_width: 46 },
      text: { current: { size: 80, weight: 200 } },
      sets: [hvac({ zone: 'left' }), preset({ display: 'menu', zone: 'bottom' }), fan({ display: 'menu', zone: 'bottom' })],
    },
  },
  {
    id: 'wall',
    name: 'Wall Tablet',
    hint: 'Big and finger-friendly: huge number, large wheel under it with three next values, chunky filled mode tiles.',
    icon: 'mdi:tablet',
    tags: ['big wheel', 'filled tiles', 'presets full time'],
    values: {
      setpoint: { control: 'wheel', position: 'center', scale: 150, neighbors: 3, nudge: 'beside' },
      buttons: { variant: 'filled', height: 76, icon_size: 30, font_size: 15, radius: 20 },
      text: { current: { size: 120, weight: 100 }, name: { size: 20 } },
      card: { padding: 24 },
      sets: [hvac(), preset({ columns: 4 }), fan({ display: 'toggle' })],
    },
  },
  {
    id: 'glass',
    name: 'Minimal Glass',
    hint: 'No card background or border, no labels: just the number, a stepper and text-only mode buttons.',
    icon: 'mdi:circle-opacity',
    tags: ['stepper', 'ghost text', 'no background'],
    values: {
      show_name: false,
      show_status: false,
      show_humidity: false,
      show_pills: false,
      setpoint: { control: 'stepper', position: 'center', scale: 90 },
      buttons: { variant: 'ghost', content: 'label', font_size: 14, font_weight: 600 },
      text: { current: { size: 76, weight: 100 } },
      card: { background: 'transparent', border_width: 0, glow: false },
      sets: [hvac({ align: 'center' })],
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    hint: 'A cyan-to-pink gradient bar above the number with diamond handles, square filled buttons and an accent border.',
    icon: 'mdi:led-strip-variant',
    tags: ['gradient bar above', 'square filled', 'accent border'],
    values: {
      setpoint: {
        control: 'bar',
        bar: { position: 'above', look: 'gradient', stops: ['#00e5ff', '#7c4dff', '#ff4081'], handle_shape: 'diamond', ticks: 2, labels: 10, height: 10 },
      },
      buttons: { variant: 'filled', radius: 4, border_width: 1, height: 58 },
      text: {
        name: { transform: 'uppercase', letter_spacing: 15, size: 13 },
        current: { weight: 300, color: 'var(--primary-color)' },
      },
      card: { border_color: 'var(--primary-color)', border_width: 2, radius: 6 },
      sets: [hvac(), preset({ display: 'menu' }), fan({ display: 'menu' })],
    },
  },
  {
    id: 'pocket',
    name: 'Pocket',
    hint: 'Phone-sized: small number, tiny stepper on the left, everything else behind round toggles along the top.',
    icon: 'mdi:cellphone',
    tags: ['compact', 'small stepper', 'toggles on top'],
    values: {
      compact: true,
      toggles_zone: 'top',
      show_humidity: false,
      setpoint: { control: 'stepper', position: 'left', scale: 60 },
      buttons: { content: 'icon', radius: 999, height: 38, min_width: 38, icon_size: 20 },
      text: { current: { size: 40, weight: 300 }, pill: { size: 15 } },
      card: { padding: 10 },
      sets: [hvac(), preset(), fan()],
    },
  },
];

/** True when the card has any key a template would replace. */
export function hasTemplateKeys(config: CardConfig): boolean {
  return TEMPLATE_KEYS.some((k) => config[k] !== undefined);
}

const KEEP_SET_KEYS: (keyof ButtonSetConfig)[] = ['order', 'options', 'name', 'toggle_icon'];

function mergeSets(user: ButtonSetConfig[] | undefined, tpl: ButtonSetConfig[]): ButtonSetConfig[] {
  const mine = user ?? [];
  const used = new Set<number>();
  const out = tpl.map((t) => {
    const i = mine.findIndex((s, k) => !used.has(k) && s.type === t.type);
    if (i < 0) return structuredClone(t);
    used.add(i);
    const keep: Partial<ButtonSetConfig> = {};
    for (const k of KEEP_SET_KEYS) if (mine[i]![k] !== undefined) (keep as Record<string, unknown>)[k] = structuredClone(mine[i]![k]);
    return { ...structuredClone(t), ...keep };
  });
  // Device chips are the user's data, not part of a look: keep them, first.
  const chips = mine.filter((s, k) => s.type === ('chips' as SetType) && !used.has(k));
  return [...structuredClone(chips), ...out];
}

export function applyTemplate(config: CardConfig, tpl: Template): CardConfig {
  const out: Record<string, unknown> = { ...config };
  for (const k of TEMPLATE_KEYS) delete out[k];
  const v = structuredClone(tpl.values);
  // Keep what describes the user's equipment, not the look.
  const old = config.setpoint ?? {};
  if (old.min_gap !== undefined || old.bar?.range_min !== undefined || old.bar?.range_max !== undefined) {
    const sp = { ...(v.setpoint ?? {}) };
    if (old.min_gap !== undefined) sp.min_gap = old.min_gap;
    if (old.bar?.range_min !== undefined || old.bar?.range_max !== undefined) {
      sp.bar = { ...(sp.bar ?? {}) };
      if (old.bar?.range_min !== undefined) sp.bar.range_min = old.bar.range_min;
      if (old.bar?.range_max !== undefined) sp.bar.range_max = old.bar.range_max;
    }
    v.setpoint = sp;
  }
  if (v.sets) v.sets = mergeSets(config.sets, v.sets);
  else if (config.sets) v.sets = config.sets;
  return { ...(out as CardConfig), ...v };
}
