import { CalciteCheckboxCustomEvent, CalciteInputDatePickerCustomEvent } from '@esri/calcite-components';
import { Component, Element, Event, EventEmitter, Host, h, State, Prop, VNode, Watch } from '@stencil/core';

import FilterList_T9n from '../../assets/t9n/instant-apps-filter-list/resources.json';

import {
  Expression,
  ExtentSelector,
  FilterLayer,
  FilterParam,
  FilterQueryLayer,
  FilterQueryLayerView,
  GenericObject,
  GenericStringObject,
  LayerExpression,
  PointCloudFilters,
} from '../../interfaces/interfaces';
import { loadModules } from '../../utils/loadModules';
import { getMessages } from '../../utils/locale';
import { getMode } from '../../utils/mode';
import { baseClassDark, baseClassLight, supportedTypes } from './resources';
import { convertToDate, handleSingleQuote, resetDatePicker } from './utils';

const CSS = {
  base: 'instant-apps-filter-list',
  filterContainer: 'instant-apps-filter-list__container',
  footer: 'instant-apps-filter-list__footer',
  filterItemTitle: 'instant-apps-filter-list__title',
  filterItemContainer: 'instant-apps-filter-list__item-container',
  filterUIItemContainer: 'instant-apps-filter-list__item-container--user-input',
  checkboxContainer: 'instant-apps-filter-list__checkbox-container',
  numberInputContainer: 'instant-apps-filter-list__number-input-container',
  dateInputContainer: 'instant-apps-filter-list__date-picker-input-container',
  operatorDesc: 'instant-apps-filter-list__operator-description',
  zoomTo: 'instant-apps-filter-list__zoom-to',
};

/**
 * @slot filter-header-content - A slot for adding custom content to the header.
 * @slot filter-header-actions-end - A slot for adding actions or content to the end side of the header.
 */

@Component({
  tag: 'instant-apps-filter-list',
  styleUrl: 'instant-apps-filter-list.scss',
  shadow: true,
})
export class InstantAppsFilterList {
  @Element() el: HTMLElement;

  /**
   * Use this to create filters that update a layer's definitionExpression.
   */
  @Prop({ mutable: true }) layerExpressions: LayerExpression[];

  /**
   * Auto update URL with filter params.
   */
  @Prop() autoUpdateUrl?: boolean = false;

  /**
   * Display close button in footer.
   */
  @Prop() closeBtn?: boolean = false;

  /**
   * Close button onClick function.
   */
  @Prop() closeBtnOnClick?: () => void;

  /**
   * Close button text.
   */
  @Prop() closeBtnText?: string;

  /**
   * When `true`, the layer filter block is expanded.
   */
  @Prop() openFilters?: boolean = false;

  /**
   * Turn on the ability to filter by extent.
   */
  @Prop() extentSelector?: boolean = false;

  /**
   * Limits filtering options based on the view's extent geometry.
   */
  @Prop() extentSelectorConfig?: ExtentSelector;

  /**
   * URL params set by using filters.
   */
  @Prop({ mutable: true }) urlParams?: URLSearchParams;

  /**
   * A reference to the MapView or SceneView.
   */
  @Prop() view: __esri.MapView | __esri.SceneView;

  @State() filterLayerExpressions: LayerExpression[];
  @State() messages: typeof FilterList_T9n;
  @State() baseClass = baseClassLight;
  @State() disabled: boolean | undefined = true;
  @State() initDefExpressions: GenericStringObject;
  @State() initPointCloudFilters: { [key: string]: PointCloudFilters };

  /**
   * Emits when the reset button is pushed.
   */
  @Event() filterListReset: EventEmitter<void>;

  /**
   * Emits when the filter is updated.
   */
  @Event() filterUpdate: EventEmitter<void>;

  @Watch('view')
  watchViewHandler() {
    this.handleWhenView();
  }

  geometryJsonUtils: typeof __esri.JSONSupport;
  locale: string;
  panelEl: HTMLCalcitePanelElement;
  reactiveUtils: __esri.reactiveUtils;
  zoomToGraphics: __esri.Graphic[];

  async componentWillLoad(): Promise<void> {
    this.baseClass = getMode(this.el) === 'dark' ? baseClassDark : baseClassLight;
    await this.initializeModules();
    getMessages(this);
    this.filterLayerExpressions = this.layerExpressions != null ? JSON.parse(JSON.stringify(this.layerExpressions)) : undefined;
    this.disabled = this.filterLayerExpressions?.length ? undefined : true;
    this.reactiveUtils.whenOnce(() => this.view).then(() => this.handleLayerExpressionsUpdate());
  }

  componentShouldUpdate(newValue: unknown, _oldValue: unknown, name: string) {
    if (name === 'view' && newValue != null) {
      this.handleWhenView();
    } else if (name === 'layerExpressions') {
      this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
      this.handleLayerExpressionsUpdate();
    }
  }

