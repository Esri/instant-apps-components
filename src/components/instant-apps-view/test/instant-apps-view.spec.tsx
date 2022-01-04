import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsView } from '../instant-apps-view';

describe('instant-apps-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsView],
      html: `<instant-apps-view></instant-apps-view>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-view>
    `);
  });
});
