import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsTimeSlider } from '../instant-apps-time-slider';

describe('instant-apps-time-slider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsTimeSlider],
      html: `<instant-apps-time-slider></instant-apps-time-slider>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-time-slider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-time-slider>
    `);
  });
});
