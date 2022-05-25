'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-172ac3b5.js');
const locale = require('./locale-2767e2c1.js');

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{padding:2.5%;padding-top:0;max-width:25vw}.instant-apps-popover__content .instant-apps-popover__button-container{display:flex;align-items:center;justify-content:flex-end;margin-top:10px}.instant-apps-popover__content .instant-apps-popover__button-container calcite-button:last-child{margin-left:5px}";

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
};
let InstantAppsPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.placement = 'trailing-start';
  }
  componentDidLoad() {
    this.getMessages();
  }
  componentDidUpdate() {
    this.popoverEl.referenceElement = this.referenceElement;
  }
  render() {
    var _a;
    return (index.h("calcite-popover", { ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": "true", dismissible: "true", placement: this.placement, "intl-close": (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close, "trigger-disabled": "true", "ref-id": this.refId }, index.h("div", { class: CSS.content }, index.h("slot", { name: "action" }), index.h("section", null, this.content), this.parent.pagination ? this.renderPagination() : null)));
  }
  renderPagination() {
    var _a, _b;
    const { index: index$1, messages, parent } = this;
    const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
    const isFirst = index$1 === 0;
    const isLast = index$1 === size - 1;
    return (index.h("div", { key: "pagination-button-container", class: CSS.buttonContainer }, !isFirst ? (index.h("calcite-button", { key: "prev", onClick: () => parent === null || parent === void 0 ? void 0 : parent.previous(), appearance: "outline", color: "neutral" }, messages === null || messages === void 0 ? void 0 : messages.back)) : null, index.h("calcite-button", { key: "next", onClick: () => {
        if (isLast) {
          parent === null || parent === void 0 ? void 0 : parent.done();
        }
        else {
          parent === null || parent === void 0 ? void 0 : parent.next();
        }
      } }, isLast ? messages === null || messages === void 0 ? void 0 : messages.done : messages === null || messages === void 0 ? void 0 : messages.next)));
  }
  async getMessages() {
    const messages = await locale.getLocaleComponentStrings(this.el);
    this.messages = messages[0];
  }
  get el() { return index.getElement(this); }
};
InstantAppsPopover.style = instantAppsPopoverCss;

const instantAppsPopoversCss = ":host{display:block}";

let InstantAppsPopovers = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.instantAppsPopovers = new Map();
    this.pagination = false;
  }
  componentWillLoad() {
    var _a;
    const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
    popovers.forEach((popover, popoverIndex) => {
      const refId = popover.getAttribute('ref-id');
      popover.parent = this;
      popover.index = popoverIndex;
      this.instantAppsPopovers.set(refId, popover);
    });
    this.host.addEventListener('calcitePopoverOpen', e => {
      const node = e.target;
      const refId = node.getAttribute('ref-id');
      this.currentId = refId;
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", { name: "popovers" })));
  }
  next() {
    const refIds = Array.from(this.instantAppsPopovers.keys());
    const index = refIds.indexOf(this.currentId) + 1;
    const nextId = refIds[index];
    this.close(this.currentId);
    this.open(nextId);
  }
  previous() {
    const refIds = Array.from(this.instantAppsPopovers.keys());
    const index = refIds.indexOf(this.currentId) - 1;
    const previousId = refIds[index];
    this.close(this.currentId);
    this.open(previousId);
  }
  done() {
    this.close(this.currentId);
  }
  async open(key) {
    var _a;
    const instantAppsPopover = this.instantAppsPopovers.get(key);
    const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    if (instantAppsPopover === null || instantAppsPopover === void 0 ? void 0 : instantAppsPopover.beforeOpen) {
      await instantAppsPopover.beforeOpen();
    }
    popover.toggle(true);
  }
  async close(key) {
    var _a;
    const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    popover.toggle(false);
  }
  get host() { return index.getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

exports.instant_apps_popover = InstantAppsPopover;
exports.instant_apps_popovers = InstantAppsPopovers;
