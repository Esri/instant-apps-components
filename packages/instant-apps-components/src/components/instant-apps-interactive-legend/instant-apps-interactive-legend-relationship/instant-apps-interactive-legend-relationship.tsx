import { Component, h, Prop, Listen } from '@stencil/core';
import { loadModules } from 'esri-loader';
import { FilterMode } from '../instant-apps-interactive-legend-classic/interfaces/interfaces';
import { getMergedEffect } from '../support/effects';
import { interactiveLegendState } from '../support/store';

const RELATIONSHIP_DIAMOND_SELECTOR = '.esri-relationship-ramp--diamond__middle-column--ramp svg g';

const CSS = {
  instructionalText: 'instant-apps-interactive-legend-relationship__instructional-text',
};

@Component({
  tag: 'instant-apps-interactive-legend-relationship',
  styleUrl: 'instant-apps-interactive-legend-relationship.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendRelationship {
  symbolUtils;
  cellNodeCounter: number = 0;
  relationshipRamp: HTMLDivElement;

  @Prop()
  filterMode: FilterMode;

  @Prop()
  activeLayerInfo: __esri.ActiveLayerInfo;

  @Prop()
  legendElement: __esri.RelationshipRampElement;

  @Prop()
  messages;

  applyInteractivity() {
    this.applyRelationshipRampInteractivity();
  }

  @Listen('showAllSelected', { target: 'window' })
  showAllSelectedEmitted() {
    const cleared = interactiveLegendState.data[this.activeLayerInfo.layer.id].queryExpressions.length === 0;
    const gNode = this.relationshipRamp.querySelector(RELATIONSHIP_DIAMOND_SELECTOR) as HTMLElement;
    const children = gNode.children;
    const cellGroup = children ? Array.from(children) : null;
    if (cleared) {
      cellGroup?.forEach(cell => {
        cell.removeAttribute('stroke');
        cell.removeAttribute('stroke-width');
        cell.removeAttribute('stroke-opacity');
        cell.classList.remove('esri-interactive-legend--selected-cell');
      });
    }
  }

  async componentWillLoad() {
    const [symbolUtils] = await loadModules(['esri/symbols/support/symbolUtils']);
    this.symbolUtils = symbolUtils;
  }

  render() {
    return (
      <div
        ref={(node: HTMLDivElement) => {
          const styleSheet = node?.querySelector('relationshipStyles');
          if (!styleSheet) {
            const css = document.createElement('style');
            css.id = 'relationshipStyles';
            css.innerHTML = `
                rect:hover {
                  cursor: pointer;
                  opacity: 0.8;
                }
          `;
            node?.appendChild(css);
          }
        }}
      >
        <span class={CSS.instructionalText}>{this.messages?.relationship?.instructionalText}</span>
        {this.renderRelationshipRamp()}
      </div>
    );
  }

  renderRelationshipRamp(): HTMLElement {
    const renderer = (this.activeLayerInfo?.layer as __esri.FeatureLayer).renderer;
    const relationshipRamp = this.symbolUtils.renderRelationshipRampPreviewHTML(renderer);
    const outerHTML = relationshipRamp?.outerHTML;
    return (
      <div
        ref={(node: HTMLDivElement) => {
          this.relationshipRamp = node;
          this.applyRelationshipRampInteractivity();
        }}
        key="relationship-ramp-diamond"
        innerHTML={`${outerHTML}`}
      />
    );
  }

  applyRelationshipRampInteractivity(): void {
    if (!this.relationshipRamp || !this.activeLayerInfo || !this.legendElement || !interactiveLegendState.data) return;
    let intervalId = setInterval(() => {
      const gNode = this.relationshipRamp.querySelector(RELATIONSHIP_DIAMOND_SELECTOR) as HTMLElement;
      if (gNode) {
        clearInterval(intervalId);
        const rampSVG = gNode.children;
        this.setupRelationshipDrawingStyle(rampSVG);
      }
    }, 10);
  }

  setupRelationshipDrawingStyle(rampSVG: HTMLCollection): void {
    const cellGroup = rampSVG ? Array.from(rampSVG) : null;
    if (!cellGroup) return;
    cellGroup.map((cell: HTMLElement, cellIndex) => {
      const uvInfos = ((this.activeLayerInfo?.layer as __esri.FeatureLayer)?.renderer as __esri.UniqueValueRenderer).uniqueValueInfos;
      if (uvInfos[cellIndex]) {
        const color = uvInfos[cellIndex].symbol.color;
        uvInfos.forEach((uvInfo, index) => {
          const itemColor = uvInfo.symbol.color;
          const match = color.r === itemColor.r && color.g === itemColor.g && color.b === itemColor.b && color.a === itemColor.a;
          if (match) this.setCellAttributes(cell, index);
        });
        cell.classList.add('esri-interactive-legend__svg-rect-element');
      }
    });
    const cellItems = this.reorderCellNodes(cellGroup as HTMLElement[]);
    this.attachFeatureIndexes(cellItems);
    this.applyEventHandlers();
  }

  setCellAttributes(cell: HTMLElement, index: number): void {
    const fLayer = this.activeLayerInfo.layer as __esri.FeatureLayer;
    const uvInfo = (fLayer.renderer as __esri.UniqueValueRenderer).uniqueValueInfos;
    const newIndex = this.generateIndexPattern(index) as number;
    if (uvInfo[newIndex]) {
      cell.setAttribute('data-color', `${uvInfo[newIndex].symbol.color}`);
      cell.setAttribute('data-cell-index', `${newIndex}`);
      cell.setAttribute('tabindex', '0');
    }
  }

  generateIndexPattern(index: number): number | null {
    const { focus, numClasses } = this.legendElement;
    if (focus === 'HL') {
      return index;
    }
    return numClasses === 2 ? this.twoClasses(index, focus) : numClasses === 3 ? this.threeClasses(index, focus) : numClasses === 4 ? this.fourClasses(index, focus) : null;
  }

  // _twoClasses
  twoClasses(index: number, focus: string): any {
    if (focus === 'HH' || focus === null) {
      return index === 0 || index === 2 ? index + 1 : index === 1 || index === 3 ? index - 1 : null;
    } else if (focus === 'LH') {
      return index === 0 ? index + 3 : index === 1 ? index + 1 : index === 2 ? index - 1 : index === 3 ? index - 3 : index === 4 ? index + 0 : null;
    } else if (focus === 'LL') {
      return index === 0 || index === 1 ? index + 2 : index === 2 || index === 3 ? index - 2 : null;
    }
  }

  // _threeClasses
  threeClasses(index: number, focus: string): any {
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
  fourClasses(index: number, focus: string): any {
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

  reorderCellNodes(cellGroup: HTMLElement[]): HTMLElement[] {
    const cellItems: any[] = [];
    while (this.cellNodeCounter <= cellGroup.length - 1) {
      cellGroup.map(cell => {
        if (parseInt(cell.getAttribute('data-cell-index') as string) === this.cellNodeCounter) {
          cellItems.push(cell);
        }
      });
      this.cellNodeCounter++;
    }
    this.cellNodeCounter = 0;
    return cellItems;
  }

  attachFeatureIndexes(cellItems: HTMLElement[]): void {
    const { focus, numClasses } = this.legendElement;
    focus === 'HH' || focus === null
      ? this.relationshipFocusIsHighHigh(cellItems, numClasses)
      : focus === 'LL'
      ? this.relationshipFocusIsLowLow(cellItems, numClasses)
      : focus === 'LH'
      ? this.relationshipFocusIsLowHigh(cellItems, numClasses)
      : focus === 'HL'
      ? this.relationshipFocusIsHighLow(cellItems, numClasses)
      : null;
    this.cellNodeCounter = 0;
  }

  // _relationshipFocusIsHighHigh
  relationshipFocusIsHighHigh(cellItems: HTMLElement[], numClasses: number): void {
    for (let i = numClasses - 1; i >= 0; i--) {
      for (let j = numClasses - 1; j >= 0; j--) {
        this.setDataAttributes(cellItems, i, j, numClasses);
        this.cellNodeCounter++;
      }
    }
  }

  // _relationshipFocusIsLowLow
  relationshipFocusIsLowLow(cellItems: HTMLElement[], numClasses: number): void {
    for (let i = 0; i < numClasses; i++) {
      for (let j = 0; j < numClasses; j++) {
        this.setDataAttributes(cellItems, i, j, numClasses);
        this.cellNodeCounter++;
      }
    }
  }

  // _relationshipFocusIsLowHigh
  relationshipFocusIsLowHigh(cellItems: HTMLElement[], numClasses: number): void {
    for (let i = 0; i < numClasses; i++) {
      for (let j = numClasses - 1; j >= 0; j--) {
        this.setDataAttributes(cellItems, i, j, numClasses);
        this.cellNodeCounter++;
      }
    }
  }

  // _relationshipFocusIsHighLow
  relationshipFocusIsHighLow(cellItems: HTMLElement[], numClasses: number): void {
    for (let j = numClasses - 1; j >= 0; j--) {
      for (let i = 0; i < numClasses; i++) {
        this.setDataAttributes(cellItems, i, j, numClasses);
        this.cellNodeCounter++;
      }
    }
  }

  // _setDataAttributes
  setDataAttributes(cellItems: HTMLElement[], i: number, j: number, numClasses): void {
    const rawNode = cellItems[this.cellNodeCounter];
    if (numClasses === 2) {
      this.twoClassAttributes(rawNode, i, j);
    } else if (numClasses === 3) {
      this.threeClassAttributes(rawNode, i, j);
    } else {
      this.fourClassAttributes(rawNode, i, j);
    }
  }

  // _twoClassAttributes
  twoClassAttributes(rawNode: HTMLElement, i: number, j: number): void {
    const { legendElement } = this;
    if (this.cellNodeCounter === 0 || this.cellNodeCounter === 3) {
      legendElement.focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
    } else {
      legendElement.focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
    }
  }

  // _threeClassAttributes
  threeClassAttributes(rawNode: any, i: number, j: number): void {
    const { legendElement } = this;
    if (this.cellNodeCounter === 1 || this.cellNodeCounter === 3 || this.cellNodeCounter === 5 || this.cellNodeCounter === 7) {
      legendElement.focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
    } else {
      legendElement.focus !== 'HL' ? this.setDataFeatureIndexes(rawNode, i, j) : this.swapDataFeatureIndexes(rawNode, i, j);
    }
  }

  // _fourClassAttributes
  fourClassAttributes(rawNode: any, i: number, j: number): void {
    const { legendElement } = this;
    const { focus } = legendElement;
    if (
      this.cellNodeCounter === 1 ||
      this.cellNodeCounter === 2 ||
      this.cellNodeCounter === 4 ||
      this.cellNodeCounter === 5 ||
      this.cellNodeCounter === 7 ||
      this.cellNodeCounter === 8 ||
      this.cellNodeCounter === 10 ||
      this.cellNodeCounter === 11 ||
      this.cellNodeCounter === 13 ||
      this.cellNodeCounter === 14
    ) {
      focus === 'HL' ? this.swapDataFeatureIndexes(rawNode, i, j) : this.setDataFeatureIndexes(rawNode, i, j);
    } else {
      focus !== 'HL' ? this.setDataFeatureIndexes(rawNode, i, j) : this.swapDataFeatureIndexes(rawNode, i, j);
    }
  }

  setDataFeatureIndexes(rawNode: HTMLElement, i: number, j: number): void {
    rawNode.setAttribute('data-feature-i', `${i}`);
    rawNode.setAttribute('data-feature-j', `${j}`);
    this.setDataCellFocus(rawNode, i, j);
  }

  swapDataFeatureIndexes(rawNode: HTMLElement, i: number, j: number): void {
    rawNode.setAttribute('data-feature-i', `${j}`);
    rawNode.setAttribute('data-feature-j', `${i}`);
    this.setDataCellFocus(rawNode, j, i);
  }

  setDataCellFocus(rawNode: any, i: number, j: number): void {
    const { numClasses } = this.legendElement;
    if (numClasses === 2) {
      this.setDataCellFocusForTwoClasses(rawNode, i, j);
    } else if (numClasses === 3) {
      this.setDataCellFocusForThreeClasses(rawNode, i, j);
    } else if (numClasses === 4) {
      this.setDataCellFocusForFourClasses(rawNode, i, j);
    }
  }

  setDataCellFocusForTwoClasses(rawNode: HTMLElement, i: number, j: number): void {
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

  setDataCellFocusForThreeClasses(rawNode: HTMLElement, i: number, j: number): void {
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

  setDataCellFocusForFourClasses(rawNode: HTMLElement, i: number, j: number): void {
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

  applyEventHandlers(): void {
    const cellGroup: NodeList = document.querySelectorAll('.esri-interactive-legend__svg-rect-element');
    const cells = Array.from(cellGroup) as HTMLElement[];
    cells.map(cell => {
      const i = cell.getAttribute('data-feature-i') as string;
      const j = cell.getAttribute('data-feature-j') as string;
      const focus = cell.getAttribute('data-cell-focus') as string;
      cell.onclick = () => {
        this.handleFilter(i, j, focus);
        this.handleSelectedElement(cell);
      };
      cell.onkeydown = e => {
        const { key } = e;
        const isActionKey = key === 'Enter' || key === 'Space';
        if (isActionKey) {
          this.handleFilter(i, j, focus);
          this.handleSelectedElement(cell);
        }
      };
    });
  }

  async handleFilter(i: string, j: string, focus: string): Promise<void> {
    const fLayer = this.activeLayerInfo.layer as __esri.FeatureLayer;
    const { authoringInfo } = fLayer.renderer;
    const { field1, field2 } = authoringInfo;
    const { queryExpressions, fLayerView } = interactiveLegendState.data[this.activeLayerInfo.layer.id];
    if (this.legendElement.type === 'relationship-ramp' && authoringInfo && field1 && field2) {
      const expressionParams = this.generateExpressionParams(field1, field2, authoringInfo, i, j, focus) as any;

      const queryExpression = this.generateExpressionForRelationship(expressionParams);

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
      const timeExtent = fLayerView?.filter?.timeExtent ?? null;

      const [FeatureFilter, FeatureEffect] = await loadModules(['esri/layers/support/FeatureFilter', 'esri/layers/support/FeatureEffect']);

      if (this.filterMode?.type === 'filter') {
        fLayerView.filter = new FeatureFilter({
          where,
          timeExtent: fLayerView?.filter?.timeExtent ? fLayerView.filter.timeExtent : null,
        });
      } else if (this.filterMode?.effect) {
        const { includedEffect, excludedEffect } = this.filterMode.effect;
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

  generateExpressionParams(
    field1: __esri.AuthoringInfoField1,
    field2: __esri.AuthoringInfoField2,
    authoringInfo: __esri.AuthoringInfo,
    i: string,
    j: string,
    focus: string,
  ): {
    data: any[][];
    i: string;
    j: string;
    field1: string;
    field2: string;
    focus: string;
  } {
    const data = [] as any[][];
    const authoringInfofield1 = field1.field;
    const authoringInfofield2 = field2.field;
    const classBreakInfos1 = field1.classBreakInfos as any;
    const classBreakInfos2 = field2.classBreakInfos as any;
    const normalizationField1 = authoringInfo.field1.hasOwnProperty('normalizationField') ? authoringInfo.field1.normalizationField : null;
    const normalizationField2 = authoringInfo.field2.hasOwnProperty('normalizationField') ? authoringInfo.field2.normalizationField : null;
    classBreakInfos1.forEach((_item, itemIndex1) => {
      const nestedData: any[] = [];
      classBreakInfos2.forEach((_item2, itemIndex2) => {
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
  generateExpressionForRelationship(expressionParams: { data: any[][]; i: string; j: string; field1: string; field2: string; focus: string }): string {
    const { focus, field1, field2, data, i, j } = expressionParams;

    return focus === 'LL'
      ? `${field1} >= ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} >= ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
      : focus === 'LM' || focus === 'LM1' || focus === 'LM2' || focus === 'LH'
      ? `${field1} >= ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} > ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
      : focus === 'ML' || focus === 'M1L' || focus === 'M2L' || focus === 'HL'
      ? `${field1} > ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} >= ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`
      : `${field1} > ${data[i][j][0].minValue} AND ${field1} <= ${data[i][j][0].maxValue} AND ${field2} > ${data[i][j][1].minValue} AND ${field2} <= ${data[i][j][1].maxValue}`;
  }

  handleSelectedElement(cell: HTMLElement): void {
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
}
