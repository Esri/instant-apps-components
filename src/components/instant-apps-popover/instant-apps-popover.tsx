import { Component, h, Element, Prop, State } from '@stencil/core';
import { InstantAppsPopovers } from '../instant-apps-popovers/instant-apps-popovers';

import Popover_T9n from '../../assets/t9n/instant-apps-popover/resources.json';

import { getLocaleComponentStrings } from '../../utils/locale';

const CSS = {
  content: 'instant-apps-popover__content',
  buttonContainer: 'instant-apps-popover__button-container',
};

@Component({
  tag: 'instant-apps-popover',
  styleUrl: 'instant-apps-popover.scss',
  shadow: false,
})
export class InstantAppsPopover {
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
  referenceElement: string;

  @Prop()
  parent: InstantAppsPopovers;

  @Prop({
    reflect: true,
  })
  pagination: boolean = false;

  @Prop()
  beforeOpen: () => Promise<void>;

  // Internal State
  @State()
  messages: typeof Popover_T9n;

  componentDidLoad() {
    this.getMessages();
  }

  componentDidUpdate() {
    this.el.referenceElement = this.referenceElement;
  }

  render() {
    return (
      <calcite-popover heading={this.popoverTitle} auto-close="true" dismissible="true" placement="leading" intl-close={this.messages?.close}>
        <div class={CSS.content}>
          <slot name="action"></slot>
          <section>{this.content}</section>
          {this.pagination ? this.renderPagination() : null}
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
          <calcite-button key="prev" onClick={() => parent?.page('back')} appearance="outline" color="neutral">
            {messages?.back}
          </calcite-button>
        ) : null}
        <calcite-button key="next" onClick={() => parent?.page('next')}>
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
