import { loadModules } from 'esri-loader';
import { IInteractiveLegendData, ICategories, IIntLegendLayerData, ICategory, FilterMode } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { getMergedEffect } from './effects';
import { interactiveLegendState, store } from '../support/store';

// data handling
function activeLayerInfoCallback(
  intLegendDataPromises: Promise<IIntLegendLayerData>[],
  legendViewModel: __esri.LegendViewModel,
  reactiveUtils: __esri.reactiveUtils,
): (activeLayerInfo: __esri.ActiveLayerInfo) => void {
  return (activeLayerInfo: __esri.ActiveLayerInfo) => {
    const aclType = activeLayerInfo?.layer?.type;
    if (aclType === 'feature' || aclType === 'group') {
      // Step 3a. Push to promises array since there are promises within function
      const intLegendDataPromise = createInteractiveLegendDataForLayer(legendViewModel, activeLayerInfo, reactiveUtils).then(res => res);
      if (intLegendDataPromise) {
        intLegendDataPromises.push(intLegendDataPromise as Promise<IIntLegendLayerData>);
      }

      const handleALIChild = (aliChild: __esri.ActiveLayerInfo) => {
        const intLegendDataPromise = createInteractiveLegendDataForLayer(legendViewModel, aliChild, reactiveUtils).then(res => res);
        if (intLegendDataPromise) {
          intLegendDataPromises.push(intLegendDataPromise as Promise<IIntLegendLayerData>);
        }
      };

      // Take ACLs children into account
      activeLayerInfo.children.forEach(child => {
        handleALIChild(child);
        if (child?.children?.length > 0) {
          child.children.forEach(innerALIChild => {
            handleALIChild(innerALIChild);
            if (innerALIChild?.children?.length > 0) {
              innerALIChild.children.forEach(innerInnerALIChild => {
                handleALIChild(innerInnerALIChild);
              });
            }
          });
        }
      });
    }
  };
}

export async function createInteractiveLegendDataForLayer(
  legendViewModel: __esri.LegendViewModel,
  activeLayerInfo: __esri.ActiveLayerInfo,
  reactiveUtils: __esri.reactiveUtils,
): Promise<IIntLegendLayerData | null> {
  try {
    // Get first Legend Element from Active LayerInfo - only first legend element will be interactive
    await reactiveUtils.whenOnce(() => legendViewModel?.state === 'ready');
    await reactiveUtils.whenOnce(() => activeLayerInfo?.ready);
    const legendElement = activeLayerInfo.legendElements[0] as __esri.LegendElement;

    // Each active layer info will have it's own property in object - we'll use the layer ID to categorize each layer
    // Hash map for each layers interactive categories i.e. Global power plants, Hydro, Solar, Wind, etc.
    const categories = new Map() as ICategories;

    // Layer to access field from it's renderer to be used in expression
    const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
    // Get Feature Layer View to query
    const fLayerView = await legendViewModel.view.whenLayerView(fLayer);
    await reactiveUtils.whenOnce(() => fLayerView?.updating === false);
    const field = fLayer.renderer?.get('field') as string;

    legendElement?.infos?.forEach(legendElementInfo => {
      const isNestedUniqueSymbol = legendElementInfo.type === 'symbol-table';
      if (isNestedUniqueSymbol) {
        const nestedInfos: any = [];
        legendElementInfo.infos.forEach(nestedUniqueSymbolInfo => {
          const category = {
            count: null,
            selected: false,
            legendElementInfo: nestedUniqueSymbolInfo,
          };
          nestedInfos.push(category);
        });
        const category = {
          count: null,
          selected: false,
          legendElementInfo,
          nestedInfos,
        };
        categories.set(legendElementInfo.title, category);
      } else {
        const category = {
          count: null,
          selected: false,
          legendElementInfo,
        };
        categories.set(legendElementInfo.label ?? fLayer.id, category);
      }
    });

    // Generated expression to apply to layer filters
    const queryExpressions: string[] = [];

    // Total feature count
    return Promise.resolve({
      activeLayerInfo,
      title: fLayerView?.layer?.title,
      categories,
      field,
      queryExpressions,
      totalCount: null,
      fLayerView,
      legendElement,
    });
  } catch {
    return Promise.resolve(null);
  }
}

