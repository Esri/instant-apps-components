import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'instant-apps-app-guide',
  styleUrl: 'instant-apps-app-guide.scss',
  shadow: true,
})
export class InstantAppsAppGuide {

  render() {
    return (
      <Host>
        <slot>It Works!</slot>
      </Host>
    );
  }

}
