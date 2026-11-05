import { inject } from '@vercel/analytics';
import { initPixel, trackPageView } from '../../lib/meta-pixel.js';

// This standalone document keeps the supplied HTML isolated from the SPA styles.
if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  inject();
  initPixel();
  trackPageView();
}
