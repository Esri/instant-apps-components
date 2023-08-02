import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsSplash } from '../instant-apps-splash';

describe('instant-apps-splash', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsSplash],
      html: `<instant-apps-splash></instant-apps-splash>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-splash>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-splash>
    `);
  });
});
