interface AppSettings {
  content: LocaleSettingData[];
  translatedLanguageLabels: TranslatedLanguageLabels;
}

interface LocaleSettingData {
  id: string;
  type: SettingType;
  label: string;
  value: string;
  uiLocation?: any;
}

interface TranslatedLanguageLabels {
  [locale: string]: {
    label: string;
  };
}

export interface LocaleItem {
  locale: string;
  webmap?: string;
}

export type LocaleUIData = Map<string, any>;

interface LocaleSettingItem {
  userLocaleData: LocaleData;
  expanded: boolean;
  selected: boolean;
  uiLocation: any;
  tip: string;
}

export interface SettingLocaleData {
  [locale: string]: LocaleData;
}

interface LocaleData {
  type: 'string' | 'richText';
  label: string;
  value: string;
}

export interface PortalItemResourceT9nData {
  [locale: string]: { [fieldName: string]: string } | string;
}

export interface LanguageTranslatorSearchResult extends LocaleSettingItem {
  fieldName: string;
}

export type InputType = 'user' | 'translation';
export type SettingType = 'string' | 'textEditor';
