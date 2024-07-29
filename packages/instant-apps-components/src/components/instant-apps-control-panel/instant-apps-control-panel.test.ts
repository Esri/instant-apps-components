import { test, expect } from 'vitest';
import '../../../dist/components/instant-apps-header.js';
import '../../../dist/components/instant-apps-social-share.js';
import Home from '@arcgis/core/widgets/Home.js';
import MapView from '@arcgis/core/views/MapView.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';
import WebMap from '@arcgis/core/WebMap.js';
import Legend from '@arcgis/core/widgets/Legend.js';
const controlPanel = document.createElement('instant-apps-control-panel');
test('test if all widgets exist in the control panel', async () => {
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
  const home = new Home({ view });
  const zoom = new Zoom({ view });
  const socialShare = document.createElement('instant-apps-social-share');
  socialShare.classList.add('calcite-mode-light');
  socialShare.mode = 'inline';
  const legend = new Legend({
    view,
  });
  const all_components = [
    {
      content: home,
    },
    {
      content: zoom,
    },
    { content: legend, isExpand: true, expandTooltip: 'Open legend', collapseTooltip: 'Close legend' },
    { content: socialShare, isExpand: true, expandIcon: 'share', expandTooltip: 'Open social share', collapseTooltip: 'Close social share' },
  ];
  controlPanel.components = all_components;
  expect(controlPanel.components).toBe(all_components);
});
