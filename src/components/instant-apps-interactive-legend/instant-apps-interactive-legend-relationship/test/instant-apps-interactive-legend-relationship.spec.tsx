import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendRelationship } from '../instant-apps-interactive-legend-relationship';

describe('instant-apps-interactive-legend-relationship', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendRelationship],
      html: `<instant-apps-interactive-legend-relationship></instant-apps-interactive-legend-relationship>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-relationship>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-relationship>
    `);
  });
});
