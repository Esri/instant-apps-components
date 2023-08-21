# instant-apps-language-translator



<!-- Auto Generated Below -->


## Properties

| Property                          | Attribute      | Description                                                                                                                                                                                                                              | Type                                         | Default     |
| --------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------- |
| `appSettings`                     | `app-settings` | Data object containing a series of key-value pairs used to render the components UI.                                                                                                                                                     | `any`                                        | `undefined` |
| `locales`                         | --             | Specified languages that the user-defined strings will be translated in.                                                                                                                                                                 | `LocaleItem[]`                               | `undefined` |
| `open`                            | `open`         | Controls the open/close state of the modal.                                                                                                                                                                                              | `boolean`                                    | `false`     |
| `portalItem` _(required)_         | --             | Instant App portal item - used to fetch it's associated portal item resource. The portal item resource will contain the user defined translated strings.                                                                                 | `PortalItem`                                 | `undefined` |
| `userLocaleInputOnChangeCallback` | --             | Function to be called when data in user locale inputs have changed. This function will have 2 arguments - fieldName and value. Field name is a unique identifier for a given setting/field. Value is the entered value within the input. | `(fieldName: string, value: string) => void` | `undefined` |


## Events

| Event                   | Description | Type                  |
| ----------------------- | ----------- | --------------------- |
| `translatorDataUpdated` |             | `CustomEvent<string>` |


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

