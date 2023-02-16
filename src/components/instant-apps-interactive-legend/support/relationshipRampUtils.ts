import { loadModules } from 'esri-loader';

export function setupRelationshipDrawingStyle(rampSVG, activeLayerInfo, legendElement, data, filterMode) {
  const cellGroup = rampSVG ? Array.from(rampSVG) : null;
  if (cellGroup) {
    cellGroup.map((cell: HTMLElement, cellIndex) => {
      const uvInfos = (activeLayerInfo.layer.renderer as __esri.UniqueValueRenderer).uniqueValueInfos;
      if (uvInfos[cellIndex]) {
        const color = uvInfos[cellIndex].symbol.color;
        uvInfos.forEach((uvInfo, index) => {
          const itemColor = uvInfo.symbol.color;
          if (color.r === itemColor.r && color.g === itemColor.g && color.b === itemColor.b && color.a === itemColor.a) {
            setCellAttributes(cell, index, activeLayerInfo, legendElement);
          }
        });
        cell.classList.add('esri-interactive-legend__svg-rect-element');
      }
    });
    const cellItems = reorderCellNodes(cellGroup);
    attachFeatureIndexes(cellItems, legendElement);
    applyEventHandlers(activeLayerInfo, legendElement, data, filterMode);
  }
}

function setCellAttributes(cell, index, activeLayerInfo, legendElement) {
  const uvInfo = (activeLayerInfo.layer.renderer as __esri.UniqueValueRenderer).uniqueValueInfos;
  const newIndex = generateIndexPattern(legendElement, index);
  if (uvInfo[newIndex]) {
    cell.setAttribute('data-color', `${uvInfo[newIndex].symbol.color}`);
    cell.setAttribute('data-cell-index', `${newIndex}`);
    cell.setAttribute('tabindex', '0');
  }
}

function generateIndexPattern(legendElement, index: number): number {
  const focus = legendElement.focus;
  if (focus === 'HL') {
    return index;
  }
  return legendElement.numClasses === 2
    ? twoClasses(index, focus)
    : legendElement.numClasses === 3
    ? threeClasses(index, focus)
    : legendElement.numClasses === 4
    ? fourClasses(index, focus)
    : null;
}

// _twoClasses
function twoClasses(index: number, focus: string): any {
  if (focus === 'HH' || focus === null) {
    return index === 0 || index === 2 ? index + 1 : index === 1 || index === 3 ? index - 1 : null;
  } else if (focus === 'LH') {
    return index === 0 ? index + 3 : index === 1 ? index + 1 : index === 2 ? index - 1 : index === 3 ? index - 3 : index === 4 ? index + 0 : null;
  } else if (focus === 'LL') {
    return index === 0 || index === 1 ? index + 2 : index === 2 || index === 3 ? index - 2 : null;
  }
}

// _threeClasses
function threeClasses(index: number, focus: string): any {
  if (focus === 'HH' || focus === null) {
    return index === 0 || index === 3 || index === 6 ? index + 2 : index === 2 || index === 5 || index === 8 ? index - 2 : index;
  } else if (focus === 'LH') {
    return index === 0
      ? index + 8
      : index === 1
      ? index + 6
      : index === 2
      ? index + 4
      : index === 3
      ? index + 2
      : index === 5
      ? index - 2
      : index === 6
      ? index - 4
      : index === 7
      ? index - 6
      : index === 8
      ? index - 8
      : index;
  } else if (focus === 'LL') {
    return index === 0 || index === 1 || index === 2 ? index + 6 : index === 6 || index === 7 || index === 8 ? index - 6 : index;
  }
}

