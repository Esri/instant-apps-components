import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-header></instant-apps-header>');

    const element = await page.find('instant-apps-header');
    expect(element).toHaveClass('hydrated');
  });
});
