import { Component, Element, Prop, h, Fragment } from '@stencil/core';
import { FunctionalComponent, Host, HostElement, State, Watch } from '@stencil/core/internal';

import { state } from './viewModel/model';
import { viewModel } from './viewModel/viewModel';

import { getMessages } from '../../utils/locale';
import { loadModules } from '../../utils/loadModules';

import TimeFilter_t9n from '../../assets/t9n/instant-apps-time-filter/resources.json';

import { FilterMode } from '../../interfaces/interfaces';
import { ITimeInfoConfigItem } from './interfaces/interfaces';

const CSS = {
  base: 'instant-apps-time-filter',
  layerTitle: 'instant-apps-time-filter__layer-title',
  loadingContainer: 'instant-apps-time-filter__loading-container',
  background: 'instant-apps-time-filter__background',
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

  @Watch('timeInfoItems')
  timeInfoItemsChanged() {
    viewModel.updateTimeSliderExtent();
  }

  async componentWillLoad() {
    try {
      await getMessages(this);
      this._initializeModules();
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

  private async _initializeModules() {
    const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();
  }

  render(): HostElement {
    return <Host>{this._renderBase()}</Host>;
  }

  private _renderBase(): HTMLDivElement {
    return (
      <div class="instant-apps-time-filter">
        {this._renderLoader()}
        {this._renderMain()}
      </div>
    );
  }

  private _renderMain(): FunctionalComponent {
    return (
      <Fragment>
        {this._renderTopEl()}
        <div ref={(ref: HTMLDivElement) => (this.timeSliderRef = ref)} />
      </Fragment>
    );
  }

  private _renderLoader(): FunctionalComponent | null {
    return (
      state.loading && (
        <Fragment>
          <div class={CSS.background}></div>
          <div class={CSS.loadingContainer}>
            <calcite-loader scale="m" label={this.messages?.loading} text={this.messages?.loading} />
          </div>
        </Fragment>
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
        {state.selectedTimeInfoItem?.layerView?.layer?.title}
      </calcite-button>
    );
  }

  private _renderDropdownItems(): HTMLCalciteDropdownItemElement[] {
    return state.timeInfoItems.map(({ layerView }) => this._renderDropdownItem(layerView.layer.title));
  }

  private _renderDropdownItem(title: string) {
    return <calcite-dropdown-item>{title}</calcite-dropdown-item>;
  }
}
