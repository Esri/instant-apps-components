import LanguageTranslator_t9n from '../../../assets/t9n/instant-apps-language-translator/resources.json';
import { getLocaleComponentStrings } from '../../../utils/locale';
import { LocaleUIData } from './interfaces';
import { languageTranslatorState } from './store';

// export function getLastSavedDate() {}

// export function getUILocation() {}

// export function copyToClipboard() {}

// export function getTranslatedLabel(locale: string) {}

// export function getTranslatedValue(locale: string, portalItemResourceData: string) {}

// export function getSuggestions() {}

// export function handleSuggestionSelection() {}

export function generateUIData(appSettings, locales: string[]): LocaleUIData {
  const settingKeys = Object.keys(appSettings);
  const uiData = {
    locales,
  };

  settingKeys.forEach(key => {
    const translatedLocaleData = {};
    locales.forEach((locale: string) => (translatedLocaleData[locale] = null));
    const appSetting = appSettings[key];
    const { type, label, value, uiLocation } = appSetting;
    uiData[key] = {
      userLocaleData: { type, label, value },
      translatedLocaleData,
      expanded: true,
      selected: false,
      uiLocation,
    };
  });

  const noneSelected = settingKeys.every(key => !uiData[key].selected);

  if (noneSelected) {
    uiData[settingKeys[0]].selected = true;
  }

  return uiData;
}

export async function getMessages(el: HTMLInstantAppsLanguageTranslatorElement): Promise<typeof LanguageTranslator_t9n> {
  const messages = await getLocaleComponentStrings(el);
  return messages[0] as typeof LanguageTranslator_t9n;
}

export function getUIDataKeys(): string[] {
  return Object.keys(languageTranslatorState.uiData as LocaleUIData).filter(key => key !== 'locales' && key !== 'translatedLanguageLabels');
}
