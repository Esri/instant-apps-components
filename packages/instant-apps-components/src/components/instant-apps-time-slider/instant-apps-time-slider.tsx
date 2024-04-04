import { Component, Prop, State, h } from '@stencil/core';
import { loadModules } from '../../utils/loadModules';
import { CalciteSelectCustomEvent } from '@esri/calcite-components';

@Component({
  tag: 'instant-apps-time-slider',
  styleUrl: 'instant-apps-time-slider.scss',
  shadow: false,
})
export class InstantAppsTimeSlider {
  timeSlider: __esri.TimeSlider;
  timeSliderRef: HTMLDivElement | undefined;

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  @State()
  webMapTimeSlider: __esri.WebMapTimeSlider | null;

  @Prop()
  timeLayers: __esri.Collection<__esri.FeatureLayer>;

  async componentWillLoad() {
    const { type } = this.view;
    if (type === '3d') {
      const scene = this.view.map as __esri.WebScene;
      await scene.loadAll();
    } else {
      const map = this.view.map as __esri.WebMap;
      await map.loadAll();
      const webmapTimeSlider = map.widgets?.['timeSlider'];
      this.webMapTimeSlider = webmapTimeSlider ? webmapTimeSlider : null;
    }
    this.timeLayers = this.getTimeLayers();
  }

  async initTimeSlider(el) {
    const [TimeSlider] = await loadModules(['esri/widgets/TimeSlider']);
    const timeSlider = new TimeSlider({
      container: el,
      view: this.view,
    });
    timeSlider.fullTimeExtent = this.webMapTimeSlider?.fullTimeExtent as __esri.TimeExtent;
    timeSlider.timeExtent = this.webMapTimeSlider?.currentTimeExtent as __esri.TimeExtent;
    this.timeSlider = timeSlider;
  }

  render() {
    return (
      <div id="instantAppsTimeSlider" class="esri-component esri-widget">
        {this.renderSelect()}
        {this.renderTimeSlider()}
      </div>
    );
  }

  renderSelect() {
    return (
      <calcite-label>
        Select a Time Aware Layer
        <calcite-select onCalciteSelectChange={this.updateTimeSlider.bind(this)}>
          {this.renderAllOption()}
          {this.renderLayerOptions()}
        </calcite-select>
      </calcite-label>
    );
  }

  renderAllOption() {
    return this.view.type === '2d' && this.webMapTimeSlider ? (
      <calcite-option key="all" value="all">
        All
      </calcite-option>
    ) : null;
  }

  renderLayerOptions() {
    return this.timeLayers?.toArray()?.map(layer => (
      <calcite-option key={`${layer.id}-option`} value={layer.id}>
        {layer.title}
      </calcite-option>
    ));
  }

  renderTimeSlider() {
    return <div ref={el => this.initTimeSlider(el)} />;
  }

  getTimeLayers() {
    const fLayers = this.getFeatureLayers();
    return fLayers.filter(fLayer => !!fLayer.timeInfo);
  }

  getFeatureLayers() {
    const allLayers = this.view.map.allLayers;
    return allLayers.filter(layer => layer.type === 'feature') as __esri.Collection<__esri.FeatureLayer>;
  }

  updateTimeSlider(e: CalciteSelectCustomEvent<CustomEvent>) {
    const { value } = e.target;
    if (value === 'all') {
      this.timeSlider.fullTimeExtent = this.webMapTimeSlider?.fullTimeExtent as __esri.TimeExtent;
      this.timeSlider.timeExtent = this.webMapTimeSlider?.currentTimeExtent as __esri.TimeExtent;
    } else {
      const layer = this.timeLayers.find(layer => layer.id === value);
      this.timeSlider.timeExtent = layer.timeExtent ? layer.timeExtent : layer.timeInfo.fullTimeExtent;
      this.timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent;
    }
  }
}
