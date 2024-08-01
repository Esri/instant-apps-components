import { expect, test, describe } from 'vitest';
import { waitForElement, waitForShadowRoot } from '../../../utils/testUtils.js';
import WebScene from '@arcgis/core/WebScene';
import config from '@arcgis/core/config';

// Adjust the import path as needed
import '../../../../dist/components/instant-apps-create.js';

describe('Instant Apps Create', async () => {
  config.portalUrl = 'https://nw-brews.mapsdevext.arcgis.com';
  const scene = new WebScene({
    portalItem: {
      id: '0614ea1f9dd043e9ba157b9c20d3c538',
    },
  });

  const create = document.createElement('instant-apps-create');
  create.portal = scene.portalItem.portal;
  create.content = scene;

  document.body.appendChild(create);

  await new Promise(resolve => requestIdleCallback(resolve));
  const shadowRoot = await waitForShadowRoot(create);

  test('calcite-popover is present', async () => {
    create.mode = 'popover';
    const calcitePopover = await waitForElement('calcite-popover', shadowRoot!);
    expect(calcitePopover).toBeTruthy();
  });

  test('calcite-popover is not present', async () => {
    create.mode = 'inline';
    const calcitePopover = await waitForElement('calcite-popover', shadowRoot!);
    expect(calcitePopover).toBeFalsy();
  });
});