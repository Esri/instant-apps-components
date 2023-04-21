import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'instant-apps-control-panel',
  styleUrl: 'instant-apps-control-panel.scss',
  shadow: true,
})
export class InstantAppsControlPanel {

  render() {
    return (
      <Host>
        Control panel
      </Host>
    );
  }

}
