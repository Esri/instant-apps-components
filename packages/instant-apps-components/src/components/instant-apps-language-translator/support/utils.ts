import LanguageTranslator_t9n from '../../../assets/t9n/instant-apps-language-translator/resources.json';
import { getLocaleComponentStrings } from '../../../utils/locale';
import { LocaleUIData } from './interfaces';
import { languageTranslatorState } from './store';

import { loadModules } from 'esri-loader';

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

export async function writeToPortalItemResource(portalItemResource: __esri.PortalItemResource, locale: string, data: { [key: string]: string }): Promise<void> {
  try {
    const existingData = await portalItemResource.fetch();
    const updatedData = {
      ...existingData,
      [locale]: {
        ...[existingData][locale],
        ...data,
      },
    };
    const blobParts = [JSON.stringify(updatedData)];
    const blob = new Blob(blobParts, { type: 'application/json' });
    await portalItemResource.update(blob);
  } catch (err) {
    console.error('Failed to update portal item resource.');
    console.error(`Error from 'instant-apps-language-translator': `, err);
  }
}
