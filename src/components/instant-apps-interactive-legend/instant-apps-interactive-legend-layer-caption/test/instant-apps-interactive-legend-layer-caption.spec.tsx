import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendLayerCaption } from '../instant-apps-interactive-legend-layer-caption';

describe('instant-apps-interactive-legend-layer-caption', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendLayerCaption],
      html: `<instant-apps-interactive-legend-layer-caption></instant-apps-interactive-legend-layer-caption>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-layer-caption>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-layer-caption>
    `);
  });
});
