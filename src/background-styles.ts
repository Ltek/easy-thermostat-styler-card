import { css } from 'lit';

// Moving backgrounds (components/background.ts). Static stylesheet; colours,
// opacity and speed arrive as --etc-bg-a / --etc-bg-b / --etc-bg-op / --bg-rate.
// Animation moves only transform and opacity; blurs are fixed (never animated).
// Every duration is divided by --bg-rate, so one number speeds the whole style.

// Registered so a state change cross-fades the colours instead of snapping.
const reg = (globalThis as { CSS?: { registerProperty?: (d: object) => void } }).CSS;
for (const [name, syntax, initialValue] of [
  ['--etc-bg-a', '<color>', 'transparent'],
  ['--etc-bg-b', '<color>', 'transparent'],
  ['--etc-bg-op', '<number>', '1'],
]) {
  try {
    reg?.registerProperty?.({ name, syntax, inherits: true, initialValue });
  } catch {
    /* already registered (another copy of the card) or unsupported */
  }
}

export const backgroundStyles = css`
  ha-card {
    transition:
      box-shadow 600ms ease,
      --etc-bg-a 1.5s ease,
      --etc-bg-b 1.5s ease,
      --etc-bg-op 1.5s ease;
  }
  .grid { position: relative; z-index: 1; }
  .bg-base, .bg, .bg-finish {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .bg { opacity: var(--etc-bg-op, 1); }
  .bg i, .bg b, .bg .lay, .bg .beam, .bg .spark, .bg-finish i { position: absolute; display: block; }
  .bg .defs { position: absolute; width: 0; height: 0; }
  ha-card.bg-paused .bg, ha-card.bg-paused .bg * { animation-play-state: paused !important; }

  /* ---- base image ---- */
  .bg-img {
    position: absolute;
    inset: calc(var(--bg-img-blur, 0px) * -2);
    background-image: var(--bg-img);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(var(--bg-img-blur, 0px));
  }
  .bg-img.fit-contain { background-size: contain; }
  .bg-img.fit-tile { background-size: auto; background-repeat: repeat; }
  .bg-dark { position: absolute; inset: 0; background: #000; opacity: var(--bg-img-dark, 0); }

  /* ---- finish ---- */
  .bg-finish .scrim { inset: 0; background: var(--bg-scrim-c, #000); opacity: var(--bg-scrim, 0); }
  .bg-finish .vig { inset: 0; background: radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0, 0, 0, 0.85) 100%); opacity: var(--bg-vig, 0); }
  .bg-finish .grain {
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity: var(--bg-grain, 0);
    mix-blend-mode: overlay;
  }

  /* ---- shared motion ---- */
  @keyframes bg-rise { from { transform: translateY(var(--travel, 80%)); } to { transform: translateY(calc(var(--travel, 80%) * -1)); } }
  @keyframes bg-fall { from { transform: translateY(calc(var(--travel, 80%) * -1)); } to { transform: translateY(var(--travel, 80%)); } }
  @keyframes bg-spin { to { transform: rotate(360deg); } }
  @keyframes bg-bob { from { transform: translate(-3%, 3%); } to { transform: translate(3%, -3%); } }

  /* Columns: a full-card wrapper that travels; the blob inside sits at --x. */
  .bg .lay { inset: 0; }
  .bg .col {
    inset: 0;
    animation-duration: calc(var(--d, 20s) / var(--bg-rate, 1));
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .bg .col > b { left: var(--x); top: 50%; width: var(--sz); aspect-ratio: 1; transform: translate(-50%, -50%); border-radius: 50%; }
  .bg.dir-up .col { animation-name: bg-rise; }
  .bg.dir-down .col { animation-name: bg-fall; }
  .bg.dir-swirl .col { animation-name: bg-spin; animation-duration: calc(var(--d, 20s) * 0.45 / var(--bg-rate, 1)); }
  .bg.dir-still .col { animation-name: bg-bob; animation-timing-function: ease-in-out; animation-direction: alternate; }

  /* ---- Liquid Plasma ---- */
  .s-plasma { --travel: 115%; }
  .s-plasma .lay { filter: blur(calc(30px * var(--bg-blur-k, 1))); }
  .s-plasma .col > b {
    background: radial-gradient(circle at 40% 40%, var(--etc-bg-a), color-mix(in srgb, var(--etc-bg-b) 80%, transparent) 55%, transparent 70%);
    mix-blend-mode: screen;
  }
  .s-plasma::before, .s-particles::before, .s-shimmer::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 115%, color-mix(in srgb, var(--etc-bg-b) 45%, transparent), transparent 70%);
  }
  .bg.dir-down.s-plasma::before, .bg.dir-down.s-particles::before, .bg.dir-down.s-shimmer::before {
    background: radial-gradient(ellipse at 50% -15%, color-mix(in srgb, var(--etc-bg-b) 45%, transparent), transparent 70%);
  }

  /* ---- Lava Lamp (SVG goo: blobs merge and split) ---- */
  .s-lava { --travel: 95%; }
  .s-lava .lay { filter: url(#etc-goo); }
  .s-lava .col > b {
    background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--etc-bg-a) 65%, #fff), var(--etc-bg-a) 40%, var(--etc-bg-b));
    animation: bg-squish calc(var(--d, 20s) * 0.3 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  @keyframes bg-squish { from { transform: translate(-50%, -50%) scale(1, 1); } to { transform: translate(-50%, -50%) scale(0.86, 1.16); } }
  .s-lava .lay::after {
    content: '';
    position: absolute;
    left: -10%;
    right: -10%;
    bottom: -16%;
    height: 28%;
    border-radius: 50%;
    background: linear-gradient(var(--etc-bg-a), var(--etc-bg-b));
  }
  .bg.dir-down.s-lava .lay::after { bottom: auto; top: -16%; }
  .bg.dir-swirl.s-lava .lay::after, .bg.dir-still.s-lava .lay::after { height: 18%; }

  /* ---- Aurora ---- */
  .s-aurora .rib {
    left: -50%;
    width: 200%;
    top: var(--y);
    height: var(--h, 34%);
    border-radius: 50%;
    background: linear-gradient(90deg, transparent 5%, var(--etc-bg-a) 30%, var(--etc-bg-b) 50%, var(--etc-bg-a) 70%, transparent 95%);
    filter: blur(calc(28px * var(--bg-blur-k, 1)));
    opacity: 0.85;
    mix-blend-mode: screen;
    animation: bg-aur-up calc(var(--d, 18s) / var(--bg-rate, 1)) ease-in-out infinite alternate;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  .bg.dir-down.s-aurora .rib { animation-name: bg-aur-down; }
  .bg.dir-still.s-aurora .rib { animation-name: bg-aur-still; }
  .bg.dir-swirl.s-aurora .rib {
    top: calc(50% - var(--h, 34%) / 2);
    animation: bg-spin calc(var(--d, 18s) * 0.6 / var(--bg-rate, 1)) linear infinite;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  @keyframes bg-aur-up { from { transform: translate(-14%, 60%) rotate(-4deg) scaleY(0.8); } to { transform: translate(14%, -60%) rotate(-12deg) scaleY(1.2); } }
  @keyframes bg-aur-down { from { transform: translate(-14%, -60%) rotate(4deg) scaleY(0.8); } to { transform: translate(14%, 60%) rotate(12deg) scaleY(1.2); } }
  @keyframes bg-aur-still { from { transform: translateX(-6%); } to { transform: translateX(6%); } }

  /* ---- Thermal Flow ---- */
  .s-flow .band {
    left: -15%;
    right: -15%;
    top: -100%;
    height: 300%;
    background: linear-gradient(to top, transparent 0%, var(--etc-bg-a) 22%, var(--etc-bg-b) 40%, transparent 62%, transparent 100%);
    background-size: 100% 33.333%;
    filter: blur(calc(26px * var(--bg-blur-k, 1)));
    animation: bg-flow-up calc(14s / var(--bg-rate, 1)) linear infinite;
  }
  .s-flow .b2 { opacity: 0.5; animation-duration: calc(23s / var(--bg-rate, 1)); animation-delay: calc(-7s / var(--bg-rate, 1)); }
  .bg.dir-down.s-flow .band { animation-name: bg-flow-down; }
  .bg.dir-swirl.s-flow .band { animation-name: bg-spin; }
  .bg.dir-still.s-flow .band { animation-duration: calc(60s / var(--bg-rate, 1)); }
  @keyframes bg-flow-up { from { transform: translateY(0); } to { transform: translateY(-33.333%); } }
  @keyframes bg-flow-down { from { transform: translateY(-33.333%); } to { transform: translateY(0); } }

  /* ---- Heat Shimmer / Frost ---- */
  .s-shimmer { --travel: 75%; }
  .s-shimmer .lay, .s-particles .lay {
    -webkit-mask-image: linear-gradient(to top, transparent, #000 22%, #000 72%, transparent);
    mask-image: linear-gradient(to top, transparent, #000 22%, #000 72%, transparent);
  }
  .s-shimmer .col > b {
    height: calc(var(--sz) * 0.35);
    aspect-ratio: auto;
    background: radial-gradient(ellipse, color-mix(in srgb, var(--etc-bg-a) 85%, transparent), transparent 70%);
    filter: blur(calc(14px * var(--bg-blur-k, 1)));
    animation: bg-waver calc(var(--d, 12s) * 0.37 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .bg.dir-down.s-shimmer .col > b { background: radial-gradient(ellipse, color-mix(in srgb, var(--etc-bg-a) 55%, #fff 15%), transparent 70%); }
  @keyframes bg-waver { from { transform: translate(-50%, -50%) scaleX(0.85) skewX(-8deg); } to { transform: translate(-50%, -50%) scaleX(1.15) skewX(8deg); } }
  .s-shimmer .spark { inset: 0; display: none; }
  .bg.dir-down.s-shimmer .spark { display: block; }
  .s-shimmer .spark i {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 6px var(--etc-bg-a);
    opacity: 0;
    animation: bg-twinkle calc(var(--d, 4s) / var(--bg-rate, 1)) ease-in-out infinite;
    animation-delay: calc(var(--dl, 0s) / var(--bg-rate, 1));
  }
  @keyframes bg-twinkle { 0%, 100% { opacity: 0; transform: scale(0.6); } 50% { opacity: 0.9; transform: scale(1.2); } }

  /* ---- Embers / Snow ---- */
  .s-particles { --travel: 58%; }
  .s-particles .col > b {
    background: radial-gradient(circle, color-mix(in srgb, var(--etc-bg-a) 40%, #fff) 0%, var(--etc-bg-a) 45%, transparent 70%);
    animation: bg-sway calc(var(--d, 14s) * 0.3 / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .bg.dir-down.s-particles .col > b { background: radial-gradient(circle, #fff 0%, color-mix(in srgb, var(--etc-bg-a) 50%, #fff) 50%, transparent 72%); }
  @keyframes bg-sway { from { transform: translate(-50%, -50%) translateX(-14px); } to { transform: translate(-50%, -50%) translateX(14px); } }

  /* ---- Breathing Core ---- */
  .s-core .c1, .s-core .c2 { inset: -25%; }
  .s-core .c1 {
    background: radial-gradient(circle at 50% 45%, var(--etc-bg-a) 0%, color-mix(in srgb, var(--etc-bg-b) 70%, transparent) 28%, transparent 55%);
    filter: blur(calc(20px * var(--bg-blur-k, 1)));
    animation: bg-breathe calc(7s / var(--bg-rate, 1)) ease-in-out infinite alternate;
  }
  .s-core .c2 {
    background: radial-gradient(circle at 50% 45%, transparent 30%, color-mix(in srgb, var(--etc-bg-a) 35%, transparent) 38%, transparent 48%);
    filter: blur(calc(14px * var(--bg-blur-k, 1)));
    animation: bg-breathe calc(7s / var(--bg-rate, 1)) ease-in-out infinite alternate-reverse;
  }
  .bg.dir-up.s-core .c1 { animation-name: bg-breathe-up; }
  .bg.dir-down.s-core .c1 { animation-name: bg-breathe-down; }
  .bg.dir-swirl.s-core .c2 {
    background: repeating-conic-gradient(from 0deg at 50% 45%, color-mix(in srgb, var(--etc-bg-a) 45%, transparent) 0deg 30deg, transparent 30deg 90deg);
    -webkit-mask-image: radial-gradient(circle at 50% 45%, transparent 10%, #000 25%, transparent 55%);
    mask-image: radial-gradient(circle at 50% 45%, transparent 10%, #000 25%, transparent 55%);
    animation: bg-spin calc(5s / var(--bg-rate, 1)) linear infinite;
  }
  @keyframes bg-breathe { from { transform: scale(0.82); opacity: 0.75; } to { transform: scale(1.12); opacity: 1; } }
  @keyframes bg-breathe-up { from { transform: translateY(6%) scale(0.82); opacity: 0.75; } to { transform: translateY(-6%) scale(1.12); opacity: 1; } }
  @keyframes bg-breathe-down { from { transform: translateY(-6%) scale(0.82); opacity: 0.75; } to { transform: translateY(6%) scale(1.12); opacity: 1; } }

  /* ---- Mesh Gradient ---- */
  .s-mesh .lay { filter: blur(calc(40px * var(--bg-blur-k, 1))); animation: bg-mesh-up calc(30s / var(--bg-rate, 1)) ease-in-out infinite alternate; }
  .bg.dir-down.s-mesh .lay { animation-name: bg-mesh-down; }
  .bg.dir-swirl.s-mesh .lay, .bg.dir-still.s-mesh .lay { animation: none; }
  .s-mesh .m { width: 90%; aspect-ratio: 1; margin: -45% 0 0 -45%; transform-origin: 62% 50%; animation: bg-spin calc(var(--md, 26s) / var(--bg-rate, 1)) linear infinite; }
  .s-mesh .m > b { inset: 0; border-radius: 50%; }
  .s-mesh .m1 { left: 15%; top: 20%; --md: 26s; }
  .s-mesh .m2 { left: 85%; top: 25%; --md: 34s; animation-direction: reverse; }
  .s-mesh .m3 { left: 80%; top: 85%; --md: 30s; }
  .s-mesh .m4 { left: 20%; top: 80%; --md: 38s; animation-direction: reverse; }
  .s-mesh .m1 > b, .s-mesh .m3 > b { background: radial-gradient(circle, var(--etc-bg-a), transparent 65%); }
  .s-mesh .m2 > b, .s-mesh .m4 > b { background: radial-gradient(circle, var(--etc-bg-b), transparent 65%); }
  .bg.dir-swirl.s-mesh .m { animation-duration: calc(var(--md, 26s) * 0.35 / var(--bg-rate, 1)); }
  @keyframes bg-mesh-up { from { transform: translateY(6%); } to { transform: translateY(-6%); } }
  @keyframes bg-mesh-down { from { transform: translateY(-6%); } to { transform: translateY(6%); } }

  /* ---- Glow Beam ---- */
  .s-beam .beam { inset: -45%; animation: bg-beam-up calc(24s / var(--bg-rate, 1)) ease-in-out infinite alternate; }
  .bg.dir-down.s-beam .beam { animation-name: bg-beam-down; }
  .bg.dir-swirl.s-beam .beam { animation: bg-beam-spin calc(10s / var(--bg-rate, 1)) linear infinite; }
  .bg.dir-still.s-beam .beam { animation: none; transform: rotate(-40deg); }
  .s-beam .beam i { border-radius: 40%; filter: blur(calc(38px * var(--bg-blur-k, 1))); }
  .s-beam .r1 { left: 44%; top: 5%; width: 20%; height: 90%; background: linear-gradient(to right, var(--etc-bg-a), color-mix(in srgb, var(--etc-bg-b) 60%, transparent) 50%, transparent); }
  .s-beam .r2 { left: 22%; top: 0; width: 18%; height: 65%; background: var(--etc-bg-b); opacity: 0.45; }
  .s-beam .r3 { left: 62%; top: 25%; width: 28%; height: 50%; background: linear-gradient(135deg, color-mix(in srgb, var(--etc-bg-b) 70%, transparent), transparent); opacity: 0.7; }
  @keyframes bg-beam-up { from { transform: rotate(-40deg) translate(-6%, 8%); } to { transform: rotate(-40deg) translate(6%, -8%); } }
  @keyframes bg-beam-down { from { transform: rotate(-40deg) translate(-6%, -8%); } to { transform: rotate(-40deg) translate(6%, 8%); } }
  @keyframes bg-beam-spin { from { transform: rotate(-40deg); } to { transform: rotate(320deg); } }

  /* ---- Fan: soft blades sweeping round, speed from the fan ---- */
  .bg .blades {
    inset: -30%;
    background: repeating-conic-gradient(from 0deg, color-mix(in srgb, var(--etc-bg-a) 50%, transparent) 0deg 30deg, transparent 30deg 90deg);
    filter: blur(calc(22px * var(--bg-blur-k, 1)));
    opacity: 0.5;
    -webkit-mask-image: radial-gradient(circle, transparent 8%, #000 22%, #000 55%, transparent 72%);
    mask-image: radial-gradient(circle, transparent 8%, #000 22%, #000 55%, transparent 72%);
    animation: bg-spin calc(5s / var(--bg-rate, 1)) linear infinite;
  }

  /* ---- Frosted controls ---- */
  ha-card.frosted :is(.btn, .mt, .chip, .tgl, .round, .hc-switch, .pill, .collapsed .bubble) {
    -webkit-backdrop-filter: blur(var(--frost, 12px)) saturate(140%);
    backdrop-filter: blur(var(--frost, 12px)) saturate(140%);
  }
  ha-card.frosted :is(.btn, .mt, .tgl, .hc-switch) {
    background: var(--etc-b-bg, rgba(255, 255, 255, 0.08));
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  }
  ha-card.frosted .round { background: rgba(255, 255, 255, 0.06); }
  ha-card.frosted .chip { background: var(--etc-b-bg, rgba(255, 255, 255, 0.07)); }
  ha-card.frosted .menu-list {
    background: color-mix(in srgb, var(--card-background-color, #1c1c1c) 72%, transparent);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    backdrop-filter: blur(18px) saturate(140%);
  }
`;
