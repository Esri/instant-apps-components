# instant-apps-interactive-legend-layer-caption

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute       | Description | Type              | Default     |
| ----------------- | --------------- | ----------- | ----------------- | ----------- |
| `activeLayerInfo` | --              |             | `ActiveLayerInfo` | `undefined` |
| `expanded`        | `expanded`      |             | `boolean`         | `true`      |
| `featureCount`    | `feature-count` |             | `boolean`         | `undefined` |
| `isChild`         | `is-child`      |             | `boolean`         | `false`     |
| `legendvm`        | --              |             | `LegendViewModel` | `undefined` |
| `messages`        | `messages`      |             | `any`             | `undefined` |


## Events

| Event                              | Description | Type                   |
| ---------------------------------- | ----------- | ---------------------- |
| `layerCaptionElementExpandUpdated` |             | `CustomEvent<boolean>` |


## Dependencies

### Used by

 - [instant-apps-interactive-legend-group-legend-element](../instant-apps-interactive-legend-group-legend-element)
 - [instant-apps-interactive-legend-layer-element](../instant-apps-interactive-legend-layer-element)

### Depends on

- [instant-apps-interactive-legend-count](../instant-apps-interactive-legend-count)

### Graph
```mermaid
graph TD;
  instant-apps-interactive-legend-layer-element-caption --> instant-apps-interactive-legend-count
  instant-apps-interactive-legend-group-legend-element --> instant-apps-interactive-legend-layer-element-caption
  instant-apps-interactive-legend-layer-element --> instant-apps-interactive-legend-layer-element-caption
  style instant-apps-interactive-legend-layer-element-caption fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

