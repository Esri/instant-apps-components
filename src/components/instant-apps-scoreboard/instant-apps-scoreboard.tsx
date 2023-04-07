// @stencil/core
import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';

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
  AcceptableLayers,
  AcceptableLayerViews,
} from './types/interfaces';

// T9n
import Scoreboard_t9n from '../../assets/t9n/instant-apps-scoreboard/resources.json';

// Constants
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

const ITEM_LIMIT = 6;

@Component({
  tag: 'instant-apps-scoreboard',
  styleUrl: 'instant-apps-scoreboard.scss',
  shadow: true,
})
export class InstantAppsScoreboard {
  handles: __esri.Handles;
  reactiveUtils: __esri.reactiveUtils;
  Collection: typeof import('esri/core/Collection');
  intl: __esri.intl;

  @Element() el: HTMLElement;

  @Prop() view: __esri.MapView | __esri.SceneView;

  @Prop() data: ScoreboardData;

  @Prop() position: ScoreboardPosition = Scoreboard.Bottom;

  @Prop() mode: ScoreboardMode = Scoreboard.Floating;

  @State() state: ScoreboardState;

  @State() messages: typeof Scoreboard_t9n;

  @State() itemIndex = 0;

  @State() layers: __esri.Collection<__esri.FeatureLayer | __esri.SceneLayer>;

  @State() layerViews: __esri.Collection<__esri.FeatureLayerView | __esri.SceneLayerView>;

  @Watch('data')
  generateUIDs() {
    const { items } = this.data;
    items.forEach(this.uidGeneratorCallback());
  }

  @Watch('data')
  storeLayers(): void {
    const layerIds = this.data.items.map(item => item?.layer?.id);
    const isNotTable = (layer: __esri.Layer) => !(layer as any).isTable;
    const isAcceptableLayer = (layer: __esri.Layer) => layer.type === 'feature' || layer.type === 'scene';
    const notAddedYet = (layer: __esri.Layer) => layerIds.indexOf(layer.id) > -1;
    const validateLayer = (layer: __esri.Layer) => isNotTable(layer) && isAcceptableLayer(layer) && notAddedYet(layer);
    this.layers = this.view.map.allLayers.filter(layer => validateLayer(layer)) as __esri.Collection<__esri.FeatureLayer | __esri.SceneLayer>;
  }

  @Watch('layers')
  async storeLayerViews(): Promise<void> {
    if (this.layers.length > 0) {
      const promises: Promise<AcceptableLayerViews>[] = [];
      this.layers.forEach(layer => {
        const layerToLoad = layer as AcceptableLayers;
        const layerViewToLoad = this.view.whenLayerView(layerToLoad) as Promise<unknown>;
        promises.push(layerViewToLoad as Promise<AcceptableLayerViews>);
      });
      const settledPromises = await Promise.allSettled(promises);
      const fulfilledPromises: PromiseSettledResult<AcceptableLayerViews>[] = settledPromises.filter(promise => promise.status == 'fulfilled' && promise.value);
      const layerViews = fulfilledPromises.map(fulfilledPromise => (fulfilledPromise as PromiseFulfilledResult<AcceptableLayerViews>).value);
      this.layerViews = new this.Collection([...layerViews]);
    }
  }

  @Watch('layerViews')
  async calculateScoreboardData(): Promise<void> {
    this.state = Scoreboard.Loading;

    const tempData = { items: [...this.data.items] };
    const promises: any = [];
    tempData.items.forEach(async item => {
      const stat = {
        onStatisticField: item.field, // service field for 2015 population
        outStatisticFieldName: `${item.field}_${item.operation}`,
        statisticType: item.operation,
      } as __esri.StatisticDefinition;

      const layer = this.layers.find(layer => layer.id === item?.layer?.id);
      if (!layer) return;
      const query = layer.createQuery();
      query.outStatistics = [stat];
      const res = layer.queryFeatures(query);
      promises.push(res);
    });

    const completedStats = await Promise.all(promises);

    completedStats.forEach((stat, statIndex) => {
      const value = Object.values(stat.features[0].attributes)[0] as number;

      const formattedNumber = this.intl.formatNumber(value, {
        notation: 'compact',
        compactDisplay: 'short',
      });

      tempData.items[statIndex].value = `${formattedNumber}`;
    });
    this.data.items = [...tempData.items];
    this.state = Scoreboard.Complete;
  }

  uidGeneratorCallback(): (item: ScoreboardItem) => void {
    return (item: ScoreboardItem) => {
      const randNum = Math.random();
      const randomInt = Math.floor(Math.random() * 10) + 11;
      const randStr = randNum.toString(randomInt).replace('0.', '');
      const uid = randStr;
      item['uid'] = uid;
    };
  }

  getUIDs(): string[] {
    return this.data.items.map(item => item['uid']);
  }

  connectedCallback() {
    this.generateUIDs();
  }

