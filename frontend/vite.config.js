import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps the built asset paths relative, so the site works
// whether it is served from the domain root or a subfolder (e.g. htdocs/hwum/).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
