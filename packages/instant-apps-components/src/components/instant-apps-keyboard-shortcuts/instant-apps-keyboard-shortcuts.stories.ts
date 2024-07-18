import SceneView from '@arcgis/core/views/SceneView';
import WebScene from '@arcgis/core/WebScene';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';

export default {
  title: 'Components/KeyboardShortcuts',
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    mapType: {
      options: ['map', 'scene'],
      control: { type: 'radio' },
    },
  },
};

const Template = args => {
  const el = document.createElement('instant-apps-keyboard-shortcuts');
  document.body.classList.remove('calcite-mode-dark', 'calcite-mode-light');
  document.body.classList.add(`calcite-mode-${args.theme}`);
  if (args.mapType === 'scene') {
    const map = new WebScene({
      portalItem: {
        id: '752cb7f283f340d0b79ca5ebfed659a3',
      },
    });
    const view = new SceneView({ map });
    el.view = view;
  } else {
    const map = new WebMap({
      portalItem: {
        id: '3582b744bba84668b52a16b0b6942544',
      },
    });
    const view = new MapView({ map });
    el.view = view;
  }

  return el;
};

export const Default = Template.bind({});
Default.args = {
  theme: 'light',
  mapType: 'map',
};
