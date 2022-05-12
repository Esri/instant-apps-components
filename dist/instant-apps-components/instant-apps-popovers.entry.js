import { r as registerInstance, h, e as Host, g as getElement } from './index-6dd55e84.js';

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
    this.host.addEventListener('calcitePopoverOpen', (e) => {
      const node = e.target;
      this.handlePrevious(node);
    });
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
  get host() { return getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

export { InstantAppsPopovers as instant_apps_popovers };
