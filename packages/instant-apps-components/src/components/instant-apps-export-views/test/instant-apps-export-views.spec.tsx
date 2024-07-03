import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsExportViews } from '../instant-apps-export-views';

describe('instant-apps-export-views', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsExportViews],
      html: `<instant-apps-export-views></instant-apps-export-views>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-export-views>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-export-views>
    `);
  });
});
