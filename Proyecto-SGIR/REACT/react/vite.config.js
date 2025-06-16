import path from 'path'
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
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [],
      onwarn(warning, warn) {
        // Ignora advertencias por módulos externos mal detectados
        if (
          warning.code === 'UNRESOLVED_IMPORT' ||
          warning.message.includes('externalized')
        ) {
          console.warn('⚠️ Módulo no resuelto, pero se continúa:', warning.source)
          return
        }
        warn(warning)
      },
    },
  },
  resolve: {
    alias: {
      // Esto previene errores comunes con dependencias de Node
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
      '@': path.resolve(__dirname, './src'),
    },
  },
});
