import { pt2px } from './screenUtils';
import type { Projector } from 'maquette';
import { createProjector } from 'maquette';
import { h } from '@stencil/core';
import { loadModules } from 'esri-loader';
import { ColorRampElement, SizeRampElement, UnivariateColorSizeRampElement } from '../../../interfaces/interfaces';

const projector: Projector = createProjector();
const separatorWidth = 10;
const separatorHeight = 20;
const univariateSymbolPadding = 10;
const univariateCardStylePadding = 20;

const CSS = {
  // univariate above-and-below
  univariateAboveAndBelowSymbol: 'esri-univariate-above-and-below-ramp__symbol',
  colorRamp: 'esri-legend__color-ramp',
};

function renderSeparator(rampAlignment: 'horizontal' | 'vertical' = 'vertical'): any {
  const style = 'stroke:rgb(200, 200, 200);stroke-width:1' as any;

  return rampAlignment === 'vertical' ? (
    <svg height="4" width="10">
      <line x1="0" y1="2" x2="10" y2="2" style={style} />
    </svg>
  ) : (
    <svg height="10" width="10">
      <line x1="5" y1="0" x2="5" y2="10" style={style} />
    </svg>
  );
}

function getSeparatorPreview(opacity: number | null, rampAlignment: 'horizontal' | 'vertical' = 'vertical'): HTMLElement {
  const separator = document.createElement('div');
  separator.style.height = `${separatorHeight}px`;
  separator.className = CSS.univariateAboveAndBelowSymbol;

  if (opacity != null) {
    separator.style.opacity = opacity.toString();
  }

  projector.append(separator, renderSeparator.bind(null, rampAlignment));
  return separator;
}

function updateUnivariateSizeRampElement(
  sizeRampElement: SizeRampElement,
  opacity: number | null,
  rampAlignment: 'horizontal' | 'vertical' = 'vertical',
  isAboveAndBelow: boolean,
): void {
  sizeRampElement.infos.forEach((stop, index) => {
    // Replace middle stop preview with separator
    if (isAboveAndBelow && index === 2) {
      stop.preview = getSeparatorPreview(opacity, rampAlignment);
    } else {
      const { size } = stop;
      const previewSize = pt2px(size as number) + (rampAlignment === 'horizontal' ? univariateCardStylePadding : univariateSymbolPadding);
      const isPreviewDiv = (stop.preview as HTMLElement).tagName.toLowerCase() === 'div';
      const preview = isPreviewDiv ? stop.preview : document.createElement('div');
      if (preview) preview.className = CSS.univariateAboveAndBelowSymbol;

      if (rampAlignment === 'horizontal') {
        if (preview) preview.style.width = `${previewSize}px`;
      } else {
        if (preview) preview.style.height = `${previewSize}px`;
      }

      if (!isPreviewDiv) {
        if (preview) preview.appendChild(stop.preview as Node);
      }

      stop.preview = preview;
    }
  });
}

// Used to align the colorRamp at the middle of first size symbol
export function getUnivariateColorRampMargin(sizeRampElement: SizeRampElement, style: 'classic' | 'card' = 'classic'): number {
  const stops = sizeRampElement.infos;

  const firstSize = stops[0].size as number;
  const lastSize = stops[stops.length - 1].size as number;
  if (style === 'classic') {
    return (pt2px(firstSize) + univariateSymbolPadding) / 2;
  }

  return (pt2px(firstSize) - pt2px(lastSize)) / 2;
}

export async function getUnivariateColorRampPreview(
  colorRampElement: ColorRampElement,
  options: {
    width?: number;
    height?: number;
    rampAlignment: 'horizontal' | 'vertical';
    opacity: number;
    type: 'above' | 'below' | 'full';
    effectList?: any; // EffectView
  },
): Promise<HTMLElement | null> {
  if (!colorRampElement) {
    return Promise.resolve(null);
  }

  const colors = colorRampElement.infos.map(stop => stop.color);
  const [symbolUtils] = await loadModules(['esri/symbols/support/symbolUtils']);
  const colorRampDiv = symbolUtils.renderColorRampPreviewHTML(
    options.type === 'full'
      ? colors
      : options.type === 'above'
      ? colors.slice(0, 3) // First 3 colors
      : colors.slice(2, 5), // Last 3 colors
    {
      width: options.width,
      height: options.height,
      align: options.rampAlignment,
      effectList: options.effectList,
    } as any,
  );

  colorRampDiv.className = CSS.colorRamp;

  if (options.opacity != null) {
    colorRampDiv.style.opacity = options.opacity.toString();
  }

  return Promise.resolve(colorRampDiv);
}

