/** @license
 * Copyright 2022 Esri
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

import { Component, Element, Host, h, Method, Prop, State, VNode } from '@stencil/core';
import { IMeasureConfiguration } from '../../../interfaces/interfaces';

import { loadModules } from '../../../utils/loadModules';
const base = 'instant-apps-measurement-tool';
const CSS = {
  base,
  hide: `${base}__hide`,
};
@Component({
  tag: 'instant-apps-measurement-tool',
  styleUrl: 'instant-apps-measurement-tool.scss',
  shadow: true,
})
export class MeasurementTool {
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

  //--------------------------------------------------------------------------
  //
  //  State (internal)
  //
  //--------------------------------------------------------------------------
  // TODO Add coordinate formats for coord conversion
  // figure out why ESRi widget styles aren't applied...
  /**
   * string: Text entered by the end user.
   * Used to search against the locator.
   */
  @State() _activeTool: string;

  //--------------------------------------------------------------------------
  //
  //  Properties (protected)
  //
  //--------------------------------------------------------------------------

  protected Measurement: typeof import('esri/widgets/Measurement');
  protected CoordinateConversion: typeof import('esri/widgets/CoordinateConversion');
  /**
   * HTMLElement: The container div for the measurement widget
   */
  protected _measureElement: HTMLElement;

  protected _coordinateElement: HTMLElement;

  /**
   * esri/widgets/Measurement
   */
  protected _measureWidget: __esri.Measurement;

  protected _coordinateWidget: __esri.CoordinateConversion;

  //--------------------------------------------------------------------------
  //
  //  Watch handlers
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Methods (public)
  //
  //--------------------------------------------------------------------------

  /**
   * Clears the state of the search widget
   *
   * @returns Promise that resolves when the operation is complete
   */
  @Method()
  async clear(): Promise<void> {
    this._measureWidget.clear();
  }

  //--------------------------------------------------------------------------
  //
  //  Events (public)
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Functions (lifecycle)
  //
  //--------------------------------------------------------------------------

  /**
   * StencilJS: Called once just after the component is first connected to the DOM.
   *
   * @returns Promise when complete
   */
  async componentWillLoad(): Promise<void> {
    await this._initModules();
  }

  /**
   * StencilJS: Called once just after the component is fully loaded and the first render() occurs.
   */
  componentDidLoad(): void {
    this._init();
  }

  /**
   * Renders the component.
   */
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
    const [Measurement, CoordinateConversion] = await loadModules(['esri/widgets/Measurement', 'esri/widgets/CoordinateConversion']);
    this.Measurement = Measurement;
    this.CoordinateConversion = CoordinateConversion;
  }

  /**
   * Initialize the measurement widget
   *
   * @returns Promise resolving when function is done
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
    if (this.view && this._measureElement) {
      this._measureWidget = new this.Measurement({ view: this.view, container: this._measureElement, ...this.measureConfiguration });
    }
  }
  protected _initCoordinateWidget(): void {
    if (this?.view && this._coordinateElement) {
      this._coordinateWidget = new this.CoordinateConversion({ view: this.view, container: this._coordinateElement });
    }
  }

  @Method()
  activateTool(value: string): void {
    const viewType = this.view.type;
    if (!this._measureWidget) return;
    this._measureWidget.clear();
    this._coordinateElement?.classList.add(CSS.hide);
    if (value === 'distance') {
      this._measureWidget.activeTool = viewType === '2d' ? 'distance' : 'direct-line';
    } else if (value === 'area') {
      this._measureWidget.activeTool = 'area';
    } else if (value === 'point') {
      this._coordinateElement?.classList.remove(CSS.hide);
    }
  }
}
