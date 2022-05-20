import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';

const instantAppsPopoversCss = ":host{display:block}";

let InstantAppsPopovers$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get host() { return this; }
  static get style() { return instantAppsPopoversCss; }
};
InstantAppsPopovers$1 = /*@__PURE__*/ proxyCustomElement(InstantAppsPopovers$1, [1, "instant-apps-popovers", {
    "instantAppsPopovers": [16],
    "currentId": [32],
    "previous": [32],
    "open": [64],
    "close": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["instant-apps-popovers"];
  components.forEach(tagName => { switch (tagName) {
    case "instant-apps-popovers":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InstantAppsPopovers$1);
      }
      break;
  } });
}

const InstantAppsPopovers = InstantAppsPopovers$1;
const defineCustomElement = defineCustomElement$1;

export { InstantAppsPopovers, defineCustomElement };
