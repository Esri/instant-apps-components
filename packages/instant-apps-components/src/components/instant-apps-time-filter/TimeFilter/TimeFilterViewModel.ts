import { onChange, state } from './TimeFilterModel';

import { ITimeInfoConfigItem, ITimeInfoItem, ITimeItemUnit } from './interfaces/interfaces';
import { getMergedEffect } from 'templates-common-library/functionality/effects';
import { FilterMode } from '../../../components';
import {
  importCoreReactiveUtils,
  newCoreHandles,
  newLayersSupportFeatureEffect,
  newLayersSupportFeatureFilter,
  newTimeTimeExtent,
  newTimeTimeInterval,
  newWidgetsTimeSlider,
} from '@arcgis/core-adapter';

const TIME_SLIDER_HANDLE_KEY = 'time-slider-watch';

class InstantAppsTimeFilterViewModel {
  constructor() {
    this.initializeModules();
  }

  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles | null;

  async initializeModules() {
    try {
      const reactiveUtils = await importCoreReactiveUtils();

      this.reactiveUtils = reactiveUtils;
      this.handles = await newCoreHandles();
    } catch {}
  }

  async init(timeSliderRef: HTMLDivElement) {
    if (timeSliderRef) timeSliderRef.innerHTML = '';
    if (state?.timeSlider?.viewModel?.state === 'playing') state.timeSlider.stop();
    const { view, timeInfoConfigItems } = state;
    if (!view) return;
    try {
      await view.when();
      if (timeInfoConfigItems.length === 1 && timeInfoConfigItems[0]?.type === 'map') {
        this.initTimeSlider(timeSliderRef, timeInfoConfigItems[0]);
      } else {
        const timeLayerViews = await this.getTimeLayerViews(view, timeInfoConfigItems);
        state.timeInfoItems = this.generateTimeInfoItems(timeLayerViews as __esri.LayerView[], timeInfoConfigItems);
        this.initTimeSlider(timeSliderRef);
      }
      return Promise.resolve();
    } catch {
    } finally {
      this.setupFilterModeWatcher();
    }
  }

  destroy() {
    this.handles?.removeAll();
    this.handles = null;
    state.timeSlider?.destroy();
  }

  async getTimeLayerViews(view: __esri.MapView | __esri.SceneView, timeInfoConfigItems: ITimeInfoConfigItem[]): Promise<__esri.LayerView[] | undefined> {
    const { allLayers } = view.map;
    const getTimeLayer = (timeInfoLayerId: string) => allLayers.find(({ id }) => timeInfoLayerId === id);
    const timeLayers = timeInfoConfigItems.map(({ id }) => getTimeLayer(id as string));
    const timeLVPromises = timeLayers.map(layer => view.whenLayerView(layer));
    return await Promise.all(timeLVPromises);
  }

  generateTimeInfoItems(timeLayerViews: __esri.LayerView[], timeConfigItems: ITimeInfoConfigItem[]): ITimeInfoItem[] {
    const items = [...timeConfigItems];
    return items.map(timeConfigItem => {
      const lv = timeLayerViews.find(({ layer }) => layer.id === timeConfigItem.id) as __esri.LayerView;
      return this.generateTimeInfoItem(lv, timeConfigItem);
    });
  }

  generateTimeInfoItem(layerView: __esri.LayerView, { increments, rangeStart, rangeEnd, timeIntervalValue }: ITimeInfoConfigItem): ITimeInfoItem {
    const layer = layerView?.layer as __esri.FeatureLayer;
    const layerFTE = layer?.timeInfo?.fullTimeExtent;

    const timeExtent = layerFTE;
    return {
      layerView: layerView,
      unit: increments as ITimeItemUnit,
      timeIntervalValue: timeIntervalValue ?? 1,
      rangeStart: new Date(rangeStart),
      rangeEnd: new Date(rangeEnd),
      timeExtent,
      previousTimeExtent: null,
    };
  }

  initTimeSlider(timeSliderRef: HTMLDivElement, defaultItem?: ITimeInfoConfigItem): void {
    const initializeSlider = async config => {
      state.timeSlider = await newWidgetsTimeSlider(config);
      if (state.autoPlay) state.timeSlider.play();
    };

    if (defaultItem) {
      const config = this.getTimeSliderConfig(timeSliderRef, defaultItem);
      initializeSlider(config);
    } else {
      const initialTimeInfoItem = state?.timeInfoItems?.[0];
      if (!initialTimeInfoItem) return;
      state.selectedTimeInfoItem = initialTimeInfoItem;
      const config = this.getTimeSliderConfig(timeSliderRef);
      initializeSlider(config);
    }

    if (state.view?.type === '2d') this.initialize2DView();
  }

  setupFilterModeWatcher() {
    onChange('filterMode', (newValue: FilterMode) =>
      state.timeInfoItems.forEach(timeInfoItem => {
        const fLayerView = timeInfoItem.layerView as __esri.FeatureLayerView;
        this.applyTimeExtent(fLayerView, fLayerView?.featureEffect?.filter?.timeExtent || fLayerView.filter?.timeExtent, newValue);
      }),
    );
  }

