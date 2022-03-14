import type { Components, JSX } from "../types/components";

interface InstantAppsSocialShare extends Components.InstantAppsSocialShare, HTMLElement {}
export const InstantAppsSocialShare: {
  prototype: InstantAppsSocialShare;
  new (): InstantAppsSocialShare;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