export function getUnivariateSizeRampSize(
  sizeRampElement: SizeRampElement,
  type: 'above' | 'below' | 'full',
  isAboveAndBelow: boolean,
  rampAlignment: 'horizontal' | 'vertical' = 'vertical',
): number {
  let sizeRampHeight = 0;

  const stops = sizeRampElement.infos;
  const midIndex = Math.floor(stops.length / 2);
  const startIndex = type === 'full' || type === 'above' ? 0 : midIndex;
  const endIndex = type === 'full' || type === 'below' ? stops.length - 1 : midIndex;

  for (let index = startIndex; index <= endIndex; index++) {
    if (isAboveAndBelow && index === midIndex) {
      sizeRampHeight += rampAlignment === 'horizontal' ? separatorWidth : separatorHeight;
    } else {
      const size = stops[index].size as number;
      const previewSize = pt2px(size) + (rampAlignment === 'horizontal' ? univariateCardStylePadding : univariateSymbolPadding);

      sizeRampHeight += previewSize;
    }
  }

  return Math.round(sizeRampHeight);
}

export function getUnivariateColorRampSize(
  sizeRampElement: SizeRampElement,
  type: 'above' | 'below' | 'full',
  isAboveAndBelow: boolean,
  rampAlignment: 'horizontal' | 'vertical' = 'vertical',
): number {
  const sizeRampSize = getUnivariateSizeRampSize(sizeRampElement, type, isAboveAndBelow, rampAlignment);
  const stops = sizeRampElement.infos;
  const midIndex = Math.floor(stops.length / 2);
  const startIndex = type === 'full' || type === 'above' ? 0 : midIndex;
  const endIndex = type === 'full' || type === 'below' ? stops.length - 1 : midIndex;
  const symbolSize = type === 'full' ? (stops[startIndex].size as number) + (stops[endIndex].size as number) : type === 'above' ? stops[startIndex].size : stops[endIndex].size;
  const separatorSize = isAboveAndBelow ? (rampAlignment === 'vertical' ? separatorHeight : separatorWidth) : 0;
  const padding = rampAlignment === 'vertical' ? univariateSymbolPadding * (type === 'full' ? 2 : 1) : univariateCardStylePadding * (type === 'full' ? 2 : 1);

  return Math.round(sizeRampSize - (pt2px(symbolSize as number) / 2 + separatorSize / 2 + padding / 2));
}

export function getUnivariateAboveAndBelowRampElements(
  legendElement: UnivariateColorSizeRampElement,
  opacity: number,
  rampAlignment: 'horizontal' | 'vertical' = 'vertical',
): { sizeRampElement: SizeRampElement; colorRampElement: ColorRampElement } {
  const elements = legendElement.infos;
  let sizeRampElement = elements.find(({ type }) => type === 'size-ramp') as SizeRampElement;
  let colorRampElement = elements.find(({ type }) => type === 'color-ramp') as ColorRampElement;

  if (sizeRampElement) {
    sizeRampElement = { ...sizeRampElement };
    sizeRampElement.infos = [...sizeRampElement.infos];
    updateUnivariateSizeRampElement(sizeRampElement, opacity, rampAlignment, true);
  }

  if (colorRampElement) {
    colorRampElement = { ...colorRampElement };
    colorRampElement.infos = [...colorRampElement.infos];
  }

  // For card style
  if (rampAlignment === 'horizontal') {
    sizeRampElement?.infos.reverse();
    colorRampElement?.infos.reverse();
  }

  return { sizeRampElement, colorRampElement };
}

export function getUnivariateColorSizeRampElements(
  legendElement: UnivariateColorSizeRampElement,
  rampAlignment: 'horizontal' | 'vertical' = 'vertical',
): { sizeRampElement: SizeRampElement; colorRampElement: ColorRampElement } {
  const elements = legendElement.infos;
  let sizeRampElement = elements.find(({ type }) => type === 'size-ramp') as SizeRampElement;
  let colorRampElement = elements.find(({ type }) => type === 'color-ramp') as ColorRampElement;

  if (sizeRampElement) {
    sizeRampElement = { ...sizeRampElement };
    sizeRampElement.infos = [...sizeRampElement.infos];
    updateUnivariateSizeRampElement(sizeRampElement, null, rampAlignment, false);
  }

  if (colorRampElement) {
    colorRampElement = { ...colorRampElement };
    colorRampElement.infos = [...colorRampElement.infos];
  }

  // For card style
  if (rampAlignment === 'horizontal') {
    sizeRampElement?.infos.reverse();
    colorRampElement?.infos.reverse();
  }

  return { sizeRampElement, colorRampElement };
}
