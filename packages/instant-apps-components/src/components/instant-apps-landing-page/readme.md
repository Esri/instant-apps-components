# instant-apps-landing-page

## Description
The i`nstant-apps-landing-page` component that can be used as the opening or lead-in page for an app. This component can be helpful as a starting point for apps to establish its purpose and provide information on the brand or owner of the app. 

The landing page can be set up to include a title, subtitle, description, icon or graphic, or a background image. The `alignment` property to control the positioning of the elements in the landing page. Use CSS custom properties to adjust the color, size, and scale elements set up in the landing page. 

<p align="center">
<img alt= "Example of a landing page" img src="https://i.imgur.com/vmhnsEy.jpg"/>
</p>


<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute              | Description                                                                                                                                                                                                                                | Type                                       | Default                |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ | ---------------------- |
| `alignment`              | --                     | Controls the positioning of the text and image content. This accepts an array containing two values. Possible values for HorizontalAlignment: 'left', 'right', 'center'. Possible values for VeritcalAlignment: 'top', 'middle', 'bottom'. | `[HorizontalAlignment, VerticalAlignment]` | `['center', 'middle']` |
| `backgroundImageSrc`     | `background-image-src` | Displays a background image via URL                                                                                                                                                                                                        | `string`                                   | `undefined`            |
| `descriptionText`        | `description-text`     | Description text.                                                                                                                                                                                                                          | `string`                                   | `undefined`            |
| `disableTransition`      | `disable-transition`   | Controls whether to enable/disable the transition animation the occurs when dismissing the landing page.                                                                                                                                   | `boolean`                                  | `false`                |
| `entryButtonScale`       | `entry-button-scale`   | Scale of the entry button.                                                                                                                                                                                                                 | `"l" \| "m" \| "s"`                        | `'l'`                  |
| `entryButtonText`        | `entry-button-text`    | Button text which closes/dismisses the landing page.                                                                                                                                                                                       | `string`                                   | `undefined`            |
| `iconImage`              | `icon-image`           | Image/graphic that is positioned near the text content.                                                                                                                                                                                    | `string`                                   | `undefined`            |
| `iconImageAltText`       | `icon-image-alt-text`  | Alternate text for `iconImage`.                                                                                                                                                                                                            | `string`                                   | `undefined`            |
| `iconImageScale`         | `icon-image-scale`     | Scale of icon image/graphic.                                                                                                                                                                                                               | `"l" \| "m" \| "s"`                        | `'m'`                  |
| `open`                   | `open`                 | Controls the open/close state of the landing page.                                                                                                                                                                                         | `boolean`                                  | `true`                 |
| `subtitleText`           | `subtitle-text`        | Subtitle text.                                                                                                                                                                                                                             | `string`                                   | `undefined`            |
| `titleText` _(required)_ | `title-text`           | Title text.                                                                                                                                                                                                                                | `string`                                   | `undefined`            |


## CSS Custom Properties

| Name                                                     | Description                                                                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--instant-apps-landing-page-background-color`           | Brand color of landing page that affects the background (if a backgound image is not set) and entry button colors |
| `--instant-apps-landing-page-description-text-font-size` | Font size of description text.                                                                                    |
| `--instant-apps-landing-page-entry-button-color`         | Brand color of the entry button.                                                                                  |
| `--instant-apps-landing-page-icon-image-scale--l`        | Icon image width when scale is set to 'l'. Default value is 500px.                                                |
| `--instant-apps-landing-page-icon-image-scale--m`        | Icon image width when scale is set to 'm'. Default value is 250px.                                                |
| `--instant-apps-landing-page-icon-image-scale--s`        | Icon image width when scale is set to 's'. Default value is 100px.                                                |
| `--instant-apps-landing-page-subtitle-text-font-size`    | Font size of subtitle text.                                                                                       |
| `--instant-apps-landing-page-text-color`                 | Text color of landing page.                                                                                       |
| `--instant-apps-landing-page-title-text-font-size`       | Font size of title text.                                                                                          |


----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

