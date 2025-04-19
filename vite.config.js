import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '192.168.0.200',
    port: 3002,
    open: true,
  },
  plugins: [react()],
});