// _fourNumClasses
export function fourClasses(index: number, focus: string): any {
  if (focus === 'HH' || focus === null) {
    return index === 0 || index === 4 || index === 8 || index === 12
      ? index + 3
      : index === 1 || index === 5 || index === 9 || index === 13
      ? index + 1
      : index === 2 || index === 6 || index === 10 || index === 14
      ? index - 1
      : index === 3 || index === 7 || index === 11 || index === 15
      ? index - 3
      : null;
  } else if (focus === 'LH') {
    return index === 0
      ? index + 15
      : index === 1
      ? index + 13
      : index === 2
      ? index + 11
      : index === 3
      ? index + 9
      : index === 4
      ? index + 7
      : index === 5
      ? index + 5
      : index === 6
      ? index + 3
      : index === 7
      ? index + 1
      : index === 8
      ? index - 1
      : index === 9
      ? index - 3
      : index === 10
      ? index - 5
      : index === 11
      ? index - 7
      : index === 12
      ? index - 9
      : index === 13
      ? index - 11
      : index === 14
      ? index - 13
      : index === 15
      ? index - 15
      : null;
  } else if (focus === 'LL') {
    return index === 0 || index === 1 || index === 2 || index === 3
      ? index + 12
      : index === 4 || index === 5 || index === 6 || index === 7
      ? index + 4
      : index === 8 || index === 9 || index === 10 || index === 11
      ? index - 4
      : index === 12 || index === 13 || index === 14 || index === 15
      ? index - 12
      : null;
  }
}

let cellNodeCounter = 0;

function reorderCellNodes(cellGroup: any): any[] {
  const cellItems: any[] = [];
  while (cellNodeCounter <= cellGroup.length - 1) {
    cellGroup.map(cell => {
      if (parseInt(cell.getAttribute('data-cell-index')) === cellNodeCounter) {
        cellItems.push(cell);
      }
    });
    cellNodeCounter++;
  }
  cellNodeCounter = 0;
  return cellItems;
}

function attachFeatureIndexes(cellItems: any[], legendElement): void {
  const { focus, numClasses } = legendElement;
  focus === 'HH' || focus === null
    ? relationshipFocusIsHighHigh(cellItems, numClasses)
    : focus === 'LL'
    ? relationshipFocusIsLowLow(cellItems, numClasses)
    : focus === 'LH'
    ? relationshipFocusIsLowHigh(cellItems, numClasses)
    : focus === 'HL'
    ? relationshipFocusIsHighLow(cellItems, numClasses)
    : null;
  cellNodeCounter = 0;
}

// _relationshipFocusIsHighHigh
function relationshipFocusIsHighHigh(cellItems: any[], numClasses): void {
  for (let i = numClasses - 1; i >= 0; i--) {
    for (let j = numClasses - 1; j >= 0; j--) {
      setDataAttributes(cellItems, i, j, numClasses);
      cellNodeCounter++;
    }
  }
}

// _relationshipFocusIsLowLow
function relationshipFocusIsLowLow(cellItems: any[], numClasses): void {
  for (let i = 0; i < numClasses; i++) {
    for (let j = 0; j < numClasses; j++) {
      setDataAttributes(cellItems, i, j, numClasses);
      cellNodeCounter++;
    }
  }
}

// _relationshipFocusIsLowHigh
function relationshipFocusIsLowHigh(cellItems: any[], numClasses): void {
  for (let i = 0; i < numClasses; i++) {
    for (let j = numClasses - 1; j >= 0; j--) {
      setDataAttributes(cellItems, i, j, numClasses);
      cellNodeCounter++;
    }
  }
}

// _relationshipFocusIsHighLow
function relationshipFocusIsHighLow(cellItems: any[], numClasses): void {
  for (let j = numClasses - 1; j >= 0; j--) {
    for (let i = 0; i < numClasses; i++) {
      setDataAttributes(cellItems, i, j, numClasses);
      cellNodeCounter++;
    }
  }
}

// _setDataAttributes
function setDataAttributes(cellItems, i, j, numClasses): void {
  const rawNode = cellItems[cellNodeCounter];
  if (numClasses === 2) {
    twoClassAttributes(rawNode, i, j, focus);
  } else if (numClasses === 3) {
    threeClassAttributes(rawNode, i, j, focus);
  } else {
    fourClassAttributes(rawNode, i, j, focus);
  }
}

