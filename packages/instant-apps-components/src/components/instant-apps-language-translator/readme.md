# instant-apps-language-translator

Language translator provides a UI to edit user-defined strings in a an end-user's language along with translations of selected languages. The languages currently supported in the language translator component are languages supported in ArcGIS Online. A list of the supported can be found [here](https://doc.arcgis.com/en/arcgis-online/get-started/set-language-region.htm#GUID-A3CDEC64-1A27-4F12-A05D-5DA12309AF06?target="_blank").

## Typings

```
interface AppSettings {
  content: LocaleSettingData[];
  translatedLanguageLabels: TranslatedLanguageLabels;
}
```

```
interface LocaleSettingData {
  id: string; // Unique ID of setting
  type: SettingType; // Determines whether an input will be rendered as a calcite-input or text editor (used to handle HTML formatting).
  label: string; // Setting label
  value: string; // Input value
  tip?: string; // Used to display a tooltip of information on a given setting
  uiLocation?: any; // Specific to ArcGIS Instant Apps. Displays the location of a setting within the ArcGIS Instant Apps Configuration window.
}
```

```
interface TranslatedLanguageLabels {
  [locale: string]: {
    label: string;
  };
}
```

```
type SettingType = 'string' | 'textEditor' | 'textarea';
```

```
interface LocaleItem {
  locale: string;
  webmap?: string;
}
```

## Examples

### Basic usage

```
<instant-apps-language-translator
  appSettings={appSettings}
  locales={locales}
  portalItem={portalItem}
  userLocaleInputOnChangeCallback={(fieldName: string, value: string) =>
    new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })
      .catch((err) => console.error("ERROR: ", err))
      .then((res) => {
        console.log("FIELD NAME: ", fieldName);
        console.log("VALUE: ", value);
      })
  }
  translatedLocaleInputOnChangeCallback={(
    fieldName: string,
    value: string,
    locale: string,
    resource: __esri.PortalItemResource
  ) =>
    new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    })
      .catch((err) => console.error("ERROR: ", err))
      .then((res) => {
        console.log("FIELD NAME: ", fieldName);
        console.log("VALUE: ", value);
        console.log("LOCALE: ", locale);
        console.log("RESOURCE: ", resource);
      })
  }
  />
```

### AppSettings

```
{
  ...
  "content": [
    ...
    {
      "id": "title",
      "type": "string",
      "label": "App title",
      "value": "Language switcher",
      "tip": "Include title text to introduce the map's main topic"
    }
    ...
  ],
  ...
  "translatedLanguageLabels": {
      "ja": {
          ...
          "title": "アプリのタイトル"
          ...
      },
      "el": {
          ...
          "title": "Τίτλος εφαρμογής"
          ...
      },
      "fr": {
          ...
          "title": "Titre de l’application"
          ...
      }
  }
}
```

### Locales

```
[
    ...
    {
        "locale": "ja"
    },
    {
        "locale": "el"
    },
    {
        "locale": "fr"
    }
    ...
]
```

<!-- Auto Generated Below -->


## Properties

| Property                                | Attribute | Description                                                                                                                                                                                                                                                                                                               | Type                                                                                                | Default     |
| --------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| `appSettings`                           | --        | Object used to render each `instant-apps-translator-item`, containing either a `calcite-input` or rich text editor (handles HTML formatting); and, the languages to translate within the dropdown.                                                                                                                        | `AppSettings`                                                                                       | `undefined` |
| `locales`                               | --        | Specified languages that the user-defined strings will be translated in.                                                                                                                                                                                                                                                  | `LocaleItem[]`                                                                                      | `undefined` |
| `open`                                  | `open`    | Controls the open/close state of the modal.                                                                                                                                                                                                                                                                               | `boolean`                                                                                           | `false`     |
| `portalItem` _(required)_               | --        | Instant App portal item - used to fetch it's associated portal item resource. The portal item resource will contain the user-defined translated strings.                                                                                                                                                                  | `PortalItem`                                                                                        | `undefined` |
| `translatedLocaleInputOnChangeCallback` | --        | Function that is called when the value in a translated locale's input has changed. This function will have 4 arguments - fieldName, value, locale, and resource - and will return a promise. The callback function can be used to construct the data of key-value pairs that will be written to the portal item resource. | `(fieldName: string, value: string, locale: string, resource: PortalItemResource) => Promise<void>` | `undefined` |
| `userLocaleInputOnChangeCallback`       | --        | Function to be called when the value in a user locale input has changed. This function will have 2 arguments - fieldName and value - and will return a promise.                                                                                                                                                           | `(fieldName: string, value: string) => Promise<void>`                                               | `undefined` |


## Events

| Event                   | Description                                         | Type                  |
| ----------------------- | --------------------------------------------------- | --------------------- |
| `translatorDataUpdated` | Fires when a translation input's value has changed. | `CustomEvent<string>` |


## Methods

### `batchWriteToPortalItemResource(data: any) => Promise<void>`

Batch write data to associated portal item resource.

#### Returns

Type: `Promise<void>`



### `getPortalItemResource() => Promise<__esri.PortalItemResource>`

Gets portal item resource containing the translation data.

#### Returns

Type: `Promise<PortalItemResource>`



### `getTranslationData() => Promise<any>`

Gets translation data for all languages and fields.

#### Returns

Type: `Promise<any>`



### `setTranslationData(data: any) => Promise<void>`

Updates translation data for all languages and fields.

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [instant-apps-language-switcher](../instant-apps-language-switcher)

### Depends on

- [instant-apps-language-translator-search](instant-apps-language-translator-search)
- [instant-apps-language-translator-item](instant-apps-language-translator-item)

### Graph
```mermaid
graph TD;
  instant-apps-language-translator --> instant-apps-language-translator-search
  instant-apps-language-translator --> instant-apps-language-translator-item
  instant-apps-language-translator-item --> instant-apps-ckeditor-wrapper
  instant-apps-language-switcher --> instant-apps-language-translator
  style instant-apps-language-translator fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

