// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import { passthroughImageService } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(),]
  },

  i18n: {
    locales: ['en', 'es', 'fr', 'jp'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true
    }
  },

  image: {
    service: passthroughImageService(),
  },

  adapter: cloudflare(),
});