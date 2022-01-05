import { Component, Host, h, Prop } from '@stencil/core';

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
    console.log(this);
    return (
      <Host>
        <header style={{ backgroundColor: this.backgroundColor }}>
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
        </header>
      </Host>
    );
  }
}
