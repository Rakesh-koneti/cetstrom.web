import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react({
    babel: {
      parserOpts: {
        plugins: ['typescript'],

        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true,
        allowUndeclaredExports: true,
        errorRecovery: true
      }
    }
  })],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  esbuild: {
    loader: 'tsx',
    include: /\.tsx?$/
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});