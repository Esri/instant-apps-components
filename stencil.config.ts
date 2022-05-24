import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export const config: Config = {
  namespace: 'instant-apps-components',
  outputTargets: [
    {
      type: 'dist',
      copy: [
        {
          src: 'assets/t9n',
          dest: '../assets/t9n',
        },
      ],
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
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [nodePolyfills(), sass()],
};
