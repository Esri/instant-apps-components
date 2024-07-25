type ITimeItemUnit = "milliseconds"
    | "seconds"
    | "minutes"
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years"
    | "decades"
    | "centuries";

export interface ITimeInfoItem {
    layerView: __esri.LayerView;
    unit: ITimeItemUnit;
    rangeStart: Date;
    rangeEnd: Date;
    timeExtent: __esri.TimeExtent;
}