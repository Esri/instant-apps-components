import { Component, h, Prop } from '@stencil/core';
import { loadModules } from '../../utils/loadModules';

import { generateFillAttributes, generateStrokeAttributes, renderDef, renderShape, getTransformMatrix, computeBBox, getBoundingBox } from './support/svgUtils';

const svgNS = 'http://www.w3.org/2000/svg';

const CSS = {
  // relationship diamond
  diamondContainer: 'esri-relationship-ramp--diamond__container',
  diamondLeftCol: 'esri-relationship-ramp--diamond__left-column',
  diamondRightCol: 'esri-relationship-ramp--diamond__right-column',
  diamondMidCol: 'esri-relationship-ramp--diamond__middle-column',
  diamondMidColLabel: 'esri-relationship-ramp--diamond__middle-column--label',
  diamondMidColRamp: 'esri-relationship-ramp--diamond__middle-column--ramp',
  // relationship square
  squareTable: 'esri-relationship-ramp--square__table',
  squareTableRow: 'esri-relationship-ramp--square__table-row',
  squareTableCell: 'esri-relationship-ramp--square__table-cell',
  squareTableLabel: 'esri-relationship-ramp--square__table-label',
  squareTableLabelLeftBottom: 'esri-relationship-ramp--square__table-label--left-bottom',
  squareTableLabelRightBottom: 'esri-relationship-ramp--square__table-label--right-bottom',
  squareTableLabelLeftTop: 'esri-relationship-ramp--square__table-label--left-top',
  squareTableLabelRightTop: 'esri-relationship-ramp--square__table-label--right-top',
};

@Component({
  tag: 'instant-apps-interactive-legend-relationship',
  styleUrl: 'instant-apps-interactive-legend-relationship.scss',
  shadow: false,
})
export class InstantAppsInteractiveLegendRelationship {
  symbolUtils: any;
  color: __esri.Color;

  @Prop()
  element: any; // RelationshipRampElement;

  @Prop()
  relationshipElementId: string;

  @Prop()
  opacity: number;

  @Prop()
  effectlist: any; //EffectView

  async componentWillLoad() {
    try {
      const [symbolUtils, Color] = await loadModules(['esri/symbols/support/utils', 'esri/Color']);
      this.symbolUtils = symbolUtils;
      this.color = Color;
    } catch (err) {
      console.error('error: ', err);
    }
  }

  render() {
    const focus = this.element?.focus;
    const labels = this.element?.labels;
    const isDiamond = !!focus;
    const rampDiv = this.renderRamp(this.element, this.relationshipElementId, this.opacity, this.effectlist);
    const rampContainerStyles = { justifyContent: 'center' };
    const isRtl = document.dir === 'rtl';

    if (isDiamond) {
      return (
        <div class={CSS.diamondContainer} style={rampContainerStyles}>
          <div class={CSS.diamondLeftCol}>{isRtl ? labels.right : labels.left}</div>
          <div class={CSS.diamondMidCol}>
            <div class={CSS.diamondMidColLabel}>{labels.top}</div>
            {rampDiv}
            <div class={CSS.diamondMidColLabel}>{labels.bottom}</div>
          </div>
          <div class={CSS.diamondRightCol}>{isRtl ? labels.left : labels.right}</div>
        </div>
      );
    }

    return (
      <div class={CSS.squareTable}>
        <div class={CSS.squareTableRow}>
          <div class={`${CSS.squareTableCell} ${CSS.squareTableLabel} ${CSS.squareTableLabelRightBottom}`}>{isRtl ? labels.top : labels.left}</div>
          <div class={CSS.squareTableCell} />
          <div class={`${CSS.squareTableCell} ${CSS.squareTableLabel} ${CSS.squareTableLabelLeftBottom}`}>{isRtl ? labels.left : labels.top}</div>
        </div>
        <div class={CSS.squareTableRow}>
          <div class={CSS.squareTableCell} />
          {rampDiv}
          <div class={CSS.squareTableCell} />
        </div>
        <div class={CSS.squareTableRow}>
          <div class={`${CSS.squareTableCell} ${CSS.squareTableLabel} ${CSS.squareTableLabelRightTop}`}>{isRtl ? labels.right : labels.bottom}</div>
          <div class={CSS.squareTableCell} />
          <div class={`${CSS.squareTableCell} ${CSS.squareTableLabel} ${CSS.squareTableLabelLeftTop}`}>{isRtl ? labels.bottom : labels.right}</div>
        </div>
      </div>
    );
  }

