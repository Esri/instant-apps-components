import { HTMLElement, h, Host, proxyCustomElement } from '@stencil/core/internal/client';

const instantAppsPopoversCss = ":host{display:block}#instantAppsPopoverScrim{--calcite-scrim-background:rgba(0, 0, 0, 0.5);z-index:100}";

let InstantAppsPopovers$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.instantAppsPopovers = new Map();
    // @Prop({
    //   reflect: true,
    // })
    // pagination: boolean = false;
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
      popover.dismissible = config.dismissble;
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
    this.handlePopoverProps({ dismissble: false, pagination: true, disableAction: true });
    const scrim = document.createElement('calcite-scrim');
    scrim.id = 'instantAppsPopoverScrim';
    scrim.addEventListener('click', () => this.endTour());
    document.body.appendChild(scrim);
    const refIds = Array.from(this.instantAppsPopovers.keys());
    this.open(refIds[0]);
  }
  async endTour() {
    const scrim = document.getElementById('instantAppsPopoverScrim');
    scrim === null || scrim === void 0 ? void 0 : scrim.remove();
    this.close(this.currentId);
    this.inTour = false;
    this.handlePopoverProps({ dismissble: true, pagination: false, disableAction: false });
  }
  get host() { return this; }
  static get style() { return instantAppsPopoversCss; }
};
InstantAppsPopovers$1 = /*@__PURE__*/ proxyCustomElement(InstantAppsPopovers$1, [4, "instant-apps-popovers", {
    "inTour": [1540, "in-tour"],
    "instantAppsPopovers": [16],
    "beforeOpen": [16],
    "currentId": [32],
    "open": [64],
    "close": [64],
    "beginTour": [64],
    "endTour": [64]
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
