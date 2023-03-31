import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsFilterList } from '../instant-apps-filter-list';

describe('instant-apps-filter-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsFilterList],
      html: `<instant-apps-filter-list></instant-apps-filter-list>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-filter-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-filter-list>
    `);
  });
});
