import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-popover></instant-apps-popover>');

    const element = await page.find('instant-apps-popover');
    expect(element).toHaveClass('hydrated');
  });
});
