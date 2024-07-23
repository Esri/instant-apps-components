import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 10000,
    browser: {
      enabled: true,
      headless: true,
      name: 'chrome',
    },
  },
});
