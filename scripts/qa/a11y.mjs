/**
 * Scansione di accessibilità con axe-core (WCAG 2.0/2.1/2.2 A e AA + best practice)
 * e controllo di tutti i link interni delle pagine.
 * Uso: node scripts/qa/a11y.mjs <baseUrl>
 */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const axePath = require.resolve('axe-core/axe.min.js');

const base = process.argv[2] ?? 'http://localhost:4321';
const pages = ['/', '/servizi/', '/servizi/e-commerce/', '/servizi/food-marketing/', '/servizi/digital-advertising/', '/chi-siamo/', '/network/', '/contatti/', '/contatti/grazie/', '/contatti/errore/', '/lavora-con-noi/', '/404.html'];
const browser = await chromium.launch();
let violations = 0;
const links = new Set();
for (const width of [390, 1440]) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible')));
    await page.addScriptTag({ path: axePath });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
      return { v: r.violations.map((x) => ({ id: x.id, impact: x.impact, n: x.nodes.length, t: x.nodes.slice(0, 2).map((n) => n.target.join(' ')) })), inc: r.incomplete.map((x) => x.id) };
    });
    if (res.v.length) {
      violations += res.v.length;
      console.log(`✗ ${p} @${width}`);
      res.v.forEach((x) => console.log(`   ${x.impact} ${x.id} (${x.n}) ${x.t.join(' | ')}`));
    } else {
      console.log(`✓ ${p} @${width}${res.inc.length ? '  [da verificare a mano: ' + [...new Set(res.inc)].join(', ') + ']' : ''}`);
    }
    if (width === 1440) (await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')))).forEach((h) => links.add(h));
  }
  await ctx.close();
}
// Link interni
const broken = [];
const ctx = await browser.newContext();
for (const href of links) {
  if (!href.startsWith('/') || href.startsWith('//')) continue;
  const url = new URL(href, base);
  const r = await ctx.request.get(url.href);
  if (r.status() >= 400) broken.push(`${href} → ${r.status()}`);
}
await browser.close();
const external = [...links].filter((h) => /^https?:/.test(h));
console.log(`\nLink interni controllati: ${[...links].filter((h) => h.startsWith('/')).length}, rotti: ${broken.length}${broken.length ? '\n  ' + broken.join('\n  ') : ''}`);
console.log(`Link esterni (non verificati automaticamente): ${external.length}`);
console.log(`Violazioni axe totali: ${violations}`);
process.exit(violations || broken.length ? 1 : 0);
