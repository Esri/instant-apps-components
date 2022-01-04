import { Component, h, Prop, State } from '@stencil/core';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import config from '@arcgis/core/config';

@Component({
  tag: 'instant-apps-view',
  styleUrl: 'instant-apps-view.scss',
  shadow: false,
})
export class InstantAppsView {
  viewRef: HTMLDivElement;

  @Prop()
  portalUrl: string;

  @Prop() mapId: string;

  @State() view: __esri.MapView;

  async componentDidLoad() {
    if (this.portalUrl) {
      config.portalUrl = this.portalUrl;
    }

    const map = new WebMap({
      portalItem: {
        id: this.mapId,
      },
    });

    try {
      await map.load();
    } catch (err) {
      console.error('ERROR: ', err);
    } finally {
      const view = new MapView({
        map,
        container: this.viewRef,
      });
      this.view = view;
    }
  }

  async componentShouldUpdate(prevState, nextState, prop) {
    if (prop === 'view') {
      return;
    }
    if (prop === 'mapId' && prevState !== nextState) {
      if (this.view) {
        this.view.destroy();
      }

      const map = new WebMap({
        portalItem: {
          id: this.mapId,
        },
      });

      const view = new MapView({
        map,
        container: this.viewRef,
      });

      this.view = view;
    }
  }

  render() {
    return <div class="instant-apps-view" ref={el => (this.viewRef = el as HTMLDivElement)}></div>;
  }
}
