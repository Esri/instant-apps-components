import { Component, Element, Listen, Prop, State, forceUpdate, h } from '@stencil/core';
import { getTheme } from '../support/helpers';

const CSS = {
  service: 'esri-legend__service',
  groupLayer: 'esri-legend__group-layer',
  groupContent: 'esri-legend__group-content',
};

@Component({
  tag: 'instant-apps-interactive-legend-group-legend-element',
  styleUrl: 'instant-apps-interactive-legend-group-legend-element.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendGroupLegendElement {
  layerCaption: HTMLInstantAppsInteractiveLegendLayerElementCaptionElement | undefined;

  @Element()
  el: HTMLInstantAppsInteractiveLegendGroupLegendElementElement;

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

  @State()
  expanded = true;

  @Listen('layerCaptionElementExpandUpdated', { target: 'window' })
  layerCaptionElementExpandUpdatedEmitted() {
    this.expanded = !!this.layerCaption?.expanded;
  }

  async componentWillLoad() {
    const observer = new MutationObserver(() => {
      forceUpdate(this.el);
    });
    observer.observe(this.el, {
      attributes: true,
    });
  }

  render() {
    return (
      <div
        style={{
          borderLeft: '1px solid var(--calcite-ui-border-3)',
        }}
        class={`${CSS.service} ${CSS.groupLayer}`}
      >
        <instant-apps-interactive-legend-layer-element-caption
          ref={node => (this.layerCaption = node)}
          class={getTheme(this.el)}
          legendvm={this.legendvm}
          feature-count={this.featureCount}
          activeLayerInfo={this.activeLayerInfo}
          messages={this.messages}
          isChild={this.isChild}
        />
        <div class={`${CSS.groupContent} ${this.expanded === false ? 'hide' : 'show'}`}>
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
