/**
 * Percorso della pagina senza l'eventuale prefisso di base (usato solo nelle anteprime
 * in sottocartella). In produzione la base è "/" e il percorso resta invariato.
 */
export function pathWithoutBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (base && pathname.startsWith(base)) return pathname.slice(base.length) || '/';
  return pathname;
}
