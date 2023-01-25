/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, h, Element, Prop, State } from '@stencil/core';
import { InstantAppsPopovers } from '../instant-apps-popovers/instant-apps-popovers';

import Popover_T9n from '../../assets/t9n/instant-apps-popover/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';
import { LogicalPlacement } from '@esri/calcite-components/dist/types/utils/floating-ui';
import { InstantAppsPopoverMessageOverrides } from '../../interfaces/interfaces';

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
  action: 'instant-apps-popover__action',
  actionDisabled: 'instant-apps-popover--action-disabled',
  img: 'instant-apps-popover__img',
  footer: 'instant-apps-popover__footer',
};

@Component({
  tag: 'instant-apps-popover',
  styleUrl: 'instant-apps-popover.scss',
  shadow: false,
})
export class InstantAppsPopover {
  popoverEl: HTMLCalcitePopoverElement;

  // Host element
  @Element() el: HTMLInstantAppsPopoverElement;

  // Public properties
  @Prop({
    reflect: true,
  })
  popoverTitle: string;

  @Prop({
    reflect: true,
  })
  subtitle: string;

  @Prop({
    reflect: true,
  })
  content: string;

  @Prop({
    reflect: true,
  })
  imgSrc: string;

  @Prop({
    reflect: true,
  })
  imgAlt: string;

  @Prop({
    reflect: true,
  })
  mediaSrc: string;

  @Prop({
    reflect: true,
  })
  index: number;

  @Prop({
    reflect: true,
  })
  referenceElement: string | HTMLElement;

  @Prop()
  parent: InstantAppsPopovers;

  @Prop()
  placement: LogicalPlacement = 'trailing-start';

  @Prop()
  refId: string;

  @Prop({
    reflect: true,
  })
  pagination = false;

  @Prop({
    reflect: true,
  })
  disableAction = false;

  @Prop()
  popoverAction: (event: MouseEvent) => void;

  // Internal State
  @State()
  messages: typeof Popover_T9n;

  @Prop()
  messageOverrides: InstantAppsPopoverMessageOverrides;

  async componentDidLoad() {
    await this.getMessages();
    this.messages = {
      ...this.messages,
      ...this.messageOverrides,
    };
  }

  componentDidUpdate() {
    this.popoverEl.referenceElement = this.referenceElement;
  }

  render() {
    return (
      <calcite-popover
        ref={(el: HTMLCalcitePopoverElement) => (this.popoverEl = el)}
        heading={this.popoverTitle}
        auto-close={true}
        placement={this.placement}
        messageOverrides={{ close: this.messages?.close }}
        trigger-disabled={true}
        ref-id={this.refId}
        closable={true}
        referenceElement={this.referenceElement}
        label={this.popoverTitle}
      >
        <div class={`${CSS.content}${this.disableAction ? ` ${CSS.actionDisabled}` : ''}`}>
          {!this.disableAction ? (
            <calcite-action
              key="popover-action"
              class={CSS.action}
              onClick={this.popoverAction}
              icon={document.dir === 'rtl' ? 'chevron-right' : 'chevron-left'}
              compact={true}
              text-enabled={true}
              text={(this.messageOverrides?.popoverAction ? this.messageOverrides.popoverAction : this.messages.back) as string}
            />
          ) : null}
          <section>
            <span id="subtitle">{this.subtitle}</span>
            <p>{this.content}</p>
            {this.imgSrc ? <img key={`iac-popover-img-${this.refId}`} class={CSS.img} src={this.imgSrc} alt={this.imgAlt ? this.imgAlt : ''} /> : null}
          </section>
          {this.pagination ? (
            <div key={`iac-popover-footer-${this.index}`} class={CSS.footer}>
              <span>
                {this.index + 1} {this.messages?.of} {this.parent?.instantAppsPopovers?.size}
              </span>
              {this.renderPagination()}
            </div>
          ) : null}
        </div>
      </calcite-popover>
    );
  }

  renderPagination() {
    const { index, messages, parent } = this;
    const size = this.parent?.instantAppsPopovers?.size;
    const isFirst = index === 0;
    const isLast = index === size - 1;
    return (
      <div key="pagination-button-container" class={CSS.buttonContainer}>
        {!isFirst ? (
          <calcite-button key="prev" onClick={() => parent?.previous()} appearance="outline" kind="neutral">
            {messages?.back}
          </calcite-button>
        ) : null}
        <calcite-button
          key="next"
          onClick={() => {
            if (isLast) {
              parent?.done();
            } else {
              parent?.next();
            }
          }}
        >
          {isLast ? messages?.done : messages?.next}
        </calcite-button>
      </div>
    );
  }

  async getMessages() {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0] as typeof Popover_T9n;
    return Promise.resolve();
  }
}
