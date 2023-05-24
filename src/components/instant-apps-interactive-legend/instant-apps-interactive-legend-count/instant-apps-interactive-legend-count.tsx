import { Component, Element, forceUpdate, h, Prop } from '@stencil/core';
import { ICategory } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { loadModules } from 'esri-loader';
import { interactiveLegendState } from '../support/store';
import {
  calculateTotalCount,
  calculateTotalFeatureCountForNestedSymbols,
  checkNestedUniqueSymbol,
  checkRelationshipRamp,
  getCategoriesArray,
  getIntLegendLayerData,
  getNestedInfoData,
  getTheme,
  handleFeatureCount,
  updateStore,
} from '../support/helpers';

const CSS = {
  countText: ' instant-apps-interactive-legend__info-count-text',
  countTextSelected: ' instant-apps-interactive-legend__info-count-text--selected',
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

  @Element()
  el: HTMLInstantAppsInteractiveLegendCountElement;

  @Prop()
  showTotal: boolean = false;

  @Prop()
  legendvm: __esri.LegendViewModel;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  categoryId: string; //LegendElementInfo.label

  @Prop()
  infoIndex: number;

  @Prop()
  messages;

  @Prop()
  selected: boolean;

  @Prop()
  legendElement: __esri.LegendElement;

  async componentWillLoad() {
    const observer = new MutationObserver(() => {
      forceUpdate(this.el);
    });
    observer.observe(this.el, {
      attributes: true,
    });
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
            const layerId = this.activeLayerInfo.layer.id;
            const layerData = data[layerId];
            updateStore(interactiveLegendState.data, { intLegendLayerData: layerData, layerId: layerId });
          },
          { initial: true },
        );
      },
      { initial: true, once: true },
    );
  }

  render() {
    console.log(this.legendElement);
    return (
      <div key="int-legend-count">
        {this.showTotal ? (
          <span>
            {this.messages?.totalFeatureCount}: {this.getTotalFeatureCount()}
          </span>
        ) : (
          <span key="element-info-count" class={`${CSS.countText} ${getTheme(this.el)}${this.selected ? CSS.countTextSelected : ''}`}>
            {this.getCount()}
          </span>
        )}
      </div>
    );
  }

  getCount(): string | undefined {
    const { categoryId } = this;
    const layerId = this.activeLayerInfo.layer.id;
    const isSingleElement = interactiveLegendState.data[layerId]?.categories?.size;
    if ((!interactiveLegendState.data || !layerId || !categoryId) && !isSingleElement) return '';

    const dataFromActiveLayerInfo = interactiveLegendState.data[layerId];
    if (!dataFromActiveLayerInfo) return;
    const { categories } = dataFromActiveLayerInfo;
    const category = categories.get(categoryId) as ICategory;

    let categoryData: ICategory;

    if (category?.nestedInfos) {
      // nested
      categoryData = getNestedInfoData(category, this.infoIndex);
    } else {
      categoryData = category;
    }

    return !isNaN(categoryData?.count as number) ? this.intl.formatNumber(categoryData.count as number) : '';
  }

  getTotalFeatureCount() {
    const layerId = this.activeLayerInfo.layer.id;
    if (!interactiveLegendState.data || !layerId) return '';
    const dataFromActiveLayerInfo = interactiveLegendState.data[layerId];
    if (!dataFromActiveLayerInfo) return;
    const { categories } = dataFromActiveLayerInfo;

    const categoriesArr = getCategoriesArray(categories);
    const isNestedUniqueSymbol = checkNestedUniqueSymbol(categories);

    let total: number;

    if (isNestedUniqueSymbol) {
      // nested
      total = calculateTotalFeatureCountForNestedSymbols(categoriesArr);
    } else {
      if (checkRelationshipRamp(this.activeLayerInfo)) {
        const layerData = getIntLegendLayerData(this.activeLayerInfo.layer as __esri.FeatureLayer, interactiveLegendState.data);
        const categoriesArr = getCategoriesArray(layerData.categories)[1];
        total = categoriesArr.count as number;
      } else {
        total = calculateTotalCount(categoriesArr);
      }
    }
    return this.intl.formatNumber(total as number);
  }
}
