import { ROUTES, FUTURE_ROUTES } from '../config/routes.js';

export const routeConfig = {
  home: {
    path: ROUTES.institutional,
    status: 'published',
  },
  links: {
    path: ROUTES.links,
    status: 'published',
  },
  neurocalma: {
    path: ROUTES.neurocalma,
    status: 'pre-launch',
  },
  mindup: {
    path: ROUTES.mindup,
    status: 'published',
  },
  mentoria: { path: ROUTES.mentoria, status: 'published' },
  codigosDaMente: { path: ROUTES.codigosDaMente, status: 'pre-launch' },
  future: FUTURE_ROUTES
    .filter((route) => ![ROUTES.links, ROUTES.privacy, ROUTES.terms, ROUTES.mentoria, ROUTES.codigosDaMente].includes(route.path))
    .map((route) => ({ ...route, status: 'technical-placeholder' })),
};
