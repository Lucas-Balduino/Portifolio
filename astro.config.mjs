// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Output estático (A3). SITE_URL = GitHub Pages atual; 2.12 (Vercel) ainda pendente — não inventar *.vercel.app.
export default defineConfig({
  site: 'https://lucas-balduino.github.io/Portifolio',
  output: 'static',
  integrations: [react(), mdx()]
});
