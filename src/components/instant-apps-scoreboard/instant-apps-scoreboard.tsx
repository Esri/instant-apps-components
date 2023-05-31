// @stencil/core
import { Component, Host, h, Prop, State, Element, Watch, Event, EventEmitter } from '@stencil/core';

// esri-loader
import { loadModules } from 'esri-loader';

// Utils
import { getLocaleComponentStrings } from '../../utils/locale';

// Types
import {
  Scoreboard,
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
import { widthBreakpoints } from '../../utils/breakpoints';

// Constants
const BASE = 'instant-apps-scoreboard';
const ITEM_LIMIT_FALLBACK = 6;
const KEY_PREFIX = `${BASE}--`;
const __BASE__ = `${BASE}__`;
const MOBILE_BREAKPOINT = widthBreakpoints.medium[1];
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
  reactiveUtils: __esri.reactiveUtils;
  Collection: typeof import('esri/core/Collection');
  handles: __esri.Handles | null;
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
  @Prop() items: ScoreboardItem[];

  /**
   * Position of scoreboard i.e. 'bottom', 'left', or 'right'.
   */
  @Prop() position: ScoreboardPosition = Scoreboard.Bottom;

  /**
   * Mode of scoreboard i.e. 'floating' or 'pinned'.
   */
  @Prop() mode: ScoreboardMode = Scoreboard.Floating;

  /**
   * Number of scoreboard items that can be viewed at a time. Minimum: 2, Maximum : 6.
   */
  @Prop() itemLimit: number = 6;

  // Internal state
  @State() state: ScoreboardState = Scoreboard.Loading;

  @State() messages: typeof Scoreboard_t9n;

  @State() itemIndex = 0;

  @State() layers: __esri.Collection<__esri.FeatureLayer | __esri.SceneLayer> | null;

  @State() layerViews: __esri.Collection<__esri.FeatureLayerView | __esri.SceneLayerView> | null;

  @State() isMobile = false;

  // Events

  /**
   * Emits when scoreboard item values have been calculated and updated.
   */
  @Event({
    eventName: 'scoreboardItemsUpdated',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  scoreboardItemsUpdated: EventEmitter<ScoreboardItem[]>;

  scoreboardItemsUpdatedHandler(): void {
    this.scoreboardItemsUpdated.emit(this.items);
  }

  // Watchers
  @Watch('items')
  protected generateUIDs(): void {
    // Generates a series of UIDs (unique identifiers) to ensure each item is unique to properly handle comparisons
    this.itemIndex = 0;
    this.items.forEach(this.generateUID());
  }

  @Watch('items')
  protected async storeLayers(): Promise<void> {
    this.state = Scoreboard.Calculating;
    await (this.view.map as __esri.WebMap | __esri.WebScene).loadAll();
    const layerIds = this.items.map(item => item?.layer?.id);
    const isNotTable = (layer: __esri.Layer) => !(layer as any).isTable;
    const isAcceptableLayer = (layer: __esri.Layer) => layer.type === 'feature' || layer.type === 'scene';
    const notAddedYet = (layer: __esri.Layer) => layerIds.indexOf(layer.id) > -1;
    const validateLayer = (layer: __esri.Layer) => isNotTable(layer) && isAcceptableLayer(layer) && notAddedYet(layer);
    this.layers = this.view.map.allLayers.filter(layer => validateLayer(layer)) as __esri.Collection<__esri.FeatureLayer | __esri.SceneLayer>;
    this.watchLayerVisibility();
  }

  @Watch('layers')
  protected async storeLayerViews(): Promise<void> {
    if (this.layers && this.layers.length > 0) {
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
      layerViews.forEach(layerView => layerViewUpdatePromises.push(this.reactiveUtils?.whenOnce(() => !layerView.updating)));
      await Promise.all(layerViewUpdatePromises);
      this.layerViews = new this.Collection([...layerViews]);
    }
  }

  @Watch('layerViews')
  protected async calculateScoreboardItemValues(): Promise<void> {
    if ((this.layers && this.layers.length === 0) || (this.layerViews && this.layerViews.length === 0)) return;

    this.state = Scoreboard.Calculating;

    const items_temp = [...this.items];

    const queryFeaturePromises: Promise<__esri.FeatureSet>[] = [];
    this.queryStatDefinitions(items_temp, queryFeaturePromises);

    const queryFeaturesRes = await Promise.all(queryFeaturePromises);
    this.handleQueryFeaturesResponses(queryFeaturesRes, items_temp);

    this.items.length = 0;
    items_temp.forEach(item => this.items.push(item));

    this.state = Scoreboard.Complete;

    this.scoreboardItemsUpdatedHandler();

    this.initStationaryWatcher();
  }

  // Lifecycle methods
  async componentWillLoad(): Promise<void> {
    const resizeObesrver = new ResizeObserver(() => {
      this.itemIndex = 0;
      this.isMobile = !!this.checkMobile;
    });
    resizeObesrver.observe(this.el?.parentElement as HTMLElement);
    try {
      this.state = Scoreboard.Loading;
      await this.initMessages();
    } catch {
      this.state = Scoreboard.Disabled;
      return Promise.reject();
    } finally {
      if (!this.view || !this.items) {
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
      await this.reactiveUtils?.whenOnce(() => this.view?.ready);
      this.generateUIDs();
      await this.loadMapResources();
      this.storeLayers();
      this.initViewUpdateWatcher();
    } catch {
      this.state = Scoreboard.Disabled;
      console.error(`${BASE}: FAILED TO LOAD MAP RESOURCES`);
    }
  }

  disconnectedCallback(): void {
    this.state = Scoreboard.Disabled;

    this.itemIndex = 0;

    this.layers?.removeAll();
    this.layers?.destroy();
    this.layers = null;

    this.layerViews?.removeAll();
    this.layerViews?.destroy();
    this.layerViews = null;

    this.handles?.removeAll();
    this.handles?.destroy();
    this.handles = null;
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
    const progress = isLoading || isCalculating || this.view?.updating ? this.renderProgress() : null;
    const positionClass = this.getPositionClass;
    const styleClass = this.getStyleClass;
    return <Host class={`${positionClass} ${styleClass}`}>{isDisabled ? null : [progress, this.items?.length > 0 ? this.renderBase() : null]}</Host>;
  }

  renderBase(): HTMLDivElement {
    return (
      <div key="instant-apps-scoreboard-base" class={BASE}>
        {this.renderContent()}
      </div>
    );
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
    const itemLimit = this.getItemLimit();
    const isBelowOrAtLimit = this.items.filter(item => item.visible)?.length <= itemLimit;
    const isBeginning = this.itemIndex === 0;
    const isEnd = this.isEnd;
    const isBottom = this.isMobile ? true : this.position === Scoreboard.Bottom;
    const iconPosition = isBottom ? ScoreboardAlignment.Start : ScoreboardAlignment.Center;
    const previous = isBottom ? ScoreboardIcons.Left : ScoreboardIcons.Up;
    const next = isBottom ? ScoreboardIcons.Right : ScoreboardIcons.Down;
    const iconType = { previous, next };
    const previousIcon = isBeginning || isBelowOrAtLimit ? ScoreboardIcons.Blank : iconType.previous;
    const nextIcon = isEnd || isBelowOrAtLimit ? ScoreboardIcons.Blank : iconType.next;
    const isDisabled = { previous: isBeginning || isBelowOrAtLimit, next: isEnd || isBelowOrAtLimit };
    const appearance = ScoreboardAppearance.Transparent;
    const scale = this.isMobile ? ScoreboardScale.Small : ScoreboardScale.Large;
    const t9n = {
      previous: this.messages?.previous,
      next: this.messages?.next,
    };
    return [
      <calcite-action
        onClick={this.previousItem.bind(this)}
        icon={previousIcon}
        disabled={isDisabled.previous}
        alignment={iconPosition}
        scale={scale}
        appearance={appearance}
        text={t9n.previous}
        label={t9n.previous}
      />,
      <calcite-action
        onClick={this.nextItem.bind(this)}
        icon={nextIcon}
        disabled={isDisabled.next}
        alignment={iconPosition}
        scale={scale}
        appearance={appearance}
        text={t9n.next}
        label={t9n.next}
      />,
    ];
  }

  renderItems(): HTMLUListElement {
    const { items } = CSS;
    const itemToDisplay = this.getItemsToDisplay;
    const scoreboardItems = itemToDisplay.map(item => this.renderItem(item));
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
    const isCalculating = this.state === Scoreboard.Calculating;
    const isDisabled = this.state === Scoreboard.Disabled;
    const showPlaceholder = displayValue === undefined && isCalculating;
    const valueToDisplay = displayValue ? displayValue : this.messages?.NA;
    const layer = this.layers?.find(layer => scoreboardItem?.layer?.id === layer.id);
    const isNotVisible = !layer?.visible;
    const content = showPlaceholder ? (
      this.renderValuePlaceholder()
    ) : !isDisabled ? (
      isNotVisible ? (
        <calcite-icon icon="view-hide" scale="l" title={this.messages?.layerVisibilityOff} />
      ) : (
        valueToDisplay
      )
    ) : (
      ''
    );
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

  // End of render methods

  // Getters
  protected get getPositionClass(): string {
    const { bottom, left, right, side } = CSS.position;
    const leftRight = `${this.position === Scoreboard.Left ? left : right} ${side}`;
    return this.isMobile || this.position === Scoreboard.Bottom ? bottom : leftRight;
  }

  protected get getStyleClass(): string {
    const { floating, pinned } = CSS.mode;
    return this.isMobile ? pinned : this.mode === Scoreboard.Floating ? floating : pinned;
  }

  get checkMobile(): boolean {
    const hostElParentWidth = this.el?.parentElement?.offsetWidth as number;
    return !isNaN(hostElParentWidth) && hostElParentWidth > 0 ? hostElParentWidth < MOBILE_BREAKPOINT : false;
  }

  protected get getItemsToDisplay(): ScoreboardItem[] {
    const itemLimit = this.getItemLimit();
    return this.items.filter(item => item.visible).slice(this.itemIndex, itemLimit + this.itemIndex);
  }

  get isEnd(): boolean {
    const itemLimit = this.getItemLimit();
    const lastItems = this.items.slice(this.items.length - itemLimit);
    const uidsOfLast = lastItems.map(item => item['uid']);
    const uidsOfCurrent = this.items.slice(this.itemIndex, this.itemIndex + itemLimit).map(item => item['uid']);
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
  protected queryStatDefinitions(items: ScoreboardItem[], queryFeaturePromises: Promise<__esri.FeatureSet>[]): void {
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
        const layerView = this.layerViews?.find(layerView => layerView.layer.id === item?.layer?.id);
        if (!layerView) return;

        const statDefinition = getStatsDefinition(item);

        const query = getStatDefinitionQuery(layerView, statDefinition);

        const queryFeaturesRes = layerView.queryFeatures(query);
        queryFeaturePromises.push(queryFeaturesRes);
      };
    };

    items.forEach(queryFeaturesForItem_LayerView());
  }

  protected handleQueryFeaturesResponses(queryFeaturesRes: __esri.FeatureSet[], items: ScoreboardItem[]): void {
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
        const isNotNull = value !== null;
        const formattedNumber = isNotNull ? this.intl.formatNumber(value, numberFormatOptions) : null;
        const displayValue = isNotNull ? `${formattedNumber}` : '';
        items[statIndex].displayValue = displayValue;
        items[statIndex].value = value;
      };
    };

    queryFeaturesRes.forEach(updateItemValue());
  }

  protected initStationaryWatcher(): void {
    const whenOnceConfig = { once: true, initial: true };

    const isNotInteractingWatcher = () => {
      return this.reactiveUtils?.when(
        () => !this.view?.interacting,
        () => this.calculateScoreboardItemValues(),
        whenOnceConfig,
      );
    };
    const stationaryWatcher: () => __esri.WatchHandle = () => {
      return this.reactiveUtils?.when(
        () => this.view?.stationary,
        () => isNotInteractingWatcher(),
      );
    };
    const stationaryWatcherKey = 'stationary-watcher-key';
    if (this.handles?.has(stationaryWatcherKey)) this.handles.remove(stationaryWatcherKey);
    this.handles?.add(stationaryWatcher(), stationaryWatcherKey);
  }

  protected initViewUpdateWatcher(): __esri.WatchHandle {
    return this.reactiveUtils.watch(
      () => this.view?.updating,
      () => {
        this.reactiveUtils.when(
          () => !this.view?.updating,
          () => this.calculateScoreboardItemValues(),
          { once: true, initial: true },
        );
      },
      { initial: true },
    );
  }

  protected watchLayerVisibility(): void {
    if (!this.layers) return;
    const visibilityWatcherKey = 'visbilityWatcherKey';
    this.handles?.remove(visibilityWatcherKey);
    const visibilityWatchers: __esri.WatchHandle[] = [];
    const watchVisbilityForLayer = (layer: __esri.FeatureLayer | __esri.SceneLayer) => {
      const activateScoreboardItemCalculation = async () => {
        const layerView = await this.view.whenLayerView(layer);
        await this.reactiveUtils.whenOnce(() => layerView?.updating === false);
        this.calculateScoreboardItemValues();
      };

      const watcher = this.reactiveUtils.watch(
        () => layer?.visible,
        async () => activateScoreboardItemCalculation(),
      );

      visibilityWatchers.push(watcher);
    };
    this.layers.forEach(watchVisbilityForLayer);
    this.handles?.add([...visibilityWatchers], visibilityWatcherKey);
  }

  protected getItemLimit(): number {
    return this.itemLimit < 2 || this.itemLimit > 6 ? ITEM_LIMIT_FALLBACK : this.itemLimit;
  }
}
