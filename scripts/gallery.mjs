// Rebuild the README gallery block from screenshots/index.json.
import { readFileSync, writeFileSync } from 'node:fs';
const idx = JSON.parse(readFileSync('screenshots/index.json', 'utf8'));
const cell = ([k, v]) => {
  const [name, ...rest] = v.split(':');
  return `<td align="center" width="33%"><img src="screenshots/${k}.png" width="260" alt="${name}" /><br /><sub><b>${name}</b>${rest.length ? ':' + rest.join(':') : ''}</sub></td>`;
};
const table = (items) => {
  const rows = [];
  for (let i = 0; i < items.length; i += 3) rows.push(`<tr>${items.slice(i, i + 3).map(cell).join('')}</tr>`);
  return `<table>\n${rows.join('\n')}\n</table>`;
};
const e = Object.entries(idx);
const block = `<!-- gallery:start (generated from screenshots/index.json by the publish step; do not edit by hand) -->
## Quick Preset Templates

${table(e.filter(([k]) => k.startsWith('template-')))}

## Features

${table(e.filter(([k]) => k.startsWith('feature-')))}
<!-- gallery:end -->`;
const readme = readFileSync('README.md', 'utf8');
const s = readme.indexOf('<!-- gallery:start');
const end = '<!-- gallery:end -->';
const t = readme.indexOf(end);
if (s < 0 || t < 0) throw new Error('README has no gallery markers');
writeFileSync('README.md', readme.slice(0, s) + block + readme.slice(t + end.length));
console.log(`gallery: ${e.length} images`);
