import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsLanguageTranslatorSearch } from '../instant-apps-language-translator-search';

describe('instant-apps-language-translator-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsLanguageTranslatorSearch],
      html: `<instant-apps-language-translator-search></instant-apps-language-translator-search>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-language-translator-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-language-translator-search>
    `);
  });
});
