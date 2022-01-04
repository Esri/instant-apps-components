import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-view', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-view></instant-apps-view>');

    const element = await page.find('instant-apps-view');
    expect(element).toHaveClass('hydrated');
  });
});
