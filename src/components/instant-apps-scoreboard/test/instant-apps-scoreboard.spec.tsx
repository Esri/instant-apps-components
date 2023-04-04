import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsScoreboard } from '../instant-apps-scoreboard';

describe('instant-apps-scoreboard', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsScoreboard],
      html: `<instant-apps-scoreboard></instant-apps-scoreboard>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-scoreboard>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-scoreboard>
    `);
  });
});
