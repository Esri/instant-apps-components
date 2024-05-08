import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsCreate } from '../instant-apps-create';

describe('instant-apps-create', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsCreate],
      html: `<instant-apps-create></instant-apps-create>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-create>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-create>
    `);
  });
});
