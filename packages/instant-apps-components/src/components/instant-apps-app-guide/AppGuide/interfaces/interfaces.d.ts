export interface AppGuidePage {
  title: string;
  content: string[];
  renderContentAs: AppGuideRenderType;
}

export type AppGuideRenderType = 'paragraphs' | 'list';
