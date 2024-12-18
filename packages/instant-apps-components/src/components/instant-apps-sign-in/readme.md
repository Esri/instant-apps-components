# instant-apps-sign-in



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute          | Description                                                                                                                                                                                               | Type                                                            | Default        |
| ------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------- |
| `closeLandingPage`        | --                 |                                                                                                                                                                                                           | `Function`                                                      | `undefined`    |
| `descriptionText`         | `description-text` | Landing page description text.                                                                                                                                                                            | `string`                                                        | `undefined`    |
| `landingPage`             | `landing-page`     | Set to `true` if app has landing page                                                                                                                                                                     | `boolean`                                                       | `undefined`    |
| `oauthappid` _(required)_ | `oauthappid`       | The registered application id, used to setup sign in capabilities.                                                                                                                                        | `string`                                                        | `undefined`    |
| `openInPopup`             | `open-in-popup`    | Set to true to show the OAuth sign-in page in a popup window.                                                                                                                                             | `boolean`                                                       | `undefined`    |
| `portal` _(required)_     | --                 | The apps Portal, used to setup sign in capabilities.                                                                                                                                                      | `IPortal`                                                       | `undefined`    |
| `showIndicator`           | `show-indicator`   | Show blue dot indicator on user avatar.                                                                                                                                                                   | `boolean`                                                       | `true`         |
| `signInDropdownItems`     | --                 | Add items to the sign in dropdown.                                                                                                                                                                        | `{ label: string; onClick: (event: MouseEvent) => unknown; }[]` | `undefined`    |
| `subtitleText`            | `subtitle-text`    | Landing page subtitle text.                                                                                                                                                                               | `string`                                                        | `undefined`    |
| `titleText`               | `title-text`       | Landing page title text.                                                                                                                                                                                  | `string`                                                        | `undefined`    |
| `type`                    | `type`             | Pick the look of the sign in/out component. `navigation` will put sign out in calcite-navigation-user. `avatar` will put sign out in calcite-avatar. `landingPage` is used for instant-apps-landing-page. | `"avatar" \| "landingPage" \| "navigation"`                     | `'navigation'` |


## Slots

| Slot                     | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| `"sign-in-dropdown-top"` | A slot for adding an element to the top of the sign in dropdown. |


## CSS Custom Properties

| Name                                     | Description                                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| `--instant-apps-sign-in-indicator-color` | Color of the indicator that shows in a signed in user's avatar. |


## Dependencies

### Used by

 - [instant-apps-landing-page](../instant-apps-landing-page)

### Graph
```mermaid
graph TD;
  instant-apps-landing-page --> instant-apps-sign-in
  style instant-apps-sign-in fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

## License
COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

