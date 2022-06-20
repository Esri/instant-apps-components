# instant-apps-social-share

<!-- Auto Generated Below -->

## Properties

| Property                 | Attribute                   | Description                                                                                                          | Type                                                                                                                                                                                      | Default                |
| ------------------------ | --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `defaultUrlParams`       | --                          | Configure the default URL parameters that are appended to the generated share URL.                                   | `null \| { center?: boolean \| undefined; level?: boolean \| undefined; viewpoint?: boolean \| undefined; selectedFeature?: boolean \| undefined; hiddenLayers?: boolean \| undefined; }` | `null`                 |
| `displayTipText`         | `display-tip-text`          | Show/hide the tip text.                                                                                              | `boolean`                                                                                                                                                                                 | `true`                 |
| `embed`                  | `embed`                     | Show/hide the embed UI.                                                                                              | `boolean`                                                                                                                                                                                 | `false`                |
| `iframeInnerText`        | `iframe-inner-text`         | Text to nest in embed iframe code.                                                                                   | `string`                                                                                                                                                                                  | `''`                   |
| `mode`                   | `mode`                      | Renders tool as a popover with a trigger button, or inline to place in a custom container.                           | `"inline" \| "popover"`                                                                                                                                                                   | `'popover'`            |
| `popoverButtonIconScale` | `popover-button-icon-scale` | Adjusts the scale of the popover button icon.                                                                        | `"l" \| "m" \| "s"`                                                                                                                                                                       | `'m'`                  |
| `scale`                  | `scale`                     | Adjusts the scale of the component.                                                                                  | `"l" \| "m" \| "s"`                                                                                                                                                                       | `'m'`                  |
| `shareButtonColor`       | `share-button-color`        |                                                                                                                      | `"inverse" \| "neutral"`                                                                                                                                                                  | `'neutral'`            |
| `shareIconsLayout`       | `share-icons-layout`        | Display the share icons in a vertical or horizontal layout.                                                          | `"vertical" \| "horizontal"`                                                                                                                                                              | `'vertical'`           |
| `shareText`              | `share-text`                |                                                                                                                      | `string`                                                                                                                                                                                  | `''`                   |
| `shareUrl`               | `share-url`                 | Generated share URL. Use this property to append custom URL parameters if needed.                                    | `string`                                                                                                                                                                                  | `window.location.href` |
| `socialMedia`            | `social-media`              | Show/hide social media icons.                                                                                        | `boolean`                                                                                                                                                                                 | `true`                 |
| `view`                   | --                          | MapView or SceneView to reference when URL parameter values are generated, i.e. `center`, `level`, `viewpoint`, etc. | `MapView \| SceneView`                                                                                                                                                                    | `undefined`            |

---

## CSS Variables:

```
  --instant-apps-social-share-popover-button-background-color;
  --instant-apps-social-share-popover-button-icon-color;
```

---

_Built with [StencilJS](https://stenciljs.com/)_


## License

COPYRIGHT © 2022 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com