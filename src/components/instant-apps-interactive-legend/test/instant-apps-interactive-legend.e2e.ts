import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend></instant-apps-interactive-legend>');

    const element = await page.find('instant-apps-interactive-legend');
    expect(element).toHaveClass('hydrated');
  });
});
