import { html } from 'lit-html';

export default {
  title: 'View',
  argTypes: {
    mapId: {
      control: 'text',
    },
    portalUrl: {
      control: 'text',
    },
  },
};

const Template = ({ mapId, portalUrl }) => html`<instant-apps-view map-id="${mapId}" portal-url="${portalUrl}"></instant-apps-view>`;

export const Basic = Template.bind({});
Basic.args = { mapId: '7aa58b37ed604cd698c6ff0d170ebae0', portalUrl: 'https://holistic.mapsdevext.arcgis.com' };
