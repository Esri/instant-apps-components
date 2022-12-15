import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-count', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-count></instant-apps-interactive-legend-count>');

    const element = await page.find('instant-apps-interactive-legend-count');
    expect(element).toHaveClass('hydrated');
  });
});
