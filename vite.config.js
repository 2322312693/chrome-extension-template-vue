import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { crx } from '@crxjs/vite-plugin';
// import manifest from './manifest.json' // Node 14 & 16 
import manifest from './manifest.json' assert { type: 'json' }; // Node >=17

export default defineConfig({
  base:"./",
  plugins: [vue(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        welcome: 'src/pages/welcome/index.html',
        popup: 'src/pages/popup/index.html',
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
});
