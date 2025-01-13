import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',  // Ensure Vite starts from the 'frontend' folder
  build: {
    outDir: '../backend/dist', // Optionally output build files to a different location, like 'backend/dist'
  },
  server: {
    open: true,  // Open browser automatically on server start
    proxy: {
      '/api': 'http://localhost:5000', // If your backend is on a different port, set up a proxy
    },
  },
});
