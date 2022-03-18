'use strict';

const index = require('./index-4b3cfad4.js');

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
  return index.bootstrapLazy([["instant-apps-header_2.cjs",[[1,"instant-apps-header",{"titleText":[1,"title-text"],"backgroundColor":[1,"background-color"],"textColor":[1,"text-color"],"logoImage":[1,"logo-image"],"logoImageAltText":[1,"logo-image-alt-text"],"logoLink":[1,"logo-link"],"label":[1]}],[1,"instant-apps-social-share",{"mode":[513],"shareUrl":[1025,"share-url"],"shareText":[513,"share-text"],"embed":[516],"shareButtonColor":[513,"share-button-color"],"queryString":[513,"query-string"],"iframeInnerText":[513,"iframe-inner-text"],"view":[16],"messages":[32],"opened":[32],"copied":[32],"inlineCopyLinkOpened":[32],"inlineCopyEmbedOpened":[32],"embedWidth":[32],"embedHeight":[32]}]]]], options);
});
