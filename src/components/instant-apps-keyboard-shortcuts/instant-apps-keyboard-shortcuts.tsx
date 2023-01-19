/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, State, Prop, Element, h } from '@stencil/core';
import SceneView from 'esri/views/SceneView';
import KeyboardShortcuts_T9n from '../../assets/t9n/instant-apps-keyboard-shortcuts/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';
const CSS = {
  content: 'instant-apps-keyboard-shortcuts__content',
};
@Component({
  tag: 'instant-apps-keyboard-shortcuts',
  styleUrl: 'instant-apps-keyboard-shortcuts.scss',
  shadow: true,
})
export class InstantAppsKeyboardShortcuts {
  // HOST ELEMENT
  @Element() el: HTMLInstantAppsKeyboardShortcutsElement;

  @State() messages: typeof KeyboardShortcuts_T9n;

  /**
   * MapView or SceneView to reference when URL parameter values are generated, i.e. center, level, viewpoint, etc.
   */
  @Prop() view: __esri.MapView | __esri.SceneView;

  render() {
    const commands = this?.view?.type === '2d' || !this?.view ? this._getMapViewCommands() : this._getSceneViewCommands();

    const modifierKey = this._isMacLike() ? 'Option' : 'Alt';
    return (
      <Host>
        <calcite-block open class={`${CSS.content}`} heading={this?.messages?.generalShortcuts?.label}>
          <table>
            {this.renderTableHeader()}
            <tr>
              <td>{`${modifierKey} + M`}</td>
              <td>{this?.messages?.generalShortcuts?.title}</td>
            </tr>
          </table>
          <calcite-label>{this?.messages?.generalShortcuts?.title}</calcite-label>
          <table>
            {this.renderTableHeader()}
            {commands.map(command => {
              return (
                <tr>
                  <td>{command.alias}</td>
                  <td>{command.title}</td>
                </tr>
              );
            })}
          </table>
        </calcite-block>
      </Host>
    );
  }
  componentDidLoad() {
    this.getMessages();
  }
  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0] as typeof KeyboardShortcuts_T9n;
  }

  renderTableHeader() {
    return this?.messages ? (
      <tr>
        <th>{this?.messages?.generalShortcuts.shortcut}</th>
        <th>{this?.messages?.generalShortcuts.action}</th>
      </tr>
    ) : null;
  }
  _getMapViewCommands() {
    return this?.messages
      ? [
          {
            alias: this?.messages.mapShortcuts.arrowKeys,
            title: this?.messages.mapShortcuts.nudge,
          },
          {
            alias: 'N',
            title: this?.messages.mapShortcuts.N,
          },
          {
            alias: 'A',
            title: this?.messages.mapShortcuts.A,
          },
          {
            alias: 'D',
            title: this?.messages.mapShortcuts.D,
          },
          {
            alias: '+',
            title: this?.messages.mapShortcuts.plus,
          },
          {
            alias: '-',
            title: this?.messages.mapShortcuts.minus,
          },
        ]
      : [];
  }
  _getSceneViewCommands() {
    /* Arrow Keys(nudge), U and J are only 
     supported in global scenes*/
    const isGlobal = (this?.view as SceneView)?.viewingMode === 'global' ? true : false;
    const allMessages = this?.messages
      ? [
          {
            alias: this?.messages.mapShortcuts.arrowKeys,
            title: this?.messages.mapShortcuts.nudge,
            show: isGlobal ? true : false,
          },
          {
            alias: 'P',
            title: this?.messages.sceneShortcuts.P,
            show: true,
          },
          {
            alias: 'N',
            title: this?.messages.sceneShortcuts.N,
            show: true,
          },
          {
            alias: 'W',
            title: this?.messages.sceneShortcuts.W,
            show: true,
          },
          {
            alias: 'A',
            title: this?.messages.sceneShortcuts.A,
            show: true,
          },
          {
            alias: 'D',
            title: this?.messages.sceneShortcuts.D,
            show: true,
          },
          {
            alias: 'S',
            title: this?.messages.sceneShortcuts.S,
            show: true,
          },
          {
            alias: 'J',
            title: this?.messages.sceneShortcuts.globalCommands.J,
            show: isGlobal ? true : false,
          },
          {
            alias: 'U',
            title: this?.messages.sceneShortcuts.globalCommands.U,
            show: isGlobal ? true : false,
          },
        ]
      : [];
    return this?.messages
      ? allMessages?.filter(m => {
          return m.show;
        })
      : [];
  }
  /* _parseMessageValues(data) {
    return Object.keys(data).map(key => ({ alias: key, title: data[key] }));
  }*/
  _isMacLike(): boolean {
    return /(Mac)/i.test(navigator.platform);
  }
}
