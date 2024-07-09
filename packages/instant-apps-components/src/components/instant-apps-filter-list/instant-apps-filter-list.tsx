import { CalciteCheckboxCustomEvent, CalciteInputDatePickerCustomEvent } from '@esri/calcite-components';
import { Component, Element, Event, EventEmitter, Host, Prop, State, VNode, Watch, h } from '@stencil/core';

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
      this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
      this.handleLayerExpressionsUpdate();
      this.hasLayerExpression = true;
    }
  }

  geometryJsonUtils: typeof __esri.JSONSupport;
  intl: __esri.intl;
  locale: string;
  panelEl: HTMLCalcitePanelElement;
  reactiveUtils: __esri.reactiveUtils;
  zoomToGraphics: __esri.Graphic[];

  async componentWillLoad(): Promise<void> {
    this.baseClass = getMode(this.el) === 'dark' ? baseClassDark : baseClassLight;
    await this.initializeModules();
    getMessages(this);
    this.hasLayerExpression = this.layerExpressions != null;
    this.filterLayerExpressions = this.layerExpressions != null ? JSON.parse(JSON.stringify(this.layerExpressions)) : undefined;
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
      this.filterLayerExpressions = JSON.parse(JSON.stringify(this.layerExpressions));
      this.handleLayerExpressionsUpdate();
      this.hasLayerExpression = true;
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
    this.intl = intl;

    return Promise.resolve();
  }

  render(): VNode {
    const filterConfig = this.loading ? this.renderLoading() : this.initFilterConfig();
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
    const { type } = expression;
    if (type === 'string' || type == 'coded-value') {
      return this.renderCombobox(layerExpression, expression);
    } else if (type === 'number' || type == 'range') {
      if (expression?.numDisplayOption === 'drop-down' || expression?.displayOption === 'drop-down') {
        return this.renderCombobox(layerExpression, expression);
      }
      return this.renderNumberSlider(layerExpression, expression);
    } else if (type === 'date') {
      if (expression?.displayOption === 'drop-down') {
        return this.renderCombobox(layerExpression, expression);
      }
      return this.renderDatePicker(layerExpression, expression);
    }
    return;
  }

  async initExpressions(): Promise<void> {
    this.loading = true;
    if (this.filterLayerExpressions == null) return;
    const tmpLE = this.filterLayerExpressions;
    for (let i = 0; i < tmpLE?.length; i++) {
      const expressions = tmpLE[i].expressions;
      for (let j = 0; j < expressions?.length; j++) {
        if (expressions[j].active == null && expressions[j].definitionExpression != null) {
          expressions[j].active = false;
        }
        await this.setInitExpression(tmpLE[i], expressions[j]);
      }
    }
    this.loading = false;
    this.filterLayerExpressions = [...tmpLE];
  }

  handleResetFilter(): void {
    this.filterLayerExpressions?.forEach(layerExpression => {
      layerExpression.expressions?.forEach(expression => {
        const { type } = expression;
        if (type === 'string' || type === 'coded-value') {
          this.resetCombobox(expression);
        } else if (type === 'date') {
          if (expression?.numDisplayOption === 'drop-down' || expression?.displayOption === 'drop-down') {
            this.resetCombobox(expression);
          } else {
            this.resetDatePicker(expression);
          }
        } else if (type === 'number' || type === 'range') {
          if (expression?.numDisplayOption === 'drop-down' || expression?.displayOption === 'drop-down') {
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
    const allLayersAndTables = this.view?.map?.allLayers?.concat(this.view?.map?.allTables);
    allLayersAndTables?.forEach(layer => {
      if (supportedTypes.includes(layer.type)) {
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
      }
    });
  }

  async updateStringExpression(layerExpression: LayerExpression, expression: Expression): Promise<boolean> {
    const { field, type } = expression;
    const layer = this.findFilterLayer(layerExpression);
    expression.fields = await this.getFeatureAttributes(layer, field);
    if (type === 'date') {
      const layerField = layer.fields.find(({ name }) => name === field);
      if (layerField?.type === 'date-only') {
        expression.dateOnly = true;
      }
    }
    if (expression?.selectedFields) {
      const selectedFields = expression.selectedFields.map((field: string | number) => (typeof field === 'number' ? field : `'${handleSingleQuote(field)}'`));
      expression.definitionExpression = `${field} IN (${selectedFields.join(',')})`;

      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async updateNumberExpression(layerExpression: LayerExpression, expression: Expression): Promise<boolean> {
    if ((!expression?.min && expression?.min !== 0) || (!expression?.max && expression?.max !== 0)) {
      const layer = this.findFilterLayer(layerExpression);
      const { field } = expression;
      if (field != null) {
        this.setExpressionFormat(layer as __esri.FeatureLayer, expression, field);
        if (expression?.numDisplayOption === 'drop-down' || expression?.displayOption === 'drop-down') {
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
      if ((layer as any)?.capabilities?.query?.['supportsCacheHint']) {
        query.cacheHint = true;
      }
      if (field) {
        const initDefExpr = this.getInitDefExprFromLayer(layer);
        query.where = initDefExpr || '1=1';
        query.outFields = [field];
        query.orderByFields = [`${field} ASC`];
        query.returnDistinctValues = true;
        query.returnGeometry = false;
        query.maxRecordCountFactor = 5;
        if (this.extentSelector && this.extentSelectorConfig) {
          const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
          if (geo != null) query.geometry = geo;
          query.spatialRelationship = 'intersects';
        }

        const features = (await this.queryForFeatures(layer, query, field)) as string[];

        if (features?.length) {
          return [...new Set(features)].sort();
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
      let initDefExpr = this.getInitDefExprFromLayer(layer);
      query.where = initDefExpr || '1=1';
      if ((layer as any)?.capabilities?.query?.supportsCacheHint) {
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
        const tmpExtent = 'extent' in geometry ? geometry : this.geometryJsonUtils.fromJSON(geometry);
        if (tmpExtent?.type === 'extent' || tmpExtent?.type === 'polygon') {
          return tmpExtent;
        }
      }
    }
    return;
  }

  setInitExpression(layerExpression: LayerExpression, expression: Expression): Promise<void> {
    if (expression.field && expression.type) {
      const filterLayer = this.findFilterLayer(layerExpression);
      if (filterLayer == null) {
        return Promise.resolve();
      }
      if (filterLayer.loadStatus === 'not-loaded' || filterLayer.loadStatus === 'failed') {
        filterLayer.load();
      }
      return filterLayer.when(async () => {
        const layerField = filterLayer.fields?.find(({ name }) => name === expression.field);
        const domainType = layerField?.domain?.type;
        expression.type = domainType === 'coded-value' || domainType === 'range' ? domainType : expression.type;
        await this.updateExpression(layerExpression, expression, layerField);
      });
    } else {
      this.updateExpression(layerExpression, expression, undefined);
      return Promise.resolve();
    }
  }

  async updateExpression(layerExpression: LayerExpression, expression: Expression, layerField: __esri.Field | undefined): Promise<void> {
    let update = false;
    const { type } = expression;
    if (type === 'string') {
      update = await this.updateStringExpression(layerExpression, expression);
    } else if (type === 'number') {
      update = await this.updateNumberExpression(layerExpression, expression);
    } else if (type === 'date') {
      if (expression.displayOption === 'drop-down') {
        update = await this.updateStringExpression(layerExpression, expression);
      } else {
        update = await this.updateDateExpression(layerExpression, expression);
      }
    } else if (type === 'coded-value') {
      update = this.updateCodedValueExpression(expression, layerField);
    } else if (type === 'range') {
      if (expression.displayOption === 'drop-down') {
        update = await this.updateStringExpression(layerExpression, expression);
      } else {
        update = this.updateRangeExpression(expression, layerField);
      }
    } else if (expression.active && (type === 'checkbox' || type == null)) {
      update = true;
    }
    if (update) {
      this.generateOutput(layerExpression);
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
    if (items && items.length) {
      const values = items.map(({ value }) => (typeof value === 'number' ? value : `'${handleSingleQuote(value)}'`));
      if (type === 'date') {
        expression.selectedFields = items.map(({ value }) => value);
        expression.definitionExpression = values.map(value => this.buildDateExpression(value, field!)).join(' OR ');
      } else {
        expression.selectedFields = items.map(({ value }) => value);
        const definitionExpression = `${field} IN (${values.join(',')})`;
        expression.definitionExpression = definitionExpression;
      }
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

      this.generateOutput(layerExpression);
    }
  }

  handleURLParams(): void {
    if ('URLSearchParams' in window) {
      const params = new URLSearchParams(document.location.search);
      const filters = params.get('filter')?.split(';');
      let filterCount = 0;
      filters?.forEach(filter => {
        const tmpFilter = JSON.parse(filter) as FilterParam;
        this.filterLayerExpressions?.forEach(layerExpression => {
          if (tmpFilter?.layerId === layerExpression.id) {
            layerExpression.expressions?.forEach(expression => {
              if (expression.id?.toString() === tmpFilter?.expressionId?.toString()) {
                expression.active = true;
                filterCount++;
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
      this.filterCount = filterCount;
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
      let filterCount = 0;
      this.filterLayerExpressions?.forEach(layerExpr => {
        layerExpr?.expressions?.forEach(expression => {
          if (expression.active) {
            filterCount++;
            const paramExpression = this.createURLParamExpression(layerExpr, expression);
            expressions.push(JSON.stringify(paramExpression));
          }
        });
      });
      this.filterCount = filterCount;
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

  updateFilterLayerDefExpression(layer: FilterQueryLayer, defExpressions: string[], layerExpression: LayerExpression): void {
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
    const layersAndTables = map.allLayers.concat(map.allTables);
    for (let i = 0; i < layersAndTables.length; i++) {
      const layer = layersAndTables.getItemAt(i);
      if (supportedTypes.includes(layer.type)) {
        const fl = layer as FilterLayer;
        if (fl.type === 'point-cloud') {
          this.initPointCloudFilters[fl.id] = fl.filters;
        } else if (fl.type === 'map-image') {
          this.initMapImageExpressions[fl.id] = {};
          fl.allSublayers.forEach(sublayer => {
            this.initMapImageExpressions[fl.id][sublayer.id] = sublayer.definitionExpression;
          });
        } else {
          this.initDefExpressions[fl.id] = fl.definitionExpression;
        }
      }
    }

    this.initExpressions();
    this.handleURLParams();
  }

  async handleZoomTo(layerExpression: LayerExpression): Promise<void> {
    const zoomId = layerExpression?.sublayerId ? `#zoom-to-${layerExpression.id}-${layerExpression.sublayerId}` : `#zoom-to-${layerExpression.id}`;
    const zoomToBtn = this.panelEl.querySelector(zoomId) as HTMLCalciteButtonElement;
    if (zoomToBtn != null) {
      zoomToBtn.loading = true;
      zoomToBtn.disabled = true;
    }
    this.zoomToGraphics = [];
    let loadingTime = 0;
    let startGoTo = false;
    const zoomToInterval = setInterval(() => {
      if (loadingTime >= 1000 && startGoTo) {
        this.view.goTo(this.zoomToGraphics);
        if (zoomToBtn != null) {
          zoomToBtn.loading = false;
          zoomToBtn.disabled = false;
        }
        clearInterval(zoomToInterval);
      }
      loadingTime += 500;
    }, 500);
    await this.getZoomToGraphics(layerExpression);
    startGoTo = true;
  }

  async getZoomToGraphics(layerExpression: LayerExpression): Promise<void> {
    const lv = this.view.allLayerViews.find(({ layer }) => layer.id === layerExpression.id) as FilterQueryLayerView;
    const layer = lv.layer as FilterLayer;
    const queryLayer = layer.type === 'map-image' ? layer.findSublayerById(layerExpression.sublayerId) : layer;
    if (queryLayer.type !== 'point-cloud' && supportedTypes.includes(queryLayer?.type)) {
      const query = queryLayer.createQuery();
      if ((layer as any)?.capabilities?.query?.['supportsCacheHint']) {
        query.cacheHint = true;
      }
      query.where = queryLayer.definitionExpression ?? '1=1';
      query.returnGeometry = true;
      query.returnDistinctValues = true;
      query.maxRecordCountFactor = 5;
      query.returnExceededLimitFeatures = true;
      query.outFields = [];
      if (this.extentSelector && this.extentSelectorConfig) {
        const geo = this.getExtent(this.extentSelector, this.extentSelectorConfig);
        if (geo != null) query.geometry = geo;
        query.spatialRelationship = 'intersects';
      }
      const filter = lv?.featureEffect?.filter != null ? lv.featureEffect.filter : lv.filter;
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
        const results = await queryLayer.queryFeatures(query);
        this.zoomToGraphics.push(...results.features);
      } catch (error) {
        if (error?.message?.toLowerCase().includes('distinct')) {
          try {
            query.returnDistinctValues = false;
            const results = await queryLayer.queryFeatures(query);
            this.zoomToGraphics.push(...results.features);
          } catch {}
        }
      }
    }
    return Promise.resolve();
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

  getInitDefExprFromLayer(layer: FilterLayer): string {
    return layer.type === 'sublayer' ? this.initMapImageExpressions?.[layer.layer.id]?.[layer.id] : this.initDefExpressions?.[layer.id];
  }

  getInitDefExprFromLayerExpression(layerExpression: LayerExpression): string {
    return layerExpression?.sublayerId != null ? this.initMapImageExpressions?.[layerExpression.id]?.[layerExpression.sublayerId] : this.initDefExpressions?.[layerExpression.id];
  }

  findFilterLayer(layerExpression: LayerExpression): FilterQueryLayer {
    const allLayersAndTables = this.view.map.allLayers.concat(this.view.map.allTables);
    const layer = allLayersAndTables.find(({ id }) => id === layerExpression.id) as FilterLayer;
    if (layer.type === 'map-image') {
      return layer?.findSublayerById(layerExpression.sublayerId);
    } else {
      return layer as FilterQueryLayer;
    }
  }

  createLabel(expression: Expression, value: string | number): string | number {
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
    } else if (expression.type === 'date' && !expression.dateOnly) {
      const format = expression.dateOnly ? this.intl.convertDateFormatToIntlOptions('short-date-long-time') : undefined;
      label = this.intl.formatDate(value as number, format);
    }
    return label;
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
}
