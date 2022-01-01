import { html } from 'lit-html';
import { text, color, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Header',
  decorators: [withKnobs],
};

export const Basic = () => html` <instant-apps-header title-text="Instant Apps: Header" background-color="#0079c1" text-color="#ffffff"> </instant-apps-header>`;

export const Theme = () =>
  html` <instant-apps-header
    title-text="${text('Title text', 'Instant Apps: Header (Shared theme)')}"
    background-color="${color('Background color', '#360670')}"
    text-color="${color('Text color', '#9ec3db')}"
    logo-image="${text('Logo image', 'https://holistic.mapsdevext.arcgis.com/sharing/rest/content/items/83a6e3a8e4ec4462abcf8e367f88da76/data')}"
    logo-link="${text('Logo link', 'https://holistic.mapsdevext.arcgis.com')}"
  >
  </instant-apps-header>`;
