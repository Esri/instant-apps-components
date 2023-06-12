/** @license
 * Copyright 2023 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, Element, Host, h, Prop, VNode, Watch } from '@stencil/core';
import { ActiveTool, IMeasureConfiguration } from '../../../interfaces/interfaces';

import { loadModules } from '../../../utils/loadModules';
const base = 'instant-apps-measurement-tool';
const CSS = {
  base,
  hide: `${base}__hide`,
};
@Component({
  tag: 'instant-apps-measurement-tool',
  styleUrl: 'instant-apps-measurement-tool.scss',
  scoped: true,
})
export class InstantAppsMeasurementTool {
  //--------------------------------------------------------------------------
  //
  //  Host element access
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties (public)
  //
  //--------------------------------------------------------------------------

  @Prop() view: __esri.MapView | __esri.SceneView;

  @Prop() measureConfiguration: IMeasureConfiguration;
  @Prop() activeTool: ActiveTool;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected Measurement: typeof import('esri/widgets/Measurement');
  protected CoordinateConversion: typeof import('esri/widgets/CoordinateConversion');
  protected Conversion: typeof import('esri/widgets/CoordinateConversion/support/Conversion');

  /**
   * HTMLElement: The container div for the measurement widget
   */
  protected _measureElement: HTMLElement;

  protected _coordinateElement: HTMLElement;

  protected _measureWidget: __esri.Measurement;

  protected _coordinateWidget: __esri.CoordinateConversion;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------
  @Watch('activeTool')
  _activeToolHandler(value: string) {
    const viewType = this.view.type;
    if (!this._measureWidget) return;

    this._measureWidget.clear();
    this._coordinateElement?.classList.add(CSS.hide);
    if (value === 'distance') {
      const toolName = viewType === '2d' ? 'distance' : 'direct-line';
      this._measureWidget.activeTool = toolName;
    } else if (value === 'area') {
      this._measureWidget.activeTool = 'area';
    } else if (value === 'point') {
      this._coordinateElement?.classList.remove(CSS.hide);
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  async componentWillLoad(): Promise<void> {
    await this._initModules();
  }

  componentDidLoad(): void {
    this._init();
  }
  render(): VNode {
    return (
      <Host>
        <div class={CSS.base}>
          <div
            ref={el => {
              this._measureElement = el as HTMLElement;
            }}
          />
          <div
            class={CSS.hide}
            ref={el => {
              this._coordinateElement = el as HTMLElement;
            }}
          />
        </div>
      </Host>
    );
  }
  disconnectedCallback(): void {
    this._measureWidget?.destroy();
    this._coordinateWidget?.destroy();
  }
  //--------------------------------------------------------------------------
  //
  //  Functions (protected)
  //
  //--------------------------------------------------------------------------

  /**
   * Load esri javascript api modules
   *
   * @returns Promise resolving when function is done
   *
   * @protected
   */
  protected async _initModules(): Promise<void> {
    const [Measurement, CoordinateConversion, Conversion] = await loadModules([
      'esri/widgets/Measurement',
      'esri/widgets/CoordinateConversion',
      'esri/widgets/CoordinateConversion/support/Conversion',
    ]);
    this.Measurement = Measurement;
    this.CoordinateConversion = CoordinateConversion;
    this.Conversion = Conversion;
  }

  /**
   * Initialize the measurement widget
   *
   */
  protected _init(): void {
    this._initMeasurementWidget();
    this._initCoordinateWidget();
  }

  /**
   * Initialize the measurement widget and listen to key events
   *
   * @protected
   */
  protected _initMeasurementWidget(): void {
    if (this.view && this._measureElement && !this._measureWidget) {
      this._measureWidget = new this.Measurement({ view: this.view, container: this._measureElement, ...this.measureConfiguration });
      if (this?.measureConfiguration?.activeToolType !== undefined && this?.measureConfiguration?.activeToolType !== 'point') {
        this.activeTool = this.measureConfiguration.activeToolType;
      }
    }
  }

  protected _initCoordinateWidget(): void {
    if (this?.view && this._coordinateElement && !this._coordinateWidget) {
      this._coordinateWidget = new this.CoordinateConversion({ view: this.view, storageEnabled: false, container: this._coordinateElement });

      if (this?.measureConfiguration?.coordinateFormat !== null && this?.measureConfiguration?.coordinateFormat !== undefined) {
        const format = this._coordinateWidget.formats.find(f => {
          return f.name === this.measureConfiguration.coordinateFormat;
        });
        this._coordinateWidget?.conversions?.splice(0, 0, new this.Conversion({ format }));
      }
    }
    if (this?.measureConfiguration?.activeToolType === 'point') {
      this.activeTool = this.measureConfiguration.activeToolType;
    }
  }
}
