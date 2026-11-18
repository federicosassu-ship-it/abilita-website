/**
 * Comparsa progressiva dei contenuti sotto la piega.
 * Gli elementi sono nascosti via CSS solo se JS è attivo (classe .js su <html>)
 * e solo se l'utente non ha richiesto movimento ridotto.
 */
export function initReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  items.forEach((el) => io.observe(el));
}
