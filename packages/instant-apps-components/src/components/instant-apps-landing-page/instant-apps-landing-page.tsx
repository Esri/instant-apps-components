import { Component, Element, Prop, h, Host } from '@stencil/core';
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

  render() {
    return <Host>{this.renderLandingPageContent()}</Host>;
  }

  renderLandingPageContent(): HTMLDivElement {
    const closed = !this.open ? (this.disableTransition ? ` ${CSS.closedNoTransition}` : ` ${CSS.closed}`) : '';
    const alignmentClass = this.getAlignmentClass();
    const removeTransition = this.disableTransition ? ` ${CSS.removeTransition}` : '';
    return (
      <div
        style={
          this.backgroundImageSrc
            ? {
                backgroundSize: 'cover',
                backgroundImage: `url("${this.backgroundImageSrc}")`,
                backgroundRepeat: 'no-repeat',
              }
            : {}
        }
        class={`${CSS.BASE}${alignmentClass}${closed}${removeTransition}`}
      >
        <div class={CSS.contentContainer}>
          {this.renderIconImage()}
          {this.renderTitleText()}
          {this.renderSubtitleText()}
          {this.renderDescriptionText()}
        </div>
        <div class={CSS.buttonContainer}>
          {this.renderEntryButton()}
          <slot name="secondary-action"></slot>
        </div>
      </div>
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
      <calcite-button class={CSS.entryButton} onClick={() => (this.open = false)} scale={this.entryButtonScale} appearance="outline-fill">
        {this.entryButtonText ? this.entryButtonText : 'Enter'}
      </calcite-button>
    );
  }

  getAlignmentClass(): string {
    return ` ${CSS.alignment}${this.alignment}`;
  }

  getIconImageScale(): string {
    const { iconImageScale } = this;
    const { s, m, l } = CSS.iconImageScale;
    return iconImageScale === 'l' ? l : iconImageScale === 's' ? s : m;
  }
}
