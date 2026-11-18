import type { APIRoute } from 'astro';

/** robots.txt generato in build: con PUBLIC_NOINDEX=true (anteprime/staging) blocca l'indicizzazione. */
export const GET: APIRoute = ({ site }) => {
  const noindex = import.meta.env.PUBLIC_NOINDEX === 'true';
  const sitemap = new URL('/sitemap-index.xml', site ?? 'https://www.abilita.biz').href;
  const body = noindex
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
