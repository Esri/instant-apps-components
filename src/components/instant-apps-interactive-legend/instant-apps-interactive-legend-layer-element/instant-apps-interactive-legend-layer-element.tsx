import { Component, Listen, Prop, State, h } from '@stencil/core';

const CSS = {
  service: '',
  groupLayerChild: '',
  layer: '',
};

@Component({
  tag: 'instant-apps-interactive-legend-layer-element',
  styleUrl: 'instant-apps-interactive-legend-layer-element.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendLayerElement {
  layerCaption;

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

  @Listen('layerCaptionExpandUpdated', { target: 'window' })
  layerCaptionExpandUpdatedEmitted() {
    this.expanded = this.layerCaption.expanded;
  }

  render() {
    const layerClasses = !!this.activeLayerInfo.parent ? ` ${CSS.groupLayerChild}` : '';

    return (
      <div class={`${CSS.service}${layerClasses}`} tabIndex={0}>
        <instant-apps-interactive-legend-layer-caption
          ref={node => (this.layerCaption = node)}
          legendvm={this.legendvm}
          feature-count={this.featureCount}
          activeLayerInfo={this.activeLayerInfo}
          messages={this.messages}
          isChild={!!this.isChild}
        />
        <div id={`${this.activeLayerInfo?.layer?.id}-legend-layer`} class={`${CSS.layer}${this.expanded === false ? ' hide' : ' show'}`}>
          <slot name="content"></slot>
        </div>
      </div>
    );
  }
}
