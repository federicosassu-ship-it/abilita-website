/**
 * QA visiva: screenshot a pagina intera e controllo dello scroll orizzontale.
 * Uso: node scripts/qa/screens.mjs <baseUrl> <outDir> [pagine separate da virgola] [larghezze]
 * Richiede Playwright (non incluso nelle dipendenze del sito).
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import fs from 'node:fs';

const [base = 'http://localhost:4321', out = 'qa-screens', pagesArg, widthsArg] = process.argv.slice(2);
const pages = (pagesArg ?? '/').split(',');
const widths = (widthsArg ?? '390,1440').split(',').map(Number);
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const problems = [];
for (const w of widths) {
  const mobile = w < 768;
  const ctx = await browser.newContext({ viewport: { width: w, height: mobile ? 844 : 900 }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, locale: 'it-IT', reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')));
    // Scorre la pagina per attivare il caricamento differito delle immagini
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForLoadState('networkidle');
    const m = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth, iw = window.innerWidth;
      const wide = [];
      if (sw > iw) document.querySelectorAll('body *').forEach((el) => { const r = el.getBoundingClientRect(); if (r.right > iw + 1 && wide.length < 5) wide.push(el.tagName + '.' + String(el.className).slice(0, 50)); });
      return { sw, iw, h: document.documentElement.scrollHeight, wide };
    });
    const slug = p.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
    const name = `${slug}-${w}`;
    await page.screenshot({ path: `${out}/${name || 'home'}.png`, fullPage: true });
    if (m.sw > m.iw) problems.push(`${p} @${w}: overflow ${m.sw}>${m.iw} ${m.wide.join(', ')}`);
    console.log(`${p} @${w}: h=${m.h} overflow=${m.sw > m.iw}`);
  }
  if (errors.length) problems.push(`@${w} errors: ${[...new Set(errors)].join(' | ')}`);
  await ctx.close();
}
await browser.close();
console.log(problems.length ? 'PROBLEMI:\n' + problems.join('\n') : 'Nessun problema di overflow o errori console.');
