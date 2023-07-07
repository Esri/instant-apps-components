import { Component, Element, Prop, h, Host } from "@stencil/core";
import { HorizontalAlignment, VerticalAlignment } from "./support/interfaces";

const CSS = {
  BASE: "instant-apps-landing-page",
  titleText: "instant-apps-landing-page__title-text",
  subtitleText: "instant-apps-landing-page__subtitle-text",
  descriptionText: "instant-apps-landing-page__description-text",
  closed: "instant-apps-landing-page--closed",
  iconImage: "instant-apps-landing-page__icon-image",
  removeTransition: "instant-apps-landing-page__remove-transition",
  alignment: "instant-apps-landing-page__alignment--",
  entryButton: "instant-apps-landing-page__entry-button",
  buttonContainer: "instant-apps-landing-page__button-container"
};

@Component({
  tag: "instant-apps-landing-page",
  styleUrl: "instant-apps-landing-page.scss",
  shadow: true
})
export class InstantAppsLandingPage {
  @Element()
  el: HTMLInstantAppsLandingPageElement;

  @Prop()
  titleText: string = "Title";

  @Prop()
  subtitleText: string = "Subtitle";

  @Prop()
  descriptionText: string = "Description text";

  @Prop()
  entryButtonText: string = "Enter";

  @Prop()
  iconImage: string = "";

  @Prop()
  iconImageAltText: string = "";

  @Prop()
  alignment: [HorizontalAlignment, VerticalAlignment] = ["center", "middle"];

  @Prop()
  disableTransition = false;

  @Prop()
  backgroundType: "color" | "image" = "color";

  @Prop()
  backgroundImageSrc: string;

  @Prop({
    mutable: true
  })
  open = true;

  render() {
    return <Host>{this.renderLandingPageContent()}</Host>;
  }

  renderLandingPageContent(): HTMLDivElement {
    const closed = !this.open ? ` ${CSS.closed}` : "";
    const alignmentClass = this.getAlignmentClass();
    const removeTransition = this.disableTransition ? ` ${CSS.removeTransition}` : "";
    return (
      <div class={`${CSS.BASE}${alignmentClass}${closed}${removeTransition}`}>
        {this.renderIconImage()}
        {this.renderTitleText()}
        {this.renderSubtitleText()}
        {this.renderDescriptionText()}
        <div class={CSS.buttonContainer}>
          {this.renderEntryButton()}
          <slot name="secondary-action"></slot>
        </div>
      </div>
    );
  }

  renderIconImage(): HTMLImageElement | null {
    return this.iconImage ? (
      <img class={CSS.iconImage} src={this.iconImage} alt={this.iconImageAltText} />
    ) : null;
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
      <calcite-button
        class={CSS.entryButton}
        onClick={() => (this.open = false)}
        scale="l"
        appearance="outline-fill"
      >
        {this.entryButtonText}
      </calcite-button>
    );
  }

  getAlignmentClass(): string {
    const [x, y] = this.alignment;
    return ` ${CSS.alignment}${x}-${y}`;
  }
}
