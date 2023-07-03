import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsPopovers } from '../instant-apps-popovers';

describe('instant-apps-popovers', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsPopovers],
      html: `<instant-apps-popovers></instant-apps-popovers>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-popovers>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-popovers>
    `);
  });
});
