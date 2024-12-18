import { Component, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { getTheme, validateInteractivity } from '../support/helpers';
import { store } from '../support/store';

const CSS = {
  label: 'esri-legend__service-label',
  header: 'esri-widget__heading',
  interacitveLegendHeader: 'instant-apps-interactive-legend__header',
  headerActionContainer: 'instant-apps-interactive-legend__header-action-container',
  compact: 'instant-apps-interactive-legend__header--compact',
};

@Component({
  tag: 'instant-apps-interactive-legend-layer-element-caption',
  styleUrl: 'instant-apps-interactive-legend-layer-element-caption.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendLayerElementCaption {
  @Element()
  el: HTMLInstantAppsInteractiveLegendLayerElementCaptionElement;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  featureCount: boolean;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  messages;

  @Prop()
  isChild = false;

  @Prop({
    mutable: true,
  })
  expanded: boolean = true;

  @Event({
    eventName: 'layerCaptionElementExpandUpdated',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  layerCaptionElementExpandUpdatedEvent: EventEmitter<boolean>;

  render() {
    const isInteractive = validateInteractivity(this.activeLayerInfo);

    const { expanded } = this;

    const expandCollapseText = expanded ? this.messages?.collapse : this.messages?.expand;

    const isChild = this.isChild ? ' instant-apps-interactive-legend__heading-text--group-item' : '';

    const compact = store.get('compact') ? ` ${CSS.compact}` : '';

    return (
      <header class={`${CSS.interacitveLegendHeader} ${getTheme(this.el)}${compact}`}>
        <calcite-action
          onClick={this.toggleExpanded()}
          icon={expanded ? 'chevron-down' : 'chevron-up'}
          appearance="transparent"
          text={expandCollapseText}
          label={expandCollapseText}
          scale="s"
        />
        <span>
          <span class={CSS.headerActionContainer}>
            <h3 class={`${CSS.header} ${CSS.label}${isChild}`} title={this.activeLayerInfo?.title}>
              {this.activeLayerInfo?.title}
            </h3>
          </span>
          {this.featureCount && isInteractive ? (
            <instant-apps-interactive-legend-count activeLayerInfo={this.activeLayerInfo} show-total={true} messages={this.messages} legendvm={this.legendvm} />
          ) : null}
        </span>
      </header>
    );
  }

  toggleExpanded(): () => void {
    return () => {
      this.expanded = !this.expanded;
      this.layerCaptionElementExpandUpdatedEvent.emit(this.expanded);
    };
  }
}