export async function generateData(legendViewModel: __esri.LegendViewModel, reactiveUtils: __esri.reactiveUtils): Promise<IInteractiveLegendData> {
  // Create data object to return
  const data = {} as IInteractiveLegendData;

  // Set up Interactive Legend Data for each layer using it's corresponding active layer info
  // Array of promises - needed due to queryFeatureCount and whenLayerView calls
  const intLegendDataPromises = [] as Promise<IIntLegendLayerData>[];

  // Iterate through each Active Layer Info and create data bucket for each layer
  legendViewModel.activeLayerInfos.forEach(activeLayerInfoCallback(intLegendDataPromises, legendViewModel, reactiveUtils));

  // Store resolved data
  const intLegendLayerDataObjs = await Promise.all(intLegendDataPromises);
  intLegendLayerDataObjs.forEach(intLegendLayerDataObj => (data[intLegendLayerDataObj?.activeLayerInfo?.layer?.id] = intLegendLayerDataObj));

  return data;
}

// data getters
export function getCategoriesArray(categories: ICategories): ICategory[] {
  return Array.from(categories).map((category: any) => category[1]);
}

export function getCategoryData(
  data: IIntLegendLayerData,
  layer: __esri.Layer,
  elementInfo: any,
  parentLegendElementInfoData: ICategory | undefined,
  infoIndex: number,
): ICategory {
  return parentLegendElementInfoData ? parentLegendElementInfoData?.nestedInfos?.[infoIndex] : data?.categories?.get(elementInfo?.label ?? layer?.id);
}

export function getIntLegendLayerData(fLayer: __esri.FeatureLayer): IIntLegendLayerData {
  return interactiveLegendState?.data?.[fLayer?.id];
}

// filtering
export async function handleFilter(data: IIntLegendLayerData, info: any, infoIndex: number, filterMode: FilterMode, parentLegendElementInfo?: any): Promise<void> {
  const [FeatureFilter, FeatureEffect] = await loadModules(['esri/layers/support/FeatureFilter', 'esri/layers/support/FeatureEffect']);
  const { queryExpressions, fLayerView } = data;
  generateQueryExpressions(data, info, infoIndex, parentLegendElementInfo);
  const where = queryExpressions.join(' OR ');
  const timeExtent = fLayerView?.filter?.timeExtent ?? null;

  const { type } = filterMode;

  if (type === 'filter') {
    fLayerView.filter = new FeatureFilter({ where, timeExtent });
  } else {
    if (filterMode.effect) {
      const { includedEffect, excludedEffect } = filterMode.effect;
      const mergedExcludedEffect = await getMergedEffect(excludedEffect, fLayerView, 'excludedEffect');
      const mergedIncludedEffect = await getMergedEffect(includedEffect, fLayerView, 'includedEffect');

      fLayerView.featureEffect = new FeatureEffect({
        filter: new FeatureFilter({ where, timeExtent }),
        includedEffect: mergedIncludedEffect,
        excludedEffect: mergedExcludedEffect,
      }) as __esri.FeatureEffect;
    }
  }
  return Promise.resolve();
}

export function handlePredominanceExpression(elementInfo: any, featureLayerView: __esri.FeatureLayerView): string {
  const authoringInfo = featureLayerView ? (featureLayerView.layer.renderer.authoringInfo as any) : null;
  const fields = authoringInfo ? authoringInfo.fields : null;
  const expressionArr: string[] = [];
  if (!fields) {
    return '';
  }
  if (elementInfo.hasOwnProperty('value')) {
    fields.forEach(field => {
      if (elementInfo.value === field) {
        return;
      }
      const sqlQuery = `(${elementInfo.value} > ${field} OR (${field} IS NULL AND ${elementInfo.value} <> 0 AND ${elementInfo.value} IS NOT NULL))`;

      expressionArr.push(sqlQuery);
    });
    return expressionArr.join(' AND ');
  } else {
    const queryForZeroes: string[] = [];
    fields.forEach(field => {
      queryForZeroes.push(`${field} = 0`);
    });

    const otherExpression: string[] = [];
    if (fields.length > 2) {
      fields.forEach(field1 => {
        fields.forEach(field2 => {
          if (field1 === field2) {
            return;
          }
          const queryForMultiplePredominance: string[] = [];
          fields.forEach(field3 => {
            if (field1 === field3 || field2 === field3) {
              return;
            }
            queryForMultiplePredominance.push(`${field1} = ${field2} AND (${field1} > ${field3} OR ${field1} >= ${field3})`);
          });
          otherExpression.push(`(${queryForMultiplePredominance.join(' AND ')})`);
        });
      });

      const isNull: string[] = [];

      fields.forEach(field => {
        isNull.push(`${field} IS NULL`);
      });
      const generatedOtherExpression = `(${queryForZeroes.join(' AND ')}) OR (${otherExpression.join(' OR ')}) OR (${isNull.join(' AND ')})`;
      return generatedOtherExpression;
    } else {
      const expressions: string[] = [];
      fields.forEach(field1 => {
        fields.forEach(field2 => {
          if (field1 === field2) {
            return;
          }
          expressions.push(`${field1} = ${field2}`);
          expressions.push(`(${queryForZeroes.join(' AND ')})`);
        });
      });

      const zeroAndNull: string[] = [];
      fields.forEach(field1 => {
        fields.forEach(field2 => {
          if (field1 === field2) {
            return;
          }
          zeroAndNull.push(`(${field1} = 0 AND ${field2} IS NULL) OR (${field1} IS NULL AND ${field2} IS NULL)`);
        });
      });

      return `(${expressions.join(' OR ')}) OR (${zeroAndNull.join(' OR ')})`;
    }
  }
}

