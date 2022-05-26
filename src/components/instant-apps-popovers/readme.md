# instant-apps-popovers



<!-- Auto Generated Below -->


## Properties

| Property              | Attribute | Description | Type                                         | Default                   |
| --------------------- | --------- | ----------- | -------------------------------------------- | ------------------------- |
| `beforeOpen`          | --        |             | `() => Promise<void>`                        | `() => Promise.resolve()` |
| `inTour`              | `in-tour` |             | `boolean`                                    | `undefined`               |
| `instantAppsPopovers` | --        |             | `Map<string, HTMLInstantAppsPopoverElement>` | `new Map()`               |


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

*Built with [StencilJS](https://stenciljs.com/)*
