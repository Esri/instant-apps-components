'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-172ac3b5.js');

const instantAppsHeaderCss = ":host{width:100%}:host header{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;width:100%;height:5%;padding:0 0.5%;background-color:#0079c1;padding-top:5px;padding-bottom:5px}:host header .instant-apps-header__header-content{display:flex;align-items:center}:host header .instant-apps-header__header-content img{width:6%;padding:0 5px}:host header .instant-apps-header__header-content a{display:flex;align-items:center;width:8%;padding-right:5px}:host header .instant-apps-header__header-content a img{width:100%;padding-right:0}:host header .instant-apps-header__header-content h1{margin:0;font-size:18px;color:var(--calcite-ui-text-inverse);font-weight:430}";

const CSS = {
  headerContent: 'instant-apps-header__header-content',
};
let InstantAppsHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("header", { style: { backgroundColor: this.backgroundColor } }, index.h("span", { class: CSS.headerContent }, this.logoImage && this.logoLink ? (index.h("a", { href: `${this.logoLink}`, target: "_blank" }, index.h("img", { src: `${this.logoImage}`, alt: `${this.logoImageAltText}` }))) : this.logoImage ? (index.h("img", { src: `${this.logoImage}`, alt: this.logoImageAltText })) : (''), index.h("h1", { style: { color: this.textColor } }, this.titleText)), index.h("slot", { name: "actions-end" }))));
  }
};
InstantAppsHeader.style = instantAppsHeaderCss;

exports.instant_apps_header = InstantAppsHeader;
