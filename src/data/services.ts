/**
 * Servizi di Abilita.
 *
 * Le attività di ogni servizio sono quelle elencate sul sito attuale [V].
 * Titoli, descrizioni, benefici, processi e FAQ sono copy nuovo [P]: non contengono
 * risultati, numeri o clienti non verificati. Le risposte segnate [C] vanno confermate.
 */

export type ServiceSlug = 'e-commerce' | 'food-marketing' | 'digital-advertising';

export interface Service {
  slug: ServiceSlug;
  number: string;
  name: string;
  navDescription: string;
  pattern: 'ecommerce' | 'food' | 'ads';
  seo: { title: string; description: string };
  home: { tagline: string; forWho: string };
  hero: { title: string; lead: string };
  challenge: { title: string; body: string[] };
  capabilities: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  related: { slugs: ServiceSlug[]; text: string };
  faq: { q: string; a: string }[];
  /** Sezione "In pratica" con mockup illustrativo [P] */
  practice: { title: string; text: string };
  cta: { label: string; title: string; text: string };
}

export const services: Service[] = [
  {
    slug: 'e-commerce',
    number: '01',
    name: 'E-commerce',
    navDescription: 'Siti di vendita, marketplace, pagamenti e logistica',
    pattern: 'ecommerce',
    seo: {
      title: 'E-commerce per aziende agroalimentari | Abilita',
      description:
        'Siti e-commerce su misura, marketplace, pagamenti sicuri, logistica e assistenza continua per imprese agroalimentari, cooperative e consorzi.',
    },
    home: {
      tagline: 'Vendere online, con canali propri e marketplace.',
      forWho: 'Per chi vuole un canale di vendita diretto e sotto controllo.',
    },
    hero: {
      title: 'Vendere online, <em>alle tue condizioni</em>.',
      lead: 'Progettiamo e gestiamo canali di vendita digitali per le aziende della filiera agroalimentare: dal sito e-commerce su misura ai marketplace, con pagamenti, logistica e assistenza integrati.',
    },
    challenge: {
      title: 'Vendere online non significa solo aprire un negozio.',
      body: [
        'Un e-commerce che funziona tiene insieme catalogo, pagamenti, spedizioni, scorte e assistenza. Per chi vende prodotti alimentari si aggiungono stagionalità, conservazione e confezionamento.',
        'Se uno di questi elementi non regge, il cliente se ne accorge al primo ordine. Per questo progettiamo il canale nel suo insieme, non solo il sito.',
      ],
    },
    capabilities: [
      { title: 'Siti e-commerce su misura', text: 'Piattaforme intuitive e funzionali, progettate sulle caratteristiche dei tuoi prodotti, dei tuoi clienti e del tuo modo di lavorare.' },
      { title: 'Marketplace', text: 'Ottimizziamo e gestiamo la tua presenza sui marketplace, per raggiungere nuovi clienti dove già fanno acquisti.' },
      { title: 'Pagamenti sicuri', text: 'Integriamo sistemi di pagamento affidabili: acquisti semplici per il cliente, incassi protetti per te.' },
      { title: 'Logistica e gestione delle scorte', text: 'Soluzioni per tenere sotto controllo disponibilità, magazzino e spedizioni.' },
      { title: 'Assistenza continua', text: 'Dopo la messa online restiamo al tuo fianco con supporto tecnico, aggiornamenti e miglioramenti.' },
    ],
    benefits: [
      { title: 'Un canale diretto', text: 'Un rapporto con i clienti che non passa solo dagli intermediari.' },
      { title: 'Più controllo', text: 'Su prezzi, assortimento, comunicazione e dati di vendita.' },
      { title: 'Un sistema che cresce', text: 'Sito, marketplace e logistica collegati, pronti ad accogliere nuovi prodotti e nuovi mercati.' },
    ],
    process: [
      { title: 'Analisi', text: 'Prodotti, clienti, canali attuali e concorrenti.' },
      { title: 'Progetto', text: 'Piattaforma, catalogo, pagamenti, logistica e integrazioni.' },
      { title: 'Messa online', text: 'Sviluppo, test e avvio delle vendite.' },
      { title: 'Gestione e crescita', text: 'Assistenza, marketplace e ottimizzazione continua.' },
    ],
    practice: {
      title: 'Un negozio che <em>lavora per te</em>.',
      text: 'Catalogo, schede prodotto, carrello, pagamenti e ordini collegati in un unico sistema, sul tuo sito e sui marketplace.',
    },
    related: {
      slugs: ['digital-advertising', 'food-marketing'],
      text: 'Un e-commerce rende di più con visite qualificate e un prodotto ben posizionato.',
    },
    faq: [
      { q: 'Potete partire da zero?', a: 'Sì. Possiamo accompagnarti dalla scelta della piattaforma alla messa online, passando per catalogo, pagamenti e spedizioni.' },
      { q: 'Gestite anche i marketplace?', a: 'Sì. Ci occupiamo dell’ottimizzazione e della gestione della presenza sui marketplace, insieme al tuo sito o come canale autonomo.' },
      { q: 'Cosa succede dopo la messa online?', a: 'Offriamo assistenza e supporto tecnico continuo: aggiornamenti, interventi e miglioramenti nel tempo.' },
      { q: 'Quanto costa un progetto e-commerce?', a: 'Dipende da catalogo, integrazioni e canali coinvolti. Dopo un primo confronto prepariamo una proposta dettagliata, con attività e costi chiari.' },
    ],
    cta: {
      label: 'Parliamo del tuo e-commerce',
      title: 'Hai un progetto di vendita online?',
      text: 'Raccontaci prodotti, canali attuali e obiettivi: partiamo da lì.',
    },
  },
  {
    slug: 'food-marketing',
    number: '02',
    name: 'Food marketing',
    navDescription: 'Analisi di mercato, posizionamento, contenuti e media',
    pattern: 'food',
    seo: {
      title: 'Food marketing: posizionamento e brand | Abilita',
      description:
        'Analisi di mercato, branding e posizionamento, storytelling, social media e relazioni con i media per prodotti agroalimentari, consorzi e cooperative.',
    },
    home: {
      tagline: 'Dare al prodotto il posizionamento che merita.',
      forWho: 'Per chi ha un prodotto di qualità e vuole che il mercato lo riconosca.',
    },
    hero: {
      title: 'Il valore del tuo prodotto, <em>riconosciuto dal mercato</em>.',
      lead: 'Costruiamo strategie di food marketing a partire dall’analisi del mercato: posizionamento, contenuti e relazioni con i media che spiegano perché il tuo prodotto merita di essere scelto.',
    },
    challenge: {
      title: 'Se il mercato non vede la differenza, sceglie il prezzo.',
      body: [
        'Origine, qualità e metodo di produzione sono un patrimonio. Ma senza un posizionamento chiaro e un racconto coerente su tutti i canali, restano invisibili a chi compra.',
        'Il food marketing serve a rendere evidente quel valore, con argomenti credibili e verificabili.',
      ],
    },
    capabilities: [
      { title: 'Analisi di mercato e benchmarking', text: 'Studiamo mercato, concorrenti e pubblico per individuare lo spazio in cui il tuo prodotto può distinguersi.' },
      { title: 'Branding e posizionamento', text: 'Definiamo identità, promessa e messaggi chiave del marchio, coerenti con il prodotto e con il mercato.' },
      { title: 'Content marketing e storytelling', text: 'Raccontiamo origine, persone e metodo di produzione con contenuti che informano e convincono.' },
      { title: 'Campagne sui social media', text: 'Pianifichiamo e gestiamo campagne pubblicitarie sui social, allineate al posizionamento.' },
      { title: 'Media relations e PR', text: 'Curiamo le relazioni con i media per dare visibilità a prodotti, progetti e novità.' },
    ],
    benefits: [
      { title: 'Un posizionamento chiaro', text: 'Sai a chi ti rivolgi, con quali argomenti e rispetto a quali concorrenti.' },
      { title: 'Un racconto coerente', text: 'Lo stesso messaggio, adattato a ogni canale: sito, social, stampa, punto vendita.' },
      { title: 'Scelte basate sui dati', text: 'Analisi di mercato e risultati delle campagne orientano le decisioni successive.' },
    ],
    process: [
      { title: 'Ascolto e analisi', text: 'Prodotto, mercato, concorrenti e pubblico.' },
      { title: 'Strategia di marca', text: 'Posizionamento, messaggi e priorità di canale.' },
      { title: 'Contenuti e campagne', text: 'Storytelling, social e relazioni con i media.' },
      { title: 'Verifica', text: 'Misura dei risultati e aggiornamento del piano.' },
    ],
    practice: {
      title: 'Un’identità <em>riconoscibile</em>.',
      text: 'Posizionamento, etichetta, palette e tono di voce: ogni punto di contatto racconta lo stesso valore, dal sito ai social.',
    },
    related: {
      slugs: ['digital-advertising', 'e-commerce'],
      text: 'Un posizionamento chiaro rende più efficaci campagne e vendite online.',
    },
    faq: [
      { q: 'Lavorate anche con consorzi e organizzazioni di produttori?', a: 'Sì. Abbiamo lavorato con consorzi, cooperative e organizzazioni di produttori, oltre che con singole imprese.' },
      { q: 'Da dove si comincia?', a: 'Da un’analisi del mercato e del posizionamento attuale: indica dove si trova il valore del prodotto e quali argomenti usare.' },
      { q: 'Vi occupate anche delle campagne a pagamento?', a: 'Sì. Le campagne sui social fanno parte del food marketing; per motori di ricerca, programmatic ed email marketing c’è il servizio di digital advertising.' },
    ],
    cta: {
      label: 'Parliamo del tuo brand',
      title: 'Vuoi che il mercato riconosca il valore del tuo prodotto?',
      text: 'Partiamo da un confronto su prodotto, mercato e obiettivi.',
    },
  },
  {
    slug: 'digital-advertising',
    number: '03',
    name: 'Digital advertising',
    navDescription: 'Campagne su motori di ricerca, social, programmatic ed email',
    pattern: 'ads',
    seo: {
      title: 'Digital advertising per l’agroalimentare | Abilita',
      description:
        'Campagne Google Ads e Microsoft Advertising, social, programmatic, email marketing e remarketing, con obiettivi chiari e misurazione continua.',
    },
    home: {
      tagline: 'Raggiungere chi può comprare, misurando ogni investimento.',
      forWho: 'Per chi vuole sapere cosa rende ogni euro investito.',
    },
    hero: {
      title: 'Pubblicità digitale che risponde <em>a un obiettivo</em>.',
      lead: 'Campagne su motori di ricerca, social e circuiti programmatic, email marketing e remarketing: scegliamo canali e pubblici in base ai tuoi obiettivi e misuriamo ogni passaggio.',
    },
    challenge: {
      title: 'Senza obiettivi e misurazione, la pubblicità è solo una spesa.',
      body: [
        'Il problema raramente è il canale. Più spesso mancano un obiettivo chiaro, un pubblico definito e dati affidabili per decidere dove investire.',
        'Per questo ogni campagna parte da un obiettivo di business e da indicatori condivisi, e viene ottimizzata mentre è attiva.',
      ],
    },
    capabilities: [
      { title: 'Google Ads e Microsoft Advertising', text: 'Campagne sui motori di ricerca per intercettare chi sta già cercando prodotti come i tuoi.' },
      { title: 'Social media advertising', text: 'Campagne sulle piattaforme social, con pubblici costruiti su interessi, comportamenti e aree geografiche.' },
      { title: 'Programmatic advertising', text: 'Acquisto automatizzato di spazi pubblicitari su siti e app, per ampliare la copertura in modo controllato.' },
      { title: 'Email marketing e automazione', text: 'Comunicazioni e flussi automatici per mantenere vivo il rapporto con clienti e contatti.' },
      { title: 'Remarketing e retargeting', text: 'Messaggi mirati a chi ha già mostrato interesse, per riportarlo verso l’acquisto.' },
    ],
    benefits: [
      { title: 'Obiettivi espliciti', text: 'Ogni campagna nasce da un obiettivo e da indicatori concordati.' },
      { title: 'Investimenti tracciabili', text: 'Sai quanto spendi, dove e con quali risultati.' },
      { title: 'Ottimizzazione continua', text: 'Le campagne si correggono sui dati, non sulle impressioni.' },
    ],
    process: [
      { title: 'Obiettivo', text: 'Cosa vogliamo ottenere e come lo misuriamo.' },
      { title: 'Pubblico', text: 'Chi vogliamo raggiungere, dove e quando.' },
      { title: 'Campagna', text: 'Canali, messaggi, budget e calendario.' },
      { title: 'Misura e ottimizzazione', text: 'Monitoraggio, report e correzioni continue.' },
    ],
    practice: {
      title: 'Ogni campagna, <em>sotto controllo</em>.',
      text: 'Obiettivo, pubblico e canali in un unico report, aggiornato e leggibile: sai dove va il budget e che cosa produce.',
    },
    related: {
      slugs: ['e-commerce', 'food-marketing'],
      text: 'Le campagne rendono di più quando portano a un e-commerce efficace e a un messaggio chiaro.',
    },
    faq: [
      { q: 'Garantite un numero di vendite o di contatti?', a: 'No: nessuno può garantirlo seriamente. Ci impegniamo su obiettivi chiari, misurazione trasparente e ottimizzazione continua.' },
      { q: 'Che budget serve per iniziare?', a: 'Dipende da obiettivi, mercato e canali. Lo definiamo insieme, partendo da un investimento sostenibile e misurabile.' },
      { q: 'Su quali piattaforme lavorate?', a: 'Motori di ricerca (Google Ads e Microsoft Advertising), piattaforme social, circuiti programmatic e strumenti di email marketing.' },
    ],
    cta: {
      label: 'Parliamo delle tue campagne',
      title: 'Vuoi investire in pubblicità con obiettivi chiari?',
      text: 'Raccontaci cosa vuoi ottenere: definiamo insieme canali, pubblico e indicatori.',
    },
  },
];

export const getService = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;

/** Opzioni del campo "Ambito di interesse" del modulo di contatto. */
export const inquiryTopics = [
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'food-marketing', label: 'Food marketing' },
  { value: 'digital-advertising', label: 'Digital advertising' },
  { value: 'progetto-integrato', label: 'Progetto integrato (più ambiti)' },
  { value: 'partnership', label: 'Partnership e collaborazioni' },
  { value: 'altro', label: 'Altro' },
] as const;
