import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-filter-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-filter-list></instant-apps-filter-list>');

    const element = await page.find('instant-apps-filter-list');
    expect(element).toHaveClass('hydrated');
  });
});
