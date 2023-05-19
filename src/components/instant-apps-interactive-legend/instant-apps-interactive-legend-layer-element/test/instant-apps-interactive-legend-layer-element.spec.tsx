import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendLayerElement } from '../instant-apps-interactive-legend-layer-element';

describe('instant-apps-interactive-legend-layer-element', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendLayerElement],
      html: `<instant-apps-interactive-legend-layer-element></instant-apps-interactive-legend-layer-element>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-layer-element>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-layer-element>
    `);
  });
});
