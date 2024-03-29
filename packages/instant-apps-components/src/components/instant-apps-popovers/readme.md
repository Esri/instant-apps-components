# instant-apps-popovers

## Description

The `instant-apps-popovers` component is a tool that is used to paginate through multiple instant-apps-popover messages in an app when it first opens.

Use popovers to set up a multi-step walk through to provide important information about tools in an app or to introduce a new user to the app. Popovers consist over [instant-apps-popover](https://github.com/Esri/instant-apps-components/tree/master/packages/instant-apps-components/src/components/instant-apps-popover) messages.

<p align="center">
<img alt="GIF of popovers in sample app" img src=" https://i.imgur.com/V4JPZYO.gif"/>
</p>

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute    | Description | Type                                         | Default                   |
| --------------------- | ------------ | ----------- | -------------------------------------------- | ------------------------- |
| `beforeOpen`          | --           |             | `() => Promise<void>`                        | `() => Promise.resolve()` |
| `currentId`           | `current-id` |             | `string`                                     | `undefined`               |
| `inTour`              | `in-tour`    |             | `boolean`                                    | `undefined`               |
| `instantAppsPopovers` | --           |             | `Map<string, HTMLInstantAppsPopoverElement>` | `new Map()`               |


## Methods

### `beginTour() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `close(key: string) => Promise<void>`



#### Returns

Type: `Promise<void>`



### `endTour() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `open(key: string) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

## License
COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

