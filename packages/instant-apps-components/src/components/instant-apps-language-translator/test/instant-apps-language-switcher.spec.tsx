import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsLanguageTranslator } from '../instant-apps-language-translator';

describe('instant-apps-language-translator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsLanguageTranslator],
      html: `<instant-apps-language-translator></instant-apps-language-translator>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-language-translator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-language-translator>
    `);
  });
});
