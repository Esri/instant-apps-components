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
  nestedInfos?: any[];
}

export type ICategories = Map<string, ICategory>;

export interface IIntLegendLayerData {
  activeLayerInfo: __esri.ActiveLayerInfo;
  categories: ICategories;
  field: string;
  queryExpressions: (string | null)[];
  totalCount: number | null;
  fLayerView: __esri.FeatureLayerView;
  legendElement: __esri.LegendElement;
}

export interface IInteractiveLegendData {
  layerId: IIntLegendLayerData;
  selectedLayerId: string;
}
