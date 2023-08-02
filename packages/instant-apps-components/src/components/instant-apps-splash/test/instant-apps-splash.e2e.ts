import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-splash', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-splash></instant-apps-splash>');

    const element = await page.find('instant-apps-splash');
    expect(element).toHaveClass('hydrated');
  });
});
