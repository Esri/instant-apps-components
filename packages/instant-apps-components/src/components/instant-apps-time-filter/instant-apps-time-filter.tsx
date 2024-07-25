import { Component, Host, Prop, State, h } from '@stencil/core';
import { ITimeInfoItem } from './interfaces';
import { FilterMode } from '../../interfaces/interfaces';

import TimeFilter_t9n from "../../assets/t9n/instant-apps-time-filter/resources.json";
import { getMessages } from '../../utils/locale';
import { loadModules } from '../../utils/loadModules';

@Component({
  tag: 'instant-apps-time-filter',
  styleUrl: 'instant-apps-time-filter.scss',
  shadow: true,
})
export class InstantAppsTimeFilter {
  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles;

  messages: typeof TimeFilter_t9n;
  timeSlider: __esri.TimeSlider;

  @Prop()
  filterMode: FilterMode;

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  @Prop()
  timeInfoItems: ITimeInfoItem[] = [];

  @State()
  selectedTimeInfoItem: ITimeInfoItem;

  async componentWillLoad() {
    await getMessages(this);
    this._initializeModules();
  }

  async componentDidLoad() {
    await this.reactiveUtils.whenOnce(() => this.view);
    const [TimeSlider] = await loadModules(['esri/widgets/TimeSlider']);
    this.timeSlider = new TimeSlider({
      view: this.view
    });
  }

  private async _initializeModules() {
    const [Handles, reactiveUtils] = await loadModules(['esri/core/Handles', 'esri/core/reactiveUtils']);
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();
  }

  render() {
    return (
      <Host>
        {this.messages?.label}
      </Host>
    );
  }

}
