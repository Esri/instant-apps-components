import { html } from 'lit-html';

export default {
  title: 'Social Share',
  argTypes: {
    mode: {
      options: ['popover', 'inline'],
      control: { type: 'select' },
    },
    embed: { type: 'boolean' },
  },
};

const Template = ({ mode, embed }) => html`<instant-apps-social-share mode="${mode}" embed="${embed}"></instant-apps-social-share>`;

export const Popover = Template.bind({});
Popover.args = {
  mode: 'popover',
  embed: false
};

export const Inline = Template.bind({});
Inline.args = {
  mode: 'inline',
  embed: true,
};
