import { IInteractiveLegendData, ICategories, IIntLegendLayerData, ICategory } from '../interfaces/interfaces';

export function validateInteractivity(activeLayerInfo: __esri.ActiveLayerInfo, legendElement: any, legendElementIndex: number): boolean {
  const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
  const field = (fLayer?.renderer as any)?.field;
  const { type } = legendElement;
  const layerView = activeLayerInfo.get('layerView') as __esri.LayerView;
  const classBreakInfos = layerView?.get('layer.renderer.classBreakInfos') as __esri.ClassBreak[];
  const uniqueValueInfos = layerView?.get('layer.renderer.uniqueValueInfos') && field;
  const isSizeRamp = type === 'size-ramp';
  const isColorRamp = type === 'color-ramp';
  const opacityRamp = type === 'opacity-ramp';
  const heatmapRamp = type === 'heatmap-ramp';

  const hasMoreThanOneClassBreak = layerView && classBreakInfos && classBreakInfos.length > 1;

  const authoringInfoType = layerView?.get('layer.renderer.authoringInfo.type');
  const isPredominance = authoringInfoType === 'predominance';
  const classifyDataCheckedColorRamp = authoringInfoType === 'class-breaks-color';
  const classifyDataCheckedSizeRamp = authoringInfoType === 'class-breaks-size';

  const singleSymbol = legendElement?.infos?.length === 1 && !field;

  const isRelationship = authoringInfoType === 'relationship' && legendElement.type !== 'size-ramp';

  const isFeatureLayer = activeLayerInfo?.get('layer.type') === 'feature';

  const moreThanOneClassBreak = isFeatureLayer && field && !isColorRamp && !isSizeRamp && hasMoreThanOneClassBreak;

  const oneClassBreak = isFeatureLayer && field && !isColorRamp && !isSizeRamp && !hasMoreThanOneClassBreak ? true : false;

  const validate =
    oneClassBreak ||
    (isPredominance && !isSizeRamp) ||
    (classifyDataCheckedColorRamp && field) ||
    (classifyDataCheckedSizeRamp && field) ||
    (singleSymbol && !field && field !== null) ||
    isRelationship ||
    uniqueValueInfos
      ? true
      : false;

  const hasClustering = activeLayerInfo?.get('layer.featureReduction') && activeLayerInfo?.legendElements[legendElementIndex]?.type === 'size-ramp';

  const isSingleSymbol = legendElement.type === 'symbol-table' && legendElement?.infos?.length === 1;

  const hasColorRamp = !activeLayerInfo?.legendElements.every(legendElement => legendElement.type !== 'color-ramp');

  const hasSizeRamp = !activeLayerInfo?.legendElements.every(legendElement => legendElement.type !== 'size-ramp');

  const singleSymbolColor = isSingleSymbol && hasColorRamp;

  const singleSymbolSize = isSingleSymbol && hasSizeRamp;

  const isUnclassifiedSizeRamp = legendElement?.infos?.every(info => typeof info.value === 'number');

  const isValidated =
    isFeatureLayer && !hasClustering && !opacityRamp && !heatmapRamp && !singleSymbolColor && !singleSymbolSize && !isUnclassifiedSizeRamp
      ? classBreakInfos
        ? moreThanOneClassBreak || validate
        : oneClassBreak || validate
      : false;

  return isValidated;
}

export async function generateData(legendVM: __esri.LegendViewModel, reactiveUtils: __esri.reactiveUtils): Promise<IInteractiveLegendData> {
  const { activeLayerInfos, view } = legendVM;

  // Step 1. Create data object to return
  const data = {} as IInteractiveLegendData;

  // Step 2. Set up Interactive Legend Data for each layer using it's corresponding active layer info
  // Step 2a. Array of promises - needed due to queryFeatureCount and whenLayerView calls
  const intLegendDataPromises = [] as Promise<IIntLegendLayerData>[];

  // Step 3. Iterate through each Active Layer Info and create data bucket for each layer
  activeLayerInfos.forEach(activeLayerInfoCallback(intLegendDataPromises, view as __esri.MapView, reactiveUtils));

  // Step 4. Store resolved data
  const intLegendLayerDataObjs = await Promise.all(intLegendDataPromises);
  intLegendLayerDataObjs.forEach(intLegendLayerDataObj => (data[intLegendLayerDataObj.fLayerView.layer.id] = intLegendLayerDataObj));
  return data;
}

