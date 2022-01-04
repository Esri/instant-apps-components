import { html } from 'lit-html';

export default {
  title: 'Header',
  argTypes: {
    titleText: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    logoImage: { control: 'text' },
    logoLink: { control: 'text' },
  },
};

const Template = ({ titleText, backgroundColor, textColor, logoImage, logoLink }) =>
  html`<instant-apps-header
    title-text="${titleText}"
    background-color="${backgroundColor}"
    text-color="${textColor}"
    logo-image="${logoImage}"
    logo-link="${logoLink}"
  ></instant-apps-header>`;

export const Basic = Template.bind({});
Basic.args = { titleText: 'Instant Apps: Header', backgroundColor: '#0079c1', textColor: '#ffffff' };

export const Theme = Template.bind({});
Theme.args = {
  titleText: 'Instant Apps: Header (Shared Theme)',
  backgroundColor: '#360670',
  textColor: '#9ec3db',
  logoImage: 'https://holistic.mapsdevext.arcgis.com/sharing/rest/content/items/83a6e3a8e4ec4462abcf8e367f88da76/data',
  logoLink: 'https://holistic.mapsdevext.arcgis.com',
};