function generateQueryExpressions(data: IIntLegendLayerData, info: any, infoIndex: number, parentLegendElementInfo?: any): void {
  const { field, legendElement, categories, fLayerView } = data;

  const queryExpressions = data?.queryExpressions;

  if (parentLegendElementInfo) {
    const nestedCategories = Array.from(data.categories).map(entry => entry[1]);
    nestedCategories.forEach(nestedCategory => {
      const untouched = nestedCategory.nestedInfos?.every(nestedInfo => !nestedInfo.selected);

      if (untouched) {
        nestedCategory.nestedInfos?.forEach(nestedInfo => {
          const expression = field ? `${field} = '${nestedInfo.legendElementInfo.value}'` : null;

          const expressionIndex = expression ? queryExpressions.indexOf(expression) : -1;

          if (expression && expressionIndex !== -1) {
            queryExpressions.splice(expressionIndex, 1);
          }
        });
      }
    });
  }

  const legendElementInfos = legendElement?.infos;

  const isPredominance = checkPredominance(fLayerView);

  let queryExpression = isPredominance
    ? (handlePredominanceExpression(info, fLayerView) as string)
    : generateQueryExpression(info, field, infoIndex, legendElement, legendElementInfos, '');
  const category = parentLegendElementInfo
    ? (categories.get(parentLegendElementInfo.title)?.nestedInfos?.[infoIndex] as ICategory)
    : (categories.get(info.label ?? fLayerView?.layer?.id) as ICategory);

  if (category) category.selected = !category?.selected;

  const hasOneValue = legendElementInfos && legendElementInfos.length === 1;

  const expressionIndex = queryExpressions.indexOf(queryExpression as string);

  if (isPredominance) {
    const expressionIndex = queryExpressions.indexOf(queryExpression);
    if (queryExpressions.length === 0 || expressionIndex === -1) {
      if (queryExpressions && queryExpressions[0] === '1=0') {
        queryExpressions.splice(0, 1);
      }
      queryExpressions.push(queryExpression);
    } else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0]) {
      queryExpressions[0] = '1=0';
    } else if (queryExpressions && queryExpressions.length === 1) {
      queryExpressions[0] = queryExpression;
    } else if (queryExpressions && queryExpressions.length === 1 && queryExpression !== queryExpressions[0] && queryExpressions[0] === '1=0') {
      queryExpressions[0] = queryExpression;
    } else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0] && queryExpressions[0] === '1=0') {
      queryExpressions[0] = null;
    } else {
      queryExpressions.splice(expressionIndex, 1);
    }

    queryExpressions.join(' OR ');
  } else if (queryExpressions.length === 0 || expressionIndex === -1) {
    if (queryExpressions && queryExpressions[0] === '1=0') {
      queryExpressions.splice(0, 1);
    }
    queryExpressions.push(queryExpression);
  } else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0] && !hasOneValue) {
    queryExpressions[0] = '1=0';
  } else if (queryExpressions && queryExpressions.length === 1 && !hasOneValue) {
    queryExpressions[0] = queryExpression;
  } else if (queryExpressions && queryExpressions.length === 1 && queryExpression !== queryExpressions[0] && queryExpressions[0] === '1=0' && !hasOneValue) {
    queryExpressions[0] = queryExpression;
  } else if (queryExpressions && queryExpressions.length === 1 && queryExpression === queryExpressions[0] && queryExpressions[0] === '1=0' && !hasOneValue) {
    queryExpressions[0] = null;
  } else {
    queryExpressions.splice(expressionIndex, 1);
  }

  if (parentLegendElementInfo) {
    const expressionList: string[] = [];
    const nestedCategories = Array.from(data.categories).map(entry => entry[1]);
    nestedCategories.forEach(nestedCategory => {
      const untouched = nestedCategory.nestedInfos?.every(nestedInfo => !nestedInfo.selected);

      if (untouched) {
        nestedCategory.nestedInfos?.forEach(nestedInfo => {
          const expression = field ? `${field} = '${nestedInfo.legendElementInfo.value}'` : null;
          if (expression) expressionList.push(`${field} = '${nestedInfo.legendElementInfo.value}'`);
        });
      }
    });

    expressionList.forEach(expression => {
      if (queryExpressions.indexOf(expression) === -1) {
        queryExpressions.push(expression);
      }
    });
  }
}

