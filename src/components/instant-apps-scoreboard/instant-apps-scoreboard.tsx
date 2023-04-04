import { Component, Host, h } from '@stencil/core';

const BASE = 'instant-apps-scoreboard';
const __BASE__ = `${BASE}__`;

const CSS = {
  BASE,
  items: `${__BASE__}items`,
  item: `${__BASE__}item`,
  label: `${__BASE__}item-label`,
  value: `${__BASE__}item-value`,
};

import testData from '../../assets/data/instant-apps-scoreboard/data1.json';

@Component({
  tag: 'instant-apps-scoreboard',
  styleUrl: 'instant-apps-scoreboard.scss',
  shadow: true,
})
export class InstantAppsScoreboard {
  data: { items: { label: string; value: string }[] } = testData;

  render() {
    const { BASE } = CSS;
    return <div class={BASE}>{this.renderItems()}</div>;
  }

  renderItems(): HTMLUListElement {
    const { items } = CSS;

    return <ul class={items}>{this.data.items.map(item => this.renderItem(item))}</ul>;
  }

  renderItem(scoreboardItem: { label: string; value: string }): HTMLLIElement {
    const { label, value } = scoreboardItem;
    return (
      <li class={CSS.item}>
        <span class={CSS.label}>{label}</span>
        <span class={CSS.value}>{value}</span>
      </li>
    );
  }
}
