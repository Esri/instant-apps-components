# instant-apps-create

## Description

The `instant-apps-create` component is a tool that can be used in apps to create an output file that includes an image or information from the map or scene view.

Use the create tool to capture the view as an image and create the output as a PDF file or print it from the browser. If the map is included in the output, the current extent and scale of the view will be captured. This component can be useful in apps where users are looking to create custom images from the app for record keeping or to share results with others.

The create tool is configurable and can include additional elements in the output, these include:

- `Legend`: The legend describes the symbols and styles that are used to represent the layers and features in the map, include the legend in the output to provide context about the layers displaying in the map
- `Popup`: The popup displays content from feature attributes, include popup information from the selected feature in the map in the output
- `ExtraContent`: Choose additional elements to include in the output, like results or additional text description from an app

<p align="center">
<img alt="GIF of create tool bring used in sample app" img src="https://i.imgur.com/9D18PMI.gif"/>
</p>

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute               | Description                                                                                                                                                                                                                                                                                                                                                                     | Type                                 | Default                        |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------ |
| `beforecreate`        | --                      | Passes the initial function to run when the create button is clicked.                                                                                                                                                                                                                                                                                                           | `() => Promise<void>`                | `() => Promise.resolve()`      |
| `extraContent`        | --                      | Extra content that will be added below the view.                                                                                                                                                                                                                                                                                                                                | `HTMLElement \| undefined`           | `undefined`                    |
| `extraContentLabel`   | `extra-content-label`   | Custom label for `extraContent` checkbox.                                                                                                                                                                                                                                                                                                                                       | `string \| undefined`                | `undefined`                    |
| `headerTitle`         | `header-title`          | create header name, updated in input.                                                                                                                                                                                                                                                                                                                                           | `string \| undefined`                | `''`                           |
| `includeExtraContent` | `include-extra-content` | When `true`, `extraContent` HTML element is included in the PDF.                                                                                                                                                                                                                                                                                                                | `boolean \| undefined`               | `true`                         |
| `includeLegend`       | `include-legend`        | When `true`, legend is included in the create.                                                                                                                                                                                                                                                                                                                                  | `boolean \| undefined`               | `true`                         |
| `includeMap`          | `include-map`           | When `true`, map is included in the create.                                                                                                                                                                                                                                                                                                                                     | `boolean \| undefined`               | `true`                         |
| `includePopup`        | `include-popup`         | When `true`, popup is included in the create.                                                                                                                                                                                                                                                                                                                                   | `boolean \| undefined`               | `false`                        |
| `maskBackground`      | `mask-background`       | Adjust the mask background color for when users are setting the map area                                                                                                                                                                                                                                                                                                        | `string`                             | `'rgba(255, 51, 0, 0.1)'`      |
| `maskBorder`          | `mask-border`           | Adjust the mask border for when users are setting the map area                                                                                                                                                                                                                                                                                                                  | `string`                             | `'2px dashed rgb(255, 51, 0)'` |
| `mode`                | `mode`                  | Renders tool as a popover with a trigger button, or inline to place in a custom container.                                                                                                                                                                                                                                                                                      | `"inline" \| "popover"`              | `'popover'`                    |
| `output`              | --                      | Output to use to set up create.                                                                                                                                                                                                                                                                                                                                                 | `createOutput \| undefined`          | `undefined`                    |
| `popoverIcon`         | `popover-icon`          | Update popover button icon.                                                                                                                                                                                                                                                                                                                                                     | `string \| undefined`                | `'create'`                     |
| `popoverPlacement`    | `popover-placement`     | Determines where the component will be positioned relative to the `referenceElement`.                                                                                                                                                                                                                                                                                           | `PopoverPlacement \| undefined`      | `'auto'`                       |
| `popoverPositioning`  | `popover-positioning`   | Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's position CSS property is `"fixed"`. | `"absolute" \| "fixed" \| undefined` | `'absolute'`                   |
| `scale`               | `scale`                 | Adjusts the scale of the action button.                                                                                                                                                                                                                                                                                                                                         | `"l" \| "m" \| "s" \| undefined`     | `'m'`                          |
| `showHeaderTitle`     | `show-header-title`     | Show header title input in create tool.                                                                                                                                                                                                                                                                                                                                         | `boolean \| undefined`               | `true`                         |
| `showIncludeLegend`   | `show-include-legend`   | Show include legend checkbox in create tool.                                                                                                                                                                                                                                                                                                                                    | `boolean \| undefined`               | `true`                         |
| `showIncludeMap`      | `show-include-map`      | Show include map checkbox in create tool.                                                                                                                                                                                                                                                                                                                                       | `boolean \| undefined`               | `false`                        |
| `showIncludePopup`    | `show-include-popup`    | Show popup checkbox in create tool.                                                                                                                                                                                                                                                                                                                                             | `boolean \| undefined`               | `true`                         |
| `showScaleBar`        | `show-scale-bar`        | Show scale bar widget in map if view has it.                                                                                                                                                                                                                                                                                                                                    | `boolean \| undefined`               | `false`                        |
| `view`                | --                      | A reference to the MapView or SceneView.                                                                                                                                                                                                                                                                                                                                        | `MapView \| SceneView \| undefined`  | `undefined`                    |

## Events

| Event                 | Description                                                                                       | Type                |
| --------------------- | ------------------------------------------------------------------------------------------------- | ------------------- |
| `createOutputUpdated` | Emits when the instant-apps-create's output prop is updated after the "create" button is clicked. | `CustomEvent<void>` |

## CSS Custom Properties

| Name                                            | Description                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| `--instant-apps-create-action-background`       | Popup's trigger button's background color.             |
| `--instant-apps-create-action-background-hover` | Popup's trigger button's background color on hover.    |
| `--instant-apps-create-action-background-press` | Popup's trigger button's background color on press.    |
| `--instant-apps-create-action-height`           | Popup's trigger button's height.                       |
| `--instant-apps-create-action-icon-color`       | Popup's trigger button's icon color.                   |
| `--instant-apps-create-action-icon-hover-color` | Popup's trigger button's icon color when hovered over. |
| `--instant-apps-create-action-width`            | Popup's trigger button's width.                        |
| `--instant-apps-create-background`              | create's container background color.                   |
| `--instant-apps-create-popover-width`           | create's popover container width.                      |
| `--instant-apps-create-text-color`              | create's container text color.                         |

## Dependencies

### Depends on

- [instant-apps-header](../instant-apps-header)

### Graph

```mermaid
graph TD;
  instant-apps-create --> instant-apps-header
  style instant-apps-create fill:#f9f,stroke:#333,stroke-width:4px
```

---

## License

COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
