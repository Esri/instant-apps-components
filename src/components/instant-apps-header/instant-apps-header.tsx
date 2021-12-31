import { Component, Host, h, Prop, Watch, State } from '@stencil/core';

@Component({
  tag: 'instant-apps-header',
  styleUrl: 'instant-apps-header.scss',
  shadow: true,
})
export class InstantAppsHeader {
  @State() sharedThemeObj: any;

  @Prop() titleText: string;

  @Prop() applySharedTheme: boolean = false;

  @Prop() sharedTheme: string;

  @Watch('sharedTheme')
  convertSharedThemeObj() {
    this.sharedThemeObj = JSON.parse(this.sharedTheme);
  }

  componentWillLoad() {
    this.convertSharedThemeObj();
  }

  render() {
    return (
      <Host>
        <header style={{ backgroundColor: this.applySharedTheme && this.sharedThemeObj?.header?.background ? this.sharedThemeObj?.header?.background : '' }}>
          {this.applySharedTheme && this.sharedThemeObj?.logo?.small && this.sharedThemeObj?.logo?.link ? (
            <a href={`${this.sharedThemeObj?.logo?.link}`} target="_blank">
              <img src={`${this.sharedThemeObj?.logo?.small}`} />
            </a>
          ) : (
            ''
          )}
          <h1 style={{ color: this.applySharedTheme && this.sharedThemeObj?.header?.text ? this.sharedThemeObj?.header?.text : '' }}>{this.titleText}</h1>
        </header>
      </Host>
    );
  }
}
