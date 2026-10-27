import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vitest/config';

const viteConfig = {
  plugins: [react()],
};

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  })
);