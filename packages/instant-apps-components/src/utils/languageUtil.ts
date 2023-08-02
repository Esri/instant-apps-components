/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { loadModules } from './loadModules';
import { APIVersion } from './types';

export const languageMap = new Map<string, string>([
  ['ar', 'ar'],
  ['bg', 'bg'],
  ['bs', 'bs'],
  ['ca', 'ca'],
  ['cs', 'cs'],
  ['da', 'da'],
  ['de', 'de'],
  ['el', 'el'],
  ['en', 'en'],
  ['es', 'es'],
  ['et', 'et'],
  ['fi', 'fi'],
  ['fr', 'fr'],
  ['he', 'he'],
  ['hr', 'hr'],
  ['hu', 'hu'],
  ['id', 'id'],
  ['it', 'it'],
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['lt', 'lt'],
  ['lv', 'lv'],
  ['nb', 'nb'],
  ['nl', 'nl'],
  ['pl', 'pl'],
  ['pt-br', 'pt-BR'],
  ['pt-pt', 'pt-PT'],
  ['ro', 'ro'],
  ['ru', 'ru'],
  ['sk', 'sk'],
  ['sl', 'sl'],
  ['sr', 'sr'],
  ['sv', 'sv'],
  ['th', 'th'],
  ['tr', 'tr'],
  ['uk', 'uk'],
  ['vi', 'vi'],
  ['zh-cn', 'zh-CN'],
  ['zh-hk', 'zh-HK'],
  ['zh-tw', 'zh-TW'],
]);

// rtl
export function getElementDir(el: HTMLElement): 'ltr' | 'rtl' {
  return getElementProp(el, 'dir', 'ltr');
}

function getElementProp(el: HTMLElement, prop, value): any {
  const closestWithProp = el.closest(`[${prop}]`);
  return closestWithProp ? closestWithProp.getAttribute(prop) : value;
}

// css
export const CSS_UTILITY = {
  rtl: 'arcgis--rtl',
} as const;

export async function formatNumber(
  number: number,
  options?: {
    api: APIVersion;
    type: 'decimal' | 'percent';
    places: number;
  },
): Promise<string> {
  const { api = 4, type = 'decimal', places = 2 } = options || {};
  if (api === 4) {
    const [intl] = await loadModules(['esri/intl']);
    const numberFormatIntlOptions = intl.convertNumberFormatToIntlOptions({
      places,
      type,
      digitSeparator: true,
    });
    return intl.formatNumber(number, numberFormatIntlOptions);
  }
  const [dojoNumber] = await loadModules(['dojo/number']);
  return dojoNumber.format(number, {
    type,
    places,
  });
}
