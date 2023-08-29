import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-language-translator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-language-translator></instant-apps-language-translator>');

    const element = await page.find('instant-apps-language-translator');
    expect(element).toHaveClass('hydrated');
  });
});
