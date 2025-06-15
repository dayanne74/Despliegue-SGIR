import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        console.warn('⚠️ Rollup warning:', warning);
        warn(warning); // importante para no suprimir el warning real
      },
    }
    
  },
  optimizeDeps: {
    include: ['react-icons/fa', 'react-icons/md','axios'],
  },
  rollupOptions: {
      external: ['fs', 'path', 'os','react-icons','axios',], // por ejemplo 'fs', 'path', 'os', etc.
    },
    logLevel: 'info',
});
