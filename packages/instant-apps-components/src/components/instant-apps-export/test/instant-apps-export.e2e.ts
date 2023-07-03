import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-export', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-export></instant-apps-export>');

    const element = await page.find('instant-apps-export');
    expect(element).toHaveClass('hydrated');
  });
});
