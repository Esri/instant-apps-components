import { onChange, state } from './TimeFilterModel';
import { loadModules } from '../../../utils/loadModules';

import { IFeatureEffect, IFeatureFilter, ITimeExtent, ITimeInfoConfigItem, ITimeInfoItem, ITimeInterval, ITimeItemUnit, ITimeSlider } from './interfaces/interfaces';
import { getMergedEffect } from 'templates-common-library/functionality/effects';
import { FilterMode } from '../../../components';

const TIME_SLIDER_HANDLE_KEY = 'time-slider-watch';

class InstantAppsTimeFilterViewModel {
  constructor() {
    this.initializeModules();
  }

  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles | null;
  TimeExtent: ITimeExtent;
  TimeInterval: ITimeInterval;
  FeatureFilter: IFeatureFilter;
  FeatureEffect: IFeatureEffect;
  TimeSlider: ITimeSlider;

  async initializeModules() {
    try {
      const [Handles, reactiveUtils, TimeSlider, TimeExtent, TimeInterval, FeatureFilter, FeatureEffect] = await loadModules([
        'esri/core/Handles',
        'esri/core/reactiveUtils',
        'esri/widgets/TimeSlider',
        'esri/time/TimeExtent',
        'esri/time/TimeInterval',
        'esri/layers/support/FeatureFilter',
        'esri/layers/support/FeatureEffect',
      ]);
      this.reactiveUtils = reactiveUtils;
      this.handles = new Handles();
      this.TimeSlider = TimeSlider;
      this.TimeExtent = TimeExtent;
      this.TimeInterval = TimeInterval;
      this.FeatureFilter = FeatureFilter;
      this.FeatureEffect = FeatureEffect;
    } catch {}
  }

  async init(timeSliderRef: HTMLDivElement) {
    if (timeSliderRef) timeSliderRef.innerHTML = '';
    if (state?.timeSlider?.viewModel?.state === 'playing') state.timeSlider.stop();
    const { view, timeInfoConfigItems } = state;
    if (!view) return;
    try {
      await view.when();
      const timeLayerViews = await this.getTimeLayerViews(view, timeInfoConfigItems);
      state.timeInfoItems = this.generateTimeInfoItems(timeLayerViews as __esri.LayerView[], timeInfoConfigItems);
      this.initTimeSlider(timeSliderRef);
      this.setupFilterModeWatcher();
      return Promise.resolve();
    } catch {}
  }

  destroy() {
    this.handles?.removeAll();
    this.handles = null;
    state.timeSlider?.destroy();
  }

  async getTimeLayerViews(view: __esri.MapView | __esri.SceneView, timeInfoConfigItems: ITimeInfoConfigItem[]): Promise<__esri.LayerView[] | undefined> {
    const { allLayers } = view.map;
    const getTimeLayer = (timeInfoLayerId: string) => allLayers.find(({ id }) => timeInfoLayerId === id);
    const timeLayers = timeInfoConfigItems.map(({ id }) => getTimeLayer(id));
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

  generateTimeInfoItem(layerView: __esri.LayerView, { increments, rangeStart, rangeEnd }: ITimeInfoConfigItem): ITimeInfoItem {
    const layer = layerView?.layer as __esri.FeatureLayer;
    const layerFTE = layer?.timeInfo?.fullTimeExtent;

    const timeExtent = layerFTE;
    return {
      layerView: layerView,
      unit: increments as ITimeItemUnit,
      rangeStart: new Date(rangeStart),
      rangeEnd: new Date(rangeEnd),
      timeExtent,
      previousTimeExtent: null,
    };
  }

  initTimeSlider(timeSliderRef: HTMLDivElement): void {
    const initialTimeInfoItem = state?.timeInfoItems?.[0];
    if (!initialTimeInfoItem) return;
    const { TimeSlider } = this;
    state.selectedTimeInfoItem = initialTimeInfoItem;
    const config = this.getTimeSliderConfig(timeSliderRef);
    state.timeSlider = new TimeSlider(config);
    if (state.autoPlay) state.timeSlider.play();
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

  getTimeSliderConfig(timeSliderRef: HTMLDivElement) {
    const [{ timeExtent, rangeStart, rangeEnd, unit }] = state.timeInfoItems;
    const { TimeExtent, TimeInterval } = this;
    const config = {
      container: timeSliderRef,
      fullTimeExtent: timeExtent as ITimeExtent,
      timeExtent: new TimeExtent({
        start: rangeStart,
        end: rangeEnd,
      }),
      mode: 'time-window',
      stops: {
        interval: new TimeInterval({
          unit,
          value: 1,
        }),
      },
      view: state.view?.type === '3d' ? state.view : null,
      ...state.timeSliderConfig,
    } as __esri.widgetsTimeSliderProperties;
    return config;
  }

  initialize2DView() {
    state.timeInfoItems.forEach(timeInfoItem =>
      this.applyTimeExtent(timeInfoItem.layerView as __esri.FeatureLayerView, new this.TimeExtent({ start: timeInfoItem.rangeStart, end: timeInfoItem.rangeEnd })),
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
    if (!layerView.featureEffect || filterMode) {
      this.handleUpdatedFeatureEffect(layerView as __esri.FeatureLayerView, timeExtent as ITimeExtent);
      return;
    }
    layerView.featureEffect.filter.timeExtent = timeExtent;
  }

  handleUpdatedFeatureEffect(fLayerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent) {
    const { FeatureEffect } = this;
    fLayerView.featureEffect = new FeatureEffect({
      filter: { timeExtent },
      includedEffect: getMergedEffect(state.filterMode?.effect?.includedEffect as string, fLayerView, 'includedEffect'),
      excludedEffect: getMergedEffect(state.filterMode?.effect?.excludedEffect as string, fLayerView, 'excludedEffect'),
    });
  }

  applyFeatureFilter(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent) {
    if (layerView.featureEffect) layerView.set('featureEffect', null);

    if (!layerView.filter) {
      layerView.filter = new this.FeatureFilter({ timeExtent: timeExtent as ITimeExtent });
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

  reconfigureTimeSlider(timeInfoItem: ITimeInfoItem) {
    if (!state.timeSlider) return;
    state.timeSlider.fullTimeExtent = timeInfoItem.timeExtent as __esri.TimeExtent;
    state.timeSlider.timeExtent = this.getTimeExtent(timeInfoItem);
    state.timeSlider.stops = { interval: this.getTimeInterval(timeInfoItem) };
  }

  getTimeExtent({ rangeStart, rangeEnd, previousTimeExtent }: ITimeInfoItem) {
    const { TimeExtent } = this;
    return (
      previousTimeExtent ??
      new TimeExtent({
        start: rangeStart,
        end: rangeEnd,
      })
    );
  }

  getTimeInterval(timeInfoItem: ITimeInfoItem) {
    const { TimeInterval } = this;
    const unit = timeInfoItem.unit ?? (timeInfoItem.layerView?.layer as __esri.FeatureLayer)?.timeInfo?.interval?.unit;
    return new TimeInterval({
      unit: unit,
      value: 1,
    });
  }

  getLabel(timeInfoItem: ITimeInfoItem): string {
    return timeInfoItem?.layerView?.layer?.title || '';
  }
}

export const viewModel = new InstantAppsTimeFilterViewModel();
