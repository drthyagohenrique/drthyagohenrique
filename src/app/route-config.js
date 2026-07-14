import { ROUTES, FUTURE_ROUTES } from '../config/routes.js';

export const routeConfig = {
  home: {
    path: ROUTES.institutional,
    status: 'published',
  },
  neurocalma: {
    path: ROUTES.neurocalma,
    status: 'pre-launch',
  },
  future: FUTURE_ROUTES
    .filter((route) => ![ROUTES.privacy, ROUTES.terms].includes(route.path))
    .map((route) => ({ ...route, status: 'technical-placeholder' })),
};
