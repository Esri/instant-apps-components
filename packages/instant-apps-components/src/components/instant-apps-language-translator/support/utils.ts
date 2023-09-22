import LanguageTranslator_t9n from '../../../assets/t9n/instant-apps-language-translator/resources.json';
import { getLocaleComponentStrings } from '../../../utils/locale';
import { ECalciteMode } from './enum';
import { LocaleItem, LocaleUIData } from './interfaces';
import { languageTranslatorState, store } from './store';

export function generateUIData(appSettings, locales: LocaleItem[]): LocaleUIData | void {
  if (!appSettings) return;
  const existingUIData = store.get('uiData');
  const uiData = new Map();
  uiData.set('locales', locales);
  uiData.set('translatedLanguageLabels', {
    ...appSettings.translatedLanguageLabels,
  });

  appSettings.content.forEach(contentItem => {
    const { type, label, value, uiLocation } = contentItem;
    uiData.set(contentItem.id, {
      userLocaleData: { type, label, value },
      expanded: true,
      selected: existingUIData?.[contentItem.id]?.['selected'] ?? false,
      uiLocation,
      tip: contentItem?.tip,
    });
  });

  const settingKeys = appSettings.content.map(contentItem => contentItem.id);

  const noneSelected = settingKeys.every((key: string) => {
    const setting = uiData.get(key);
    return !setting.selected;
  });

  if (noneSelected && uiData[settingKeys[0]]) {
    uiData[settingKeys[0]].selected = existingUIData?.[settingKeys[0]]?.['selected'] ?? true;
  }

  return uiData;
}

export async function getMessages(el: HTMLInstantAppsLanguageTranslatorElement): Promise<typeof LanguageTranslator_t9n> {
  const messages = await getLocaleComponentStrings(el);
  return messages[0] as typeof LanguageTranslator_t9n;
}

export function getUIDataKeys(): string[] {
  const settingKeys: string[] = [];
  languageTranslatorState.uiData?.forEach((_value, key) => {
    if (key !== 'locales' && key !== 'translatedLanguageLabels') {
      settingKeys.push(key);
    }
  });
  return settingKeys;
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
  let dataToWrite: { [locale: string]: string };
  if (!portalItemResourceT9n?.[locale]) {
    portalItemResourceT9n[locale] = {};
  }
  dataToWrite = { ...portalItemResourceT9n, [locale]: { ...portalItemResourceT9n[locale], ...data } };
  return dataToWrite;
}

export function getLocales(localeItems: LocaleItem[]) {
  return localeItems?.map(localeItem => localeItem.locale) ?? [];
}

export function isCalciteModeDark(): boolean {
  return document.body.classList.contains(ECalciteMode.Dark);
}
