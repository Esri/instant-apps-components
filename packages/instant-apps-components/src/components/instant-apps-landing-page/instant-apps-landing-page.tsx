import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { IPortal } from '../../interfaces/interfaces';
import { getFontFamily } from '../../utils/styles';
import { AlignmentPositions } from './support/enum';

const CSS = {
  BASE: 'instant-apps-landing-page',
  titleText: 'instant-apps-landing-page__title-text',
  subtitleText: 'instant-apps-landing-page__subtitle-text',
  descriptionText: 'instant-apps-landing-page__description-text',
  closed: 'instant-apps-landing-page--closed',
  closedNoTransition: 'instant-apps-landing-page--closed-no-transition',
  iconImage: 'instant-apps-landing-page__icon-image',
  removeTransition: 'instant-apps-landing-page__remove-transition',
  removePadding: 'instant-apps-landing-page__remove-padding',
  alignment: 'instant-apps-landing-page__alignment--',
  entryButton: 'instant-apps-landing-page__entry-button',
  contentContainer: 'instant-apps-landing-page__content-container',
  buttonContainer: 'instant-apps-landing-page__button-container',
  iconImageScale: {
    s: ' instant-apps-landing-page__icon-image-scale--s',
    m: ' instant-apps-landing-page__icon-image-scale--m',
    l: ' instant-apps-landing-page__icon-image-scale--l',
  },
};

@Component({
  tag: 'instant-apps-landing-page',
  styleUrl: 'instant-apps-landing-page.scss',
  shadow: true,
})
export class InstantAppsLandingPage {
  @Element()
  el: HTMLInstantAppsLandingPageElement;

  /**
   * Title text.
   */
  @Prop()
  titleText!: string;

  /**
   * Subtitle text.
   */
  @Prop()
  subtitleText: string;

  /**
   * Description text.
   */
  @Prop()
  descriptionText: string;

  /**
   * Button text which closes/dismisses the landing page.
   */
  @Prop()
  entryButtonText: string;

  /**
   * Image/graphic that is positioned near the text content.
   */
  @Prop()
  iconImage: string;

  /**
   * Scale of icon image/graphic.
   */
  @Prop()
  iconImageScale: 's' | 'm' | 'l' = 'm';

  /**
   * Alternate text for `iconImage`.
   */
  @Prop()
  iconImageAltText: string;

  /**
   * Controls the positioning of the text and image content. This accepts an array containing two values. Possible values for HorizontalAlignment: 'left', 'right', 'center'. Possible values for VeritcalAlignment: 'top', 'middle', 'bottom'.
   */
  @Prop()
  alignment: AlignmentPositions = AlignmentPositions.Center;

  /**
   * Controls whether to enable/disable the transition animation the occurs when dismissing the landing page.
   */
  @Prop()
  disableTransition = true;

  /**
   * Displays a background image via URL
   */
  @Prop()
  backgroundImageSrc: string;

  /**
   * Controls the open/close state of the landing page.
   */
  @Prop({
    mutable: true,
  })
  open = true;

  /**
   * Scale of the entry button.
   */
  @Prop()
  entryButtonScale: 's' | 'm' | 'l' = 'l';

  /**
   * Font family to use for text
   */
  @Prop({
    reflect: true,
  })
  fontFamily: string = 'var(--calcite-sans-family);';

  /**
   * Add sign in functionality. Requires portal and oauthappid props.
   */
  @Prop()
  enableSignIn: boolean;

  /**
   * The apps Portal, used to setup sign in capabilities.
   */
  @Prop()
  portal: IPortal;

  /**
   * The registered application id, used to setup sign in capabilities.
   */
  @Prop()
  oauthappid: string;

  /**
   * Emits when the landing page is opened.
   */
  @Event()
  landingPageOpen: EventEmitter<void>;

  /**
   * Emits when the landing page is closed.
   */
  @Event()
  landingPageClose: EventEmitter<void>;

