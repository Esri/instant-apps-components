export function validateInteractivity(activeLayerInfo: __esri.ActiveLayerInfo, legendElement: any, legendElementIndex: number): boolean {
  const fLayer = activeLayerInfo.layer as __esri.FeatureLayer;
  const field = (fLayer?.renderer as any)?.field;
  console.log(fLayer);
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
