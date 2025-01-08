import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import svgr from 'vite-plugin-svgr';

import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    svgr({
      include: '**/*.svg',
    }),
    react(),
    visualizer({ open: true }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or "modern"
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@admin': path.resolve(__dirname, './src/workflows/admin/'),
      '@public': path.resolve(__dirname, './src/workflows/public/'),
      '@images': path.resolve(__dirname, './src/shared/assets/'),
    },
  },
  define: {
    'import.meta.env.VITE_IS_DEV': mode === 'development', // Устанавливаем значение глобальной переменной
  },
}));
