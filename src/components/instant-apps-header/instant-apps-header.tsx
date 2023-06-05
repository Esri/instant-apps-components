/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { Event, EventEmitter, HostElement, Watch } from '@stencil/core/internal';
import { getElementDir } from '../../utils/languageUtil';
import Sanitizer from '@esri/arcgis-html-sanitizer';

import { widthBreakpoints } from '../../utils/breakpoints';

const CSS = {
  base: 'instant-apps-header--standard',
  headerContent: 'instant-apps-header__header-content',
  flipRtl: 'instant-apps-header--rtl',
  logoScale: 'instant-apps-header__logo-scale--',
  logoHeight: 'instant-apps-header__logo-height--',
  standardHeight: 'instant-apps-header__standard-height',
  alignment: {
    center: 'instant-apps-header__header-content--center',
    right: 'instant-apps-header__header-content--right',
  },
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
  private _sanitizer = new Sanitizer(
    {
      whiteList: {
        h1: ['style'],
        h2: ['style'],
        h3: ['style'],
        h4: ['style'],
        h5: ['style'],
        h6: ['style'],
        img: ['style', 'src', 'width', 'height'],
        pre: ['style'],
        p: ['id', 'class', 'style'],
        div: ['id', 'class', 'style', 'role'],
        span: ['id', 'class', 'style', 'role'],
        figure: ['class', 'style'],
        header: ['id', 'class', 'style', 'role'],
      },
    },
    true,
  );

  @Element()
  el: HostElement;

  @State()
  dir: 'ltr' | 'rtl';

  /**
   * Main text to display in header.
   */
  @Prop() titleText: string;

  /**
   * Url to link out to from title text
   */
  @Prop() titleTextLink: string;
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
    mutable: true,
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
   * Hover text for info button tooltip
   */
  @Prop() infoTitleText: string;

  /**
   * HTML code for custom headers.
   */
  @Prop({
    mutable: true,
  })
  customHeaderHtml: string;

  /**
   * Change alignment of header.
   */
  @Prop({
    mutable: true,
  })
  headerAlignment: 'left' | 'center' | 'right' = 'left';

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

  /**
   * Font family to use for text
   */
  @Prop({
    reflect: true,
  })
  fontFamily: string = 'var(--calcite-sans-family);';

  /**
   * Mobile breakpoint value in pixels(px).
   */
  @Prop()
  mobileWidthBreakpoint: number = widthBreakpoints.medium[1];

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
  }

  render() {
    const hasEmptyLogo = this.logoImage === 'undefined' || this.logoImage?.split('?')?.[0] === 'undefined' || this.logoImage?.split('?')?.[0] === '' || !this.logoImage;
    const logo = this.renderLogo(hasEmptyLogo);
    const title = this.renderTitle();
    const headerContentClass =
      this.headerAlignment === 'right' || this.headerAlignment === 'center' ? CSS.headerContent.concat(' ', CSS.alignment[this.headerAlignment]) : CSS.headerContent;
    return (
      <Host>
        {this.customHeaderHtml ? (
          [<style>{this.customHeaderCss}</style>, <div id="customHeader" innerHTML={this.customHeaderHtml} />]
        ) : (
          <header
            class={`${CSS.base}${this.dir === 'rtl' ? ` ${CSS.flipRtl}` : ''}${this.logoImage && !hasEmptyLogo ? ` ${CSS.logoHeight}${this.logoScale}` : ` ${CSS.standardHeight}`}`}
            style={{ backgroundColor: this.backgroundColor, fontFamily: this.fontFamily }}
          >
            <span class={headerContentClass}>
              {logo}
              {title}
              {this.infoButton ? (
                <calcite-button
                  style={{ '--calcite-ui-text-1': this.textColor }}
                  id="infoButton"
                  alignment="start"
                  appearance="transparent"
                  kind="neutral"
                  icon-start="information-f"
                  scale="s"
                  label={this.infoTitleText}
                  title={this.infoTitleText}
                  onClick={this.toggleInfo.bind(this)}
                ></calcite-button>
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
  renderTitle() {
    return this.titleText && this.titleTextLink ? (
      <a style={{ color: this.textColor }} href={`${this.titleTextLink}`} rel="noopener noreferrer" target="_blank">
        <h1 style={{ color: this.textColor }}>{this.titleText}</h1>
      </a>
    ) : (
      <h1 style={{ color: this.textColor }}>{this.titleText}</h1>
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
    const mediaQuery = `(max-width: ${this.mobileWidthBreakpoint}px)`;
    const mql = window.matchMedia(mediaQuery);
    if (mql.matches) {
      this.logoScale = 's';
    }
    mql.addEventListener('change', this.mqlCallback());
  }
}
