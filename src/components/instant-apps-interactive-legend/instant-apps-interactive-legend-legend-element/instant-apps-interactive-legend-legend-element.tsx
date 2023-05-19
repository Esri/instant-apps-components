import { Component, Listen, Prop, State, h } from '@stencil/core';

const CSS = {
  layerTableSizeRamp: '',
  layerChildTable: '',
  layerTable: '',
};

@Component({
  tag: 'instant-apps-interactive-legend-legend-element',
  styleUrl: 'instant-apps-interactive-legend-legend-element.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendLegendElement {
  legendLayerCaption: any;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  isSizeRamp: boolean;

  @Prop()
  isChild: boolean;

  @Prop()
  isColorRamp: boolean;

  @Prop()
  isRelationshipRamp: boolean;

  @Prop()
  isInteractive: boolean;

  @Prop()
  zoomTo: boolean;

  @Prop()
  legendElement: __esri.LegendElement;

  @Prop()
  titleText: string;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  legendElementIndex: number;

  @Prop()
  messages;

  @State()
  expanded = true;

  @Listen('legendLayerExpandUpdated', { target: 'window' })
  legendLayerExpandUpdatedEmitted() {
    this.expanded = this.legendLayerCaption.expanded;
  }

  render() {
    const tableClass = this.isChild ? CSS.layerChildTable : CSS.layerTable;
    const singleSymbol = this.legendElement?.infos?.length === 1 && !((this.activeLayerInfo?.layer as __esri.FeatureLayer)?.renderer as any)?.field;
    const tableClasses = (this.isSizeRamp || !this.isChild) && !this.isColorRamp ? ` ${CSS.layerTableSizeRamp}` : '';
    const nonInteractiveClass = !this.isInteractive ? ' instant-apps-interactive-legend__non-interactive' : '';
    const nestedUniqueSymbolClass = this.activeLayerInfo?.legendElements?.[0]?.infos?.every?.(info => info?.type === 'symbol-table')
      ? ' instant-apps-interactive-legend__nested-unique-symbol'
      : '';
    return (
      <div class={`${tableClass}${tableClasses}${nonInteractiveClass}${nestedUniqueSymbolClass}`}>
        <div
          id={`${this.activeLayerInfo?.layer?.id}-legend-element-caption`}
          class={`${this.isRelationshipRamp || (!this.titleText && !this.zoomTo && singleSymbol) ? 'hide' : 'show'}`}
        >
          <instant-apps-interactive-legend-layer-caption
            ref={node => (this.legendLayerCaption = node)}
            legendvm={this.legendvm}
            activeLayerInfo={this.activeLayerInfo}
            layer={this.activeLayerInfo.layer as __esri.FeatureLayer}
            titleText={this.titleText as string}
            legendElementIndex={this.legendElementIndex}
            zoomTo={this.zoomTo}
            isInteractive={this.isInteractive}
            messages={this.messages}
          />
        </div>
        <div key="content" id={`${this.activeLayerInfo?.layer?.id}-legend-element-content-${this.legendElementIndex}`} class={`${this.expanded === false ? 'hide' : 'show'}`}>
          <slot name="content" />
        </div>
      </div>
    );
  }
}
