import type { ButtonStyle, CardConfig, TextRole, TextStyle } from './config';
import { BUTTON_STYLE_KEYS, TEXT_ROLES } from './config';

// Style resolvers. Per-card values are carried as CSS custom properties set on
// the instance (via Lit's styleMap → style.setProperty, so a config string can
// never escape into another property or rule). The stylesheet itself is static
// and identical for every card instance (CARD_DESIGN_SYSTEM §0.9).

export type StyleVars = Record<string, string>;

/** Built-in button look (the "card default" when nothing is set). */
export const BUTTON_DEFAULTS: Required<Pick<ButtonStyle, 'variant' | 'content' | 'icon_position'>> &
  ButtonStyle = {
  variant: 'tonal',
  content: 'icon_label',
  icon_position: 'top',
  radius: 14,
  gap: 8,
  icon_size: 22,
  font_size: 13,
  font_weight: 500,
  border_width: 0,
};

/** THE one button resolver: built-in ← card default ← set override. Both the
 *  renderer and the editor's "Card default" hints call it (§5). */
export function resolveButtonStyle(card: ButtonStyle | undefined, set: ButtonStyle | undefined): ButtonStyle &
  typeof BUTTON_DEFAULTS {
  const out: Record<string, unknown> = { ...BUTTON_DEFAULTS };
  for (const layer of [card, set]) {
    if (!layer) continue;
    for (const k of BUTTON_STYLE_KEYS) {
      const v = layer[k];
      if (v !== undefined && v !== '' && v !== null) out[k] = v;
    }
  }
  return out as unknown as ButtonStyle & typeof BUTTON_DEFAULTS;
}

const px = (n: number | undefined) => (n ? `${n}px` : undefined);

export function buttonVars(style: ButtonStyle): StyleVars {
  const map: Record<string, string | undefined> = {
    '--etc-b-radius': style.radius !== undefined ? `${style.radius}px` : undefined,
    '--etc-b-height': px(style.height),
    '--etc-b-minw': px(style.min_width),
    '--etc-b-gap': style.gap !== undefined ? `${style.gap}px` : undefined,
    '--etc-b-icon': px(style.icon_size),
    '--etc-b-fs': px(style.font_size),
    '--etc-b-fw': style.font_weight ? String(style.font_weight) : undefined,
    '--etc-b-bw': style.border_width !== undefined ? `${style.border_width}px` : undefined,
    '--etc-b-bg': style.background,
    '--etc-b-fg': style.color,
    '--etc-b-bc': style.border_color,
    '--etc-b-abg': style.active_background,
    '--etc-b-afg': style.active_color,
    '--etc-b-abc': style.active_border_color,
  };
  return compact(map);
}

const ROLE_ABBR: Record<TextRole, string> = {
  name: 'name',
  status: 'status',
  current: 'cur',
  unit: 'unit',
  humidity: 'hum',
  pill: 'pill',
  wheel_value: 'wv',
  wheel_neighbor: 'wn',
  bar: 'bar',
};

export function textVars(text: CardConfig['text']): StyleVars {
  const out: Record<string, string | undefined> = {};
  for (const role of TEXT_ROLES) {
    const t: TextStyle | undefined = text?.[role];
    if (!t) continue;
    const p = `--etc-t-${ROLE_ABBR[role]}`;
    out[`${p}-fs`] = px(t.size);
    out[`${p}-fw`] = t.weight ? String(t.weight) : undefined;
    out[`${p}-c`] = t.color;
    out[`${p}-tt`] = t.transform;
    out[`${p}-ls`] = t.letter_spacing !== undefined ? `${t.letter_spacing / 100}em` : undefined;
    out[`${p}-fst`] = t.italic === undefined ? undefined : t.italic ? 'italic' : 'normal';
    out[`${p}-op`] = t.opacity !== undefined ? String(t.opacity / 100) : undefined;
  }
  return compact(out);
}

export function surfaceVars(config: CardConfig): StyleVars {
  const c = config.card ?? {};
  const s = config.setpoint ?? {};
  return compact({
    '--etc-card-bg': c.background,
    '--etc-card-bc': c.border_color,
    '--etc-card-bw': c.border_width !== undefined ? `${c.border_width}px` : undefined,
    '--etc-card-r': c.radius !== undefined ? `${c.radius}px` : undefined,
    '--etc-card-pad': c.padding !== undefined ? `${c.padding}px` : undefined,
    '--etc-scale': s.scale !== undefined ? String(s.scale / 100) : undefined,
  });
}

function compact(map: Record<string, string | undefined>): StyleVars {
  const out: StyleVars = {};
  for (const [k, v] of Object.entries(map)) if (v !== undefined && v !== '') out[k] = v;
  return out;
}
