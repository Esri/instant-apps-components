import { Component, Host, h, Prop } from '@stencil/core';

const CSS = {
  headerContent: 'instant-apps-header__header-content',
};

@Component({
  tag: 'instant-apps-header',
  styleUrl: 'instant-apps-header.scss',
  shadow: true,
})
export class InstantAppsHeader {
  @Prop() titleText: string;

  @Prop() backgroundColor: string;

  @Prop() textColor: string;

  @Prop() logoImage: string;

  @Prop() logoImageAltText: string;

  @Prop() logoLink: string;

  @Prop() label: string;

  render() {
    return (
      <Host>
        <header style={{ backgroundColor: this.backgroundColor }}>
          <span class={CSS.headerContent}>
            {this.logoImage && this.logoLink ? (
              <a href={`${this.logoLink}`} target="_blank">
                <img src={`${this.logoImage}`} alt={`${this.logoImageAltText}`} />
              </a>
            ) : this.logoImage ? (
              <img src={`${this.logoImage}`} alt={this.logoImageAltText} />
            ) : (
              ''
            )}
            <h1 style={{ color: this.textColor }}>{this.titleText}</h1>
          </span>
          <slot name="actions-end"></slot>
        </header>
      </Host>
    );
  }
}
