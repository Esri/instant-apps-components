import { Component, Element, Prop, h } from '@stencil/core';
import { FunctionalComponent, Host, HostElement, State, Watch } from '@stencil/core/internal';

import { state } from './TimeFilter/TimeFilterModel';
import { viewModel } from './TimeFilter/TimeFilterViewModel';

import { getMessages } from '../../utils/locale';

import TimeFilter_t9n from '../../assets/t9n/instant-apps-time-filter/resources.json';

import { FilterMode } from '../../interfaces/interfaces';
import { ITimeInfoConfigItem, ITimeInfoItem } from './TimeFilter/interfaces/interfaces';

const CSS = {
  base: 'instant-apps-time-filter',
  layerTitle: 'instant-apps-time-filter__layer-title',
  loadingContainer: 'instant-apps-time-filter__loading-container',
  background: 'instant-apps-time-filter__background',
  threeD: ' instant-apps-time-filter--3d',
};

@Component({
  tag: 'instant-apps-time-filter',
  styleUrl: 'instant-apps-time-filter.scss',
  shadow: false,
})
export class InstantAppsTimeFilter {
  messages: typeof TimeFilter_t9n;

  @State()
  timeSliderRef: HTMLDivElement;

  @Element()
  el: HostElement;

  @Prop()
  timeInfoConfigItems: ITimeInfoConfigItem[] = [];

  @Prop()
  filterMode: FilterMode;

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  @Prop()
  timeSliderConfig: __esri.widgetsTimeSliderProperties;

  @Prop()
  autoPlay: boolean = false;

  @Watch('timeInfoConfigItems')
  async updateTimeInfoConfigItems() {
    state.timeInfoConfigItems = this.timeInfoConfigItems;
    await viewModel.init(this.timeSliderRef);
  }

  @Watch('filterMode')
  async updateFilterMode() {
    state.filterMode = this.filterMode;
  }

  @Watch('timeSliderConfig')
  async updateTimeSliderConfig() {
    state.timeSliderConfig = this.timeSliderConfig;
    await viewModel.init(this.timeSliderRef);
  }

  @Watch('autoPlay')
  async updateAutoPlay() {
    state.autoPlay = this.autoPlay;
    if (state.timeSlider) {
      if (state.autoPlay) {
        state.timeSlider.play();
      } else {
        state.timeSlider.stop();
      }
    }
  }

  async componentWillLoad() {
    try {
      state.view = this.view;
      state.timeInfoConfigItems = this.timeInfoConfigItems;
      state.autoPlay = !!this.autoPlay;
      if (this.timeSliderConfig) state.timeSliderConfig = this.timeSliderConfig;
      if (this.filterMode) state.filterMode = this.filterMode;
      await getMessages(this);
    } catch {}
  }

  async componentDidLoad() {
    try {
      await viewModel.init(this.timeSliderRef);
    } catch {
    } finally {
      state.loading = false;
    }
  }

  disconnectedcallback() {
    viewModel.destroy();
  }

  render(): HostElement {
    return <Host>{this._renderBase()}</Host>;
  }

  private _renderBase(): HTMLDivElement {
    return (
      <div class={`${CSS.base}${this.view.type !== '2d' ? CSS.threeD : ''}`}>
        {this._renderLoader()}
        {this.view.type === '2d' && this._renderTopEl()}
        <div key="time-slider" ref={(ref: HTMLDivElement) => (this.timeSliderRef = ref)} />
      </div>
    );
  }

  private _renderLoader(): FunctionalComponent | null {
    return (
      state.loading && (
        <div>
          <div class={CSS.background}></div>
          <div class={CSS.loadingContainer}>
            <calcite-loader scale="m" label={this.messages?.loading} text={this.messages?.loading} />
          </div>
        </div>
      )
    );
  }

  private _renderTopEl(): HTMLCalciteDropdownElement | HTMLSpanElement {
    const moreThanOneTimeLayer = this.timeInfoConfigItems.length > 1;
    return moreThanOneTimeLayer ? this._renderDropdown() : this._renderLayerTitle();
  }

  private _renderLayerTitle(): HTMLSpanElement {
    const title = state.selectedTimeInfoItem?.layerView?.layer?.title;
    return <span class={CSS.layerTitle}>{title}</span>;
  }

  private _renderDropdown(): HTMLCalciteDropdownElement {
    return (
      state.selectedTimeInfoItem && (
        <calcite-dropdown>
          {this._renderDropdownButton()}
          {this._renderDropdownItems()}
        </calcite-dropdown>
      )
    );
  }

  private _renderDropdownButton(): HTMLCalciteButtonElement {
    return (
      <calcite-button slot="trigger" appearance="transparent" iconEnd="chevron-down" width="full" alignment="space-between">
        {viewModel.getLabel(state.selectedTimeInfoItem as ITimeInfoItem)}
      </calcite-button>
    );
  }

  private _renderDropdownItems(): HTMLCalciteDropdownItemElement[] {
    return state.timeInfoItems.map(timeInfoItem => this._renderDropdownItem(timeInfoItem));
  }

  private _renderDropdownItem(timeInfoItem: ITimeInfoItem) {
    const selectedInfoItemId = state.selectedTimeInfoItem?.layerView?.layer?.id;
    const timeInfoItemId = timeInfoItem?.layerView?.layer?.id;
    const selected = selectedInfoItemId === timeInfoItemId;
    return (
      <calcite-dropdown-item onCalciteDropdownItemSelect={() => viewModel.updateSelectedTimeInfoItem(timeInfoItem)} selected={selected}>
        {viewModel.getLabel(timeInfoItem)}
      </calcite-dropdown-item>
    );
  }
}