  // element: RelationshipRampElement
  // effectList: EffectView
  renderRamp(element: any, id: string, opacity: number, effectList: any, size: number = 60): any {
    if (!element) return;
    const { focus, numClasses, colors, rotation } = element;
    const isDiamond = !!focus;
    const surfaceSize = Math.sqrt(size ** 2 + size ** 2) + (isDiamond ? 0 : 5); // diagonal length + 5px padding for arrows

    const defs: any[] = []; // VNode
    const squares: any[] = []; // VNode
    const bboxes: any[] = []; // any
    const groupSize = size || 75;
    const cellSize = groupSize / numClasses;

    for (let i = 0; i < numClasses; i++) {
      const y = i * cellSize;

      for (let j = 0; j < numClasses; j++) {
        const x = j * cellSize;
        const fillAttrs = generateFillAttributes(colors[i][j], this.color);
        const strokeAttrs = generateStrokeAttributes(null, this.color);
        const shape: any = {
          // RectDescriptor
          type: 'rect',
          x,
          y,
          width: cellSize,
          height: cellSize,
        };

        defs.push(renderDef(fillAttrs));
        squares.push(renderShape(shape, fillAttrs.fill, strokeAttrs, null));
        bboxes.push(getBoundingBox(shape));
      }
    }

    const leftPaddingX = 10;
    const leftPaddingY = 15;
    const rightPaddingX = 15;
    const rightPaddingY = 10;

    let svgStyle: any = '';

    if (!isDiamond) {
      svgStyle = 'margin: -15px -15px -18px -15px';
    }

    const leftMarkers = this.getLineMarkers('left', focus, id);
    const rightMarkers = this.getLineMarkers('right', focus, id);

    const bbox = computeBBox(bboxes);
    const rectMatrix = getTransformMatrix(bbox, surfaceSize, surfaceSize, 0, false, rotation, false) as string | undefined;
    const arrowMatrix = getTransformMatrix(bbox, surfaceSize, surfaceSize, 0, false, isDiamond ? -45 : null, false) as string | undefined;
    const rampStyles = {
      filter: this.symbolUtils.getCSSFilterFromEffectList(effectList),
      // filter: null,
      opacity: opacity == null ? null : `${opacity}`,
    } as any;

    return (
      <div style={rampStyles} class={isDiamond ? CSS.diamondMidColRamp : CSS.squareTableCell}>
        <svg xmlns={svgNS} width={surfaceSize} height={surfaceSize} style={svgStyle}>
          <defs>
            <marker id={`${id}_arrowStart`} markerWidth="10" markerHeight="10" refX="5" refY="5" markerUnits="strokeWidth" orient="auto">
              <polyline points="0,0 5,5 0,10" fill="none" stroke="#555555" stroke-width="1" />
            </marker>
            <marker id={`${id}_arrowEnd`} markerWidth="10" markerHeight="10" refX="0" refY="5" markerUnits="strokeWidth" orient="auto">
              <polyline points="5,0 0,5 5,10" fill="none" stroke="#555555" stroke-width="1" />
            </marker>
            {defs}
          </defs>
          <g transform={rectMatrix}>{squares}</g>
          <g transform={arrowMatrix}>
            <line
              fill="none"
              stroke="#555555"
              stroke-width="1"
              marker-start={leftMarkers.markerStart as any}
              marker-end={leftMarkers.markerEnd as any}
              x1={-leftPaddingX}
              y1={size - leftPaddingY}
              x2={-leftPaddingX}
              y2={leftPaddingY}
            />
            <line
              fill="none"
              stroke="#555555"
              stroke-width="1"
              marker-start={rightMarkers.markerStart as any}
              marker-end={rightMarkers.markerEnd as any}
              x1={rightPaddingX}
              y1={size + rightPaddingY}
              x2={size - rightPaddingX}
              y2={size + rightPaddingY}
            />
          </g>
        </svg>
      </div>
    );
  }

  getLineMarkers(side: 'left' | 'right', focus: string, id: string): { markerStart: string | null; markerEnd: string | null } {
    const startId = `${id}_arrowStart`;
    const endId = `${id}_arrowEnd`;
    const isLeftSide = side === 'left';
    const result: { markerStart: string | null; markerEnd: string | null } = { markerStart: '', markerEnd: null };

    switch (focus) {
      case 'HL':
        if (isLeftSide) {
          result.markerStart = `url(#${endId})`;
        } else {
          result.markerEnd = `url(#${startId})`;
        }
        break;
      case 'LL':
        result.markerStart = `url(#${endId})`;
        break;
      case 'LH':
        if (isLeftSide) {
          result.markerEnd = `url(#${startId})`;
        } else {
          result.markerStart = `url(#${endId})`;
        }
        break;
      default:
        result.markerEnd = `url(#${startId})`;
        break;
    }

    return result;
  }
}
