import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-popovers', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-popovers></instant-apps-popovers>');

    const element = await page.find('instant-apps-popovers');
    expect(element).toHaveClass('hydrated');
  });
});
