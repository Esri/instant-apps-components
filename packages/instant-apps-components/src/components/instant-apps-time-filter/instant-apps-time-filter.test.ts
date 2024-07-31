import { expect, test, describe } from 'vitest';

import '../../../dist/components/instant-apps-time-filter.js';

import WebMap from '@arcgis/core/WebMap';
import WebScene from '@arcgis/core/WebScene';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import esriConfig from '@arcgis/core/config';

esriConfig.portalUrl = 'https://holistic.mapsdevext.arcgis.com';

describe('Time filter', async () => {
  const timeFilter = document.createElement('instant-apps-time-filter');
  document.body.appendChild(timeFilter);

  await new Promise(resolve => requestIdleCallback(resolve));

  test('renders successfully', async () => {
    expect(timeFilter).toBeTruthy();
  });

  test('has messages', async () => {
    const messages = timeFilter?.['messages'];
    console.log(messages);
    expect(messages).toBeTruthy();
  });

  test('has map view', () => {
    const map = new WebMap({
      portalItem: {
        id: '5b2d08964e5848128e0fef31854fc13d',
      },
    });
    const view = new MapView({ map });
    timeFilter.view = view;
    expect(timeFilter.view).toBeTruthy();
  });

  test('is 2D', () => {
    expect(timeFilter.view.type === '2d').toBe(true);
  });

  test('has scene view', () => {
    const map = new WebScene({
      portalItem: { id: '3fc4b300ab4b42ddaa2c26e9707dc12e' },
    });
    const view = new SceneView({ map });
    timeFilter.view = view;
    expect(timeFilter.view).toBeTruthy();
  });

  test('is 3D', () => {
    expect(timeFilter.view.type === '3d').toBe(true);
  });
});
