interface RampTitle {
  field: string;
  normField: string;
  ratio: boolean;
  ratioPercent: boolean;
  ratioPercentTotal: boolean;
}

interface ColorRampElement {
  type: 'color-ramp';
  title: RampTitle | string;
  infos: ColorRampStop[];
  preview?: HTMLElement;
}

interface StretchRampElement {
  type: 'stretch-ramp';
  title: RampTitle | string;
  infos: ColorRampStop[];
  preview?: HTMLElement;
}

interface HeatmapRampStop {
  color: any; // Color
  ratio: number;
  label: string;
}

interface HeatmapRampElement {
  type: 'heatmap-ramp';
  title: RampTitle | string;
  infos: HeatmapRampStop[];
  preview?: HTMLElement;
}

interface ClusterTitle {
  showCount: boolean;
}

interface SizeRampStop {
  label: string;
  value?: any;
  symbol: any; // ISymbolUnion
  size?: number;
  outlineSize?: number;
  preview?: HTMLElement;
}

interface SizeRampElement {
  type: 'size-ramp';
  title: ClusterTitle | RampTitle | string;
  infos: SizeRampStop[];
}

interface UnivariateColorSizeRampElement {
  type: 'univariate-above-and-below-ramp' | 'univariate-color-size-ramp';
  title?: ClusterTitle | RampTitle | string;
  infos: (SizeRampElement | ColorRampElement)[];
  preview?: HTMLElement;
}

interface OpacityRampStop {
  value: number;
  color: any; // Color
  label: string;
}

interface OpacityRampElement {
  type: 'opacity-ramp';
  title: RampTitle | string;
  infos: OpacityRampStop[];
  preview?: HTMLElement;
}

interface RendererTitle {
  title?: string;
  field: string;
  normField: string;
  normByPct: boolean;
}

interface StretchMultibandTitle {
  colorName: string;
  bandName: string;
}

interface ImageSymbolTableElementInfo {
  label?: StretchMultibandTitle | string;
  src: string;
  preview?: HTMLElement;
  opacity: number;
  width?: number;
  height?: number;
}

interface ColorRampStop {
  value: number;
  color: any; // Color
  label: string;
}

interface SymbolTableElementInfo {
  label: RampTitle | string;
  value?: any;
  symbol: any; // ISymbolUnion
  size?: number;
  preview?: HTMLElement;
}

interface PieChartRampElement {
  type: 'pie-chart-ramp';
  title?: RendererTitle | string;
  infos: SymbolTableElementInfo[];
  preview?: HTMLElement;
}

export interface MobileWidthBreakpoint {
  xsmall: number[];
  small: number[];
  medium: number[];
  large: number[];
  xlarge: number[];
}
