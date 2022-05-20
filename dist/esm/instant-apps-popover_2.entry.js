import { r as registerInstance, h, g as getElement, H as Host } from './index-05321d9b.js';
import { g as getLocaleComponentStrings } from './locale-0a7b7b3e.js';

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{padding:2.5%;padding-top:0;max-width:25vw}.instant-apps-popover__content .instant-apps-popover__button-container{display:flex;align-items:center;justify-content:flex-end;margin-top:10px}.instant-apps-popover__content .instant-apps-popover__button-container calcite-button:last-child{margin-left:5px}";

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
};
let InstantAppsPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pagination = false;
  }
  componentDidLoad() {
    this.getMessages();
  }
  render() {
    var _a;
    return (h("calcite-popover", { "reference-element": this.referenceElement, heading: this.popoverTitle, "auto-close": "true", dismissible: "true", placement: "leading", "intl-close": (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close }, h("div", { class: CSS.content }, h("slot", { name: "action" }), h("section", null, this.content), this.pagination ? this.renderPagination() : null)));
  }
  renderPagination() {
    var _a, _b;
    const { index, messages, parent } = this;
    const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
    const isFirst = index === 0;
    const isLast = index === size - 1;
    return (h("div", { key: "pagination-button-container", class: CSS.buttonContainer }, !isFirst ? (h("calcite-button", { key: "prev", onClick: () => parent === null || parent === void 0 ? void 0 : parent.page('back'), appearance: "outline", color: "neutral" }, messages === null || messages === void 0 ? void 0 : messages.back)) : null, h("calcite-button", { key: "next", onClick: () => parent === null || parent === void 0 ? void 0 : parent.page('next') }, isLast ? messages === null || messages === void 0 ? void 0 : messages.done : messages === null || messages === void 0 ? void 0 : messages.next)));
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
  }
  componentWillLoad() {
    var _a;
    const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
    popovers.forEach((popover, popoverIndex) => {
      const referenceElement = popover.getAttribute('reference-element');
      if (popoverIndex === 0)
        this.currentId = referenceElement;
      popover.parent = this;
      popover.index = popoverIndex;
      this.instantAppsPopovers.set(referenceElement, popover);
    });
    // TODO
    // this.host.addEventListener('calcitePopoverOpen', (e: CustomEvent) => {
    //   const node = e.target as HTMLCalcitePopoverElement;
    //   this.handlePrevious(node);
    // });
  }
  render() {
    return (h(Host, null, h("slot", { name: "popovers" })));
  }
  handlePrevious(node) {
    if (this.previous) {
      const referenceElement = 'reference-element';
      const previousReference = this.previous.getAttribute(referenceElement);
      const currentReference = node.getAttribute(referenceElement);
      if (previousReference === currentReference)
        return;
      this.previous.toggle(false);
    }
    this.previous = node;
  }
  page(type) {
    var _a, _b;
    const key = this.getKey(type);
    if (!key) {
      const popover = (_a = this.instantAppsPopovers.get(this.currentId)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
      this.handlePrevious(popover);
      popover.toggle(false);
      return;
    }
    const popover = (_b = this.instantAppsPopovers.get(key)) === null || _b === void 0 ? void 0 : _b.firstElementChild;
    this.handlePrevious(popover);
    popover.toggle(true);
    this.currentId = key;
  }
  getKey(type) {
    const [...keys] = this.instantAppsPopovers.keys();
    const currentIndex = this.getIndex();
    if (currentIndex === null)
      return;
    return type === 'next' ? keys[currentIndex + 1] : keys[currentIndex - 1];
  }
  getIndex() {
    if (!this)
      return null;
    const { currentId } = this;
    const [...keys] = this.instantAppsPopovers.keys();
    return keys.indexOf(currentId);
  }
  async open(key) {
    var _a;
    const instantAppsPopover = this.instantAppsPopovers.get(key);
    const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    if (instantAppsPopover.beforeOpen) {
      await instantAppsPopover.beforeOpen();
    }
    popover.toggle(true);
  }
  get host() { return getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

export { InstantAppsPopover as instant_apps_popover, InstantAppsPopovers as instant_apps_popovers };
