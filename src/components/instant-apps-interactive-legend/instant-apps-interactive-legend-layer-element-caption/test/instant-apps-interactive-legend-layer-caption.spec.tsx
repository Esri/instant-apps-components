import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendLayerElementCaption } from '../instant-apps-interactive-legend-layer-element-caption';

describe('instant-apps-interactive-legend-layer-element-caption', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendLayerElementCaption],
      html: `<instant-apps-interactive-legend-layer-element-caption></instant-apps-interactive-legend-layer-element-caption>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-layer-element-caption>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-layer-element-caption>
    `);
  });
});
