// @stencil/core
import { Component, Host, h, Prop, State, Element } from '@stencil/core';

// esri-loader
import { loadModules } from 'esri-loader';

// Utils
import { getLocaleComponentStrings } from '../../utils/locale';

// Types
import { Scoreboard, ScoreboardData, ScoreboardItem, ScoreboardState, ScoreboardPosition, ScoreboardMode } from './types/interfaces';

// T9n
import Scoreboard_t9n from '../../assets/t9n/instant-apps-scoreboard/resources.json';

// Constants
const BASE = 'instant-apps-scoreboard';
const KEY_PREFIX = `${BASE}--`;
const __BASE__ = `${BASE}__`;
const CSS = {
  BASE,
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

@Component({
  tag: 'instant-apps-scoreboard',
  styleUrl: 'instant-apps-scoreboard.scss',
  shadow: true,
})
export class InstantAppsScoreboard {
  handles: __esri.Handles;
  reactiveUtils: __esri.reactiveUtils;

  @Element() el: HTMLElement;

  @Prop() view: __esri.MapView | __esri.SceneView;

  @Prop() data: ScoreboardData;

  @Prop() position: ScoreboardPosition = Scoreboard.Bottom;

  @Prop() mode: ScoreboardMode = Scoreboard.Floating;

  @State() state: ScoreboardState;

  @State() messages: typeof Scoreboard_t9n;

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
      this.state = Scoreboard.Complete;
    } catch {
      this.state = Scoreboard.Disabled;
      console.error(`${BASE}: FAILED TO LOAD MAP RESOURCES`);
    }
  }

  async initializeModules(): Promise<void> {
    try {
      const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
      this.reactiveUtils = reactiveUtils;
      this.handles = new Handles();
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
    return state === Scoreboard.Loading ? this.renderLoader() : state === Scoreboard.Complete ? this.renderItems() : null;
  }

  renderItems(): HTMLUListElement {
    const { items } = CSS;
    const scoreboardItems = this.data.items.map(item => this.renderItem(item));
    return <ul class={items}>{scoreboardItems}</ul>;
  }

  renderItem(scoreboardItem: ScoreboardItem): HTMLLIElement {
    const { label, value } = scoreboardItem;
    return (
      <li class={CSS.item}>
        <span class={CSS.label}>{label}</span>
        <span class={CSS.value}>{value}</span>
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
      <calcite-notice closable open icon="exclamation-mark-triangle" kind="warning">
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
}
