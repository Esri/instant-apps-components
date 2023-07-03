# Instant Apps Components React

A set of React components that wrap [Instant Apps Components](https://github.com/Esri/instant-apps-components).

## Installation

```sh
npm install --save @esri/instant-apps-components-react
```

This package includes the compatible version of the main component library as a dependency, so no need to install `@esri/instant-apps-components` separately.

Once installed, you need to import each component you use from the standard `instant-apps-component` package's custom elements build. This will automatically define the custom elements on the window. Then import the same components from `instant-apps-components-react`.

```jsx
import "@esri/instant-apps-components/dist/components/instant-apps-header";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";
import { InstantAppsHeader, InstantAppsSocialShare } from "@esri/instant-apps-components-react";
```

## Why not just use the web components directly?

Because React uses a synthetic event system, the custom events emitted from instant apps components won't work with JSX in React.

If you're using TypeScript, you'll also get increased type safety for your event listeners, props, etc.

## Contributing

We welcome contributions to this project. See the main [instant-apps-components CONTRIBUTING.md](https://github.com/Esri/instant-apps-components/blob/master/CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
