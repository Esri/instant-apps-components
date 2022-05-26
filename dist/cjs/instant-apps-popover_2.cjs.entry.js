'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-172ac3b5.js');
const locale = require('./locale-2767e2c1.js');

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{display:flex;flex-direction:column;padding:0 5% 5% 5%;max-width:25vw;font-family:Avenir;font-size:14px}.instant-apps-popover__content span{display:inline-block;font-weight:900;color:#000;margin:0 0 10px 0}.instant-apps-popover__content p{line-height:19.12px;margin:0;margin-bottom:10px}.instant-apps-popover__content .instant-apps-popover__button-container{display:flex;align-items:center;justify-content:flex-end;margin-top:10px}.instant-apps-popover__content .instant-apps-popover__button-container calcite-button:last-child{margin-left:5px}.instant-apps-popover__content calcite-action{align-self:flex-start}.instant-apps-popover__content.instant-apps-popover--action-disabled{padding:5%}.instant-apps-popover__content.instant-apps-popover--action-disabled #subtitle{margin:0 0 10px 0}";

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
  action: 'instant-apps-popover__action',
  actionDisabled: 'instant-apps-popover--action-disabled',
};
let InstantAppsPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.placement = 'trailing-start';
    this.pagination = false;
    this.disableAction = false;
  }
  componentDidLoad() {
    this.getMessages();
  }
  componentDidUpdate() {
    this.popoverEl.referenceElement = this.referenceElement;
  }
  render() {
    var _a, _b;
    return (index.h("calcite-popover", { ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": "true", placement: this.placement, "intl-close": (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close, "trigger-disabled": "true", "ref-id": this.refId, dismissible: "true" }, index.h("div", { class: `${CSS.content}${this.disableAction ? ` ${CSS.actionDisabled}` : ''}` }, !this.disableAction ? (index.h("calcite-action", { key: "popover-action", class: CSS.action, onclick: this.popoverAction, icon: "arrow-left", compact: "true", "text-enabled": "true", text: this.intlPopoverAction ? this.intlPopoverAction : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.back })) : null, index.h("section", null, index.h("span", { id: "subtitle" }, this.subtitle), index.h("p", null, this.content)), this.pagination ? this.renderPagination() : null)));
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
    this.beforeOpen = () => Promise.resolve();
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
    this.host.addEventListener('calcitePopoverClose', () => {
      if (this.inTour)
        this.endTour();
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
    this.endTour();
  }
  handlePopoverProps(config) {
    var _a;
    const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
    popovers.forEach(popover => {
      popover.disableAction = config.disableAction;
      popover.pagination = config.pagination;
    });
  }
  async open(key) {
    return this.beforeOpen().then(() => {
      var _a;
      const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
      debugger;
      popover.toggle(true);
    });
  }
  async close(key) {
    var _a;
    const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    popover.toggle(false);
  }
  async beginTour() {
    this.inTour = true;
    this.handlePopoverProps({ pagination: true, disableAction: true });
    const refIds = Array.from(this.instantAppsPopovers.keys());
    this.open(refIds[0]);
  }
  async endTour() {
    this.close(this.currentId);
    this.inTour = false;
    this.handlePopoverProps({ pagination: false, disableAction: false });
  }
  get host() { return index.getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

exports.instant_apps_popover = InstantAppsPopover;
exports.instant_apps_popovers = InstantAppsPopovers;
