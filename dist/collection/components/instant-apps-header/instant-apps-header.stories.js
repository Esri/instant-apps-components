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
  title: 'Header',
  argTypes: {
    titleText: { control: 'text' },
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    logoImage: { control: 'text' },
    logoImageAltText: { control: 'text' },
    logoLink: { control: 'text' },
  },
};
const Template = ({ titleText, backgroundColor, textColor, logoImage, logoImageAltText, logoLink }) => html `<instant-apps-header
    title-text="${titleText}"
    background-color="${backgroundColor}"
    text-color="${textColor}"
    logo-image="${logoImage}"
    logo-image-alt-text="${logoImageAltText}"
    logo-link="${logoLink}"
  ></instant-apps-header>`;
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
