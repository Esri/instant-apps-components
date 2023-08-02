import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendGroupLegendElementCaption } from '../instant-apps-interactive-legend-group-legend-element-caption';

describe('instant-apps-interactive-legend-group-legend-element-caption', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendGroupLegendElementCaption],
      html: `<instant-apps-interactive-legend-group-legend-element-caption></instant-apps-interactive-legend-group-legend-element-caption>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-group-legend-element-caption>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-group-legend-element-caption>
    `);
  });
});
