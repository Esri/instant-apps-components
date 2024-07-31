import { state } from './store';
import { loadModules } from '../../../utils/loadModules';

import { DateValue, ITimeInfoConfigItem, ITimeInfoItem, ITimeItemUnit } from '../interfaces';

class InstantAppsTimeFilterViewModel {
  async init(timeSliderRef: HTMLDivElement) {
    await state?.view?.when();
    if (state.view) {
      const timeLayerViews = await this.getTimeLayerViews(state.view, state.timeInfoConfigItems);
      state.timeInfoItems = this.generateTimeInfoItems(timeLayerViews as __esri.LayerView[], state.timeInfoConfigItems);
    }

    await this.initTimeSlider(timeSliderRef);
    return Promise.resolve();
  }

  async initTimeSlider(timeSliderRef: HTMLDivElement): Promise<void> {
    const initialTimeInfoItem = state?.timeInfoItems?.[0];
    if (initialTimeInfoItem) {
      state.selectedTimeInfoItem = initialTimeInfoItem;
      const [{ timeExtent, rangeStart, rangeEnd }] = state.timeInfoItems;
      const [TimeSlider] = await loadModules(['esri/widgets/TimeSlider']);
      state.timeSlider = new TimeSlider({
        view: state.view,
        container: timeSliderRef,
        fullTimeExtent: timeExtent,
        start: rangeStart,
        end: rangeEnd,
        mode: 'time-window',
        loop: true,
      });
    }
    return Promise.resolve();
  }

  updateTimeSliderExtent(): void {
    if (!state.timeSlider || !state.timeInfoItems || state.timeInfoItems.length === 0) return;
    state.timeSlider.fullTimeExtent = state.timeInfoItems[0].timeExtent;
  }

  // TODO: Write unit tests for methods below
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
    return {
      layerView: layerView,
      unit: increments as ITimeItemUnit,
      rangeStart: new Date(rangeStart),
      rangeEnd: new Date(rangeEnd),
      timeExtent: (layerView.layer as __esri.FeatureLayer).timeInfo.fullTimeExtent,
    };
  }

  generateDateValues(timestamp: Date): DateValue | null {
    if (!timestamp) return null;
    const { getUTCMonth, getUTCDate, getUTCFullYear } = new Date(timestamp);
    return { month: getUTCMonth(), day: getUTCDate(), year: getUTCFullYear() };
  }
}

export const viewModel = new InstantAppsTimeFilterViewModel();
