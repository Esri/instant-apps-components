import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-layer-caption', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-layer-caption></instant-apps-interactive-legend-layer-caption>');

    const element = await page.find('instant-apps-interactive-legend-layer-caption');
    expect(element).toHaveClass('hydrated');
  });
});
