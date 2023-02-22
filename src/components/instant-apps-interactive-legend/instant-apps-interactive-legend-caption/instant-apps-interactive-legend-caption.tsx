import { Component, h, Prop, Element, forceUpdate } from '@stencil/core';
import { validateInteractivity } from '../support/helpers';

import { interactiveLegendState } from '../support/store';

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
  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  featureCount: boolean;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  messages;

  @Element()
  el;

  @Prop()
  isChild = false;

  render() {
    const isInteractive = validateInteractivity(this.activeLayerInfo);

    const expanded = interactiveLegendState?.data[this.activeLayerInfo?.layer?.id]?.expanded?.layer;

    const expandCollapseText = expanded ? this.messages?.collapse : this.messages?.expand;

    const isChild = this.isChild ? ' instant-apps-interactive-legend__heading-text--group-item' : '';

    return (
      <header key={`${this.activeLayerInfo?.layer?.id}-header`} class={CSS.interacitveLegendHeader}>
        <span>
          <span class={CSS.headerActionContainer}>
            <h3 class={`${CSS.header} ${CSS.label}${isChild}`}>{this.activeLayerInfo?.title}</h3>
            <calcite-action
              onClick={this.toggleExpanded(this.activeLayerInfo)}
              icon={expanded ? 'chevron-down' : 'chevron-right'}
              appearance="transparent"
              text={expandCollapseText}
              label={expandCollapseText}
            />
          </span>
          {this.featureCount && isInteractive ? (
            <instant-apps-interactive-legend-count layer-id={this.activeLayerInfo?.layer?.id} show-total={true} messages={this.messages} legendvm={this.legendvm} />
          ) : null}
        </span>
      </header>
    );
  }

  toggleExpanded(activeLayerInfo: __esri.ActiveLayerInfo): () => void {
    return () => {
      const expanded = !interactiveLegendState.data[activeLayerInfo?.layer.id].expanded.layer;
      interactiveLegendState.data[activeLayerInfo?.layer?.id].expanded.layer = expanded;
      const id = `${activeLayerInfo?.layer?.id}-legend-layer`;
      const node = document.getElementById(id);
      if (node?.classList.contains('show')) {
        node?.classList.replace('show', 'hide');
      } else {
        node?.classList.replace('hide', 'show');
      }
      forceUpdate(this.el);
    };
  }
}
