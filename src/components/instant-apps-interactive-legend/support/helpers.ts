import { loadModules } from 'esri-loader';
import { IInteractiveLegendData, ICategories, IIntLegendLayerData, ICategory, FilterMode } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { getMergedEffect } from './effects';

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

  const isNestedUniqueSymbols = activeLayerInfo?.legendElements?.[0]?.infos?.every?.(info => info?.type === 'symbol-table');

  const isValidated =
    isFeatureLayer &&
    !hasClustering &&
    !opacityRamp &&
    !heatmapRamp &&
    !singleSymbolColor &&
    !singleSymbolSize &&
    !isUnclassifiedSizeRamp &&
    !isBinning &&
    !isDotDensity &&
    !isNestedUniqueSymbols
      ? classBreakInfos
        ? moreThanOneClassBreak || validate
        : oneClassBreak || validate
      : false;

  return isValidated;
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
  intLegendLayerDataObjs.forEach(intLegendLayerDataObj => (data[intLegendLayerDataObj.fLayerView.layer.id] = intLegendLayerDataObj));

  return data;
}

function activeLayerInfoCallback(
  intLegendDataPromises: Promise<IIntLegendLayerData>[],
  legendViewModel: __esri.LegendViewModel,
  reactiveUtils: __esri.reactiveUtils,
): (activeLayerInfo: __esri.ActiveLayerInfo) => void {
  return (activeLayerInfo: __esri.ActiveLayerInfo) => {
    // Step 3a. Push to promises array since there are promises within function
    const intLegendDataPromise = createInteractiveLegendDataForLayer(legendViewModel, activeLayerInfo, reactiveUtils).then(res => res);
    intLegendDataPromises.push(intLegendDataPromise);

    // Take ACLs children into account
    activeLayerInfo.children.forEach(child => {
      const intLegendDataPromise = createInteractiveLegendDataForLayer(legendViewModel, child, reactiveUtils).then(res => res);
      intLegendDataPromises.push(intLegendDataPromise);
    });
  };
}

async function createInteractiveLegendDataForLayer(
  legendViewModel: __esri.LegendViewModel,
  activeLayerInfo: __esri.ActiveLayerInfo,
  reactiveUtils: __esri.reactiveUtils,
): Promise<IIntLegendLayerData> {
  // Get first Legend Element from Active LayerInfo - only first legend element will be interactive
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
    const category = {
      count: null,
      selected: false,
      legendElementInfo,
    };
    categories.set(legendElementInfo.label ?? fLayerView?.layer?.id, category);
  });

  // Generated expression to apply to layer filters
  const queryExpressions: string[] = [];

  // Total feature count
  return Promise.resolve({
    title: fLayerView?.layer?.title,
    categories,
    field,
    queryExpressions,
    totalCount: null,
    fLayerView,
    legendElement,
    expanded: {
      layer: true,
      legendElements: activeLayerInfo.legendElements.map(() => true),
    },
  });
}

