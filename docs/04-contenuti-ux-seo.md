# 04 — Contenuti, UX e SEO

**Dove sono i testi:** tutto il copy è nel codice, in italiano e pronto per la produzione.
- Servizi (pagine, FAQ, CTA, voci di menu): `src/data/services.ts`
- Dati aziendali, contatti e navigazione: `src/data/site.ts`
- Metodo: `src/data/method.ts` · Organizzazioni: `src/data/partners.ts`
- Testi delle singole pagine: `src/pages/*.astro`
- Microcopy del modulo: `src/components/ContactForm.astro` e `src/scripts/contact-form.ts`

**Legenda:** **[V]** verificato sul sito attuale · **[P]** nuovo copy proposto · **[C]** da confermare.

---

## 1. Mappa del sito e percorsi

```
Home ─┬─ Servizi ─┬─ E-commerce
      │           ├─ Food marketing
      │           └─ Digital advertising
      ├─ Chi siamo (identità · nome · metodo · principi · esperienza · in breve)
      ├─ Network (vantaggi · ruoli · collaborazioni · partnership)
      ├─ Lavora con noi
      ├─ Contatti ─┬─ Grazie (noindex)
      │            └─ Errore (noindex)
      └─ [Progetti: generata solo con casi verificati]
```

| Percorso | Ingresso | Passi | Conversione |
|---|---|---|---|
| Imprenditore che cerca un e-commerce | Google → /servizi/e-commerce/ | sfida → attività → FAQ → CTA "Parliamo del tuo e-commerce" | Form con ambito già selezionato |
| Consorzio che valuta un partner | Passaparola → Home | hero → perché Abilita → esperienze → Chi siamo → Network | Form o email |
| Visitatore indeciso | Home | contesto → servizi → metodo → chiusura | Form / WhatsApp |
| Potenziale partner | Network | ruoli → collaborazioni → "Proponi una collaborazione" | Email partnership |
| Candidato | Lavora con noi | profili → offerta → come candidarsi | Email con oggetto precompilato |
| Vecchio link (`/?p=contatti`, `/#contatti`) | Link esterni o preferiti | redirect 301 (server) o script (home) | Pagina corretta |

## 2. Struttura delle pagine (ogni sezione risponde a una domanda)

**Home**
1. *Che cosa fate e per chi?* Hero: "Aiutiamo chi produce bene a vendere meglio." + CTA
2. *Perché dovrebbe interessarmi?* Contesto: trovare, capire, scegliere
3. *Che cosa fate in concreto?* Tre servizi con destinatari e attività
4. *Perché voi?* Quattro pilastri: filiera, strategia ed esecuzione, rete, co-investimento
5. *Come lavorate?* Quattro fasi
6. *Chi si è fidato di voi?* Tipologie di clienti + loghi verificati
7. *Che cosa faccio adesso?* Chiusura con "cosa succede dopo", WhatsApp ed email

**Pagina servizio:** hero con CTA contestuale → la sfida → cinque attività → cosa cambia per te → processo → servizi correlati → FAQ → chiusura.

**Chi siamo:** identità in quattro parole (struttura del sito attuale, riscritta) → il nome → metodo → principi → esperienza → dati in breve → chiusura.

**Network:** vantaggi → ruoli (tu, Abilita, la rete) → organizzazioni con link → partnership → chiusura.

**Contatti:** titolo e promessa → modulo → contatti diretti → cosa succede dopo.

**Lavora con noi:** profili (candidatura per ambito) → cosa offriamo → come candidarsi → rimando alle aziende.

## 3. Sistema di CTA

| Contesto | Etichetta | Destinazione |
|---|---|---|
| Header | Contattaci | /contatti/ |
| Hero home, footer, chiusure | Parliamo del tuo progetto | /contatti/ |
| Hero home (secondaria) | Scopri i servizi | /servizi/ |
| E-commerce | Parliamo del tuo e-commerce | /contatti/?ambito=e-commerce |
| Food marketing | Parliamo del tuo brand | /contatti/?ambito=food-marketing |
| Digital advertising | Parliamo delle tue campagne | /contatti/?ambito=digital-advertising |
| Elenco servizi | Scopri il servizio | pagina servizio |
| Chiusure | Scrivici su WhatsApp | wa.me/393701469970 |
| Network | Proponi una collaborazione | mailto:marketing@abilita.biz |
| Lavora con noi | Invia la tua candidatura · Candidati (per profilo) | mailto:info@abilita.biz con oggetto |
| 404 | Torna alla home | / |

## 4. Esperienza di contatto (microcopy)

| Elemento | Testo |
|---|---|
| Intro | Tutti i campi sono obbligatori, salvo dove indicato. |
| Campi | Nome e cognome · Email ("Ti risponderemo a questo indirizzo.") · Azienda o organizzazione (facoltativo) · Telefono (facoltativo, "Se preferisci essere richiamato.") · Ambito di interesse (facoltativo) · Messaggio ("Obiettivi, tempi, situazione attuale: bastano poche righe.") |
| Ambiti | E-commerce · Food marketing · Digital advertising · Progetto integrato (più ambiti) · Partnership e collaborazioni · Altro |
| Informativa | Usiamo i tuoi dati solo per rispondere alla richiesta, come descritto nella privacy policy. **[C]** |
| Pulsante | Invia la richiesta → Invio in corso… |
| Errori di campo | Inserisci nome e cognome. · Il nome sembra incompleto. · Inserisci il tuo indirizzo email. · Controlla l'indirizzo email (esempio: nome@azienda.it). · Inserisci un numero valido (solo cifre, spazi e +), oppure lascia vuoto il campo. · Scrivi qualche riga sul tuo progetto. · Aggiungi qualche dettaglio in più (almeno 10 caratteri). |
| Riepilogo | Il modulo non è stato inviato: c'è un campo da correggere. / …ci sono N campi da correggere. |
| Errore di rete | Non siamo riusciti a inviare il messaggio. Riprova tra qualche istante oppure scrivici direttamente a info@abilita.biz. |
| Limite | Hai inviato diverse richieste in poco tempo. Riprova tra qualche minuto… |
| Successo | Grazie, abbiamo ricevuto la tua richiesta. Ti risponderemo all'indirizzo [email] per fissare un primo confronto. |

