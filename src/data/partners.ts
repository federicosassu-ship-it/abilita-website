/**
 * "Abbiamo lavorato con" — organizzazioni elencate sul sito attuale [V].
 * Loghi originali dal sito attuale. [C] Natura del rapporto (cliente, partner, progetto)
 * e autorizzazione all'uso dei loghi da confermare prima di raggrupparli o descriverli.
 */
import type { ImageMetadata } from 'astro';
import arborea from '../assets/partner/1.png';
import pecorino from '../assets/partner/2.png';
import bresca from '../assets/partner/3.png';
import uniss from '../assets/partner/4.png';
import citimap from '../assets/partner/5.png';
import agromercato from '../assets/partner/6.png';
import orange from '../assets/partner/7.png';
import ecommerceSchool from '../assets/partner/8.png';
import nocefresca from '../assets/partner/9.png';
import noa from '../assets/partner/10.png';
import galileo from '../assets/partner/11.png';

export interface Partner {
  name: string;
  url: string;
  logo: ImageMetadata;
  /** Mostrato nella striscia di fiducia della home. */
  featured?: boolean;
}

export const partners: Partner[] = [
  { name: 'Arborea – Cooperativa Produttori', url: 'https://www.produttoriarborea.it/', logo: arborea, featured: true },
  { name: 'Consorzio per la Tutela del Formaggio Pecorino Romano', url: 'https://www.pecorinoromano.com/', logo: pecorino, featured: true },
  { name: 'Università degli Studi di Sassari', url: 'https://agrariaweb.uniss.it/', logo: uniss, featured: true },
  { name: 'Mercato agroalimentare della Sardegna', url: 'https://www.agromercatosardegna.it/', logo: agromercato, featured: true },
  { name: 'Bresca Dorada', url: 'https://www.brescadorada.it/', logo: bresca, featured: true },
  { name: 'Citimap', url: 'http://www.citimap.it/', logo: citimap },
  { name: 'Orange Media Group', url: 'https://www.orangemedia.it/', logo: orange },
  { name: 'Ecommerce School', url: 'https://www.ecommerce-school.it/', logo: ecommerceSchool },
  { name: 'Nocefresca', url: 'https://www.nocefresca.it/', logo: nocefresca },
  { name: 'Noa Solution', url: 'https://www.noasolution.it/', logo: noa },
  { name: 'Galileo Informatica', url: 'https://galileoinformatica.it/', logo: galileo },
];
