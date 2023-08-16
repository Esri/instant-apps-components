import { createStore } from '@stencil/store';
import { LocaleSettingItem, LocaleUIData } from './interfaces';

interface LanguageTranslatorState {
  uiData: LocaleUIData | null;
  currentLanguage: string | null;
  lastSave: string | null;
  saving: boolean;
  currentLocaleSettingItem: LocaleSettingItem | null;
  portalItemResource: __esri.PortalItemResource | null;
  portalItemResourceT9n: any;
}

const LanguageTranslatorStore = createStore<LanguageTranslatorState>({
  uiData: null,
  currentLanguage: null,
  lastSave: null,
  saving: false,
  currentLocaleSettingItem: null,
  portalItemResource: null,
  portalItemResourceT9n: null,
});

export const languageTranslatorState = LanguageTranslatorStore.state;
export const onLanguageTranslatorChange = LanguageTranslatorStore.onChange;
export const store = LanguageTranslatorStore;