  async getTimeSliderConfig(timeSliderRef: HTMLDivElement, defaultItem?: ITimeInfoConfigItem): Promise<any> {
    const baseConfig = {
      container: timeSliderRef,
      mode: 'time-window',
      view: state.view?.type === '3d' ? state.view : null,
      ...state.timeSliderConfig,
    };

    if (defaultItem) {
      const timeSlider = (state.view?.map as __esri.WebMap | __esri.WebScene)?.widgets?.timeSlider;
      const config = {
        ...baseConfig,
        fullTimeExtent: timeSlider?.fullTimeExtent,
        timeExtent: timeSlider?.currentTimeExtent,
      };
      if (timeSlider?.stopInterval?.unit && timeSlider?.stopInterval?.value) {
        config.stops = {
          interval: await newTimeTimeInterval({
            unit: timeSlider?.stopInterval?.unit,
            value: timeSlider?.stopInterval?.value,
          }),
        };
      }

      return config;
    } else {
      const [{ timeExtent, rangeStart, rangeEnd, unit, timeIntervalValue }] = state.timeInfoItems;
      return {
        ...baseConfig,
        fullTimeExtent: timeExtent as typeof __esri.TimeExtent | null,
        timeExtent: await newTimeTimeExtent({
          start: rangeStart,
          end: rangeEnd,
        }),
        stops: {
          interval: await newTimeTimeInterval({
            unit,
            value: timeIntervalValue,
          }),
        },
      };
    }
  }

  initialize2DView() {
    state.timeInfoItems.forEach(async timeInfoItem =>
      this.applyTimeExtent(timeInfoItem.layerView as __esri.FeatureLayerView, await newTimeTimeExtent({ start: timeInfoItem.rangeStart, end: timeInfoItem.rangeEnd })),
    );

    this.setupTimeExtentWatcher();
  }

  applyTimeExtent(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent, filterMode?: FilterMode) {
    if (state.filterMode?.type === 'effect') {
      this.applyFeatureEffect(layerView, timeExtent, filterMode);
    } else {
      this.applyFeatureFilter(layerView, timeExtent);
    }
  }

  applyFeatureEffect(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent, filterMode?: FilterMode) {
    if (!layerView) return;
    if (layerView.filter) layerView.set('filter', null);
    if (!layerView?.featureEffect || !layerView?.featureEffect?.filter || filterMode) {
      this.handleUpdatedFeatureEffect(layerView as __esri.FeatureLayerView, timeExtent as __esri.TimeExtent);
      return;
    }
    layerView.featureEffect.filter.timeExtent = timeExtent;
  }

  async handleUpdatedFeatureEffect(fLayerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent) {
    fLayerView.featureEffect = await newLayersSupportFeatureEffect({
      filter: { timeExtent },
      includedEffect: getMergedEffect(state.filterMode?.effect?.includedEffect as string, fLayerView, 'includedEffect'),
      excludedEffect: getMergedEffect(state.filterMode?.effect?.excludedEffect as string, fLayerView, 'excludedEffect'),
    });
  }

  async applyFeatureFilter(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent) {
    if (layerView.featureEffect) layerView.set('featureEffect', null);

    if (!layerView.filter) {
      layerView.filter = await newLayersSupportFeatureFilter({ timeExtent: timeExtent as __esri.TimeExtent });
      return;
    }
    layerView.filter.timeExtent = timeExtent;
  }

  setupTimeExtentWatcher() {
    if (this.handles?.has(TIME_SLIDER_HANDLE_KEY)) this.handles?.remove(TIME_SLIDER_HANDLE_KEY);
    this.handles?.add(
      state?.timeSlider?.watch('timeExtent', timeExtent =>
        this.applyTimeExtent(state.selectedTimeInfoItem?.layerView as __esri.FeatureLayerView, timeExtent),
      ) as __esri.WatchHandle,
      TIME_SLIDER_HANDLE_KEY,
    );
  }

  updateSelectedTimeInfoItem(timeInfoItem: ITimeInfoItem): void {
    if (!state.timeSlider) return;
    if (state.selectedTimeInfoItem) state.selectedTimeInfoItem.previousTimeExtent = state.timeSlider.timeExtent;
    state.selectedTimeInfoItem = timeInfoItem;
    this.reconfigureTimeSlider(timeInfoItem);
    this.applyTimeExtent(timeInfoItem.layerView as __esri.FeatureLayerView, state.timeSlider.timeExtent);
    this.setupTimeExtentWatcher();
  }

  async reconfigureTimeSlider(timeInfoItem: ITimeInfoItem) {
    if (!state.timeSlider) return;
    state.timeSlider.fullTimeExtent = timeInfoItem.timeExtent as __esri.TimeExtent;
    state.timeSlider.timeExtent = await this.getTimeExtent(timeInfoItem);
    state.timeSlider.stops = { interval: await this.getTimeInterval(timeInfoItem) };
  }

  async getTimeExtent({ rangeStart, rangeEnd, previousTimeExtent }: ITimeInfoItem): Promise<__esri.TimeExtent | __esri.TimeExtent> {
    const timeExtent =
      previousTimeExtent ??
      (await newTimeTimeExtent({
        start: rangeStart,
        end: rangeEnd,
      }));
    return Promise.resolve(timeExtent);
  }

  async getTimeInterval(timeInfoItem: ITimeInfoItem): Promise<__esri.TimeInterval> {
    const unit = timeInfoItem.unit ?? (timeInfoItem.layerView?.layer as __esri.FeatureLayer)?.timeInfo?.interval?.unit;
    return await newTimeTimeInterval({
      unit: unit,
      value: 1,
    });
  }

  getLabel(timeInfoItem: ITimeInfoItem): string {
    return timeInfoItem?.layerView?.layer?.title || '';
  }
}

export const viewModel = new InstantAppsTimeFilterViewModel();
