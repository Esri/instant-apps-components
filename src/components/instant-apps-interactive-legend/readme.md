# instant-apps-interactive-legend (Beta)

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                    | Type         | Default                     |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------- | ------------ | --------------------------- |
| `featureCount` | `feature-count` | Display individual counts and total counts for legend infos.                                   | `boolean`    | `false`                     |
| `filterMode`   | --              | Filter mode to use when filtering features.                                                    | `FilterMode` | `{     type: 'filter',   }` |
| `view`         | --              | Reference to Map View or Scene View                                                            | `MapView`    | `undefined`                 |
| `zoomTo`       | `zoom-to`       | Displays 'Zoom To' button - updates the extent of the view based on the selected legend infos. | `boolean`    | `false`                     |


## Dependencies

### Depends on

- [instant-apps-interactive-legend-classic](instant-apps-interactive-legend-classic)

### Graph
```mermaid
graph TD;
  instant-apps-interactive-legend --> instant-apps-interactive-legend-classic
  instant-apps-interactive-legend-classic --> instant-apps-interactive-legend-group-legend-element
  instant-apps-interactive-legend-classic --> instant-apps-interactive-legend-layer-element
  instant-apps-interactive-legend-classic --> instant-apps-interactive-legend-relationship
  instant-apps-interactive-legend-classic --> instant-apps-interactive-legend-legend-element
  instant-apps-interactive-legend-classic --> instant-apps-interactive-legend-count
  instant-apps-interactive-legend-group-legend-element --> instant-apps-interactive-legend-layer-element-caption
  instant-apps-interactive-legend-layer-element-caption --> instant-apps-interactive-legend-count
  instant-apps-interactive-legend-layer-element --> instant-apps-interactive-legend-layer-element-caption
  instant-apps-interactive-legend-legend-element --> instant-apps-interactive-legend-legend-element-caption
  style instant-apps-interactive-legend fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

