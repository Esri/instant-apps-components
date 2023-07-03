import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-interactive-legend-relationship', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-interactive-legend-relationship></instant-apps-interactive-legend-relationship>');

    const element = await page.find('instant-apps-interactive-legend-relationship');
    expect(element).toHaveClass('hydrated');
  });
});
