import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsSignIn } from '../instant-apps-sign-in';

describe('instant-apps-sign-in', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsSignIn],
      html: `<instant-apps-sign-in></instant-apps-sign-in>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-sign-in>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-sign-in>
    `);
  });
});
