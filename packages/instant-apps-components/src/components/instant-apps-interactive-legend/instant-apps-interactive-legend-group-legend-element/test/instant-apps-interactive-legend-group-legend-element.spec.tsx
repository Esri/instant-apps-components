import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendGroupLegendElement } from '../instant-apps-interactive-legend-group-legend-element';

describe('instant-apps-interactive-legend-group-legend-element', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendGroupLegendElement],
      html: `<instant-apps-interactive-legend-group-legend-element></instant-apps-interactive-legend-group-legend-element>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-group-legend-element>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-group-legend-element>
    `);
  });
});
