/**
 * Dati aziendali e configurazione del sito.
 *
 * Legenda dei commenti:
 *  [V] verificato sul sito attuale (www.abilita.biz, novembre 2026)
 *  [C] da confermare con l'azienda prima della pubblicazione
 */

export const company = {
  name: 'Abilita', // [V]
  legalName: 'Abilita S.r.l.s.', // [V] footer: "Abilita Srls"
  vat: '03914010925', // [V] Partita IVA
  rea: '306138', // [V] — [C] sigla della provincia (es. "CA-306138")
  shareCapital: null as string | null, // [C] capitale sociale versato, da indicare se richiesto
  pec: null as string | null, // [C] PEC aziendale
  address: {
    street: 'Via Cannas 3', // [V] sede legale — [C] la privacy policy iubenda indica Cagliari
    postalCode: '09013', // [V]
    city: 'Carbonia', // [V]
    province: 'SU', // [C] provincia del Sud Sardegna
    region: 'Sardegna', // [V]
    country: 'IT',
  },
  email: 'info@abilita.biz', // [V]
  partnershipEmail: 'marketing@abilita.biz', // [V] "Partnership e Collaborazioni"
  careersEmail: 'info@abilita.biz', // [V] candidature
  whatsapp: {
    display: '+39 370 146 9970', // [V]
    e164: '393701469970',
  },
  social: {
    // [C] sul sito attuale le icone social puntano a "#": inserire gli URL reali per mostrarle
    instagram: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
  },
  foundingYear: null as number | null, // [C]
} as const;

export const whatsappUrl = `https://wa.me/${company.whatsapp.e164}`;

const env = import.meta.env;

/** Configurazione tecnica letta da variabili d'ambiente (vedi .env.example). */
export const config = {
  siteUrl: 'https://www.abilita.biz',
  formEndpoint: (env.PUBLIC_FORM_ENDPOINT as string | undefined) ?? '/api/contatto.php',
  iubenda: {
    siteId: (env.PUBLIC_IUBENDA_SITE_ID as string | undefined) ?? '3743319', // [V]
    cookiePolicyId: (env.PUBLIC_IUBENDA_COOKIE_POLICY_ID as string | undefined) ?? '55509982', // [V]
    banner: (env.PUBLIC_IUBENDA_BANNER ?? 'true') !== 'false',
  },
  analytics: {
    // Vuoto = nessun analytics. Esempio Plausible: PUBLIC_ANALYTICS_DOMAIN=abilita.biz
    domain: (env.PUBLIC_ANALYTICS_DOMAIN as string | undefined) ?? '',
    src: (env.PUBLIC_ANALYTICS_SRC as string | undefined) ?? 'https://plausible.io/js/script.js',
  },
  noindex: env.PUBLIC_NOINDEX === 'true',
};

export const legalLinks = {
  privacy: `https://www.iubenda.com/privacy-policy/${config.iubenda.cookiePolicyId}`,
  cookie: `https://www.iubenda.com/privacy-policy/${config.iubenda.cookiePolicyId}/cookie-policy`,
};

export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: 'Chi siamo', href: '/chi-siamo/' },
  { label: 'Network', href: '/network/' },
  { label: 'Lavora con noi', href: '/lavora-con-noi/' },
];

export const primaryCta = { label: 'Contattaci', href: '/contatti/' };
