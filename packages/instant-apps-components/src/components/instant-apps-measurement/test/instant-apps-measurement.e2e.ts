import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-measurement', () => {
  it('should render a instant-apps-measurement', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-measurement></instant-apps-measurement>');

    const element = await page.find('instant-apps-measurement');
    expect(element).toHaveClass('hydrated');
  });
});
