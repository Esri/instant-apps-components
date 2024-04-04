import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-time-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-time-slider></instant-apps-time-slider>');

    const element = await page.find('instant-apps-time-slider');
    expect(element).toHaveClass('hydrated');
  });
});
