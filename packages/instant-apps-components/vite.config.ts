import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import stencil from 'unplugin-stencil/vite';

export default defineConfig({
  publicDir: 'dist/assets',
  plugins: [stencil(), tsconfigPaths()],
});