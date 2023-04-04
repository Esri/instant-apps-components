/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, State, Prop, Element, h } from '@stencil/core';

import Measurement_T9n from '../../assets/t9n/instant-apps-measurement/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';
const CSS = {
  content: 'instant-apps-measurement__content',
};
@Component({
  tag: 'instant-apps-measurement',
  styleUrl: 'instant-apps-measurement.scss',
  shadow: true,
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

  measureTool;

  @Prop() areaUnit: __esri.AreaUnit;
  @Prop() linearUnit: __esri.LengthUnit;

  async componentWillLoad() {
    await this.getMessages();
  }

  componentDidLoad() {}
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0] as typeof Measurement_T9n;
  }

  render() {
    return (
      <Host>
        <calcite-panel class={CSS.content}>
          <calcite-action-bar expand-disabled={true} layout="horizontal">
            <calcite-action text={this.messages?.line} icon="measure" data-value="distance" onClick={this._handleToolClick.bind(this)}></calcite-action>
            <calcite-action text={this.messages?.area} icon="measure-area" data-value="area" onClick={this._handleToolClick.bind(this)}></calcite-action>
            <calcite-action text={this.messages?.point} icon="pin-plus" data-value="point" onClick={this._handleToolClick.bind(this)}></calcite-action>
            <calcite-action text={this.messages?.clear} icon="trash" data-value="clear" onClick={this._handleToolClick.bind(this)}></calcite-action>
          </calcite-action-bar>
          <instant-apps-measurement-tool
            ref={el => {
              this.measureTool = el;
            }}
            view={this.view}
            measureConfiguration={{ areaUnit: this.areaUnit, linearUnit: this.linearUnit }}
          ></instant-apps-measurement-tool>
        </calcite-panel>
      </Host>
    );
  }

  protected _handleToolClick(e) {
    const tool = e?.target?.dataset['value'];
    this?.measureTool.activateTool(tool);
  }
}
