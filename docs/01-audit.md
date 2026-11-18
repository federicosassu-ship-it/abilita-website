# 01 — Audit del sito attuale

**Oggetto:** https://www.abilita.biz/ · **Data:** 18 novembre 2026
**Metodo:** analisi del codice sorgente (HTML, CSS, JS), rendering con Chromium a 320, 390, 768, 1024, 1440 e 1920 px, scansione di accessibilità con axe-core 4.10, Lighthouse 12 (mobile e desktop), lettura delle policy iubenda collegate.

**Legenda:** **[V]** verificato direttamente · **[I]** ipotesi che richiede accesso tecnico o conferma dell'azienda.

> Limiti dichiarati. Il modulo di contatto **non è stato inviato** per non generare messaggi reali: il funzionamento lato server non è verificato. I test di performance sono misure di laboratorio, una sola esecuzione, da un container cloud dietro proxy: i valori sono indicativi. Il redirect da `http://` a `https://` non era verificabile dall'ambiente di test. Alcune richieste automatiche hanno ricevuto risposte 502 dal firewall Aruba (WAF): l'effetto sugli utenti reali non è verificabile.

---

## 1. Valutazione sintetica

Il sito attuale dice molte cose giuste, ma nel modo e nell'ordine sbagliati.

1. **L'offerta c'è, il posizionamento no.** Il titolo principale ("Tecnologia che semplifica e fa crescere le imprese") potrebbe appartenere a qualunque software house. La specializzazione nella filiera agroalimentare, che è il vero vantaggio competitivo, compare solo nel secondo blocco, in corpo piccolo. [V]
2. **Gli elementi di differenziazione più forti sono nascosti.** Co-investimento nei progetti strategici, ricerca di finanza agevolata e una rete di partner che include una cooperativa di produttori, un consorzio di tutela DOP e un'università sono citati in una riga o in fondo alla pagina. [V]
3. **Il linguaggio indebolisce la credibilità.** Metafore enfatiche ("sussurrare il tuo messaggio nell'orecchio", "cocktail irresistibile di tecnologie", "il pomodoro figlio prediletto del sole") sono distanti dal registro di un partner B2B. [V]
4. **Il sito è una sola pagina senza struttura semantica.** Non ci sono titoli H1-H6, i servizi non hanno pagine indicizzabili, gli URL di navigazione (`?p=…`) duplicano la home. [V]
5. **Le basi tecniche non reggono un uso professionale.** Pagina da 8,1 MB, immagini fino a 5 MB, nessuna meta description, nessun testo alternativo, form senza destinazione e senza informativa. [V]
6. **L'identità visiva ha un nucleo riconoscibile.** Il logotipo con la "A" che si scompone in pixel e il gradiente magenta→blu sono distintivi e meritano di essere preservati. Tutto il resto (foto stock, impaginazione ripetitiva, tipografia sottile) è sostituibile. [V]

**Diagnosi:** il problema principale non è estetico. È di **posizionamento e di architettura dell'informazione**. Il redesign deve rendere evidente in pochi secondi *per chi* lavora Abilita, *cosa cambia* per il cliente e *perché fidarsi*.

---

## 2. Punti di forza da preservare

| Elemento | Perché conservarlo | Fonte |
|---|---|---|
| Logotipo con "A" in pixel | Racconta già la trasformazione dall'analogico al digitale; è memorabile | [V] `media/logo_abilita_w.png`, favicon |
| Gradiente magenta `#E61873` → blu `#0F70B7` | Firma cromatica riconoscibile, da usare con più parsimonia | [V] CSS `.menufrm` |
| Focus dichiarato sulla filiera agroalimentare | Base del posizionamento | [V] Chi siamo, E-commerce, Lavora con noi |
| Tre servizi chiari con attività elencate | Offerta concreta e verificabile | [V] |
| Struttura "Un'impresa / Un team / Un partner / Un obiettivo comune" | Buona idea editoriale, da riscrivere | [V] |
| "Abbiamo lavorato con": 11 organizzazioni, tra cui Arborea Cooperativa Produttori, Consorzio Pecorino Romano, Università di Sassari | Prova sociale reale e coerente con il settore | [V] |
| Co-investimento e finanza agevolata | Differenziazione rara nel mercato delle agenzie | [V] Chi siamo, blocco 4 |
| Network di competenze ("hub strategico") | Spiega come una struttura agile gestisce progetti complessi | [V] Network |
| Canali diretti: WhatsApp, email generale, email partnership | Bassa frizione per il primo contatto | [V] Contatti |
| iubenda già configurato | Integrazione legittima da mantenere | [V] siteId 3743319, policy 55509982 |