  componentWillRender(): void {
    this.disabled = this.filterLayerExpressions?.length > 0 ? undefined : true;
  }

  disconnectedCallback(): void {
    this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
    this.resetAllFilters();
  }

  async initializeModules(): Promise<void> {
    const [intl, geometryJsonUtils, reactiveUtils] = await loadModules(['esri/intl', 'esri/geometry/support/jsonUtils', 'esri/core/reactiveUtils']);
    this.geometryJsonUtils = geometryJsonUtils;
    this.reactiveUtils = reactiveUtils;
    this.locale = intl.getLocale();

    return Promise.resolve();
  }

  render(): VNode {
    const filterConfig = this.initFilterConfig();
    const footer = this.closeBtn ? this.renderFullFooter() : this.renderFooter();
    return (
      <Host>
        <calcite-panel class={this.baseClass} ref={el => (this.panelEl = el as HTMLCalcitePanelElement)}>
          <slot slot="header-content" name="filter-header-content"></slot>
          <slot slot="header-actions-end" name="filter-header-actions-end"></slot>
          <div key="filter-container" class={CSS.filterContainer}>
            {filterConfig}
            {footer}
          </div>
        </calcite-panel>
      </Host>
    );
  }

  renderFilter(layerExpression: LayerExpression): VNode[] {
    const { id } = layerExpression;
    return layerExpression.expressions.map((expression, index) => {
      return expression.type == 'checkbox' || expression.type == null ? (
        <div key={`${id}-${index}`} class={CSS.filterItemContainer}>
          <div class={CSS.filterItemTitle}>
            <p>{expression.name}</p>
          </div>
          <div class={CSS.checkboxContainer}>
            <calcite-checkbox
              id={expression.id.toString()}
              scale="l"
              checked={expression?.active}
              onCalciteCheckboxChange={this.handleCheckboxChange.bind(this, id, expression)}
            ></calcite-checkbox>
          </div>
        </div>
      ) : (
        this.initInput(id, expression)
      );
    });
  }

  renderLayerBlock(): VNode[] {
    return this.filterLayerExpressions.map(layerExpression => {
      return this.renderFilterBlocks(layerExpression);
    });
  }

  renderFilterBlocks(layerExpression: LayerExpression): VNode {
    const filter = this.renderFilter(layerExpression);
    const { id, operator } = layerExpression;
    const operatorTranslation = operator?.trim() === 'OR' ? 'orOperator' : 'andOperator';
    const zoomTo = this.renderZoomTo(id);
    return (
      <calcite-block
        key={layerExpression.id}
        heading={layerExpression.title}
        description={this.messages?.[operatorTranslation]}
        open={this.openFilters ? true : undefined}
        collapsible
      >
        {zoomTo}
        {filter}
      </calcite-block>
    );
  }

  renderCombobox(layerId: string, expression: Expression): VNode | undefined {
    return (
      <label key="combo-select" class={CSS.filterUIItemContainer}>
        <span>{expression.name}</span>
        <calcite-combobox
          id={expression.id.toString()}
          onCalciteComboboxChange={this.handleComboSelect.bind(this, expression, layerId)}
          label={expression.name}
          placeholder={expression.placeholder}
          overlayPositioning="fixed"
          selectionMode="multiple"
          scale="s"
          max-items="6"
        >
          {expression.fields?.map((value, index) => this.renderComboboxItem(expression, value, index))}
        </calcite-combobox>
      </label>
    );
  }

  renderComboboxItem(expression: Expression, value: string | number, index: number): VNode {
    let label = value;
    if (expression.type === 'coded-value') {
      label = expression.codedValues?.[value] as string;
    } else if (expression.type === 'number' && typeof value === 'number' && expression.format != null) {
      if (expression.format.places != null) {
        label = this.roundNumber(value, expression.format.places) as number;
      }
      if (expression.format.digitSeparator) {
        label = this.numberWithCommas(label as number);
      }
    }
    const selectedFields = expression?.selectedFields as unknown[];
    const selected = selectedFields?.includes(value) ?? false;

    return <calcite-combobox-item key={`${label}-${index}`} value={value} textLabel={label} selected={selected}></calcite-combobox-item>;
  }

  initFilterConfig(): VNode[] | undefined {
    if (this.filterLayerExpressions?.length > 0) {
      if (this.filterLayerExpressions.length === 1) {
        const { id, operator } = this.filterLayerExpressions[0];
        const operatorTranslation = operator?.trim() === 'OR' ? 'orOperator' : 'andOperator';
        const zoomTo = this.renderZoomTo(id);
        return (
          <calcite-block class={CSS.operatorDesc} heading={this.messages?.[operatorTranslation]} open>
            {zoomTo}
            {this.renderFilter(this.filterLayerExpressions[0])}
          </calcite-block>
        );
      } else if (this.filterLayerExpressions.length > 1) {
        return this.renderLayerBlock();
      }
    }
    return;
  }

