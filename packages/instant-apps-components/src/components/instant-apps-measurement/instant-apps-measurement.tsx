/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, State, Prop, Event, EventEmitter, Element, h } from '@stencil/core';

import Measurement_T9n from '../../assets/t9n/instant-apps-measurement/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';
import { ActiveTool } from '../../interfaces/interfaces';

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
  @Prop() areaUnit?: __esri.AreaUnit;
  @Prop() linearUnit?: __esri.LengthUnit;
  @Prop() coordinateFormat?: string;
  @Prop() activeToolType: ActiveTool;
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
    const { messages, view, coordinateFormat, areaUnit, linearUnit, activeToolType } = this;
    return (
      <Host>
        <calcite-panel class={CSS.content}>
          <calcite-action-pad expand-disabled={true} layout="horizontal">
            <calcite-action
              class={activeToolType === 'distance' ? 'active-tool' : null}
              text={messages?.line}
              text-enabled="false"
              icon="measure"
              data-value="distance"
              onClick={this._handleToolClick.bind(this)}
            ></calcite-action>
            <calcite-action
              class={activeToolType === 'area' ? 'active-tool' : null}
              text={messages?.area}
              text-enabled="false"
              icon="measure-area"
              data-value="area"
              onClick={this._handleToolClick.bind(this)}
            ></calcite-action>
            <calcite-action
              class={activeToolType === 'point' ? 'active-tool' : null}
              text={messages?.point}
              text-enabled="false"
              icon="pin-plus"
              data-value="point"
              onClick={this._handleToolClick.bind(this)}
            ></calcite-action>
            <calcite-action text={messages?.clear} text-enabled="false" icon="trash" data-value="clear" onClick={this._handleToolClick.bind(this)}></calcite-action>
          </calcite-action-pad>
          <instant-apps-measurement-tool
            ref={el => {
              this.measureTool = el;
            }}
            view={view}
            measureConfiguration={{ coordinateFormat, areaUnit, linearUnit, activeToolType }}
          ></instant-apps-measurement-tool>
        </calcite-panel>
      </Host>
    );
  }
  protected _handleToolClick(e) {
    if (!this?.measureTool) return;
    const tool = e?.target?.dataset['value'];
    this.measureTool.activeTool = tool;
    // clean up active styles
    const elements = document.getElementsByClassName('active-tool');
    for (let i = 0; i < elements?.length; i++) {
      elements[i]?.classList?.remove('active-tool');
    }
    e?.target?.classList.add('active-tool');

    this.measureActive.emit(tool === undefined || tool === 'clear' ? false : true);
  }
}
