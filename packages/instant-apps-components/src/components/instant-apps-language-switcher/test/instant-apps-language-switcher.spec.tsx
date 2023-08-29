import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsLanguageSwitcher } from '../instant-apps-language-switcher';

describe('instant-apps-language-switcher', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsLanguageSwitcher],
      html: `<instant-apps-language-switcher></instant-apps-language-switcher>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-language-switcher>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-language-switcher>
    `);
  });
});
