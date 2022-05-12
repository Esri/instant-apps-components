import { r as registerInstance, h } from './index-6dd55e84.js';

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{padding:2.5%;padding-top:0;max-width:25vw}.instant-apps-popover__content .instant-apps-popover__button-container{display:flex;align-items:center;justify-content:flex-end;margin-top:10px}.instant-apps-popover__content .instant-apps-popover__button-container calcite-button:last-child{margin-left:5px}";

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
};
let InstantAppsPopover = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    var _a, _b;
    const { index } = this;
    const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
    const isFirst = index === 0;
    const isLast = index === size - 1;
    return (h("calcite-popover", { "reference-element": this.referenceElement, heading: this.popoverTitle, "auto-close": "true", dismissible: "true", placement: "leading" }, h("div", { class: CSS.content }, h("slot", { name: "action" }), h("section", null, this.content), h("div", { class: CSS.buttonContainer }, !isFirst ? (h("calcite-button", { key: "prev", onClick: () => { var _a; return (_a = this.parent) === null || _a === void 0 ? void 0 : _a.page('back'); }, appearance: "outline", color: "neutral" }, "Back")) : null, h("calcite-button", { key: "next", onClick: () => { var _a; return (_a = this.parent) === null || _a === void 0 ? void 0 : _a.page('next'); } }, isLast ? 'Done' : 'Next')))));
  }
};
InstantAppsPopover.style = instantAppsPopoverCss;

export { InstantAppsPopover as instant_apps_popover };
