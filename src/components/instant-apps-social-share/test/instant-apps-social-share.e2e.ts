import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-social-share', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-social-share></instant-apps-social-share>');

    const element = await page.find('instant-apps-social-share');
    expect(element).toHaveClass('hydrated');
  });
});