function activeLayerInfoCallback(
  intLegendDataPromises: Promise<IIntLegendLayerData>[],
  view: __esri.MapView,
  reactiveUtils: __esri.reactiveUtils,
): (activeLayerInfo: __esri.ActiveLayerInfo) => void {
  return (activeLayerInfo: __esri.ActiveLayerInfo) => {
    // Step 3a. Push to promises array since there are promises within function
    const intLegendDataPromise = createInteractiveLegendDataForLayer(view as __esri.MapView, activeLayerInfo, reactiveUtils).then(res => res);
    intLegendDataPromises.push(intLegendDataPromise);
  };
}

async function createInteractiveLegendDataForLayer(
  view: __esri.MapView,
  activeLayerInfo: __esri.ActiveLayerInfo,
  reactiveUtils: __esri.reactiveUtils,
): Promise<IIntLegendLayerData> {
  // Get first Legend Element from Active LayerInfo - only first legend element will be interactive
  await reactiveUtils.whenOnce(() => activeLayerInfo?.legendElements?.length > 0);
  const legendElement = activeLayerInfo.legendElements[0] as __esri.LegendElement;

  // Each active layer info will have it's own property in object - we'll use the layer ID to categorize each layer

  // Hash map for each layers interactive categories i.e. Global power plants, Hydro, Solar, Wind, etc.
  const categories = new Map() as ICategories;

  // Layer to access field from it's renderer to be used in expression
  const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
  // Get Feature Layer View to query
  const fLayerView = await view.whenLayerView(fLayer);
  const field = fLayer.renderer?.get('field') as string;

  // Store the legend element infos data to easily access information for count, whether an item is selected, or a legendElementInfo data.
  const countPromises = [] as any;

  legendElement?.infos?.forEach(legendElementInfo => {
    const countPromise = getInfoCount(view.extent, fLayerView, field, legendElementInfo);
    countPromises.push(countPromise);
  });

  const counts = (await Promise.all(countPromises)) as number[];

  let totalCount = 0;

  legendElement?.infos?.forEach((legendElementInfo, legendElementInfoIndex) => {
    const count = counts[legendElementInfoIndex];
    totalCount += count;
    const category = {
      count,
      selected: false,
      legendElementInfo,
    };
    categories.set(legendElementInfo.value, category);
  });

  // Generated expression to apply to layer filters
  const expression = null;

  // Total feature count
  return Promise.resolve({ categories, field, expression, totalCount, fLayerView });
}

export async function getInfoCount(extent: __esri.Geometry, fLayerView: __esri.FeatureLayerView, field: string, info: any): Promise<number> {
  const query = fLayerView.createQuery();
  query.where = `${field} = '${info.value}'`;
  query.geometry = extent;
  const featureCount = await fLayerView.queryFeatureCount(query);
  return featureCount;
}

export async function updateFeatureCount(legendvm: __esri.LegendViewModel, data: IInteractiveLegendData): Promise<void> {
  const { view } = legendvm;

  legendvm.activeLayerInfos.forEach(async activeLayerInfo => {
    const legendElement = activeLayerInfo.legendElements[0] as __esri.LegendElement;
    const dataForALI = data[activeLayerInfo.layer.id];
    const categories = dataForALI.categories;
    const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
    const fLayerView = data[activeLayerInfo?.layer?.id]?.fLayerView;
    const field = fLayer.renderer?.get('field') as string;
    const countPromises = [] as any;
    legendElement?.infos?.forEach(legendElementInfo => {
      const countPromise = getInfoCount(view.extent, fLayerView, field, legendElementInfo);
      countPromises.push(countPromise);
    });
    const counts = (await Promise.all(countPromises)) as number[];
    let totalCount = 0;
    legendElement?.infos?.forEach((legendElementInfo, legendElementInfoIndex) => {
      const count = counts[legendElementInfoIndex];
      totalCount += count;
      const category = categories?.get(legendElementInfo.value) as ICategory;
      category.count = count;
    });
    dataForALI.totalCount = totalCount;
  });
}
