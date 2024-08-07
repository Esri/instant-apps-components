import { onChange, state } from './TimeFilterModel';
import { loadModules } from '../../../utils/loadModules';

import { DateValue, IFeatureEffect, IFeatureFilter, ITimeExtent, ITimeInfoConfigItem, ITimeInfoItem, ITimeInterval, ITimeItemUnit, ITimeSlider } from './interfaces/interfaces';
import { getMergedEffect } from 'templates-common-library/functionality/effects';
import { FilterMode } from '../../../components';

const TIME_SLIDER_HANDLE_KEY = 'time-slider-watch';

class InstantAppsTimeFilterViewModel {
  constructor() {
    this._initializeModules();
  }

  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles | null;
  TimeExtent: ITimeExtent;
  TimeInterval: ITimeInterval;
  FeatureFilter: IFeatureFilter;
  FeatureEffect: IFeatureEffect;
  TimeSlider: ITimeSlider;

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
    try {
      viewModel.cleanupTimeSlider(timeSliderRef);
      const { view, timeInfoConfigItems } = state;
      await view?.when();
      if (view) {
        const timeLayerViews = await this.getTimeLayerViews(view, timeInfoConfigItems);
        state.timeInfoItems = this.generateTimeInfoItems(timeLayerViews as __esri.LayerView[], timeInfoConfigItems);
        await this.initTimeSlider(timeSliderRef);
        onChange('filterMode', (newValue: FilterMode) =>
          state.timeInfoItems.forEach(timeInfoItem => {
            const fLayerView = timeInfoItem.layerView as __esri.FeatureLayerView;
            this._applyTimeExtent(fLayerView, fLayerView?.featureEffect?.filter?.timeExtent || fLayerView.filter?.timeExtent, newValue);
          }),
        );
      }
      return Promise.resolve();
    } catch {
      console.error('View failed to load');
      return Promise.reject();
    }
  }

  destroy() {
    this.handles?.removeAll();
    this.handles = null;
    state.timeSlider?.destroy();
  }

  async initTimeSlider(timeSliderRef: HTMLDivElement): Promise<void> {
    const initialTimeInfoItem = state?.timeInfoItems?.[0];
    if (!initialTimeInfoItem) return;
    const { TimeSlider } = this;
    state.selectedTimeInfoItem = initialTimeInfoItem;
    const config = this._getTimeSliderConfig(timeSliderRef);
    state.timeSlider = new TimeSlider(config);
    if (state.view?.type === '2d') this._initialize2DView();
  }

  private _getTimeSliderConfig(timeSliderRef: HTMLDivElement) {
    const [{ timeExtent, rangeStart, rangeEnd, unit }] = state.timeInfoItems;
    const { TimeExtent, TimeInterval } = this;
    return {
      container: timeSliderRef,
      fullTimeExtent: timeExtent as ITimeExtent,
      timeExtent: new TimeExtent({
        start: rangeStart,
        end: rangeEnd,
      }),
      mode: 'time-window',
      loop: true,
      stops: {
        interval: new TimeInterval({
          unit,
          value: 1,
        }),
      },
      view: state.view?.type === '3d' ? state.view : null,
    } as __esri.widgetsTimeSliderProperties;
  }

  private _initialize2DView() {
    state.timeInfoItems.forEach(timeInfoItem => {
      this._applyTimeExtent(timeInfoItem.layerView as __esri.FeatureLayerView, new this.TimeExtent({ start: timeInfoItem.rangeStart, end: timeInfoItem.rangeEnd }));
    });

    // Sets up watcher to update time extent
    this._setupTimeExtentWatcher();
  }

  private _applyTimeExtent(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent, filterMode?: FilterMode) {
    if (state.filterMode?.type === 'effect') {
      this._applyFeatureEffect(layerView, timeExtent, filterMode);
    } else {
      this._applyFeatureFilter(layerView, timeExtent);
    }
  }

  private _applyFeatureEffect(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent, filterMode?: FilterMode) {
    if (!layerView) return;
    if (layerView.filter) layerView.set('filter', null);
    if (!layerView.featureEffect || filterMode) {
      this._handleUpdatedFeatureEffect(layerView as __esri.FeatureLayerView, timeExtent as ITimeExtent);
      return;
    }
    layerView.featureEffect.filter.timeExtent = timeExtent;
  }

  private _handleUpdatedFeatureEffect(fLayerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent) {
    const { FeatureEffect } = this;
    fLayerView.featureEffect = new FeatureEffect({
      filter: { timeExtent },
      includedEffect: getMergedEffect(state.filterMode?.effect?.includedEffect as string, fLayerView, 'includedEffect'),
      excludedEffect: getMergedEffect(state.filterMode?.effect?.excludedEffect as string, fLayerView, 'excludedEffect'),
    });
  }

  private _applyFeatureFilter(layerView: __esri.FeatureLayerView, timeExtent: __esri.TimeExtent) {
    if (layerView.featureEffect) layerView.set('featureEffect', null);

    if (!layerView.filter) {
      layerView.filter = new this.FeatureFilter({ timeExtent: timeExtent as ITimeExtent });
      return;
    }
    layerView.filter.timeExtent = timeExtent;
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
    this._applyTimeExtent(timeInfoItem.layerView as __esri.FeatureLayerView, state.timeSlider.timeExtent);
    this._setupTimeExtentWatcher();
  }

  private _setupTimeExtentWatcher() {
    if (this.handles?.has(TIME_SLIDER_HANDLE_KEY)) this.handles?.remove(TIME_SLIDER_HANDLE_KEY);
    this.handles?.add(
      state?.timeSlider?.watch('timeExtent', timeExtent =>
        this._applyTimeExtent(state.selectedTimeInfoItem?.layerView as __esri.FeatureLayerView, timeExtent),
      ) as __esri.WatchHandle,
      TIME_SLIDER_HANDLE_KEY,
    );
  }
}

export const viewModel = new InstantAppsTimeFilterViewModel();