// _twoClassAttributes
function twoClassAttributes(rawNode: HTMLElement, i: number, j: number, legendElement): void {
  if (cellNodeCounter === 0 || cellNodeCounter === 3) {
    legendElement.focus === 'HL' ? swapDataFeatureIndexes(rawNode, i, j, legendElement) : setDataFeatureIndexes(rawNode, i, j, legendElement);
  } else {
    legendElement.focus === 'HL' ? swapDataFeatureIndexes(rawNode, i, j, legendElement) : setDataFeatureIndexes(rawNode, i, j, legendElement);
  }
}

// _threeClassAttributes
function threeClassAttributes(rawNode: any, i: number, j: number, legendElement): void {
  if (cellNodeCounter === 1 || cellNodeCounter === 3 || cellNodeCounter === 5 || cellNodeCounter === 7) {
    legendElement.focus === 'HL' ? swapDataFeatureIndexes(rawNode, i, j, legendElement) : setDataFeatureIndexes(rawNode, i, j, legendElement);
  } else {
    legendElement.focus !== 'HL' ? setDataFeatureIndexes(rawNode, i, j, legendElement) : swapDataFeatureIndexes(rawNode, i, j, legendElement);
  }
}

// _fourClassAttributes
function fourClassAttributes(rawNode: any, i: number, j: number, legendElement): void {
  const { focus, numClasses } = legendElement;
  if (
    cellNodeCounter === 1 ||
    cellNodeCounter === 2 ||
    cellNodeCounter === 4 ||
    cellNodeCounter === 5 ||
    cellNodeCounter === 7 ||
    cellNodeCounter === 8 ||
    cellNodeCounter === 10 ||
    cellNodeCounter === 11 ||
    cellNodeCounter === 13 ||
    cellNodeCounter === 14
  ) {
    focus === 'HL' ? swapDataFeatureIndexes(rawNode, i, j, legendElement) : setDataFeatureIndexes(rawNode, i, j, numClasses);
  } else {
    focus !== 'HL' ? setDataFeatureIndexes(rawNode, i, j, numClasses) : swapDataFeatureIndexes(rawNode, i, j, legendElement);
  }
}

function setDataFeatureIndexes(rawNode: HTMLElement, i: number, j: number, numClasses): void {
  rawNode.setAttribute('data-feature-i', `${i}`);
  rawNode.setAttribute('data-feature-j', `${j}`);
  setDataCellFocus(rawNode, i, j, numClasses);
}

function swapDataFeatureIndexes(rawNode: HTMLElement, i: number, j: number, legendElement): void {
  const { numClasses } = legendElement;
  rawNode.setAttribute('data-feature-i', `${j}`);
  rawNode.setAttribute('data-feature-j', `${i}`);
  setDataCellFocus(rawNode, j, i, numClasses);
}

function setDataCellFocus(rawNode: any, i: number, j: number, numClasses): void {
  if (numClasses === 2) {
    setDataCellFocusForTwoClasses(rawNode, i, j);
  } else if (numClasses === 3) {
    setDataCellFocusForThreeClasses(rawNode, i, j);
  } else if (numClasses === 4) {
    setDataCellFocusForFourClasses(rawNode, i, j);
  }
}

function setDataCellFocusForTwoClasses(rawNode: HTMLElement, i: number, j: number): void {
  i === 0 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'LL')
    : i === 0 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'LH')
    : i === 1 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'HL')
    : i === 1 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'HH')
    : null;
}

function setDataCellFocusForThreeClasses(rawNode: HTMLElement, i: number, j: number): void {
  i === 0 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'LL')
    : i === 0 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'LM')
    : i === 0 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'LH')
    : i === 1 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'ML')
    : i === 1 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'MM')
    : i === 1 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'MH')
    : i === 2 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'HL')
    : i === 2 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'HM')
    : i === 2 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'HH')
    : null;
}

