import { Component, h, Prop, EventEmitter, Event, Element } from '@stencil/core';

import {
  checkNestedUniqueSymbolLegendElement,
  checkRelationshipRamp,
  getIntLegendLayerData,
  getParentLegendElementInfoData,
  showAll,
  showAllNestedUniqueSymbol,
  updateStore,
  zoomTo,
} from '../support/helpers';
import { interactiveLegendState, store } from '../support/store';
const CSS = {
  layerCaption: 'esri-legend__layer-caption',
  layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
  layerCaptionBtnContainerNoText: 'instant-apps-interactive-legend__layer-caption-btn-container--no-text',
  layerCaptionText: 'instant-apps-interactive-legend__legend-layer-caption-text',
};

@Component({
  tag: 'instant-apps-interactive-legend-legend-element-caption',
  styleUrl: 'instant-apps-interactive-legend-legend-element-caption.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendLegendElementCaption {
  @Element()
  el: HTMLInstantAppsInteractiveLegendLegendElementCaptionElement;

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
  legendElement: __esri.LegendElement;

  @Prop({
    mutable: true,
  })
  expanded: boolean = true;

  @Prop()
  messages;

  @Event({
    eventName: 'showAllSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  showAllSelectedEvent: EventEmitter<boolean>;

  @Event({
    eventName: 'legendLayerExpandUpdated',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  legendLayerExpandUpdatedEvent: EventEmitter<boolean>;

  render() {
    const isNestedUniqueSymbols = checkNestedUniqueSymbolLegendElement(this.activeLayerInfo);

    const isRelationship = checkRelationshipRamp(this.activeLayerInfo);

    const { expanded } = this;

    return isNestedUniqueSymbols && !this.titleText ? null : (
      <div class={CSS.layerCaption}>
        <calcite-action
          onClick={this.toggleExpanded()}
          icon={expanded === false ? 'chevron-up' : 'chevron-down'}
          appearance="transparent"
          text={expanded === false ? this.messages?.expand : this.messages?.collapse}
          label={expanded === false ? this.messages?.expand : this.messages?.collapse}
          scale="s"
        ></calcite-action>
        {this.isInteractive || isRelationship ? this.renderLegendElementCaptionControls() : null}
        {this.titleText ? <span class={CSS.layerCaptionText}>{this.titleText}</span> : null}
      </div>
    );
  }

  renderLegendElementCaptionControls() {
    const noText = !this.titleText ? ` ${CSS.layerCaptionBtnContainerNoText}` : '';

    const showAllButton =
      interactiveLegendState.data?.[this.layer?.id]?.categories?.size > 1 ? (
        <calcite-button
          key="show-all-button"
          id="showAll"
          onClick={this.handleShowAll()}
          icon-start="list-check-all"
          appearance="outline"
          round={true}
          label={this.messages?.showAll}
        />
      ) : null;

    const zoomToButton = (
      <calcite-button
        key="zoom-to-button"
        id="zoomTo"
        onClick={this.handleZoomTo()}
        icon-start="magnifying-glass-plus"
        appearance="outline"
        round={true}
        label={this.messages?.zoomTo}
      />
    );

    return (
      <div key="layer-caption-btn-container" class={`${CSS.layerCaptionBtnContainer}${noText}`}>
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
    );
  }

  toggleExpanded(): () => void {
    return () => {
      this.expanded = !this.expanded;
      this.legendLayerExpandUpdatedEvent.emit();

      const relationshipRampElements = this.activeLayerInfo?.legendElements?.filter(legendElement => legendElement.type === 'relationship-ramp');
      if (relationshipRampElements.length > 0) {
        store.set('relationshipRampExpandStates', { ...interactiveLegendState.relationshipRampExpandStates, [this.activeLayerInfo.layer.id]: this.expanded });
      }
    };
  }

  handleZoomTo(): () => void {
    return () => {
      const data = getIntLegendLayerData(this.layer);
      const nestedCategory = getParentLegendElementInfoData(data, this.legendElement);
      zoomTo(data, this.legendvm.view as __esri.MapView, nestedCategory);
    };
  }

  handleShowAll(): () => void {
    return () => {
      const handleNestedCategory = () => {
        const layerData = showAllNestedUniqueSymbol(data, this.legendElement.title as string);
        updateStore({ intLegendLayerData: layerData, layerId: this.layer.id });
      };

      const handleCategory = () => {
        const layerData = showAll(data);
        updateStore({ intLegendLayerData: layerData, layerId: this.layer.id });
      };

      const data = interactiveLegendState.data?.[this.layer?.id];

      const nestedCategory = getParentLegendElementInfoData(data, this.legendElement);

      if (nestedCategory) {
        handleNestedCategory();
        return;
      }
      handleCategory();

      this.showAllSelectedEvent.emit();
    };
  }
}
