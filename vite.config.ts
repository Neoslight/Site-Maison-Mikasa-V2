import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    // Default `/`. For hosting under a sub-path (e.g. GitHub Pages), set an absolute
    // base such as `base: '/nom-du-repo/'`. Do *not* use `base: './'` with
    // `BrowserRouter` — it makes `public/` URLs relative to the current route and
    // breaks images on nested paths like `/realisations/...`.
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  };
});
