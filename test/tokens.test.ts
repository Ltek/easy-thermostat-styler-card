import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { EDITOR_CSS } from '../src/editor/editor-css';

// CARD_DESIGN_SYSTEM §1: the --ltek-* token block is byte-identical across
// every Ltek card. Compare against shipped cards when they're reachable.

function block(src: string): string {
  const a = src.indexOf('--ltek-fs-panel-title: 16px;');
  const end = '--ltek-slider-val-w: 44px;';
  const b = src.indexOf(end, a);
  if (a < 0 || b < 0) throw new Error('token block not found');
  // Include the leading indentation of the first line.
  const lineStart = src.lastIndexOf('\n', a) + 1;
  return src.slice(lineStart, b + end.length);
}

const SHIPPED = [
  '/shared/user/code/easy-entity-styler-card/easy-entity-styler-card.js',
  '/shared/user/code/color-light-manager-card/color-light-manager-card.js',
  '/shared/user/code/jvc-projector-card/jvc-projector-card.js',
].filter((p) => existsSync(p));

describe('--ltek-* token block', () => {
  it('is present', () => {
    expect(block(EDITOR_CSS)).toContain('--ltek-c-accent: var(--primary-color, #2196F3);');
  });
  it.runIf(SHIPPED.length > 0)('matches the shipped cards byte for byte', () => {
    for (const p of SHIPPED) expect(block(EDITOR_CSS)).toBe(block(readFileSync(p, 'utf8')));
  });
});
