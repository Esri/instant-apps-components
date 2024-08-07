import { test, expect, describe } from 'vitest';
import '../../../dist/components/instant-apps-header.js';
import '../../../dist/components/instant-apps-social-share.js';
import Home from '@arcgis/core/widgets/Home.js';
import MapView from '@arcgis/core/views/MapView.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';
import WebMap from '@arcgis/core/WebMap.js';
import Legend from '@arcgis/core/widgets/Legend.js';
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
describe('Control panel', () => {
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
    expect(controlPanel.components).toBe(allComponents);
    expect(controlPanel.components[0]).toHaveProperty('content', allComponents[0]['content']);
    expect(controlPanel.components[1]).toHaveProperty('content', allComponents[1]['content']);
    expect(controlPanel.components[2]).toHaveProperty('content', allComponents[2]['content']);
    expect(controlPanel.components[2]).toHaveProperty('isExpand', allComponents[2]['isExpand']);
    expect(controlPanel.components[2]).toHaveProperty('expandTooltip', allComponents[2]['expandTooltip']);
    expect(controlPanel.components[2]).toHaveProperty('collapseTooltip', allComponents[2]['collapseTooltip']);
    expect(controlPanel.components[3]).toHaveProperty('content', allComponents[3]['content']);
    expect(controlPanel.components[3]).toHaveProperty('isExpand', allComponents[3]['isExpand']);
    expect(controlPanel.components[3]).toHaveProperty('expandIcon', allComponents[3]['expandIcon']);
    expect(controlPanel.components[3]).toHaveProperty('expandTooltip', allComponents[3]['expandTooltip']);
    expect(controlPanel.components[3]).toHaveProperty('collapseTooltip', allComponents[3]['collapseTooltip']);
  });
});
