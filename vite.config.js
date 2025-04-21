import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3002,
    cors: true,
    strictPort: true,
    open: false,

    // Permite o host externo
    allowedHosts: [
      'redblackspy.ddns.net',
      '192.168.0.200'
    ],

    proxy: {
      '/socket': {
        target: 'ws://redblackspy.ddns.net:3003',
        ws: true,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/socket/, ''),
      },
      '/api': {
        target: 'http://redblackspy.ddns.net:3001', // Backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo '/api'
      },
    },
  },
  plugins: [react()],
});
