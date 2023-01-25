/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsHeader } from '../instant-apps-header';

describe('instant-apps-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsHeader],
      html: `<instant-apps-header></instant-apps-header>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-header>
    `);
  });
});
