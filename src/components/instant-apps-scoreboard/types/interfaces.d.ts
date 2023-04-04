export type ScoreboardItems = ScoreboardItem[];

export interface ScoreboardData {
  items: ScoreboardItems;
}

export interface ScoreboardItem {
  id?: string;
  label: string;
  value?: string;
  operation?: string;
  field?: string;
}

export const enum Scoreboard {
  Loading = 'loading',
  Disabled = 'disabled',
  Complete = 'complete',
}

export type ScoreboardState = Scoreboard.Loading | Scoreboard.Disabled | Scoreboard.Complete;
