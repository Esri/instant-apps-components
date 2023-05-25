import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-group-legend-element', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-group-legend-element></instant-apps-interactive-legend-group-legend-element>');

    const element = await page.find('instant-apps-interactive-legend-group-legend-element');
    expect(element).toHaveClass('hydrated');
  });
});
