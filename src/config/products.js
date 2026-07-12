import { ROUTES } from './routes.js';

export const PRODUCTS = {
  neurocalma: {
    name: 'NeuroCalma — Experiência Guiada',
    shortName: 'NeuroCalma',
    path: ROUTES.neurocalma,
    price: 'R$97',
    priceNote: 'à vista ou em até 12x',
    format: 'Experiência digital educativa',
    // Estado comercial centralizado. Produto disponível (decisão de 2026-07-11);
    // o botão de compra só renderiza quando checkoutUrl for preenchida —
    // PENDENTE: URL real do checkout.
    checkoutUrl: null,
    salesStatus: 'active',
  },
};
