import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-export-views', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-export-views></instant-apps-export-views>');

    const element = await page.find('instant-apps-export-views');
    expect(element).toHaveClass('hydrated');
  });
});
