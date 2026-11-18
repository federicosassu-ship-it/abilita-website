# 03 — Direzione creativa e design system

## 1. Concetto: "Dal campo al dato"

Il logotipo di Abilita contiene già l'idea che serve al sito: una **"A" che si scompone in pixel**, cioè un segno fisico che diventa digitale. Il nuovo linguaggio visivo sviluppa questa intuizione invece di sostituirla.

- **Il pixel del logo diventa il modulo del sistema grafico.** Occhielli, numerazioni, pittogrammi e composizioni sono costruiti con quadrati, come la "A".
- **Il campo coltivato visto dall'alto è una griglia.** File, appezzamenti e filari sono già "pixel". Le composizioni astratte ("Campo di pixel") collegano agricoltura e tecnologia senza cliché: niente spighe, trattori o foglie.
- **Carta e inchiostro.** Fondo caldo color carta, testo in inchiostro blu-notte e tipografia editoriale: il tono di uno studio di consulenza, non di una startup.

**Attributi:** competente senza arroganza, contemporaneo senza mode, preciso, umano, concreto.

## 2. Logo (evoluzione, non rebranding)

| Variante | Uso | File |
|---|---|---|
| A colori: "A" con pixel in gradiente magenta→blu, lettere in inchiostro | Fondi chiari (header, documenti) | `public/logo-abilita.svg`, componente `Logo.astro` |
| Bianco | Fondi scuri (footer) | `public/logo-abilita-bianco.svg` |
| Simbolo "A" | Favicon, avatar, icone app | `public/favicon.svg`, `apple-touch-icon.png` |

Il logo è stato **vettorializzato dal PNG originale** (2198×379 px) senza modificarne la forma. **[C]** Se esiste il file vettoriale originale (AI/SVG/PDF), va sostituito ai tracciati in `src/assets/brand/paths.json`. Area di rispetto minima: l'altezza della "B" su ogni lato. Larghezza minima: 96 px.

## 3. Colore

Palette costruita sui colori esistenti (`#0F70B7`, `#E61873`, `#073B5E`, `#FAF9F6`), con un uso più disciplinato.

| Token | Valore | Ruolo | Contrasto |
|---|---|---|---|
| `--c-ink` | `#0D1F30` | Testo, superfici scure, pulsante primario | 15,2:1 su carta |
| `--c-ink-2` | `#3D4D5C` | Testo secondario | 7,9:1 |
| `--c-muted` | `#5B6875` | Testo terziario, metadati | 5,2:1 |
| `--c-paper` | `#F6F4EF` | Sfondo principale | — |
| `--c-stone` | `#ECE8E0` | Superficie alternata | — |
| `--c-white` | `#FFFFFF` | Superfici di contenuto (servizi, form) | — |
| `--c-blue` | `#0F70B7` | **Primario di brand**: sezione di chiusura, hover dei pulsanti | 5,2:1 con testo bianco |
| `--c-blue-strong` | `#0B5C97` | Link, enfasi tipografica | 6,4:1 su carta |
| `--c-magenta` | `#E61873` | **Accento**: pixel, focus, dettagli. Mai per testo piccolo | 4,0:1 (solo elementi grafici ≥ 3:1) |
| `--c-magenta-strong` | `#C0145F` | Magenta per testo | 5,5:1 |
| `--c-blue-soft` | `#A9D0F0` | Testo secondario su inchiostro | 10,3:1 |
| `--c-success` / `--c-error` | `#1D7A4E` / `#B42318` | Stati del form | 4,8:1 / 6,0:1 |
| `--gradient-brand` | magenta → blu | **Solo** nel logo e nel filetto del footer | — |

**Regole:** circa 80% neutri, 15% blu, 5% magenta. Il gradiente è una firma, non uno sfondo. Niente glassmorphism, ombre colorate o sfondi sfumati.

## 4. Tipografia

| Ruolo | Famiglia | Note |
|---|---|---|
| Titoli e citazioni | **Fraunces** (variabile, asse ottico 9-144) | Serif editoriale con un calore "organico" che richiama il cibo; l'asse ottico rende i titoli grandi più fini e precisi. Corsivo per l'enfasi |
| Testo, interfaccia, numeri | **Instrument Sans** (variabile) | Grottesco contemporaneo, molto leggibile in italiano, cifre tabulari |

Due famiglie in tutto, **self-hosted** (nessuna richiesta a Google, GDPR-friendly), sottoinsieme latino che copre tutti gli accenti italiani, `font-display: swap` e preload.

Scala fluida (320 → 1440 px): `--step--2` 12-13 · `--step--1` 13-14 · `--step-0` 16-18 (corpo) · `--step-1` 18-22 (lead) · `--step-2` 21-28 (H3) · `--step-3` 26-40 · `--step-4` 32-56 (H2) · `--step-5` 40-88 (H1). Interlinea 1,62 per il corpo, 1,04-1,18 per i titoli. Misura massima del testo: 66 caratteri.

**Firma tipografica:** titoli in Fraunces con una parte in corsivo blu (es. "Aiutiamo chi produce *bene* a vendere *meglio*").

## 5. Layout

