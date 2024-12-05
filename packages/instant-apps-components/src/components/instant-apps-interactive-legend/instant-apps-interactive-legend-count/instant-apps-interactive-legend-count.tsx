import { Component, Element, forceUpdate, h, Prop } from '@stencil/core';
import { ICategory } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { interactiveLegendState, store } from '../support/store';
import {
  calculateTotalCount,
  calculateTotalFeatureCountForNestedSymbols,
  checkNestedUniqueSymbol,
  checkRelationshipRamp,
  getCategoriesArray,
  getIntLegendLayerData,
  getNestedInfoData,
  getTheme,
} from '../support/helpers';
import { importIntl } from '@arcgis/core-adapter';

const CSS = {
  countText: ' instant-apps-interactive-legend__info-count-text',
  countTextSelected: ' instant-apps-interactive-legend__info-count-text--selected',
  totalFeatureCount: 'instant-apps-interactive-legend__total-feature-count',
  compact: 'instant-apps-interactive-legend-count--compact',
};

@Component({
  tag: 'instant-apps-interactive-legend-count',
  styleUrl: 'instant-apps-interactive-legend-count.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendCount {
  intl: __esri.intl;

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
    const intl = await importIntl();
    this.intl = intl;
  }

  render() {
    const compact = store.get('compact') ? CSS.compact : '';
    return (
      <div key="int-legend-count" class={compact}>
        {this.showTotal ? (
          <span class={CSS.totalFeatureCount}>
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
        const layerData = getIntLegendLayerData(this.activeLayerInfo.layer as __esri.FeatureLayer);
        const categoriesArr = getCategoriesArray(layerData.categories)[1];
        total = categoriesArr.count as number;
      } else {
        total = calculateTotalCount(categoriesArr);
      }
    }
    return this.intl.formatNumber(total as number);
  }
}
