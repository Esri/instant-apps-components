import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-landing-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-landing-page></instant-apps-landing-page>');

    const element = await page.find('instant-apps-landing-page');
    expect(element).toHaveClass('hydrated');
  });
});
