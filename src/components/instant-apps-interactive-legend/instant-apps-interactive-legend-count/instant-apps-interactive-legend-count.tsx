import { Component, Host, h, Prop, State } from '@stencil/core';
import { ICategory } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { loadModules } from 'esri-loader';
import { interactiveLegendState, store } from '../support/store';
import { handleFeatureCount } from '../support/helpers';

const CSS = {
  countText: ' instant-apps-interactive-legend__info-count-text',
  countTextSelected: ' instant-apps-interactive-legend__info-count-text--selected',
  calcite: {
    theme: {
      light: 'calcite-mode-light',
      dark: 'calcite-mode-dark',
    },
  },
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
  legendvm: __esri.LegendViewModel;

  @Prop()
  layerId: string;

  @Prop()
  categoryId: string; //LegendElementInfo.label

  @Prop()
  messages;

  @Prop()
  selected: boolean;

  @State()
  reRender;

  async componentWillLoad() {
    const [intl, reactiveUtils, Handles] = await loadModules(['esri/intl', 'esri/core/reactiveUtils', 'esri/core/Handles']);
    this.intl = intl;
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();
    this.reactiveUtils.when(
      () => this.legendvm,
      () => {
        this.reactiveUtils.watch(
          () => this.legendvm?.view?.updating,
          async () => {
            const data = await handleFeatureCount(this.legendvm, interactiveLegendState.data);
            const layerData = data[this.layerId];
            interactiveLegendState.data[layerData] = layerData;
            this.reRender = !this.reRender;
          },
          { initial: true },
        );
      },
      { initial: true, once: true },
    );
  }

  render() {
    return (
      <div key="int-legend-count">
        {this.showTotal ? (
          <span>
            {this.messages?.totalFeatureCount}: {this.getTotalFeatureCount()}
          </span>
        ) : (
          <span key="element-info-count" class={`${CSS.countText} ${this._getTheme()}${this.selected ? CSS.countTextSelected : ''}`}>
            {this.getCount()}
          </span>
        )}
      </div>
    );
  }

  getCount(): string | undefined {
    const { layerId, categoryId } = this;
    const isSingleElement = interactiveLegendState.data[layerId]?.categories?.size;
    if ((!interactiveLegendState.data || !layerId || !categoryId) && !isSingleElement) return '';

    const dataFromActiveLayerInfo = interactiveLegendState.data[layerId];
    if (!dataFromActiveLayerInfo) return;
    const { categories } = dataFromActiveLayerInfo;
    const category = categories.get(categoryId) as ICategory;
    const { count } = category;

    return this.intl.formatNumber(count as number);
  }

  getTotalFeatureCount() {
    const { layerId } = this;
    if (!interactiveLegendState.data || !layerId) return '';
    const dataFromActiveLayerInfo = interactiveLegendState.data[layerId];
    if (!dataFromActiveLayerInfo) return;
    const { categories } = dataFromActiveLayerInfo;
    const total = Array.from(categories.entries())
      .map((entry: any) => entry?.[1]?.count)
      .reduce((acc: number, curr: number) => acc + curr);
    return this.intl.formatNumber(total as number);
  }

  private _getTheme(): string {
    const { light, dark } = CSS.calcite.theme;
    const isDarkTheme = document.body.classList.contains(dark);
    return isDarkTheme ? dark : light;
  }
}