**[C] Tempo di risposta:** il sito non promette tempi ("ti ricontattiamo"). Se il team può garantirlo, aggiungere ad esempio "entro due giorni lavorativi": riduce l'incertezza e aumenta le conversioni.

## 5. SEO

### Titoli e meta description

| Pagina | Title | Meta description |
|---|---|---|
| Home | Abilita \| E-commerce e marketing per l'agroalimentare | Strategia, e-commerce, food marketing e digital advertising per imprese agricole e alimentari, cooperative e consorzi. Un solo interlocutore, obiettivi misurabili. |
| Servizi | Servizi: e-commerce, food marketing e advertising \| Abilita | E-commerce, food marketing e digital advertising per la filiera agroalimentare: tre servizi che puoi attivare singolarmente o integrare in un unico progetto. |
| E-commerce | E-commerce per aziende agroalimentari \| Abilita | Siti e-commerce su misura, marketplace, pagamenti sicuri, logistica e assistenza continua per imprese agroalimentari, cooperative e consorzi. |
| Food marketing | Food marketing: posizionamento e brand \| Abilita | Analisi di mercato, branding e posizionamento, storytelling, social media e relazioni con i media per prodotti agroalimentari, consorzi e cooperative. |
| Digital advertising | Digital advertising per l'agroalimentare \| Abilita | Campagne Google Ads e Microsoft Advertising, social, programmatic, email marketing e remarketing, con obiettivi chiari e misurazione continua. |
| Chi siamo | Chi siamo \| Abilita, strategia e tecnologia per l'agroalimentare | Abilita affianca imprese, cooperative e consorzi della filiera agroalimentare con e-commerce, food marketing e digital advertising, coordinando una rete di specialisti. |
| Network | Network di competenze \| Abilita | Una rete di specialisti di marketing, trasformazione digitale e innovazione coordinata da Abilita: un solo interlocutore per progetti integrati nella filiera agroalimentare. |
| Contatti | Contatti \| Abilita | Scrivici per un primo confronto sul tuo progetto di e-commerce, food marketing o digital advertising. Modulo di contatto, email e WhatsApp. |
| Lavora con noi | Lavora con noi \| Abilita | Cerchiamo profili in digital marketing e advertising, content marketing, intelligenza artificiale, project management ed e-commerce management. Invia la tua candidatura. |

### Implementato
- Un H1 per pagina, gerarchia H2/H3 coerente, landmark (`header`, `nav`, `main`, `footer`).
- URL puliti in italiano con slash finale; canonical assoluti.
- `sitemap-index.xml` automatica (senza pagine di servizio come grazie, errore e 404); `robots.txt` valido con riferimento alla sitemap.
- Open Graph e Twitter Card con immagine dedicata per pagina (`public/og/`).
- Dati strutturati: `Organization` (tutte le pagine), `WebSite` (home), `Service` con catalogo delle attività (servizi), `BreadcrumbList` (pagine interne), `ContactPage`.
- Testi alternativi descrittivi per tutti i loghi; nessuna immagine con testo importante.
- Link interni contestuali tra servizi (correlati), da home e da chi siamo.
- `PUBLIC_NOINDEX=true` per le anteprime, così le copie di prova non vengono indicizzate.

### Strategia di parole chiave (senza stime di volume, da validare con Search Console)
| Cluster | Intento | Pagina |
|---|---|---|
| e-commerce agroalimentare · e-commerce per aziende agricole · vendere prodotti alimentari online · marketplace prodotti alimentari | Commerciale | E-commerce |
| food marketing · marketing agroalimentare · posizionamento prodotti alimentari · storytelling alimentare · marketing per consorzi | Commerciale / informativo | Food marketing |
| pubblicità online prodotti alimentari · Google Ads agroalimentare · advertising per aziende alimentari | Commerciale | Digital advertising |
| agenzia marketing agroalimentare Sardegna · e-commerce Sardegna · consulenza digitale agroalimentare | Locale | Home, Chi siamo |
| Abilita Carbonia · Abilita marketing | Brand | Home |

Prossimo passo P2: articoli e guide brevi per le query informative (per esempio "come vendere formaggi online", "marketing per consorzi di tutela"), solo con contenuti realmente utili.

### Conservazione della visibilità esistente
- Il sito attuale ha un solo URL reale (`/`) più varianti `?p=…` e ancore `#…`. Tutte sono reindirizzate:
  - **Server (Aruba/Apache):** redirect 301 in `public/.htaccess` (`/?p=chi_siamo` → `/chi-siamo/`, ecc.; `/pagine/sitemap.xml` → `/sitemap-index.xml`; `/pagine/process.php` → 410).
  - **Browser (qualsiasi hosting):** script nella home per `?p=` e per le ancore (`/#contatti` → `/contatti/`).
- Dopo la pubblicazione: inviare la nuova sitemap in Google Search Console, controllare la copertura e richiedere l'indicizzazione delle pagine servizio.
- [I] Indicizzazione attuale e query non verificabili senza accesso a Search Console.

## 6. Contenuti richiesti all'azienda
Vedi `07-contenuti-mancanti-e-domande.md`.
