import stencil from 'unplugin-stencil/vite';
import { defineConfig } from 'vitest/config';

const isCI = process.env.CI === 'true';

export default defineConfig({
  test: {
    environment: 'jsdom',
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: isCI ? true : false,
      name: 'chromium',
      launchOptions: {
        args: [
          '--enable-webgl',
          '--ignore-gpu-blacklist', // Ignore GPU blacklist to enable WebGL on all GPUs
        ],
      },
    } as any,
  },
  plugins: [stencil()],
});
