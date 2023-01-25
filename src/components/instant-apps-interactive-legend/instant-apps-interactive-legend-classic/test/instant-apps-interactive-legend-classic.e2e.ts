import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-classic', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-classic></instant-apps-interactive-legend-classic>');

    const element = await page.find('instant-apps-interactive-legend-classic');
    expect(element).toHaveClass('hydrated');
  });
});
