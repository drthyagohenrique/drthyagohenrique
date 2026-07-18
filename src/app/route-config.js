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
  future: FUTURE_ROUTES
    .filter((route) => ![ROUTES.links, ROUTES.privacy, ROUTES.terms].includes(route.path))
    .map((route) => ({ ...route, status: 'technical-placeholder' })),
};
