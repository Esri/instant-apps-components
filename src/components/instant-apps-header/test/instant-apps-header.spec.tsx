/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
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
