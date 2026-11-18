/**
 * Genera le immagini Open Graph (1200×630) e l'apple-touch-icon in /public.
 * Uso: node scripts/og.mjs   (richiede Playwright con Chromium)
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const paths = JSON.parse(fs.readFileSync(path.join(root, 'src/assets/brand/paths.json'), 'utf8'));
const font = (f) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules', f)).toString('base64');
const fraunces = font('@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2');
const frauncesIt = font('@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2');
const instrument = font('@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2');

const pages = {
  default: ['Strategia, tecnologia e marketing', 'per la filiera agroalimentare'],
  home: ['Aiutiamo chi produce <em>bene</em>', 'a vendere <em>meglio</em>.'],
  servizi: ['E-commerce, food marketing', 'e digital advertising'],
  'e-commerce': ['E-commerce', 'per l’agroalimentare'],
  'food-marketing': ['Food marketing', 'posizionamento e brand'],
  'digital-advertising': ['Digital advertising', 'con obiettivi misurabili'],
  'chi-siamo': ['Strategia e tecnologia', 'al servizio di chi produce'],
  network: ['Una rete di competenze,', 'un solo interlocutore'],
  contatti: ['Parliamo del tuo', '<em>progetto</em>.'],
  'lavora-con-noi': ['Lavora con noi', 'nell’innovazione agroalimentare'],
};

const logo = (w) => `<svg viewBox="${paths.viewBox}" width="${w}"><defs><linearGradient id="g" x1="20" y1="0" x2="530" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#E61873"/><stop offset="1" stop-color="#0F70B7"/></linearGradient></defs><path fill="url(#g)" fill-rule="evenodd" d="${paths.mark}"/><path fill="#0D1F30" fill-rule="evenodd" d="${paths.word}"/></svg>`;
const mark = (w) => `<svg viewBox="0 -45 550 550" width="${w}"><defs><linearGradient id="m" x1="20" y1="0" x2="530" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#E61873"/><stop offset="1" stop-color="#0F70B7"/></linearGradient></defs><path fill="url(#m)" fill-rule="evenodd" d="${paths.mark}"/></svg>`;

const css = `
@font-face{font-family:F;src:url(${fraunces}) format('woff2');font-weight:100 900}
@font-face{font-family:F;src:url(${frauncesIt}) format('woff2');font-style:italic;font-weight:100 900}
@font-face{font-family:I;src:url(${instrument}) format('woff2');font-weight:400 700}
*{margin:0;box-sizing:border-box} body{width:1200px;height:630px;background:#F6F4EF;color:#0D1F30;font-family:I;position:relative;overflow:hidden}
.bar{position:absolute;left:0;right:0;bottom:0;height:10px;background:linear-gradient(90deg,#E61873,#0F70B7)}
.wrap{position:absolute;inset:64px 72px 70px 72px;display:flex;flex-direction:column;justify-content:space-between}
h1{font-family:F;font-weight:400;font-size:76px;line-height:1.02;letter-spacing:-0.02em;max-width:880px}
h1 em{font-style:italic;color:#0B5C97}
.meta{font-size:22px;font-weight:600;color:#3D4D5C;display:flex;gap:14px;align-items:center}
.meta i{width:12px;height:12px;background:#E61873;display:inline-block}
.mark{position:absolute;right:72px;top:64px;opacity:1}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
fs.mkdirSync(path.join(root, 'public/og'), { recursive: true });
for (const [name, [a, b]] of Object.entries(pages)) {
  await page.setContent(`<html><head><style>${css}</style></head><body><div class="wrap"><div>${logo(250)}</div><h1>${a}<br>${b}</h1><p class="meta"><i></i>abilita.biz · Strategia, e-commerce, food marketing, digital advertising</p></div><div class="bar"></div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(root, `public/og/${name}.png`) });
}
// apple-touch-icon 180×180
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<html><body style="margin:0;width:180px;height:180px;background:#F6F4EF;display:grid;place-items:center">${mark(132)}</body></html>`);
await page.screenshot({ path: path.join(root, 'public/apple-touch-icon.png') });
await browser.close();
console.log('OG e apple-touch-icon generati.');
