import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // Disables warning about eval()
    legalComments: 'none'
  },
  build: {
    target: 'es2018',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

