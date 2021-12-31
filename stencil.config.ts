import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'instant-apps-components',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        {
          src: '../node_modules/@esri/calcite-components/dist/calcite',
          dest: 'dist/@esri/calcite-components',
        },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [nodePolyfills(), sass()],
};