function generateQueryExpressions(data: IIntLegendLayerData, info: any, infoIndex: number): void {
  const { field, legendElement, categories, fLayerView } = data;
  const legendElementInfos = Array.from(categories);

  const isPredominance = checkPredominance(fLayerView);

  const queryExpression = isPredominance ? handlePredominanceExpression(info, fLayerView) : generateQueryExpression(info, field, infoIndex, legendElement, legendElementInfos, '');
  const category = categories.get(info.label ?? fLayerView?.layer?.id) as ICategory;
  category.selected = !category?.selected;
  const hasOneValue = legendElementInfos && legendElementInfos.length === 1;
  const queryExpressions = data?.queryExpressions;
  const expressionIndex = queryExpressions.indexOf(queryExpression as string);

  if (isPredominance) {
    const queryExpression = handlePredominanceExpression(info, fLayerView) as string;

    const expressionIndex = queryExpressions.indexOf(queryExpression);
    if (queryExpressions.length === 0 || expressionIndex === -1) {
      if (queryExpressions && queryExpressions[0] === '1=0') {
        queryExpressions.splice(0, 1);
      }
      queryExpressions.push(queryExpression);
    }
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
}

function generateQueryExpression(info: any, field: string, infoIndex: number, legendElement: __esri.LegendElement, legendElementInfos: any[], normalizationField?: string): string {
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
          if (info.value) {
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

export async function handleFilter(data: IIntLegendLayerData, info: any, infoIndex: number, filterMode: FilterMode): Promise<void> {
  const [FeatureFilter, FeatureEffect] = await loadModules(['esri/layers/support/FeatureFilter', 'esri/layers/support/FeatureEffect']);
  const { queryExpressions, fLayerView } = data;
  generateQueryExpressions(data, info, infoIndex);
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
}

export function showAll(data: IIntLegendLayerData): IIntLegendLayerData {
  data.queryExpressions = [];
  if (data?.fLayerView?.filter?.where) data.fLayerView.filter.where = '';
  if (data?.fLayerView?.featureEffect?.filter?.where) (data.fLayerView as any).featureEffect = null;
  data.categories.forEach(category => {
    category.selected = false;
  });
  return data;
}

export async function zoomTo(data: IIntLegendLayerData, view: __esri.MapView): Promise<void> {
  const where = data.queryExpressions.join(' OR ');
  const query = data.fLayerView.createQuery();
  query.where = where;

  try {
    const geometry = await data.fLayerView.queryExtent(query);
    await view.goTo(geometry);
  } catch {}
}

export async function handleFeatureCount(legendViewModel: __esri.LegendViewModel, data: IInteractiveLegendData): Promise<IInteractiveLegendData> {
  let updatedData = { ...data };
  const { activeLayerInfos } = legendViewModel;

  let dataCount: { [categoryId: string]: number } = {};
  const countPromises: any[] = [];

  activeLayerInfos.forEach(async activeLayerInfo => {
    const legendElement = activeLayerInfo.legendElements[0] as __esri.LegendElement;
    const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
    const fLayerView = data[activeLayerInfo?.layer?.id]?.fLayerView;
    const field = fLayer.renderer?.get('field') as string;

    legendElement?.infos?.forEach((info, infoIndex) => countPromises.push(getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement)));

    activeLayerInfo.children.forEach(async aclChild => {
      const legendElement = aclChild.legendElements[0] as __esri.LegendElement;
      const fLayer = aclChild.layer as __esri.FeatureLayer;
      const fLayerView = data[aclChild?.layer?.id]?.fLayerView;
      const field = fLayer.renderer?.get('field') as string;

      legendElement?.infos?.forEach((info, infoIndex) => countPromises.push(getInfoCount(legendViewModel.view.extent, fLayerView, field, info, infoIndex, legendElement)));
    });
  });

  const countResponses = await Promise.all(countPromises);

  activeLayerInfos.forEach(activeLayerInfo => {
    countResponses.forEach(countRes => {
      const countObj = dataCount[activeLayerInfo.layer.id] as Object;

      dataCount[activeLayerInfo.layer.id] = {
        ...countObj,
        ...countRes,
      };
    });
  });

  activeLayerInfos.forEach(activeLayerInfo => {
    const dataFromActiveLayerInfo = data[activeLayerInfo.layer.id];
    const layerId = activeLayerInfo.layer.id;

    dataFromActiveLayerInfo?.categories?.forEach((category, key) => {
      const count = dataCount[layerId][key];
      category.count = count;
    });

    activeLayerInfo.children.forEach(aclChild => {
      const dataFromActiveLayerInfo = data[aclChild.layer.id];
      const layerId = activeLayerInfo.layer.id;

      dataFromActiveLayerInfo?.categories?.forEach((category, key) => {
        const count = dataCount?.[layerId]?.[key];
        category.count = count;
      });
    });
  });

  return Promise.resolve(updatedData);
}

export async function getInfoCount(
  extent: __esri.Extent,
  fLayerView: __esri.FeatureLayerView,
  field: string,
  info: any,
  infoIndex: number,
  legendElement: __esri.LegendElement,
): Promise<{ [categoryId: string]: number } | null | undefined> {
  if (!fLayerView) return;
  const query = fLayerView.createQuery();
  const where = checkPredominance(fLayerView)
    ? handlePredominanceExpression(info, fLayerView)
    : generateQueryExpression(info, field, infoIndex, legendElement, legendElement.infos as any);

  query.where = where === '1=0' ? '1=1' : where;
  query.geometry = extent;

  try {
    const featureCount = await fLayerView.queryFeatureCount(query);
    return Promise.resolve({ [info.label ?? fLayerView?.layer?.id]: featureCount });
  } catch (err) {
    console.error("FAILURE AT 'getInfoCount': ", err);
  }
  return Promise.resolve(null);
}

export function getIntLegendLayerData(fLayer: __esri.FeatureLayer, data): IIntLegendLayerData {
  return data?.[fLayer?.id];
}

export function checkNoneSelected(data: IIntLegendLayerData): boolean {
  return data && Array.from(data.categories.entries()).every(entry => !entry[1].selected) && data.queryExpressions[0] !== '1=0';
}

export function checkAllSelected(data: IIntLegendLayerData): boolean {
  return data && Array.from(data.categories.entries()).every(entry => entry[1].selected);
}

export function handlePredominanceExpression(elementInfo: any, fLayerView: __esri.FeatureLayerView): string {
  const featureLayerView = fLayerView;
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

export function checkPredominance(fLayerView: __esri.FeatureLayerView): boolean {
  const authoringInfoType = fLayerView?.get('layer.renderer.authoringInfo.type');
  return authoringInfoType === 'predominance';
}
