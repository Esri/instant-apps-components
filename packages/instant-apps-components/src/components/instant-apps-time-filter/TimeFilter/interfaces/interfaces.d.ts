import { FilterMode } from '../../../../interfaces/interfaces';

export type ITimeItemUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years' | 'decades' | 'centuries';

export interface ITimeInfoItem {
  layerView: __esri.LayerView;
  unit: ITimeItemUnit;
  rangeStart: Date;
  rangeEnd: Date;
  timeExtent: __esri.TimeExtent | null;
  previousTimeExtent: __esri.TimeExtent | null;
  timeIntervalValue: number;
}

export interface ITimeInfoConfigItem {
  type?: string;
  id?: string;
  increments: string;
  max: string;
  min: string;
  rangeEnd: Date;
  rangeStart: Date;
  timeIntervalValue?: number;
}

export interface State {
  timeInfoConfigItems: ITimeInfoConfigItem[];
  timeInfoItems: ITimeInfoItem[];
  selectedTimeInfoItem: ITimeInfoItem | null;
  view: __esri.MapView | __esri.SceneView | null;
  filterMode: FilterMode | null;
  timeSlider: __esri.widgetsTimeSlider | null;
  loading: boolean;
  timeSliderConfig: __esri.widgetsTimeSlider | {};
  autoPlay: boolean;
}

interface TimeExtent {
  startTime: Date;
  endTime: Date;
}
