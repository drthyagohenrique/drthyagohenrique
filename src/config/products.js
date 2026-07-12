import { ROUTES } from './routes.js';

export const PRODUCTS = {
  neurocalma: {
    name: 'NeuroCalma',
    path: ROUTES.neurocalma,
    price: 'R$97',
    priceNote: 'Pagamento único',
    format: 'Produto digital educativo',
    // Estado comercial centralizado. Produto disponível (decisão de 2026-07-11);
    // o botão de compra só renderiza quando checkoutUrl for preenchida —
    // PENDENTE: URL real do checkout.
    checkoutUrl: null,
    salesStatus: 'active',
  },
};
