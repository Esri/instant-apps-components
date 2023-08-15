import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-ckeditor-wrapper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-ckeditor-wrapper></instant-apps-ckeditor-wrapper>');

    const element = await page.find('instant-apps-ckeditor-wrapper');
    expect(element).toHaveClass('hydrated');
  });
});
