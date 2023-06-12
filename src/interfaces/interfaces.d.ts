import Widget from 'esri/widgets/Widget';

export interface GenericObject {
  [key: string]: unknown;
}

export interface GenericStringObject {
  [key: string]: string;
}

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

// Messages
export interface InstantAppsPopoverMessageOverrides {
  popoverAction?: string;
  of?: string;
}

//FilterList
export interface Expression {
  id: number;
  type?: ExpressionField;
  active?: boolean;
  definitionExpression?: string;
  name: string;
  field?: string;
  fields?: string[] | number[];
  selectedFields?: string[] | number[];
  codedValues?: { [key: string]: string };
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  range?: { min: string | number | undefined; max: string | number | undefined };
  step?: number;
  numDisplayOption?: 'slider' | 'drop-down';
}

export interface LayerExpression {
  id: string;
  title: string;
  expressions: Expression[];
  operator: string;
}

export interface FilterOutput {
  id: string;
  definitionExpression: string;
}

interface Expressions {
  expressions: {
    [key: string]: { definitionExpression: string; type?: ExpressionField; min?: number; max?: number };
  };
  operator: string;
}

export interface FilterParam {
  type?: 'range' | 'select';
  layerId: string;
  expressionId: string;
  selectedFields?: string[];
  range?: { min: string | number | undefined; max: string | number | undefined };
}

export interface ExtentSelector {
  constraints: __esri.MapViewConstraints;
  mapRotation: number;
}

type ExpressionField = 'string' | 'number' | 'date' | 'coded-value' | 'range' | 'checkbox';
type ActiveTool = 'distance' | 'point' | 'area' | 'clear';
export type FilterLayer = __esri.FeatureLayer | __esri.ImageryLayer | __esri.WFSLayer | __esri.StreamLayer | __esri.CSVLayer | __esri.GeoJSONLayer;
export type FilterQueryLayer = __esri.FeatureLayer | __esri.WFSLayer | __esri.CSVLayer | __esri.GeoJSONLayer;
export type FilterQueryLayerView = __esri.FeatureLayerView | __esri.WFSLayerView | __esri.CSVLayerView | __esri.GeoJSONLayerView;

// Export
export interface ExportOutput {
  headerTitle?: string;
  includeLegend?: boolean;
  includeMap?: boolean;
  includePopup?: boolean;
}

export type PopoverPlacement =
  | 'auto'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'auto-start'
  | 'auto-end'
  | 'leading-start'
  | 'leading'
  | 'leading-end'
  | 'trailing-end'
  | 'trailing'
  | 'trailing-start';

export interface IMeasureConfiguration {
  areaUnit?: __esri.AreaUnit;
  linearUnit?: __esri.LengthUnit;
  coordinateFormat?: string;
  activeToolType?: ActiveTool;
}

// Control Panel
export interface ControlPanelComponent {
  content: any;
  isExpand?: boolean;
  expandIconClass?: string;
  expandTooltip?: string;
  collapseTooltip?: string;
}
