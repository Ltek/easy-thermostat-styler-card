import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import type { CardConfig } from '../model/config';
import { BG_DEFAULTS, bgItems, type BgView } from '../model/background';

// The card's background layers, all behind the content (.grid):
//   .bg-base   image (+ darken)       — full strength, not state-driven
//   .bg        the moving style       — state colours, direction, speed
//   .bg-finish scrim, vignette, grain — readability on top of both

const sparkles = Array.from({ length: 14 }, (_, i) => ({
  x: (i * 37 + 11) % 92 + 4,
  y: (i * 53 + 7) % 86 + 6,
  d: 3 + ((i * 7) % 5),
  dl: -((i * 1.3) % 5),
}));

function columns(bv: BgView, quality: 'smooth' | 'light', unit: '%' | 'px'): TemplateResult {
  return html`<div class="lay">
    ${bgItems(bv.style, quality).map(
      (it) =>
        html`<i
          class="col"
          style=${styleMap({ '--x': `${it.x}%`, '--sz': `${it.s}${unit}`, '--d': `${it.d}s`, '--dl': `${it.dl}s` })}
          ><b></b
        ></i>`,
    )}
  </div>`;
}

function body(bv: BgView, quality: 'smooth' | 'light'): TemplateResult {
  switch (bv.style) {
    case 'plasma':
      return columns(bv, quality, '%');
    case 'lava':
      return html`<svg class="defs" width="0" height="0" aria-hidden="true">
          <filter id="etc-goo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" />
          </filter>
        </svg>
        ${columns(bv, quality, '%')}`;
    case 'shimmer':
      return html`${columns(bv, quality, '%')}
        <div class="spark">
          ${sparkles.map(
            (s) => html`<i style=${styleMap({ left: `${s.x}%`, top: `${s.y}%`, '--d': `${s.d}s`, '--dl': `${s.dl}s` })}></i>`,
          )}
        </div>`;
    case 'particles':
      return columns(bv, quality, 'px');
    case 'aurora':
      return html`${bgItems('aurora', quality).map(
        (it) =>
          html`<i
            class="rib"
            style=${styleMap({ '--y': `${it.y}%`, '--h': `${it.s}%`, '--d': `${it.d}s`, '--dl': `${it.dl}s` })}
          ></i>`,
      )}`;
    case 'flow':
      return html`<i class="band b1"></i><i class="band b2"></i>`;
    case 'core':
      return html`<i class="c1"></i><i class="c2"></i>`;
    case 'mesh':
      return html`<div class="lay">
        <i class="m m1"><b></b></i><i class="m m2"><b></b></i><i class="m m3"><b></b></i><i class="m m4"><b></b></i>
      </div>`;
    case 'beam':
      return html`<div class="beam"><i class="r1"></i><i class="r2"></i><i class="r3"></i></div>`;
  }
}

export function renderBackground(config: CardConfig, bv: BgView | null): TemplateResult {
  const b = config.background ?? {};
  const quality = b.quality ?? BG_DEFAULTS.quality;
  const image =
    b.fill === 'image' && b.image?.url
      ? html`<div class="bg-base" aria-hidden="true">
          <div class="bg-img fit-${b.image.fit ?? 'cover'}"></div>
          ${b.image.darken ? html`<div class="bg-dark"></div>` : nothing}
        </div>`
      : nothing;
  const layer = bv
    ? html`<div class="bg s-${bv.style} st-${bv.state} dir-${bv.dir} q-${quality}" aria-hidden="true">
        ${body(bv, quality)}${bv.blades ? html`<i class="blades"></i>` : nothing}
      </div>`
    : nothing;
  const finish =
    b.scrim || b.vignette || b.grain
      ? html`<div class="bg-finish" aria-hidden="true">
          ${b.scrim ? html`<i class="scrim"></i>` : nothing} ${b.vignette ? html`<i class="vig"></i>` : nothing}
          ${b.grain ? html`<i class="grain"></i>` : nothing}
        </div>`
      : nothing;
  return html`${image}${layer}${finish}`;
}