function setDataCellFocusForFourClasses(rawNode: HTMLElement, i: number, j: number): void {
  i === 0 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'LL')
    : i === 0 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'LM1')
    : i === 0 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'LM2')
    : i === 0 && j === 3
    ? rawNode.setAttribute('data-cell-focus', 'LH')
    : i === 1 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'M1L')
    : i === 1 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'M1M1')
    : i === 1 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'M1M2')
    : i === 1 && j === 3
    ? rawNode.setAttribute('data-cell-focus', 'M1H')
    : i === 2 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'M2L')
    : i === 2 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'M2M1')
    : i === 2 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'M2M2')
    : i === 2 && j === 3
    ? rawNode.setAttribute('data-cell-focus', 'M2H')
    : i === 3 && j === 0
    ? rawNode.setAttribute('data-cell-focus', 'HL')
    : i === 3 && j === 1
    ? rawNode.setAttribute('data-cell-focus', 'HM1')
    : i === 3 && j === 2
    ? rawNode.setAttribute('data-cell-focus', 'HM2')
    : i === 3 && j === 3
    ? rawNode.setAttribute('data-cell-focus', 'HH')
    : null;
}

function applyEventHandlers(activeLayerInfo, legendElement, data, filterMode) {
  const cellGroup = document.querySelectorAll('.esri-interactive-legend__svg-rect-element');
  const cells = Array.from(cellGroup) as HTMLElement[];
  cells.map((cell, cellIndex) => {
    const i = cell.getAttribute('data-feature-i') as string;
    const j = cell.getAttribute('data-feature-j') as string;
    const focus = cell.getAttribute('data-cell-focus') as string;
    cell.onclick = () => {
      console.log(i, j, focus, cell);
      handleFilter(i, j, focus, activeLayerInfo, legendElement, data, filterMode);
      handleSelectedElement(cell);
      // if (featureCountEnabled) {
      //   _queryFeatureCount();
      // }
    };
    // cell.onkeydown = event => {
    //   if (event.keyCode === 32) {
    //     console.log(i, j, focus, cell);
    //       handleFilter(i, j, focus);
    //     //   _handleSelectedElement(cell);
    //     //   if (featureCountEnabled) {
    //     //     _queryFeatureCount();
    //     //   }
    //   }
    // };

    //   if (featureCountEnabled) {
    //     const { authoringInfo } = layerView.layer.renderer;
    //     const { field1, field2 } = authoringInfo;
    //     const expressionParams = _generateExpressionParams(
    //       field1,
    //       field2,
    //       authoringInfo,
    //       i,
    //       j,
    //       focus
    //     ) as any;

    //     const queryExpression = _generateExpressionForRelationship(
    //       expressionParams
    //     );
    //     queryCountExpressions.push(queryExpression);
    //     const { numClasses } = colorRampProperties;
    //     const { length } = queryCountExpressions;
    //     if (
    //       (numClasses === 2 && length === 4 && cellIndex === 3) ||
    //       (numClasses === 3 && length === 9 && cellIndex === 8) ||
    //       (numClasses === 4 && length === 16 && cellIndex === 15)
    //     ) {
    //       _generateTotalFeatureCount();
    //     }
    //   }
  });
}

async function handleFilter(i: string, j: string, focus: string, activeLayerInfo, legendElement, data, filterMode): Promise<void> {
  const { authoringInfo } = activeLayerInfo.layer.renderer;
  const { field1, field2 } = authoringInfo;
  const { queryExpressions, fLayerView } = data[activeLayerInfo.layer.id];
  console.log(data);
  if (legendElement.type === 'relationship-ramp' && authoringInfo && field1 && field2) {
    const expressionParams = generateExpressionParams(field1, field2, authoringInfo, i, j, focus) as any;

    const queryExpression = generateExpressionForRelationship(expressionParams);

    if (queryExpressions.length === 0) {
      queryExpressions[0] = queryExpression;
    } else {
      if (queryExpressions.indexOf(queryExpression) === -1) {
        queryExpressions.push(queryExpression);
      } else {
        queryExpressions.splice(queryExpressions.indexOf(queryExpression), 1);
      }
    }
    const where = queryExpressions.join(' OR ');
    //   if (filterMode === "mute") {
    //     const opacity = opacity || opacity === 0 ? opacity : 30;
    //     const grayScale =
    //       grayScale || grayScale === 0 ? grayScale : 100;

    //     layerView.effect = new FeatureEffect({
    //       filter: new FeatureFilter({
    //         where,
    //         timeExtent: layerView?.effect?.filter?.timeExtent
    //           ? layerView.effect.filter.timeExtent
    //           : null
    //       }),
    //       excludedEffect: `grayscale(${grayScale}%) opacity(${opacity}%)`
    //     });
    //   } else
    console.log(filterMode);
    if (filterMode?.type === 'filter') {
      const [FeatureFilter] = await loadModules(['esri/layers/support/FeatureFilter']);
      fLayerView.filter = new FeatureFilter({
        where,
        timeExtent: fLayerView?.filter?.timeExtent ? fLayerView.filter.timeExtent : null,
      });
    }
    //   _setSearchExpression(where);
  }
}

