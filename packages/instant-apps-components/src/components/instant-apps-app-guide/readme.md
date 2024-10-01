# instant-apps-help-panel



<!-- Auto Generated Below -->


## Overview

The `instant-apps-app-guide` is a component containing a page(s) that describes features of a tool or Instant App.

Data for the pages is passed as an array of `AppGuidePage` objects that each have the following properties:
- `title`: The title of the page; this will be displayed in the header if the `header` prop is set to true or the `header` attribute is present
- `content`: An array of strings that represent the content items on the page
- `type`: How the content items should be rendered. The default is 'paragraphs', but 'list' is also available for rendering as a numbered list.

## Properties

| Property | Attribute | Description                                                                      | Type             | Default     |
| -------- | --------- | -------------------------------------------------------------------------------- | ---------------- | ----------- |
| `data`   | --        | A collection of AppGuidePage objects that represent the content of the component | `AppGuidePage[]` | `undefined` |
| `header` | `header`  | Show a header with the title of the current page                                 | `boolean`        | `undefined` |


----------------------------------------------

## License
COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

