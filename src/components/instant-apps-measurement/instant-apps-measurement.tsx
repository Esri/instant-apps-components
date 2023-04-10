/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, State, Prop, Watch, Event, EventEmitter, Element, h } from '@stencil/core';

import Measurement_T9n from '../../assets/t9n/instant-apps-measurement/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';
import { IMeasureUnitConfiguration } from '../../interfaces/interfaces';

const CSS = {
  content: 'instant-apps-measurement__content',
};
@Component({
  tag: 'instant-apps-measurement',
  styleUrl: 'instant-apps-measurement.scss',
  scoped: true,
})
export class InstantAppsMeasurement {
  // HOST ELEMENT
  @Element() el: HTMLInstantAppsMeasurementElement;
  measureToolRef: any;

  @State() messages: typeof Measurement_T9n;
  /**
   * MapView or SceneView
   */

  @Prop() view: __esri.MapView | __esri.SceneView;

  @Prop() measureUnitConfiguration: IMeasureUnitConfiguration;
  @Prop() includeCoordinates?: boolean = true;

  @Watch('includeCoordinates')
  cleanUp() {
    if (this?.measureTool) this.measureTool.activeTool = 'clear';
  }
  /**
   * Emits when there is an active measure tool
   * to allow app devs to disable other tools/popups when
   * tools are active .
   */
  @Event() measureActive: EventEmitter<boolean>;

  measureTool: HTMLInstantAppsMeasurementToolElement | undefined;
  async componentWillLoad() {
    await this.getMessages();
  }

  componentDidLoad() {}
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0] as typeof Measurement_T9n;
  }

  render() {
    const { messages, includeCoordinates, view } = this;
    const { coordinateFormat, areaUnit, linearUnit } = this?.measureUnitConfiguration;
    const pointAction = includeCoordinates ? (
      <calcite-action text={messages?.point} icon="pin-plus" data-value="point" onClick={this._handleToolClick.bind(this)}></calcite-action>
    ) : null;

    return (
      <Host>
        <calcite-panel class={CSS.content}>
          <calcite-action-bar expand-disabled={true} layout="horizontal">
            <calcite-action text={messages?.line} icon="measure" data-value="distance" onClick={this._handleToolClick.bind(this)}></calcite-action>
            <calcite-action text={messages?.area} icon="measure-area" data-value="area" onClick={this._handleToolClick.bind(this)}></calcite-action>
            {pointAction}
            <calcite-action text={messages?.clear} icon="trash" data-value="clear" onClick={this._handleToolClick.bind(this)}></calcite-action>
          </calcite-action-bar>
          <instant-apps-measurement-tool
            ref={el => {
              this.measureTool = el;
            }}
            view={view}
            measureUnitConfiguaration={{ coordinateFormat, areaUnit, linearUnit }}
            includeCoordinates={includeCoordinates}
          ></instant-apps-measurement-tool>
        </calcite-panel>
      </Host>
    );
  }
  protected _handleToolClick(e) {
    if (!this?.measureTool) return;
    const tool = e?.target?.dataset['value'];
    this.measureTool.activeTool = tool;
    this.measureActive.emit(tool === undefined || tool === 'clear' ? false : true);
  }
}
