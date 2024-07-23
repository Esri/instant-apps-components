import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'instant-apps-time-slider',
  styleUrl: 'instant-apps-time-slider.scss',
  shadow: true,
})
export class InstantAppsTimeSlider {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
