import { Component, h, Prop } from '@stencil/core';
import { InstantAppsPopovers } from '../instant-apps-popovers/instant-apps-popovers';

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

  render() {
    const { index } = this;
    const size = this.parent?.instantAppsPopovers?.size;
    const isFirst = index === 0;
    const isLast = index === size - 1;
    return (
      <calcite-popover reference-element={this.referenceElement} heading={this.popoverTitle} auto-close="true" dismissible="true" placement="leading">
        <div class={CSS.content}>
          <slot name="action"></slot>
          <section>{this.content}</section>
          <div class={CSS.buttonContainer}>
            {!isFirst ? (
              <calcite-button key="prev" onClick={() => this.parent?.page('back')} appearance="outline" color="neutral">
                Back
              </calcite-button>
            ) : null}
            <calcite-button key="next" onClick={() => this.parent?.page('next')}>
              {isLast ? 'Done' : 'Next'}
            </calcite-button>
          </div>
        </div>
      </calcite-popover>
    );
  }
}