function generateQueryExpression(info: any, field: string, infoIndex: number, legendElement: __esri.LegendElement, legendElementInfos: any, normalizationField?: string): string {
  const { value } = info;
  if (legendElement.type === 'symbol-table') {
    // Classify data size/color ramp
    if (!info.hasOwnProperty('value') || (Array.isArray(info.value) && legendElementInfos?.length === 1)) {
      // Classify data size/color ramp - 'Other' category
      if (
        legendElementInfos?.[0].hasOwnProperty('value') &&
        Array.isArray(legendElementInfos?.[0].value) &&
        legendElementInfos?.[legendElementInfos?.length - 2] &&
        legendElementInfos?.[legendElementInfos?.length - 2].hasOwnProperty('value') &&
        Array.isArray(legendElementInfos?.[legendElementInfos?.length - 2].value)
      ) {
        const expression = normalizationField
          ? `((${field}/${normalizationField}) > ${legendElementInfos?.[0].value[1]}) OR ((${field}/${normalizationField}) < ${
              legendElementInfos?.[legendElementInfos?.length - 2].value[0]
            }) OR ${normalizationField} = 0 OR ${normalizationField} IS NULL`
          : `${field} > ${legendElementInfos?.[0].value[1]} OR ${field} < ${legendElementInfos?.[legendElementInfos?.length - 2].value[0]} OR ${field} IS NULL`;
        return expression;
      } else if (legendElementInfos?.length === 1) {
        return '1=0';
      } else {
        // Types unique symbols - 'Other' category
        const expressionList = [] as string[];
        legendElementInfos?.forEach(legendElementInfo => {
          if (legendElementInfo?.value) {
            const { value } = legendElementInfo;
            const singleQuote = value.indexOf("'") !== -1 ? value.split("'").join("''") : null;
            const expression = singleQuote
              ? `${field} <> '${singleQuote}'`
              : isNaN(value) || (typeof value === 'string' && !value.trim())
              ? `${field} <> '${value}'`
              : `${field} <> ${value} AND ${field} <> '${value}'`;
            expressionList.push(expression);
          }
        });
        const noExpression = expressionList.join(' AND ');
        return field && noExpression ? `${noExpression} OR ${field} IS NULL` : '';
      }
    } else {
      const singleQuote = value.indexOf("'") !== -1 ? value.split("'").join("''") : null;
      const isArray = Array.isArray(info.value);
      const isLastElement = legendElementInfos?.length - 1 === infoIndex;
      const lastElementAndNoValue = !legendElementInfos?.[legendElementInfos?.length - 1].hasOwnProperty('value');
      const secondToLastElement = infoIndex === legendElementInfos?.length - 2;
      const expression = isArray
        ? normalizationField
          ? isLastElement || (lastElementAndNoValue && secondToLastElement)
            ? `(${field}/${normalizationField}) >= ${value[0]} AND (${field}/${normalizationField}) <= ${info.value[1]}`
            : `(${field}/${normalizationField}) > ${value[0]} AND (${field}/${normalizationField}) <= ${info.value[1]}`
          : isLastElement || (lastElementAndNoValue && secondToLastElement)
          ? `${field} >= ${value[0]} AND ${field} <= ${value[1]}`
          : `${field} > ${value[0]} AND ${field} <= ${value[1]}`
        : legendElementInfos?.length === 1 && field
        ? isNaN(value) || !value.trim().length
          ? `${field} <> '${value}'`
          : `${field} <> ${value} OR ${field} <> '${value}'`
        : singleQuote
        ? `${field} = '${singleQuote}'`
        : isNaN(value) || !value.trim().length
        ? `${field} = '${value}'`
        : `${field} = ${value} OR ${field} = '${value}'`;

      return expression;
    }
  } else {
    return '';
  }
}

// checks
export function checkAllSelected(data: IIntLegendLayerData): boolean {
  return data && Array.from(data.categories.entries()).every(entry => entry[1].selected);
}

export function checkNoneSelected(data: IIntLegendLayerData): boolean {
  if (Array.isArray(data)) {
    return data.every(entry => !entry.selected);
  } else {
    return data && Array.from(data.categories.entries()).every(entry => !entry[1].selected) && data.queryExpressions[0] !== '1=0';
  }
}

