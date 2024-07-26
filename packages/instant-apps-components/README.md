[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com/)
[![npm version][npm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/@esri/instant-apps-components.svg?color=%23007ac2&style=flat-square
[npm-url]: https://www.npmjs.com/package/@esri/instant-apps-components

# Instant Apps Components

Instant Apps Components, is a library of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) (Custom Elements) built with [StencilJS](https://stenciljs.com/), with the purpose of being utilized by [ArcGIS Instant Apps](https://www.esri.com/en-us/arcgis/products/arcgis-instant-apps/overview). Web Components are browser-compatible elements, use native browser APIs, resuable, and contain encapsulated functionality. Instant Apps Components use [Calcite Components](https://github.com/Esri/calcite-components), the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/), and additional functionality that can be easily implemented into your web map applications. While this library of web components are intended for being used in ArcGIS Instant Apps, these components can be used in any web map application, without being tied to a particular library or framework.

## Setting up the components in your project:

### Managing assets:

In order for the library to work properly, you'll need to copy the assets to the root of your project.

For example:

`ncp node_modules/@esri/instant-apps-components/dist/assets public/assets`

### Importing the components:

In your entry file (index.ts), simply import the component(s) into your project.

For example:

```
import "@esri/instant-apps-components/dist/components/instant-apps-header";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";
```

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2024 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
