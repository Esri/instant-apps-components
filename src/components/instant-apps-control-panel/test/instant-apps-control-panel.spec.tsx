import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsControlPanel } from '../instant-apps-control-panel';

describe('instant-apps-control-panel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsControlPanel],
      html: `<instant-apps-control-panel></instant-apps-control-panel>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-control-panel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-control-panel>
    `);
  });
});