export function checkPredominance(fLayerView: __esri.FeatureLayerView): boolean {
  const authoringInfoType = fLayerView?.get('layer.renderer.authoringInfo.type');
  return authoringInfoType === 'predominance';
}

export function checkRelationshipRamp(activeLayerInfo: __esri.ActiveLayerInfo): boolean {
  return activeLayerInfo?.legendElements[1]?.type === 'relationship-ramp';
}

export function validateInteractivity(activeLayerInfo: __esri.ActiveLayerInfo, legendElement?: any, legendElementIndex?: number): boolean {
  const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
  const field = (fLayer?.renderer as any)?.field;
  const type = legendElement?.type;
  const layerView = activeLayerInfo.get('layerView') as __esri.LayerView;
  const classBreakInfos = layerView?.get('layer.renderer.classBreakInfos') as __esri.ClassBreak[];
  const uniqueValueInfos = layerView?.get('layer.renderer.uniqueValueInfos') && field;
  const isSizeRamp = type === 'size-ramp';
  const isColorRamp = type === 'color-ramp';
  const opacityRamp = type === 'opacity-ramp';
  const heatmapRamp = type === 'heatmap-ramp';

  const hasMoreThanOneClassBreak = layerView && classBreakInfos && classBreakInfos.length > 1;

  const authoringInfoType = layerView?.get('layer.renderer.authoringInfo.type');
  const classifyDataCheckedColorRamp = authoringInfoType === 'class-breaks-color';
  const classifyDataCheckedSizeRamp = authoringInfoType === 'class-breaks-size';

  const singleSymbol = legendElement?.infos?.length === 1 && !field;

  const isRelationshipRamp = authoringInfoType === 'relationship' && legendElement?.type !== 'size-ramp' && legendElement?.type !== 'symbol-table';

  const isFeatureLayer = activeLayerInfo?.get('layer.type') === 'feature';

  const moreThanOneClassBreak = isFeatureLayer && field && !isColorRamp && !isSizeRamp && hasMoreThanOneClassBreak;

  const oneClassBreak = isFeatureLayer && field && !isColorRamp && !isSizeRamp && !hasMoreThanOneClassBreak ? true : false;

  const validate =
    oneClassBreak ||
    (checkPredominance(layerView as __esri.FeatureLayerView) && !isSizeRamp) ||
    (classifyDataCheckedColorRamp && field) ||
    (classifyDataCheckedSizeRamp && field) ||
    (singleSymbol && !field && field !== null) ||
    isRelationshipRamp ||
    uniqueValueInfos
      ? true
      : false;

  const hasClustering = activeLayerInfo?.get('layer.featureReduction') && activeLayerInfo?.legendElements[legendElementIndex as number]?.type === 'size-ramp';

  const isSingleSymbol = legendElement?.type === 'symbol-table' && legendElement?.infos?.length === 1;

  const hasColorRamp = !activeLayerInfo?.legendElements.every(legendElement => legendElement.type !== 'color-ramp');

  const hasSizeRamp = !activeLayerInfo?.legendElements.every(legendElement => legendElement.type !== 'size-ramp');

  const singleSymbolColor = isSingleSymbol && hasColorRamp;

  const singleSymbolSize = isSingleSymbol && hasSizeRamp;

  const isUnclassifiedSizeRamp = legendElement?.infos?.every(info => typeof info.value === 'number');

  const isBinning = activeLayerInfo?.legendElements?.[0]?.type === 'symbol-table' && activeLayerInfo?.legendElements?.[1]?.type === 'color-ramp';

  const isDotDensity = authoringInfoType === 'dot-density';

  const isValidated =
    isFeatureLayer && !hasClustering && !opacityRamp && !heatmapRamp && !singleSymbolColor && !singleSymbolSize && !isUnclassifiedSizeRamp && !isBinning && !isDotDensity
      ? classBreakInfos
        ? moreThanOneClassBreak || validate
        : oneClassBreak || validate
      : false;

  return isValidated;
}

// ui interactions
export function showAll(data: IIntLegendLayerData): IIntLegendLayerData {
  data.queryExpressions = [];
  if (data?.fLayerView?.filter?.where) data.fLayerView.filter.where = '';
  if (data?.fLayerView?.featureEffect?.filter?.where) (data.fLayerView as any).featureEffect = null;

  data.categories.forEach(category => {
    category.selected = false;
  });
  return data;
}

