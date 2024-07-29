import { Component, Element, Prop, State, h } from '@stencil/core';
import { ITimeInfoConfigItem, ITimeInfoItem, ITimeItemUnit } from './interfaces';
import { FilterMode } from '../../interfaces/interfaces';

import TimeFilter_t9n from "../../assets/t9n/instant-apps-time-filter/resources.json";
import { getMessages } from '../../utils/locale';
import { loadModules } from '../../utils/loadModules';
import { HostElement, Watch } from '@stencil/core/internal';

@Component({
  tag: 'instant-apps-time-filter',
  styleUrl: 'instant-apps-time-filter.scss',
  shadow: false,
})
export class InstantAppsTimeFilter {
  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles;
  messages: typeof TimeFilter_t9n;
  timeSlider: __esri.TimeSlider;
  timeSliderRef: HTMLDivElement;

  @Element()
  el: HostElement;

  @Prop()
  filterMode: FilterMode;

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  @Prop()
  timeInfoConfigItems: ITimeInfoConfigItem[] = [];

  @State()
  selectedTimeInfoItem: ITimeInfoItem;

  @State()
  timeInfoItems: ITimeInfoItem[] = [];

  @Watch('timeInfoItems')
  timeInfoItemsChanged() {
    console.warn("TIME INFO ITEMS HAS BEEN SET");
    if (!this.timeSlider) return;
    this.timeSlider.fullTimeExtent = this.timeInfoItems[0].timeExtent;
  }


  async componentWillLoad() {
      await getMessages(this);
      await this._initializeModules();
  }

  async componentDidLoad() { 
    if (!this.view) return;
    this.view.when(async () => {
      const { allLayers } = this.view.map;
      const getTimeLayer = (timeInfoLayerId: string) => allLayers.find(({id}) => timeInfoLayerId === id);
      const timeLayers = this.timeInfoConfigItems.map(({id}) => getTimeLayer(id));
      const timeLayerViews = await Promise.all(timeLayers.map(layer => this.view.whenLayerView(layer)));
      this.timeInfoItems = this._generateTimeInfoItems(timeLayerViews);

      const [TimeSlider] = await loadModules(['esri/widgets/TimeSlider']);
      this.selectedTimeInfoItem = this.timeInfoItems[0];
      const [ {timeExtent, rangeStart, rangeEnd} ] = this.timeInfoItems;
      this.timeSlider = new TimeSlider({
        view: this.view,
        container: this.timeSliderRef,
        fullTimeExtent: timeExtent,
        start: rangeStart,
        end: rangeEnd
      });
    });


  
  }

  private async _initializeModules() {
    const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();

  }

  render() {
    return (
      <div class="instant-apps-time-filter esri-widget esri-component">
        {this._renderLayerSelector()}
        <div ref={(ref: HTMLDivElement) => this.timeSliderRef = ref} />
      </div>
    );
  }

  private _renderLayerSelector() {
    return (
      <calcite-label>
        {this.messages?.label}
        <calcite-select label={this.messages?.label}>
          {this.timeInfoItems?.map(({layerView}) => 
            <calcite-option label={layerView.layer.title}></calcite-option>
          )}
        </calcite-select>
      </calcite-label>
    )
  }

  private _generateTimeInfoItems(timeLayerViews: __esri.LayerView[]): ITimeInfoItem[] {
    return this.timeInfoConfigItems.map(timeConfigItem => {
      const lv = timeLayerViews.find(({layer}) => layer.id === timeConfigItem.id) as __esri.LayerView;
      return this._generateTimeInfoItem(lv, timeConfigItem);
    });
  }

  private _generateTimeInfoItem(layerView: __esri.LayerView, { increments, rangeStart, rangeEnd }: ITimeInfoConfigItem): ITimeInfoItem {
    return {
      layerView: layerView,
      unit: increments as ITimeItemUnit,
      rangeStart: new Date(rangeStart),
      rangeEnd: new Date(rangeEnd),
      timeExtent: (layerView.layer as __esri.FeatureLayer).timeInfo.fullTimeExtent
    }
  }

  generateDateValues(timestamp: Date): {
    month: number;
    day: number;
    year: number;
  } | null {
      if (!timestamp) return null;
      const dateObj = new Date(timestamp);
      const month = dateObj.getUTCMonth();
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      return { month, day, year}
    };
  }

