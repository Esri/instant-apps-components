import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsAppGuide } from '../instant-apps-app-guide';

describe('instant-apps-app-guide', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsAppGuide],
      html: `<instant-apps-app-guide></instant-apps-app-guide>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-app-guide>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-app-guide>
    `);
  });
});