  renderNumberSlider(layerId: string, expression: Expression): VNode | undefined {
    const min = expression?.min as number | undefined;
    const max = expression?.max as number | undefined;
    const step = expression?.step ? expression.step : 1;
    const check = min != null && max != null;
    const field = expression?.field ?? '';
    const minValue = expression?.range?.min != null ? expression.range.min : min;
    const maxValue = expression?.range?.max != null ? expression.range.max : max;
    const value = [minValue, maxValue] as number[];
    return check ? (
      <label key={expression?.id.toString()} class={CSS.filterUIItemContainer}>
        <span>{expression?.name}</span>
        <div class={CSS.numberInputContainer}>
          <calcite-slider
            id={expression?.id.toString()}
            onCalciteSliderChange={this.handleSliderChange.bind(this, expression, layerId)}
            min={min}
            max={max}
            minValue={min}
            maxValue={max}
            min-label={this.messages?.minSlider?.replace('{field}', field)}
            max-label={this.messages?.maxSlider?.replace('{field}', field)}
            step={step}
            labelHandles={true}
            snap={true}
            value={value}
            group-separator={expression?.format?.digitSeparator}
          ></calcite-slider>
        </div>
      </label>
    ) : undefined;
  }

  renderDatePicker(layerId: string, expression: Expression): VNode {
    const min = convertToDate(expression.min);
    const max = convertToDate(expression.max);
    const value = [expression?.range?.min, expression?.range?.max] as string[];
    const check = min != null && max != null;
    return check ? (
      <label class={CSS.filterUIItemContainer}>
        <span>{expression?.name}</span>
        <div class={CSS.dateInputContainer}>
          <calcite-input-date-picker
            id={expression?.id.toString()}
            onCalciteInputDatePickerChange={this.handleDatePickerRangeChange.bind(this, expression, layerId)}
            min={min}
            max={max}
            scale="s"
            lang={this.locale ?? 'en'}
            overlay-positioning="fixed"
            layout="vertical"
            value={value}
            range
          />
          <calcite-action onClick={this.handleResetDatePicker.bind(this, expression, layerId)} icon="reset" text={this.messages?.resetDatePicker} scale="s" />
        </div>
      </label>
    ) : null;
  }

  renderFooter(): VNode {
    return (
      <div class={CSS.footer} slot="footer">
        <calcite-button appearance="outline" width="full" disabled={this.disabled} onClick={this.handleResetFilter.bind(this)}>
          {this.messages?.resetFilter}
        </calcite-button>
      </div>
    );
  }

  renderFullFooter(): VNode {
    const closeText = this.closeBtnText != null ? this.closeBtnText : this.messages?.close;
    return (
      <div class={CSS.footer} slot="footer">
        <calcite-button appearance="outline" width="half" disabled={this.disabled} onClick={this.handleResetFilter.bind(this)}>
          {this.messages?.resetFilter}
        </calcite-button>
        <calcite-button appearance="solid" width="half" kind="brand" onClick={this.closeBtnOnClick?.bind(this)}>
          {closeText}
        </calcite-button>
      </div>
    );
  }

  renderZoomTo(id: string): VNode {
    return (
      <div class={CSS.zoomTo}>
        <calcite-button id={`zoom-to-${id}`} appearance="transparent" kind="neutral" scale="s" iconStart="magnifying-glass-plus" onClick={this.handleZoomTo.bind(this, id)}>
          {this.messages?.zoomTo}
        </calcite-button>
      </div>
    );
  }

  handleResetDatePicker(expression: Expression, layerId: string): void {
    const datePicker = this.panelEl.querySelector(`[id='${expression.id}']`) as HTMLCalciteInputDatePickerElement;
    resetDatePicker(datePicker);
    expression.active = false;
    expression.definitionExpression = undefined;
    expression.range = undefined;
    this.generateOutput(layerId);
  }

  initInput(layerId: string, expression: Expression): VNode | undefined {
    const { type } = expression;
    if (type === 'string' || type == 'coded-value') {
      return this.renderCombobox(layerId, expression);
    } else if (type === 'number' || type == 'range') {
      if (expression?.numDisplayOption === 'drop-down') {
        return this.renderCombobox(layerId, expression);
      }
      return this.renderNumberSlider(layerId, expression);
    } else if (type === 'date') {
      return this.renderDatePicker(layerId, expression);
    }
    return;
  }

  async initExpressions(): Promise<void> {
    if (this.filterLayerExpressions == null) return;
    const tmpLE = this.filterLayerExpressions;
    for (let i = 0; i < tmpLE?.length; i++) {
      const { id } = tmpLE[i];
      const expressions = tmpLE[i].expressions;
      for (let j = 0; j < expressions?.length; j++) {
        if (expressions[j].active == null && expressions[j].definitionExpression != null) {
          expressions[j].active = false;
        }
        await this.setInitExpression(id, expressions[j]);
      }
    }

    this.filterLayerExpressions = [...tmpLE];
  }

