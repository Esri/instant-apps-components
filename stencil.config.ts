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
      copy: [
        {
          src: '../node_modules/@esri/calcite-components/dist/calcite',
          dest: 'dist/@esri/calcite-components',
        },
        {
          src: '../node_modules/@arcgis/core/assets',
          dest: 'dist/@arcgis/core/assets',
        },
      ],
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [nodePolyfills(), sass()],
};
