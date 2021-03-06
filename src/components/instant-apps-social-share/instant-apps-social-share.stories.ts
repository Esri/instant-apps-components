/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { html } from 'lit-html';

export default {
  title: 'Social Share',
  argTypes: {
    mode: {
      options: ['popover', 'inline'],
      control: { type: 'select' },
    },
    shareIconsLayout: {
      options: ['vertical', 'horizontal'],
      control: { type: 'select' },
    },
    scale: {
      options: ['m', 's', 'l'],
      control: { type: 'select' },
    },
    embed: { type: 'boolean' },
    socialMedia: { type: 'boolean' },
    displayTipText: { type: 'boolean' },
  },
};

const Template = ({ mode, embed, scale, socialMedia, displayTipText, shareIconsLayout }) =>
  html`<instant-apps-social-share
    mode="${mode}"
    embed="${embed}"
    scale="${scale}"
    social-media="${socialMedia}"
    display-tip-text="${displayTipText}"
    share-icons-layout="${shareIconsLayout}"
  ></instant-apps-social-share>`;

export const Popover = Template.bind({});
Popover.args = {
  mode: 'popover',
  shareIconsLayout: 'vertical',
  embed: false,
  socialMedia: true,
  displayTipText: true,
  scale: 'm',
};

export const Inline = Template.bind({});
Inline.args = {
  mode: 'inline',
  shareIconsLayout: 'vertical',
  embed: true,
  socialMedia: true,
  displayTipText: true,
  scale: 'm',
};
