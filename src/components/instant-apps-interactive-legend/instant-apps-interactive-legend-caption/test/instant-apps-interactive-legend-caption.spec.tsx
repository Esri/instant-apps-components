import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsInteractiveLegendCaption } from '../instant-apps-interactive-legend-caption';

describe('instant-apps-interactive-legend-caption', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsInteractiveLegendCaption],
      html: `<instant-apps-interactive-legend-caption></instant-apps-interactive-legend-caption>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-interactive-legend-caption>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-interactive-legend-caption>
    `);
  });
});
