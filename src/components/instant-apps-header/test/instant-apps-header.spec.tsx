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
