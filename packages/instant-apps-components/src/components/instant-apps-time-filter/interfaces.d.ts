export type ITimeItemUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years' | 'decades' | 'centuries';

export interface ITimeInfoItem {
  layerView: __esri.LayerView;
  unit: ITimeItemUnit;
  rangeStart: Date;
  rangeEnd: Date;
  timeExtent: __esri.TimeExtent;
}

export interface ITimeInfoConfigItem {
  id: string;
  increments: string;
  max: string;
  min: string;

  rangeEnd: Date;
  rangeStart: Date;
}

export interface State {
  timeInfoConfigItems: ITimeInfoConfigItem[];
  timeInfoItems: ITimeInfoItem[];
  selectedTimeInfoItem: ITimeInfoItem | null;
  view: __esri.MapView | __esri.SceneView | null;
  filterMode: FilterMode | null;
  timeSlider: __esri.TimeSlider | null;
}

export interface DateValue {
  month: number;
  day: number;
  year: number;
}
