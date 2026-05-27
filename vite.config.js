import { defineConfig } from 'vite';

export default defineConfig({
  // Serve all HTML files at root
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        menu: 'menu.html',
        orders: 'orders.html',
      }
    }
  }
});