---

## 3. Debolezze principali

### 3.1 Brand e posizionamento
- **Identità ambigua.** Le etichette generate via CSS alternano "Società di Food Marketing" e "Specialisti nella trasformazione digitale": il visitatore non capisce se Abilita sia un'agenzia di comunicazione o un integratore tecnologico. [V]
- **Proposta di valore generica above the fold.** Il titolo non nomina né il settore né il cliente. [V]
- **Cliché da agenzia.** "Non siamo una semplice agenzia, ma un hub strategico…", "soluzioni su misura", "a 360°" (implicito). [V]
- **Promesse non documentate.** "Risultati tangibili e misurabili" senza nessuna evidenza (casi, numeri, metodo). [V]
- **Gap tra capacità e comunicazione.** Il sito non spiega come Abilita costruisce il valore: metodo, deliverable, cosa succede dopo il contatto. [V]

### 3.2 Architettura dell'informazione
- Pagina unica con ancore; voci di menu come `?p=chi_siamo#chi_siamo` restituiscono la stessa pagina con URL diversi (contenuto duplicato, nessun canonical). [V]
- Nessuna pagina dedicata ai servizi: impossibile posizionarsi su ricerche specifiche come "e-commerce per aziende agricole" o "food marketing". [V]
- Il percorso logico è interrotto: la CTA del hero ("Scopri i nostri servizi") porta all'e-commerce, saltando Chi siamo; la CTA "Entriamo in contatto?" è l'unica in tutta la pagina oltre al form. [V]
- I loghi di "Abbiamo lavorato con" sono sotto "Network": la prova sociale arriva dopo 6.000 px di scroll. [V]
- Icone social collegate a `#`: link morti. [V]

### 3.3 UI design
- Tipografia: Montserrat in pesi sottili per i titoli (scarso contrasto percettivo) e Nunito caricato ma quasi inutilizzato; regola CSS non valida `font-weight: <weight>`. [V]
- Ritmo ripetitivo: ogni sezione ripete la stessa formula (occhiello + titolo maiuscolo + filetto + testo centrato + icone in cerchio). [V]
- Immagini stock generiche (donna con smartphone al mercato, bambina che pianta, volti al neon, telefono giallo con banane), alcune con resa da immagine generata: nessuna mostra un contesto reale di Abilita. [V visivo] [I: origine]
- Pulsanti piccoli e poco visibili (ghost button 1,2vw). [V]
- Due pulsanti flottanti sovrapposti in basso a destra ("↑ top" e iubenda). [V]
- Menu mobile: le voci del sottomenu (E-Commerce, Food Marketing, Digital Advertising) sono blu su gradiente, praticamente illeggibili. [V] `docs/audit/attuale-mobile-menu.jpg`

### 3.4 UX e conversione
- Comprensione dell'offerta: servono più di 5 secondi e lo scroll per capire settore e servizi. [V]
- Form di contatto: 4 campi senza distinzione tra obbligatori e facoltativi, nessuna classificazione della richiesta, nessuna validazione, nessun messaggio di conferma o di errore, nessuna informativa privacy accanto al modulo. [V]
- Il `<form>` non ha `action` né `method`: il browser invia i dati in GET allo stesso URL, esponendo nome, email e messaggio nella barra degli indirizzi e nei log del server. [V markup] Non è verificabile se i messaggi arrivino a destinazione. [I]
- Su mobile il banner cookie copre l'intero viewport iniziale e intercetta il tocco sul pulsante del menu finché l'utente non sceglie. [V]
- Nessuna spiegazione di cosa succede dopo il contatto. [V]

### 3.5 Copywriting
| Problema | Esempio dal sito | Effetto |
|---|---|---|
| Titolo generico | "Tecnologia che semplifica e fa crescere le imprese" | Nessuna differenziazione |
| Metafore eccessive | "È la magia che fa sembrare un pomodoro il figlio prediletto del sole…" | Riduce la credibilità B2B |
| Iperbole | "Seducenti, sofisticate e impossibili da ignorare" | Promessa non dimostrabile |
| Cliché | "Non siamo una semplice agenzia" | Dichiara ciò che non si è, non ciò che si è |
| Ridondanza | "Specialisti nella trasformazione digitale" ripetuto in 2 sezioni | Rumore |
| CTA deboli | "Entriamo in contatto?", "INVIA" | Nessun beneficio, nessuna aspettativa |
| Inglese non necessario | "AI expert", "hub" | Registro incoerente |

