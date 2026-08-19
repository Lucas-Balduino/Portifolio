// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// Output estático (A3). site = URL de produção da 2.12.
export default defineConfig({
  site: 'https://lucasbalduino.vercel.app',
  output: 'static',
  integrations: [react(), mdx()]
});
