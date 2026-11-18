// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.abilita.biz',
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
