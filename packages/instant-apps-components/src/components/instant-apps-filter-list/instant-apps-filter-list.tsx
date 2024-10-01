import { CalciteCheckboxCustomEvent, CalciteInputDatePickerCustomEvent } from '@esri/calcite-components';
import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, VNode, Watch, h } from '@stencil/core';

import FilterList_T9n from '../../assets/t9n/instant-apps-filter-list/resources.json';

import {
  BaseQueryableLayer,
  Expression,
  ExtentSelector,
  FilterInitState,
  FilterLayer,
  FilterParam,
  GenericObject,
  GenericStringObject,
  LayerExpression,
  PointCloudFilters,
  QueryableLayer,
  QueryableLayerView,
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
   * Determines the type of positioning to use for the overlaid content.
   */
  @Prop() comboboxOverlayPositioning?: 'absolute' | 'fixed' = 'absolute';

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
   * Number of active filters
   */
  @Prop({ mutable: true }) filterCount?: number = 0;

  /**
   * A reference to the MapView or SceneView.
   */
  @Prop() view: __esri.MapView | __esri.SceneView;

  /**
   * Display zoom button.
   */
  @Prop() zoomBtn?: boolean = true;

  /**
   * Display reset button.
   */
  @Prop() resetBtn?: boolean = true;

  /**
   * When false filters will not be reset when the component is disconnected from the DOM
   */
  @Prop() resetFiltersOnDisconnect: boolean = true;

  @State() loading: boolean;
  @State() filterLayerExpressions: LayerExpression[];
  @State() messages: typeof FilterList_T9n;
  @State() baseClass = baseClassLight;
  @State() disabled: boolean | undefined = true;
  @State() hasLayerExpression: boolean = false;
  @State() initDefExpressions: GenericStringObject;
  @State() initMapImageExpressions: { [key: string]: GenericStringObject };
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

  @Watch('layerExpressions')
  watchLayerExpressions() {
    if (!this.hasLayerExpression) {
      this.filterLayerExpressions = structuredClone(this.layerExpressions);
      this.handleLayerExpressionsUpdate();
      this.hasLayerExpression = true;
    }
  }

  @Method()
  getFilterInitState(): Promise<FilterInitState> {
    return Promise.resolve({
      initDefExpressions: this.initDefExpressions,
      initMapImageExpressions: this.initMapImageExpressions,
      initPointCloudFilters: this.initPointCloudFilters,
    });
  }

  @Method()
  forceReset(): Promise<void> {
    this.filterLayerExpressions = structuredClone(this.layerExpressions);
    this.handleResetFilter();
    return this.initExpressions();
  }

  @Method()
  restoreFilters(filterParamString: string, filterInitState: any): Promise<void> {
    this.filterLayerExpressions = structuredClone(this.layerExpressions);
    this.initDefExpressions = filterInitState.initDefExpressions;
    this.initMapImageExpressions = filterInitState.initMapImageExpressions;
    this.initPointCloudFilters = filterInitState.initPointCloudFilters;

    const filters = filterParamString?.split(';').map(filter => JSON.parse(filter) as FilterParam);
    if (filters) {
      this.filterCount = this.applyFilters(filters);
    }
    return this.initExpressions();
  }

  geometryJsonUtils: typeof __esri.JSONSupport;
  intl: __esri.intl;
  locale: string;
  panelEl: HTMLCalcitePanelElement;
  reactiveUtils: __esri.reactiveUtils;
  zoomToExtent: { type: string; count: number; extent: __esri.Extent };

  async componentWillLoad(): Promise<void> {
    this.baseClass = getMode(this.el) === 'dark' ? baseClassDark : baseClassLight;
    await this.initializeModules();
    getMessages(this);
    this.hasLayerExpression = this.layerExpressions != null;
    this.filterLayerExpressions = this.layerExpressions != null ? structuredClone(this.layerExpressions) : [];
    this.disabled = this.filterLayerExpressions?.length ? undefined : true;
    this.reactiveUtils.whenOnce(() => this.view).then(() => this.handleLayerExpressionsUpdate());
  }

  componentShouldUpdate(newValue: unknown, _oldValue: unknown, name: string) {
    if (name === 'view' && newValue != null) {
      this.handleWhenView();
    } else if (name === 'layerExpressions') {
      if (this.hasLayerExpression) {
        this.resetAllFilters();
      }
      this.filterLayerExpressions = structuredClone(this.layerExpressions);
      this.handleLayerExpressionsUpdate();
      this.hasLayerExpression = true;
    }
  }

  componentWillRender(): void {
    this.disabled = this.filterLayerExpressions?.length > 0 ? undefined : true;
  }

  disconnectedCallback(): void {
    if (this.resetFiltersOnDisconnect) {
      this.filterLayerExpressions = structuredClone(this.layerExpressions);
      this.resetAllFilters();
    }
  }

  async initializeModules(): Promise<void> {
    const [intl, geometryJsonUtils, reactiveUtils] = await loadModules(['esri/intl', 'esri/geometry/support/jsonUtils', 'esri/core/reactiveUtils']);
    this.geometryJsonUtils = geometryJsonUtils;
    this.reactiveUtils = reactiveUtils;
    this.locale = intl.getLocale();
    this.intl = intl;
  }

  render(): VNode {
    const filterConfig = this.loading ? this.renderLoading() : this.initFilterConfig();
    const footer = this.renderFooter(this.closeBtn, this.resetBtn);
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

  renderLoading(): VNode {
    return <calcite-loader label="Loading filters..."></calcite-loader>;
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
              onCalciteCheckboxChange={this.handleCheckboxChange.bind(this, layerExpression, expression)}
            ></calcite-checkbox>
          </div>
        </div>
      ) : (
        this.initInput(layerExpression, expression)
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
    const { operator } = layerExpression;
    const operatorTranslation = operator?.trim() === 'OR' ? 'orOperator' : 'andOperator';
    const zoomTo = this.renderZoomTo(layerExpression);
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

  renderCombobox(layerExpression: LayerExpression, expression: Expression): VNode | undefined {
    return (
      <label key="combo-select" class={CSS.filterUIItemContainer}>
        <span>{expression.name}</span>
        <calcite-combobox
          id={expression.id.toString()}
          onCalciteComboboxChange={this.handleComboSelect.bind(this, expression, layerExpression)}
          label={expression.name}
          placeholder={expression.placeholder}
          selectionMode="multiple"
          max-items="6"
          scale="s"
          overlayPositioning={this.comboboxOverlayPositioning}
        >
          {expression.fields?.map((value, index) => this.renderComboboxItem(expression, value, index))}
        </calcite-combobox>
      </label>
    );
  }

  renderComboboxItem(expression: Expression, value: string | number, index: number): VNode {
    const label = this.createLabel(expression, value);
    const selectedFields = expression?.selectedFields as unknown[];
    const selected = selectedFields?.includes(value) ?? false;

    return <calcite-combobox-item key={`${label}-${index}`} value={value} textLabel={`${label}`} selected={selected}></calcite-combobox-item>;
  }

  initFilterConfig(): VNode[] | undefined {
    if (this.filterLayerExpressions?.length > 0) {
      if (this.filterLayerExpressions.length === 1) {
        const { operator } = this.filterLayerExpressions[0];
        const operatorTranslation = operator?.trim() === 'OR' ? 'orOperator' : 'andOperator';
        const zoomTo = this.renderZoomTo(this.filterLayerExpressions[0]);
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

  renderNumberSlider(layerExpression: LayerExpression, expression: Expression): VNode | undefined {
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
            onCalciteSliderChange={this.handleSliderChange.bind(this, expression, layerExpression)}
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

  renderDatePicker(layerExpression: LayerExpression, expression: Expression): VNode {
    const { min, max } = expression;
    const value = [expression?.range?.min, expression?.range?.max] as string[];
    const check = min != null && max != null;
    return check ? (
      <label class={CSS.filterUIItemContainer}>
        <span>{expression?.name}</span>
        <div class={CSS.dateInputContainer}>
          <calcite-input-date-picker
            id={expression?.id.toString()}
            onCalciteInputDatePickerChange={this.handleDatePickerRangeChange.bind(this, expression, layerExpression)}
            min={min as string}
            max={max as string}
            overlay-positioning="fixed"
            lang={this.locale ?? 'en'}
            layout="vertical"
            value={value}
            range
          />
          <calcite-action onClick={this.handleResetDatePicker.bind(this, expression, layerExpression)} icon="reset" text={this.messages?.resetDatePicker} scale="s" />
        </div>
      </label>
    ) : null;
  }

  renderFooter(
    closeBtn: boolean | undefined,
    resetBtn: boolean | undefined
  ): VNode {
    const closeText = this.closeBtnText != null ? this.closeBtnText : this.messages?.close;
    return (
      <div class={CSS.footer} slot="footer">
        {
          resetBtn ? (
            <calcite-button appearance="outline" width="half" disabled={this.disabled} onClick={this.handleResetFilter.bind(this)}>
              {this.messages?.resetFilter}
            </calcite-button>
          ) : undefined
        }
        {
          closeBtn ? (
            <calcite-button appearance="solid" width="half" kind="brand" onClick={this.closeBtnOnClick?.bind(this)}>
              {closeText}
            </calcite-button>
          ) : undefined
        }
      </div>
    );
  }

  renderZoomTo(layerExpression: LayerExpression): VNode {
    const id = layerExpression?.sublayerId ? `zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `zoom-to-${layerExpression.id}`;
    return this.zoomBtn ? (
      <div class={CSS.zoomTo}>
        <calcite-button id={id} appearance="transparent" kind="neutral" scale="s" iconStart="magnifying-glass-plus" onClick={this.handleZoomTo.bind(this, layerExpression)}>
          {this.messages?.zoomTo}
        </calcite-button>
      </div>
    ) : undefined;
  }

  handleResetDatePicker(expression: Expression, layerExpression: LayerExpression): void {
    const datePicker = this.panelEl.querySelector(`[id='${expression.id}']`) as HTMLCalciteInputDatePickerElement;
    resetDatePicker(datePicker);
    expression.active = false;
    expression.definitionExpression = undefined;
    expression.range = undefined;
    this.generateOutput(layerExpression);
  }

  initInput(layerExpression: LayerExpression, expression: Expression): VNode | undefined {
    const { type, numDisplayOption, displayOption } = expression;
    const isDropdown = numDisplayOption === 'drop-down' || displayOption === 'drop-down';

    if (type === 'string' || type === 'coded-value' || ((type === 'number' || type === 'range' || type === 'date') && isDropdown)) {
      return this.renderCombobox(layerExpression, expression);
    } else if (type === 'number' || type === 'range') {
      return this.renderNumberSlider(layerExpression, expression);
    } else if (type === 'date') {
      return this.renderDatePicker(layerExpression, expression);
    }
    return;
  }

  async initExpressions(): Promise<void> {
    this.loading = true;
    if (this.filterLayerExpressions == null) return;
    const tmpLE = await this.processExpressions();
    this.loading = false;
    this.filterLayerExpressions = [...tmpLE];
  }

  async processExpressions(): Promise<LayerExpression[]> {
    if (!this.filterLayerExpressions) return [];

    for (const layerExpression of this.filterLayerExpressions) {
      for (const expression of layerExpression.expressions || []) {
        expression.active = expression.active ?? expression.definitionExpression != null;
        await this.setInitExpression(layerExpression, expression);
      }
    }

    return this.filterLayerExpressions;
  }

  handleResetFilter(): void {
    this.filterLayerExpressions?.forEach(layerExpression => {
      layerExpression.expressions?.forEach(expression => {
        const { type, numDisplayOption, displayOption } = expression;
        let uiType = '';

        if (
          type === 'string' ||
          type === 'coded-value' ||
          (type === 'date' && (numDisplayOption === 'drop-down' || displayOption === 'drop-down')) ||
          ((type === 'number' || type === 'range') && (numDisplayOption === 'drop-down' || displayOption === 'drop-down'))
        ) {
          uiType = 'combobox';
        } else if (type === 'date') {
          uiType = 'datePicker';
        } else if (type === 'number' || type === 'range') {
          uiType = 'numberRange';
        }

        if (uiType) {
          this.resetExpressionUI(uiType, expression);
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

  resetExpressionUI(type: string, expression: Expression): void {
    const { id } = expression;
    switch (type) {
      case 'combobox':
        expression.selectedFields = undefined;
        const combobox = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteComboboxElement;
        if (combobox) {
          Array.from(combobox.children).forEach(child => {
            (child as HTMLCalciteComboboxItemElement).selected = false;
          });
        }
        break;
      case 'datePicker':
        expression.range = undefined;
        const datePicker = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteInputDatePickerElement;
        resetDatePicker(datePicker);
        break;
      case 'numberRange':
        expression.range = undefined;
        const slider = this.panelEl.querySelector(`[id='${id}']`) as HTMLCalciteSliderElement;
        if (slider) {
          slider.minValue = expression.min as number;
          slider.maxValue = expression.max as number;
        }
        break;
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
    const allLayersAndTables = this.view?.map?.allLayers?.concat(this.view?.map?.allTables);
    allLayersAndTables?.forEach(layer => {
      if (!supportedTypes.includes(layer.type)) return;

      const fl = layer as FilterLayer;
      if (fl.type === 'point-cloud') {
        fl.filters = this.initPointCloudFilters?.[fl.id];
      } else if (fl.type === 'map-image') {
        fl.allSublayers.forEach(sublayer => {
          sublayer.definitionExpression = this.initMapImageExpressions?.[fl.id]?.[sublayer.id];
        });
      } else {
        fl.definitionExpression = this.initDefExpressions?.[fl.id];
      }
    });
  }

  async updateStringExpression(layerExpression: LayerExpression, expression: Expression): Promise<boolean> {
    const layer = this.findFilterLayer(layerExpression);

    await this.getFeatureAttributes(layer, expression);

    this.handleDateField(layer, expression);

    if (expression?.selectedFields) {
      expression.definitionExpression = this.createDefinitionExpression(expression);
      return true;
    }
    return false;
  }

  handleDateField(layer: QueryableLayer, expression: Expression): void {
    if (expression.type === 'date') {
      const layerField = layer.fields.find(({ name }) => name === expression.field);
      if (layerField?.type === 'date-only') {
        expression.dateOnly = true;
      }
    }
  }

  createDefinitionExpression(expression: Expression): string {
    if (!expression.selectedFields?.length) return '';
    const selectedFields = expression.selectedFields.map((field: string | number) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
    return `${expression.field} IN (${selectedFields.join(',')})`;
  }

  async updateNumberExpression(layerExpression: LayerExpression, expression: Expression): Promise<boolean> {
    if ((!expression?.min && expression?.min !== 0) || (!expression?.max && expression?.max !== 0)) {
      const layer = this.findFilterLayer(layerExpression);
      const { field } = expression;
      if (field != null) {
        this.setExpressionFormat(layer as __esri.FeatureLayer, expression, field);
        if (expression?.numDisplayOption === 'drop-down' || expression?.displayOption === 'drop-down') {
          await this.getFeatureAttributes(layer, expression);
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

  async updateDateExpression(layerExpression: LayerExpression, expression: Expression): Promise<boolean> {
    const { field, range } = expression;
    const layer = this.findFilterLayer(layerExpression);
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
    if (!layerField?.domain || layerField?.domain?.type !== 'coded-value') {
      return false;
    }

    const domain = layerField.domain;
    const codedValuesMap = domain.codedValues.reduce((acc, { code, name }) => {
      acc[code] = name;
      return acc;
    }, {});

    expression.codedValues = codedValuesMap;
    expression.fields = Object.keys(codedValuesMap);

    if (expression.selectedFields?.length) {
      const selectedFieldsExpression = expression.selectedFields.map((field: string | number) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`)).join(',');
      expression.definitionExpression = `${expression.field} IN (${selectedFieldsExpression})`;
      return true;
    }

    return false;
  }

  updateRangeExpression(expression: Expression, layerField: __esri.Field | undefined): boolean {
    if (!layerField?.domain || layerField?.domain?.type !== 'range') {
      return false;
    }

    const { field, range } = expression;
    expression.min = layerField.domain.minValue;
    expression.max = layerField.domain.maxValue;

    if (range && Object.keys(range).length) {
      expression.definitionExpression = `${field} BETWEEN ${range.min} AND ${range.max}`;
      return true;
    }

    return false;
  }

  async getFeatureAttributes(layer: QueryableLayer, expression: Expression): Promise<void> {
    if (!this.isLayerSupported(layer)) {
      expression.fields = [];
      return;
    }

    const queryLayer = await this.getQueryLayer(layer);
    const { maxRecordCount, supportsMaxRecordCountFactor } = this.extractQueryCapabilities(layer);
    const featureCount = await queryLayer.queryFeatureCount();
    const query = this.createQuery(queryLayer, expression);

    await this.queryDistinctFeatures(queryLayer, query, expression);

    if (this.shouldPaginate(maxRecordCount, featureCount, supportsMaxRecordCountFactor)) {
      this.handlePagination(queryLayer, query, maxRecordCount, supportsMaxRecordCountFactor, featureCount, expression);
    }
  }

  isLayerSupported(layer: QueryableLayer): boolean {
    return layer && supportedTypes.includes(layer.type);
  }

  extractQueryCapabilities(queryLayer: any): { maxRecordCount: number; supportsMaxRecordCountFactor: boolean } {
    return {
      maxRecordCount: queryLayer.capabilities?.query?.maxRecordCount ?? queryLayer.sourceJSON?.maxRecordCount,
      supportsMaxRecordCountFactor: queryLayer.capabilities?.query?.supportsMaxRecordCountFactor,
    };
  }

  createQuery(queryLayer: any, expression: Expression): any {
    const query = queryLayer.createQuery();
    this.applyCacheHint(queryLayer, query);
    const field = expression?.field;
    if (field) {
      const initDefExpr = this.getInitDefExprFromLayer(queryLayer);
      query.where = initDefExpr || '1=1';
      query.outFields = [field];
      query.orderByFields = [`${field} ASC`];
      query.returnDistinctValues = true;
      query.returnGeometry = false;
      query.maxRecordCountFactor = 5;
      this.applyQueryGeometryFromExtentSelector(query);
    }
    return query;
  }

  async queryDistinctFeatures(queryLayer: any, query: any, expression: Expression): Promise<void> {
    if (!query.outFields) return;

    const features = (await this.queryForFeatures(queryLayer, query, query.outFields[0])) as any[];
    if (features?.length) {
      expression.fields = [...new Set(features)];
      if (expression.type === 'string') {
        expression.fields = expression.fields.sort();
      } else if (expression.type === 'number') {
        expression.fields = expression.fields.sort((a, b) => a - b);
      }
    }
  }

  getQueryCount(maxRecordCount: number, supportsMaxRecordCountFactor: boolean): number {
    return supportsMaxRecordCountFactor ? maxRecordCount * 5 : maxRecordCount;
  }

  shouldPaginate(maxRecordCount: number, featureCount: number, supportsMaxRecordCountFactor: boolean): boolean {
    const queryCount = this.getQueryCount(maxRecordCount, supportsMaxRecordCountFactor);
    return maxRecordCount != null && featureCount > queryCount;
  }

  async handlePagination(
    queryLayer: BaseQueryableLayer,
    query: __esri.Query,
    maxRecordCount: number,
    supportsMaxRecordCountFactor: boolean,
    featureCount: number,
    expression: Expression,
  ): Promise<void> {
    const queryCount = this.getQueryCount(maxRecordCount, supportsMaxRecordCountFactor);
    const promises: any[] = [];
    for (let index = queryCount; index < featureCount; index += queryCount) {
      const paginatedQuery = query.clone();
      paginatedQuery.num = maxRecordCount;
      paginatedQuery.start = index;

      promises.push(this.queryForFeatures(queryLayer, paginatedQuery, query.outFields[0]));
    }
    Promise.all(promises).then(results => {
      results.forEach((features: string[]) => {
        if (features?.length && expression.fields) {
          (expression.fields as string[]).push(...features);
        }
      });
      expression.fields = [...new Set(expression.fields as string[])].sort();
      this.filterLayerExpressions = [...this.filterLayerExpressions];
    });
  }

  async queryForFeatures(layer: QueryableLayer, query: __esri.Query, field: string): Promise<string[] | number[]> {
    const results = await layer.queryFeatures(query);
    const features = results?.features.filter(feature => feature.attributes?.[field]);
    return features?.map(feature => feature.attributes?.[field]);
  }

  async calculateMinMaxStatistics(layer: QueryableLayer, field: string | undefined): Promise<__esri.Graphic[]> {
    if (!layer || !supportedTypes.includes(layer.type) || !field) {
      return [];
    }

    const query = this.createStatisticsQuery(layer, field);
    const results = await layer.queryFeatures(query);
    return results?.features || [];
  }

  createStatisticsQuery(layer: QueryableLayer, field: string): __esri.Query {
    const query = layer.createQuery();
    query.where = this.getInitDefExprFromLayer(layer) || '1=1';
    this.applyCacheHint(layer, query);
    query.outStatistics = [
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
    ] as __esri.StatisticDefinition[];
    this.applyQueryGeometryFromExtentSelector(query);

    return query;
  }

  getExtent(extentSelector: boolean, extentSelectorConfig: ExtentSelector): __esri.Geometry | undefined {
    if (extentSelector && extentSelectorConfig) {
      const { constraints } = extentSelectorConfig;
      let newConstraints = { ...constraints };
      const geometry = newConstraints?.geometry;
      if (geometry) {
        const tmpExtent = 'extent' in geometry ? geometry : this.geometryJsonUtils.fromJSON(geometry);
        if (tmpExtent?.type === 'extent' || tmpExtent?.type === 'polygon') {
          return tmpExtent;
        }
      }
    }
    return;
  }

  async setInitExpression(layerExpression: LayerExpression, expression: Expression): Promise<void> {
    if (!expression.field || !expression.type) {
      await this.updateExpression(layerExpression, expression, undefined);
      return;
    }

    const filterLayer = this.findFilterLayer(layerExpression);
    if (!filterLayer) {
      return;
    }

    if (filterLayer.loadStatus === 'not-loaded' || filterLayer.loadStatus === 'failed') {
      await filterLayer.load();
    }

    await filterLayer.when(async () => {
      const layerField = filterLayer.fields?.find(({ name }) => name === expression.field);
      const domainType = layerField?.domain?.type;
      expression.type = domainType === 'coded-value' || domainType === 'range' ? domainType : expression.type;
      await this.updateExpression(layerExpression, expression, layerField);
    });
  }

  async updateExpression(layerExpression: LayerExpression, expression: Expression, layerField: __esri.Field | undefined): Promise<void> {
    const update = await this.handleExpressionType(layerExpression, expression, layerField);
    if (update) {
      this.generateOutput(layerExpression);
    }
  }

  async handleExpressionType(layerExpression: LayerExpression, expression: Expression, layerField: __esri.Field | undefined): Promise<boolean> {
    switch (expression.type) {
      case 'string':
        return await this.updateStringExpression(layerExpression, expression);
      case 'number':
        return await this.updateNumberExpression(layerExpression, expression);
      case 'date':
        return this.updateDateExpressionBasedOnDisplayOption(layerExpression, expression);
      case 'coded-value':
        return this.updateCodedValueExpression(expression, layerField);
      case 'range':
        return this.updateRangeExpressionBasedOnDisplayOption(layerExpression, expression, layerField);
      case 'checkbox':
      case null:
        return expression.active ?? false;
      default:
        return false;
    }
  }

  async updateDateExpressionBasedOnDisplayOption(layerExpression: LayerExpression, expression: Expression): Promise<boolean> {
    if (expression.displayOption === 'drop-down') {
      return await this.updateStringExpression(layerExpression, expression);
    } else {
      return await this.updateDateExpression(layerExpression, expression);
    }
  }

  async updateRangeExpressionBasedOnDisplayOption(layerExpression: LayerExpression, expression: Expression, layerField: __esri.Field | undefined): Promise<boolean> {
    if (expression.displayOption === 'drop-down') {
      return await this.updateStringExpression(layerExpression, expression);
    } else {
      return this.updateRangeExpression(expression, layerField);
    }
  }

  updateRangeExpressions(expression: Expression, layerExpression: LayerExpression, max: number, min: number): void {
    const initExp = this.getInitDefExprFromLayerExpression(layerExpression);
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

  handleCheckboxChange(layerExpression: LayerExpression, expression: Expression, event: CalciteCheckboxCustomEvent<void>): void {
    const node = event.target;
    expression.active = node.checked;
    this.generateOutput(layerExpression);
  }

  handleSliderChange(expression: Expression, layerExpression: LayerExpression, event: CustomEvent): void {
    const { maxValue, minValue } = event.target as HTMLCalciteSliderElement;
    this.updateRangeExpressions(expression, layerExpression, maxValue, minValue);
    this.generateOutput(layerExpression);
  }

  handleComboSelect(expression: Expression, layerExpression: LayerExpression, event: CustomEvent): void {
    const combobox = event.target as HTMLCalciteComboboxElement;
    const items = combobox.selectedItems as HTMLCalciteComboboxItemElement[];
    const { field, type } = expression;

    expression.selectedFields = items.map(({ value }) => value);

    if (items.length) {
      const values = items.map(({ value }) => (typeof value === 'number' ? value : `'${handleSingleQuote(value)}'`));
      expression.definitionExpression = type === 'date' ? values.map(value => this.buildDateExpression(value, field!)).join(' OR ') : `${field} IN (${values.join(',')})`;
      expression.active = true;
    } else {
      expression.definitionExpression = undefined;
      expression.active = false;
    }

    this.generateOutput(layerExpression);
  }

  handleDatePickerRangeChange(expression: Expression, layerExpression: LayerExpression, event: CalciteInputDatePickerCustomEvent<Event>): void {
    const datePicker = event.target;
    const [startDate, endDate] = datePicker.valueAsDate as Date[];
    const start = startDate ? convertToDate(Math.floor(startDate.getTime()), true) : undefined;
    const end = endDate ? convertToDate(Math.floor(endDate.getTime()), true) : undefined;

    if (start || end) {
      expression.definitionExpression = this.constructDefinitionExpression(expression.field as string, start, end);
      expression.range = { min: start, max: end };
      expression.active = true;
      this.generateOutput(layerExpression);
    }
  }

  constructDefinitionExpression(field: string, start?: string, end?: string): string {
    if (!start) return `${field} < '${end}'`;
    if (!end) return `${field} > '${start}'`;
    return `${field} BETWEEN '${start}' AND '${end}'`;
  }

  handleURLParams(): void {
    if (!('URLSearchParams' in window)) return;

    const params = new URLSearchParams(document.location.search);
    const filterParamString = params.get('filter');
    if (!filterParamString) {
      this.filterCount = 0;
      return;
    }

    const filters = filterParamString.split(';').map(filter => JSON.parse(filter) as FilterParam);
    this.filterCount = this.applyFilters(filters);
  }

  applyFilters(filters: FilterParam[]): number {
    let filterCount = 0;

    filters.forEach(filter => {
      const layerExpression = this.filterLayerExpressions?.find(le => le.id === filter.layerId);
      if (!layerExpression) return;

      layerExpression.expressions?.forEach(expression => {
        if (expression.id?.toString() === filter.expressionId?.toString()) {
          this.activateExpression(expression, filter);
          filterCount++;
        }
      });
    });

    return filterCount;
  }

  activateExpression(expression: Expression, filter: FilterParam): void {
    expression.active = true;

    if (filter.type === 'range') {
      expression.range = filter.range;
    } else if (filter.type === 'select') {
      expression.selectedFields = filter.selectedFields;
    }
  }

  createURLParamExpression(layerExpression: LayerExpression, expression: Expression): GenericObject {
    const { id, range, selectedFields, type } = expression;
    if (type === 'string' || type === 'coded-value' || expression?.numDisplayOption === 'drop-down' || expression?.displayOption === 'drop-down') {
      return {
        type: 'select',
        layerId: layerExpression.id,
        expressionId: id.toString(),
        selectedFields,
      };
    } else if (type === 'number' || type === 'range' || type === 'date') {
      return {
        type: 'range',
        layerId: layerExpression.id,
        expressionId: id.toString(),
        range,
      };
    } else {
      return {
        layerId: layerExpression.id,
        expressionId: id.toString(),
      };
    }
  }

  autoUpdateURLCheck(params: URLSearchParams): void {
    if (this.autoUpdateUrl) {
      const url = params.toString() ? `${window.location.pathname}?${params}`.trim() : window.location.pathname;
      window.history.replaceState({}, '', url);
    }
  }

  generateURLParams(): void {
    if (!('URLSearchParams' in window)) return;

    const params = new URLSearchParams(window.location.search);
    const expressions =
      this.filterLayerExpressions?.flatMap(
        layerExpr => layerExpr?.expressions?.filter(expression => expression.active).map(expression => JSON.stringify(this.createURLParamExpression(layerExpr, expression))) || [],
      ) || [];

    this.filterCount = expressions.length;

    expressions.length > 0 ? params.set('filter', expressions.join(';')) : params.delete('filter');

    this.autoUpdateURLCheck(params);
    this.urlParams = params;
  }

  updateFilter(layerExpression: LayerExpression, defExpressions: string[], filters: PointCloudFilters): void {
    const { id } = layerExpression;
    const fl = (this.view.map.findLayerById(id) || this.view.map.findTableById(id)) as FilterLayer;
    if (fl != null) {
      if (fl.type === 'point-cloud') {
        this.updateFilterLayerPCLFilter(fl, filters);
      } else if (fl.type === 'map-image') {
        const sublayer = fl.findSublayerById(layerExpression?.sublayerId);
        if (sublayer != null) {
          this.updateFilterLayerDefExpression(sublayer, defExpressions, layerExpression);
        }
      } else {
        this.updateFilterLayerDefExpression(fl, defExpressions, layerExpression);
      }
    }
  }

  updateFilterLayerDefExpression(layer: QueryableLayer, defExpressions: string[], layerExpression: LayerExpression): void {
    const { operator } = layerExpression;
    let initDefExpressions = this.getInitDefExprFromLayer(layer);
    const combinedExpressions =
      defExpressions?.length > 0 && initDefExpressions != null
        ? `(${defExpressions.join(operator)}) AND (${initDefExpressions})`
        : defExpressions.length > 0
          ? defExpressions.join(operator)
          : initDefExpressions;
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
    this.initMapImageExpressions = {};

    map.allLayers.concat(map.allTables).forEach(layer => {
      if (!supportedTypes.includes(layer.type)) return;

      const fl = layer as FilterLayer;
      if (fl.type === 'point-cloud') {
        (this.initPointCloudFilters as any)[fl.id] = fl.filters;
      } else if (fl.type === 'map-image') {
        this.initMapImageExpressions[fl.id] = fl.allSublayers.reduce((acc, sublayer) => {
          acc[sublayer.id] = sublayer.definitionExpression;
          return acc;
        }, {});
      } else {
        this.initDefExpressions[fl.id] = fl.definitionExpression;
      }
    });
    this.initExpressions();
    this.handleURLParams();
  }

  async handleZoomTo(layerExpression: LayerExpression): Promise<void> {
    const zoomId = layerExpression?.sublayerId ? `#zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `#zoom-to-${layerExpression.id}`;
    const zoomToBtn = this.panelEl.querySelector(zoomId) as HTMLCalciteButtonElement;

    const toggleZoomButtonState = (isLoading: boolean, isDisabled: boolean) => {
      if (zoomToBtn) {
        zoomToBtn.loading = isLoading;
        zoomToBtn.disabled = isDisabled;
      }
    };

    toggleZoomButtonState(true, true);

    await this.getZoomToExtent(layerExpression);
    const goToOptions = this.zoomToExtent.type === 'point' && this.zoomToExtent.count === 1 ? { target: this.zoomToExtent.extent, zoom: 10 } : this.zoomToExtent.extent;

    await this.view.goTo(goToOptions);

    toggleZoomButtonState(false, false);
  }

  async getZoomToExtent(layerExpression: LayerExpression): Promise<void> {
    const layerView = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id) as QueryableLayerView;
    const baseLayer = layerView.layer as FilterLayer;
    const layer = baseLayer.type === 'map-image' ? baseLayer.findSublayerById(layerExpression.sublayerId) : baseLayer;

    if (layer.type !== 'point-cloud' && supportedTypes.includes(layer?.type)) {
      const queryLayer = await this.getQueryLayer(layer);
      const query = queryLayer.createQuery();
      query.where = queryLayer.definitionExpression ?? '1=1';
      const results = await queryLayer.queryExtent(query);
      this.zoomToExtent = { ...results, type: queryLayer.geometryType };
    }
  }

  applyFilterToQuery(query: __esri.Query, layerExpression: LayerExpression): void {
    const layerView = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id) as QueryableLayerView;
    const filter = layerView?.featureEffect?.filter ?? layerView.filter;

    if (filter) {
      ['objectIds', 'distance', 'geometry', 'spatialRelationship', 'units', 'where', 'timeExtent'].forEach(prop => {
        if (filter[prop] != null) {
          query[prop] = filter[prop];
        }
      });
    }
  }

  generateOutput(layerExpression: LayerExpression): void {
    if (this.view == null) return;
    const defExpressions: string[] = [];
    let filters: PointCloudFilters = [];
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

  scientificRounding(num: number, decimalPlaces: number, operation: 'floor' | 'ceil' | 'round'): number | undefined {
    if (num == null) return undefined;
    let result: number;

    if (!String(num).includes('e')) {
      result = Math[operation](num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    } else {
      const [base, exponent] = String(num)
        .split('e')
        .map(item => Number(item));
      const adjustedExponent = exponent + decimalPlaces;
      const adjustedNumber = Math[operation](+`${base}e${adjustedExponent}`);
      result = adjustedNumber * Math.pow(10, -decimalPlaces);
    }

    return +result.toFixed(decimalPlaces);
  }

  roundMinNumberDown(num: number, decimalPlaces: number): number | undefined {
    return this.scientificRounding(num, decimalPlaces, 'floor');
  }

  roundMaxNumberUp(num: number, decimalPlaces: number): number | undefined {
    return this.scientificRounding(num, decimalPlaces, 'ceil');
  }

  roundNumber(num: number, decimalPlaces: number): number {
    return this.scientificRounding(num, decimalPlaces, 'round') ?? num;
  }

  setExpressionFormat(layer: __esri.FeatureLayer, expression: Expression, field: string): void {
    if (layer?.popupTemplate != null) {
      const fieldInfo = layer.popupTemplate.fieldInfos.find(({ fieldName }) => fieldName === field);
      expression.format = fieldInfo?.format;
    }
  }

  getInitDefExprFromLayer(layer: FilterLayer): string {
    return layer.type === 'sublayer' ? this.initMapImageExpressions?.[layer.layer.id]?.[layer.id] : this.initDefExpressions?.[layer.id];
  }

  getInitDefExprFromLayerExpression(layerExpression: LayerExpression): string {
    return layerExpression?.sublayerId != null ? this.initMapImageExpressions?.[layerExpression.id]?.[layerExpression.sublayerId] : this.initDefExpressions?.[layerExpression.id];
  }

  findFilterLayer(layerExpression: LayerExpression): QueryableLayer {
    const allLayersAndTables = this.view.map.allLayers.concat(this.view.map.allTables);
    const layer = allLayersAndTables.find(({ id }) => id === layerExpression.id) as FilterLayer;
    if (layer.type === 'map-image') {
      return layer?.findSublayerById(layerExpression.sublayerId);
    } else {
      return layer as QueryableLayer;
    }
  }

  createLabel(expression: Expression, value: string | number): string | number {
    if (expression.type === 'coded-value') {
      return expression.codedValues?.[value] as string;
    }

    if (expression.type === 'number' && typeof value === 'number') {
      let formattedValue = value;
      if (expression.format?.places != null) {
        formattedValue = this.roundNumber(value, expression.format.places);
      }
      if (expression.format?.digitSeparator) {
        return this.numberWithCommas(formattedValue);
      }
      return formattedValue;
    }

    if (expression.type === 'date' && !expression.dateOnly) {
      const format = this.intl.convertDateFormatToIntlOptions('short-date-long-time');
      return this.intl.formatDate(value as number, format);
    }

    return value;
  }

  buildDateExpression(date: string | number | undefined, field: string): string | undefined {
    if (date) {
      const tmpDate = new Date(date);
      const tmpCompareDate = new Date(date);
      const tmpCompareDate1 = new Date(tmpCompareDate.setDate(tmpDate.getDate() + 1));
      const formattedDate = `${tmpDate.getFullYear()}-${tmpDate.getMonth() + 1}-${tmpDate.getDate()}`;
      const time = `${tmpDate.getHours()}:${tmpDate.getMinutes()}:${tmpDate.getSeconds()}`;
      const compareTime = `${tmpCompareDate1.getHours()}:${tmpCompareDate1.getMinutes()}:${tmpCompareDate1.getSeconds()}`;
      const compareFormattedDate = `${tmpCompareDate1.getFullYear()}-${tmpCompareDate1.getMonth() + 1}-${tmpCompareDate1.getDate()}`;

      return `${field} BETWEEN '${formattedDate} ${time}' AND '${compareFormattedDate} ${compareTime}'`;
    }

    return;
  }

  async getQueryLayer(layer: QueryableLayer): Promise<BaseQueryableLayer> {
    return layer.type === 'sublayer' ? await layer.createFeatureLayer() : layer;
  }

  applyCacheHint(queryLayer: QueryableLayer, query: __esri.Query) {
    if ((queryLayer as any)?.capabilities?.query?.supportsCacheHint) {
      query.cacheHint = true;
    }
  }

  applyQueryGeometryFromExtentSelector(query: __esri.Query): void {
    if (!this.extentSelector || !this.extentSelectorConfig) return;

    const geometry = this.getExtent(this.extentSelector, this.extentSelectorConfig);
    if (!geometry) return;
    query.geometry = geometry;
    query.spatialRelationship = 'intersects';
  }
}