- Griglia a 12 colonne da 1024 px, a colonna singola sotto. Contenitore massimo 1312 px, margini laterali fluidi da 16 a 48 px.
- **Asimmetria editoriale:** titolo di sezione su 4-6 colonne, contenuto spostato a destra su 6-7 colonne.
- **Filetti, non card:** le informazioni si separano con linee sottili (inchiostro per l'inizio di una lista, `--c-line` tra le voci). Le card sono riservate ad aree cliccabili (servizi correlati).
- Ritmo verticale con `--section-y` (72-144 px) e alternanza di superfici: carta → bianco → inchiostro → carta → pietra → blu → inchiostro (footer).
- Occhielli numerati ("01 · Il contesto") con il pixel magenta: guidano la lettura come i capitoli di un report.

## 6. Immagini e iconografia

**Scelta attuale:** nessuna foto stock. Le immagini del sito attuale sono generiche e non autentiche, quindi sono state sostituite da:

1. **Campo di pixel** (`PixelField.astro`): composizioni generate in fase di build, ognuna con un significato (vedi tabella).
2. **Pittogrammi a pixel 3×3** (`PixelGlyph.astro`) per i concetti (filiera, rete, co-investimento, misura…).
3. **Icone lineari** (`Icon.astro`): griglia 24 px, tratto 1,75 px, terminazioni squadrate, solo dove servono alla funzione (frecce, email, menu).

| Composizione | Significato | Dove |
|---|---|---|
| hero | Filari che diventano pixel: la filiera letta dal digitale | Home |
| ecommerce | Assortimento ordinato e flusso degli ordini | E-commerce |
| food | Un nucleo di valore che si diffonde | Food marketing |
| ads | Anelli concentrici verso un obiettivo | Digital advertising |
| network | Più competenze collegate a un centro | Network |
| about | Filari che si dissolvono | Chi siamo |
| careers | Colonne che crescono | Lavora con noi |

### Brief fotografico (fase P1)
Obiettivo: mostrare persone e luoghi reali, non simboli.
- **Soggetti:** il team al lavoro (riunioni, analisi, schermi con dati reali o anonimizzati); luoghi di produzione dei clienti, con autorizzazione (caseifici, cantine, frantoi, laboratori, magazzini, mercati); dettagli di prodotto, packaging ed etichette; mani al lavoro.
- **Stile:** luce naturale, colori fedeli e leggermente desaturati, inquadrature documentarie, nessuna posa artificiale; spazio negativo per i testi.
- **Formati:** orizzontale 3:2 e verticale 4:5, almeno 2400 px sul lato lungo; consegna in JPG di alta qualità, ottimizzati poi in AVIF/WebP dalla build.
- **Divieti:** stock generico, immagini generate con AI, foto di clienti o persone senza liberatoria.
- **Dove usarle:** Chi siamo (team), casi studio (contesto), un'immagine per servizio.

## 7. Movimento

- Comparsa dei contenuti sotto la piega: opacità e spostamento di 14 px, 640 ms, una sola volta per elemento, con un piccolo ritardo a cascata.
- Hero: i pixel compaiono in sequenza dal campo verso il dato (circa 900 ms totali), solo al caricamento.
- Microinterazioni: frecce che avanzano di 3-4 px, sottolineature che si estendono, loghi che passano da grigio a colore.
- **Nessun** parallax, scroll hijacking, loop continui o librerie di animazione.
- `prefers-reduced-motion: reduce`: tutte le animazioni vengono annullate; senza JavaScript i contenuti restano visibili.

## 8. Design system (fondamenti e componenti)

**Fondamenti:** `src/styles/tokens.css` (colori, tipografia, spaziature, raggi, ombre, movimento, livelli) e `src/styles/global.css` (reset, base, layout, pulsanti, link, utilità).

| Token | Valori |
|---|---|
| Spaziature | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px |
| Breakpoint | 40rem (640) · 48rem (768) · 64rem (1024) · 80rem (1280) |
| Raggi | 2 px (controlli) · 4 px. Volutamente minimi, coerenti con il pixel |
| Ombre | Una sola (`--shadow-pop`) per i pannelli sovrapposti |
| Focus | Contorno 2 px magenta, offset 3 px; bianco su blu, magenta chiaro su inchiostro |
| Durate | 160 ms (micro) · 280 ms (UI) · 640 ms (comparse) |

### Componenti e stati

| Componente | File | Stati gestiti |
|---|---|---|
| Header + menu a tendina | `Header.astro`, `scripts/nav.ts` | default, hover, focus, attivo (pagina corrente: filetto magenta), aperto/chiuso, Esc |
| Menu mobile | `Header.astro` | aperto/chiuso, contenuto esterno inerte, focus intrappolato, Esc, chiusura automatica oltre 1024 px |
| Pulsanti | `.btn`, `.btn--outline`, `.btn--light`, `.btn--outline-light`, `.btn--sm` | default, hover (blu), active (blu scuro), focus, disabled, caricamento (pixel lampeggianti) |
| Link con freccia | `.link-arrow` | default, hover (sottolineatura e freccia), focus |
| Elenco servizi | `ServiceRows.astro` | riga interamente cliccabile, hover, focus sulla riga |
| Intestazione di sezione | `SectionHead.astro` | — |
| Hero interno | `PageHero.astro` | con o senza composizione |
| Passaggi numerati | `Steps.astro` | varianti chiaro, inchiostro, blu |
| Logo wall | `LogoWall.astro` | grigio → colore all'hover/focus, cella "+N organizzazioni", link esterni segnalati |
| FAQ | `Faq.astro` | `<details>` nativo: aperto/chiuso, hover, focus |
| Percorso | `Breadcrumbs.astro` | pagina corrente `aria-current` |
| Modulo | `ContactForm.astro` | default, hover, focus, errore (bordo e segno rosso + messaggio), disabled, invio in corso, successo, errore di rete |
| Chiusura CTA | `CtaBand.astro` | — |
| Footer | `Footer.astro` | social mostrati solo se configurati |
