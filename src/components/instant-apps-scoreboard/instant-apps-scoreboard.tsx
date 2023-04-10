// @stencil/core
import { Component, Host, h, Prop, State, Element, Watch, Event, EventEmitter } from '@stencil/core';

// esri-loader
import { loadModules } from 'esri-loader';

// Utils
import { getLocaleComponentStrings } from '../../utils/locale';

// Types
import {
  Scoreboard,
  ScoreboardData,
  ScoreboardItem,
  ScoreboardState,
  ScoreboardPosition,
  ScoreboardMode,
  ScoreboardIcons,
  ScoreboardAlignment,
  ScoreboardScale,
  ScoreboardAppearance,
  AcceptableLayers,
  AcceptableLayerViews,
} from './types/interfaces';

// T9n
import Scoreboard_t9n from '../../assets/t9n/instant-apps-scoreboard/resources.json';

// Constants
const ITEM_LIMIT = 6;
const BASE = 'instant-apps-scoreboard';
const KEY_PREFIX = `${BASE}--`;
const __BASE__ = `${BASE}__`;
const CSS = {
  BASE,
  itemsContainer: `${__BASE__}items-container`,
  items: `${__BASE__}items`,
  item: `${__BASE__}item`,
  label: `${__BASE__}item-label`,
  value: `${__BASE__}item-value`,
  valuePlaceholder: `${__BASE__}item-value-placeholder`,
  position: {
    bottom: `${__BASE__}position--bottom`,
    side: `${__BASE__}position--side`,
    left: `${__BASE__}position--left`,
    right: `${__BASE__}position--right`,
  },
  mode: {
    floating: `${__BASE__}mode--floating`,
    pinned: `${__BASE__}mode--pinned`,
  },
};

@Component({
  tag: 'instant-apps-scoreboard',
  styleUrl: 'instant-apps-scoreboard.scss',
  shadow: true,
})
export class InstantAppsScoreboard {
  // Variables
  initialCalculate: boolean = false; // Flag to check for initial calculation
  reactiveUtils: __esri.reactiveUtils;
  Collection: typeof import('esri/core/Collection');
  handles: __esri.Handles;
  intl: __esri.intl;

  // Host element
  @Element() el: HTMLElement;

  // Public properties

  /**
   * MapView or SceneView to reference extent, viewpoint, and layers in map to perform calculations.
   */
  @Prop() view: __esri.MapView | __esri.SceneView;

  /**
   * Data on layers, field attribute info, operations, for each scoreboard item
   */
  @Prop() data: ScoreboardData;

  /**
   * Position of scoreboard i.e. 'bottom', 'left', or 'right'.
   */
  @Prop() position: ScoreboardPosition = Scoreboard.Bottom;

  /**
   * Mode of scoreboard i.e. 'floating' or 'pinned'.
   */
  @Prop() mode: ScoreboardMode = Scoreboard.Floating;

  // Internal state
  @State() state: ScoreboardState = Scoreboard.Loading;

  @State() messages: typeof Scoreboard_t9n;

  @State() itemIndex = 0;

  @State() layers: __esri.Collection<__esri.FeatureLayer | __esri.SceneLayer>;

  @State() layerViews: __esri.Collection<__esri.FeatureLayerView | __esri.SceneLayerView>;

  // Events

