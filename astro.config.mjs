// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.abilita.biz',
  // In produzione il sito è alla radice del dominio. SITE_BASE serve solo per le anteprime
  // pubblicate in una sottocartella (es. GitHub Pages: /abilita-website).
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      filter: (page) => !/\/contatti\/(grazie|errore)\/|\/404/.test(page),
    }),
  ],
});
