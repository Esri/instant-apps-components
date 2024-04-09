import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-sign-in', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-sign-in></instant-apps-sign-in>');

    const element = await page.find('instant-apps-sign-in');
    expect(element).toHaveClass('hydrated');
  });
});
