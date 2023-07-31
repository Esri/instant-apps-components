import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-language-switcher', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-language-switcher></instant-apps-language-switcher>');

    const element = await page.find('instant-apps-language-switcher');
    expect(element).toHaveClass('hydrated');
  });
});
