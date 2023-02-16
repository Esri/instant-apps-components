import { Component, EventEmitter, h, Prop, State, Event } from '@stencil/core';
import { validateInteractivity } from '../support/helpers';

const CSS = {
  label: 'esri-legend__service-label',
  header: 'esri-widget__heading',
  interacitveLegendHeader: 'instant-apps-interactive-legend__header',
  headerActionContainer: 'instant-apps-interactive-legend__header-action-container',
};

@Component({
  tag: 'instant-apps-interactive-legend-caption',
  styleUrl: 'instant-apps-interactive-legend-caption.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendCaption {
  // @State()
  // reRender = false;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  featureCount: boolean;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  data: any;

  @Prop()
  messages;

  @Prop()
  expanded: boolean;

  @Event({
    eventName: 'legendLayerCaption',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  legendLayerCaptionEvent: EventEmitter<boolean>;

  emitLegendLayerCaption() {
    this.legendLayerCaptionEvent.emit();
  }

  render() {
    const isInteractive = validateInteractivity(this.activeLayerInfo);
    const isNotExpanded = this.expanded === false;
    const expandCollapseText = isNotExpanded ? this.messages?.expand : this.messages?.collapse;
    return (
      <header class={CSS.interacitveLegendHeader}>
        <span>
          <span class={CSS.headerActionContainer}>
            <calcite-action
              onClick={() => this.toggleExpanded(this.activeLayerInfo)}
              icon={isNotExpanded ? 'chevron-right' : 'chevron-down'}
              appearance="transparent"
              text={expandCollapseText}
              label={expandCollapseText}
            />
            <h3 class={`${CSS.header} ${CSS.label}`}>{this.activeLayerInfo?.title}</h3>
          </span>
          {this.featureCount && isInteractive ? (
            <instant-apps-interactive-legend-count data={this.data} layer-id={this.activeLayerInfo?.layer?.id} show-total={true} messages={this.messages} />
          ) : null}
        </span>
      </header>
    );
  }

  toggleExpanded(activeLayerInfo: __esri.ActiveLayerInfo): void {
    const expanded = !this.data[activeLayerInfo?.layer.id].expanded.layer;
    this.data[activeLayerInfo?.layer.id].expanded.layer = expanded;
    this.emitLegendLayerCaption();
    // this.reRender = !this.reRender;
  }
}
