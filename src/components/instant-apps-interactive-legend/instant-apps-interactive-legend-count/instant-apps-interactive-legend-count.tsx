import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { ICategory, IInteractiveLegendData } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { loadModules } from 'esri-loader';

const CSS = {
  countText: 'instant-apps-interactive-legend__info-count-text',
};

@Component({
  tag: 'instant-apps-interactive-legend-count',
  styleUrl: 'instant-apps-interactive-legend-count.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendCount {
  intl: __esri.intl;
  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles;

  @Prop()
  showTotal: boolean = false;

  @Prop()
  data: IInteractiveLegendData;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  layerId: string;

  @Prop()
  categoryId: string; //LegendElementInfo.label

  @State()
  reRender: boolean = false;

  @Watch('data')
  updateUI() {
    this.reRender = !this.reRender;
  }

  async componentWillLoad() {
    const [intl, reactiveUtils, Handles] = await loadModules(['esri/intl', 'esri/core/reactiveUtils', 'esri/core/Handles']);
    this.intl = intl;
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();
  }

  render() {
    return (
      <Host>
        {this.showTotal ? (
          `Total feature count: ${this.getTotalFeatureCount()}`
        ) : (
          <span key="element-info-count" class={CSS.countText}>
            {this.getCount()}
          </span>
        )}
      </Host>
    );
  }

  getCount(): string {
    const { data, layerId, categoryId } = this;

    if (!data || !layerId || !categoryId) return '';

    const dataFromActiveLayerInfo = data[layerId];
    const { categories } = dataFromActiveLayerInfo;
    const category = categories.get(categoryId) as ICategory;
    const { count } = category;

    return this.intl.formatNumber(count as number);
  }

  getTotalFeatureCount() {
    const { data, layerId } = this;
    if (!data || !layerId) return '';
    const dataFromActiveLayerInfo = data[layerId];
    const { categories } = dataFromActiveLayerInfo;
    const total = Array.from(categories.entries())
      .map(entry => entry[1].count)
      .reduce((acc: number, curr: number) => acc + curr);
    return this.intl.formatNumber(total as number);
  }
}
