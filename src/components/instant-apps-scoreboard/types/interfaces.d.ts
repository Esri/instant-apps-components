export type ScoreboardItems = ScoreboardItem[];

export interface ScoreboardData {
  items: ScoreboardItems;
}

export interface ScoreboardItem {
  id?: string;
  field?: string;
  label: string;
  value?: string;
  operation?: string;
}

export const enum Scoreboard {
  Loading = 'loading',
  Disabled = 'disabled',
  Complete = 'complete',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export type ScoreboardState = Scoreboard.Loading | Scoreboard.Disabled | Scoreboard.Complete;

export type ScoreboardPosition = Scoreboard.Bottom | Scoreboard.Left | Scoreboard.Right;