  handleResetFilter(): void {
    this.filterLayerExpressions?.forEach(layerExpression => {
      layerExpression.expressions?.forEach(expression => {
        const { type } = expression;
        if (type === 'string' || type === 'coded-value') {
          this.resetCombobox(expression);
        } else if (type === 'date') {
          this.resetDatePicker(expression);
        } else if (type === 'number' || type === 'range') {
          if (expression?.numDisplayOption === 'drop-down') {
            this.resetCombobox(expression);
          } else {
            this.resetNumberRange(expression);
          }
        } else {
          this.resetCheckbox(expression);
        }
        expression.active = false;
      });
    });
    this.resetAllFilters();
    this.generateURLParams();
    this.filterListReset.emit();
  }

  resetCombobox(expression: Expression): void {
    const { id } = expression;
    expression.selectedFields = undefined;
    const combobox = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteComboboxElement;
    if (combobox != null) {
      for (let i = 0; i < combobox.children.length; i++) {
        const comboboxItem = combobox.children[i] as HTMLCalciteComboboxItemElement;
        comboboxItem.selected = false;
      }
    }
  }

  resetDatePicker(expression: Expression): void {
    const { id } = expression;
    expression.range = undefined;
    const datePicker = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteInputDatePickerElement;
    resetDatePicker(datePicker);
  }

  resetNumberRange(expression: Expression): void {
    expression.range = undefined;
    const { id, max, min } = expression;
    const slider = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteSliderElement;
    if (slider != null) {
      slider.minValue = min as number;
      slider.maxValue = max as number;
    }
  }

  resetCheckbox(expression: Expression): void {
    const { id } = expression;
    const checkbox = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteCheckboxElement;
    if (checkbox != null) {
      checkbox.checked = false;
    }
  }

  resetAllFilters(): void {
    this.view.map.allLayers.forEach(layer => {
      if (supportedTypes.includes(layer.type)) {
        const fl = layer as FilterLayer;
        if (fl.type === 'point-cloud') {
          fl.filters = this.initPointCloudFilters?.[fl.id];
        } else {
          fl.definitionExpression = this.initDefExpressions?.[fl.id];
        }
      }
    });
  }

