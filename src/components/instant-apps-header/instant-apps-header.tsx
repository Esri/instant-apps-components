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

import { Component, Host, h, Prop } from '@stencil/core';

const CSS = {
  headerContent: 'instant-apps-header__header-content',
};

@Component({
  tag: 'instant-apps-header',
  styleUrl: 'instant-apps-header.scss',
  shadow: true,
})
export class InstantAppsHeader {
  @Prop() titleText: string;

  @Prop() backgroundColor: string;

  @Prop() textColor: string;

  @Prop() logoImage: string;

  @Prop() logoImageAltText: string;

  @Prop() logoLink: string;

  @Prop() label: string;

  render() {
    return (
      <Host>
        <header style={{ backgroundColor: this.backgroundColor }}>
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
