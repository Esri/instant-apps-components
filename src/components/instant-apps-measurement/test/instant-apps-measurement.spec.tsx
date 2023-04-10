import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsMeasurement } from '../instant-apps-measurement';

describe('instant-apps-measurement', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsMeasurement],
      html: `<instant-apps-measurement></instant-apps-measurement>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-measurement>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-measurement>
    `);
  });
});
