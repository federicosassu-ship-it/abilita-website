/**
 * Prepara la build per un'anteprima pubblicata in una sottocartella (es. GitHub Pages:
 * https://<utente>.github.io/abilita-website/). Astro aggiunge la base agli asset;
 * questo script la aggiunge anche ai link interni scritti nel markup ("/servizi/" ecc.)
 * e crea .nojekyll (altrimenti GitHub Pages ignora la cartella _astro).
 * Uso: SITE_BASE=/abilita-website npm run build && node scripts/preview-pages.mjs /abilita-website
 * Non usare per la produzione: lì il sito è alla radice del dominio.
 */
import fs from 'node:fs';
import path from 'node:path';

const base = (process.argv[2] || process.env.SITE_BASE || '').replace(/\/$/, '');
if (!base) {
  console.error('Specificare la base, es. /abilita-website');
  process.exit(1);
}
const dist = path.resolve('dist');
const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').slice(1);
const attr = new RegExp(`(\\s(?:href|src|action|srcset)=")\\/(?!\\/)(?!${escaped}\\/)`, 'g');

let files = 0;
let links = 0;
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const out = html.replace(attr, (_, a) => { links++; return `${a}${base}/`; });
      if (out !== html) { fs.writeFileSync(full, out); files++; }
    }
  }
};
walk(dist);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log(`Anteprima pronta: ${links} link aggiornati in ${files} file, base ${base}/`);
