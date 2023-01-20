import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendClassic } from '../instant-apps-interactive-legend-classic';

describe('instant-apps-interactive-legend-classic', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendClassic],
      html: `<instant-apps-interactive-legend-classic></instant-apps-interactive-legend-classic>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-classic>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-classic>
    `);
  });
});
