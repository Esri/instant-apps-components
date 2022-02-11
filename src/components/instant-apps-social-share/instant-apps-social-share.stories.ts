import { html } from 'lit-html';

export default {
  title: 'Social Share',
  argTypes: {
    mode: {
      options: ['popover', 'inline'],
      control: { type: 'select' },
    },
  },
};

const Template = ({ mode }) => html`<instant-apps-social-share mode="${mode}"></instant-apps-social-share>`;

export const Popover = Template.bind({});
Popover.args = {
  mode: 'popover',
};

export const Inline = Template.bind({});
Inline.args = {
  mode: 'inline',
};
