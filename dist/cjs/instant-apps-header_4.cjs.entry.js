'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-172ac3b5.js');

const instantAppsHeaderCss = ":host{width:100%}:host header{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;width:100%;height:100%;padding:0 0.5%;background-color:#0079c1;padding-top:5px;padding-bottom:5px}:host header .instant-apps-header__header-content{display:flex;align-items:center}:host header .instant-apps-header__header-content img{width:6%;padding:0 5px}:host header .instant-apps-header__header-content a{display:flex;align-items:center;width:8%;padding-right:5px}:host header .instant-apps-header__header-content a img{width:100%;padding-right:0}:host header .instant-apps-header__header-content h1{margin:0;font-size:18px;color:var(--calcite-ui-text-inverse);font-weight:430}";

const CSS$2 = {
  headerContent: 'instant-apps-header__header-content',
};
let InstantAppsHeader = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return (index.h(index.Host, null, index.h("header", { style: { backgroundColor: this.backgroundColor } }, index.h("span", { class: CSS$2.headerContent }, this.logoImage && this.logoLink ? (index.h("a", { href: `${this.logoLink}`, target: "_blank" }, index.h("img", { src: `${this.logoImage}`, alt: `${this.logoImageAltText}` }))) : this.logoImage ? (index.h("img", { src: `${this.logoImage}`, alt: this.logoImageAltText })) : (''), index.h("h1", { style: { color: this.textColor } }, this.titleText)), index.h("slot", { name: "actions-end" }))));
  }
};
InstantAppsHeader.style = instantAppsHeaderCss;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire();
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var esriLoader = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	factory(exports) ;
}(commonjsGlobal, (function (exports) {
/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var isBrowser = typeof window !== 'undefined';
// allow consuming libraries to provide their own Promise implementations
var utils = {
    Promise: isBrowser ? window['Promise'] : undefined
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var DEFAULT_VERSION = '4.23';
var NEXT = 'next';
function parseVersion(version) {
    if (version.toLowerCase() === NEXT) {
        return NEXT;
    }
    var match = version && version.match(/^(\d)\.(\d+)/);
    return match && {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10)
    };
}
/**
 * Get the CDN url for a given version
 *
 * @param version Ex: '4.23' or '3.40'. Defaults to the latest 4.x version.
 */
function getCdnUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    return "https://js.arcgis.com/" + version + "/";
}
/**
 * Get the CDN url for a the CSS for a given version and/or theme
 *
 * @param version Ex: '4.23', '3.40', or 'next'. Defaults to the latest 4.x version.
 */
function getCdnCssUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    var baseUrl = getCdnUrl(version);
    var parsedVersion = parseVersion(version);
    if (parsedVersion !== NEXT && parsedVersion.major === 3) {
        // NOTE: at 3.11 the CSS moved from the /js folder to the root
        var path = parsedVersion.minor <= 10 ? 'js/' : '';
        return "" + baseUrl + path + "esri/css/esri.css";
    }
    else {
        // assume 4.x
        return baseUrl + "esri/themes/light/main.css";
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function createStylesheetLink(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
}
function insertLink(link, before) {
    if (before) {
        // the link should be inserted before a specific node
        var beforeNode = document.querySelector(before);
        beforeNode.parentNode.insertBefore(link, beforeNode);
    }
    else {
        // append the link to then end of the head tag
        document.head.appendChild(link);
    }
}
// check if the css url has been injected or added manually
function getCss(url) {
    return document.querySelector("link[href*=\"" + url + "\"]");
}
function getCssUrl(urlOrVersion) {
    return !urlOrVersion || parseVersion(urlOrVersion)
        // if it's a valid version string return the CDN URL
        ? getCdnCssUrl(urlOrVersion)
        // otherwise assume it's a URL and return that
        : urlOrVersion;
}
// lazy load the CSS needed for the ArcGIS API
function loadCss(urlOrVersion, before) {
    var url = getCssUrl(urlOrVersion);
    var link = getCss(url);
    if (!link) {
        // create & load the css link
        link = createStylesheetLink(url);
        insertLink(link, before);
    }
    return link;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var defaultOptions = {};
function createScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('data-esri-loader', 'loading');
    return script;
}
// add a one-time load handler to script
// and optionally add a one time error handler as well
function handleScriptLoad(script, callback, errback) {
    var onScriptError;
    if (errback) {
        // set up an error handler as well
        onScriptError = handleScriptError(script, errback);
    }
    var onScriptLoad = function () {
        // pass the script to the callback
        callback(script);
        // remove this event listener
        script.removeEventListener('load', onScriptLoad, false);
        if (onScriptError) {
            // remove the error listener as well
            script.removeEventListener('error', onScriptError, false);
        }
    };
    script.addEventListener('load', onScriptLoad, false);
}
// add a one-time error handler to the script
function handleScriptError(script, callback) {
    var onScriptError = function (e) {
        // reject the promise and remove this event listener
        callback(e.error || new Error("There was an error attempting to load " + script.src));
        // remove this event listener
        script.removeEventListener('error', onScriptError, false);
    };
    script.addEventListener('error', onScriptError, false);
    return onScriptError;
}
// allow the user to configure default script options rather than passing options to `loadModules` each time
function setDefaultOptions(options) {
    if (options === void 0) { options = {}; }
    defaultOptions = options;
}
// get the script injected by this library
function getScript() {
    return document.querySelector('script[data-esri-loader]');
}
// has ArcGIS API been loaded on the page yet?
function isLoaded() {
    var globalRequire = window['require'];
    // .on() ensures that it's Dojo's AMD loader
    return globalRequire && globalRequire.on;
}
// load the ArcGIS API on the page
function loadScript(options) {
    if (options === void 0) { options = {}; }
    // we would have liked to use spread like { ...defaultOptions, ...options }
    // but TS would inject a polyfill that would require use to configure rollup w content: 'window'
    // if we have another occasion to use spread, let's do that and replace this for...in
    var opts = {};
    [defaultOptions, options].forEach(function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                opts[prop] = obj[prop];
            }
        }
    });
    // URL to load
    var version = opts.version;
    var url = opts.url || getCdnUrl(version);
    return new utils.Promise(function (resolve, reject) {
        var script = getScript();
        if (script) {
            // the API is already loaded or in the process of loading...
            // NOTE: have to test against scr attribute value, not script.src
            // b/c the latter will return the full url for relative paths
            var src = script.getAttribute('src');
            if (src !== url) {
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded (" + src + ")."));
            }
            else {
                if (isLoaded()) {
                    // the script has already successfully loaded
                    resolve(script);
                }
                else {
                    // wait for the script to load and then resolve
                    handleScriptLoad(script, resolve, reject);
                }
            }
        }
        else {
            if (isLoaded()) {
                // the API has been loaded by some other means
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded."));
            }
            else {
                // this is the first time attempting to load the API
                var css = opts.css;
                if (css) {
                    var useVersion = css === true;
                    // load the css before loading the script
                    loadCss(useVersion ? version : css, opts.insertCssBefore);
                }
                // create a script object whose source points to the API
                script = createScript(url);
                // _currentUrl = url;
                // once the script is loaded...
                handleScriptLoad(script, function () {
                    // update the status of the script
                    script.setAttribute('data-esri-loader', 'loaded');
                    // return the script
                    resolve(script);
                }, reject);
                // load the script
                document.body.appendChild(script);
            }
        }
    });
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// wrap Dojo's require() in a promise
function requireModules(modules) {
    return new utils.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        var errorHandler = window['require'].on('error', reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // remove error handler
            errorHandler.remove();
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
// returns a promise that resolves with an array of the required modules
// also will attempt to lazy load the ArcGIS API if it has not already been loaded
function loadModules(modules, loadScriptOptions) {
    if (loadScriptOptions === void 0) { loadScriptOptions = {}; }
    if (!isLoaded()) {
        // script is not yet loaded, is it in the process of loading?
        var script = getScript();
        var src = script && script.getAttribute('src');
        if (!loadScriptOptions.url && src) {
            // script is still loading and user did not specify a URL
            // in this case we want to default to the URL that's being loaded
            // instead of defaulting to the latest 4.x URL
            loadScriptOptions.url = src;
        }
        // attempt to load the script then load the modules
        return loadScript(loadScriptOptions).then(function () { return requireModules(modules); });
    }
    else {
        // script is already loaded, just load the modules
        return requireModules(modules);
    }
}

/*
  Copyright (c) 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// re-export the functions that are part of the public API

exports.utils = utils;
exports.loadModules = loadModules;
exports.getScript = getScript;
exports.isLoaded = isLoaded;
exports.loadScript = loadScript;
exports.setDefaultOptions = setDefaultOptions;
exports.loadCss = loadCss;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-loader.js.map
});

/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const loadModules = async (moduleNames, options) => {
  const mods = await esriLoader.loadModules(moduleNames, options);
  return mods.map(mod => (mod.__esModule && mod.default ? mod.default : mod));
};

/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
const languageMap = new Map([
  ['ar', 'ar'],
  ['bg', 'bg'],
  ['bs', 'bs'],
  ['ca', 'ca'],
  ['cs', 'cs'],
  ['da', 'da'],
  ['de', 'de'],
  ['el', 'el'],
  ['en', 'en'],
  ['es', 'es'],
  ['et', 'et'],
  ['fi', 'fi'],
  ['fr', 'fr'],
  ['he', 'he'],
  ['hr', 'hr'],
  ['hu', 'hu'],
  ['id', 'id'],
  ['it', 'it'],
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['lt', 'lt'],
  ['lv', 'lv'],
  ['nb', 'nb'],
  ['nl', 'nl'],
  ['pl', 'pl'],
  ['pt-br', 'pt-BR'],
  ['pt-pt', 'pt-PT'],
  ['ro', 'ro'],
  ['ru', 'ru'],
  ['sk', 'sk'],
  ['sl', 'sl'],
  ['sr', 'sr'],
  ['sv', 'sv'],
  ['th', 'th'],
  ['tr', 'tr'],
  ['uk', 'uk'],
  ['vi', 'vi'],
  ['zh-cn', 'zh-CN'],
  ['zh-hk', 'zh-HK'],
  ['zh-tw', 'zh-TW'],
]);

// https://medium.com/stencil-tricks/implementing-internationalisation-i18n-with-stencil-5e6559554117
function getComponentClosestLanguage(element) {
  var _a, _b, _c;
  const closestElement = (_a = element.closest('[lang]')) !== null && _a !== void 0 ? _a : (_c = (_b = element.shadowRoot) === null || _b === void 0 ? void 0 : _b.ownerDocument) === null || _c === void 0 ? void 0 : _c.documentElement;
  // language set by the calling application or browser. defaults to english.
  const lang = ((closestElement === null || closestElement === void 0 ? void 0 : closestElement.lang) || (navigator === null || navigator === void 0 ? void 0 : navigator.language) || 'en').toLowerCase();
  if (languageMap.has(lang)) {
    return languageMap.get(lang);
  }
  else {
    // "ru-RU" maps to "ru" use case
    if (languageMap.has(lang.slice(0, 2))) {
      return languageMap.get(lang.slice(0, 2));
    }
    else {
      return 'en';
    }
  }
}
function fetchLocaleStringsForComponent(componentName, locale) {
  return new Promise((resolve, reject) => {
    fetch(index.getAssetPath(`../assets/t9n/${componentName}/resources_${locale}.json`)).then(result => {
      if (result.ok)
        resolve(result.json());
      else
        reject();
    }, () => reject());
  });
}
async function getLocaleComponentStrings(element) {
  const componentName = element.tagName.toLowerCase();
  const componentLanguage = getComponentClosestLanguage(element);
  let strings;
  try {
    strings = await fetchLocaleStringsForComponent(componentName, componentLanguage);
  }
  catch (e) {
    console.warn(`no locale for ${componentName} (${componentLanguage}) loading default locale en.`);
    strings = await fetchLocaleStringsForComponent(componentName, 'en');
  }
  return [strings, componentLanguage];
}

const instantAppsPopoverCss = ":host{display:block}.instant-apps-popover__content{display:flex;flex-direction:column;padding:0 5% 5% 5%;max-width:35vw;font-family:var(--calcite-sans-family);font-size:14px}.instant-apps-popover__content .instant-apps-popover__action{align-self:flex-start;--calcite-ui-foreground-2:transparent}.instant-apps-popover__content span{display:inline-block;font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);margin:0 0 10px 0;font-family:var(--calcite-sans-family)}.instant-apps-popover__content p{line-height:19.12px;margin:0;margin-bottom:10px;font-family:var(--calcite-sans-family)}.instant-apps-popover__content .instant-apps-popover__footer{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.instant-apps-popover__content .instant-apps-popover__footer span{margin-bottom:0;font-weight:normal;font-size:14px;font-family:var(--calcite-sans-family)}.instant-apps-popover__content .instant-apps-popover__footer calcite-button:first-child{--calcite-ui-foreground-3:transparent}.instant-apps-popover__content .instant-apps-popover__footer calcite-button:last-child{margin-left:5px}.instant-apps-popover__content .instant-apps-popover__img{width:100%;margin-bottom:10px}.instant-apps-popover__content.instant-apps-popover--action-disabled{padding:5%}.instant-apps-popover__content.instant-apps-popover--action-disabled #subtitle{margin:0 0 10px 0}";

const CSS$1 = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
  action: 'instant-apps-popover__action',
  actionDisabled: 'instant-apps-popover--action-disabled',
  img: 'instant-apps-popover__img',
  footer: 'instant-apps-popover__footer',
};
let InstantAppsPopover = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.placement = 'trailing-start';
    this.pagination = false;
    this.disableAction = false;
    this.intlOf = 'of';
  }
  componentDidLoad() {
    this.getMessages();
  }
  componentDidUpdate() {
    this.popoverEl.referenceElement = this.referenceElement;
  }
  render() {
    var _a, _b, _c, _d;
    return (index.h("calcite-popover", { ref: (el) => (this.popoverEl = el), heading: this.popoverTitle, "auto-close": "true", placement: this.placement, "intl-close": (_a = this.messages) === null || _a === void 0 ? void 0 : _a.close, "trigger-disabled": "true", "ref-id": this.refId, dismissible: "true" }, index.h("div", { class: `${CSS$1.content}${this.disableAction ? ` ${CSS$1.actionDisabled}` : ''}` }, !this.disableAction ? (index.h("calcite-action", { key: "popover-action", class: CSS$1.action, onclick: this.popoverAction, icon: document.dir === 'rtl' ? 'chevron-right' : 'chevron-left', compact: "true", "text-enabled": "true", text: this.intlPopoverAction ? this.intlPopoverAction : (_b = this.messages) === null || _b === void 0 ? void 0 : _b.back })) : null, index.h("section", null, index.h("span", { id: "subtitle" }, this.subtitle), index.h("p", null, this.content), this.imgSrc ? index.h("img", { key: `iac-popover-img-${this.refId}`, class: CSS$1.img, src: this.imgSrc, alt: this.imgAlt ? this.imgAlt : '' }) : null), this.pagination ? (index.h("div", { key: `iac-popover-footer-${this.index}`, class: CSS$1.footer }, index.h("span", null, this.index + 1, " ", this.intlOf, " ", (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.instantAppsPopovers) === null || _d === void 0 ? void 0 :
      _d.size), this.renderPagination())) : null)));
  }
  renderPagination() {
    var _a, _b;
    const { index: index$1, messages, parent } = this;
    const size = (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.instantAppsPopovers) === null || _b === void 0 ? void 0 : _b.size;
    const isFirst = index$1 === 0;
    const isLast = index$1 === size - 1;
    return (index.h("div", { key: "pagination-button-container", class: CSS$1.buttonContainer }, !isFirst ? (index.h("calcite-button", { key: "prev", onClick: () => parent === null || parent === void 0 ? void 0 : parent.previous(), appearance: "outline", color: "neutral" }, messages === null || messages === void 0 ? void 0 : messages.back)) : null, index.h("calcite-button", { key: "next", onClick: () => {
        if (isLast) {
          parent === null || parent === void 0 ? void 0 : parent.done();
        }
        else {
          parent === null || parent === void 0 ? void 0 : parent.next();
        }
      } }, isLast ? messages === null || messages === void 0 ? void 0 : messages.done : messages === null || messages === void 0 ? void 0 : messages.next)));
  }
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0];
  }
  get el() { return index.getElement(this); }
};
InstantAppsPopover.style = instantAppsPopoverCss;

const instantAppsPopoversCss = ":host{display:block}";

let InstantAppsPopovers = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.instantAppsPopovers = new Map();
    this.beforeOpen = () => Promise.resolve();
  }
  componentWillLoad() {
    var _a;
    const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
    popovers.forEach((popover, popoverIndex) => {
      const refId = popover.getAttribute('ref-id');
      popover.parent = this;
      popover.index = popoverIndex;
      this.instantAppsPopovers.set(refId, popover);
    });
    this.host.addEventListener('calcitePopoverOpen', e => {
      const node = e.target;
      const refId = node.getAttribute('ref-id');
      this.currentId = refId;
    });
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", { name: "popovers" })));
  }
  next() {
    const refIds = Array.from(this.instantAppsPopovers.keys());
    const index = refIds.indexOf(this.currentId) + 1;
    const nextId = refIds[index];
    this.close(this.currentId);
    this.open(nextId);
  }
  previous() {
    const refIds = Array.from(this.instantAppsPopovers.keys());
    const index = refIds.indexOf(this.currentId) - 1;
    const previousId = refIds[index];
    this.close(this.currentId);
    this.open(previousId);
  }
  done() {
    this.endTour();
  }
  handlePopoverProps(config) {
    var _a;
    const popovers = Array.from((_a = this.host.querySelector("[slot='popovers']")) === null || _a === void 0 ? void 0 : _a.children);
    popovers.forEach(popover => {
      popover.disableAction = config.disableAction;
      popover.pagination = config.pagination;
    });
  }
  async open(key) {
    return this.beforeOpen().then(() => {
      var _a;
      const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
      popover.toggle(true);
    });
  }
  async close(key) {
    var _a;
    const popover = (_a = this.instantAppsPopovers.get(key)) === null || _a === void 0 ? void 0 : _a.firstElementChild;
    popover.toggle(false);
  }
  async beginTour() {
    this.inTour = true;
    this.handlePopoverProps({ pagination: true, disableAction: true });
    const refIds = Array.from(this.instantAppsPopovers.keys());
    this.open(refIds[0]);
  }
  async endTour() {
    this.close(this.currentId);
    this.inTour = false;
    this.handlePopoverProps({ pagination: false, disableAction: false });
  }
  get host() { return index.getElement(this); }
};
InstantAppsPopovers.style = instantAppsPopoversCss;

const instantAppsSocialShareCss = ":host{display:block;--instant-apps-social-share-width--s:200px;--instant-apps-social-share-width--m:280px;--instant-apps-social-share-width--l:320px;--instant-apps-social-share-width-horizontal--s:300px;--instant-apps-social-share-width-horizontal--m:380px;--instant-apps-social-share-width-horizontal--l:420px;--instant-apps-social-share-background-color:transparent;--instant-apps-social-share-popover-button-background-color:transparent;--instant-apps-social-share-popover-button-icon-color:var(--calcite-ui-icon-color);--instant-apps-social-share-embed-border:1px solid $border;--instant-apps-social-share-embed-text-area-text:#468540}:host .instant-apps-social-share__popover-button{background-color:var(--instant-apps-social-share-popover-button-background-color)}:host .instant-apps-social-share__popover-button calcite-icon{color:var(--instant-apps-social-share-popover-button-icon-color)}:host .instant-apps-social-share__dialog{box-sizing:border-box;height:auto;padding:10px 0;border-radius:5px}:host .instant-apps-social-share__dialog-embed{border:var(--instant-apps-social-share-embed-border);background-color:var(--instant-apps-social-share-background-color)}:host .instant-apps-social-share__options{margin:0;padding:1% 0 0 0;list-style-type:none}:host .instant-apps-social-share__options li{box-sizing:border-box;display:flex;align-items:center;width:100%;padding:5%;transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__options li .instant-apps-social-share__icon,:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{display:inline-block}:host .instant-apps-social-share__options li .instant-apps-social-share__icon{display:flex;align-items:center}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text{width:85%;margin-left:10px;word-break:break-word}:host .instant-apps-social-share__options li .instant-apps-social-share__option-text--rtl{margin-left:0;margin-right:10px}:host .instant-apps-social-share__options li:hover{cursor:pointer;background-color:var(--calcite-ui-foreground-2)}:host .instant-apps-social-share__tip{box-sizing:border-box;padding:0 5% 1% 5%}:host .instant-apps-social-share__tip-header{display:flex;align-items:center;color:#007ac2;margin:8px 0 5px 0}:host .instant-apps-social-share__tip-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__tip-content{line-height:17px;margin:0;padding-top:2%}:host .instant-apps-social-share__success{display:flex;flex-direction:column;padding:15px}:host .instant-apps-social-share__success-header{display:flex;align-items:center;font-weight:bold;margin-bottom:10px}:host .instant-apps-social-share__success-icon{display:flex;align-items:center;margin-right:5px}:host .instant-apps-social-share__success-icon calcite-icon{color:var(--calcite-ui-success)}:host .instant-apps-social-share__success-message{line-height:16px}:host .instant-apps-social-share__embed{box-sizing:border-box;width:100%;padding:5%;margin-bottom:10px;border-top:1px solid #d3d3d3}:host .instant-apps-social-share__embed-header{display:flex;align-items:center;margin-bottom:5px}:host .instant-apps-social-share__embed-header calcite-icon{margin-right:5px}:host .instant-apps-social-share__embed-code-text-area{border:1px solid #d3d3d3}:host .instant-apps-social-share__embed-code-text-area textarea{box-sizing:border-box;padding:4%;border:none;resize:none;background:transparent;width:100%;font-family:var(--calcite-sans-family);color:var(--calcite-ui-text-1)}:host .instant-apps-social-share__embed-code-text-area button{display:flex;align-items:center;text-align:start;width:100%;border:none;border-top:1px solid #d3d3d3;background-color:transparent;line-height:16px;font-weight:400;padding:3%;color:var(--calcite-ui-text-1)}:host .instant-apps-social-share__embed-code-text-area button calcite-icon{color:#007ac2;margin-right:3px}:host .instant-apps-social-share__embed-code-text-area button:hover{cursor:pointer;background-color:var(--calcite-ui-foreground-2);transition:background-color 0.15s ease-out 0s}:host .instant-apps-social-share__embed-text-area-text{font-weight:600;color:var(--instant-apps-social-share-embed-text-area-text)}:host .instant-apps-social-share__embed-dimensions{display:flex;justify-content:space-between;margin-top:10px}:host .instant-apps-social-share__embed-dimensions-input{width:47%;box-sizing:border-box}:host .instant-apps-social-share__embed-dimensions-input input{border:1px solid #d3d3d3;width:100%;height:25px;font-family:var(--calcite-sans-family)}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options{display:flex;justify-content:space-around;margin-bottom:8%}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li{flex-direction:column;padding:0}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li .instant-apps-social-share__option-text{white-space:nowrap;margin-left:0;margin-top:10px;text-align:center}:host .instant-apps-social-share__layout--horizontal .instant-apps-social-share__options li:hover{background-color:unset}:host([scale=s]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--s)}:host([scale=s]) .instant-apps-social-share__icon{width:16px;height:16px}:host([scale=s]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size--1)}:host([scale=s]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--s)}:host([scale=s]) .instant-apps-social-share__tip-header,:host([scale=s]) .instant-apps-social-share__tip-content,:host([scale=s]) .instant-apps-social-share__embed-header,:host([scale=s]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--2)}:host([scale=m]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--m)}:host([scale=m]) .instant-apps-social-share__icon{width:24px;height:24px}:host([scale=m]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-0)}:host([scale=m]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--m)}:host([scale=m]) .instant-apps-social-share__tip-header,:host([scale=m]) .instant-apps-social-share__tip-content,:host([scale=m]) .instant-apps-social-share__embed-header,:host([scale=m]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size--1)}:host([scale=l]) .instant-apps-social-share__dialog{width:var(--instant-apps-social-share-width--l)}:host([scale=l]) .instant-apps-social-share__icon{width:32px;height:32px}:host([scale=l]) .instant-apps-social-share__option-text{font-size:var(--calcite-font-size-1)}:host([scale=l]) .instant-apps-social-share__dialog.instant-apps-social-share__layout--horizontal{width:var(--instant-apps-social-share-width-horizontal--l)}:host([scale=l]) .instant-apps-social-share__tip-header,:host([scale=l]) .instant-apps-social-share__tip-content,:host([scale=l]) .instant-apps-social-share__embed-header,:host([scale=l]) .instant-apps-social-share__embed-dimensions-input{font-size:var(--calcite-font-size-0)}";

const base = 'instant-apps-social-share';
const CSS = {
  base,
  dialog: `${base}__dialog`,
  dialogEmbed: `${base}__dialog-embed`,
  dialogContent: `${base}__dialog-content`,
  options: `${base}__options`,
  tipContainer: `${base}__tip`,
  tipHeader: `${base}__tip-header`,
  tipContent: `${base}__tip-content`,
  icon: `${base}__icon`,
  optionText: `${base}__option-text`,
  popoverButton: `${base}__popover-button`,
  layout: {
    vertical: `${base}__layout--vertical`,
    horizontal: `${base}__layout--horizontal`,
  },
  success: {
    container: `${base}__success`,
    header: `${base}__success-header`,
    message: `${base}__success-message`,
    icon: `${base}__success-icon`,
  },
  embed: {
    container: `${base}__embed`,
    header: `${base}__embed-header`,
    embedCode: {
      container: `${base}__embed-code`,
      textArea: `${base}__embed-code-text-area`,
      copyButton: `${base}__embed-code-copy-button`,
    },
    textAreaText: `${base}__embed-text-area-text`,
    dimensions: {
      container: `${base}__embed-dimensions`,
      input: `${base}__embed-dimensions-input`,
    },
  },
  rtl: {
    optionText: `${base}__option-text--rtl`,
  },
};
const SOCIAL_URL_TEMPLATES = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
  twitter: 'https://twitter.com/intent/tweet?text={text}&url={url}',
  linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};
const SHORTEN_API = 'https://arcg.is/prod/shorten';
let InstantAppsSocialShare = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    // PUBLIC PROPERTIES
    this.mode = 'popover';
    this.shareUrl = window.location.href;
    this.shareText = '';
    this.embed = false;
    this.shareButtonColor = 'neutral';
    this.iframeInnerText = '';
    this.popoverButtonIconScale = 'm';
    this.displayTipText = true;
    this.socialMedia = true;
    this.shareIconsLayout = 'vertical';
    this.scale = 'm';
    this.defaultUrlParams = null;
    // mode = 'popover'
    this.opened = false;
    this.copied = false;
    // mode = 'inline'
    this.inlineCopyLinkOpened = false;
    this.inlineCopyEmbedOpened = false;
    this.embedWidth = 400;
    this.embedHeight = 600;
  }
  componentDidLoad() {
    var _a, _b;
    this.getMessages();
    this.setupAutoCloseListeners();
    if (this.mode === 'popover') {
      if (this.opened)
        this.popoverRef.toggle(true);
      this.popoverRef.addEventListener('calcitePopoverOpen', () => {
        if (!this.shareListRef)
          return;
        const firstNode = this.shareListRef.children[0];
        firstNode.focus();
      });
      this.popoverRef.addEventListener('keydown', this.handlePopoverRefKeyDown.bind(this));
    }
    if (this.embed) {
      (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.updateDimensions.bind(this, 'width'));
      (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.addEventListener('change', this.updateDimensions.bind(this, 'height'));
    }
  }
  disconnectedCallback() {
    var _a, _b, _c;
    document.documentElement.removeEventListener('click', this.autoCloseCallback.bind(this));
    if (this.mode === 'popover') {
      this.popoverRef.removeEventListener('click', this.stopPropagationCallback.bind(this));
      this.popoverRef.removeEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
      this.popoverRef.removeEventListener('keydown', this.handlePopoverRefKeyDown.bind(this));
    }
    else {
      (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.updateDimensions.bind(this));
      (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.removeEventListener('change', this.updateDimensions.bind(this));
      (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.removeEventListener('click', this.stopPropagationCallback.bind(this));
    }
  }
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0];
  }
  setupAutoCloseListeners() {
    var _a, _b, _c;
    document.documentElement.addEventListener('click', this.autoCloseCallback.bind(this));
    if (this.mode === 'popover') {
      (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.addEventListener('click', this.stopPropagationCallback.bind(this));
      (_b = this.popoverRef) === null || _b === void 0 ? void 0 : _b.addEventListener('calcitePopoverClose', this.resetPopoverCopyState.bind(this));
    }
    else {
      (_c = this.dialogContentRef) === null || _c === void 0 ? void 0 : _c.addEventListener('click', this.stopPropagationCallback.bind(this));
    }
  }
  handlePopoverRefKeyDown(e) {
    var _a, _b;
    if (e.code === 'Tab') {
      if (!this.shareListRef)
        return;
      const node = e.target;
      const firstFocusableEl = this.shareListRef.children[0];
      const lastFocusableEl = this.shareListRef.children[((_a = this.shareListRef) === null || _a === void 0 ? void 0 : _a.children.length) - 1];
      if (e.shiftKey && node === firstFocusableEl) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
      else if (!e.shiftKey && node === lastFocusableEl) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    }
    else if (e.code === 'Escape') {
      this.closePopover();
      (_b = this.popoverButtonRef) === null || _b === void 0 ? void 0 : _b.setFocus();
    }
  }
  autoCloseCallback() {
    var _a, _b, _c;
    if (this.mode === 'popover') {
      this.opened = false;
      (_a = this.popoverRef) === null || _a === void 0 ? void 0 : _a.toggle(this.opened);
    }
    else {
      (_b = this.copyLinkPopoverRef) === null || _b === void 0 ? void 0 : _b.toggle(false);
      this.inlineCopyLinkOpened = false;
      (_c = this.copyEmbedPopoverRef) === null || _c === void 0 ? void 0 : _c.toggle(false);
      this.inlineCopyEmbedOpened = false;
    }
  }
  stopPropagationCallback(event) {
    event.stopPropagation();
  }
  resetPopoverCopyState() {
    var _a;
    (_a = this.popoverButtonRef) === null || _a === void 0 ? void 0 : _a.setFocus();
    setTimeout(() => {
      this.copied = false;
    }, 200);
  }
  updateDimensions(type) {
    var _a, _b;
    if (type === 'width') {
      const value = (_a = this.embedWidthRef) === null || _a === void 0 ? void 0 : _a.value;
      this.embedWidth = parseInt(value);
    }
    else {
      const value = (_b = this.embedHeightRef) === null || _b === void 0 ? void 0 : _b.value;
      this.embedHeight = parseInt(value);
    }
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const content = this.copied && this.mode === 'popover' ? (this.renderSuccess()) : (index.h("div", { class: CSS.dialogContent }, this.renderOptions(), this.displayTipText ? this.renderTip() : null, this.embed ? this.renderEmbed() : null));
    const layoutClass = this.shareIconsLayout === 'vertical' ? ` ${CSS.layout.vertical}` : ` ${CSS.layout.horizontal}`;
    const dialogContent = (index.h("div", { ref: el => (this.dialogContentRef = el), class: `${CSS.dialog}${layoutClass}` }, content));
    return (index.h(index.Host, null, this.mode === 'popover'
      ? [
        index.h("calcite-popover", { ref: (el) => (this.popoverRef = el), label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, "reference-element": "shareButton", placement: "bottom-start", scale: this.scale }, dialogContent),
        index.h("calcite-button", { ref: el => (this.popoverButtonRef = el), onClick: this.togglePopover.bind(this), id: "shareButton", class: CSS.popoverButton, color: this.shareButtonColor, appearance: "transparent", label: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, title: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label, scale: this.scale }, index.h("calcite-icon", { icon: "share", scale: this.popoverButtonIconScale })),
      ]
      : [
        dialogContent,
        index.h("calcite-popover", { ref: (el) => (this.copyLinkPopoverRef = el), label: (_h = (_g = this.messages) === null || _g === void 0 ? void 0 : _g.share) === null || _h === void 0 ? void 0 : _h.label, "reference-element": "copyToClipboard", placement: "trailing", scale: this.scale }, this.renderSuccess()),
        index.h("calcite-popover", { ref: (el) => (this.copyEmbedPopoverRef = el), label: (_k = (_j = this.messages) === null || _j === void 0 ? void 0 : _j.share) === null || _k === void 0 ? void 0 : _k.label, "reference-element": "copyEmbedToClipboard", placement: "trailing", scale: this.scale }, this.renderEmbedSuccess()),
      ]));
  }
  renderSuccess() {
    var _a;
    const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
    return (index.h("div", { class: CSS.success.container }, index.h("span", { class: CSS.success.header }, index.h("span", { class: CSS.success.icon }, index.h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
      success.label), index.h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.url)));
  }
  renderEmbedSuccess() {
    var _a;
    const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
    return (index.h("div", { class: CSS.success.container }, index.h("span", { class: CSS.success.header }, index.h("span", { class: CSS.success.icon }, index.h("calcite-icon", { icon: "check-circle-f", scale: this.scale })), success === null || success === void 0 ? void 0 :
      success.label), index.h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.embed)));
  }
  renderOptions() {
    var _a, _b, _c, _d, _e;
    const options = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.options;
    const optionText_RTL = document.dir === 'rtl' ? ` ${CSS.rtl.optionText}` : '';
    return (index.h("ul", { ref: el => (this.shareListRef = el), class: CSS.options, role: "menu" }, index.h("li", { id: "copyToClipboard", onClick: this.handleShareItem.bind(this, 'link'), onKeyDown: this.handleOptionKeyDown('link'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, index.h("calcite-icon", { icon: "link", scale: this.scale })), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_b = options === null || options === void 0 ? void 0 : options.link) === null || _b === void 0 ? void 0 : _b.label)), this.socialMedia
      ? [
        index.h("li", { onClick: this.handleShareItem.bind(this, 'facebook'), onKeyDown: this.handleOptionKeyDown('facebook'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, this.renderFacebookIcon()), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_c = options === null || options === void 0 ? void 0 : options.facebook) === null || _c === void 0 ? void 0 : _c.label)),
        index.h("li", { onClick: this.handleShareItem.bind(this, 'twitter'), onKeyDown: this.handleOptionKeyDown('twitter'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, this.renderTwitterIcon()), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_d = options === null || options === void 0 ? void 0 : options.twitter) === null || _d === void 0 ? void 0 : _d.label)),
        index.h("li", { onClick: this.handleShareItem.bind(this, 'linkedIn'), onKeyDown: this.handleOptionKeyDown('linkedIn'), role: "menuitem", tabindex: "0" }, index.h("span", { class: CSS.icon }, this.renderLinkedInIcon()), index.h("span", { class: `${CSS.optionText}${optionText_RTL}` }, (_e = options === null || options === void 0 ? void 0 : options.linkedIn) === null || _e === void 0 ? void 0 : _e.label)),
      ]
      : null));
  }
  handleOptionKeyDown(type) {
    return (e) => {
      const keyCode = e.code;
      const canActivate = keyCode === 'Space' || keyCode === 'Enter';
      if (!canActivate)
        return;
      this.handleShareItem(type);
    };
  }
  renderFacebookIcon() {
    return (index.h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, index.h("g", null, index.h("path", { d: "M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z", style: { fill: '#1877f2', fillRule: 'nonzero' } }), index.h("path", { d: "M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z", style: { fill: '#fff', fillRule: 'nonzero' } }))));
  }
  renderTwitterIcon() {
    return (index.h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, index.h("rect", { height: "400", style: { fill: 'none' }, width: "400", x: "56", y: "56" }), index.h("path", { d: "M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104", style: { fill: '#1da1f2', fillRule: 'nonzero' } })));
  }
  renderLinkedInIcon() {
    return (index.h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" }, index.h("g", { id: "g5891" }, index.h("path", { d: "M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z", id: "background", style: { fill: '#2867b2' } }), index.h("g", { id: "shapes" }, index.h("rect", { height: "257.962", id: "rect11", style: { fill: '#fff' }, width: "85.76", x: "61.053", y: "178.667" }), index.h("path", { d: "M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z", id: "path13-0", style: { fill: '#fff', fillRule: 'nonzero' } }), index.h("path", { d: "M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z", id: "path15", style: { fill: '#fff', fillRule: 'nonzero' } })))));
  }
  renderTip() {
    var _a;
    const info = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.info;
    return (index.h("div", { class: CSS.tipContainer }, index.h("span", { class: CSS.tipHeader }, index.h("calcite-icon", { icon: "lightbulb", scale: this.scale }), index.h("span", null, info === null || info === void 0 ? void 0 : info.label)), index.h("p", { class: CSS.tipContent }, info === null || info === void 0 ? void 0 : info.tooltip)));
  }
  renderEmbed() {
    var _a, _b, _c;
    const embedMessages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.embed;
    return (index.h("div", { class: CSS.embed.container }, index.h("span", { class: CSS.embed.header }, index.h("calcite-icon", { icon: "code", scale: this.scale }), index.h("span", null, (_c = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.embed) === null || _c === void 0 ? void 0 : _c.label)), index.h("div", { class: CSS.embed.embedCode.container }, index.h("div", { class: CSS.embed.embedCode.textArea }, index.h("textarea", { ref: el => (this.embedCodeRef = el), cols: 30, rows: 5, readonly: true, value: this.getEmbedCode() }), index.h("button", { id: "copyEmbedToClipboard", onClick: this.copyEmbedCode.bind(this), class: CSS.embed.embedCode.copyButton }, index.h("calcite-icon", { icon: "copy", scale: this.scale }), index.h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.copy))), index.h("span", { class: CSS.embed.textAreaText }, index.h("slot", { name: "text-area-text" })), index.h("div", { class: CSS.embed.dimensions.container }, index.h("label", { class: CSS.embed.dimensions.input }, index.h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.width), index.h("input", { ref: el => (this.embedWidthRef = el), type: "number", value: this.embedWidth })), index.h("label", { class: CSS.embed.dimensions.input }, index.h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.height), index.h("input", { ref: el => (this.embedHeightRef = el), type: "number", value: this.embedHeight }))))));
  }
  togglePopover(event) {
    event.stopPropagation();
    this.opened = !this.opened;
    this.popoverRef.toggle(this.opened);
  }
  closePopover() {
    this.opened = false;
    this.popoverRef.toggle(this.opened);
  }
  async handleShareItem(type) {
    var _a, _b;
    this.shareUrl = await this.generateShareUrl();
    let shortenedUrl = null;
    // Detects Safari - If Safari, do not shorten URL due to Safari not allowing clipboard copy after network requests
    const isChrome = (_a = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _a === void 0 ? void 0 : _a.includes('Chrome');
    const isSafari = (_b = navigator === null || navigator === void 0 ? void 0 : navigator.userAgent) === null || _b === void 0 ? void 0 : _b.includes('Safari');
    const doNotShortenUrl = isSafari !== undefined && isSafari && isChrome !== undefined && !isChrome;
    if (!doNotShortenUrl) {
      shortenedUrl = await this.shortenUrl(this.shareUrl);
    }
    const urlToUse = shortenedUrl ? shortenedUrl : this.shareUrl;
    switch (type) {
      case 'link':
        navigator.clipboard.writeText(urlToUse);
        if (this.embed) {
          this.copyEmbedPopoverRef.toggle(false);
          this.inlineCopyEmbedOpened = false;
        }
        if (this.mode === 'inline') {
          this.copyLinkPopoverRef.toggle(true);
          setTimeout(() => this.copyLinkPopoverRef.toggle(false), 3000);
        }
        this.inlineCopyLinkOpened = true;
        this.copied = true;
        if (this.mode === 'popover')
          setTimeout(() => this.closePopover(), 2000);
        return;
      case 'facebook':
      case 'twitter':
      case 'linkedIn':
        const urlData = {
          url: encodeURI(urlToUse),
        };
        const data = type === 'twitter' ? Object.assign(Object.assign({}, urlData), { text: this.shareText }) : urlData;
        const [intl] = await loadModules(['esri/intl']);
        const url = intl.substitute(SOCIAL_URL_TEMPLATES[type], data);
        if (this.mode === 'popover') {
          this.closePopover();
        }
        window.open(encodeURI(url), '_blank');
        return;
    }
  }
  async shortenUrl(url) {
    var _a, _b;
    const [esriRequest] = await loadModules(['esri/request']);
    const request = await esriRequest(SHORTEN_API, {
      query: {
        longUrl: url,
        f: 'json',
      },
    });
    const shortUrl = (_b = (_a = request === null || request === void 0 ? void 0 : request.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.url;
    if (shortUrl) {
      return shortUrl.replace('http://', 'https://');
    }
  }
  getEmbedCode() {
    return `<iframe src="${this.shareUrl}" width="${this.embedWidth}" height="${this.embedHeight}" frameborder="0" style="border:0" allowfullscreen>${this.iframeInnerText}</iframe>`;
  }
  copyEmbedCode() {
    navigator.clipboard.writeText(this.getEmbedCode());
    this.copyLinkPopoverRef.toggle(false);
    this.inlineCopyLinkOpened = false;
    this.copyEmbedPopoverRef.toggle(true);
    setTimeout(() => this.copyEmbedPopoverRef.toggle(false), 3000);
    this.inlineCopyEmbedOpened = true;
  }
  // VIEW LOGIC
  async generateShareUrl() {
    var _a;
    // If view is not ready
    if (!this.view || !((_a = this.view) === null || _a === void 0 ? void 0 : _a.ready)) {
      return this.shareUrl;
    }
    // Use x/y values and the spatial reference of the view to instantiate a geometry point
    const { x, y } = this.view.center;
    const { spatialReference } = this.view;
    const [Point, SpatialReference] = await loadModules(['esri/geometry/Point', 'esri/geometry/SpatialReference']);
    const updatedSpatialReference = new SpatialReference(Object.assign({}, spatialReference.toJSON()));
    const centerPoint = new Point({
      x,
      y,
      spatialReference: updatedSpatialReference,
    });
    // Use pointToConvert to project point. Once projected, pass point to generate the share URL parameters
    const point = await this.processPoint(centerPoint);
    return this.generateShareUrlParams(point);
  }
  async processPoint(point) {
    const { isWGS84, isWebMercator } = point.spatialReference;
    // If spatial reference is WGS84 or Web Mercator, use longitude/latitude values to generate the share URL parameters
    if (isWGS84 || isWebMercator) {
      return point;
    }
    const [SpatialReference, projection] = await loadModules(['esri/geometry/SpatialReference', 'esri/geometry/projection']);
    const outputSpatialReference = new SpatialReference({
      wkid: 4326,
    });
    await projection.loadProjection();
    const projectedPoint = projection.project(point, outputSpatialReference);
    return projectedPoint;
  }
  generateShareUrlParams(point) {
    const { longitude, latitude } = point;
    if (longitude === undefined || latitude === undefined) {
      return this.shareUrl;
    }
    const roundedLon = this.roundValue(longitude);
    const roundedLat = this.roundValue(latitude);
    const { zoom } = this.view;
    const roundedZoom = this.roundValue(zoom);
    const graphic = this.view.get('popup.selectedFeature');
    const visible = this.view.get('popup.visible');
    let layerId;
    let oid;
    if (graphic && visible) {
      const featureLayer = graphic.get('layer');
      layerId = featureLayer.id;
      oid = graphic.attributes[featureLayer.objectIdField];
    }
    const hiddenLayers = this.view.map.allLayers
      .filter(layer => !layer.visible)
      .toArray()
      .map(featureLayer => featureLayer.id)
      .toString()
      .replaceAll(',', ';');
    const { type } = this.view;
    const { defaultUrlParams } = this;
    const url = new URL(this.shareUrl);
    const { searchParams } = url;
    // Resets existing URL params
    if (searchParams.get('center'))
      searchParams.delete('center');
    if (searchParams.get('level'))
      searchParams.delete('level');
    if (searchParams.get('selectedFeature'))
      searchParams.delete('selectedFeature');
    if (searchParams.get('hiddenLayers'))
      searchParams.delete('hiddenLayers');
    if (searchParams.get('viewpoint'))
      searchParams.delete('viewpoint');
    // Checks if view.type is 3D, if so, set 3D url parameters
    if (type === '3d') {
      // viewpoint=cam:{camera.position.longitude},{camera.position.latitude},{camera.position.z};{camera.heading},{camera.tilt}
      const { camera } = this.view;
      const { heading, position, tilt } = camera;
      const { longitude, latitude, z } = position;
      const viewpoint_Values = {
        longitude: this.roundValue(longitude, 8),
        latitude: this.roundValue(latitude, 8),
        z: this.roundValue(z, 3),
        heading: this.roundValue(heading, 3),
        tilt: this.roundValue(tilt, 3),
      };
      const viewpointVal = `cam:${viewpoint_Values.longitude},${viewpoint_Values.latitude},${viewpoint_Values.z};${viewpoint_Values.heading},${viewpoint_Values.tilt}`;
      if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.viewpoint) !== false)
        url.searchParams.set('viewpoint', viewpointVal);
      if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
        url.searchParams.set('selectedFeature', `${layerId};${oid}`);
      if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.hiddenLayers) !== false)
        url.searchParams.set('hiddenLayers', hiddenLayers);
      url.search = decodeURIComponent(url.search);
      return url.href;
    }
    // Otherwise, just return original url for 2D
    if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.center) !== false)
      url.searchParams.set('center', `${roundedLon};${roundedLat}`);
    if ((defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.level) !== false)
      url.searchParams.set('level', `${roundedZoom}`);
    if (layerId && oid && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
      url.searchParams.set('selectedFeature', `${layerId};${oid}`);
    if (hiddenLayers && (defaultUrlParams === null || defaultUrlParams === void 0 ? void 0 : defaultUrlParams.selectedFeature) !== false)
      url.searchParams.set('hiddenLayers', hiddenLayers);
    url.search = decodeURIComponent(url.search);
    return url.href;
  }
  roundValue(val, decimalPoints = 4) {
    return parseFloat(val.toFixed(decimalPoints));
  }
  get el() { return index.getElement(this); }
};
InstantAppsSocialShare.style = instantAppsSocialShareCss;

exports.instant_apps_header = InstantAppsHeader;
exports.instant_apps_popover = InstantAppsPopover;
exports.instant_apps_popovers = InstantAppsPopovers;
exports.instant_apps_social_share = InstantAppsSocialShare;
