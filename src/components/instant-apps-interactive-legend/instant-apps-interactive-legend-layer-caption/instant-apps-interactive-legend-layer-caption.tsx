import { Component, h, Prop, EventEmitter, Event, Element } from '@stencil/core';

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

  @Element()
  el;

  render() {
    const showAllButton =
      interactiveLegendState.data?.[this.layer?.id]?.categories?.size > 1 ? (
        <calcite-button
          key="show-all-button"
          id="showAll"
          onClick={() => {
            const layerData = showAll(interactiveLegendState.data?.[this.layer?.id]);
            interactiveLegendState.data[this.layer.id] = layerData;

            store.set('data', { ...interactiveLegendState.data, [this.layer.id]: layerData });

            this.showAllSelectedEvent.emit();
          }}
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
        onClick={() => {
          zoomTo(interactiveLegendState.data?.[this.layer?.id], this.legendvm.view as __esri.MapView);
        }}
        icon-start="magnifying-glass-plus"
        appearance="outline"
        round={true}
        label={this.messages?.zoomTo}
      />
    );

    const isNestedUniqueSymbols = this.activeLayerInfo?.legendElements?.[0]?.infos?.every?.(info => info?.type === 'symbol-table');
    const isRelationship = this.activeLayerInfo?.legendElements[1]?.type === 'relationship-ramp';

    const { expanded } = this;

    const noText = !this.titleText ? ' instant-apps-interactive-legend__layer-caption-btn-container--no-text' : '';

    return isNestedUniqueSymbols && !this.titleText ? null : (
      <div class={CSS.layerCaption}>
        {this.isInteractive || isRelationship ? (
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
        ) : null}
        {this.titleText ? (
          <span
            key={`legend-layer-caption-text-${this.activeLayerInfo?.layer?.id}-${this.legendElementIndex}`}
            class={`instant-apps-interactive-legend__legend-layer-caption-text`}
          >
            {this.titleText}
          </span>
        ) : null}
        <calcite-action
          onClick={this.toggleExpanded()}
          icon={expanded === false ? 'chevron-right' : 'chevron-down'}
          appearance="transparent"
          text={expanded === false ? this.messages?.expand : this.messages?.collapse}
          label={expanded === false ? this.messages?.expand : this.messages?.collapse}
        ></calcite-action>
      </div>
    );
  }

  toggleExpanded(): () => void {
    return () => {
      this.expanded = !this.expanded;
      this.legendLayerExpandUpdatedEvent.emit(this.expanded);
    };
  }
}