  async updateStringExpression(layerId: string, expression: Expression): Promise<boolean> {
    const { field } = expression;
    const layer = this.view.map.allLayers.find(({ id }) => id === layerId) as FilterQueryLayer;
    expression.fields = await this.getFeatureAttributes(layer, field);
    if (expression?.selectedFields) {
      const selectedFields = expression.selectedFields.map((field: string | number) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
      expression.definitionExpression = `${field} IN (${selectedFields.join(',')})`;

      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async updateNumberExpression(layerId: string, expression: Expression): Promise<boolean> {
    if ((!expression?.min && expression?.min !== 0) || (!expression?.max && expression?.max !== 0)) {
      const layer = this.view.map.allLayers.find(({ id }) => id === layerId) as FilterQueryLayer;
      const { field } = expression;
      if (field != null) {
        this.setExpressionFormat(layer as __esri.FeatureLayer, expression, field);
        if (expression?.numDisplayOption === 'drop-down') {
          const fields = (await this.getFeatureAttributes(layer, field)) as number[];
          fields.sort((a, b) => a - b);
          expression.fields = fields;
        } else {
          const graphic = await this.calculateMinMaxStatistics(layer, field);
          const attributes = graphic?.[0]?.attributes as { [key: string]: number };
          if (expression.format?.places != null) {
            expression.min = this.roundMinNumberDown(attributes[`min${field}`], expression.format.places);
            expression.max = this.roundMaxNumberUp(attributes[`max${field}`], expression.format.places);
          } else {
            expression.min = attributes[`min${field}`];
            expression.max = attributes[`max${field}`];
          }
          if (expression?.range && Object.keys(expression.range).length) {
            const { min, max } = expression.range;
            expression.definitionExpression = `${expression.field} BETWEEN ${min} AND ${max}`;

            return true;
          }
        }
      }
    }
    return false;
  }

  async updateDateExpression(layerId: string, expression: Expression): Promise<boolean> {
    const { field, range } = expression;
    const layer = this.view.map.allLayers.find(({ id }) => id === layerId) as FilterQueryLayer;
    const graphic = await this.calculateMinMaxStatistics(layer, field);
    const attributes = graphic?.[0]?.attributes;
    expression.min = convertToDate(attributes[`min${field}`]);
    expression.max = convertToDate(attributes[`max${field}`]);
    if (range != null && (range?.max != null || range?.min != null)) {
      let { min, max } = range;
      min = (min as string)?.replace('+', ' ');
      max = (max as string)?.replace('+', ' ');
      if (min || max) {
        const chevron = max && !min ? '<' : !max && min ? '>' : null;
        if (chevron) {
          expression.definitionExpression = `${field} ${chevron} '${min ?? max}'`;
        } else {
          expression.definitionExpression = `${field} BETWEEN '${min}' AND '${max}'`;
        }

        return true;
      }
    }

    return false;
  }

  updateCodedValueExpression(expression: Expression, layerField: __esri.Field | undefined): boolean {
    const { field } = expression;
    const fields: any[] = [];
    expression.codedValues = {};
    const domain = layerField?.domain as __esri.CodedValueDomain;
    domain?.codedValues?.forEach(cv => {
      const { code, name } = cv;
      fields.push(code);
      if (expression.codedValues != null) {
        expression.codedValues[code] = name;
      }
    });
    expression.fields = fields;
    if (expression?.selectedFields) {
      const selectedFields = expression.selectedFields.map((field: string | number) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
      const definitionExpression = `${field} IN (${selectedFields.join(',')})`;
      expression.definitionExpression = definitionExpression;

      return true;
    }

    return false;
  }

  updateRangeExpression(expression: Expression, layerField: __esri.Field | undefined): boolean {
    const { field, range } = expression;
    const domain = layerField?.domain as __esri.RangeDomain;
    expression.min = domain?.minValue;
    expression.max = domain?.maxValue;
    if (range && Object.keys(range).length) {
      const { min, max } = range;
      const definitionExpression = `${field} BETWEEN ${min} AND ${max}`;
      expression.definitionExpression = definitionExpression;

      return true;
    }
    return false;
  }

  async getFeatureAttributes(layer: FilterQueryLayer, field: string | undefined): Promise<string[] | number[]> {
    if (layer && supportedTypes.includes(layer.type)) {
      const query = layer.createQuery();
      if (layer?.capabilities?.query?.['supportsCacheHint']) {
        query.cacheHint = true;
      }
      if (field) {
        query.where = this.initDefExpressions?.[layer.id] || '1=1';
        query.outFields = [field];
        query.orderByFields = [`${field} DESC`];
        query.returnDistinctValues = true;
        query.returnGeometry = false;
        if (this.extentSelector && this.extentSelectorConfig) {
          const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
          if (geo != null) query.geometry = geo;
          query.spatialRelationship = 'intersects';
        }
        const maxRecordCount = layer.capabilities?.query?.['maxRecordCount'];
        const featureCount = await layer.queryFeatureCount();
        if (maxRecordCount != null && featureCount > maxRecordCount) {
          query.num = layer.capabilities?.query?.['maxRecordCount'];
          let features: any[] = [];
          for (let index = 0; index < featureCount; index += maxRecordCount) {
            query.start = index;
            const results = await this.queryForFeatures(layer, query, field);
            features = features.concat(results);
          }
          return features.sort();
        } else {
          return (await this.queryForFeatures(layer, query, field))?.sort();
        }
      }
    }

    return [];
  }

  async queryForFeatures(layer: FilterQueryLayer, query: __esri.Query, field: string): Promise<string[] | number[]> {
    const results = await layer.queryFeatures(query);
    const features = results?.features.filter(feature => feature.attributes?.[field]);
    return features?.map(feature => feature.attributes?.[field]);
  }

  async calculateMinMaxStatistics(layer: FilterQueryLayer, field: string | undefined): Promise<__esri.Graphic[]> {
    if (layer && supportedTypes.includes(layer.type)) {
      const query = layer.createQuery();
      query.where = this.initDefExpressions?.[layer.id] || '1=1';
      if ((layer?.capabilities?.query as any)?.supportsCacheHint) {
        query.cacheHint = true;
      }
      if (field) {
        const tmp = [
          {
            onStatisticField: field,
            outStatisticFieldName: `max${field}`,
            statisticType: 'max',
          },
          {
            onStatisticField: field,
            outStatisticFieldName: `min${field}`,
            statisticType: 'min',
          },
        ];
        query.outStatistics = tmp as any;
        if (this.extentSelector && this.extentSelectorConfig) {
          const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
          if (geo != null) {
            query.geometry = geo;
          }
          query.spatialRelationship = 'intersects';
        }
        const results = await layer.queryFeatures(query);
        return results?.features;
      }
    }
    return [];
  }

  getExtent(extentSelector: boolean, extentSelectorConfig: ExtentSelector): __esri.Geometry | undefined {
    if (extentSelector && extentSelectorConfig) {
      const { constraints } = extentSelectorConfig;
      let newConstraints = { ...constraints };
      const geometry = newConstraints?.geometry;
      if (geometry) {
        const tmpExtent = this.geometryJsonUtils.fromJSON(geometry);
        if (tmpExtent && (tmpExtent?.type === 'extent' || tmpExtent?.type === 'polygon')) {
          return tmpExtent;
        }
      }
    }
    return;
  }

  setInitExpression(id: string, expression: Expression): Promise<void> {
    if (expression.field && expression.type) {
      const layer = this.view.map.findLayerById(id) as FilterLayer;
      return layer?.when(async () => {
        const layerField = layer.fields?.find(({ name }) => name === expression.field);
        const domainType = layerField?.domain?.type;
        expression.type = domainType === 'coded-value' || domainType === 'range' ? domainType : expression.type;
        await this.updateExpression(id, expression, layerField);
      });
    } else {
      this.updateExpression(id, expression, undefined);
      return Promise.resolve();
    }
  }

  async updateExpression(id: string, expression: Expression, layerField: __esri.Field | undefined): Promise<void> {
    let update = false;
    const { type } = expression;
    if (type === 'string') {
      update = await this.updateStringExpression(id, expression);
    } else if (type === 'number') {
      update = await this.updateNumberExpression(id, expression);
    } else if (type === 'date') {
      update = await this.updateDateExpression(id, expression);
    } else if (type === 'coded-value') {
      update = this.updateCodedValueExpression(expression, layerField);
    } else if (type === 'range') {
      update = this.updateRangeExpression(expression, layerField);
    } else if (expression.active && (type === 'checkbox' || type == null)) {
      update = true;
    }
    if (update) {
      this.generateOutput(id);
    }
  }

  updateRangeExpressions(expression: Expression, layerId: string, max: number, min: number): void {
    const initExp = this.initDefExpressions?.[layerId];
    if ((min || min === 0) && (max || max === 0)) {
      if (min === expression?.min && max === expression?.max) {
        expression.definitionExpression = undefined;
        expression.active = false;
      } else {
        expression.definitionExpression = initExp ? `(${initExp}) AND ${expression?.field} BETWEEN ${min} AND ${max}` : `${expression?.field} BETWEEN ${min} AND ${max}`;
        expression.active = true;
      }
    }
    expression.range = { min, max };
  }

  handleCheckboxChange(id: string, expression: Expression, event: CalciteCheckboxCustomEvent<void>): void {
    const node = event.target;
    expression.active = node.checked;
    this.generateOutput(id);
  }

  handleSliderChange(expression: Expression, layerId: string, event: CustomEvent): void {
    const { maxValue, minValue } = event.target as HTMLCalciteSliderElement;
    this.updateRangeExpressions(expression, layerId, maxValue, minValue);
    this.generateOutput(layerId);
  }

  handleComboSelect(expression: Expression, layerId: string, event: CustomEvent): void {
    const combobox = event.target as HTMLCalciteComboboxElement;
    const items = combobox.selectedItems as HTMLCalciteComboboxItemElement[];
    const { field } = expression;
    if (items && items.length) {
      const values = items.map(({ value }) => (typeof value === 'number' ? value : `'${handleSingleQuote(value)}'`));
      expression.selectedFields = items.map(({ value }) => value);
      const definitionExpression = `${field} IN (${values.join(',')})`;
      expression.definitionExpression = definitionExpression;
      expression.active = true;
    } else {
      expression.definitionExpression = undefined;
      expression.active = false;
    }
    this.generateOutput(layerId);
  }

  handleDatePickerRangeChange(expression: Expression, layerId: string, event: CalciteInputDatePickerCustomEvent<Event>): void {
    const datePicker = event.target;
    const [startDate, endDate] = datePicker.valueAsDate as Date[];
    const start = startDate != null ? convertToDate(Math.floor(startDate.getTime()), true) : undefined;
    const end = endDate != null ? convertToDate(Math.floor(endDate.getTime()), true) : undefined;
    if (start != null || end != null) {
      const chevron = end && start == null ? '<' : end == null && start ? '>' : null;
      if (chevron) {
        expression.definitionExpression = `${expression.field} ${chevron} '${start ?? end}'`;
      } else {
        expression.definitionExpression = `${expression.field} BETWEEN '${start}' AND '${end}'`;
      }
      expression.range = { min: start, max: end };
      expression.active = true;

      this.generateOutput(layerId);
    }
  }

  handleURLParams(): void {
    if ('URLSearchParams' in window) {
      const params = new URLSearchParams(document.location.search);
      const filters = params.get('filter')?.split(';');

      filters?.forEach(filter => {
        const tmpFilter = JSON.parse(filter) as FilterParam;
        this.filterLayerExpressions?.forEach(layerExpression => {
          if (tmpFilter?.layerId === layerExpression.id) {
            layerExpression.expressions?.forEach(expression => {
              if (expression.id?.toString() === tmpFilter?.expressionId?.toString()) {
                expression.active = true;
                if (tmpFilter.type === 'range') {
                  expression.range = tmpFilter.range;
                } else if (tmpFilter.type === 'select') {
                  expression.selectedFields = tmpFilter.selectedFields;
                }
              }
            });
          }
        });
      });
    }
  }

  createURLParamExpression(layerId: string, expression: Expression): GenericObject {
    const { id, range, selectedFields, type } = expression;
    if (type === 'number' || type === 'range' || type === 'date') {
      return {
        type: 'range',
        layerId,
        expressionId: id.toString(),
        range,
      };
    } else if (type === 'string' || type === 'coded-value') {
      return {
        type: 'select',
        layerId,
        expressionId: id.toString(),
        selectedFields,
      };
    } else {
      return {
        layerId,
        expressionId: id.toString(),
      };
    }
  }

  autoUpdateURLCheck(params: URLSearchParams): void {
    if (this.autoUpdateUrl) {
      if (params.toString()) {
        window.history.replaceState({}, '', `${window.location.pathname}?${params} `);
      } else {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }

  generateURLParams(): void {
    if ('URLSearchParams' in window) {
      const params = new URLSearchParams(window.location.search);
      const expressions: string[] = [];
      this.filterLayerExpressions?.forEach(layerExpr => {
        layerExpr?.expressions?.forEach(expression => {
          if (expression.active) {
            const paramExpression = this.createURLParamExpression(layerExpr.id, expression);
            expressions.push(JSON.stringify(paramExpression));
          }
        });
      });
      if (expressions.length > 0) {
        params.set('filter', expressions.join(';'));
      } else {
        params.delete('filter');
      }
      this.autoUpdateURLCheck(params);
      this.urlParams = params;
    }
  }

  updateFilter(layerExpression: LayerExpression, defExpressions: string[], filters: PointCloudFilters): void {
    const { id } = layerExpression;
    const fl = this.view.map.findLayerById(id) as FilterLayer;
    if (fl != null) {
      if (fl.type === 'point-cloud') {
        this.updateFilterLayerPCLFilter(fl, filters);
      } else {
        this.updateFilterLayerDefExpression(fl, defExpressions, layerExpression);
      }
    }
  }

  updateFilterLayerDefExpression(layer: FilterQueryLayer, defExpressions: string[], layerExpression: LayerExpression): void {
    const { id, operator } = layerExpression;
    const combinedExpressions =
      defExpressions?.length > 0 && this.initDefExpressions?.[id] != null
        ? `(${defExpressions.join(operator)}) AND (${this.initDefExpressions[id]})`
        : defExpressions.length > 0
        ? defExpressions.join(operator)
        : this.initDefExpressions?.[id];
    layer.definitionExpression = combinedExpressions;
  }

  updateFilterLayerPCLFilter(layer: __esri.PointCloudLayer, filters: PointCloudFilters): void {
    layer.filters = filters;
  }

  async handleWhenView(): Promise<void> {
    if (this.view == null) return;
    const map = this.view.map as __esri.WebMap | __esri.WebScene;
    await map.loadAll();
    this.handleLayerExpressionsUpdate();
  }

  async handleLayerExpressionsUpdate(): Promise<void> {
    if (this.view == null) return;
    const map = this.view.map as __esri.WebMap | __esri.WebScene;
    this.initDefExpressions = {};
    this.initPointCloudFilters = {};
    map.allLayers.forEach(layer => {
      if (supportedTypes.includes(layer.type)) {
        const fl = layer as FilterLayer;
        if (fl.type === 'point-cloud') {
          this.initPointCloudFilters[fl.id] = fl.filters;
        } else {
          this.initDefExpressions[fl.id] = fl.definitionExpression;
        }
      }
    });
    this.initExpressions();
    this.handleURLParams();
  }

  async handleZoomTo(id: string): Promise<void> {
    const zoomToBtn = this.panelEl.querySelector(`#zoom-to-${id}`) as HTMLCalciteButtonElement;
    if (zoomToBtn != null) {
      zoomToBtn.loading = true;
    }
    this.zoomToGraphics = [];
    let loadingTime = 0;
    let startGoTo = false;
    const zoomToInterval = setInterval(() => {
      if (loadingTime >= 1000 && startGoTo) {
        this.view.goTo(this.zoomToGraphics);
        if (zoomToBtn != null) {
          zoomToBtn.loading = false;
        }
        clearInterval(zoomToInterval);
      }
      loadingTime += 500;
    }, 500);
    await this.getZoomToGraphics(id);
    startGoTo = true;
  }

  async getZoomToGraphics(id: string): Promise<void> {
    const lv = this.view.allLayerViews.find(({ layer }) => layer.id === id) as FilterQueryLayerView;
    const layer = lv.layer as FilterQueryLayer;
    if (supportedTypes.includes(layer?.type)) {
      let query = layer.createQuery();
      if (layer?.capabilities?.query?.['supportsCacheHint']) {
        query.cacheHint = true;
      }
      query.where = layer.definitionExpression ?? '1=1';
      query.returnGeometry = true;
      query.returnDistinctValues = true;
      query.maxRecordCountFactor = 3;
      query.returnExceededLimitFeatures = true;
      query.outFields = [];
      if (this.extentSelector && this.extentSelectorConfig) {
        const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
        if (geo != null) query.geometry = geo;
        query.spatialRelationship = 'intersects';
      }
      const filter = lv.featureEffect?.filter != null ? lv.featureEffect.filter : lv.filter;
      if (filter != null) {
        if (filter.objectIds != null) {
          query.objectIds = filter.objectIds;
        }
        if (filter.distance != null) {
          query.distance = filter.distance;
        }
        if (filter.geometry != null) {
          query.geometry = filter.geometry;
        }
        if (filter.distance != null) {
          query.distance = filter.distance;
        }
        if (filter.spatialRelationship != null) {
          query.spatialRelationship = filter.spatialRelationship as __esri.Query['spatialRelationship'];
        }
        if (filter.units != null) {
          query.units = filter.units;
        }
        if (filter.where != null) {
          query.where = filter.where;
        }
        if (filter.timeExtent != null) {
          query.timeExtent = filter.timeExtent;
        }
      }
      try {
        const results = await layer.queryFeatures(query);
        this.zoomToGraphics.push(...results.features);
      } catch {}
    }
    return Promise.resolve();
  }

  generateOutput(layerId: string): void {
    if (this.view == null) return;
    const defExpressions: string[] = [];
    let filters: PointCloudFilters = [];
    const layerExpression = this.filterLayerExpressions.find(({ id }) => id === layerId);
    if (layerExpression) {
      for (const expression of layerExpression.expressions) {
        const { active, definitionExpression, pointCloudFilters } = expression;
        if (active && definitionExpression) {
          defExpressions.push(`(${definitionExpression})`);
        }
        if (active && pointCloudFilters != null && pointCloudFilters.length > 0) {
          filters = filters.concat(pointCloudFilters);
        }
      }
      this.updateFilter(layerExpression, defExpressions, filters);
      this.generateURLParams();
      this.filterUpdate.emit();
    }
  }

  numberWithCommas(num: number) {
    return num.toLocaleString('en-US', { maximumFractionDigits: 20 });
  }

  // If fieldInfo.format.places limits decimal digits then use this for min value to make sure the min is actually included in slider.
  // e.g. when using Math.round() with a min of 1.058 with only 2 decimal places would be 1.06 so the slider wouldn't contain the min. Math.floor() ensures it does.
  // Inverse of this reasoning for roundMaxNumberUp().

  roundMinNumberDown(num: number, decimalPlaces: number): number | undefined {
    if (num == null) return;
    if (!('' + num).includes('e')) {
      return +(Math.floor((num + 'e+' + decimalPlaces) as unknown as number) + 'e-' + decimalPlaces);
    } else {
      var arr = ('' + num).split('e');
      var sig = '';
      if (+arr[1] + decimalPlaces > 0) {
        sig = '+';
      }
      return +(Math.floor((+arr[0] + 'e' + sig + (+arr[1] + decimalPlaces)) as unknown as number) + 'e-' + decimalPlaces);
    }
  }

  roundMaxNumberUp(num: number, decimalPlaces: number): number | undefined {
    if (num == null) return;
    if (!('' + num).includes('e')) {
      return +(Math.ceil((num + 'e+' + decimalPlaces) as unknown as number) + 'e-' + decimalPlaces);
    } else {
      var arr = ('' + num).split('e');
      var sig = '';
      if (+arr[1] + decimalPlaces > 0) {
        sig = '+';
      }
      return +(Math.ceil((+arr[0] + 'e' + sig + (+arr[1] + decimalPlaces)) as unknown as number) + 'e-' + decimalPlaces);
    }
  }

  roundNumber(num: number, decimalPlaces: number): number | undefined {
    if (num == null) return;
    if (!('' + num).includes('e')) {
      return +(Math.round((num + 'e+' + decimalPlaces) as unknown as number) + 'e-' + decimalPlaces);
    } else {
      var arr = ('' + num).split('e');
      var sig = '';
      if (+arr[1] + decimalPlaces > 0) {
        sig = '+';
      }
      return +(Math.round((+arr[0] + 'e' + sig + (+arr[1] + decimalPlaces)) as unknown as number) + 'e-' + decimalPlaces);
    }
  }

  setExpressionFormat(layer: __esri.FeatureLayer, expression: Expression, field: string): void {
    if (layer?.popupTemplate != null) {
      const fieldInfo = layer.popupTemplate.fieldInfos.find(({ fieldName }) => fieldName === field);
      expression.format = fieldInfo?.format;
    }
  }
}
