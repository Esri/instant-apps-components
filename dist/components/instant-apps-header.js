import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';

const instantAppsHeaderCss = ":host{width:100%}:host header{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;width:100%;height:5%;padding:0 0.5%;background-color:#0079c1;padding-top:5px;padding-bottom:5px}:host header .instant-apps-header__header-content{display:flex;align-items:center}:host header .instant-apps-header__header-content img{width:6%;padding:0 5px}:host header .instant-apps-header__header-content a{display:flex;align-items:center;width:8%;padding-right:5px}:host header .instant-apps-header__header-content a img{width:100%;padding-right:0}:host header .instant-apps-header__header-content h1{margin:0;font-size:18px;color:var(--calcite-ui-text-inverse);font-weight:430}";

const CSS = {
  headerContent: 'instant-apps-header__header-content',
};
let InstantAppsHeader$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return (h(Host, null, h("header", { style: { backgroundColor: this.backgroundColor } }, h("span", { class: CSS.headerContent }, this.logoImage && this.logoLink ? (h("a", { href: `${this.logoLink}`, target: "_blank" }, h("img", { src: `${this.logoImage}`, alt: `${this.logoImageAltText}` }))) : this.logoImage ? (h("img", { src: `${this.logoImage}`, alt: this.logoImageAltText })) : (''), h("h1", { style: { color: this.textColor } }, this.titleText)), h("slot", { name: "actions-end" }))));
  }
  static get style() { return instantAppsHeaderCss; }
};
InstantAppsHeader$1 = /*@__PURE__*/ proxyCustomElement(InstantAppsHeader$1, [1, "instant-apps-header", {
    "titleText": [1, "title-text"],
    "backgroundColor": [1, "background-color"],
    "textColor": [1, "text-color"],
    "logoImage": [1, "logo-image"],
    "logoImageAltText": [1, "logo-image-alt-text"],
    "logoLink": [1, "logo-link"],
    "label": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["instant-apps-header"];
  components.forEach(tagName => { switch (tagName) {
    case "instant-apps-header":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InstantAppsHeader$1);
      }
      break;
  } });
}

const InstantAppsHeader = InstantAppsHeader$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsHeader, defineCustomElement };
