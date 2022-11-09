import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-keyboard-shortcuts', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-keyboard-shortcuts></instant-apps-keyboard-shortcuts>');

    const element = await page.find('instant-apps-keyboard-shortcuts');
    expect(element).toHaveClass('hydrated');
  });
});
