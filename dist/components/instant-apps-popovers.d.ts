import type { Components, JSX } from "../types/components";

interface InstantAppsPopovers extends Components.InstantAppsPopovers, HTMLElement {}
export const InstantAppsPopovers: {
  prototype: InstantAppsPopovers;
  new (): InstantAppsPopovers;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
