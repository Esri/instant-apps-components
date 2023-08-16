import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsCkeditorWrapper } from '../instant-apps-ckeditor-wrapper';

describe('instant-apps-ckeditor-wrapper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsCkeditorWrapper],
      html: `<instant-apps-ckeditor-wrapper></instant-apps-ckeditor-wrapper>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-ckeditor-wrapper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-ckeditor-wrapper>
    `);
  });
});
