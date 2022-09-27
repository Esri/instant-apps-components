export interface ICategory {
  count: number;
  selected: boolean;
  legendElementInfo: any;
}

export type ICategories = Map<string, ICategory>;

export interface IIntLegendLayerData {
  categories: ICategories;
  field: string;
  queryExpressions: (string | null)[];
  totalCount: number;
  fLayerView: __esri.FeatureLayerView;
  legendElement: __esri.LegendElement;
}

export interface IInteractiveLegendData {
  [layerId: string]: IIntLegendLayerData;
}
