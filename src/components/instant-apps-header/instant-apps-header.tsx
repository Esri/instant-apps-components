/*
 *   Copyright (c) 2022 Esri
 *   All rights reserved.
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import { Component, Host, h, Prop, Element, State } from '@stencil/core';
import { getElementDir } from '../../utils/languageUtil';

const CSS = {
  headerContent: 'instant-apps-header__header-content',
  flipRtl: 'instant-apps-header--rtl',
};

/**
 * @slot actions-end - Used to slot an action at the end of the header i.e. `calcite-action`, `instant-apps-social-share`
 */
@Component({
  tag: 'instant-apps-header',
  styleUrl: 'instant-apps-header.scss',
  shadow: true,
})
export class InstantAppsHeader {
  @Element()
  el;

  @State()
  dir: "ltr" | "rtl";

  /**
   * Main text to display in header.
   */
  @Prop() titleText: string;

  /**
   * Background color to display in header - accepts a hexidecimal value i.e. `#000000`.
   */
  @Prop() backgroundColor: string;

  /**
   * Text color to display in header - accepts a hexidecimal value i.e. `#FFFFFF`.
   */
  @Prop() textColor: string;

  /**
   * Image URL for logo. Displays at the start of the header.
   */
  @Prop() logoImage: string;

  /**
   * Alternate text for header logo.
   */
  @Prop() logoImageAltText: string;

  /**
   * Logo URL to link out to another page.
   */
  @Prop() logoLink: string;

  componentDidLoad() {
    this.dir = getElementDir(this.el);
  }

  render() {
    console.log('DIRECTION: ', this.dir);
    return (
      <Host>
        <header class={this.dir === 'rtl' ? CSS.flipRtl : ''} style={{ backgroundColor: this.backgroundColor }}>
          <span class={CSS.headerContent}>
            {this.logoImage && this.logoLink ? (
              <a href={`${this.logoLink}`} target="_blank">
                <img src={`${this.logoImage}`} alt={`${this.logoImageAltText}`} />
              </a>
            ) : this.logoImage ? (
              <img src={`${this.logoImage}`} alt={this.logoImageAltText} />
            ) : (
              ''
            )}
            <h1 style={{ color: this.textColor }}>{this.titleText}</h1>
          </span>
          <slot name="actions-end"></slot>
        </header>
      </Host>
    );
  }
}
