import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-language-translator-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-language-translator-search></instant-apps-language-translator-search>');

    const element = await page.find('instant-apps-language-translator-search');
    expect(element).toHaveClass('hydrated');
  });
});
