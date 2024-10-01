export interface AppGuidePage {
  title: string;
  content: string[];
  type: AppGuideRenderType;
}

export type AppGuideRenderType = 'paragraphs' | 'list';
