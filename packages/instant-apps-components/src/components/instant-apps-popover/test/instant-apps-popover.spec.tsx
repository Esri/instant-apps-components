import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsPopover } from '../instant-apps-popover';

describe('instant-apps-popover', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsPopover],
      html: `<instant-apps-popover></instant-apps-popover>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-popover>
    `);
  });
});
