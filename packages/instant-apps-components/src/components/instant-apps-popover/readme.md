# instant-apps-popover

## Description

The `instant-apps-popover` component is a tool that can be used to display a small window with additional information above or next to an element in an app when it first opens.

This can be useful to provide an additional description about a tool or to call attention to an element in an app. In the popover message a title, subtitle or image can be included.

Utilize [instant-apps-popovers](https://github.com/Esri/instant-apps-components/tree/master/packages/instant-apps-components/src/components/instant-apps-popovers) and use pagination to navigate through multiple popover messages using next and back buttons.

<p align="center">
<img alt="Image of popover message in sample app" img src="https://i.imgur.com/pNdAIMw.jpg"/>
</p>

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                                                                                                                                                                                                                                                                                              | Default            |
| ------------------ | ------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `content`          | `content`           |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `disableAction`    | `disable-action`    |             | `boolean`                                                                                                                                                                                                                                                                                                         | `false`            |
| `imgAlt`           | `img-alt`           |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `imgSrc`           | `img-src`           |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `index`            | `index`             |             | `number`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `mediaSrc`         | `media-src`         |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `messageOverrides` | --                  |             | `InstantAppsPopoverMessageOverrides`                                                                                                                                                                                                                                                                              | `undefined`        |
| `pagination`       | `pagination`        |             | `boolean`                                                                                                                                                                                                                                                                                                         | `false`            |
| `parent`           | --                  |             | `InstantAppsPopovers`                                                                                                                                                                                                                                                                                             | `undefined`        |
| `placement`        | `placement`         |             | `"auto" \| "top" \| "right" \| "bottom" \| "left" \| "top-start" \| "top-end" \| "right-start" \| "right-end" \| "bottom-start" \| "bottom-end" \| "left-start" \| "left-end" \| "auto-start" \| "auto-end" \| "leading-start" \| "leading" \| "leading-end" \| "trailing-end" \| "trailing" \| "trailing-start"` | `'trailing-start'` |
| `popoverAction`    | --                  |             | `(event: MouseEvent) => void`                                                                                                                                                                                                                                                                                     | `undefined`        |
| `popoverTitle`     | `popover-title`     |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `refId`            | `ref-id`            |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |
| `referenceElement` | `reference-element` |             | `HTMLElement \| string`                                                                                                                                                                                                                                                                                           | `undefined`        |
| `subtitle`         | `subtitle`          |             | `string`                                                                                                                                                                                                                                                                                                          | `undefined`        |


----------------------------------------------

## License
COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

