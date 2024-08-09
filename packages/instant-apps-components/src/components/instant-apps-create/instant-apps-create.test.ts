import { expect, test, describe, beforeEach } from 'vitest';
import '../../../dist/components/instant-apps-create.js';
import { waitForElement, waitForShadowRoot } from '../../utils/testUtils.js';
import WebScene from '@arcgis/core/WebScene';
import config from '@arcgis/core/config';

config.portalUrl = 'https://nw-brews.mapsdevext.arcgis.com';

const scene = new WebScene({
  portalItem: {
    id: '0614ea1f9dd043e9ba157b9c20d3c538',
  },
});
const testCreateOptions = test.extend<{
  create: HTMLInstantAppsCreateElement;
  shadow: ShadowRoot;
}>({
  create: async ({}, use) => {
    const element = document.createElement('instant-apps-create');
    element.setAttribute('show-scale-bar', 'true');
    await use(element);
  },
  shadow: async ({ create }, use) => {
    document.body.appendChild(create);
    const shadowRoot = await waitForShadowRoot(create);
    if (!shadowRoot) throw new Error('Shadow root not found');
    await new Promise(resolve => requestIdleCallback(resolve));
    await new Promise(resolve => setTimeout(resolve, 5000));
    await use(shadowRoot);
  },
});

const execOptionsTest = async (create, shadow) => {
  create.portal = scene.portalItem.portal;
  create.content = scene;

  document.body.appendChild(create);

  await new Promise(resolve => requestIdleCallback(resolve));
  await new Promise(resolve => setTimeout(resolve, 5000));

  const listOptions = shadow?.querySelectorAll('.instant-apps-create__option');

  expect(listOptions?.length).toBe(5);

  const hrefs = listOptions && Array.from(listOptions).map((option: HTMLAnchorElement) => option.href);
  const validSubstrings = ['instantgallery', 'mapviewer', 'stories', 'template', 'dashboards'];

  const testValidity = (testString: string, substrings: string[]) =>
    substrings.some(substring => {
      if (testString.includes(substring) && validSubstrings.includes(substring)) {
        delete validSubstrings[substring];
        return true;
      }
      return false;
    });
  const hrefsAreValid = hrefs?.every(href => testValidity(href, validSubstrings));

  expect(hrefsAreValid).toBe(true);
};
describe('create', async () => {
  let create;
  let shadow;
  beforeEach(async () => {
    create = document.createElement('instant-apps-create');
    create.setAttribute('show-scale-bar', 'true');
    shadow = await waitForShadowRoot(create);
  });
  describe('create Inline', async () => {
    beforeEach(() => {
      create.mode = 'inline';
      document.body.appendChild(create);
    });
    test('Check for inline', async () => {
      expect(shadow).toBeTruthy();
      const inlineNav = await waitForElement('nav', shadow!);
      expect(inlineNav).toBeTruthy();
      const inlineElem = await waitForElement('div.instant-apps-create__inline-container', shadow!);
      expect(inlineElem).toBeTruthy();
    });
    testCreateOptions('create options', async ({ create, shadow }) => {
      await execOptionsTest(create, shadow);
    });
  });

  describe('create Popover', async () => {
    beforeEach(() => {
      create.mode = 'popover';
      document.body.appendChild(create);
    });
    test('Check for popover', async () => {
      const calcitePopover = await waitForElement('calcite-popover', shadow!);
      expect(calcitePopover).toBeTruthy();
    });
    testCreateOptions('create options', async ({ create, shadow }) => {
      await execOptionsTest(create, shadow);
    });
  });
});
