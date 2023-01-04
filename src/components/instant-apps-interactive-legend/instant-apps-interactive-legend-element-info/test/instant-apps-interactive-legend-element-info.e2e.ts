import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-element-info', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-element-info></instant-apps-interactive-legend-element-info>');

    const element = await page.find('instant-apps-interactive-legend-element-info');
    expect(element).toHaveClass('hydrated');
  });
});
