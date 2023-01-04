import { MenuPlacement } from '@esri/calcite-components/dist/types/utils/floating-ui';
import { Component, h, Prop, State } from '@stencil/core';

const CSS = {
  label: 'esri-legend__service-label',
  header: 'esri-widget__heading',
  interacitveLegendHeader: 'instant-apps-interactive-legend__header',
};

@Component({
  tag: 'instant-apps-interactive-legend-caption',
  styleUrl: 'instant-apps-interactive-legend-caption.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendCaption {
  @State()
  reRender = false;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  featureCount: boolean;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  data: any;

  render() {
    return (
      <header class={CSS.interacitveLegendHeader}>
        <span>
          <h3 class={`${CSS.header} ${CSS.label}`}>{this.activeLayerInfo?.title}</h3>
          {this.featureCount ? (
            <instant-apps-interactive-legend-count data={this.data} layer-id={this.activeLayerInfo?.layer?.id} show-total={true}></instant-apps-interactive-legend-count>
          ) : null}
        </span>
        <calcite-dropdown onClick={(e: Event) => e.stopPropagation()} placement={'menu-placement' as MenuPlacement} width="l">
          {this.legendvm?.activeLayerInfos?.toArray()?.map(activeLayerInfo => (
            <calcite-dropdown-item
              onClick={() => {
                this.data.selectedLayerId = activeLayerInfo?.layer?.id;
                this.reRender = !this.reRender;
              }}
              selected={activeLayerInfo?.layer?.id === this.data?.selectedLayerId}
            >
              {activeLayerInfo?.layer?.title}
            </calcite-dropdown-item>
          ))}
          <calcite-action scale="m" icon="chevron-down" slot="trigger" text="Open"></calcite-action>
        </calcite-dropdown>
      </header>
    );
  }
}
