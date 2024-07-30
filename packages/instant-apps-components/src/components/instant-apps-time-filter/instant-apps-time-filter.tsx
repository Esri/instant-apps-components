import { Component, Element, Prop, h } from '@stencil/core';
import { Host, HostElement, Watch } from '@stencil/core/internal';

import { state } from './support/store';
import { viewModel } from './support/viewModel';

import { getMessages } from '../../utils/locale';
import { loadModules } from '../../utils/loadModules';

import TimeFilter_t9n from '../../assets/t9n/instant-apps-time-filter/resources.json';

import { FilterMode } from '../../interfaces/interfaces';
import { ITimeInfoConfigItem } from './interfaces';

const CSS = {
  base: 'instant-apps-time-filter',
  layerTitle: 'instant-apps-time-filter__layer-title',
};

@Component({
  tag: 'instant-apps-time-filter',
  styleUrl: 'instant-apps-time-filter.scss',
  shadow: false,
})
export class InstantAppsTimeFilter {
  constructor() {
    state.view = this.view;
    state.timeInfoConfigItems = this.timeInfoConfigItems;
  }

  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles;
  messages: typeof TimeFilter_t9n;
  timeSliderRef: HTMLDivElement;

  @Element()
  el: HostElement;

  @Prop()
  timeInfoConfigItems: ITimeInfoConfigItem[] = [];

  @Prop()
  filterMode: FilterMode;

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  @Watch('timeInfoItems')
  timeInfoItemsChanged() {
    viewModel.updateTimeSliderExtent();
  }

  async componentWillLoad() {
    await getMessages(this);
    this._initializeModules();
  }

  async componentDidLoad() {
    viewModel.init(this.timeSliderRef);
  }

  private async _initializeModules() {
    const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();
  }

  render() {
    return (
      <Host>
        <div class={CSS.base}>
          {this._renderTopEl()}
          <div ref={(ref: HTMLDivElement) => (this.timeSliderRef = ref)} />
        </div>
      </Host>
    );
  }

  private _renderTopEl() {
    const moreThanOneTimeLayer = this.timeInfoConfigItems.length > 1;
    return moreThanOneTimeLayer ? this._renderSelectControl() : this._renderLayerTitle();
  }

  private _renderSelectControl() {
    const label = this.messages?.label;
    return (
      <calcite-label>
        {label}
        {this._renderSelect()}
      </calcite-label>
    );
  }

  private _renderSelect() {
    return <calcite-select label={this.messages?.label}>{this._renderOptions()}</calcite-select>;
  }

  private _renderOptions() {
    return state.timeInfoItems?.map(({ layerView }) => this._renderOption(layerView));
  }

  private _renderOption(layerView: __esri.LayerView) {
    return <calcite-option label={layerView.layer.title} />;
  }

  private _renderLayerTitle() {
    const title = state.selectedTimeInfoItem?.layerView?.layer?.title;
    return <span class={CSS.layerTitle}>{title}</span>;
  }
}
