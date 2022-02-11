import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsSocialShare } from '../instant-apps-social-share';

describe('instant-apps-social-share', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsSocialShare],
      html: `<instant-apps-social-share></instant-apps-social-share>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-social-share>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-social-share>
    `);
  });
});
