import { p as promiseResolve, b as bootstrapLazy } from './index-91b43dd0.js';

/*
 Stencil Client Patch Browser v2.12.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["instant-apps-popover_2",[[4,"instant-apps-popover",{"popoverTitle":[513,"popover-title"],"subtitle":[513],"content":[513],"mediaSrc":[513,"media-src"],"index":[514],"referenceElement":[513,"reference-element"],"parent":[16],"pagination":[516],"beforeOpen":[16],"messages":[32]}],[1,"instant-apps-popovers",{"instantAppsPopovers":[16],"currentId":[32],"previous":[32],"open":[64],"close":[64]}]]],["instant-apps-header",[[1,"instant-apps-header",{"titleText":[1,"title-text"],"backgroundColor":[1,"background-color"],"textColor":[1,"text-color"],"logoImage":[1,"logo-image"],"logoImageAltText":[1,"logo-image-alt-text"],"logoLink":[1,"logo-link"],"label":[1]}]]],["instant-apps-social-share",[[1,"instant-apps-social-share",{"mode":[513],"shareUrl":[1025,"share-url"],"shareText":[513,"share-text"],"embed":[516],"shareButtonColor":[513,"share-button-color"],"iframeInnerText":[513,"iframe-inner-text"],"view":[16],"displayTipText":[516,"display-tip-text"],"socialMedia":[516,"social-media"],"shareIconsLayout":[513,"share-icons-layout"],"scale":[513],"defaultUrlParams":[16],"messages":[32],"opened":[32],"copied":[32],"inlineCopyLinkOpened":[32],"inlineCopyEmbedOpened":[32],"embedWidth":[32],"embedHeight":[32]}]]]], options);
});
