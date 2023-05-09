import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-control-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-control-panel></instant-apps-control-panel>');

    const element = await page.find('instant-apps-control-panel');
    expect(element).toHaveClass('hydrated');
  });
});
