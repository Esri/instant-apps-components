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
import { Component, Host, h, Prop } from '@stencil/core';
const CSS = {
  headerContent: 'instant-apps-header__header-content',
};
export class InstantAppsHeader {
  render() {
    return (h(Host, null,
      h("header", { style: { backgroundColor: this.backgroundColor } },
        h("span", { class: CSS.headerContent },
          this.logoImage && this.logoLink ? (h("a", { href: `${this.logoLink}`, target: "_blank" },
            h("img", { src: `${this.logoImage}`, alt: `${this.logoImageAltText}` }))) : this.logoImage ? (h("img", { src: `${this.logoImage}`, alt: this.logoImageAltText })) : (''),
          h("h1", { style: { color: this.textColor } }, this.titleText)),
        h("slot", { name: "actions-end" }))));
  }
  static get is() { return "instant-apps-header"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["instant-apps-header.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["instant-apps-header.css"]
  }; }
  static get properties() { return {
    "titleText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "title-text",
      "reflect": false
    },
    "backgroundColor": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "background-color",
      "reflect": false
    },
    "textColor": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "text-color",
      "reflect": false
    },
    "logoImage": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logo-image",
      "reflect": false
    },
    "logoImageAltText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logo-image-alt-text",
      "reflect": false
    },
    "logoLink": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "logo-link",
      "reflect": false
    },
    "label": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "label",
      "reflect": false
    }
  }; }
}
