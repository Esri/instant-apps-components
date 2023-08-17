import LanguageTranslator_t9n from '../../../assets/t9n/instant-apps-language-translator/resources.json';
import { getLocaleComponentStrings } from '../../../utils/locale';
import { LocaleUIData } from './interfaces';
import { languageTranslatorState, store } from './store';

import { loadModules } from 'esri-loader';

export function generateUIData(appSettings, locales: string[]): LocaleUIData | void {
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

export async function getPortalItemResource(portalItem: __esri.PortalItem): Promise<__esri.PortalItemResource | null> {
  if (!portalItem) return null;
  const [PortalItemResource] = await loadModules(['esri/portal/PortalItemResource']);
  const existingResourcesRes = await portalItem.fetchResources();
  const path = `t9n/${portalItem?.id}.json`;
  const resource = new PortalItemResource({ path, portalItem });
  const existingResourceArr = existingResourcesRes.resources.filter(resourceItem => resourceItem.resource.path === path);
  if (existingResourceArr.length === 0) {
    const type = 'application/json';
    const content = new Blob([JSON.stringify({})], { type });
    try {
      await portalItem.addResource(resource, content);
      return Promise.resolve(resource);
    } catch (err) {
      console.error('ERROR: ', err);
      return Promise.reject(null);
    }
  } else {
    const existingResource = existingResourceArr[0].resource;
    return Promise.resolve(existingResource);
  }
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

export async function writeToPortalItemResource(portalItemResource: __esri.PortalItemResource, data: { [key: string]: string }): Promise<void> {
  try {
    const dataStr = JSON.stringify(data);
    const blobParts = [dataStr];
    const options = { type: 'application/json' };
    const blob = new Blob(blobParts, options);
    await portalItemResource.update(blob);
    return Promise.resolve();
  } catch (err) {
    console.error('Failed to update portal item resource.');
    console.error(`Error from 'instant-apps-language-translator': `, err);
    return Promise.reject();
  }
}