  @Watch('open')
  emitToggleEvent() {
    if (this.open) {
      this.landingPageOpen.emit();
    } else {
      this.landingPageClose.emit();
    }
  }

  async componentWillRender() {
    await this.checkEnableSignIn();
  }

  render() {
    const content = this.renderLandingPageContent();
    return <Host>{content}</Host>;
  }

  renderLandingPageContent(): HTMLDivElement {
    const closed = !this.open ? (this.disableTransition ? ` ${CSS.closedNoTransition}` : ` ${CSS.closed}`) : '';
    const alignmentClass = this.getAlignmentClass();
    const removeTransition = this.disableTransition ? ` ${CSS.removeTransition}` : '';
    const style = this.getContentStyle();
    return (
      <div style={style} class={`${CSS.BASE}${alignmentClass}${closed}${removeTransition}`}>
        <div class={CSS.contentContainer}>
          {this.renderIconImage()}
          {this.renderTitleText()}
          {this.renderSubtitleText()}
          {this.renderDescriptionText()}
        </div>
        {this.renderEntryButtonContainer()}
      </div>
    );
  }

  renderEntryButtonContainer() {
    return this.enableSignIn ? (
      this.renderLandingPageSignIn()
    ) : (
      <div class={CSS.buttonContainer}>
        {this.renderEntryButton()}
        <slot name="secondary-action"></slot>
      </div>
    );
  }

  renderLandingPageSignIn() {
    return (
      <instant-apps-sign-in
        type="landingPage"
        landingPage={true}
        portal={this.portal}
        oauthappid={this.oauthappid}
        titleText={this.titleText}
        subtitleText={this.subtitleText}
        descriptionText={this.descriptionText}
        closeLandingPage={this.closeLandingPage.bind(this)}
      ></instant-apps-sign-in>
    );
  }

  renderIconImage(): HTMLImageElement | null {
    return this.iconImage ? <img class={`${CSS.iconImage}${this.getIconImageScale()}`} src={this.iconImage} alt={this.iconImageAltText} /> : null;
  }

  renderTitleText(): HTMLHeadingElement {
    return <h1 class={CSS.titleText}>{this.titleText}</h1>;
  }

  renderSubtitleText(): HTMLSpanElement {
    return <span class={CSS.subtitleText}>{this.subtitleText}</span>;
  }

  renderDescriptionText(): HTMLParagraphElement {
    return <p class={CSS.descriptionText}>{this.descriptionText}</p>;
  }

  renderEntryButton(): HTMLCalciteButtonElement {
    return (
      <calcite-button class={CSS.entryButton} onClick={this.closeLandingPage.bind(this)} scale={this.entryButtonScale} appearance="outline-fill">
        {this.entryButtonText ? this.entryButtonText : 'Enter'}
      </calcite-button>
    );
  }

  closeLandingPage() {
    this.open = false;
  }

  getAlignmentClass(): string {
    return ` ${CSS.alignment}${this.alignment}`;
  }

  getIconImageScale(): string {
    const { iconImageScale } = this;
    const { s, m, l } = CSS.iconImageScale;
    return iconImageScale === 'l' ? l : iconImageScale === 's' ? s : m;
  }

  getContentStyle(): { [key: string]: string } {
    const fontFamily = getFontFamily(this.fontFamily);
    return this.backgroundImageSrc
      ? {
          fontFamily,
          backgroundSize: 'cover',
          backgroundImage: `url("${this.backgroundImageSrc}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }
      : { fontFamily };
  }

  checkEnableSignIn(): Promise<void> {
    return new Promise(resolve => {
      if (this.enableSignIn) {
        const signInTime = localStorage.getItem('signing-in') ? Number(localStorage.getItem('signing-in')) : null;
        if (signInTime != null) {
          const minuteLimit = 2;
          if ((Date.now() - signInTime) / (60 * 1000) < minuteLimit) {
            this.open = false;
          }
          localStorage.removeItem('signing-in');
        }
      }
      resolve();
    });
  }
}
