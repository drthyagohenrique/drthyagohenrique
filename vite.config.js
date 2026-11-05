import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Match the production rewrite without injecting the SPA's global styles.
const standaloneCodigosDaMente = () => {
  const rewrite = (server) => {
    server.middlewares.use((req, _res, next) => {
      if (/^\/codigos-da-mente\/?(?:\?|$)/.test(req.url || '')) {
        req.url = req.url.replace(/^\/codigos-da-mente\/?/, '/codigos-da-mente.html');
      }
      next();
    });
  };
  return {
    name: 'standalone-codigos-da-mente',
    configureServer: rewrite,
    configurePreviewServer: rewrite,
  };
};

export default defineConfig({
  plugins: [react(), standaloneCodigosDaMente()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mindup: resolve(__dirname, 'mindup.html'),
        codigosDaMente: resolve(__dirname, 'codigos-da-mente.html')
      }
    }
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false
  }
});
