# 07 — Contenuti mancanti, decisioni da approvare e verifiche legali

Il sito è completo e pubblicabile con i contenuti verificati disponibili. Gli elementi qui sotto lo rendono più credibile e vanno forniti o confermati da Abilita. **Nessuno di questi contenuti è stato inventato.**

## 1. Decisioni strategiche da approvare
1. **Posizionamento verticale** sulla filiera agroalimentare e titolo "Aiutiamo chi produce bene a vendere meglio".
2. **Sito multipagina** al posto della pagina unica.
3. **Co-investimento e finanza agevolata** come leve di differenziazione in home, servizi e chi siamo.
4. **Evoluzione visiva:** logo invariato, nuova palette di supporto, tipografia editoriale, niente foto stock.
5. **Hosting:** restare su Aruba (raccomandato) o passare a Netlify o Cloudflare Pages.

## 2. Domande essenziali
| # | Domanda | Perché conta | Dove incide |
|---|---|---|---|
| 1 | La sede legale è **Via Cannas 3, Carbonia** (sito) o **Corso Vittorio Emanuele 123, Cagliari** (privacy policy)? Esiste una sede operativa? | Correttezza dei dati societari e della privacy | Footer, Chi siamo, Contatti, dati strutturati |
| 2 | Per ciascuna delle 11 organizzazioni del logo wall: **cliente, partner o collaborazione su progetto**? Possiamo citarle e raccontare cosa avete fatto? | Prova sociale e casi studio | Home, Network, futuri Progetti |
| 3 | **Co-investimento e finanza agevolata:** con quali criteri e strumenti (bandi regionali, nazionali, europei)? Va comunicato come servizio? | È il differenziatore più forte: va descritto con precisione | Home, Servizi, Chi siamo |
| 4 | **Profili social** reali (Instagram, Facebook, LinkedIn)? Oggi le icone puntano a "#" | Link morti, credibilità | Footer |
| 5 | **Team:** nomi, ruoli, foto, competenze dei soci e collaboratori principali? | Fiducia (E-E-A-T) | Chi siamo |
| 6 | **Tempo di risposta** che il team può garantire alle richieste? | Riduce l'incertezza e aumenta i contatti | Contatti |
| 7 | **REA con sigla della provincia** (es. CA-306138), **capitale sociale**, **PEC**? | Obblighi informativi delle società (art. 2250 c.c.) | Footer |
| 8 | Si vuole uno strumento di **analytics** (consigliato Plausible o Matomo)? | Misurare le conversioni | Configurazione |

## 3. Contenuti da produrre
| Contenuto | Priorità | Note |
|---|---|---|
| 2-3 casi studio verificati (sfida, soluzione, contributo, risultati con fonte, autorizzazione) | Alta | Modello pronto in `src/content/progetti/_modello-caso-studio.md` |
| Servizio fotografico (team e contesti reali) | Media | Brief in `03-direzione-creativa.md` §6 |
| Logo vettoriale originale (AI/SVG/PDF) | Media | Oggi è vettorializzato dal PNG |
| Biografie del team | Media | Pagina Chi siamo |
| Testimonianze (solo autentiche, con consenso scritto) | Media | Nessuna presente oggi |
| Testo descrittivo per ciascuna organizzazione del network | Bassa | Solo dopo la risposta alla domanda 2 |

## 4. Verifiche legali e privacy (da affidare a un professionista)
- [ ] **Indirizzo del titolare** nella privacy policy iubenda (Cagliari, CAP "0912" incompleto) diverso dalla sede legale del sito.
- [ ] **Privacy policy incompleta:** non elenca dati raccolti né finalità. Vanno aggiunti almeno: modulo di contatto, contatti via email e WhatsApp, candidature spontanee (CV), dati di navigazione ed eventuale analytics.
- [ ] **Banner cookie:** dichiara finalità di "misurazione" e "marketing (annunci personalizzati)", mentre la cookie policy indica solo strumenti tecnici. Il nuovo sito non usa né cookie di profilazione né strumenti di terze parti (font locali): valutare se il banner sia ancora necessario e allineare la configurazione iubenda agli strumenti effettivamente usati.
- [ ] **Informativa accanto al modulo:** testo breve proposto ("Usiamo i tuoi dati solo per rispondere alla richiesta…") con link alla policy, senza casella di consenso obbligatoria (base giuridica: risposta a una richiesta dell'interessato). Da confermare.
- [ ] **Dati societari obbligatori** nel footer (REA completo, capitale sociale, PEC se indicata).
- [ ] **Uso dei loghi di terzi:** già pubblicati sul sito attuale; confermare l'autorizzazione.
- [ ] **Analytics:** prima di attivarli, confermare se serve il consenso per lo strumento scelto.

## 5. Contenuti segnati come "da confermare" nel codice
Cercare `[C]` nei file `src/data/*.ts` e nei commenti delle pagine. In sintesi:
- metodo in quattro fasi (`src/data/method.ts`): formalizza attività già dichiarate, da validare con il team;
- risposte delle FAQ, in particolare "Garantite un numero di vendite?" (impegno su obiettivi, misurazione e ottimizzazione);
- interpretazione del nome ("Abilitare: rendere possibile") nella pagina Chi siamo;
- descrizioni dei profili ricercati in Lavora con noi (gli ambiti sono verificati, le descrizioni sono proposte).
