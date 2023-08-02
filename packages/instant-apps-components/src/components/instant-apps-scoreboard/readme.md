# instant-apps-scoreboard

Calculates and displays a series of statistics based on a layer(s) and field attributes.

## Interfaces and Enums

```
    interface ScoreboardItem {
        layer: {
            url: string;
            id: string;
        };
        field: string;
        label: string;
        displayValue?: string; // Calculated internally
        value?: number; // Calculated internally
        operation: string;
        visible?: boolean;
    }
```

```
    enum Scoreboard {
        Bottom = 'bottom',
        Left = 'left',
        Right = 'right',
        Floating = 'floating',
        Pinned = 'pinned',
    }
```

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                                                                                  | Type                                                       | Default               |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | --------------------- |
| `autoDockEnabled` | `auto-dock-enabled` | Controls the behavior to auto dock the scoreboard to the bottom in smaller parent containers/mobile devices. | `boolean`                                                  | `true`                |
| `itemLimit`       | `item-limit`        | Number of scoreboard items that can be viewed at a time. Minimum: 2, Maximum : 6.                            | `number`                                                   | `6`                   |
| `items`           | --                  | Data on layers, field attribute info, operations, for each scoreboard item                                   | `ScoreboardItem[]`                                         | `undefined`           |
| `mode`            | `mode`              | Mode of scoreboard i.e. 'floating' or 'pinned'.                                                              | `Scoreboard.Floating \| Scoreboard.Pinned`                 | `Scoreboard.Floating` |
| `position`        | `position`          | Position of scoreboard i.e. 'bottom', 'left', or 'right'.                                                    | `Scoreboard.Bottom \| Scoreboard.Left \| Scoreboard.Right` | `Scoreboard.Bottom`   |
| `view`            | --                  | MapView or SceneView to reference extent, viewpoint, and layers in map to perform calculations.              | `MapView \| SceneView`                                     | `undefined`           |


## Events

| Event                    | Description                                                         | Type                            |
| ------------------------ | ------------------------------------------------------------------- | ------------------------------- |
| `scoreboardItemsUpdated` | Emits when scoreboard item values have been calculated and updated. | `CustomEvent<ScoreboardItem[]>` |


## CSS Custom Properties

| Name                                               | Description                                                                   |
| -------------------------------------------------- | ----------------------------------------------------------------------------- |
| `--instant-apps-scoreboard-background-color`       | Background color of scoreboard.                                               |
| `--instant-apps-scoreboard-mobile-position-bottom` | Scoreboard's bottom position (px) of absolutely positioned element on mobile. |
| `--instant-apps-scoreboard-text-color`             | Text color of scoreboard.                                                     |


----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

