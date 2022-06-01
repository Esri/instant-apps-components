import { r as registerInstance, h, g as getElement, H as Host } from './index-91b43dd0.js';
import { g as getLocaleComponentStrings } from './locale-2d6b1670.js';

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{display:flex;flex-direction:column;padding:0 5% 5% 5%;max-width:25vw;font-family:Avenir;font-size:14px}.instant-apps-popover__content .instant-apps-popover__action{align-self:flex-start;--calcite-ui-foreground-2:transparent}.instant-apps-popover__content span{display:inline-block;font-weight:900;color:var(--calcite-ui-text-1);margin:0 0 10px 0}.instant-apps-popover__content p{line-height:19.12px;margin:0;margin-bottom:10px}.instant-apps-popover__content .instant-apps-popover__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.instant-apps-popover__content .instant-apps-popover__footer span{margin-bottom:0;font-weight:normal;font-size:14px}.instant-apps-popover__content .instant-apps-popover__footer calcite-button:first-child{--calcite-ui-foreground-3:transparent}.instant-apps-popover__content .instant-apps-popover__footer calcite-button:last-child{margin-left:5px}.instant-apps-popover__content.instant-apps-popover--action-disabled{padding:5%}.instant-apps-popover__content.instant-apps-popover--action-disabled #subtitle{margin:0 0 10px 0}";

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
  action: 'instant-apps-popover__action',
  actionDisabled: 'instant-apps-popover--action-disabled',
  footer: 'instant-apps-popover__footer',
};
let InstantAppsPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    var _a, _b, _c, _d;
    return (h("calcite-popover", { ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": "true", placement: this.placement, "intl-close": (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close, "trigger-disabled": "true", "ref-id": this.refId, dismissible: "true" }, h("div", { class: `${CSS.content}${this.disableAction ? ` ${CSS.actionDisabled}` : ''}` }, !this.disableAction ? (h("calcite-action", { key: "popover-action", class: CSS.action, onclick: this.popoverAction, icon: "chevron-left", compact: "true", "text-enabled": "true", text: this.intlPopoverAction ? this.intlPopoverAction : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.back })) : null, h("section", null, h("span", { id: "subtitle" }, this.subtitle), h("p", null, this.content)), this.pagination ? (h("div", { key: `iac-popover-footer-${this.index}`, class: CSS.footer }, h("span", null, this.index + 1, " of ", (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.instantAppsPopovers) === null || _d === void 0 ? void 0 :
      _d.size), this.renderPagination())) : null)));
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
  get el() { return getElement(this); }
};
InstantAppsPopover.style = instantAppsPopoverCss;

const instantAppsPopoversCss = ":host{display:block}";

let InstantAppsPopovers = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  }
  render() {
    return (h(Host, null, h("slot", { name: "popovers" })));
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
  get host() { return getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

export { InstantAppsPopover as instant_apps_popover, InstantAppsPopovers as instant_apps_popovers };
