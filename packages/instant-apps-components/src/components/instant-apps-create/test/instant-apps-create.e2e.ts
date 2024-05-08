import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-create', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-create></instant-apps-create>');

    const element = await page.find('instant-apps-create');
    expect(element).toHaveClass('hydrated');
  });
});
