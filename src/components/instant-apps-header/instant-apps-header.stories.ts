import { html } from 'lit-html';

export default {
  title: 'Components/Header',
};

export const Simple = () => html`<instant-apps-header title-text="Instant Apps: Header"></instant-apps-header>`;

const sharedTheme = {
  header: {
    background: '#360670',
    text: '#9ec3db',
  },
  body: {
    background: null,
    text: null,
    link: null,
  },
  button: {
    background: '#360670',
    text: '#f5f8fa',
  },
  logo: {
    small: 'https://holistic.mapsdevext.arcgis.com/sharing/rest/content/items/83a6e3a8e4ec4462abcf8e367f88da76/data',
    link: 'https://holistic.mapsdevext.arcgis.com',
  },
};

const sharedThemeStr = JSON.stringify(sharedTheme);

export const Theme = () =>
  html`<instant-apps-header title-text="Instant Apps: Header (Shared theme)" apply-shared-theme="true" shared-theme="${sharedThemeStr}"></instant-apps-header>`;
