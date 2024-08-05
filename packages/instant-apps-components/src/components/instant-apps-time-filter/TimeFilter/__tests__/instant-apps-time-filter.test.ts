import { expect, test, describe, afterAll } from 'vitest';

import '../../../../../dist/components/instant-apps-time-filter.js';

import WebMap from '@arcgis/core/WebMap';
import WebScene from '@arcgis/core/WebScene';
import MapView from '@arcgis/core/views/MapView';
import SceneView from '@arcgis/core/views/SceneView';
import esriConfig from '@arcgis/core/config';
import EArcGISOrgs from '../../../../testUtils/orgEnums.js';

esriConfig.portalUrl = EArcGISOrgs.Holistic;

import { viewModel } from '../viewModel.js';
import testData from './testData.js';
import { createMapAndViews } from '../../../../testUtils/createView.js';
import { ITimeInfoConfigItem } from '../interfaces/interfaces.js';

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

    describe('Map with a single time-aware layer', async () => {
      const data = testData.webmaps[0];

      const view = await createMapAndViews(data.id);

      test('getTimeLayerViews: 0', async () => {
        const layerViews = await viewModel.getTimeLayerViews(view, []);
        expect(layerViews?.length).toBe(0);
      });

      let layerViews: __esri.LayerView[];

      test('getTimeLayerViews: 1', async () => {
        layerViews = (await viewModel.getTimeLayerViews(view, data.config as ITimeInfoConfigItem[])) as __esri.LayerView[];
        expect(layerViews?.length).toBe(1);
      });

      test('generateTimeInfoItems: 1', async () => {
        const timeInfoItems = viewModel.generateTimeInfoItems(layerViews, data.config as ITimeInfoConfigItem[]);
        expect(timeInfoItems.length).toBe(1);
      });

      test('generateTimeInfoItems: 1', async () => {
        const timeInfoItems = viewModel.generateTimeInfoItems(layerViews, data.config as ITimeInfoConfigItem[]);
        expect(timeInfoItems.length).toBe(1);
      });

      test('generateTimeInfoItem: Thorough check of key/value pairs', async () => {
        const layerView = layerViews[0];
        const timeConfigItem = data?.config?.[0] as ITimeInfoConfigItem;
        const timeInfoItem = viewModel.generateTimeInfoItem(layerView, timeConfigItem);
        expect(timeInfoItem.layerView.declaredClass).toBe('esri.views.2d.layers.FeatureLayerView2D');
        expect(timeInfoItem.unit).not.toBe('days');
        expect(timeInfoItem.unit).toBe('weeks');
        expect(timeInfoItem.rangeEnd).not.toBeInstanceOf(Array);
        expect(timeInfoItem.rangeStart).toBeInstanceOf(Date);
        const props = ['layerView', 'unit', 'rangeStart', 'rangeEnd', 'timeExtent'];
        const containsExpectedProps = props.every(prop => timeInfoItem.hasOwnProperty(prop));
        expect(containsExpectedProps).toBe(true);
        expect(timeInfoItem?.timeExtent?.declaredClass).toBe('esri.TimeExtent');
      });

      afterAll(() => {
        view.destroy();
      });
    });

    describe('Map with multiple time-aware layers', async () => {
      const data = testData.webmaps[1];
      const view = await createMapAndViews(data.id);

      test('getTimeLayerViews: 0', async () => {
        const layerViews = await viewModel.getTimeLayerViews(view, []);
        expect(layerViews?.length).toBe(0);
      });

      let layerViews: __esri.LayerView[];

      test('getTimeLayerViews: 2', async () => {
        layerViews = (await viewModel.getTimeLayerViews(view, data.config)) as __esri.LayerView[];
        expect(layerViews?.length).toBe(2);
      });

      test('generateTimeInfoItems: 2', async () => {
        const timeInfoItems = viewModel.generateTimeInfoItems(layerViews, data.config);
        expect(timeInfoItems.length).toBe(2);
      });

      afterAll(() => {
        view.destroy();
      });
    });

    test('generateDateValues', () => {
      const { month, day, year } = viewModel.generateDateValues('07-21-2024');

      expect(month).toBe(6);
      expect(day).toBe(21);
      expect(year).toBe(2024);
    });
  });
});
