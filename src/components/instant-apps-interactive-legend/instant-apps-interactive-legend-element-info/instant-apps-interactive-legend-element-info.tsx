import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'instant-apps-interactive-legend-element-info',
  styleUrl: 'instant-apps-interactive-legend-element-info.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendElementInfo {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
