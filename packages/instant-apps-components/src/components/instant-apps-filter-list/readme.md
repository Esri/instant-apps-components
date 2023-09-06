# instant-apps-filter-list

## Description
The `instant-apps-filter-list` component is a tool that can be used in apps as a way for users to apply filters onto layers displaying in the map or scene view. 

The filters in the list can be determined based on data expressions set up on the layers in the map. The features in a layer that meet the criteria from a data expression will draw in the view. Layer expressions can be set up two ways:
-	Point to a field in a layer, this would allow users interacting with the filter to use a dropdown menu, date picker, or numeric slider to choose the attributes to filter on.
-	Set up a definition expression that is based on a where clause and could look something like this:
    - `(<Field> = ‘<Attribute>’)`
    - `(<Field> INCLUDES (<Attribute1, Attribute2, Attribute3, Attribute4>)) AND (<Field> = ‘<Attribute>’)`

Filters are listed in the component and users can interact with them using a check box or dropdown menu to enable a filter on a layer. Once a filter is enabled the layer will display in the map to honor the filter criteria.   



## Usage

### Basic

```
<instant-apps-filter-list layerExpressions={layerExpressions} view={view}>
  <div class="filter-header" slot="filter-header-content"><calcite-icon scale="s" icon="filter"></calcite-icon>Filter List</div>
</instant-apps-filter-list>
```

## LayerExpression

### Type

```
interface LayerExpression {
  id: string;
  title: string;
  expressions: Expression[];
  operator: string;
}

type ExpressionField = 'string' | 'number' | 'date' | 'coded-value' | 'range' | 'checkbox';

interface Expression {
  id: number;
  type?: ExpressionField;
  active?: boolean;
  definitionExpression?: string;
  name: string;
  field?: string;
  fields?: string[] | number[];
  selectedFields?: string[] | number[];
  codedValues?: { [key: string]: string };
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  range?: { min: string | number | undefined; max: string | number | undefined };
  step?: number;
  numDisplayOption?: "slider" | "drop-down";
}
```

### Example

```
const layerExpressions = [
  {
    id: '1774b178714-layer-8',
    title: 'California_Fire_Perimeters Geo',
    operator: ' AND ',
    expressions: [
      {
        id: 1654881156360,
        name: 'ALARM_DATE',
        type: 'date',
        field: 'ALARM_DATE'
      },
      {
        id: 1654881457794,
        name: 'AGENCY',
        type: 'string',
        field: 'AGENCY'
      },
      {
        id: 1654881364866,
        name: 'USF',
        definitionExpression: "AGENCY = 'USF'"
      },
      {
        id: 1654897065276,
        name: 'CDF',
        definitionExpression: "AGENCY = 'CDF'"
      },
      {
        id: 1654897087988,
        name: 'CCO',
        definitionExpression: "AGENCY = 'CCO'"
      },
      {
        id: 1679949600960,
        name: 'GIS_ACRES',
        type: 'number',
        field: 'GIS_ACRES',
        step: '10'
      },
    ],
  },
];
```

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute         | Description                                                            | Type                           | Default     |
| ---------------------- | ----------------- | ---------------------------------------------------------------------- | ------------------------------ | ----------- |
| `autoUpdateUrl`        | `auto-update-url` | Auto update URL with filter params.                                    | `boolean \| undefined`         | `false`     |
| `closeBtn`             | `close-btn`       | Display close button in footer.                                        | `boolean \| undefined`         | `false`     |
| `closeBtnOnClick`      | --                | Close button onClick function.                                         | `(() => void) \| undefined`    | `undefined` |
| `closeBtnText`         | `close-btn-text`  | Close button text.                                                     | `string \| undefined`          | `undefined` |
| `extentSelector`       | `extent-selector` | Turn on the ability to filter by extent.                               | `boolean \| undefined`         | `false`     |
| `extentSelectorConfig` | --                | Limits filtering options based on the view's extent geometry.          | `ExtentSelector \| undefined`  | `undefined` |
| `layerExpressions`     | --                | Use this to create filters that update a layer's definitionExpression. | `LayerExpression[]`            | `undefined` |
| `openFilters`          | `open-filters`    | When `true`, the layer filter block is expanded.                       | `boolean \| undefined`         | `false`     |
| `urlParams`            | --                | URL params set by using filters.                                       | `URLSearchParams \| undefined` | `undefined` |
| `view`                 | --                | A reference to the MapView or SceneView.                               | `MapView \| SceneView`         | `undefined` |


## Events

| Event             | Description                            | Type                |
| ----------------- | -------------------------------------- | ------------------- |
| `filterListReset` | Emits when the reset button is pushed. | `CustomEvent<void>` |
| `filterUpdate`    | Emits when the filter is updated.      | `CustomEvent<void>` |


## Slots

| Slot                          | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| `"filter-header-actions-end"` | A slot for adding actions or content to the end side of the header. |
| `"filter-header-content"`     | A slot for adding custom content to the header.                     |


----------------------------------------------

## License
COPYRIGHT © 2023 Esri

All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.

This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement. You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.

See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english

For additional information, contact: Environmental Systems Research Institute, Inc. Attn: Contracts and Legal Services Department 380 New York Street Redlands, California, USA 92373 USA

email: contracts@esri.com

