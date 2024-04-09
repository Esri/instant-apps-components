# instant-apps-sign-in



<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute          | Description                                                                                                                        | Type       | Default     |
| ------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----------- |
| `closeLandingPage`        | --                 |                                                                                                                                    | `Function` | `undefined` |
| `descriptionText`         | `description-text` | Description text.                                                                                                                  | `string`   | `undefined` |
| `landingPage`             | `landing-page`     | Show sign out dropdown trigger as a calcite-navigation-user when `true`, otherwise use the calcite-avatar as the dropdown trigger. | `boolean`  | `undefined` |
| `navUserBtn`              | `nav-user-btn`     | Show sign out dropdown trigger as a calcite-navigation-user when `true`, otherwise use the calcite-avatar as the dropdown trigger. | `boolean`  | `true`      |
| `oauthappid` _(required)_ | `oauthappid`       | The registered application id, used to setup sign in capabilities.                                                                 | `string`   | `undefined` |
| `openInPopup`             | `open-in-popup`    | Set to true to show the OAuth sign-in page in a popup window.                                                                      | `boolean`  | `undefined` |
| `portal` _(required)_     | --                 | The apps Portal, used to setup sign in capabilities.                                                                               | `IPortal`  | `undefined` |
| `titleText`               | `title-text`       | Title text.                                                                                                                        | `string`   | `undefined` |


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

