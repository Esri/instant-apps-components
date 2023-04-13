import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-scoreboard', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-scoreboard></instant-apps-scoreboard>');

    const element = await page.find('instant-apps-scoreboard');
    expect(element).toHaveClass('hydrated');
  });
});
