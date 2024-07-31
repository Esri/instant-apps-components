import { expect, test, describe } from 'vitest';

import '../../../../dist/components/instant-apps-time-filter.js';

import WebMap from '@arcgis/core/WebMap';
import WebScene from '@arcgis/core/WebScene';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import esriConfig from '@arcgis/core/config';
import EArcGISOrgs from '../../../testUtils/orgEnums.js';

esriConfig.portalUrl = EArcGISOrgs.Holistic;

import { viewModel } from '../viewModel/viewModel.js';

const timeConfigItems = [
  {
    id: '1786615cac0-layer-6',
    increments: 'weeks',
    min: '2024-04-05T01:34:49.000Z',
    max: '2024-07-02T20:26:33.000Z',
    rangeStart: new Date('2024-04-05'),
    rangeEnd: new Date('2024-07-15'),
  },
];

describe('Time filter', async () => {
  describe('General', async () => {
    const timeFilter = document.createElement('instant-apps-time-filter');
    document.body.appendChild(timeFilter);

    await new Promise(resolve => requestIdleCallback(resolve));

    test('renders successfully', async () => {
      expect(timeFilter).toBeTruthy();
    });

    test('has messages', async () => {
      const messages = timeFilter?.['messages'];
      expect(messages).toBeTruthy();
    });

    test('has map view', () => {
      const map = new WebMap();
      const view = new MapView({ map });
      timeFilter.view = view;
      expect(timeFilter.view).toBeTruthy();
    });

    test('is 2D', () => {
      expect(timeFilter.view.type === '2d').toBe(true);
    });

    test('has scene view', () => {
      const map = new WebScene();
      const view = new SceneView({ map });
      timeFilter.view = view;
      expect(timeFilter.view).toBeTruthy();
    });

    test('is 3D', () => {
      expect(timeFilter.view.type === '3d').toBe(true);
    });
  });

  describe('View model', async () => {
    const jsapiStyles = document.createElement('link');
    jsapiStyles.href = 'https://js.arcgis.com/4.30/esri/themes/light/main.css';
    document.head.appendChild(jsapiStyles);

    const container = document.createElement('div');
    container.style.width = '500px';
    container.style.height = '500px';

    const id = '5b2d08964e5848128e0fef31854fc13d';
    const mapConfig = { portalItem: { id } };
    const map = new WebMap(mapConfig);
    const view = new MapView({ map, container });

    document.body.appendChild(view.container);

    await map.loadAll();
    await view.when();

    test('getTimeLayerViews: 0', async () => {
      const layerViews = await viewModel.getTimeLayerViews(view, []);
      expect(layerViews?.length).toBe(0);
    });

    let layerViews: __esri.LayerView[];

    test('getTimeLayerViews: 1', async () => {
      layerViews = (await viewModel.getTimeLayerViews(view, timeConfigItems)) as __esri.LayerView[];
      expect(layerViews?.length).toBe(1);
    });

    test('generateTimeInfoItems: 1', async () => {
      const timeInfoItems = viewModel.generateTimeInfoItems(layerViews, timeConfigItems);
      expect(timeInfoItems.length).toBe(1);
    });

    test('generateTimeInfoItem: Thorough check of key/value pairs', async () => {
      const layerView = layerViews[0];
      const timeConfigItem = timeConfigItems[0];
      const timeInfoItem = viewModel.generateTimeInfoItem(layerView, timeConfigItem);
      expect(timeInfoItem.layerView.declaredClass).toBe('esri.views.2d.layers.FeatureLayerView2D');
      expect(timeInfoItem.unit).not.toBe('days');
      expect(timeInfoItem.unit).toBe('weeks');
      expect(timeInfoItem.rangeEnd).not.toBeInstanceOf(Array);
      expect(timeInfoItem.rangeStart).toBeInstanceOf(Date);
      const props = ['layerView', 'unit', 'rangeStart', 'rangeEnd', 'timeExtent'];
      const containsExpectedProps = props.every(prop => timeInfoItem.hasOwnProperty(prop));
      expect(containsExpectedProps).toBe(true);
      expect(timeInfoItem.timeExtent.declaredClass).toBe('esri.TimeExtent');
    });
  });

  test('generateDateValues', () => {
    const { month, day, year } = viewModel.generateDateValues('07-21-2024');

    expect(month).toBe(6);
    expect(day).toBe(21);
    expect(year).toBe(2024);
  });
});
