import { Component, h, Prop, State } from '@stencil/core';

import { checkAllSelected, checkNoneSelected, getIntLegendLayerData, showAll, zoomTo } from '../instant-apps-interactive-legend-classic/support/helpers';
const CSS = {
  layerCaption: 'esri-legend__layer-caption',
  layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
};

@Component({
  tag: 'instant-apps-interactive-legend-layer-caption',
  styleUrl: 'instant-apps-interactive-legend-layer-caption.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendLayerCaption {
  @Prop()
  data;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  layer: __esri.FeatureLayer;

  @Prop()
  title: string;

  @Prop()
  legendElementIndex: number;

  @Prop()
  zoomTo: boolean;

  @Prop()
  isInteractive: boolean;

  @Prop()
  expanded: boolean;

  @State()
  reRender = false;

  render() {
    const intLegendLayerData = getIntLegendLayerData(this.layer as __esri.FeatureLayer, this.data);
    const disableShowAll = checkNoneSelected(intLegendLayerData) || checkAllSelected(intLegendLayerData);

    const showAllButton = (
      <calcite-button
        key="show-all-button"
        id="showAll"
        onClick={() => {
          showAll(this.data?.[this.layer?.id]);
          this.reRender = !this.reRender;
        }}
        icon-start="list-check-all"
        appearance="outline"
        round={true}
        disabled={disableShowAll}
      ></calcite-button>
    );

    const zoomToButton = (
      <calcite-button
        key="zoom-to-button"
        id="zoomTo"
        onClick={() => {
          zoomTo(this.data?.[this.layer?.id], this.legendvm.view as __esri.MapView);
          this.reRender = !this.reRender;
        }}
        icon-start="magnifying-glass-plus"
        appearance="outline"
        round={true}
      ></calcite-button>
    );

    return this.title ? (
      <div class={CSS.layerCaption}>
        <calcite-action
          onClick={this.toggleExpanded(this.activeLayerInfo, this.legendElementIndex)}
          icon={this.expanded === false ? 'chevron-right' : 'chevron-down'}
          appearance="transparent"
          text={this.expanded === false ? 'Open' : 'Close'}
        ></calcite-action>
        {this.title}
        {this.isInteractive ? (
          <div key="layer-caption-btn-container" class={CSS.layerCaptionBtnContainer}>
            {showAllButton}
            <calcite-tooltip reference-element="showAll" placement="top" label="Show all">
              Show all
            </calcite-tooltip>
            {this.zoomTo
              ? [
                  zoomToButton,
                  <calcite-tooltip reference-element="zoomTo" placement="top" label="Zoom to">
                    Zoom to
                  </calcite-tooltip>,
                ]
              : null}
          </div>
        ) : null}
      </div>
    ) : null;
  }

  toggleExpanded(activeLayerInfo: __esri.ActiveLayerInfo, legendElementIndex: number): () => void {
    return () => {
      this.data[activeLayerInfo?.layer.id].expanded[legendElementIndex] = !this.data[activeLayerInfo?.layer.id].expanded[legendElementIndex];
      this.reRender = !this.reRender;
    };
  }
}
