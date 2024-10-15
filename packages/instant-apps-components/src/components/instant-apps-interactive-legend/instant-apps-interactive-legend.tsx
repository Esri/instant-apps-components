import { Component, h, Element, Prop, State, Watch, forceUpdate } from '@stencil/core';

import { loadModules } from '../../utils/loadModules';

import { FilterMode } from '../../interfaces/interfaces';

import { getMessages } from '../../utils/locale';
import { getTheme } from './support/helpers';
import { store } from './support/store';

const CSS = {
  esri: {
    base: 'esri-legend',
    widget: 'esri-widget',
    widgetPanel: 'esri-widget--panel',
    component: 'esri-component',
    iconLayerList: 'esri-icon-layer-list',
  },
};

@Component({
  tag: 'instant-apps-interactive-legend',
  styleUrl: 'instant-apps-interactive-legend.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegend {
  ref: HTMLInstantAppsInteractiveLegendClassicElement;

  @Element()
  el: HTMLInstantAppsInteractiveLegendElement;

  @State()
  handles: __esri.Handles;

  @State()
  reactiveUtils: __esri.reactiveUtils;

  @State()
  legendvm: __esri.LegendViewModel;

  @State()
  widget: __esri.Widget;

  /**
   * Reference to Map View
   */
  @Prop()
  view: __esri.MapView;

  /**
   * Displays ‘Zoom to’ button, updates the extent of the view based on the results from the legend
   */
  @Prop()
  zoomTo: boolean = false;

  /**
   * Display the individual counts for categories and total counts for layers in the legend
   */
  @Prop({
    mutable: true,
  })
  featureCount: boolean = false;

  /**
   * Use effects to differentiate between features that are included and excluded from legend filter results
   */
  @Prop()
  filterMode: FilterMode = {
    type: 'filter',
  };

  @Prop()
  compact = false;

  @State()
  messages;

  async componentWillLoad() {
    this.compactHandler();
    const observer = new MutationObserver(() => {
      forceUpdate(this.el);
    });
    observer.observe(this.el, {
      attributes: true,
    });
    await this.initializeModules();
  }

  async componentDidLoad() {
    getMessages(this);
  }

  async initializeModules() {
    const [Handles, reactiveUtils, Widget, Legend] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils', 'esri/widgets/Widget', 'esri/widgets/Legend']);
    this.handles = new Handles();
    this.reactiveUtils = reactiveUtils;
    this.widget = new Widget();
    const legend = new Legend();
    await reactiveUtils.whenOnce(() => legend?.messages);
    this.messages = {
      ...this.messages,
      ...legend.messages,
    };
    return Promise.resolve();
  }

  @Watch('handles')
  @Watch('reactiveUtils')
  @Watch('view')
  async init(): Promise<void> {
    if (!this.reactiveUtils || !this.view || !this.handles) return;
    try {
      const { on } = this.reactiveUtils;

      const [LegendViewModel] = await loadModules(['esri/widgets/Legend/LegendViewModel']);
      const legendVM = new LegendViewModel({ view: this.view, respectLayerDefinitionExpression: true });
      this.legendvm = legendVM;

      this.handles.add([
        on(
          () => this.legendvm?.activeLayerInfos,
          'change',
          () => this._refreshActiveLayerInfos(this?.legendvm?.activeLayerInfos, this.reactiveUtils),
        ),
      ]);
    } catch (err) {
      console.error('Failed at "init": ', err);
    }
  }

  @Watch('compact')
  compactHandler() {
    store.set('compact', this.compact);
  }

  render() {
    const { base, component, widget, widgetPanel } = CSS.esri;
    return (
      <div key="interactive-legend" class={this.widget?.classes(base, component, widget, widgetPanel)}>
        <instant-apps-interactive-legend-classic
          key="interactive-legend-classic"
          ref={(el: HTMLInstantAppsInteractiveLegendClassicElement) => (this.ref = el)}
          class={getTheme(this.el)}
          legendvm={this.legendvm}
          zoom-to={this.zoomTo}
          filterMode={this.filterMode}
          feature-count={this.featureCount}
          messages={this.messages}
        />
      </div>
    );
  }

  private _refreshActiveLayerInfos(activeLayerInfos: __esri.Collection<__esri.ActiveLayerInfo> | undefined, reactiveUtils: __esri.reactiveUtils): void {
    if (!activeLayerInfos) return;
    this.handles.removeAll();
    activeLayerInfos.forEach(activeLayerInfo => this._renderOnActiveLayerInfoChange(activeLayerInfo, reactiveUtils));
  }

  private _renderOnActiveLayerInfoChange(activeLayerInfo: __esri.ActiveLayerInfo, reactiveUtils: __esri.reactiveUtils): void {
    const { on } = this.reactiveUtils;

    const childrenChangeHandle = on(
      () => activeLayerInfo.children,
      'change',
      () => activeLayerInfo.children.forEach(childActiveLayerInfo => this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils)),
    );
    this.handles.add(childrenChangeHandle, `children_${(activeLayerInfo?.layer as any)?.uid}`);

    activeLayerInfo.children.forEach(childActiveLayerInfo => {
      this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils);
      if (childActiveLayerInfo?.children?.length > 0) childActiveLayerInfo?.children?.forEach(innerChild => this._renderOnActiveLayerInfoChange(innerChild, reactiveUtils));
    });
  }
}
