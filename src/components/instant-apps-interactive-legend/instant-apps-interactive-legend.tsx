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
  shadow: true,
})
export class InstantAppsInteractiveLegend {
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
    this.initializeModules();
  }

  async initializeModules() {
    const [reactiveUtils, LegendViewModel, Handles] = await loadModules(['esri/core/reactiveUtils', 'esri/widgets/Legend/LegendViewModel', 'esri/core/Handles']);
    this.handles = new Handles();
    this.legendvm = new LegendViewModel({
      view: this.view,
    });
    await reactiveUtils.whenOnce(() => this.legendvm);

    this.handles.add([
      reactiveUtils.on(
        () => this.legendvm?.activeLayerInfos,
        'change',
        () => this._refreshActiveLayerInfos(this?.legendvm?.activeLayerInfos, reactiveUtils),
      ),
    ]);
  }

  render() {
    return (
      <div class={`${CSS.base} ${CSS.widget} ${CSS.panel}`}>
        <instant-apps-interactive-legend-classic legendvm={this.legendvm}></instant-apps-interactive-legend-classic>
      </div>
    );
  }

  private _refreshActiveLayerInfos(activeLayerInfos: __esri.Collection<__esri.ActiveLayerInfo> | undefined, reactiveUtils): void {
    if (!activeLayerInfos) return;
    this.handles.removeAll();
    activeLayerInfos.forEach(activeLayerInfo => this._renderOnActiveLayerInfoChange(activeLayerInfo, reactiveUtils));
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
