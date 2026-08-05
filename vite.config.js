import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three';
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) return 'motion';
          if (id.includes('react-router-dom')) return 'router';
        },
      },
    },
  },
});
