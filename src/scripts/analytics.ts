/**
 * Misurazione rispettosa della privacy.
 *
 * - Nessuno strumento è attivo per impostazione predefinita.
 * - Se PUBLIC_ANALYTICS_DOMAIN è configurato, lo script (es. Plausible) viene caricato
 *   solo dopo il consenso alla finalità "misurazione" espresso tramite iubenda
 *   (evento "abilita:consent"), oppure subito se il banner iubenda è disattivato.
 * - Gli eventi sono dichiarati nel markup con data-track e data-track-props.
 */
type Props = Record<string, string | number | boolean>;
type PlausibleFn = (event: string, options?: { props?: Props }) => void;
declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

export function track(event: string, props: Props = {}) {
  try {
    window.plausible?.(event, { props });
  } catch {
    /* la misurazione non deve mai interrompere l'interazione */
  }
}

function loadScript(domain: string, src: string) {
  if (document.querySelector('script[data-analytics]')) return;
  // Coda degli eventi registrati prima del caricamento dello script
  window.plausible = window.plausible || Object.assign(
    function (...args: unknown[]) { (window.plausible!.q = window.plausible!.q || []).push(args); },
    {},
  ) as PlausibleFn;
  const s = document.createElement('script');
  s.defer = true;
  s.src = src;
  s.dataset.domain = domain;
  s.dataset.analytics = '';
  document.head.appendChild(s);
}

export function initAnalytics(opts: { domain: string; src: string; consentViaIubenda: boolean }) {
  // Tracciamento dichiarativo dei clic (funziona anche se lo script non è caricato: no-op)
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
    if (!el) return;
    let props: Props = {};
    try {
      props = el.dataset.trackProps ? JSON.parse(el.dataset.trackProps) : {};
    } catch {
      props = {};
    }
    track(el.dataset.track!, props);
  });

  if (!opts.domain) return;
  if (!opts.consentViaIubenda) {
    loadScript(opts.domain, opts.src);
    return;
  }
  const onConsent = (e: Event) => {
    const allowed = (e as CustomEvent<{ measurement: boolean }>).detail?.measurement;
    if (allowed) loadScript(opts.domain, opts.src);
  };
  document.addEventListener('abilita:consent', onConsent);
  // Il consenso potrebbe essere già stato espresso prima dell'esecuzione di questo modulo
  const early = (window as unknown as { __abilitaConsent?: { measurement: boolean } }).__abilitaConsent;
  if (early?.measurement) loadScript(opts.domain, opts.src);
}
