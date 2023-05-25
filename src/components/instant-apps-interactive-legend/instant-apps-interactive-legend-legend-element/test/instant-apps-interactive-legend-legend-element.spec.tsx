import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendLegendElement } from '../instant-apps-interactive-legend-legend-element';

describe('instant-apps-interactive-legend-legend-element', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendLegendElement],
      html: `<instant-apps-interactive-legend-legend-element></instant-apps-interactive-legend-legend-element>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-legend-element>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-legend-element>
    `);
  });
});
