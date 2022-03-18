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
import { Component, h, Prop, State, Element } from '@stencil/core';
import { substitute } from '@arcgis/core/intl';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import { project, load as loadProjection } from '@arcgis/core/geometry/projection';
import esriRequest from '@arcgis/core/request';
import { getLocaleComponentStrings } from '../../utils/locale';
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
};
const SOCIAL_URL_TEMPLATES = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
  twitter: 'https://twitter.com/intent/tweet?text={text}&url={url}',
  linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};
const SHORTEN_API = 'https://arcg.is/prod/shorten';
export class InstantAppsSocialShare {
  constructor() {
    // PUBLIC PROPERTIES
    this.mode = 'popover';
    this.shareUrl = window.location.href;
    this.shareText = '';
    this.embed = false;
    this.shareButtonColor = 'neutral';
    this.iframeInnerText = '';
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
    if (this.mode === 'popover' && this.opened) {
      this.popoverRef.toggle(true);
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
    const content = this.copied && this.mode === 'popover' ? (this.renderSuccess()) : (h("div", { class: CSS.dialogContent },
      this.renderOptions(),
      this.mode === 'popover' && !this.embed ? this.renderTip() : null,
      this.embed ? this.renderEmbed() : null));
    const dialogContent = (h("div", { ref: el => (this.dialogContentRef = el), class: `${CSS.dialog}${this.mode === 'inline' ? ` ${CSS.dialogEmbed}` : ''}` }, content));
    return this.mode === 'popover'
      ? [
        h("calcite-popover", { ref: (el) => (this.popoverRef = el), label: (_b = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.share) === null || _b === void 0 ? void 0 : _b.label, "reference-element": "shareButton", placement: "bottom-start" }, dialogContent),
        h("calcite-button", { onClick: this.togglePopover.bind(this), id: "shareButton", color: this.shareButtonColor, appearance: "transparent", label: (_d = (_c = this.messages) === null || _c === void 0 ? void 0 : _c.share) === null || _d === void 0 ? void 0 : _d.label, title: (_f = (_e = this.messages) === null || _e === void 0 ? void 0 : _e.share) === null || _f === void 0 ? void 0 : _f.label },
          h("calcite-icon", { icon: "share" })),
      ]
      : [
        dialogContent,
        h("calcite-popover", { ref: (el) => (this.copyLinkPopoverRef = el), label: (_h = (_g = this.messages) === null || _g === void 0 ? void 0 : _g.share) === null || _h === void 0 ? void 0 : _h.label, "reference-element": "copyToClipboard", placement: "trailing" }, this.renderSuccess()),
        h("calcite-popover", { ref: (el) => (this.copyEmbedPopoverRef = el), label: (_k = (_j = this.messages) === null || _j === void 0 ? void 0 : _j.share) === null || _k === void 0 ? void 0 : _k.label, "reference-element": "copyEmbedToClipboard", placement: "trailing" }, this.renderEmbedSuccess()),
      ];
  }
  renderSuccess() {
    var _a;
    const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
    return (h("div", { class: CSS.success.container },
      h("span", { class: CSS.success.header },
        h("span", { class: CSS.success.icon },
          h("calcite-icon", { icon: "check-circle-f", scale: "s" })), success === null || success === void 0 ? void 0 :
        success.label),
      h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.url)));
  }
  renderEmbedSuccess() {
    var _a;
    const success = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.success;
    return (h("div", { class: CSS.success.container },
      h("span", { class: CSS.success.header },
        h("span", { class: CSS.success.icon },
          h("calcite-icon", { icon: "check-circle-f", scale: "s" })), success === null || success === void 0 ? void 0 :
        success.label),
      h("span", { class: CSS.success.message }, success === null || success === void 0 ? void 0 : success.embed)));
  }
  renderOptions() {
    var _a, _b, _c, _d, _e;
    const options = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.options;
    return (h("ul", { class: CSS.options, role: "menu" },
      h("li", { id: "copyToClipboard", onClick: this.handleShareItem.bind(this, 'link'), role: "menuitem" },
        h("span", { class: CSS.icon },
          h("calcite-icon", { icon: "link", scale: "m" })),
        h("span", { class: CSS.optionText }, (_b = options === null || options === void 0 ? void 0 : options.link) === null || _b === void 0 ? void 0 : _b.label)),
      h("li", { onClick: this.handleShareItem.bind(this, 'facebook'), role: "menuitem" },
        h("span", { class: CSS.icon }, this.renderFacebookIcon()),
        h("span", { class: CSS.optionText }, (_c = options === null || options === void 0 ? void 0 : options.facebook) === null || _c === void 0 ? void 0 : _c.label)),
      h("li", { onClick: this.handleShareItem.bind(this, 'twitter'), role: "menuitem" },
        h("span", { class: CSS.icon }, this.renderTwitterIcon()),
        h("span", { class: CSS.optionText }, (_d = options === null || options === void 0 ? void 0 : options.twitter) === null || _d === void 0 ? void 0 : _d.label)),
      h("li", { onClick: this.handleShareItem.bind(this, 'linkedIn'), role: "menuitem" },
        h("span", { class: CSS.icon }, this.renderLinkedInIcon()),
        h("span", { class: CSS.optionText }, (_e = options === null || options === void 0 ? void 0 : options.linkedIn) === null || _e === void 0 ? void 0 : _e.label))));
  }
  renderFacebookIcon() {
    return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" },
      h("g", null,
        h("path", { d: "M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z", style: { fill: '#1877f2', fillRule: 'nonzero' } }),
        h("path", { d: "M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z", style: { fill: '#fff', fillRule: 'nonzero' } }))));
  }
  renderTwitterIcon() {
    return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" },
      h("rect", { height: "400", style: { fill: 'none' }, width: "400", x: "56", y: "56" }),
      h("path", { d: "M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104", style: { fill: '#1da1f2', fillRule: 'nonzero' } })));
  }
  renderLinkedInIcon() {
    return (h("svg", { height: "100%", style: { fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }, version: "1.1", viewBox: "0 0 512 512", width: "100%", xmlns: "http://www.w3.org/2000/svg" },
      h("g", { id: "g5891" },
        h("path", { d: "M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z", id: "background", style: { fill: '#2867b2' } }),
        h("g", { id: "shapes" },
          h("rect", { height: "257.962", id: "rect11", style: { fill: '#fff' }, width: "85.76", x: "61.053", y: "178.667" }),
          h("path", { d: "M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z", id: "path13-0", style: { fill: '#fff', fillRule: 'nonzero' } }),
          h("path", { d: "M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z", id: "path15", style: { fill: '#fff', fillRule: 'nonzero' } })))));
  }
  renderTip() {
    var _a;
    const info = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.info;
    return (h("div", { class: CSS.tipContainer },
      h("span", { class: CSS.tipHeader },
        h("calcite-icon", { icon: "lightbulb", scale: "s" }),
        h("span", null, info === null || info === void 0 ? void 0 : info.label)),
      h("p", { class: CSS.tipContent }, info === null || info === void 0 ? void 0 : info.tooltip)));
  }
  renderEmbed() {
    var _a, _b, _c;
    const embedMessages = (_a = this.messages) === null || _a === void 0 ? void 0 : _a.embed;
    return (h("div", { class: CSS.embed.container },
      h("span", { class: CSS.embed.header },
        h("calcite-icon", { icon: "code", scale: "m" }),
        h("span", null, (_c = (_b = this.messages) === null || _b === void 0 ? void 0 : _b.embed) === null || _c === void 0 ? void 0 : _c.label)),
      h("div", { class: CSS.embed.embedCode.container },
        h("div", { class: CSS.embed.embedCode.textArea },
          h("textarea", { ref: el => (this.embedCodeRef = el), cols: 30, rows: 5, readonly: true, value: this.getEmbedCode() }),
          h("button", { id: "copyEmbedToClipboard", onClick: this.copyEmbedCode.bind(this), class: CSS.embed.embedCode.copyButton },
            h("calcite-icon", { icon: "copy", scale: "s" }),
            h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.copy))),
        h("span", { class: CSS.embed.textAreaText },
          h("slot", { name: "text-area-text" })),
        h("div", { class: CSS.embed.dimensions.container },
          h("label", { class: CSS.embed.dimensions.input },
            h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.width),
            h("input", { ref: el => (this.embedWidthRef = el), type: "number", value: this.embedWidth })),
          h("label", { class: CSS.embed.dimensions.input },
            h("span", null, embedMessages === null || embedMessages === void 0 ? void 0 : embedMessages.height),
            h("input", { ref: el => (this.embedHeightRef = el), type: "number", value: this.embedHeight }))))));
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
          this.copyLinkPopoverRef.toggle(true);
          this.inlineCopyLinkOpened = true;
          this.copyEmbedPopoverRef.toggle(false);
          this.inlineCopyEmbedOpened = false;
        }
        this.copied = true;
        return;
      case 'facebook':
      case 'twitter':
      case 'linkedIn':
        const urlData = {
          url: encodeURI(urlToUse),
        };
        const data = type === 'twitter' ? Object.assign(Object.assign({}, urlData), { text: this.shareText }) : urlData;
        const url = substitute(SOCIAL_URL_TEMPLATES[type], data);
        if (this.mode === 'popover') {
          this.closePopover();
        }
        window.open(encodeURI(url), '_blank');
        return;
    }
  }
  async shortenUrl(url) {
    var _a, _b;
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
    this.inlineCopyEmbedOpened = true;
  }
  // VIEW LOGIC
  async generateShareUrl() {
    var _a;
    // If view is not ready
    if (!this.view || !((_a = this.view) === null || _a === void 0 ? void 0 : _a.ready)) {
      if (this.queryString) {
        const path = this.shareUrl.split('center')[0];
        // If no "?", then append "?". Otherwise, check for "?" and "="
        const sep = path.indexOf('?') === -1 ? '?' : path.indexOf('?') !== -1 && path.indexOf('=') !== -1 ? (path.indexOf('&') === -1 ? '&' : '') : '';
        return `${this.shareUrl}${sep}${this.queryString}`;
      }
      else {
        return this.shareUrl;
      }
    }
    // Use x/y values and the spatial reference of the view to instantiate a geometry point
    const { x, y } = this.view.center;
    const { spatialReference } = this.view;
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
    const outputSpatialReference = new SpatialReference({
      wkid: 4326,
    });
    await loadProjection();
    const projectedPoint = project(point, outputSpatialReference);
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
    let layerId;
    let oid;
    if (graphic) {
      const featureLayer = graphic.get('layer');
      layerId = featureLayer.id;
      oid = graphic.attributes[featureLayer.objectIdField];
    }
    const hiddenLayers = this.view.map.allLayers
      .filter(layer => layer.type === 'feature' && !layer.visible)
      .toArray()
      .map(featureLayer => featureLayer.id)
      .toString()
      .replace(',', ';');
    const path = this.shareUrl.split('center')[0];
    const sep = path.indexOf('?') === -1 ? '?' : path.indexOf('?') !== -1 && path.indexOf('=') !== -1 ? (path.indexOf('&') === -1 ? '&' : '') : '';
    const shareParams = `${path}${sep}center=${roundedLon};${roundedLat}&level=${roundedZoom}${layerId && hiddenLayers.indexOf(layerId) === -1 && graphic ? `&selectedFeature=${layerId};${oid}` : ''}${hiddenLayers ? `&hiddenLayers=${hiddenLayers}` : ''}${this.queryString ? `&${this.queryString}` : ''}`;
    const type = this.view.type;
    // Checks if view.type is 3D, if so add, 3D url parameters
    if (type === '3d') {
      const { camera } = this.view;
      const { heading, fov, tilt } = camera;
      const roundedHeading = this.roundValue(heading);
      const roundedFov = this.roundValue(fov);
      const roundedTilt = this.roundValue(tilt);
      return `${shareParams}&heading=${roundedHeading}&fov=${roundedFov}&tilt=${roundedTilt}`;
    }
    // Otherwise, just return original url parameters for 2D
    return shareParams;
  }
  roundValue(val) {
    return parseFloat(val.toFixed(4));
  }
  static get is() { return "instant-apps-social-share"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["instant-apps-social-share.scss"]
  }; }
  static get styleUrls() { return {
    "$": ["instant-apps-social-share.css"]
  }; }
  static get properties() { return {
    "mode": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'popover' | 'inline'",
        "resolved": "\"inline\" | \"popover\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "mode",
      "reflect": true,
      "defaultValue": "'popover'"
    },
    "shareUrl": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "share-url",
      "reflect": false,
      "defaultValue": "window.location.href"
    },
    "shareText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "share-text",
      "reflect": true,
      "defaultValue": "''"
    },
    "embed": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "embed",
      "reflect": true,
      "defaultValue": "false"
    },
    "shareButtonColor": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "'inverse' | 'neutral'",
        "resolved": "\"inverse\" | \"neutral\"",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "share-button-color",
      "reflect": true,
      "defaultValue": "'neutral'"
    },
    "queryString": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "query-string",
      "reflect": true
    },
    "iframeInnerText": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "iframe-inner-text",
      "reflect": true,
      "defaultValue": "''"
    },
    "view": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "__esri.MapView | __esri.SceneView",
        "resolved": "MapView | SceneView",
        "references": {
          "___esri": {
            "location": "global"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    }
  }; }
  static get states() { return {
    "messages": {},
    "opened": {},
    "copied": {},
    "inlineCopyLinkOpened": {},
    "inlineCopyEmbedOpened": {},
    "embedWidth": {},
    "embedHeight": {}
  }; }
  static get elementRef() { return "el"; }
}
