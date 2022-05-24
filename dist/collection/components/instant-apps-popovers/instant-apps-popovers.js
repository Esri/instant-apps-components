import { Component, Host, h, Prop, Element, State, Method } from '@stencil/core';
export class InstantAppsPopovers {
  constructor() {
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
    return (h(Host, null,
      h("slot", { name: "popovers" })));
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
  static get is() { return "instant-apps-popovers"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["instant-apps-popovers.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["instant-apps-popovers.css"]
  }; }
  static get properties() { return {
    "instantAppsPopovers": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "Map<string, HTMLInstantAppsPopoverElement>",
        "resolved": "Map<string, HTMLInstantAppsPopoverElement>",
        "references": {
          "Map": {
            "location": "global"
          },
          "HTMLInstantAppsPopoverElement": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "defaultValue": "new Map()"
    }
  }; }
  static get states() { return {
    "currentId": {},
    "previous": {}
  }; }
  static get methods() { return {
    "open": {
      "complexType": {
        "signature": "(key: string) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "HTMLInstantAppsPopoverElement": {
            "location": "global"
          },
          "HTMLCalcitePopoverElement": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    },
    "close": {
      "complexType": {
        "signature": "(key: string) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          },
          "HTMLCalcitePopoverElement": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "host"; }
}
