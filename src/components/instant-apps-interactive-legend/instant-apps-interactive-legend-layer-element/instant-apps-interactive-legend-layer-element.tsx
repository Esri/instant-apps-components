import { Component, Element, Listen, Prop, State, forceUpdate, h } from '@stencil/core';
import { getTheme } from '../support/helpers';

const CSS = {
  service: 'esri-legend__service',
  groupLayerChild: 'esri-legend__group-layer-child',
  layer: 'esri-legend__layer',
};

@Component({
  tag: 'instant-apps-interactive-legend-layer-element',
  styleUrl: 'instant-apps-interactive-legend-layer-element.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendLayerElement {
  layerCaption;

  @Element()
  el: HTMLInstantAppsInteractiveLegendLayerElementElement;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  featureCount: boolean;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  messages;

  @Prop()
  isChild: boolean;

  @State()
  expanded = true;

  @Listen('layerCaptionElementExpandUpdated', { target: 'window' })
  layerCaptionElementExpandUpdatedEmitted() {
    this.expanded = this.layerCaption.expanded;
  }

  componentWillLoad() {
    const observer = new MutationObserver(() => {
      forceUpdate(this.el);
    });
    observer.observe(this.el, {
      attributes: true,
    });
  }

  render() {
    const layerClasses = !!this.activeLayerInfo.parent ? ` ${CSS.groupLayerChild}` : '';

    return (
      <div
        style={{
          borderLeft: '1px solid var(--calcite-ui-border-3)',
        }}
        class={`${CSS.service}${layerClasses}`}
        tabIndex={0}
      >
        <instant-apps-interactive-legend-layer-element-caption
          ref={node => (this.layerCaption = node)}
          legendvm={this.legendvm}
          feature-count={this.featureCount}
          activeLayerInfo={this.activeLayerInfo}
          messages={this.messages}
          isChild={!!this.isChild}
          class={getTheme(this.el)}
        />
        <div id={`${this.activeLayerInfo?.layer?.id}-legend-layer`} class={`${CSS.layer}${this.expanded === false ? ' hide' : ' show'}`}>
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
