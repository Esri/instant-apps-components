/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface InstantAppsHeader {
        "backgroundColor": string;
        "label": string;
        "logoImage": string;
        "logoImageAltText": string;
        "logoLink": string;
        "textColor": string;
        "titleText": string;
    }
}
declare global {
    interface HTMLInstantAppsHeaderElement extends Components.InstantAppsHeader, HTMLStencilElement {
    }
    var HTMLInstantAppsHeaderElement: {
        prototype: HTMLInstantAppsHeaderElement;
        new (): HTMLInstantAppsHeaderElement;
    };
    interface HTMLElementTagNameMap {
        "instant-apps-header": HTMLInstantAppsHeaderElement;
    }
}
declare namespace LocalJSX {
    interface InstantAppsHeader {
        "backgroundColor"?: string;
        "label"?: string;
        "logoImage"?: string;
        "logoImageAltText"?: string;
        "logoLink"?: string;
        "textColor"?: string;
        "titleText"?: string;
    }
    interface IntrinsicElements {
        "instant-apps-header": InstantAppsHeader;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "instant-apps-header": LocalJSX.InstantAppsHeader & JSXBase.HTMLAttributes<HTMLInstantAppsHeaderElement>;
        }
    }
}