import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsKeyboardShortcuts } from '../instant-apps-keyboard-shortcuts';

describe('instant-apps-keyboard-shortcuts', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsKeyboardShortcuts],
      html: `<instant-apps-keyboard-shortcuts></instant-apps-keyboard-shortcuts>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-keyboard-shortcuts>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-keyboard-shortcuts>
    `);
  });
});
