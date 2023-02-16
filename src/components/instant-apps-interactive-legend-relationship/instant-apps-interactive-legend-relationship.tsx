import { Component, h, Prop, State } from '@stencil/core';
import { loadModules } from 'esri-loader';
import { FilterMode, IInteractiveLegendData } from '../instant-apps-interactive-legend/instant-apps-interactive-legend-classic/interfaces/interfaces';
import { setupRelationshipDrawingStyle } from '../instant-apps-interactive-legend/support/relationshipRampUtils';

@Component({
  tag: 'instant-apps-interactive-legend-relationship',
  styleUrl: 'instant-apps-interactive-legend-relationship.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendRelationship {
  symbolUtils;

  @State()
  reRender = false;

  @Prop()
  data: IInteractiveLegendData;

  @Prop()
  filterMode: FilterMode;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  legendElement;

  async componentDidLoad() {
    const [symbolUtils] = await loadModules(['esri/symbols/support/symbolUtils']);
    this.symbolUtils = symbolUtils;
    this.reRender = !this.reRender;
  }

  render() {
    return this.renderRelationshipRamp(this.activeLayerInfo, this.legendElement);
  }

  renderRelationshipRamp(activeLayerInfo: __esri.ActiveLayerInfo, legendElement) {
    if (!this.symbolUtils) return;
    const relationshipRamp = this.symbolUtils.renderRelationshipRampPreviewHTML((activeLayerInfo.layer as __esri.FeatureLayer).renderer);
    this.applyRelationshipRampInteractivity(relationshipRamp, activeLayerInfo, legendElement);

    const outerHTML = relationshipRamp?.outerHTML;
    return <div key="relationship-ramp-diamond" innerHTML={`${outerHTML}`} />;
  }

  applyRelationshipRampInteractivity(relationshipRamp: HTMLElement, activeLayerInfo: __esri.ActiveLayerInfo, legendElement) {
    const gNode = relationshipRamp.querySelector('.esri-relationship-ramp--diamond__middle-column--ramp svg g') as HTMLElement;
    const rampSVG = gNode.children;
    setupRelationshipDrawingStyle(rampSVG, activeLayerInfo, legendElement, this.data, this.filterMode);
  }
}
