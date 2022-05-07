import { r as registerInstance, h } from './index-d3b0f395.js';

const instantAppsPopoverCss = ":host{display:block}";

let InstantAppsPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("calcite-popover", { "reference-element": this.referenceElement, heading: this.popoverTitle, "auto-close": "true", dismissible: "true", placement: "leading" }, h("div", null, h("slot", { name: "action" }), h("section", null, this.content), h("calcite-button", { appearance: "outline", color: "neutral" }, "Back"), h("calcite-button", null, "Next"))));
  }
};
InstantAppsPopover.style = instantAppsPopoverCss;

export { InstantAppsPopover as instant_apps_popover };
