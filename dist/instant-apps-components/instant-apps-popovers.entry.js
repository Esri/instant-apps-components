import { r as registerInstance, h, e as Host, g as getElement } from './index-d3b0f395.js';

const instantAppsPopoversCss = ":host{display:block}";

let InstantAppsPopovers = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.instantAppsPopovers = {};
  }
  componentDidLoad() {
    var _a;
    const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
    popovers.forEach(popover => {
      const referenceElement = popover.getAttribute('reference-element');
      this.instantAppsPopovers[referenceElement] = popover;
    });
    this.host.addEventListener('calcitePopoverOpen', this.handlePrevious.bind(this));
  }
  render() {
    return (h(Host, null, h("slot", { name: "popovers" })));
  }
  handlePrevious(e) {
    const node = e.target;
    if (this.previous) {
      const previousReference = this.previous.getAttribute('reference-element');
      const currentReference = node.getAttribute('reference-element');
      if (previousReference === currentReference)
        return;
      this.previous.toggle(false);
    }
    this.previous = node;
  }
  get host() { return getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

export { InstantAppsPopovers as instant_apps_popovers };
