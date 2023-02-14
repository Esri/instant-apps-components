/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { html } from 'lit-html';

export default {
  title: 'Header',
  argTypes: {
    titleText: { control: 'text' },
    titleTextLink: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    logoImage: { control: 'text' },
    logoImageAltText: { control: 'text' },
    logoLink: { control: 'text' },
  },
};

const Template = ({ titleText, titleTextLink, backgroundColor, textColor, logoImage, logoImageAltText, logoLink }) =>
  html`<div style="height: 70px;">
    <instant-apps-header
      title-text="${titleText}"
      title-text-link="${titleTextLink}"
      background-color="${backgroundColor}"
      text-color="${textColor}"
      logo-image="${logoImage}"
      logo-image-alt-text="${logoImageAltText}"
      logo-link="${logoLink}"
    ></instant-apps-header>
  </div>`;

export const Standard = Template.bind({});
Standard.args = { titleText: 'Instant Apps: Header', backgroundColor: '#0079c1', textColor: '#ffffff' };

export const Theme = Template.bind({});
Theme.args = {
  titleText: 'Instant Apps: Header (Shared Theme)',
  backgroundColor: '#f8f8f8',
  textColor: '#151515',
  logoImage: 'https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-instant-apps-64.svg',
  logoImageAltText: 'ArcGIS Instant Apps logo',
  logoLink: 'https://www.esri.com/en-us/arcgis/products/arcgis-instant-apps/overview',
};
