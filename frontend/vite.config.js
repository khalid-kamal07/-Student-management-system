import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Mirror Vercel's /api routing in local dev
    proxy: { '/api': 'http://localhost:5000' }
  }
});
