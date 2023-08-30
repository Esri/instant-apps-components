# instant-apps-control-panel

## Description
The `instant-apps-control-panel` component is a configurable toolbar that contains components or widgets that can be used in a map or scene view. 

The component’s purpose is to store widgets used for exploring or modifying the map in a central location. Storing widgets in the control-panel makes it easy to find tools to use with the map or scene like a legend or zoom tools. 

Widgets or components that can be added in the control panel:
- Any of the [JSAPI 4.x widgets](https://developers.arcgis.com/javascript/latest/api-reference/#:~:text=WMTSLayer-,Widgets,-AreaMeasurement2D) 
- Other instant apps components like `instant-apps-measure`, `instant-apps-social-share`, `instant-apps-keyboard-shortcuts`, etc.

![GIF of opening the legend in the control panel component in a sample app](https://i.imgur.com/atWmzgs.gif)

## Usage

#### Type

```
interface ControlPanelComponent {
    content: any;
    isExpand?: boolean;
    expandIconClass?: string;
}
```

#### Example

```
const controlPanel = document.createElement('instant-apps-control-panel');
controlPanel.view = view;

const home = new Home({ view });
const zoom = new Zoom({ view });

const socialShare = document.createElement('instant-apps-social-share');
socialShare.mode = 'inline';

controlPanel.components = [
    {
        content: home,
    },
    {
        content: zoom,
    },
    {
        content: legend,
        isExpand: true
    },
    {
        content: socialShare,
        isExpand: true,
        expandIconClass: 'esri-icon-share2'
    },
];

view.ui.add(controlPanel, 'top-left');
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type                      | Default     |
| ------------ | --------- | ----------- | ------------------------- | ----------- |
| `components` | --        |             | `ControlPanelComponent[]` | `[]`        |
| `view`       | --        |             | `MapView \| SceneView`    | `undefined` |


----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

