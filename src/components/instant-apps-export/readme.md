# instant-apps-export



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                   | Description                                                                                                                                                                                                                                                                                                                                                                     | Type                                 | Default      |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------ |
| `headerTitle`            | `header-title`              | Export header name, updated in input.                                                                                                                                                                                                                                                                                                                                           | `string \| undefined`                | `''`         |
| `includeHeaderTheme`     | `include-header-theme`      | When `true`, include header theme in export.                                                                                                                                                                                                                                                                                                                                    | `boolean \| undefined`               | `false`      |
| `includeLegend`          | `include-legend`            | When `true`, include legend in export.                                                                                                                                                                                                                                                                                                                                          | `boolean \| undefined`               | `true`       |
| `includeMap`             | `include-map`               | When `true`, include map in export.                                                                                                                                                                                                                                                                                                                                             | `boolean \| undefined`               | `true`       |
| `mode`                   | `mode`                      | Renders tool as a popover with a trigger button, or inline to place in a custom container.                                                                                                                                                                                                                                                                                      | `"inline" \| "popover"`              | `'popover'`  |
| `output`                 | --                          | Output to use to set up export.                                                                                                                                                                                                                                                                                                                                                 | `ExportOutput \| undefined`          | `undefined`  |
| `popoverPlacement`       | `popover-placement`         | Determines where the component will be positioned relative to the `referenceElement`.                                                                                                                                                                                                                                                                                           | `PopoverPlacement \| undefined`      | `'auto'`     |
| `popoverPositioning`     | `popover-positioning`       | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's position CSS property is `"fixed"`. | `"absolute" \| "fixed" \| undefined` | `'absolute'` |
| `scale`                  | `scale`                     | Adjusts the scale of the action button.                                                                                                                                                                                                                                                                                                                                         | `"l" \| "m" \| "s" \| undefined`     | `'m'`        |
| `showHeaderTitle`        | `show-header-title`         | Show header title input.                                                                                                                                                                                                                                                                                                                                                        | `boolean \| undefined`               | `true`       |
| `showIncludeHeaderTheme` | `show-include-header-theme` | Show header theme checkbox.                                                                                                                                                                                                                                                                                                                                                     | `boolean \| undefined`               | `true`       |
| `showIncludeLegend`      | `show-include-legend`       | Show include legend checkbox.                                                                                                                                                                                                                                                                                                                                                   | `boolean \| undefined`               | `true`       |
| `showIncludeMap`         | `show-include-map`          | Show include map checkbox.                                                                                                                                                                                                                                                                                                                                                      | `boolean \| undefined`               | `false`      |


## Events

| Event            | Description                              | Type                |
| ---------------- | ---------------------------------------- | ------------------- |
| `exportBtnClick` | Emits when the export button is clicked. | `CustomEvent<void>` |


## CSS Custom Properties

| Name                               | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `--export-action-icon-color`       | Popup's trigger button's icon color.                   |
| `--export-action-icon-hover-color` | Popup's trigger button's icon color when hovered over. |
| `--export-action-width`            | Popup's trigger button's width.                        |
| `--export-background`              | Export's container background color.                   |
| `--export-text-color`              | Export's container text color.                         |
| `--export-width`                   | Export's container width.                              |


----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

