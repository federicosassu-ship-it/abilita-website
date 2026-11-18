/**
 * Collezione "progetti" (casi studio).
 * Un caso viene pubblicato solo se draft: false E verificato: true.
 * Ogni risultato numerico richiede una fonte: niente metriche senza riscontro.
 * I file che iniziano con "_" (es. _modello-caso-studio.md) sono ignorati.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const progetti = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/progetti' }),
  schema: ({ image }) =>
    z.object({
      titolo: z.string(),
      cliente: z.string(),
      settore: z.string(),
      anno: z.number().int().optional(),
      servizi: z.array(z.enum(['e-commerce', 'food-marketing', 'digital-advertising'])).min(1),
      sintesi: z.string().max(220),
      sfida: z.string(),
      soluzione: z.string(),
      contributo: z.string(),
      risultati: z
        .array(z.object({ valore: z.string(), descrizione: z.string(), fonte: z.string().min(3) }))
        .default([]),
      immagine: image().optional(),
      immagineAlt: z.string().optional(),
      autorizzazioneCliente: z.boolean().default(false),
      verificato: z.boolean().default(false),
      draft: z.boolean().default(true),
    }),
});

export const collections = { progetti };
