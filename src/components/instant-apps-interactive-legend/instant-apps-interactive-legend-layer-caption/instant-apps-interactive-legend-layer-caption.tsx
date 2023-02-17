import { Component, h, Prop } from '@stencil/core';

import { showAll, zoomTo } from '../support/helpers';
import { interactiveLegendState, store } from '../support/store';
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
  legendvm: __esri.LegendViewModel;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  layer: __esri.FeatureLayer;

  @Prop()
  titleText: string;

  @Prop()
  legendElementIndex: number;

  @Prop()
  zoomTo: boolean;

  @Prop()
  isInteractive: boolean;

  @Prop()
  expanded: boolean;

  @Prop()
  messages;

  render() {
    const showAllButton =
      interactiveLegendState.data?.[this.layer?.id]?.categories?.size > 1 ? (
        <calcite-button
          key="show-all-button"
          id="showAll"
          onClick={() => {
            const layerData = showAll(interactiveLegendState.data?.[this.layer?.id]);
            const data = { ...interactiveLegendState.data, [this.layer.id]: layerData };
            store.set('data', data);
          }}
          icon-start="list-check-all"
          appearance="outline"
          round={true}
        ></calcite-button>
      ) : null;

    const zoomToButton = (
      <calcite-button
        key="zoom-to-button"
        id="zoomTo"
        onClick={() => {
          zoomTo(interactiveLegendState.data?.[this.layer?.id], this.legendvm.view as __esri.MapView);
        }}
        icon-start="magnifying-glass-plus"
        appearance="outline"
        round={true}
      ></calcite-button>
    );

    const isNestedUniqueSymbols = this.activeLayerInfo?.legendElements?.[0]?.infos?.every?.(info => info?.type === 'symbol-table');
    const isRelationship = this.activeLayerInfo?.legendElements[1]?.type === 'relationship-ramp';

    return !isNestedUniqueSymbols ? (
      <div class={CSS.layerCaption}>
        <calcite-action
          onClick={this.toggleExpanded(this.activeLayerInfo, this.legendElementIndex)}
          icon={this.expanded === false ? 'chevron-right' : 'chevron-down'}
          appearance="transparent"
          text={this.expanded === false ? this.messages?.expand : this.messages?.collapse}
          label={this.expanded === false ? this.messages?.expand : this.messages?.collapse}
        ></calcite-action>
        {this.titleText}
        {this.isInteractive || isRelationship ? (
          <div key="layer-caption-btn-container" class={CSS.layerCaptionBtnContainer}>
            {showAllButton}
            <calcite-tooltip reference-element="showAll" placement="top" label={this.messages?.showAll}>
              {this.messages?.showAll}
            </calcite-tooltip>
            {this.zoomTo
              ? [
                  zoomToButton,
                  <calcite-tooltip reference-element="zoomTo" placement="top" label={this.messages?.zoomTo}>
                    {this.messages?.zoomTo}
                  </calcite-tooltip>,
                ]
              : null}
          </div>
        ) : null}
      </div>
    ) : this.titleText ? (
      <div class={CSS.layerCaption}>{this.titleText}</div>
    ) : null;
  }

  toggleExpanded(activeLayerInfo: __esri.ActiveLayerInfo, legendElementIndex: number): () => void {
    return () => {
      const expanded = !interactiveLegendState.data[activeLayerInfo?.layer.id].expanded.legendElements[legendElementIndex];
      interactiveLegendState.data[activeLayerInfo?.layer.id].expanded.legendElements[legendElementIndex] = expanded;
      const data = { ...interactiveLegendState.data };
      store.set('data', data);
    };
  }
}
