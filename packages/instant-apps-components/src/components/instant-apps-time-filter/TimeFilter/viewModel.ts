import { state } from './model';
import { loadModules } from '../../../utils/loadModules';

import { DateValue, ITimeInfoConfigItem, ITimeInfoItem, ITimeItemUnit } from './interfaces/interfaces';
import { getMergedEffect } from 'templates-common-library/functionality/effects';

const TIME_SLIDER_HANDLE_KEY = 'time-slider-watch';

class InstantAppsTimeFilterViewModel {
  constructor() {
    this._initializeModules();
  }

  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles | null;
  TimeExtent;
  TimeInterval;
  FeatureFilter;
  FeatureEffect;
  TimeSlider;

  private async _initializeModules() {
    try {
      const [Handles, reactiveUtils, TimeSlider, TimeExtent, TimeInterval, FeatureFilter, FeatureEffect] = await loadModules([
        'esri/core/Handles',
        'esri/core/reactiveUtils',
        'esri/widgets/TimeSlider',
        'esri/TimeExtent',
        'esri/TimeInterval',
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
    viewModel.cleanupTimeSlider(timeSliderRef);
    await state?.view?.when();
    if (state?.view) {
      const timeLayerViews = await this.getTimeLayerViews(state.view, state.timeInfoConfigItems);
      state.timeInfoItems = this.generateTimeInfoItems(timeLayerViews as __esri.LayerView[], state.timeInfoConfigItems);
    }

    await this.initTimeSlider(timeSliderRef);
    return Promise.resolve();
  }

  destroy() {
    this.handles?.removeAll();
    this.handles = null;
    state.timeSlider?.destroy();
  }

  async initTimeSlider(timeSliderRef: HTMLDivElement): Promise<void> {
    const initialTimeInfoItem = state?.timeInfoItems?.[0];
    if (initialTimeInfoItem) {
      state.selectedTimeInfoItem = initialTimeInfoItem;
      const config = this.getTimeSliderConfig(timeSliderRef);
      state.timeSlider = new this.TimeSlider(config);
      if (state.view?.type === '2d') this._handle2DView();
    }
    return Promise.resolve();
  }

  private getTimeSliderConfig(timeSliderRef: HTMLDivElement) {
    const [{ timeExtent, rangeStart, rangeEnd, unit }] = state.timeInfoItems;
    let config = {
      container: timeSliderRef,
      fullTimeExtent: timeExtent,
      timeExtent: new this.TimeExtent({
        start: rangeStart,
        end: rangeEnd,
      }),
      mode: 'time-window',
      loop: true,
      stops: {
        interval: new this.TimeInterval({
          unit,
          value: 1,
        }),
      },
    };

    if (state.view?.type === '3d') {
      config['view'] = state.view?.type === '3d' ? state.view : null;
    }

    return config;
  }

  private _handle2DView() {
    const initialTimeExtent = state.timeSlider?.timeExtent;
    if (initialTimeExtent) this._applyFilter(initialTimeExtent);

    if (this.handles?.has(TIME_SLIDER_HANDLE_KEY)) {
      this.handles?.remove(TIME_SLIDER_HANDLE_KEY);
    }
    this.handles?.add(state?.timeSlider?.watch('timeExtent', timeExtent => this._applyFilter(timeExtent)) as __esri.WatchHandle, TIME_SLIDER_HANDLE_KEY);
  }

  private _applyFilter(timeExtent: __esri.TimeExtent) {
    if (state.filterMode?.type === 'effect') {
      this._applyFeatureEffect(timeExtent);
    } else {
      this._applyFeatureFilter(timeExtent);
    }
  }

  private _applyFeatureEffect(timeExtent: __esri.TimeExtent) {
    const selectedLayerView = state.selectedTimeInfoItem?.layerView as __esri.FeatureLayerView;
    let filter = selectedLayerView?.filter || selectedLayerView?.featureEffect?.filter;
    if (!filter) filter = new this.FeatureFilter({ timeExtent });
    if (!selectedLayerView.featureEffect) {
      const includedEffect = getMergedEffect(state.filterMode?.effect?.includedEffect as string, selectedLayerView, 'includedEffect');
      const excludedEffect = getMergedEffect(state.filterMode?.effect?.excludedEffect as string, selectedLayerView, 'excludedEffect');

      selectedLayerView.featureEffect = new this.FeatureEffect({
        filter,
        includedEffect,
        excludedEffect,
      });
      if (selectedLayerView.filter) selectedLayerView.set('filter', null);
    } else {
      selectedLayerView.featureEffect.filter.timeExtent = timeExtent;
    }
  }

  private _applyFeatureFilter(timeExtent: __esri.TimeExtent) {
    const selectedLayerView = state.selectedTimeInfoItem?.layerView as __esri.FeatureLayerView;
    let filter = selectedLayerView?.filter || selectedLayerView?.featureEffect?.filter;
    if (!filter) selectedLayerView.filter = new this.FeatureFilter({ timeExtent });
    selectedLayerView.filter.timeExtent = timeExtent;
  }

  cleanupTimeSlider(timeSliderRef: HTMLDivElement) {
    if (timeSliderRef) timeSliderRef.innerHTML = '';
  }

  async getTimeLayerViews(view: __esri.MapView | __esri.SceneView, timeInfoConfigItems: ITimeInfoConfigItem[]): Promise<__esri.LayerView[] | undefined> {
    if (!view) return;
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

  generateDateValues(timestamp: string): DateValue {
    const dateObj = new Date(timestamp);
    return { month: dateObj.getUTCMonth(), day: dateObj.getUTCDate(), year: dateObj.getUTCFullYear() };
  }

  getLabel(timeInfoItem: ITimeInfoItem): string {
    return timeInfoItem?.layerView?.layer?.title || '';
  }

  updateSelectedTimeInfoItem(timeInfoItem: ITimeInfoItem): void {
    if (!state.timeSlider) return;
    if (state.selectedTimeInfoItem) {
      state.selectedTimeInfoItem.previousTimeExtent = state.timeSlider.timeExtent;
    }
    state.selectedTimeInfoItem = timeInfoItem;

    const { TimeExtent, TimeInterval } = this;

    const timeExtent = new TimeExtent({
      start: timeInfoItem.rangeStart,
      end: timeInfoItem.rangeEnd,
    });

    const unit = timeInfoItem.unit ?? (timeInfoItem.layerView?.layer as __esri.FeatureLayer)?.timeInfo?.interval?.unit;
    const interval = new TimeInterval({
      unit: unit,
      value: 1,
    });

    state.timeSlider.fullTimeExtent = timeInfoItem.timeExtent as __esri.TimeExtent;
    state.timeSlider.timeExtent = timeInfoItem.previousTimeExtent ?? timeExtent;
    state.timeSlider.stops = { interval };

    this._applyFilter(state.timeSlider.timeExtent);

    if (this.handles?.has(TIME_SLIDER_HANDLE_KEY)) {
      this.handles?.remove(TIME_SLIDER_HANDLE_KEY);
    }
    this.handles?.add(
      state.timeSlider.watch('timeExtent', timeExtent => this._applyFilter(timeExtent)),
      TIME_SLIDER_HANDLE_KEY,
    );
  }
}

export const viewModel = new InstantAppsTimeFilterViewModel();
