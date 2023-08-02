# instant-apps-interactive-legend (Beta)

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description          | Type                                                                                                                                                                                                                                                        | Default     |
| ------------------ | ------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `activeToolType`   | `active-tool-type`  |                      | `"area" \| "clear" \| "distance" \| "point"`                                                                                                                                                                                                                | `undefined` |
| `areaUnit`         | `area-unit`         |                      | `"acres" \| "ares" \| "hectares" \| "square-centimeters" \| "square-decimeters" \| "square-feet" \| "square-inches" \| "square-kilometers" \| "square-meters" \| "square-miles" \| "square-millimeters" \| "square-us-feet" \| "square-yards" \| undefined` | `undefined` |
| `coordinateFormat` | `coordinate-format` |                      | `string \| undefined`                                                                                                                                                                                                                                       | `undefined` |
| `linearUnit`       | `linear-unit`       |                      | `"centimeters" \| "decimeters" \| "feet" \| "inches" \| "kilometers" \| "meters" \| "miles" \| "millimeters" \| "nautical-miles" \| "us-feet" \| "yards" \| undefined`                                                                                      | `undefined` |
| `view`             | --                  | MapView or SceneView | `MapView \| SceneView`                                                                                                                                                                                                                                      | `undefined` |


## Events

| Event           | Description                                                                                                        | Type                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `measureActive` | Emits when there is an active measure tool to allow app devs to disable other tools/popups when tools are active . | `CustomEvent<boolean>` |


## Dependencies

### Depends on

- [instant-apps-measurement-tool](instant-apps-measurement-tool)

### Graph
```mermaid
graph TD;
  instant-apps-measurement --> instant-apps-measurement-tool
  style instant-apps-measurement fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

