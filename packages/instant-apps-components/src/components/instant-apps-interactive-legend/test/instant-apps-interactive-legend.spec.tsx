import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegend } from '../instant-apps-interactive-legend';

describe('instant-apps-interactive-legend', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegend],
      html: `<instant-apps-interactive-legend></instant-apps-interactive-legend>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend>
    `);
  });
});