  /**
   * Emits when scoreboard data has been calculated and updated.
   */
  @Event({
    eventName: 'scoreboardDataUpdated',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  scoreboardDataUpdated: EventEmitter<ScoreboardData>;

  scoreboardDataUpdatedHandler(): void {
    this.scoreboardDataUpdated.emit(this.data);
  }

  // Watchers
  @Watch('data')
  protected generateUIDs(): void {
    // Generates a series of UIDs (unique identifiers) to ensure each item is unique to properly handle comparisons
    this.itemIndex = 0;
    const { items } = this.data;
    items.forEach(this.generateUID());
  }

  @Watch('data')
  protected storeLayers(): void {
    this.state = Scoreboard.Calculating;
    const layerIds = this.data.items.map(item => item?.layer?.id);
    const isNotTable = (layer: __esri.Layer) => !(layer as any).isTable;
    const isAcceptableLayer = (layer: __esri.Layer) => layer.type === 'feature' || layer.type === 'scene';
    const notAddedYet = (layer: __esri.Layer) => layerIds.indexOf(layer.id) > -1;
    const validateLayer = (layer: __esri.Layer) => isNotTable(layer) && isAcceptableLayer(layer) && notAddedYet(layer);
    this.layers = this.view.map.allLayers.filter(layer => validateLayer(layer)) as __esri.Collection<__esri.FeatureLayer | __esri.SceneLayer>;
  }

  @Watch('layers')
  protected async storeLayerViews(): Promise<void> {
    if (this.layers.length > 0) {
      this.layers.forEach(layer => (layer.outFields = ['*']));
      const promises: Promise<AcceptableLayerViews>[] = [];
      this.layers.forEach(layer => {
        const layerToLoad = layer as AcceptableLayers;
        const layerViewToLoad = this.view.whenLayerView(layerToLoad) as Promise<unknown>;
        promises.push(layerViewToLoad as Promise<AcceptableLayerViews>);
      });
      const settledPromises = await Promise.allSettled(promises);
      const fulfilledPromises: PromiseSettledResult<AcceptableLayerViews>[] = settledPromises.filter(promise => promise.status == 'fulfilled' && promise.value);
      const layerViews = fulfilledPromises.map(fulfilledPromise => (fulfilledPromise as PromiseFulfilledResult<AcceptableLayerViews>).value);
      const layerViewUpdatePromises: Promise<boolean>[] = [];
      layerViews.forEach(layerView => layerViewUpdatePromises.push(this.reactiveUtils.whenOnce(() => !layerView.updating)));
      await Promise.all(layerViewUpdatePromises);
      this.layerViews = new this.Collection([...layerViews]);
    }
  }

  @Watch('layerViews')
  protected async calculateScoreboardData(): Promise<void> {
    if (this.layers.length === 0 || this.layerViews.length === 0) return;

    this.state = Scoreboard.Calculating;

    const data_temp = { items: [...this.data.items] };

    const queryFeaturePromises: Promise<__esri.FeatureSet>[] = [];
    this.queryStatDefinitions(data_temp, queryFeaturePromises);

    const queryFeaturesRes = await Promise.all(queryFeaturePromises);
    this.handleQueryFeaturesResponses(queryFeaturesRes, data_temp);

    this.data.items = [...data_temp.items];

    this.state = Scoreboard.Complete;

    this.scoreboardDataUpdatedHandler();

    if (!this.initialCalculate) this.initialCalculate = true;
  }

  // Lifecycle methods
  async componentWillLoad(): Promise<void> {
    try {
      this.state = Scoreboard.Loading;
      await this.initMessages();
    } catch {
      this.state = Scoreboard.Disabled;
      return Promise.reject();
    } finally {
      if (!this.view || !this.data) {
        this.state = Scoreboard.Disabled;
        return Promise.reject();
      } else {
        try {
          await this.initModules();
          return Promise.resolve();
        } catch {
          this.state = Scoreboard.Disabled;
          return Promise.reject();
        }
      }
    }
  }

  async componentDidLoad(): Promise<void> {
    if (this.state === Scoreboard.Disabled) return;
    try {
      await this.reactiveUtils.whenOnce(() => this.view?.ready);
      this.generateUIDs();
      await this.loadMapResources();
      this.storeLayers();
    } catch {
      this.state = Scoreboard.Disabled;
      console.error(`${BASE}: FAILED TO LOAD MAP RESOURCES`);
    }
  }

  // Initialize
  protected async initMessages(): Promise<void> {
    let messages: typeof Scoreboard_t9n;
    try {
      const res = await getLocaleComponentStrings(this.el);
      messages = res[0] as typeof Scoreboard_t9n;
      this.messages = {
        ...this.messages,
        ...messages,
      };
      return Promise.resolve();
    } catch (err) {
      console.error('FAILED TO LOAD MESSAGES');
      Promise.reject();
    }
  }

  protected async initModules(): Promise<void> {
    try {
      const [Handles, reactiveUtils, Collection, intl] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils', 'esri/core/Collection', 'esri/intl']);

      // Store modules for future use
      this.reactiveUtils = reactiveUtils;
      this.Collection = Collection;
      this.intl = intl;

      // Instantiate handles and collections
      this.handles = new Handles();
      this.layers = new Collection();
      this.layerViews = new Collection();
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      this.state = Scoreboard.Disabled;
      return Promise.reject();
    }
  }

  protected async loadMapResources(): Promise<void> {
    const { map } = this.view;
    const webItem = map as __esri.WebMap | __esri.WebScene;
    try {
      await webItem.loadAll();
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      this.state = Scoreboard.Disabled;
      return Promise.reject();
    }
  }

  protected generateUID(): (item: ScoreboardItem) => void {
    return (item: ScoreboardItem) => {
      // Generates a random number to be used for radix in Number.toString()
      const randNum = Math.random();
      const randomInt = Math.floor(Math.random() * 10) + 11;

      // Generates a random string of characters - remove redundant '0.';
      const randStr = randNum.toString(randomInt).replace('0.', '');
      const uid = randStr;
      item['uid'] = uid;
    };
  }

  // Start of render methods
  render(): HTMLInstantAppsScoreboardElement {
    const { state } = this;
    const isLoading = state === Scoreboard.Loading;
    const isCalculating = state === Scoreboard.Calculating;
    const isDisabled = state === Scoreboard.Disabled;
    const progress = isLoading || isCalculating ? this.renderProgress() : null;
    const positionClass = this.getPositionClass;
    const styleClass = this.getStyleClass;
    return <Host class={`${positionClass} ${styleClass}`}>{isDisabled ? this.renderNotice() : [progress, this.renderBase()]}</Host>;
  }

  renderBase(): HTMLDivElement {
    return <div class={BASE}>{this.renderContent()}</div>;
  }

  renderContent(): HTMLCalciteLoaderElement | HTMLDivElement | null {
    const { state } = this;
    return state === Scoreboard.Loading ? this.renderLoader() : state === Scoreboard.Calculating || state === Scoreboard.Complete ? this.renderItemsContainer() : null;
  }

  renderItemsContainer(): HTMLDivElement {
    const [previousButton, nextButton] = this.renderPreviousNextButtons();
    return (
      <div class={CSS.itemsContainer}>
        {previousButton}
        {this.renderItems()}
        {nextButton}
      </div>
    );
  }

  renderPreviousNextButtons(): HTMLCalciteActionElement[] {
    const isBelowOrAtLimit = this.data?.items?.length <= ITEM_LIMIT;
    const isBeginning = this.itemIndex === 0;
    const isEnd = this.isEnd;
    const isBottom = this.position === Scoreboard.Bottom;
    const iconPosition = isBottom ? ScoreboardAlignment.Start : ScoreboardAlignment.Center;
    const previous = isBottom ? ScoreboardIcons.Left : ScoreboardIcons.Up;
    const next = isBottom ? ScoreboardIcons.Right : ScoreboardIcons.Down;
    const iconType = { previous, next };
    const previousIcon = isBeginning || isBelowOrAtLimit ? ScoreboardIcons.Blank : iconType.previous;
    const nextIcon = isEnd || isBelowOrAtLimit ? ScoreboardIcons.Blank : iconType.next;
    const isDisabled = { previous: isBeginning || isBelowOrAtLimit, next: isEnd || isBelowOrAtLimit };
    const appearance = ScoreboardAppearance.Transparent;
    const scale = ScoreboardScale.Large;
    return [
      <calcite-action onclick={this.previousItem.bind(this)} icon={previousIcon} disabled={isDisabled.previous} alignment={iconPosition} scale={scale} appearance={appearance} />,
      <calcite-action onclick={this.nextItem.bind(this)} icon={nextIcon} disabled={isDisabled.next} alignment={iconPosition} scale={scale} appearance={appearance} />,
    ];
  }

  renderItems(): HTMLUListElement {
    const { items } = CSS;
    const dataToDisplay = this.getItemsToDisplay;
    const scoreboardItems = dataToDisplay.map(item => this.renderItem(item));
    return <ul class={items}>{scoreboardItems}</ul>;
  }

  renderItem(scoreboardItem: ScoreboardItem): HTMLLIElement {
    const { label } = scoreboardItem;
    return (
      <li class={CSS.item}>
        <span class={CSS.label} title={label}>
          {label}
        </span>
        {this.renderValue(scoreboardItem)}
      </li>
    );
  }

  renderValue(scoreboardItem: ScoreboardItem): HTMLSpanElement {
    const { displayValue } = scoreboardItem;
    const showPlaceholder = !displayValue && this.state === Scoreboard.Calculating && !this.initialCalculate;
    const valueToDisplay = displayValue ? displayValue : this.messages?.noData;
    const isComplete = this.state === Scoreboard.Complete;
    const isLoading = this.state === Scoreboard.Loading;
    const content = showPlaceholder ? this.renderValuePlaceholder() : isComplete || isLoading ? valueToDisplay : '';
    return <span class={CSS.value}>{content}</span>;
  }

  renderValuePlaceholder(): HTMLSpanElement {
    return <span class={CSS.valuePlaceholder} />;
  }

  renderProgress(): HTMLCalciteProgressElement {
    const key = `${KEY_PREFIX}calcite-`;
    return <calcite-progress key={`${key}progress`} type="indeterminate" />;
  }

  renderLoader(): HTMLCalciteLoaderElement {
    const key = `${KEY_PREFIX}calcite-`;
    const loading = this.messages?.loading;
    return <calcite-loader key={`${key}loader`} label={loading} text={loading} scale="m" />;
  }

  renderNotice(): HTMLCalciteNoticeElement {
    const errMessages = this.messages?.error;
    return (
      <calcite-notice closable open icon={ScoreboardIcons.Warning} kind={Scoreboard.Warning}>
        <div slot="title">{errMessages?.title}</div>
        <div slot="message">{errMessages?.message}</div>
      </calcite-notice>
    );
  }

  // End of render methods

  // Getters
  protected get getPositionClass(): string {
    const { bottom, left, right, side } = CSS.position;
    const leftRight = `${this.position === Scoreboard.Left ? left : right} ${side}`;
    return this.position === Scoreboard.Bottom ? bottom : leftRight;
  }

  protected get getStyleClass(): string {
    const { floating, pinned } = CSS.mode;
    return this.mode === Scoreboard.Floating ? floating : pinned;
  }

  protected get getItemsToDisplay(): ScoreboardItem[] {
    return this.data.items.slice(this.itemIndex, ITEM_LIMIT + this.itemIndex);
  }

  get isEnd(): boolean {
    const lastItems = this.data.items.slice(this.data.items.length - ITEM_LIMIT);
    const uidsOfLast = lastItems.map(item => item['uid']);
    const uidsOfCurrent = this.data.items.slice(this.itemIndex, this.itemIndex + ITEM_LIMIT).map(item => item['uid']);
    return uidsOfLast.every((val, index) => val === uidsOfCurrent[index]);
  }

  // UI interactions
  protected previousItem(): void {
    this.itemIndex = this.itemIndex - 1;
  }

  protected nextItem(): void {
    this.itemIndex = this.itemIndex + 1;
  }

  // Query statistic definitions (FeatreLayerView/SceneLayerView.queryFeatures())
  protected queryStatDefinitions(data: ScoreboardData, queryFeaturePromises: Promise<__esri.FeatureSet>[]): void {
    const getStatsDefinition: (item: ScoreboardItem) => __esri.StatisticDefinition = (item: ScoreboardItem): __esri.StatisticDefinition => {
      const { field, operation } = item;
      const onStatisticField = field;
      const outStatisticFieldName = `${field}_${operation}`;
      const statisticType = operation;
      return { onStatisticField, outStatisticFieldName, statisticType } as __esri.StatisticDefinition;
    };

    const getStatDefinitionQuery = (layerView: __esri.FeatureLayerView | __esri.SceneLayerView, statDefinition: __esri.StatisticDefinition) => {
      const query = layerView.createQuery();
      const outStatistics = [statDefinition];
      const geometry = this.view.extent;
      query.outStatistics = outStatistics;
      query.geometry = geometry;
      return query;
    };

    const queryFeaturesForItem_LayerView: () => (item: ScoreboardItem) => Promise<void> = () => {
      return async (item: ScoreboardItem) => {
        const layerView = this.layerViews.find(layerView => layerView.layer.id === item?.layer?.id);
        if (!layerView) return;

        const statDefinition = getStatsDefinition(item);

        const query = getStatDefinitionQuery(layerView, statDefinition);

        const queryFeaturesRes = layerView.queryFeatures(query);
        queryFeaturePromises.push(queryFeaturesRes);
      };
    };

    data.items.forEach(queryFeaturesForItem_LayerView());
  }

  protected handleQueryFeaturesResponses(queryFeaturesRes: __esri.FeatureSet[], data: ScoreboardData) {
    const getValue: (stat: __esri.FeatureSet) => number = (stat: __esri.FeatureSet): number => {
      const features = stat.features;
      const feature = features[0];
      const { attributes } = feature;
      const attrValues = Object.values(attributes);
      return attrValues[0] as number;
    };

    const getNumberFormatOptions: () => Intl.NumberFormatOptions = (): Intl.NumberFormatOptions => {
      const notation = 'compact';
      const compactDisplay = 'short';
      return { notation, compactDisplay };
    };

    const updateItemValue: () => (stat: __esri.FeatureSet, statIndex: number) => void = () => {
      return (stat: __esri.FeatureSet, statIndex: number) => {
        const value = getValue(stat);
        const numberFormatOptions = getNumberFormatOptions();
        const formattedNumber = this.intl.formatNumber(value, numberFormatOptions);
        data.items[statIndex].displayValue = `${formattedNumber}`;
        data.items[statIndex].value = value;
      };
    };

    queryFeaturesRes.forEach(updateItemValue());
  }
}
