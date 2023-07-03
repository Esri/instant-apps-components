import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-layer-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-layer-element></instant-apps-interactive-legend-layer-element>');

    const element = await page.find('instant-apps-interactive-legend-layer-element');
    expect(element).toHaveClass('hydrated');
  });
});
