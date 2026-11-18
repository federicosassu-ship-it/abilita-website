# Abilita — nuovo sito web

Redesign completo di [www.abilita.biz](https://www.abilita.biz): audit, strategia, direzione creativa e sviluppo di un sito multipagina, accessibile e veloce per **Abilita S.r.l.s.**, partner di strategia, e-commerce, food marketing e digital advertising per la filiera agroalimentare.

> **"Aiutiamo chi produce bene a vendere meglio."**

## In breve

| | Sito attuale | Nuovo sito |
|---|---|---|
| Struttura | 1 pagina con ancore | 9 pagine indicizzabili + pagine di servizio |
| Peso della home | 8,1 MB | ~0,3 MB |
| Lighthouse mobile (Perf · A11y · SEO) | 65 · 84 · 67 | 95–98 · 100 · 100 |
| LCP mobile | 6,0 s | ~2,1 s |
| Modulo di contatto | Senza destinazione né informativa | Validazione accessibile, anti-spam, gestore PHP testato |
| Titoli H1-H6, testi alternativi, meta | Assenti | Completi |

Dettagli e limiti in [`docs/06-qa-e-validazione.md`](docs/06-qa-e-validazione.md).

## Documentazione

1. [Audit del sito attuale](docs/01-audit.md): valutazione, punti di forza, debolezze, matrice delle priorità
2. [Strategia](docs/02-strategia.md): fatti verificati, pubblico, posizionamento, architettura, conversione, misurazione
3. [Direzione creativa e design system](docs/03-direzione-creativa.md): concetto, logo, colore, tipografia, layout, immagini, movimento, componenti
4. [Contenuti, UX e SEO](docs/04-contenuti-ux-seo.md): mappa del sito, percorsi, CTA, microcopy, metadati, parole chiave, redirect
5. [Tecnica, deploy e manutenzione](docs/05-tecnico-e-deploy.md)
6. [QA e validazione](docs/06-qa-e-validazione.md)
7. [Contenuti mancanti, decisioni e verifiche legali](docs/07-contenuti-mancanti-e-domande.md) ← **da leggere prima della pubblicazione**

## Avvio rapido

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # sito statico in dist/
```

Requisiti: Node 22.23 o successivo. Per pubblicare su Aruba: carica `dist/` (con `.htaccess`) nella cartella pubblica; procedura completa in `docs/05`.

## Stack

Astro 7 (sito statico) · TypeScript · CSS con design token · font self-hosted (Fraunces, Instrument Sans) · gestore PHP per il modulo · iubenda per il consenso · nessun tracciamento attivo di default.

## Stato

- ✅ Sito completo, testato (build, tipi, axe, E2E, gestore del modulo, responsive, Lighthouse)
- ⏳ **Da approvare:** posizionamento, architettura multipagina, evoluzione visiva (vedi `docs/07` §1)
- ⏳ **Da fornire:** casi studio, team, social, conferma dei dati societari e della sede (vedi `docs/07` §2-3)
- ⏳ **Da verificare con un professionista:** privacy policy, banner cookie, informativa del modulo (vedi `docs/07` §4)

Legenda usata nel codice e nei documenti: **[V]** verificato sul sito attuale · **[P]** proposta · **[C]** da confermare.
