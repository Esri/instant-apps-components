/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
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
    successMessage: { type: 'string' },
  },
};

const Template = ({ mode, embed, scale, socialMedia, displayTipText, shareIconsLayout, successMessage }) =>
  html`<instant-apps-social-share
    mode="${mode}"
    embed="${embed}"
    scale="${scale}"
    social-media="${socialMedia}"
    display-tip-text="${displayTipText}"
    share-icons-layout="${shareIconsLayout}"
    success-message="${successMessage}"
  ></instant-apps-social-share>`;

export const Popover = Template.bind({});
Popover.args = {
  mode: 'popover',
  shareIconsLayout: 'vertical',
  embed: false,
  socialMedia: true,
  displayTipText: true,
  scale: 'm',
  successMessage: '',
};

export const Inline = Template.bind({});
Inline.args = {
  mode: 'inline',
  shareIconsLayout: 'vertical',
  embed: true,
  socialMedia: true,
  displayTipText: true,
  scale: 'm',
  successMessage: '',
};
