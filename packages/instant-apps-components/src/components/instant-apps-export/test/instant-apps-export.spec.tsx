import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsExport } from '../instant-apps-export';

describe('instant-apps-export', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsExport],
      html: `<instant-apps-export></instant-apps-export>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-export>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-export>
    `);
  });
});
