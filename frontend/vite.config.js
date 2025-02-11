import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@google/generative-ai': '@google/generative-ai', // Simplified alias
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Your backend URL
        changeOrigin: true,
        secure: false, // Set to false if using self-signed SSL
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
