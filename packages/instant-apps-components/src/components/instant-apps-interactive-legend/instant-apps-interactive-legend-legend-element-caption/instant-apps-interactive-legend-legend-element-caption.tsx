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

enum Icons {
  ZoomTo = 'magnifying-glass-plus',
  ShowAll = 'list-check-all',
}

const CSS = {
  layerCaption: 'esri-legend__layer-caption',
  layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
  layerCaptionBtnContainerNoText: 'instant-apps-interactive-legend__layer-caption-btn-container--no-text',
  layerCaptionText: 'instant-apps-interactive-legend__legend-layer-caption-text',
  compact: 'instant-apps-interactive-legend__layer-caption--compact',
  showAll: 'instant-apps-interactive-legend__show-all-btn',
  zoomTo: 'instant-apps-interactive-legend__zoom-to-btn',
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
    const compact = store.get('compact');
    const compactClass = compact ? ` ${CSS.compact}` : '';

    if (isNestedUniqueSymbols && !this.titleText) {
      return null;
    }

    const titleTextElement = this.titleText && (
      <span class={CSS.layerCaptionText} title={this.titleText}>
        {this.titleText}
      </span>
    );

    const controlsElement = (this.isInteractive || isRelationship) && this.renderLegendElementCaptionControls();

    return (
      <div class={`${CSS.layerCaption}${compactClass}`}>
        <calcite-action
          onClick={this.toggleExpanded()}
          icon={expanded === false ? 'chevron-up' : 'chevron-down'}
          appearance="transparent"
          text={expanded === false ? this.messages?.expand : this.messages?.collapse}
          label={expanded === false ? this.messages?.expand : this.messages?.collapse}
          scale="s"
        ></calcite-action>
        {compact ? [titleTextElement, controlsElement] : [controlsElement, titleTextElement]}
      </div>
    );
  }

  renderLegendElementCaptionControls() {
    const noText = !this.titleText ? ` ${CSS.layerCaptionBtnContainerNoText}` : '';

    return (
      <div key="layer-caption-btn-container" class={`${CSS.layerCaptionBtnContainer}${noText}`}>
        {this.renderShowAllZoomToButtons()}
      </div>
    );
  }

  renderShowAllZoomToButtons() {
    return store.get('compact') ? this.renderCompactButtonUI() : this.renderButtonUI();
  }

  renderCompactButtonUI() {
    const { data } = interactiveLegendState;
    const { id } = this.layer || {};
    const displayShowAll = data?.[id]?.categories?.size > 1;
    const zoomToCompact = 'zoomToCompact';

    const zoomTo = this.zoomTo && [
      <calcite-action id={zoomToCompact} class={CSS.zoomTo} onClick={this.handleZoomTo()} icon={Icons.ZoomTo} appearance="transparent" scale="s" compact={true} />,
      <calcite-tooltip reference-element={zoomToCompact} placement="top" label={this.messages?.zoomTo}>
        {this.messages?.zoomTo}
      </calcite-tooltip>,
    ];

    const showAll = displayShowAll && (
      <button onClick={this.handleShowAll()} class={CSS.showAll}>
        {this.messages?.showAll}
      </button>
    );

    return [zoomTo, showAll];
  }

  renderButtonUI() {
    const { data } = interactiveLegendState;
    const { id } = this.layer || {};
    const displayShowAll = data?.[id]?.categories?.size > 1;
    const showAllId = 'showAll';
    const zoomToId = 'zoomTo';

    const showAll = displayShowAll && [
      <calcite-button
        key="show-all-button"
        id={showAllId}
        label={this.messages?.showAll}
        onClick={this.handleShowAll()}
        iconStart={Icons.ShowAll}
        appearance="outline"
        round={true}
      />,
      <calcite-tooltip referenceElement={showAllId} placement="top" label={this.messages?.showAll}>
        {this.messages?.showAll}
      </calcite-tooltip>,
    ];

    const zoomTo = this.zoomTo && [
      <calcite-button key="zoom-to-button" id={zoomToId} label={this.messages?.zoomTo} onClick={this.handleZoomTo()} iconStart={Icons.ZoomTo} appearance="outline" round={true} />,
      <calcite-tooltip reference-element={zoomToId} placement="top" label={this.messages?.zoomTo}>
        {this.messages?.zoomTo}
      </calcite-tooltip>,
    ];

    return [showAll, zoomTo];
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