### 3.6 Tecnico
| Area | Rilievo | Stato |
|---|---|---|
| Stack | HTML scritto a mano (BBEdit) con estensione PHP, hosting Aruba Linux, WAF Aruba attivo, header `server: aruba-proxy` | [V] |
| Peso pagina | 8.109 KiB, 49 richieste (Lighthouse mobile) | [V] |
| Immagini | `contatti.png` 5,0 MB mostrata a 660 px; `food_marketing.jpg` 3141 px di larghezza; logo PNG 2198 px mostrato a 170 px; risparmio stimato con formati moderni 6,4 MB | [V] |
| Font | Due famiglie Google Fonts complete con corsivi, caricate da server Google | [V] |
| JS | `js.js` con funzioni legacy (Netscape, `document.layers`) non usate; iframe nascosto che carica `pagine/process.php` (pagina vuota) a ogni visita | [V] |
| Cache | HTML con `cache-control: no-store`; nessun header HSTS | [V] |
| Errori | Con richieste ravvicinate il server ha risposto con CSS/JS in `text/plain` e con errori 502 (WAF) | [V nei test] [I: impatto reale] |
| Lighthouse mobile | Performance 65 · Accessibilità 84 · Best practice 96 · SEO 67 · FCP 2,9 s · **LCP 6,0 s** · TBT 320 ms · CLS 0 | [V lab] |
| Lighthouse desktop | Performance 79 · Accessibilità 84 · Best practice 96 · SEO 67 · LCP 2,4 s | [V lab] |

### 3.7 Accessibilità (axe-core, WCAG 2.2 AA + best practice)
- `html-has-lang` (grave): lingua del documento non dichiarata. [V]
- `image-alt` (critico): **34 immagini su 34** senza testo alternativo. [V]
- `label` (critico): 4 campi del form senza etichetta associata. [V]
- `link-name` (grave): 13 link senza testo accessibile (logo, social, loghi partner). [V]
- `page-has-heading-one`, `landmark-one-main`, `region`: nessun H1, nessun landmark `main`, contenuti fuori dai landmark. [V]
- Nessuno stile `:focus` nel CSS: il focus da tastiera dipende dal browser. [V]
- Testi importanti generati con `::before` (occhielli di sezione) non sempre letti dagli screen reader. [V]

### 3.8 SEO
- `<title>` = "Abilita"; nessuna meta description, nessun Open Graph, nessun dato strutturato. [V]
- `robots.txt` non valido: contiene solo un URL, senza direttive `User-agent` né `Sitemap:` (Lighthouse: "1 error found"). [V]
- Sitemap (`/pagine/sitemap.xml`) con un solo URL, `lastmod` 15/08/2024, `changefreq: always`. [V]
- Nessuna struttura di titoli: i motori non distinguono argomenti e gerarchia. [V]
- URL duplicati via `?p=` senza canonical. [V]
- Indicizzazione effettiva e query di ricerca: non verificabili senza accesso a Google Search Console. [I]

