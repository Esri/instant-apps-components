import { Component, h, Prop, State } from '@stencil/core';

import { loadModules } from '../../utils/loadModules';

const CSS = {
  base: 'esri-legend',
  widget: 'esri-widget',
  panel: 'esri-widget--panel',
  widgetIcon: 'esri-icon-layer-list',
};

@Component({
  tag: 'instant-apps-interactive-legend',
  styleUrl: 'instant-apps-interactive-legend.scss',
  shadow: false,
})
export class InstantAppsInteractiveLegend {
  classic;
  handles: __esri.Handles;

  @State()
  reRender = false;

  /**
   * Reference to Map View or Scene View
   */
  @Prop()
  view: __esri.MapView;

  /**
   * View model for the legend widget.
   */
  @State()
  legendvm: __esri.LegendViewModel;

  componentWillLoad() {
    this.initializeModules().then(async () => {
      this.initApp();
    });
  }

  async initializeModules() {
    const [Handles] = await loadModules(['esri/core/Handles']);
    this.handles = new Handles();
    return Promise.resolve();
  }

  async initApp() {
    const [reactiveUtils, LegendViewModel] = await loadModules(['esri/core/reactiveUtils', 'esri/widgets/Legend/LegendViewModel']);
    const legendVM = new LegendViewModel({
      view: this.view,
    });

    await reactiveUtils.whenOnce(() => legendVM?.activeLayerInfos?.length);
    this.legendvm = legendVM;
    this.handles.add([
      reactiveUtils.on(
        () => this.legendvm?.activeLayerInfos,
        'change',
        () => this._refreshActiveLayerInfos(this?.legendvm?.activeLayerInfos, reactiveUtils),
      ),
    ]);
    this.reRender = !this.reRender;
  }

  render() {
    return (
      <div class={`esri-component ${CSS.base} ${CSS.widget} ${CSS.panel}`}>
        {this.legendvm?.activeLayerInfos?.length > 0 ? <instant-apps-interactive-legend-classic legendvm={this.legendvm}></instant-apps-interactive-legend-classic> : null}
      </div>
    );
  }

  private _refreshActiveLayerInfos(activeLayerInfos: __esri.Collection<__esri.ActiveLayerInfo> | undefined, reactiveUtils): void {
    if (!activeLayerInfos) return;
    this.handles.removeAll();
    activeLayerInfos.forEach(activeLayerInfo => this._renderOnActiveLayerInfoChange(activeLayerInfo, reactiveUtils));
    this.reRender = !this.reRender;
  }

  private _renderOnActiveLayerInfoChange(activeLayerInfo: __esri.ActiveLayerInfo, reactiveUtils: __esri.reactiveUtils): void {
    const infoVersionHandle = reactiveUtils.watch(
      () => activeLayerInfo.version,
      () => {
        this.reRender = !this.reRender;
      },
    );
    this.handles.add(infoVersionHandle, `version_${(activeLayerInfo?.layer as any)?.uid}`);

    const childrenChangeHandle = reactiveUtils.on(
      () => activeLayerInfo.children,
      'change',
      () => activeLayerInfo.children.forEach(childActiveLayerInfo => this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils)),
    );
    this.handles.add(childrenChangeHandle, `children_${(activeLayerInfo?.layer as any)?.uid}`);

    activeLayerInfo.children.forEach(childActiveLayerInfo => this._renderOnActiveLayerInfoChange(childActiveLayerInfo, reactiveUtils));
  }
}
