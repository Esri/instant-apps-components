import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';
import resolvePkg from 'resolve-pkg';

const t9nAssetsObj = {
  src: './assets/t9n',
  dest: '../assets/t9n',
};

export const config: Config = {
  namespace: 'instant-apps-components',
  outputTargets: [
    {
      type: 'dist',
      copy: [t9nAssetsObj],
      esmLoaderPath: '../loader',
    },
    { type: 'dist-custom-elements', customElementsExportBehavior: 'auto-define-custom-elements' },
    {
      type: 'www',
      copy: [
        { src: '**/*.html' },
        { ...t9nAssetsObj, dest: 'assets/t9n' },
        { src: 'assets', dest: 'build/assets' },
        {
          src: resolvePkg('@esri/calcite-components/dist/calcite') ?? '',
          dest: 'build/calcite-components',
        },
      ],
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: '@esri/instant-apps-components',
      proxiesFile: '../instant-apps-components-react/src/components/stencil-generated/index.ts',
      excludeComponents: ['context-consumer'],
      customElementsDir: 'dist/components',
    }),
    {
      type: 'docs-readme',
      footer: `## License
COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
`,
    },
  ],
  plugins: [sass()],
};
