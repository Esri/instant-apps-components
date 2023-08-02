import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendCount } from '../instant-apps-interactive-legend-count';

describe('instant-apps-interactive-legend-count', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendCount],
      html: `<instant-apps-interactive-legend-count></instant-apps-interactive-legend-count>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-count>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-count>
    `);
  });
});