export function showAllNestedUniqueSymbol(data: IIntLegendLayerData, nestedUniqueSymbolCategoryId: string): IIntLegendLayerData {
  const nestedUniqueInfoCategory = data.categories.get(nestedUniqueSymbolCategoryId);

  nestedUniqueInfoCategory?.nestedInfos?.forEach(nestedInfo => {
    const expression = `${data.field} = '${nestedInfo.legendElementInfo.value}'`;
    const existingIndex = data.queryExpressions.indexOf(expression);
    if (existingIndex !== -1) {
      data.queryExpressions.splice(existingIndex, 1);
    }
    nestedInfo.selected = false;
  });

  const expressionList: string[] = [];
  const nestedCategories = Array.from(data.categories).map(entry => entry[1]);
  nestedCategories.forEach(nestedCategory => {
    const untouched = nestedCategory.nestedInfos?.every(nestedInfo => !nestedInfo.selected);

    if (untouched) {
      nestedCategory.nestedInfos?.forEach(nestedInfo => {
        expressionList.push(`${data.field} = '${nestedInfo.legendElementInfo.value}'`);
      });
    }
  });

  expressionList.forEach(expression => {
    if (data.queryExpressions.indexOf(expression) === -1) {
      data.queryExpressions.push(expression);
    }
  });

  let where = data.queryExpressions.join(' OR ');

  const allUntouched = nestedCategories.every(nestedCategory => nestedCategory.nestedInfos?.every(nestedInfo => !nestedInfo.selected));

  if (allUntouched) {
    if (data?.fLayerView?.filter?.where) data.fLayerView.filter.where = '';
    if (data?.fLayerView?.featureEffect?.filter?.where) (data.fLayerView as any).featureEffect = null;
    data.queryExpressions = [];
  } else {
    if (data?.fLayerView?.filter?.where) data.fLayerView.filter.where = where;
    if (data?.fLayerView?.featureEffect?.filter?.where) (data.fLayerView as any).featureEffect.filter.where = where;
  }

  return data;
}

export async function zoomTo(data: IIntLegendLayerData, view: __esri.MapView, nestedCategory: any): Promise<void> {
  const query = data.fLayerView.createQuery();

  if (nestedCategory) {
    const noneSelected = nestedCategory.nestedInfos.every((nestedInfo: ICategory) => !nestedInfo.selected);
    if (noneSelected) {
      const expression = nestedCategory.nestedInfos.map(nestedInfo => `${data.field} = '${nestedInfo.legendElementInfo.value}'`).join(' OR ');
      query.where = expression;
    } else {
      const expression = nestedCategory.nestedInfos
        .filter(nestedInfo => nestedInfo.selected)
        .map(nestedInfo => `${data.field} = '${nestedInfo.legendElementInfo.value}'`)
        .join(' OR ');
      query.where = expression;
    }
  } else {
    const where = data.queryExpressions.join(' OR ');
    query.where = where;
  }

  try {
    const geometry = await data?.fLayerView?.layer?.queryExtent(query);
    await view.goTo(geometry);
  } catch {}
}

// count
export function calculateTotalCount(categoriesArr: ICategory[]): number {
  const totalCount = categoriesArr.map((category: any) => category?.count).reduce((acc: number, curr: number) => acc + curr);
  return totalCount;
}

export function calculateTotalFeatureCountForNestedSymbols(categoriesArr: ICategory[]) {
  return categoriesArr
    .map(category => category?.nestedInfos?.map(nestedInfo => nestedInfo.count).reduce((acc: number, curr: number) => acc + curr))
    .reduce((acc: number, curr: number) => acc + curr);
}

export async function getInfoCount(
  extent: __esri.Extent,
  fLayerView: __esri.FeatureLayerView,
  field: string,
  info: any,
  infoIndex: number,
  legendElement: __esri.LegendElement,
  nestedUniqueSymbolInfo?: any,
  nestedUniqueSymbolInfoIndex?: number,
): Promise<{ [categoryId: string]: number | null } | null | undefined> {
  if (!fLayerView) return;
  const query = fLayerView?.layer?.type === 'feature' ? fLayerView.createQuery() : null;

  const where = checkPredominance(fLayerView)
    ? handlePredominanceExpression(info, fLayerView)
    : info.type
    ? generateQueryExpression(nestedUniqueSymbolInfo, field, nestedUniqueSymbolInfoIndex as number, info, info.infos as any)
    : generateQueryExpression(info, field, infoIndex, legendElement, legendElement.infos as any);

  if (query && where) {
    query.where = where === '1=0' ? '1=1' : where;
    query.geometry = extent;
  }

  try {
    const featureCount = query ? await fLayerView.queryFeatureCount(query) : null;
    return Promise.resolve({ [info.label ?? fLayerView?.layer?.id]: featureCount });
  } catch (err) {
    console.error("FAILURE AT 'getInfoCount': ", err);
  }
  return Promise.resolve(null);
}

