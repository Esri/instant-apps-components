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

import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { Event, EventEmitter, HostElement, Watch } from '@stencil/core/internal';
import { getElementDir } from '../../utils/languageUtil';
import Sanitizer from '@esri/arcgis-html-sanitizer';

import { widthBreakpoints } from '../../utils/breakpoints';
import { MobileWidthBreakpoint } from '../../interfaces/interfaces';

const CSS = {
  base: 'instant-apps-header--standard',
  headerContent: 'instant-apps-header__header-content',
  flipRtl: 'instant-apps-header--rtl',
  logoScale: 'instant-apps-header__logo-scale--',
  logoHeight: 'instant-apps-header__logo-height--',
  standardHeight: 'instant-apps-header__standard-height',
};

/**
 * @slot actions-end - Used to slot an action at the end of the header i.e. `calcite-action`, `instant-apps-social-share`
 */
@Component({
  tag: 'instant-apps-header',
  styleUrl: 'instant-apps-header.scss',
  shadow: true,
})
export class InstantAppsHeader {
  private _sanitizer = new Sanitizer();

  @Element()
  el: HostElement;

  @State()
  dir: 'ltr' | 'rtl';

  /**
   * Main text to display in header.
   */
  @Prop() titleText: string;

  /**
   * Background color to display in header - accepts a hexidecimal value i.e. `#000000`.
   */
  @Prop() backgroundColor: string;

  /**
   * Text color to display in header - accepts a hexidecimal value i.e. `#FFFFFF`.
   */
  @Prop() textColor: string;

  /**
   * Image URL for logo. Displays at the start of the header.
   */
  @Prop() logoImage: string;

  /**
   * Adjusts scale of logo image.
   */
  @Prop({
    reflect: true,
  })
  logoScale: 's' | 'm' | 'l' = 'm';

  /**
   * Alternate text for header logo.
   */
  @Prop() logoImageAltText: string;

  /**
   * Logo URL to link out to another page.
   */
  @Prop() logoLink: string;

  /**
   * Display info button at the end of the title.
   */
  @Prop({
    reflect: true,
    mutable: true,
  })
  infoButton: boolean = false;

  /**
   * Keeps track of the info 'open' state
   */
  @Prop({
    reflect: true,
  })
  infoIsOpen: boolean = false;

  /**
   * HTML code for custom headers.
   */
  @Prop({
    mutable: true,
  })
  customHeaderHtml: string;

  @Watch('customHeaderHtml')
  sanitizeCustomHeaderHtml() {
    this.customHeaderHtml = this._sanitizer.sanitize(this.customHeaderHtml);
  }

  /**
   * CSS styles to be used in conjuction with `custom-header-html`.
   */
  @Prop({
    mutable: true,
  })
  customHeaderCss: string;

  @Watch('customHeaderCss')
  sanitizeCustomHeaderCss() {
    this.customHeaderCss = this._sanitizer.sanitize(this.customHeaderCss);
  }

  /**
   * Font family to use for text
   */
  @Prop({
    reflect: true,
  })
  fontFamily: string = 'var(--calcite-sans-family);';

  /**
   * Object to override media query breakpoints
   */
  @Prop()
  mobileWidthBreakpoints: MobileWidthBreakpoint = {
    xsmall: [545],
    small: [545, 768],
    medium: [769, 992],
    large: [993, 1200],
    xlarge: [1200],
  };

  /**
   * Fires when the info button is clicked.
   */
  @Event({ cancelable: false }) infoIsOpenChanged: EventEmitter<boolean>;

  @State()
  initialScale: 's' | 'm' | 'l' = 'm';

  componentWillLoad() {
    this.dir = getElementDir(this.el);
    this.handleMobileBreakpoints();
    this.dir = getElementDir(this.el);
    this.customHeaderHtml = this._sanitizer.sanitize(this.customHeaderHtml);
    this.customHeaderCss = this._sanitizer.sanitize(this.customHeaderCss);
  }

  render() {
    const hasEmptyLogo = this.logoImage === 'undefined' || this.logoImage?.split('?')?.[0] === 'undefined' || this.logoImage?.split('?')?.[0] === '' || !this.logoImage;
    const logo = this.renderLogo(hasEmptyLogo);
    return (
      <Host>
        {this.customHeaderHtml ? (
          [<style>{this.customHeaderCss}</style>, <div id="customHeader" innerHTML={this.customHeaderHtml} />]
        ) : (
          <header
            class={`${CSS.base}${this.dir === 'rtl' ? ` ${CSS.flipRtl}` : ''}${this.logoImage && !hasEmptyLogo ? ` ${CSS.logoHeight}${this.logoScale}` : ` ${CSS.standardHeight}`}`}
            style={{ backgroundColor: this.backgroundColor, fontFamily: this.fontFamily }}
          >
            <span class={CSS.headerContent}>
              {logo}
              <h1 style={{ color: this.textColor }}>{this.titleText}</h1>
              {this.infoButton ? (
                <button id="infoButton" onClick={this.toggleInfo.bind(this)}>
                  <calcite-icon icon="information-f" scale="s" />
                </button>
              ) : null}
            </span>
            <slot name="actions-end" />
          </header>
        )}
      </Host>
    );
  }

  renderLogo(hasEmptyLogo: boolean) {
    return hasEmptyLogo ? (
      ''
    ) : this.logoImage && this.logoLink ? (
      <a href={`${this.logoLink}`} target="_blank">
        <img class={`${CSS.logoScale}${this.logoScale}`} src={`${this.logoImage}`} alt={`${this.logoImageAltText}`} />
      </a>
    ) : this.logoImage ? (
      <img class={`${CSS.logoScale}${this.logoScale}`} src={`${this.logoImage}`} alt={this.logoImageAltText} />
    ) : (
      ''
    );
  }

  toggleInfo(): void {
    this.infoIsOpen = !this.infoIsOpen;
    this.infoIsOpenChanged.emit(this.infoIsOpen);
  }

  mqlCallback(): (event: MediaQueryListEvent) => void {
    return event => {
      const { matches } = event;
      if (matches) {
        this.logoScale = 's';
        return;
      }
      this.logoScale = this.initialScale;
    };
  }

  handleMobileBreakpoints(): void {
    this.initialScale = this.logoScale;
    const mediaQuery = `(max-width: ${widthBreakpoints.medium[1]}px)`;
    const mql = window.matchMedia(mediaQuery);
    if (mql.matches) {
      this.logoScale = 's';
    }
    mql.addEventListener('change', this.mqlCallback());
  }
}
