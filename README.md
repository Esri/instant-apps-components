[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com/)

# Instant Apps Components

Instant Apps Components, is a library of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) (Custom Elements) built with [StencilJS](https://stenciljs.com/), with the purpose of being utilized by [ArcGIS Instant Apps](https://www.esri.com/en-us/arcgis/products/arcgis-instant-apps/overview). Web Components are browser-compatible elements, use native browser APIs, resuable, and contain encapsulated functionality. Instant Apps Components use [Calcite Components](https://github.com/Esri/calcite-components), the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/latest/), and additional functionality that can be easily implemented into your web map applications. While this library of web components are intended for being used in ArcGIS Instant Apps, these components can be used in any web map application, without being tied to a particular library or framework.

## To set up locally, in terminal:

1. `git clone https://github.com/ArcGIS/instant-apps-components.git`

2. `cd instant-apps-components`

3. `npm install`

4. `npm start` (Wait until build is finished.)

5. Open another terminal and run `npm run storybook`

## Stencil CLI

You can use the stencil CLI to generate the necessary files for your web component.

1. In terminal, run `stencil generate`.

2. Enter the name of your web component with the following naming convention: `instant-apps-[YOUR_COMPONENT_NAME]`.

3. Press `Enter`/`Return`.

4. Since this web component library uses sass, you'll need to update your component's stylesheet file extension. i.e. `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].css` to `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].scss`

5. In `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].tsx`, update the following:

```
@Component({
  tag: 'instant-apps-[YOUR_COMPONENT_NAME]',
  styleUrl: 'instant-apps-[YOUR_COMPONENT_NAME].css', <-- Update to .scss
  shadow: true,
})
```

More info on Stencil's CLI can be found [here](https://stenciljs.com/docs/cli).

## Writing Storybook stories

To include your web component in the storybook UI, create a `.stories.ts` file within your web component's directory i.e. `src/components/instant-apps-[YOUR_COMPONENT_NAME]/instant-apps-[YOUR_COMPONENT_NAME].stories.ts`.

Below is a code snippet example:

```
import { html } from 'lit-html';

export default {
  title: 'Component',
  argTypes: {
    exampleProp: { control: 'text' }
  },
};

const Template = ({ exampleProp }) =>
  html`<instant-apps-[YOUR_COMPONENT_NAME]
    example-prop="${exampleProp}"
  ></instant-apps-[YOUR_COMPONENT_NAME]>`;

export const Example = Template.bind({});

Example.args = { exampleProp: 'Example text.' };
```

More info on how to write stories can be found [here](https://storybook.js.org/docs/web-components/writing-stories/introduction).

Additionally, documenentation on how to provide controls to interact with the arguments of your web component dynamically can be found [here](https://storybook.js.org/docs/web-components/essentials/controls).

## Contributing

We welcome contributions to this project. See [CONTRIBUTING.md](./CONTRIBUTING.md) for an overview of contribution guidelines.

## License

COPYRIGHT © 2022 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com
