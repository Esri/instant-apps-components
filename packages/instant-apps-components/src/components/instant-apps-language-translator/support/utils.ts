import LanguageTranslator_t9n from '../../../assets/t9n/instant-apps-language-translator/resources.json';
import { getLocaleComponentStrings } from '../../../utils/locale';
import { ECalciteMode } from './enum';
import { LocaleItem, LocaleUIData } from './interfaces';
import { languageTranslatorState, store } from './store';


export function generateUIData(appSettings, locales: LocaleItem[]): LocaleUIData | void {
  if (!appSettings) return;
  const settingKeys = Object.keys(appSettings).filter(settingKey => settingKey !== 'translatedLanguageLabels');
  const uiData = {
    locales,
    translatedLanguageLabels: {
      ...appSettings.translatedLanguageLabels,
    },
  };

  settingKeys.forEach(key => {
    const appSetting = appSettings[key];
    const { type, label, value, uiLocation } = appSetting;
    uiData[key] = {
      userLocaleData: { type, label, value },
      expanded: true,
      selected: false,
      uiLocation,
      tip: appSetting?.tip,
    };
  });

  const noneSelected = settingKeys.every(key => !uiData[key].selected);

  if (noneSelected && uiData[settingKeys[0]]) {
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


export async function getPortalItemResourceT9nData(resource: __esri.PortalItemResource) {
  if (!resource) return null;
  try {
    const t9nData = await resource.fetch();
    return Promise.resolve(t9nData);
  } catch {
    return Promise.resolve(null);
  }
}

export function getT9nData(locale: string, data: { [key: string]: string }) {
  const portalItemResourceT9n = store.get('portalItemResourceT9n');
  const dataToWrite = { ...portalItemResourceT9n, [locale]: { ...portalItemResourceT9n[locale], ...data } };
  return dataToWrite;
}

export function getLocales(localeItems: LocaleItem[]) {
  return localeItems?.map(localeItem => localeItem.locale) ?? [];
}

export function isCalciteModeDark(): boolean {
  return document.body.classList.contains(ECalciteMode.Dark);
}
