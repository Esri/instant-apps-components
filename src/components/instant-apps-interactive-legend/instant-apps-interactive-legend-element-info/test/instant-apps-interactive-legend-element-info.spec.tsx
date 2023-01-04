import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendElementInfo } from '../instant-apps-interactive-legend-element-info';

describe('instant-apps-interactive-legend-element-info', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendElementInfo],
      html: `<instant-apps-interactive-legend-element-info></instant-apps-interactive-legend-element-info>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-element-info>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-element-info>
    `);
  });
});