  async componentWillLoad(): Promise<void> {
    try {
      await this.getMessages();
    } catch {
      this.state = Scoreboard.Disabled;
    } finally {
      if (!this.view || !this.data) {
        this.state = Scoreboard.Disabled;
      } else {
        try {
          this.state = Scoreboard.Loading;
          await this.initializeModules();
        } catch {
          this.state = Scoreboard.Disabled;
        }
      }
    }
  }

  async componentDidLoad(): Promise<void> {
    if (this.state === Scoreboard.Disabled) return;
    try {
      await this.reactiveUtils.whenOnce(() => this.view?.ready);
      await this.loadMapResources();
      this.storeLayers();
      this.state = Scoreboard.Complete;
    } catch {
      this.state = Scoreboard.Disabled;
      console.error(`${BASE}: FAILED TO LOAD MAP RESOURCES`);
    }
  }

  async initializeModules(): Promise<void> {
    try {
      const [Handles, reactiveUtils, Collection, intl] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils', 'esri/core/Collection', 'esri/intl']);
      this.reactiveUtils = reactiveUtils;
      this.handles = new Handles();
      this.Collection = Collection;
      this.intl = intl;
      this.layers = new Collection();
      this.layerViews = new Collection();
      return Promise.resolve();
    } catch (err) {
      console.error(err);
      this.state = Scoreboard.Disabled;
      return Promise.reject();
    }
  }

  async loadMapResources(): Promise<void> {
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

  render(): HTMLInstantAppsScoreboardElement {
    const { state } = this;
    const isLoading = state === Scoreboard.Loading;
    const isDisabled = state === Scoreboard.Disabled;
    const progress = isLoading ? this.renderProgress() : null;
    const positionClass = this.getPositionClass();
    const styleClass = this.getStyleClass();
    return <Host class={`${positionClass} ${styleClass}`}>{isDisabled ? this.renderNotice() : [progress, this.renderBase()]}</Host>;
  }

  renderBase(): HTMLDivElement {
    return <div class={BASE}>{this.renderContent()}</div>;
  }

  renderContent(): HTMLCalciteLoaderElement | HTMLUListElement | null {
    const { state } = this;
    return state === Scoreboard.Loading ? this.renderLoader() : state === Scoreboard.Complete ? this.renderItemsContainer() : null;
  }

  renderItemsContainer() {
    const isBeginning = this.itemIndex === 0;
    const isEnd = this.isLastItem();
    const isBottom = this.position === Scoreboard.Bottom;
    const iconPosition = isBottom ? ScoreboardAlignment.Start : ScoreboardAlignment.Center;
    const previous = isBottom ? ScoreboardIcons.Left : ScoreboardIcons.Up;
    const next = isBottom ? ScoreboardIcons.Right : ScoreboardIcons.Down;
    const iconType = { previous, next };
    return (
      <div class={CSS.itemsContainer}>
        <calcite-action
          onclick={this.previousItem.bind(this)}
          icon={isBeginning ? ScoreboardIcons.Blank : iconType.previous}
          disabled={isBeginning}
          alignment={iconPosition}
          scale="l"
          appearance="transparent"
        />

        {this.renderItems()}
        <calcite-action
          onclick={this.nextItem.bind(this)}
          icon={isEnd ? ScoreboardIcons.Blank : iconType.next}
          disabled={isEnd}
          alignment={iconPosition}
          scale="l"
          appearance="transparent"
        />
      </div>
    );
  }

  renderItems(): HTMLUListElement {
    const { items } = CSS;
    const dataToDisplay = this.getItemsToDisplay();
    const scoreboardItems = dataToDisplay.map(item => this.renderItem(item));
    return <ul class={items}>{scoreboardItems}</ul>;
  }

  renderItem(scoreboardItem: ScoreboardItem): HTMLLIElement {
    const { label, value } = scoreboardItem;
    return (
      <li class={CSS.item}>
        <span class={CSS.label}>{label}</span>
        <span class={CSS.value}>{value ?? this.messages?.noData}</span>
      </li>
    );
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

  async getMessages(): Promise<void> {
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

  getPositionClass(): string {
    const { bottom, left, right, side } = CSS.position;
    const leftRight = `${this.position === Scoreboard.Left ? left : right} ${side}`;
    return this.position === Scoreboard.Bottom ? bottom : leftRight;
  }

  getStyleClass(): string {
    const { floating, pinned } = CSS.mode;
    return this.mode === Scoreboard.Floating ? floating : pinned;
  }

  getItemsToDisplay(): ScoreboardItem[] {
    return this.data.items.slice(this.itemIndex, ITEM_LIMIT + this.itemIndex);
  }

  nextItem(): void {
    this.itemIndex = this.itemIndex + 1;
  }

  previousItem(): void {
    this.itemIndex = this.itemIndex - 1;
  }

  isLastItem(): boolean {
    const lastItems = this.data.items.slice(this.data.items.length - ITEM_LIMIT);
    const uidsOfLast = lastItems.map(item => item['uid']);
    const uidsOfCurrent = this.data.items.slice(this.itemIndex, this.itemIndex + ITEM_LIMIT).map(item => item['uid']);
    return uidsOfLast.every((val, index) => val === uidsOfCurrent[index]);
  }
}
