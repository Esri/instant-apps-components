import stencil from 'unplugin-stencil/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 10000,
    browser: {
      enabled: true,
      headless: false,
      name: 'chrome',
    },
  },
  plugins: [stencil()],
});
