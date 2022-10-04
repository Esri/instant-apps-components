export interface FilterMode {
  type: 'filter' | 'effect';
  effect?: {
    includedEffect: string;
    excludedEffect: string;
  };
}

export interface ICategory {
  count: number | null;
  selected: boolean;
  legendElementInfo: any;
}

export type ICategories = Map<string, ICategory>;

export interface IIntLegendLayerData {
  categories: ICategories;
  field: string;
  queryExpressions: (string | null)[];
  totalCount: number | null;
  fLayerView: __esri.FeatureLayerView;
  legendElement: __esri.LegendElement;
}

export interface IInteractiveLegendData {
  [layerId: string]: IIntLegendLayerData;
}
