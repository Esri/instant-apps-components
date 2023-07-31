import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsLanguageTranslatorItem } from '../instant-apps-language-translator-item';

describe('instant-apps-language-translator-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsLanguageTranslatorItem],
      html: `<instant-apps-language-translator-item></instant-apps-language-translator-item>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-language-translator-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-language-translator-item>
    `);
  });
});
