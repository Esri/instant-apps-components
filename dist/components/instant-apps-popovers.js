import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';

const instantAppsPopoversCss = ":host{display:block}";

let InstantAppsPopovers$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  get host() { return this; }
  static get style() { return instantAppsPopoversCss; }
};
InstantAppsPopovers$1 = /*@__PURE__*/ proxyCustomElement(InstantAppsPopovers$1, [1, "instant-apps-popovers", {
    "instantAppsPopovers": [16],
    "pagination": [516],
    "currentId": [32],
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
