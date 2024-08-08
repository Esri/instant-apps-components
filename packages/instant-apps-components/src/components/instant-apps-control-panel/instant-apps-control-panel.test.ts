import { test, expect, describe } from 'vitest';
import '../../../dist/components/instant-apps-header.js';
import '../../../dist/components/instant-apps-social-share.js';
import Home from '@arcgis/core/widgets/Home.js';
import MapView from '@arcgis/core/views/MapView.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';
import WebMap from '@arcgis/core/WebMap.js';
import Legend from '@arcgis/core/widgets/Legend.js';

describe('Control panel', () => {
  const controlPanel = document.createElement('instant-apps-control-panel');
  const map = new WebMap({
    portalItem: {
      id: '8891ee1d2e0e428bb96c58b8ecf8c408',
    },
  });

  const view = new MapView({
    container: 'viewDiv',
    map,
    ui: {
      components: [],
    },
  });
  test('if widgets exist', async () => {
    const home = new Home({ view });
    const zoom = new Zoom({ view });
    const socialShare = document.createElement('instant-apps-social-share');
    socialShare.classList.add('calcite-mode-light');
    socialShare.mode = 'inline';
    const legend = new Legend({
      view,
    });
    const allComponents = [
      {
        content: home,
      },
      {
        content: zoom,
      },
      { content: legend, isExpand: true, expandTooltip: 'Open legend', collapseTooltip: 'Close legend' },
      { content: socialShare, isExpand: true, expandIcon: 'share', expandTooltip: 'Open social share', collapseTooltip: 'Close social share' },
    ];
    controlPanel.components = allComponents;
    document.body.appendChild(controlPanel);
    await new Promise(resolve => requestIdleCallback(resolve));
    const elem = document.querySelector('instant-apps-control-panel')!;
    expect(elem.components).toBe(allComponents);

    for (let i = 0; i < allComponents.length; i++) {
      let entry = allComponents[i];
      Object.keys(entry).forEach(key => {
        const value = entry[key];
        expect(elem.components[i]).toHaveProperty(key, value);
      });
    }
  });
});
