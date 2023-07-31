import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-language-translator-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-language-translator-item></instant-apps-language-translator-item>');

    const element = await page.find('instant-apps-language-translator-item');
    expect(element).toHaveClass('hydrated');
  });
});
