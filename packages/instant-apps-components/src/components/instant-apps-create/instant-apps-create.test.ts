import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-create.js';
import WebScene from '@arcgis/core/WebScene';
import config from '@arcgis/core/config';

config.portalUrl = 'https://nw-brews.mapsdevext.arcgis.com';

const scene = new WebScene({
  portalItem: {
    id: '0614ea1f9dd043e9ba157b9c20d3c538',
  },
});
describe('testing create component with CSS.inlineContainer as its class and as an inline component', async () => {
  const create = document.createElement('instant-apps-create');
  create.mode = 'inline';
  create.setAttribute('show-scale-bar', 'true');
  test('create options', async () => {
    create.portal = scene.portalItem.portal;
    create.content = scene;

    document.body.appendChild(create);

    await new Promise(resolve => requestIdleCallback(resolve));
    await new Promise(resolve => setTimeout(resolve, 5000));
    const shadowRoot = create.shadowRoot;
    
    const listOptions = shadowRoot?.querySelectorAll('.instant-apps-create__option');

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
  });
});

describe('create options', async () => {
  const create = document.createElement('instant-apps-create');
  create.mode = 'popover';
  create.setAttribute('show-scale-bar', 'true');
  test('test if create option map works in popover and if all create options are present and there are not duplicates', async () => {
    create.portal = scene.portalItem.portal;
    create.content = scene;

    document.body.appendChild(create);

    await new Promise(resolve => requestIdleCallback(resolve));
    await new Promise(resolve => setTimeout(resolve, 5000));
    const shadowRoot = create.shadowRoot;
    
    const listOptions = shadowRoot?.querySelectorAll('.instant-apps-create__option');

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
  });
});
