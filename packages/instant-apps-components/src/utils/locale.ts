// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
import { loadModules } from '../utils/loadModules';
import { languageMap } from './languageUtil';

const TEST_ENV_ORIGIN = 'localhost:4444';
const IS_TEST_ENV = new URL(window.location.href).origin.includes(TEST_ENV_ORIGIN);

export function getComponentClosestLanguage(): string | undefined {
  // language set by the calling application or browser. defaults to english.
  const lang = (document.documentElement.lang || navigator?.language || 'en').toLowerCase() as string;
  if (languageMap.has(lang)) {
    return languageMap.get(lang);
  } else {
    // "ru-RU" maps to "ru" use case
    if (languageMap.has(lang.slice(0, 2))) {
      return languageMap.get(lang.slice(0, 2));
    } else {
      return 'en';
    }
  }
}

type StringValue = string | StringBundle;

interface StringBundle {
  [key: string]: StringValue;
}

async function fetchLocaleStringsForComponent<T extends StringBundle = StringBundle>(componentName: string, locale: string): Promise<T> {
  const localePath = `assets/t9n/${componentName}/resources_${locale}.json`;
  const primaryURL = new URL(`./${localePath}`, window.location.href).href;
  const fallbackURL = `${getFallbackUrl()}/dist/${localePath}`;

  async function fetchJson(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fetch failed with status ${response.status}: ${response.statusText}`);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      // Attempt to read response as text for debugging purposes
      const responseBody = await response.text();
      console.error(`Expected JSON, but received (${contentType}): ${responseBody}`);
      throw new Error('Fetched content is not JSON');
    }
    return await response.json();
  }

  try {
    return await fetchJson(IS_TEST_ENV ? fallbackURL : primaryURL);
  } catch (primaryError) {
    console.error(`Primary fetch error: ${primaryError}`); // Log primary fetch error with more context
    try {
      return await fetchJson(fallbackURL);
    } catch (fallbackError) {
      console.error(`Fallback fetch error: ${fallbackError}`); // Log fallback fetch error with more context
      throw new Error('Both primary and fallback fetches failed');
    }
  }
}

export function getDefaultLanguage(intl: __esri.intl, portal: __esri.Portal): string {
  // User profile - locale set in user profile
  const userProfileLocale: string = portal?.user?.culture;
  // Browser - window.navigator.language
  const browserLocale: string = window?.navigator?.language;
  // ArcGIS JS API - locale currently set in JS api
  const jsapiLocale: string = intl.getLocale();
  // Fallback locale - "en"
  const fallbackLocale = 'en';
  return intl.normalizeMessageBundleLocale(userProfileLocale || browserLocale || jsapiLocale || fallbackLocale) as string;
}

export async function getLocaleComponentStrings<T extends StringBundle = StringBundle>(element: HTMLElement, locale?: string): Promise<[T, string]> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = locale ?? (getComponentClosestLanguage() as string);
  let strings: T;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  } catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en');
  }
  return [strings, componentLanguage];
}

export async function getMessages(component: any, messageOverrides?: unknown) {
  try {
    const messages = await getLocaleComponentStrings(component.el);
    updateMessages(component, messages, messageOverrides);
  } catch {
  } finally {
    try {
      const [intl] = await loadModules(['esri/intl']);
      (intl as __esri.intl).onLocaleChange(handleOnLocaleChange(component, messageOverrides));
    } catch {}
  }
}

function updateMessages(component, messages: unknown[], messageOverrides: unknown) {
  component.messages = messages[0];
  if (messageOverrides) {
    component.messages = {
      ...component.messages,
      ...messageOverrides,
    };
  }
}

function handleOnLocaleChange(component, messageOverrides: unknown) {
  return async (locale: string) => {
    const messages = await getLocaleComponentStrings(component.el, locale);
    updateMessages(component, messages, messageOverrides);
  };
}

export function getFallbackUrl() {
  return new URL(window.location.href).origin;
}
