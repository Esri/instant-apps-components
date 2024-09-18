import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-app-guide', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-app-guide></instant-apps-app-guide>');

    const element = await page.find('instant-apps-app-guide');
    expect(element).toHaveClass('hydrated');
  });
});
