export type ScoreboardItems = ScoreboardItem[];

export interface ScoreboardItem {
  layer: {
    url: string;
    id: string;
  };
  field: string;
  label: string;
  displayValue?: string;
  value?: number;
  operation: string;
  visible?: boolean;
}

export const enum Scoreboard {
  Loading = 'loading',
  Disabled = 'disabled',
  Complete = 'complete',
  Calculating = 'calculating',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
  Floating = 'floating',
  Pinned = 'pinned',
}

export const enum ScoreboardIcons {
  Up = 'chevron-up',
  Down = 'chevron-down',
  Left = 'chevron-left',
  Right = 'chevron-right',
  Blank = 'blank',
}

export const enum ScoreboardScale {
  Small = 's',
  Medium = 'm',
  Large = 'l',
}

export const enum ScoreboardAppearance {
  Transparent = 'transparent',
}

export const enum ScoreboardAlignment {
  Start = 'start',
  Center = 'center',
}

export type ScoreboardState = Scoreboard.Loading | Scoreboard.Disabled | Scoreboard.Complete | Scoreboard.Calculating;
export type ScoreboardPosition = Scoreboard.Bottom | Scoreboard.Left | Scoreboard.Right;
export type ScoreboardMode = Scoreboard.Floating | Scoreboard.Pinned;
export type AcceptableLayerViews = __esri.FeatureLayerView | __esri.SceneLayerView;
export type AcceptableLayers = __esri.FeatureLayer | __esri.SceneLayer;
