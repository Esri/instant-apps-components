export type ScoreboardItems = ScoreboardItem[];

export interface ScoreboardData {
  items: ScoreboardItems;
}

export interface ScoreboardItem {
  layer?: {
    url: string;
    id: string;
  };
  field?: string;
  label: string;
  value?: string;
  operation?: string;
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
  Warning = 'warning',
}

export const enum ScoreboardIcons {
  Up = 'chevron-up',
  Down = 'chevron-down',
  Left = 'chevron-left',
  Right = 'chevron-right',
  Warning = 'exclamation-mark-triangle',
  Blank = 'blank',
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