### 3.9 Privacy e conformità (da verificare con un professionista)
- **Indirizzo del titolare incoerente.** La privacy policy iubenda indica "Corso Vittorio Emanuele, 123 – 0912 Cagliari" (CAP di 4 cifre, probabilmente errato). Il sito indica come sede legale "Via Cannas 3, 09013 Carbonia". [V]
- **Policy incomplete.** La privacy policy non elenca tipologie di dati né finalità ("Il Titolare non fornisce una lista…"); non cita il modulo di contatto, WhatsApp né Google Fonts. [V]
- **Banner e cookie policy non allineati.** Il banner chiede il consenso per "misurazione" e "marketing (con annunci personalizzati)", mentre la cookie policy dichiara solo strumenti tecnici di prima parte. [V]
- **Font da server Google** senza menzione nelle policy (trasferimento dell'indirizzo IP a terzi). [V]
- **Dati societari nel footer:** presenti ragione sociale, P.IVA e REA. Il numero REA è indicato senza sigla della provincia; non sono indicati capitale sociale né PEC. [V] Obblighi specifici da confermare (art. 2250 c.c., art. 35 DPR 633/72). [I]

---

## 4. Opportunità strategiche

1. **Possedere una nicchia:** "il partner digitale della filiera agroalimentare" è un posizionamento credibile, coerente con clienti e collaborazioni già visibili.
2. **Trasformare il network in vantaggio:** un solo interlocutore che coordina specialisti è una risposta precisa alla frammentazione dei fornitori, un problema tipico delle PMI.
3. **Mettere in evidenza il co-investimento:** pochissimi concorrenti possono dire "quando il progetto è strategico anche per noi, ci mettiamo in gioco".
4. **Pagine di servizio indicizzabili** per intercettare ricerche specifiche (e-commerce agroalimentare, food marketing, advertising per prodotti alimentari).
5. **Casi studio reali** con le organizzazioni già presenti nel logo wall: il materiale di prova più convincente, oggi assente.
6. **Contatto qualificato:** un form breve con classificazione dell'ambito e una spiegazione dei passi successivi.

---

## 5. Matrice di priorità

Scala: ●●● alto · ●● medio · ● basso. Priorità: **P0** subito (incluso nel nuovo sito) · **P1** entro 3 mesi · **P2** evoluzione.

| # | Intervento | Impatto strategico | Impatto utente | Impatto conversione | Priorità |
|---|---|---|---|---|---|
| 1 | Nuovo posizionamento e messaggio above the fold | ●●● | ●●● | ●●● | P0 |
| 2 | Architettura multipagina (servizi indicizzabili) | ●●● | ●● | ●● | P0 |
| 3 | Riscrittura completa dei testi | ●●● | ●●● | ●●● | P0 |
| 4 | Form funzionante, breve, con informativa e feedback | ●● | ●●● | ●●● | P0 |
| 5 | Accessibilità WCAG 2.2 AA (semantica, alt, focus, contrasto) | ●● | ●●● | ●● | P0 |
| 6 | Performance (peso < 1 MB, font locali, immagini moderne) | ●● | ●●● | ●● | P0 |
| 7 | SEO tecnica (titoli, meta, sitemap, robots, dati strutturati, redirect) | ●●● | ● | ●● | P0 |
| 8 | Evoluzione dell'identità visiva (logo vettoriale, palette, tipografia) | ●●● | ●● | ●● | P0 |
| 9 | Allineamento policy privacy/cookie e indirizzo del titolare | ●● | ● | ● | P0, azione dell'azienda |
| 10 | 2-3 casi studio verificati | ●●● | ●● | ●●● | P1 |
| 11 | Fotografia autentica (persone, luoghi di produzione) | ●● | ●● | ●● | P1 |
| 12 | Pagina team con ruoli e competenze | ●● | ●● | ●● | P1 |
| 13 | Analytics rispettosi della privacy + Search Console | ●● | ● | ●● | P1 |
| 14 | Contenuti editoriali (guide, approfondimenti) per la SEO | ●● | ●● | ● | P2 |
| 15 | Servizio dedicato "Innovazione e finanza agevolata" | ●●● | ●● | ●● | P2, da validare |

---

## 6. Direzione del redesign (sintesi)

- **Messaggio:** dal generico "tecnologia per le imprese" al concreto "aiutiamo chi produce bene a vendere meglio".
- **Struttura:** da pagina unica a 9 pagine essenziali, ognuna con uno scopo e una CTA. Dettaglio in `02-strategia.md`.
- **Visual:** evoluzione, non rebranding. Logo vettorializzato, gradiente usato come firma, tipografia editoriale, sistema grafico derivato dai pixel del logo al posto delle foto stock. Dettaglio in `03-direzione-creativa.md`.
- **Tecnica:** sito statico (Astro), peso ridotto di oltre il 90%, form con gestore PHP compatibile con l'hosting Aruba attuale. Dettaglio in `05-tecnico-e-deploy.md`.

### Evidenze
- `docs/audit/attuale-desktop-above-the-fold.jpg`: hero con banner cookie
- `docs/audit/attuale-desktop-sezioni-1.jpg`, `-2.jpg`: sezioni desktop
- `docs/audit/attuale-mobile-banner-cookie.jpg`: banner a tutto schermo su mobile
- `docs/audit/attuale-mobile-menu.jpg`: sottomenu a basso contrasto
- `docs/audit/attuale-mobile-sezioni.jpg`: sezioni mobile
