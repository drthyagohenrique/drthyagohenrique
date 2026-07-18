import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        mindup: resolve(__dirname, 'mindup.html')
      }
    }
  },
  server: {
    port: 3000,
    host: '127.0.0.1',
    open: false
  }
});
