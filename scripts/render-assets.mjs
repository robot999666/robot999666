import { createRequire } from 'node:module';
import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Use `npm install --no-save playwright`, or point PLAYWRIGHT_MODULE at its package.
// No network request, authentication, browser extensions, or external assets are used.
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'output');
const frameDir = resolve(output, 'frames');
const frameCount = 40;
const durationSeconds = 8;
await mkdir(frameDir, { recursive: true });
const svg = await readFile(resolve(root, 'assets/window-garden.svg'), 'utf8');
const browser = await chromium.launch({
  headless: true,
  ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
});
try {
  const page = await browser.newPage({ viewport: { width: 1120, height: 336 }, deviceScaleFactor: 1 });
  await page.setContent(`<style>html,body{margin:0;background:#FAF8F0}svg{display:block}</style>${svg}`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    document.querySelector('svg').pauseAnimations();
  });
  for (let index = 0; index < frameCount; index++) {
    await page.evaluate(time => document.querySelector('svg').setCurrentTime(time), index * durationSeconds / frameCount);
    await page.screenshot({ path: resolve(frameDir, `${String(index).padStart(3, '0')}.png`) });
  }
  await copyFile(resolve(frameDir, '000.png'), resolve(root, 'assets/window-garden-still.png'));
  const cta = await readFile(resolve(root, 'assets/blog-entry.svg'), 'utf8');
  await page.setViewportSize({ width: 560, height: 100 });
  await page.setContent(`<style>html,body{margin:0;background:#fff}svg{display:block}</style>${cta}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(root, 'assets/blog-entry.png') });
  await copyFile(resolve(root, 'assets/blog-entry.png'), resolve(output, 'blog-entry-preview.png'));
  console.log(`Rendered ${frameCount} deterministic frames over ${durationSeconds}s into ${frameDir}.`);
} finally {
  await browser.close();
}

const python = process.env.PYTHON_BINARY || (process.platform === 'win32' ? 'python' : 'python3');
const encoder = spawnSync(python, [resolve(root, 'scripts/encode-gif.py')], {
  cwd: root,
  stdio: 'inherit',
});
if (encoder.error) throw encoder.error;
if (encoder.status !== 0) throw new Error(`GIF encoder exited with status ${encoder.status}.`);
