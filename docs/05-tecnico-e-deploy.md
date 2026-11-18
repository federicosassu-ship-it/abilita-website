# 05 — Architettura tecnica, deploy e manutenzione

## 1. Scelta tecnologica

**Sito attuale [V]:** HTML scritto a mano con estensione PHP, su hosting condiviso Aruba Linux (WAF attivo). Nessun CMS.

**Scelta: [Astro](https://astro.build) 7, sito statico.**

| Criterio | Perché Astro statico |
|---|---|
| Performance | HTML pre-generato, ~10 KB di JavaScript in tutto, nessun framework nel browser |
| Hosting | Funziona sull'hosting Aruba attuale (bastano file statici + PHP per il modulo). Nessuna migrazione di DNS o email |
| Costi | Nessun costo aggiuntivo di hosting o licenze |
| Sicurezza | Nessun database o pannello di amministrazione da attaccare |
| Manutenzione | Contenuti in file di dati leggibili (`src/data/*.ts`), componenti riutilizzabili, TypeScript |
| SEO | URL puliti, sitemap, metadati e dati strutturati generati in automatico |
| Evoluzione | Collezione "progetti" in Markdown già pronta; un CMS headless si può aggiungere in futuro senza rifare il sito |

**Alternative scartate:** Next.js e React (più complessi e pesanti, e richiedono un hosting Node per sfruttarli: non servono per un sito di presentazione); WordPress (più manutenzione e più superficie di attacco, e il team non lo usa oggi).

**Dipendenze di produzione:** `astro`, `@astrojs/sitemap`, `sharp` (ottimizzazione immagini), due pacchetti di font self-hosted. Nessun framework CSS: CSS scritto a mano con token.

## 2. Struttura

```
public/
  .htaccess            redirect dal vecchio sito, 404, cache, header di sicurezza (Apache/Aruba)
  _redirects           equivalente per Netlify / Cloudflare Pages
  api/contatto.php     gestore del modulo di contatto (PHP 7.4+)
  og/                  immagini di condivisione (generate con npm run og)
  favicon.*, logo-*.svg, apple-touch-icon.png
src/
  assets/              loghi delle organizzazioni (ottimizzati in WebP alla build), tracciati del logo
  components/          Header, Footer, Logo, Icon, PixelField, PixelGlyph, SectionHead, PageHero,
                       ServiceRows, Steps, LogoWall, Faq, Breadcrumbs, CtaBand, ContactForm
  content/progetti/    casi studio in Markdown (_modello-caso-studio.md)
  data/                site.ts (azienda, contatti, configurazione), services.ts, method.ts, partners.ts
  layouts/Base.astro   <head> SEO, dati strutturati, font, iubenda, script
  pages/               una pagina per file; servizi/[slug].astro genera le 3 pagine servizio
  scripts/             nav.ts, reveal.ts, contact-form.ts, analytics.ts
  styles/              tokens.css, global.css
scripts/
  og.mjs               genera le immagini Open Graph
  qa/                  test: screenshot, accessibilità, modulo PHP, end-to-end
docs/                  audit, strategia, direzione creativa, contenuti, tecnica, QA, contenuti mancanti
```

## 3. Comandi

```bash
npm install          # una volta (Node 22.23 o successivo)
npm run dev          # sviluppo su http://localhost:4321
npm run build        # genera il sito in dist/
npm run preview      # anteprima della build
npm run check        # controllo dei tipi (TypeScript/Astro)
npm run og           # rigenera immagini Open Graph e apple-touch-icon
npm run qa:form      # test del gestore PHP (richiede php)
npm run qa:e2e       # test nel browser: modulo, tastiera, menu, redirect (richiede php + Playwright)
npm run qa:a11y      # axe-core su tutte le pagine + link interni (con npm run preview attivo)
```

Gli script di QA usano Playwright, che non è tra le dipendenze del sito: installarlo a parte (`npx playwright install chromium`) se serve.

## 4. Configurazione (`.env`, vedi `.env.example`)

| Variabile | Predefinito | Uso |
|---|---|---|
| `PUBLIC_FORM_ENDPOINT` | `/api/contatto.php` | Dove viene inviato il modulo |
| `PUBLIC_IUBENDA_SITE_ID` / `PUBLIC_IUBENDA_COOKIE_POLICY_ID` | 3743319 / 55509982 | ID iubenda esistenti |
| `PUBLIC_IUBENDA_BANNER` | `true` | `false` per non caricare il banner |
| `PUBLIC_ANALYTICS_DOMAIN` / `PUBLIC_ANALYTICS_SRC` | vuoto | Attiva Plausible o un servizio compatibile |
| `PUBLIC_NOINDEX` | `false` | `true` sulle anteprime (noindex + robots.txt che blocca) |

Nessun segreto è necessario né presente nel codice.

## 5. Pubblicazione

### Opzione A — Hosting Aruba attuale (raccomandata)
1. `npm ci && npm run build`
2. **Backup** del sito attuale: scarica via FTP tutta la cartella pubblica.
3. Carica il contenuto di `dist/` nella cartella pubblica, **file nascosti compresi** (`.htaccess`).
4. Rimuovi i file del vecchio sito non più usati (`index.php`, `pagine/`, `immagini/`, `media/`), dopo aver verificato il nuovo sito.
5. **Verifiche dopo la pubblicazione:**
   - `https://www.abilita.biz/?p=contatti` → redirect 301 a `/contatti/`
   - `https://www.abilita.biz/pagina-inesistente` → pagina 404 del nuovo sito
   - Invio di prova del modulo: deve arrivare un'email a info@abilita.biz. Se non arriva, controllare che `MITTENTE` in `api/contatto.php` sia una casella esistente del dominio (requisito Aruba) e il pannello di posta.
   - `https://www.abilita.biz/robots.txt` e `/sitemap-index.xml` raggiungibili
6. In Google Search Console: invio della nuova sitemap.

### Opzione B — Netlify o Cloudflare Pages
- Build: `npm run build` · cartella: `dist` · variabile `NODE_VERSION=22`.
- PHP non è disponibile: impostare `PUBLIC_FORM_ENDPOINT` su un servizio di moduli (es. Formspree o Basin) che risponde in JSON. Il gestore PHP resta inutilizzato. Non fare test con dati reali prima di aver configurato il servizio.
- I redirect sono in `public/_redirects`; i vecchi `?p=` sono gestiti dallo script nella home.
- Per le anteprime impostare `PUBLIC_NOINDEX=true`.

## 6. Modulo di contatto

- Gestore `public/api/contatto.php`: validazione lato server, controllo di origine, honeypot, tempo minimo di compilazione (3 s), limite di 5 invii riusciti ogni 10 minuti per IP (solo un hash, nessun indirizzo salvato), protezione dall'header injection, email in testo semplice UTF-8 con `Reply-To` del richiedente. Nessun dato personale salvato sul server.
- Il browser mostra "Grazie" solo se il server risponde con esito positivo. Senza JavaScript il modulo funziona comunque (redirect a `/contatti/grazie/` o `/contatti/errore/`).
- **Testato in locale** (PHP 8.3, email catturate su file): 19 test sul gestore e 29 test nel browser superati. **Non testato:** la consegna reale su Aruba, da verificare con un invio di prova dopo la pubblicazione.

## 7. Cookie, consenso e misurazione

- **iubenda** resta lo strumento di consenso (stessi ID). Rispetto al sito attuale:
  - lo script di *autoblocking* non è più caricato, perché il nuovo sito non usa servizi di terze parti da bloccare (i font sono locali);
  - il banner viene posizionato in basso (`banner.position: float-bottom-center`, in `Base.astro`). Testi e scelte restano quelli configurati su iubenda, ma il banner non copre più navigazione e titolo su mobile.
- **Misurazione:** disattivata di default. Se si attiva `PUBLIC_ANALYTICS_DOMAIN`, lo script viene caricato solo dopo il consenso alla finalità "misurazione" (callback iubenda → evento `abilita:consent`). Eventi già presenti nel markup: `cta_click`, `servizio_click`, `email_click`, `whatsapp_click`, `form_invio`, `form_errore`, `candidatura_click`.
- **[C] Verifica legale:** vedi `07-contenuti-mancanti-e-domande.md`, sezione privacy.

## 8. Performance e sicurezza

- Budget: < 350 KB di trasferimento per pagina (iubenda incluso), < 15 KB di JS nostro, LCP < 2,5 s su mobile.
- Font: 2 famiglie variabili, solo sottoinsieme latino caricato, preload del font dei titoli.
- Immagini: loghi convertiti in WebP alla build, caricamento differito, dimensioni esplicite (niente salti di layout).
- Cache: asset con hash in `/_astro/` in cache per un anno; HTML riconvalidato (`.htaccess`).
- Header: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. **Consigliato (P1):** una Content-Security-Policy che consenta solo il dominio, `cdn.iubenda.com`/`cs.iubenda.com` e l'eventuale analytics, da testare prima in modalità report-only.

## 9. Manutenzione

| Attività | Dove |
|---|---|
| Modificare testi di servizi, FAQ, CTA | `src/data/services.ts` |
| Modificare contatti, dati societari, social | `src/data/site.ts` (i social compaiono nel footer appena inseriti) |
| Aggiungere un'organizzazione al logo wall | logo in `src/assets/partner/`, voce in `src/data/partners.ts` |
| Pubblicare un caso studio | copia `src/content/progetti/_modello-caso-studio.md`, compila, imposta `draft: false`, `verificato: true`, `autorizzazioneCliente: true`. Le pagine `/progetti/` si generano da sole |
| Aggiornare immagini di condivisione | testi in `scripts/og.mjs`, poi `npm run og` |
| Aggiornare le dipendenze | ogni 2-3 mesi: `npm outdated`, aggiornamento, `npm run build && npm run check` e test QA |
| Prima di ogni pubblicazione | `npm run check`, `npm run build`, `npm run qa:a11y` (con preview attiva) |