export async function handleFeatureCount(legendViewModel: __esri.LegendViewModel, data: IInteractiveLegendData): Promise<IInteractiveLegendData> {
  let updatedData = { ...data };

  const { activeLayerInfos } = legendViewModel;

  let dataCount: { [layerId: string]: { [categoryId: string]: number } } = {};

  const countPromises: { [key: string]: any[] } = {};

  activeLayerInfos.forEach(async activeLayerInfo => {
    const legendElement = activeLayerInfo.legendElements[0] as __esri.LegendElement;
    const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
    const fLayerView = data[activeLayerInfo?.layer?.id]?.fLayerView;
    const field = fLayer.renderer?.get('field') as string;
    const counts: Promise<{ [categoryId: string]: number | null } | null | undefined>[] = [];

    countPromises[activeLayerInfo.layer.id] = [];

    legendElement?.infos?.forEach((info, infoIndex) => {
      const isNestedUniqueSymbol = legendElement.infos?.every(info => info.type === 'symbol-table');
      if (isNestedUniqueSymbol) {
        const nestedInfoCounts: any[] = [];
        info.infos.forEach((nestedUniqueSymbolInfo, nestedUniqueSymbolInfoIndex) => {
          const infoCount = getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement, nestedUniqueSymbolInfo, nestedUniqueSymbolInfoIndex);
          nestedInfoCounts.push(infoCount);
        });
        countPromises[activeLayerInfo.layer.id].push(nestedInfoCounts);
      } else {
        counts.push(getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement));
        countPromises[activeLayerInfo.layer.id] = counts;
      }
    });

    const handleALIChild = (aliChild: __esri.ActiveLayerInfo) => {
      const childCounts: Promise<{ [categoryId: string]: number | null } | null | undefined>[] = [];
      const legendElement = aliChild.legendElements[0] as __esri.LegendElement;
      const fLayer = aliChild.layer as __esri.FeatureLayer;
      const fLayerView = data[aliChild?.layer?.id]?.fLayerView;
      const field = fLayer.renderer?.get('field') as string;

      legendElement?.infos?.forEach((info, infoIndex) => childCounts.push(getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement)));

      countPromises[aliChild.layer.id] = childCounts;
    };

    activeLayerInfo.children.forEach(async aliChild => {
      handleALIChild(aliChild);
      if (aliChild?.children?.length > 0) {
        aliChild.children.forEach(innerALIChild => {
          handleALIChild(innerALIChild);
          if (innerALIChild?.children?.length > 0) {
            innerALIChild.children.forEach(innerInnerALIChild => {
              handleALIChild(innerInnerALIChild);
            });
          }
        });
      }
    });
  });
  for (const countPromise in countPromises) {
    let countObj = dataCount[countPromise] as Object;

    if (!countObj) countObj = dataCount[countPromise] = {};

    const countRes = await Promise.all(countPromises[countPromise]);

    if (countRes.every(countResItem => Array.isArray(countResItem))) {
      const countArr2d = await Promise.all(
        countRes.map(async countResItem => {
          const promise = await Promise.all(countResItem);
          const count = promise.map(promiseItem => promiseItem && Object.values(promiseItem)[0]);
          return count;
        }),
      );
      countObj[countPromise] = countArr2d;

      dataCount[countPromise] = {
        ...countObj[countPromise],
      };
    } else {
      const layerCountObj = {};

      countRes.forEach(countResItem => {
        if (!countResItem) return;
        const id = Object.keys(countResItem)[0];
        layerCountObj[id] = countResItem[id];
      });

      if (countPromise) countObj[countPromise] = layerCountObj;

      dataCount[countPromise] = {
        ...countObj[countPromise],
      };
    }
  }

  activeLayerInfos.forEach(activeLayerInfo => {
    const dataFromActiveLayerInfo = data[activeLayerInfo.layer.id];
    const layerId = activeLayerInfo.layer.id;

    (dataFromActiveLayerInfo?.categories as ICategories)?.forEach((category: ICategory, key: string) => {
      const categoriesArr = Array.from(dataFromActiveLayerInfo?.categories);
      const categoryIndex = categoriesArr.findIndex((categoryArrItem: any) => categoryArrItem[0] === key);

      if (category?.nestedInfos) {
        category?.nestedInfos.forEach((nestedInfo, nestedInfoIndex) => {
          const count = dataCount?.[activeLayerInfo?.layer?.id]?.[categoryIndex]?.[nestedInfoIndex];
          nestedInfo.count = !isNaN(count) ? count : null;
        });
      } else {
        const count = dataCount?.[layerId]?.[key];
        category.count = !isNaN(count) ? count : null;
      }
    });

    const handleALIChild = (aliChild: __esri.ActiveLayerInfo) => {
      const childLayerId = aliChild.layer.id;
      const dataFromActiveLayerInfo = data[childLayerId];

      dataFromActiveLayerInfo?.categories?.forEach((category, key) => {
        const count = dataCount?.[childLayerId]?.[key];
        category.count = count;
      });
    };

    activeLayerInfo.children.forEach(aliChild => {
      handleALIChild(aliChild);
      if (aliChild?.children?.length > 0) {
        aliChild.children.forEach(innerALIChild => {
          handleALIChild(innerALIChild);
          if (innerALIChild?.children?.length > 0) {
            innerALIChild.children.forEach(innerInnerALIChild => {
              handleALIChild(innerInnerALIChild);
            });
          }
        });
      }
    });
  });

  return Promise.resolve(updatedData);
}

