import { ROUTES } from './routes.js';

export const PRODUCTS = {
  neurocalma: {
    name: 'NeuroCalma — Experiência Guiada',
    shortName: 'NeuroCalma',
    path: ROUTES.neurocalma,
    format: 'Videoaulas e técnicas práticas',
    // Estado comercial centralizado. Produto disponível (decisão de 2026-07-11).
    checkoutUrl: 'https://pay.kiwify.com.br/IlofcZi',
    salesStatus: 'active',
  },
  mindup: {
    name: 'MindUp',
    shortName: 'MindUp',
    path: ROUTES.mindup,
    price: 'R$29,90/mês',
    priceNote: 'Assinatura mensal',
    format: 'Aplicativo de evolução pessoal adaptativa',
    // Distribution URLs: add only the official published store links.
    // Null values keep the CTA safe until each store is configured.
    storeUrls: {
      appStore: null,
      googlePlay: null,
    },
    checkoutUrl: null,
    salesStatus: 'active',
  },
};
