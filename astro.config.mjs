// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Output estático (A3). URL de produção fica para a tarefa 2.12.
export default defineConfig({
  output: 'static',
  integrations: [react()]
});
