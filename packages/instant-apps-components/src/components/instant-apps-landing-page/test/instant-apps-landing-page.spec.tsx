import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsLandingPage } from '../instant-apps-landing-page';

describe('instant-apps-landing-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsLandingPage],
      html: `<instant-apps-landing-page></instant-apps-landing-page>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-landing-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-landing-page>
    `);
  });
});
