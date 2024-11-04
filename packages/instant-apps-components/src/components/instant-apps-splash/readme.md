# instant-apps-splash

## Description

The `instant-app-splash` component is a tool that is used to provide pertinent information about the content in an app. The splash component opens as a window over the app when it first opens.

Typically, the splash tool is used to provide a description of the map and data that is in the app, as well to present instructions on how to use the app or other tools available in the app.

In the splash tool there is a check box that allows users to “Don’t show this again”. When the box is checked the splash tool will no longer appear when that user accesses the app, the preference is stored in the browser’s local storage.

<!-- Auto Generated Below -->


## Properties

| Property                       | Attribute                | Description                                                                                              | Type                  | Default     |
| ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------------- | --------------------- | ----------- |
| `closeButtonDisabled`          | `close-button-disabled`  | When `true`, disables the component's close button.                                                      | `boolean`             | `false`     |
| `content`                      | `content`                | Content of splash screen.                                                                                | `string`              | `''`        |
| `localStorageKey` _(required)_ | `local-storage-key`      | Local storage key used to determine whether or not user has opted into "Don't show this again" checkbox. | `string`              | `undefined` |
| `open`                         | `open`                   | Controls the 'open' state of the modal element.                                                          | `boolean`             | `true`      |
| `outsideCloseDisabled`         | `outside-close-disabled` | When `true`, disables the closing of the component when clicked outside.                                 | `boolean`             | `false`     |
| `primaryButtonText`            | `primary-button-text`    | Primary button text.                                                                                     | `string`              | `''`        |
| `secondaryButton`              | `secondary-button`       | When `true`, enables a secondary button at the component's footer.                                       | `boolean`             | `false`     |
| `secondaryButtonCallback`      | --                       | Callback function when secondary button is clicked.                                                      | `() => Promise<void>` | `undefined` |
| `secondaryButtonIcon`          | `secondary-button-icon`  | Secondary button icon.                                                                                   | `string`              | `undefined` |
| `secondaryButtonText`          | `secondary-button-text`  | Secondary button text.                                                                                   | `string`              | `undefined` |
| `titleText`                    | `title-text`             | Title of splash screen.                                                                                  | `string`              | `''`        |


## Events

| Event         | Description                            | Type                |
| ------------- | -------------------------------------- | ------------------- |
| `splashClose` | Emits when the splash modal is closed. | `CustomEvent<void>` |


----------------------------------------------

## License
COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

