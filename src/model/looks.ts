import type { CardConfig } from './config';

// Built-in looks: one-click starting points. Applying a look REPLACES the
// card's style keys (buttons, text, card, compact and the show_* switches) with
// the look's values and leaves entity, button sets and setpoint control alone.
// Nothing records which look was applied — the result is ordinary config the
// user keeps tweaking (CARD_DESIGN_SYSTEM §6: no default pointer).

export const LOOK_KEYS = [
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
] as const;

export interface Look {
  id: string;
  name: string;
  hint: string;
  icon: string;
  values: Partial<Pick<CardConfig, (typeof LOOK_KEYS)[number]>>;
}

export const LOOKS: Look[] = [
  {
    id: 'modern',
    name: 'Modern',
    hint: 'Tinted buttons, big light number (the built-in look).',
    icon: 'mdi:thermostat',
    values: {},
  },
  {
    id: 'solid',
    name: 'Solid',
    hint: 'Filled active buttons, firmer type.',
    icon: 'mdi:square-rounded',
    values: {
      buttons: { variant: 'filled', radius: 10, font_weight: 600 },
      text: { current: { weight: 300 }, name: { weight: 600 } },
    },
  },
  {
    id: 'outline',
    name: 'Outline',
    hint: 'Pill outlines, thin numerals.',
    icon: 'mdi:rounded-corner',
    values: {
      buttons: { variant: 'outlined', radius: 999, icon_position: 'left', height: 40 },
      text: { current: { weight: 100 }, status: { letter_spacing: 12 } },
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    hint: 'Smaller number, icon-only buttons, every set behind a toggle.',
    icon: 'mdi:arrow-collapse-vertical',
    values: {
      compact: true,
      show_status: false,
      buttons: { content: 'icon', radius: 12, height: 40, icon_size: 20 },
      text: { current: { size: 48 }, pill: { size: 16 } },
      card: { padding: 12 },
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    hint: 'Just the temperature and controls. No glow, no pills.',
    icon: 'mdi:minus-box-outline',
    values: {
      show_status: false,
      show_humidity: false,
      show_pills: false,
      buttons: { variant: 'ghost', content: 'icon' },
      text: { current: { size: 60, weight: 200 } },
      card: { glow: false },
    },
  },
];

/** True when the card has any style key a look would replace. */
export function hasLookKeys(config: CardConfig): boolean {
  return LOOK_KEYS.some((k) => config[k] !== undefined);
}

export function applyLook(config: CardConfig, look: Look): CardConfig {
  const out: Record<string, unknown> = { ...config };
  for (const k of LOOK_KEYS) delete out[k];
  return { ...(out as CardConfig), ...structuredClone(look.values) };
}
