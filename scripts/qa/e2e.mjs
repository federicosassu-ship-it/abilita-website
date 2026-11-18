/**
 * Nota: i contesti usano reducedMotion 'reduce' perché lo scroll fluido (scroll-behavior: smooth)
 * rende instabile il clic automatico di Playwright; per gli utenti non cambia nulla.
 * Test end-to-end nel browser: modulo di contatto (con e senza JavaScript),
 * navigazione da tastiera, menu a tendina e menu mobile.
 * Uso: node scripts/qa/e2e.mjs <baseUrl servito da PHP> <file email catturate>
 */
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const [base = 'http://127.0.0.1:8089', mailFile] = process.argv.slice(2);
let pass = 0, fail = 0;
const check = (name, cond, extra = '') => { if (cond) { pass++; console.log('OK  ', name); } else { fail++; console.log('FAIL', name, extra); } };
const browser = await chromium.launch();

// ---------- Modulo con JavaScript ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${base}/contatti/?ambito=food-marketing`);
  check('Ambito preselezionato dall’URL', (await page.inputValue('#f-ambito')) === 'food-marketing');
  await page.click('[data-submit]');
  check('Riepilogo errori visibile', await page.isVisible('[data-summary]'));
  check('Focus sul riepilogo errori', await page.evaluate(() => document.activeElement?.matches('[data-summary]')));
  const invalid = await page.$$eval('[aria-invalid=true]', (els) => els.map((e) => e.getAttribute('name')));
  check('Tre campi obbligatori segnalati', JSON.stringify(invalid) === JSON.stringify(['nome', 'email', 'messaggio']), JSON.stringify(invalid));
  check('Messaggio di errore leggibile', (await page.textContent('#f-email-err'))?.includes('indirizzo email'));
  await page.fill('#f-email', 'mario@');
  await page.locator('#f-email').blur();
  check('Email non valida segnalata al blur', (await page.textContent('#f-email-err'))?.includes('Controlla'));
  await page.fill('#f-nome', 'Mario Rossi');
  await page.fill('#f-email', 'mario@azienda.it');
  check('Errore rimosso quando il valore è corretto', (await page.getAttribute('#f-email', 'aria-invalid')) === 'false');
  await page.fill('#f-azienda', 'Cantina Esempio');
  await page.fill('#f-messaggio', 'Vorremmo lavorare sul posizionamento del nostro vino.');
  await page.waitForTimeout(3200);
  await page.click('[data-submit]');
  await page.waitForSelector('[data-success]:not([hidden])', { timeout: 10000 }).catch(() => {});
  check('Conferma mostrata dopo l’invio', await page.isVisible('[data-success]'));
  check('Focus sul titolo di conferma', await page.evaluate(() => document.activeElement?.matches('[data-success-title]')));
  check('Email del richiedente nella conferma', (await page.textContent('[data-success-email]')) === 'mario@azienda.it');
  check('Nessun errore JavaScript', errors.length === 0, errors.join(' | '));
  await ctx.close();
}

// ---------- Modulo senza JavaScript ----------
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${base}/contatti/`);
  await page.fill('#f-nome', 'Giulia Neri');
  await page.fill('#f-email', 'giulia@azienda.it');
  await page.fill('#f-messaggio', 'Richiesta inviata senza JavaScript.');
  await Promise.all([page.waitForNavigation(), page.click('[data-submit]')]);
  check('Senza JS: redirect alla pagina di conferma', page.url().endsWith('/contatti/grazie/'), page.url());
  await ctx.close();
}

if (mailFile) {
  const mails = fs.readFileSync(mailFile, 'utf8');
  check('Email ricevute per entrambi gli invii', mails.includes('Vorremmo lavorare sul posizionamento') && mails.includes('Richiesta inviata senza JavaScript'));
  check('Ambito "Food marketing" riportato nell’email', mails.includes('Ambito di interesse: Food marketing'));
}

// ---------- Tastiera: skip link e menu a tendina ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${base}/`);
  await page.keyboard.press('Tab');
  check('Primo Tab: link "Vai al contenuto"', await page.evaluate(() => document.activeElement?.classList.contains('skip-link')));
  const box = await page.locator('.skip-link').boundingBox();
  check('Skip link visibile al focus', box && box.y >= 0);
  await page.keyboard.press('Enter');
  check('Invio sullo skip link porta al contenuto', await page.evaluate(() => document.activeElement?.id === 'contenuto'));
  await page.click('[data-dropdown-toggle]');
  check('Menu Servizi aperto con un clic del mouse', await page.isVisible('#nav-servizi'));
  await page.mouse.click(700, 600);
  check('Clic fuori dal menu lo chiude', !(await page.isVisible('#nav-servizi')));
  await page.focus('[data-dropdown-toggle]');
  await page.keyboard.press('Enter');
  check('Menu Servizi aperto da tastiera', (await page.getAttribute('[data-dropdown-toggle]', 'aria-expanded')) === 'true' && await page.isVisible('#nav-servizi'));
  await page.keyboard.press('Tab');
  check('Tab entra nel pannello', await page.evaluate(() => !!document.activeElement?.closest('#nav-servizi')));
  await page.keyboard.press('Escape');
  check('Esc chiude il pannello e riporta il focus', (await page.getAttribute('[data-dropdown-toggle]', 'aria-expanded')) === 'false' && await page.evaluate(() => document.activeElement?.hasAttribute('data-dropdown-toggle')));
  await ctx.close();
}

// ---------- Menu mobile ----------
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${base}/servizi/`);
  await page.click('[data-menu-toggle]');
  check('Menu mobile aperto', await page.isVisible('#menu-mobile'));
  check('Contenuto principale inerte', await page.evaluate(() => document.querySelector('main')?.hasAttribute('inert')));
  check('Focus nel menu', await page.evaluate(() => !!document.activeElement?.closest('#menu-mobile')));
  check('Etichetta "Chiudi"', (await page.textContent('[data-menu-label]')) === 'Chiudi');
  await page.keyboard.press('Escape');
  check('Esc chiude il menu', !(await page.isVisible('#menu-mobile')));
  check('Focus restituito al pulsante', await page.evaluate(() => document.activeElement?.hasAttribute('data-menu-toggle')));
  check('Contenuto di nuovo attivo', await page.evaluate(() => !document.querySelector('main')?.hasAttribute('inert')));
  await ctx.close();
}

// ---------- Vecchi URL ----------
{
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(`${base}/?p=chi_siamo#chi_siamo`);
  await page.waitForURL('**/chi-siamo/');
  check('Vecchio URL ?p=chi_siamo → /chi-siamo/', page.url().endsWith('/chi-siamo/'));
  await page.goto(`${base}/#contatti`);
  await page.waitForURL('**/contatti/');
  check('Vecchia ancora #contatti → /contatti/', page.url().endsWith('/contatti/'));
  await ctx.close();
}

await browser.close();
console.log(`Risultato: ${pass} superati, ${fail} falliti`);
process.exit(fail ? 1 : 0);
