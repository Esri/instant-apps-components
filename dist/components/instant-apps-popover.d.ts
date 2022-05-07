import type { Components, JSX } from "../types/components";

interface InstantAppsPopover extends Components.InstantAppsPopover, HTMLElement {}
export const InstantAppsPopover: {
  prototype: InstantAppsPopover;
  new (): InstantAppsPopover;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
