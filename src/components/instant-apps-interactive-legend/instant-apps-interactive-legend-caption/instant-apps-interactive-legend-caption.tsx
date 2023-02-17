import { Component, h, Prop } from '@stencil/core';
import { validateInteractivity } from '../support/helpers';

import { interactiveLegendState, store } from '../support/store';

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

  @Prop()
  expanded: boolean;

  render() {
    console.log('rendered');
    const isInteractive = validateInteractivity(this.activeLayerInfo);
    const isNotExpanded = this.expanded === false;
    const expandCollapseText = isNotExpanded ? this.messages?.expand : this.messages?.collapse;
    return (
      <header key={`${this.activeLayerInfo?.layer?.id}-header`} class={CSS.interacitveLegendHeader}>
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
            <instant-apps-interactive-legend-count layer-id={this.activeLayerInfo?.layer?.id} show-total={true} messages={this.messages} legendvm={this.legendvm} />
          ) : null}
        </span>
      </header>
    );
  }

  toggleExpanded(activeLayerInfo: __esri.ActiveLayerInfo): void {
    const expanded = !interactiveLegendState.data[activeLayerInfo?.layer.id].expanded.layer;
    interactiveLegendState.data[activeLayerInfo?.layer.id].expanded.layer = expanded;
    const data = { ...interactiveLegendState.data };
    store.set('data', data);
  }
}
