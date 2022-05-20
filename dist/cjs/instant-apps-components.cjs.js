'use strict';

const index = require('./index-9b4daf99.js');

/*
 Stencil Client Patch Browser v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('instant-apps-components.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["instant-apps-popover_2.cjs",[[4,"instant-apps-popover",{"popoverTitle":[513,"popover-title"],"subtitle":[513],"content":[513],"mediaSrc":[513,"media-src"],"index":[514],"referenceElement":[513,"reference-element"],"parent":[16],"pagination":[516],"beforeOpen":[16],"messages":[32]}],[1,"instant-apps-popovers",{"instantAppsPopovers":[16],"currentId":[32],"previous":[32],"open":[64],"close":[64]}]]],["instant-apps-header.cjs",[[1,"instant-apps-header",{"titleText":[1,"title-text"],"backgroundColor":[1,"background-color"],"textColor":[1,"text-color"],"logoImage":[1,"logo-image"],"logoImageAltText":[1,"logo-image-alt-text"],"logoLink":[1,"logo-link"],"label":[1]}]]],["instant-apps-social-share.cjs",[[1,"instant-apps-social-share",{"mode":[513],"shareUrl":[1025,"share-url"],"shareText":[513,"share-text"],"embed":[516],"shareButtonColor":[513,"share-button-color"],"iframeInnerText":[513,"iframe-inner-text"],"view":[16],"displayTipText":[516,"display-tip-text"],"socialMedia":[516,"social-media"],"scale":[513],"defaultUrlParams":[16],"messages":[32],"opened":[32],"copied":[32],"inlineCopyLinkOpened":[32],"inlineCopyEmbedOpened":[32],"embedWidth":[32],"embedHeight":[32]}]]]], options);
});
