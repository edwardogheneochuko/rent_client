// Vite build/dev-server configuration.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // In development, forward /api requests to the Express server.
    // The browser then sees ONE origin (localhost:5173), so the login
    // cookie just works, with no CORS or SameSite problems.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
