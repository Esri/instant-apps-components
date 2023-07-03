import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-layer-element-caption', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-layer-element-caption></instant-apps-interactive-legend-layer-element-caption>');

    const element = await page.find('instant-apps-interactive-legend-layer-element-caption');
    expect(element).toHaveClass('hydrated');
  });
});