// nested
export function getNestedInfoData(category: ICategory, infoIndex: number): ICategory {
  return category?.nestedInfos?.[infoIndex];
}

export function checkNestedUniqueSymbol(categories: ICategories): boolean {
  const categoriesArr = Array.from(categories).map((category: any) => category[1]);
  return categoriesArr.every((category: ICategory) => !!category?.nestedInfos);
}

export function checkNestedUniqueSymbolLegendElement(activeLayerInfo: __esri.ActiveLayerInfo): boolean {
  return !!activeLayerInfo?.legendElements?.[0]?.infos?.every?.(info => info?.type === 'symbol-table');
}

export function getParentLegendElementInfoData(data: IIntLegendLayerData, parentLegendElementInfo: any): ICategory | undefined {
  return data?.categories?.get(parentLegendElementInfo?.title);
}

// theme
export function getTheme(el: HTMLElement): string {
  const calciteMode = `calcite-mode-`;
  const light = `${calciteMode}light`;
  const dark = `${calciteMode}dark`;
  const isDarkTheme = el.classList.contains(dark);
  return isDarkTheme ? dark : light;
}

// store
export function updateStore(layerData: { intLegendLayerData: IIntLegendLayerData; layerId: string }): void {
  if (layerData.layerId && layerData.intLegendLayerData) {
    const layerId = layerData.layerId;
    const layerDataToSet = layerData.intLegendLayerData;
    store.set('data', { ...interactiveLegendState.data, [layerId]: layerDataToSet });
  }
}

// handleFilterChange - Configuration experience
export function handleFilterChange(filterMode: FilterMode, view: __esri.MapView | __esri.SceneView): void {
  const { type } = filterMode;
  if (type === 'filter') {
    updateExistingFilterToFeatureFilter(view);
  } else if (type === 'effect') {
    updateExistingFilterToFeatureEffect(filterMode, view);
  }
}

function updateExistingFilterToFeatureFilter(view: __esri.MapView | __esri.SceneView): void {
  view?.allLayerViews
    ?.filter((layerView: __esri.LayerView) => layerView?.layer?.type === 'feature')
    ?.forEach((fLayerView: __esri.FeatureLayerView) => {
      const existingFilter = getExistingFilter(fLayerView);
      fLayerView.filter = existingFilter;
      fLayerView.set('featureEffect', null);
    });
}

function updateExistingFilterToFeatureEffect(filterMode: FilterMode, view: __esri.MapView | __esri.SceneView): void {
  view?.allLayerViews
    ?.filter((layerView: __esri.LayerView) => layerView?.layer?.type === 'feature')
    .forEach(async (fLayerView: __esri.FeatureLayerView) => {
      if (filterMode?.effect && fLayerView) {
        const [FeatureEffect] = await loadModules(['esri/layers/support/FeatureEffect']);
        const { includedEffect, excludedEffect } = filterMode.effect;
        const mergedExcludedEffect = await getMergedEffect(excludedEffect, fLayerView as __esri.FeatureLayerView, 'excludedEffect');
        const mergedIncludedEffect = await getMergedEffect(includedEffect, fLayerView as __esri.FeatureLayerView, 'includedEffect');

        const existingFilter = getExistingFilter(fLayerView);

        fLayerView.featureEffect = new FeatureEffect({
          filter: existingFilter,
          includedEffect: mergedIncludedEffect,
          excludedEffect: mergedExcludedEffect,
        }) as __esri.FeatureEffect;
        fLayerView.set('filter', null);
      }
    });
}

function getExistingFilter(fLayerView: __esri.FeatureLayerView): __esri.FeatureFilter {
  return fLayerView?.filter || fLayerView?.featureEffect?.filter;
}
