import { Component, h, Element, Prop, State } from '@stencil/core';
import { InstantAppsPopovers } from '../instant-apps-popovers/instant-apps-popovers';

import Popover_T9n from '../../assets/t9n/instant-apps-popover/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
  action: 'instant-apps-popover__action',
  actionDisabled: 'instant-apps-popover--action-disabled',
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
  placement: string = 'trailing-start';

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
  popoverAction: Function;

  @Prop()
  intlPopoverAction: string;

  @Prop()
  intlOf: string = 'of';

  // Internal State
  @State()
  messages: typeof Popover_T9n;

  componentDidLoad() {
    this.getMessages();
  }

  componentDidUpdate() {
    this.popoverEl.referenceElement = this.referenceElement;
  }

  render() {
    return (
      <calcite-popover
        ref={(el: HTMLCalcitePopoverElement) => (this.popoverEl = el)}
        heading={this.popoverTitle}
        auto-close="true"
        placement={this.placement}
        intl-close={this.messages?.close}
        trigger-disabled="true"
        ref-id={this.refId}
        dismissible="true"
      >
        <div class={`${CSS.content}${this.disableAction ? ` ${CSS.actionDisabled}` : ''}`}>
          {!this.disableAction ? (
            <calcite-action
              key="popover-action"
              class={CSS.action}
              onclick={this.popoverAction}
              icon={document.dir === 'rtl' ? 'chevron-right' : 'chevron-left'}
              compact="true"
              text-enabled="true"
              text={this.intlPopoverAction ? this.intlPopoverAction : this.messages?.back}
            />
          ) : null}
          <section>
            <span id="subtitle">{this.subtitle}</span>
            <p>{this.content}</p>
          </section>
          {this.pagination ? (
            <div key={`iac-popover-footer-${this.index}`} class={CSS.footer}>
              <span>
                {this.index + 1} {this.intlOf} {this.parent?.instantAppsPopovers?.size}
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
          <calcite-button key="prev" onClick={() => parent?.previous()} appearance="outline" color="neutral">
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
  }
}
