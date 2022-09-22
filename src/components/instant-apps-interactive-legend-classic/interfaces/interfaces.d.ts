export interface ICategory {
  count: number;
  selected: boolean;
  legendElementInfo: any;
}

export type ICategories = Map<string, ICategory>;

export interface IIntLegendLayerData {
  categories: ICategories;
  field: string | null;
  expression: string | null;
  totalCount: number;
  fLayerView: __esri.FeatureLayerView;
}

export interface IInteractiveLegendData {
  [layerId: string]: IIntLegendLayerData;
}
