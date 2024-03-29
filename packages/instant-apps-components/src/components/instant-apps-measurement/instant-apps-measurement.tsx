/*
 *   Copyright (c) 2024 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, State, Prop, Event, EventEmitter, Element, h } from '@stencil/core';

import Measurement_T9n from '../../assets/t9n/instant-apps-measurement/resources.json';

import { getMessages } from '../../utils/locale';
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
   * A reference to the MapView or SceneView
   */
  @Prop() view: __esri.MapView | __esri.SceneView;
  /**
   * Choose which unit will be used for the area tool by default
   */
  @Prop() areaUnit?: __esri.AreaUnit;
  /**
   * Choose which unit will be used for the distance tool by default
   */
  @Prop() linearUnit?: __esri.LengthUnit;
  /**
   * Choose which formats to include as options while converting coordinates
   */
  @Prop() coordinateFormat?: string;
  /**
   * Determine the tool that will be open on load
   */
  @Prop() activeToolType: ActiveTool;
  /**
   * When true the measure widget is closable
   */
  @Prop() closable: boolean = false;
  /**
   * Emits when there is an active measure tool
   * to allow app devs to disable other tools/popups when
   * tools are active .
   */
  @Event() measureActive: EventEmitter<boolean>;

  measureTool: HTMLInstantAppsMeasurementToolElement | undefined;
  async componentWillLoad() {
    getMessages(this);
  }

  componentDidLoad() {}

  render() {
    return (
      <Host>
        <calcite-panel heading={this?.messages?.label} closable={this.closable}>
          <div>{this.renderActionPad()}</div>
          {this.renderMeasureToolPanel()}
        </calcite-panel>
      </Host>
    );
  }
  renderMeasureToolPanel() {
    const { view, coordinateFormat, areaUnit, linearUnit, activeToolType } = this;
    return (
      <calcite-panel class={CSS.content}>
        <instant-apps-measurement-tool
          ref={el => {
            this.measureTool = el;
          }}
          view={view}
          measureConfiguration={{ coordinateFormat, areaUnit, linearUnit, activeToolType }}
        ></instant-apps-measurement-tool>
      </calcite-panel>
    );
  }

  renderActionPad() {
    const { messages, activeToolType } = this;
    return (
      <calcite-action-pad expand-disabled={true} layout="horizontal" position="end">
        <calcite-action
          class={activeToolType === 'distance' ? 'active-tool' : ''}
          text={messages?.line}
          icon="measure"
          scale="m"
          data-value="distance"
          onClick={this._handleToolClick.bind(this)}
        >
          <calcite-tooltip close-on-click={true} placement="bottom" slot="tooltip">
            {messages?.line}
          </calcite-tooltip>
        </calcite-action>
        <calcite-action
          class={activeToolType === 'area' ? 'active-tool' : ''}
          text={messages?.area}
          scale="m"
          icon="measure-area"
          data-value="area"
          onClick={this._handleToolClick.bind(this)}
        >
          <calcite-tooltip close-on-click={true} placement="bottom" slot="tooltip">
            {messages?.area}
          </calcite-tooltip>
        </calcite-action>
        <calcite-action
          class={activeToolType === 'point' ? 'active-tool' : ''}
          text={messages?.point}
          scale="m"
          icon="pin-plus"
          data-value="point"
          onClick={this._handleToolClick.bind(this)}
        >
          <calcite-tooltip close-on-click={true} placement="bottom" slot="tooltip">
            {messages?.point}
          </calcite-tooltip>
        </calcite-action>

        <calcite-action text={messages?.clear} scale="m" icon="trash" data-value="clear" onClick={this._handleToolClick.bind(this)}>
          <calcite-tooltip close-on-click={true} placement="bottom" slot="tooltip">
            {messages?.clear}
          </calcite-tooltip>
        </calcite-action>
      </calcite-action-pad>
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
