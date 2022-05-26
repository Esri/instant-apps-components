import { HTMLElement, h, proxyCustomElement } from '@stencil/core/internal/client';
import { g as getLocaleComponentStrings } from './locale.js';

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{padding:2.5%;max-width:25vw}.instant-apps-popover__content .instant-apps-popover__button-container{display:flex;align-items:center;justify-content:flex-end;margin-top:10px}.instant-apps-popover__content .instant-apps-popover__button-container calcite-button:last-child{margin-left:5px}";

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
};
let InstantAppsPopover$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.placement = 'trailing-start';
    this.pagination = false;
    this.dismissible = false;
    this.disableAction = false;
  }
  componentDidLoad() {
    this.getMessages();
  }
  componentDidUpdate() {
    this.popoverEl.referenceElement = this.referenceElement;
  }
  render() {
    var _a;
    return (h("calcite-popover", { ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": "true", placement: this.placement, "intl-close": (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close, "trigger-disabled": "true", "ref-id": this.refId, dismissible: this.dismissible }, h("div", { class: CSS.content }, !this.disableAction ? (h("calcite-button", { key: "popover-action", onclick: this.popoverAction, "icon-start": "arrow-left", appearance: "transparent", color: "neutral" }, this.intlPopoverAction ? this.intlPopoverAction : this.messages.back)) : null, h("section", null, this.content), this.pagination ? this.renderPagination() : null)));
  }
  renderPagination() {
    var _a, _b;
    const { index, messages, parent } = this;
    const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
    const isFirst = index === 0;
    const isLast = index === size - 1;
    return (h("div", { key: "pagination-button-container", class: CSS.buttonContainer }, !isFirst ? (h("calcite-button", { key: "prev", onClick: () => parent === null || parent === void 0 ? void 0 : parent.previous(), appearance: "outline", color: "neutral" }, messages === null || messages === void 0 ? void 0 : messages.back)) : null, h("calcite-button", { key: "next", onClick: () => {
        if (isLast) {
          parent === null || parent === void 0 ? void 0 : parent.done();
        }
        else {
          parent === null || parent === void 0 ? void 0 : parent.next();
        }
      } }, isLast ? messages === null || messages === void 0 ? void 0 : messages.done : messages === null || messages === void 0 ? void 0 : messages.next)));
  }
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0];
  }
  get el() { return this; }
  static get style() { return instantAppsPopoverCss; }
};
InstantAppsPopover$1 = /*@__PURE__*/ proxyCustomElement(InstantAppsPopover$1, [0, "instant-apps-popover", {
    "popoverTitle": [513, "popover-title"],
    "subtitle": [513],
    "content": [513],
    "mediaSrc": [513, "media-src"],
    "index": [514],
    "referenceElement": [513, "reference-element"],
    "parent": [16],
    "placement": [1],
    "refId": [1, "ref-id"],
    "pagination": [516],
    "dismissible": [516],
    "disableAction": [516, "disable-action"],
    "popoverAction": [16],
    "intlPopoverAction": [1, "intl-popover-action"],
    "messages": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["instant-apps-popover"];
  components.forEach(tagName => { switch (tagName) {
    case "instant-apps-popover":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InstantAppsPopover$1);
      }
      break;
  } });
}

const InstantAppsPopover = InstantAppsPopover$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsPopover, defineCustomElement };
