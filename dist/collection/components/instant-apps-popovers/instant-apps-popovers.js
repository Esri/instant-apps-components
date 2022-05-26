import { Component, Host, h, Prop, Element, State, Method } from '@stencil/core';
export class InstantAppsPopovers {
  constructor() {
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
    return (h(Host, null,
      h("slot", { name: "popovers" })));
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
  static get is() { return "instant-apps-popovers"; }
  static get originalStyleUrls() { return {
    "$": ["instant-apps-popovers.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["instant-apps-popovers.css"]
  }; }
  static get properties() { return {
    "inTour": {
      "type": "boolean",
      "mutable": true,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "in-tour",
      "reflect": true
    },
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
    },
    "beforeOpen": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "() => Promise<void>",
        "resolved": "() => Promise<void>",
        "references": {
          "Promise": {
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
      "defaultValue": "() => Promise.resolve()"
    }
  }; }
  static get states() { return {
    "currentId": {}
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
    },
    "beginTour": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
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
    "endTour": {
      "complexType": {
        "signature": "() => Promise<void>",
        "parameters": [],
        "references": {
          "Promise": {
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
