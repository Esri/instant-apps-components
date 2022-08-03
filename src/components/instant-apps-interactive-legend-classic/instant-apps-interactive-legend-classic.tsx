import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'instant-apps-interactive-legend-classic',
  styleUrl: 'instant-apps-interactive-legend-classic.scss',
  shadow: true,
})
export class InstantAppsInteractiveLegendClassic {
  @Prop()
  legendvm: __esri.LegendViewModel;

  render() {
    console.log("LEGEND VIEW MODEL: ", this.legendvm);
    return (
      <Host>
        Interactive Legend UI
      </Host>
    );
  }
}
