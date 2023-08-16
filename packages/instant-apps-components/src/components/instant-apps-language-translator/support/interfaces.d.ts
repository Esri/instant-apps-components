export interface LocaleUIData {
  locales: string[];
  [fieldName: string]: LocaleSettingItem | string[];
}

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

export type InputType = 'user' | 'translation';
export type SettingType = 'string' | 'textEditor';
