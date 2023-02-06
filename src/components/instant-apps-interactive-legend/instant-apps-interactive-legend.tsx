import { Component, h, Element, Prop, State, Watch } from '@stencil/core';

import { loadModules } from '../../utils/loadModules';

import { FilterMode } from './instant-apps-interactive-legend-classic/interfaces/interfaces';

import { getLocaleComponentStrings } from '../../utils/locale';

const CSS = {
  esri: {
    base: 'esri-legend',
    widget: 'esri-widget',
    widgetPanel: 'esri-widget--panel',
    component: 'esri-component',
    iconLayerList: 'esri-icon-layer-list',
  },
  calcite: {
    theme: {
      light: 'calcite-theme-light',
      dark: 'calcite-theme-dark',
    },
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
  el: HTMLElement;

  @State()
  reRender: boolean = false;

  @State()
  handles: __esri.Handles;

  @State()
  reactiveUtils: __esri.reactiveUtils;

  @State()
  legendvm: __esri.LegendViewModel;

  @State()
  widget: __esri.Widget;

  /**
   * Reference to Map View or Scene View
   */
  @Prop()
  view: __esri.MapView;

  /**
   * Displays 'Zoom To' button - updates the extent of the view based on the selected legend infos.
   */
  @Prop()
  zoomTo: boolean = false;

  /**
   * Display individual counts and total counts for legend infos.
   */
  @Prop()
  featureCount: boolean = false;

  /**
   * Filter mode to use when filtering features.
   */
  @Prop()
  filterMode: FilterMode = {
    type: 'filter',
  };

  @State() messages;

  async componentWillLoad() {
    const observer = new MutationObserver(() => {
      this.reRender = !this.reRender;
    });
    observer.observe(document.body, {
      attributes: true,
    });
    await this.initializeModules();
  }

  async componentDidLoad() {
    await this.getMessages();
  }

  async initializeModules() {
    const [Handles, reactiveUtils, Widget] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils', 'esri/widgets/Widget']);
    this.handles = new Handles();
    this.reactiveUtils = reactiveUtils;
    this.widget = new Widget();
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
      const legendVM = new LegendViewModel({ view: this.view });
      this.legendvm = legendVM;

      this.handles.add([
        on(
          () => this.legendvm?.activeLayerInfos,
          'change',
          () => this._refreshActiveLayerInfos(this?.legendvm?.activeLayerInfos, this.reactiveUtils),
        ),
      ]);

      // Re-renders layers on layer visibility toggle
      this.legendvm?.view?.map?.allLayers?.forEach(layer => {
        if (layer.type === 'feature') {
          const watcher = this.reactiveUtils.watch(
            () => layer.visible,
            async () => (this.reRender = !this.reRender),
          );
          this.handles.add(watcher);
        }
      });
    } catch (err) {
      console.error('Failed at "init": ', err);
    }
  }

  render() {
    const theme = this._getTheme();
    const { base, component, widget, widgetPanel } = CSS.esri;
    return (
      <div class={this.widget?.classes(base, component, widget, widgetPanel)}>
        <instant-apps-interactive-legend-classic
          ref={(el: HTMLInstantAppsInteractiveLegendClassicElement) => (this.ref = el)}
          class={theme}
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
    this.reRender = !this.reRender;
  }

  private _renderOnActiveLayerInfoChange(activeLayerInfo: __esri.ActiveLayerInfo, reactiveUtils: __esri.reactiveUtils): void {
    const { watch, on } = this.reactiveUtils;
    const infoVersionHandle = watch(
      () => activeLayerInfo.version,
      () => (this.reRender = !this.reRender),
    );
    this.handles.add(infoVersionHandle, `version_${(activeLayerInfo?.layer as any)?.uid}`);
    const childrenChangeHandle = on(
      () => activeLayerInfo.children,
      'change',
      () => activeLayerInfo.children.forEach(childActiveLayerInfo => this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils)),
    );
    this.handles.add(childrenChangeHandle, `children_${(activeLayerInfo?.layer as any)?.uid}`);

    activeLayerInfo.children.forEach(childActiveLayerInfo => this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils));
  }

  private _getTheme(): string {
    const { light, dark } = CSS.calcite.theme;
    const isDarkTheme = document.body.classList.contains(dark);
    return isDarkTheme ? dark : light;
  }

  async getMessages(): Promise<any> {
    let messages;
    try {
      const res = await getLocaleComponentStrings(this.el);
      messages = res[0];
      this.messages = messages;
    } catch (err) {
      Promise.reject(err);
    } finally {
    }
  }
}
