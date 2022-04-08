import type { Components, JSX } from "../types/components";

interface InstantAppsHeader extends Components.InstantAppsHeader, HTMLElement {}
export const InstantAppsHeader: {
  prototype: InstantAppsHeader;
  new (): InstantAppsHeader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
