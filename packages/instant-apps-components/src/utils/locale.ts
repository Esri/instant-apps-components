// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
import { loadModules } from 'esri-loader';
import { languageMap } from './languageUtil';

export function getComponentClosestLanguage(element: HTMLElement): string | undefined {
  const closestElement = (element.closest('[lang]') as HTMLElement) ?? element.shadowRoot?.ownerDocument?.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = (closestElement?.lang || navigator?.language || 'en').toLowerCase() as string;
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

function fetchLocaleStringsForComponent<T extends StringBundle = StringBundle>(componentName: string, locale: string): Promise<T> {
  return new Promise((resolve, reject): void => {
    const t9nDir = './assets/t9n';
    const fileName = `resources_${locale}.json`;
    const localeFilePath = `${t9nDir}/${componentName}/${fileName}`;
    const { href } = new URL(localeFilePath, window.location.href);
    fetch(href).then(
      result => {
        if (result.ok) resolve(result.json());
        else reject();
      },
      () => reject(),
    );
  });
}

export function getDefaultLanguage(intl: __esri.intl, portal: __esri.Portal): string {
    // User profile - locale set in user profile
    const userProfileLocale: string = portal?.get("user.culture");
    // Browser - window.navigator.language
    const browserLocale: string = window?.navigator?.language;
    // ArcGIS JS API - locale currently set in JS api
    const jsapiLocale: string = intl.getLocale();
    // Fallback locale - "en"
    const fallbackLocale = "en";
    return intl.normalizeMessageBundleLocale(userProfileLocale || browserLocale || jsapiLocale || fallbackLocale) as string;
}

export async function getLocaleComponentStrings<T extends StringBundle = StringBundle>(element: HTMLElement, locale?: string): Promise<[T, string]> {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = locale ?? (getComponentClosestLanguage(element) as string);
  let strings: T;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  } catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en');
  }
  return [strings, componentLanguage];
}

export async function getMessages(component) {
  const messages = await getLocaleComponentStrings(component.el);
  component.messages = messages[0];
  const [intl] = await loadModules(['esri/intl']);
  (intl as __esri.intl).onLocaleChange(async locale => {
    const messages = await getLocaleComponentStrings(component.el, locale);
    component.messages = messages[0];
  });
}
