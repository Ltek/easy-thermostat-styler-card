// Render README screenshots from the built card.
//
//   npm run screenshots          (after `npm run build`)
//
// Serves the repo on a free local port, opens preview/shots.html in headless
// Chromium, and writes one PNG per [data-shot] into screenshots/, plus
// screenshots/index.json (slug → title) for the README gallery. A shot whose
// menu is open is clipped to include the floating list.
//
// Browser: $CHROMIUM_PATH, else Playwright's cached Chromium, else a system one.
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, readdir, unlink } from 'node:fs/promises';
import { existsSync, readdirSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { homedir } from 'node:os';
import { build } from 'esbuild';
import { chromium } from 'playwright-core';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const OUT = join(ROOT, 'screenshots');

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const cache = join(homedir(), '.cache', 'ms-playwright');
  if (existsSync(cache)) {
    for (const d of readdirSync(cache).filter((n) => n.startsWith('chromium-')).sort().reverse()) {
      const p = join(cache, d, 'chrome-linux', 'chrome');
      if (existsSync(p)) return p;
    }
  }
  for (const p of ['/usr/bin/chromium', '/usr/bin/chromium-browser', '/usr/bin/google-chrome']) if (existsSync(p)) return p;
  return null;
}

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.css': 'text/css' };

async function serve() {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    const file = join(ROOT, path.endsWith('/') ? `${path}index.html` : path);
    if (!file.startsWith(ROOT)) return res.writeHead(403).end();
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  return server;
}

async function main() {
  if (!existsSync(join(ROOT, 'dist', 'easy-thermostat-styler-card.js'))) {
    console.log('screenshots: dist/ is missing, run `npm run build` first');
    process.exit(1);
  }
  const exe = findChromium();
  if (!exe) {
    console.log('screenshots: no Chromium found (set CHROMIUM_PATH)');
    process.exit(1);
  }
  // The shots page imports the template list straight from the source.
  await build({
    entryPoints: [join(ROOT, 'src/model/templates.ts')],
    bundle: true,
    format: 'esm',
    outfile: join(ROOT, 'preview/.cache/templates.mjs'),
    logLevel: 'silent',
  });
  const server = await serve();
  const url = `http://127.0.0.1:${server.address().port}/preview/shots.html`;
  // A Node-bundled libstdc++ on LD_LIBRARY_PATH breaks Chromium's GL libs.
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--disable-gpu'], env: { ...process.env, LD_LIBRARY_PATH: '' } });
  try {
    const page = await browser.newPage({ viewport: { width: 520, height: 1400 }, deviceScaleFactor: 2 });
    const problems = [];
    page.on('pageerror', (e) => problems.push(e.message));
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForSelector('body[data-ready="1"]', { timeout: 20000 });
    await page.waitForTimeout(300);
    if (problems.length) throw new Error(`page problem: ${problems.join('; ')}`);

    await mkdir(OUT, { recursive: true });
    for (const f of await readdir(OUT)) if (f.endsWith('.png')) await unlink(join(OUT, f));
    const shots = await page.evaluate(() =>
      [...document.querySelectorAll('[data-shot]')].map((b) => ({ slug: b.dataset.shot, title: b.dataset.title, action: b.dataset.action })),
    );
    for (const s of shots) {
      // Bring the shot into the window, put it into its state, then clip in
      // window coordinates (an open menu is position: fixed in the top layer).
      const clip = await page.evaluate(async ({ slug, action }) => {
        const box = document.querySelector(`[data-shot="${slug}"]`);
        box.scrollIntoView({ block: 'center' });
        if (action) await window.etcShotAction(slug);
        const r = box.getBoundingClientRect();
        let [x1, y1, x2, y2] = [r.left, r.top, r.right, r.bottom];
        const list = box.querySelector('easy-thermostat-styler-card').shadowRoot.querySelector('.menu-list:popover-open');
        if (list) {
          const l = list.getBoundingClientRect();
          x1 = Math.min(x1, l.left - 8); y1 = Math.min(y1, l.top - 8);
          x2 = Math.max(x2, l.right + 8); y2 = Math.max(y2, l.bottom + 8);
        }
        x1 = Math.max(0, x1); y1 = Math.max(0, y1);
        return { x: x1, y: y1, width: Math.min(window.innerWidth, x2) - x1, height: Math.min(window.innerHeight, y2) - y1 };
      }, s);
      await page.screenshot({ path: join(OUT, `${s.slug}.png`), clip });
    }
    const index = Object.fromEntries(shots.map((s) => [s.slug, s.title]));
    await writeFile(join(OUT, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
    console.log(`screenshots: wrote ${shots.length} PNGs to screenshots/`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.log(`screenshots failed: ${e.message}`);
  process.exit(1);
});
