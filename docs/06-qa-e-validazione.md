# 06 — Quality assurance e validazione

**Data:** 18 novembre 2026 · **Build:** Astro 7.4.13, Node 22 · **Browser di test:** Chromium (Playwright), emulazione desktop e mobile.

## 1. Sintesi

| Area | Test | Risultato |
|---|---|---|
| Build | `npm run build` | ✅ 12 pagine generate, 0 errori |
| Tipi | `npm run check` (43 file) | ✅ 0 errori, 0 avvisi |
| Accessibilità automatica | axe-core 4.10 (WCAG 2.0/2.1/2.2 A-AA + best practice), 12 pagine × 2 viewport | ✅ 0 violazioni |
| Link interni | Tutti i link interni delle pagine | ✅ 14 controllati, 0 rotti |
| Gestore del modulo (PHP 8.3) | `npm run qa:form`: validazione, anti-spam, origine, header injection, limite per IP, email, redirect senza JS | ✅ 19/19 |
| End-to-end nel browser | `npm run qa:e2e`: modulo con e senza JS, tastiera, tendina, menu mobile, vecchi URL | ✅ 31/31 |
| Responsive | 320 · 375 · 390 · 768 · 1024 · 1440 · 1920 px, 8 pagine | ✅ Nessuno scroll orizzontale, nessun errore in console |
| Contenuti | Ricerca di segnaposto, apostrofi dritti, marcatori [C]/[V] nel sito compilato | ✅ Nessuno |

## 2. Prima e dopo (Lighthouse 12, misure di laboratorio, una esecuzione)

| Metrica | Sito attuale (mobile) | Nuovo sito (mobile) | Nuovo sito (desktop) |
|---|---|---|---|
| Performance | 65 | **95–98** | **100** |
| Accessibilità | 84 | **100** | **100** |
| Best practice | 96 | 96* | 96* |
| SEO | 67 | **100** | **100** |
| LCP | 6,0 s | **2,0–2,3 s** | 0,4–0,5 s |
| TBT | 320 ms | 50–210 ms | 0 ms |
| CLS | 0 | **0–0,001** | ≤ 0,005 |
| Peso pagina | 8.109 KiB | **~320 KiB** (−96%) | ~320 KiB |

Pagine misurate: home, e-commerce, food marketing, chi siamo, network, lavora con noi, contatti. Configurazione di produzione: banner iubenda attivo.

\* L'unico punto perso in "Best practice" è un errore di rete verso `idb.iubenda.com`, bloccato dal proxy dell'ambiente di test: in produzione la richiesta dovrebbe andare a buon fine (non verificabile da qui).

**Correzione fatta durante la QA:** su Food marketing (mobile) il CLS era 0,119, causato dal cambio di font. È stato risolto con font di fallback a metriche calibrate (`size-adjust` calcolato sui file dei font): ora è 0.

## 3. Accessibilità (obiettivo WCAG 2.2 AA)

**Verificato:**
- Semantica: un H1 per pagina, gerarchia dei titoli, landmark, `lang="it"`, percorsi con `aria-current`.
- Tastiera: link "Vai al contenuto"; tendina Servizi con Invio/Spazio/Esc e chiusura all'uscita del focus; menu mobile con contenuto esterno `inert`, focus intrappolato e restituito, Esc. Tutto coperto dai test E2E.
- Focus sempre visibile (contorno di 2 px con colore adatto a ogni superficie).
- Contrasto: tutte le coppie colore/sfondo usate per il testo sono almeno 4,5:1 (vedi `03-direzione-creativa.md`); due problemi trovati da axe sulla sezione blu sono stati corretti.
- Modulo: etichette associate, campi facoltativi indicati, errori legati con `aria-describedby`, riepilogo errori con focus e link ai campi, stato di invio annunciato, conferma con focus.
- Movimento: `prefers-reduced-motion` rispettato; contenuti visibili anche senza JavaScript.
- Area cliccabile di link e pulsanti: almeno 44 px di altezza.

**Non verificato (serve un test manuale):**
- Lettori di schermo reali (NVDA, JAWS, VoiceOver, TalkBack).
- Safari/WebKit e Firefox: solo Chromium era disponibile nell'ambiente di test.
- Dispositivi fisici iOS e Android.

**Non si dichiara la piena conformità WCAG 2.2 AA** finché non sono stati fatti questi test manuali.

## 4. Controlli SEO

✅ Title e meta description unici · canonical · `robots.txt` valido · sitemap · Open Graph con immagini dedicate · dati strutturati (Organization, WebSite, Service, BreadcrumbList, ContactPage) · alt descrittivi · URL puliti · pagine di servizio (grazie, errore, 404) in `noindex` ed escluse dalla sitemap · redirect 301 dai vecchi URL (Apache) più fallback via script (testato: `?p=chi_siamo` → `/chi-siamo/`, `#contatti` → `/contatti/`).

## 5. Limiti e problemi aperti

| Elemento | Stato |
|---|---|
| Consegna reale delle email su Aruba | **Non testata.** Gestore verificato in locale con email catturate su file: fare un invio di prova dopo la pubblicazione |
| `.htaccess` (redirect, header, cache) | Sintassi standard Apache, **non eseguita** qui (Apache non disponibile). Verificare dopo la pubblicazione con i passi in `05-tecnico-e-deploy.md` |
| Banner iubenda dopo il consenso | Il salvataggio del consenso (`idb.iubenda.com`) era bloccato dall'ambiente di test |
| Link esterni (14: siti delle organizzazioni, iubenda, WhatsApp) | Non verificati automaticamente (rete limitata nell'ambiente di test) |
| Avviso di build "collection progetti vuota" | Atteso: nessun caso studio pubblicato. Scompare con il primo caso |
| Valori Lighthouse | Misure di laboratorio dietro proxy, indicative. Da riverificare in produzione con PageSpeed Insights e, dopo 28 giorni, con i dati reali (CrUX) |
| Font di fallback calibrati | Calibrati su Times New Roman/Arial; su Android (senza questi font) un piccolo spostamento al cambio di font resta possibile |

## 6. Come ripetere i test

```bash
PUBLIC_IUBENDA_BANNER=false npm run build   # build senza banner (il banner coprirebbe i clic automatici)
npm run qa:form                             # gestore PHP
npm run qa:e2e                              # browser end-to-end
npm run preview &                           # in un altro terminale
npm run qa:a11y                             # axe + link interni
npm run qa:screens                          # screenshot in qa-screens/
```
