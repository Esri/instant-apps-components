# instant-apps-language-translator-item



<!-- Auto Generated Below -->


## Properties

| Property                                | Attribute                   | Description                                                                                                                                                                                                                                                               | Type                                                                                                | Default     |
| --------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| `fieldName`                             | `field-name`                | Unique identifier tied to an associated setting in an app.                                                                                                                                                                                                                | `string`                                                                                            | `undefined` |
| `translatedLanguageLabel`               | `translated-language-label` | Label of item in currently selected language.                                                                                                                                                                                                                             | `string`                                                                                            | `undefined` |
| `translatedLocaleInputOnChangeCallback` | --                          |                                                                                                                                                                                                                                                                           | `(fieldName: string, value: string, locale: string, resource: PortalItemResource) => Promise<void>` | `undefined` |
| `type`                                  | `type`                      | Determines whether to use a regular input or text editor                                                                                                                                                                                                                  | `"string" \| "textEditor"`                                                                          | `undefined` |
| `userLocaleInputOnChangeCallback`       | --                          | Function that return a promise that will be called when data in the user locale inputs have changed. This function will have 2 arguments - fieldName and value. Field name is a unique identifier for a given setting/field. Value is the entered value within the input. | `(fieldName: string, value: string) => Promise<void>`                                               | `undefined` |


## Events

| Event                       | Description | Type                |
| --------------------------- | ----------- | ------------------- |
| `translatorItemDataUpdated` |             | `CustomEvent<void>` |


## Dependencies

### Used by

 - [instant-apps-language-translator](..)

### Depends on

- [instant-apps-ckeditor-wrapper](../instant-apps-ckeditor-wrapper)

### Graph
```mermaid
graph TD;
  instant-apps-language-translator-item --> instant-apps-ckeditor-wrapper
  instant-apps-language-translator --> instant-apps-language-translator-item
  style instant-apps-language-translator-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