function generateExpressionParams(
  field1: __esri.AuthoringInfoField1,
  field2: __esri.AuthoringInfoField2,
  authoringInfo: __esri.AuthoringInfo,
  i: string,
  j: string,
  focus: string,
): any {
  const data = [] as any[][];
  const authoringInfofield1 = field1.field;
  const authoringInfofield2 = field2.field;
  const classBreakInfos1 = field1.classBreakInfos as any;
  const classBreakInfos2 = field2.classBreakInfos as any;
  const normalizationField1 = authoringInfo.field1.hasOwnProperty('normalizationField') ? authoringInfo.field1.normalizationField : null;
  const normalizationField2 = authoringInfo.field2.hasOwnProperty('normalizationField') ? authoringInfo.field2.normalizationField : null;
  classBreakInfos1.forEach((item, itemIndex1) => {
    const nestedData: any[] = [];
    classBreakInfos2.forEach((item2, itemIndex2) => {
      nestedData.push([classBreakInfos1[itemIndex1], classBreakInfos2[itemIndex2]]);
    });
    data.push(nestedData);
  });
  const field1ToInclude = normalizationField1 ? `(${authoringInfofield1}/${normalizationField1})` : `${authoringInfofield1}`;
  const field2ToInclude = normalizationField2 ? `(${authoringInfofield2}/${normalizationField2})` : `${authoringInfofield2}`;

  return {
    data,
    i,
    j,
    field1: field1ToInclude,
    field2: field2ToInclude,
    focus,
  };
}

// _generateExpressionForTwoClasses
function generateExpressionForRelationship(expressionParams: any): string {
  const { focus, field1, field2, data, i, j } = expressionParams;
  return focus === 'LL'
    ? `${field1} >= ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} >= ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
    : focus === 'LM' || focus === 'LM1' || focus === 'LM2' || focus === 'LH'
    ? `${field1} >= ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} > ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
    : focus === 'ML' || focus === 'M1L' || focus === 'M2L' || focus === 'HL'
    ? `${field1} > ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} >= ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
    : `${field1} > ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} > ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`;
}

function handleSelectedElement(cell: any): void {
  const cellClass = cell.classList;
  if (!cellClass.contains('esri-interactive-legend--selected-cell')) {
    cellClass.add('esri-interactive-legend--selected-cell');
    cell.setAttribute('stroke', 'black');
    cell.setAttribute('stroke-width', '3px');
    cell.setAttribute('stroke-opacity', '1');
  } else {
    cell.removeAttribute('stroke');
    cell.removeAttribute('stroke-width');
    cell.removeAttribute('stroke-opacity');
    cellClass.remove('esri-interactive-legend--selected-cell');
  }
}

//   // _setSearchExpression
//   function setSearchExpression(filterExpression: string): void {
//     if (!searchViewModel) {
//       return;
//     }

//     searchViewModel.sources.forEach(
//       (searchSource: __esri.LayerSearchSource) => {
//         layerListViewModel.operationalItems.forEach(operationalItem => {
//           if (
//             searchSource.layer &&
//             searchSource.layer.id === operationalItem.layer.id
//           ) {
//             if (filterExpression) {
//               searchSource.filter = {
//                 where: filterExpression
//               };
//             } else {
//               searchSource.filter = null;
//             }
//           }
//         });
//       }
//     );
//   }
