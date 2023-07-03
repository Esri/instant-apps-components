import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendLegendElementCaption } from '../instant-apps-interactive-legend-legend-element-caption';

describe('instant-apps-interactive-legend-legend-element-caption', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendLegendElementCaption],
      html: `<instant-apps-interactive-legend-legend-element-caption></instant-apps-interactive-legend-legend-element-caption>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-legend-element-caption>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-legend-element-caption>
    `);
  });
});
