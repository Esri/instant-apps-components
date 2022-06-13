'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-172ac3b5.js');

/*
 Stencil Client Patch Esm v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["instant-apps-popover_2.cjs",[[0,"instant-apps-popover",{"popoverTitle":[513,"popover-title"],"subtitle":[513],"content":[513],"mediaSrc":[513,"media-src"],"index":[514],"referenceElement":[513,"reference-element"],"parent":[16],"placement":[1],"refId":[1,"ref-id"],"pagination":[516],"disableAction":[516,"disable-action"],"popoverAction":[16],"intlPopoverAction":[1,"intl-popover-action"],"intlOf":[1,"intl-of"],"messages":[32]}],[4,"instant-apps-popovers",{"inTour":[1540,"in-tour"],"instantAppsPopovers":[16],"beforeOpen":[16],"currentId":[32],"open":[64],"close":[64],"beginTour":[64],"endTour":[64]}]]],["instant-apps-header.cjs",[[1,"instant-apps-header",{"titleText":[1,"title-text"],"backgroundColor":[1,"background-color"],"textColor":[1,"text-color"],"logoImage":[1,"logo-image"],"logoImageAltText":[1,"logo-image-alt-text"],"logoLink":[1,"logo-link"],"label":[1]}]]],["instant-apps-social-share.cjs",[[1,"instant-apps-social-share",{"mode":[513],"shareUrl":[1025,"share-url"],"shareText":[513,"share-text"],"embed":[516],"shareButtonColor":[513,"share-button-color"],"iframeInnerText":[513,"iframe-inner-text"],"view":[16],"displayTipText":[516,"display-tip-text"],"socialMedia":[516,"social-media"],"shareIconsLayout":[513,"share-icons-layout"],"scale":[513],"defaultUrlParams":[16],"messages":[32],"opened":[32],"copied":[32],"inlineCopyLinkOpened":[32],"inlineCopyEmbedOpened":[32],"embedWidth":[32],"embedHeight":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
