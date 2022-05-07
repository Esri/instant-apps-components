import { Component, h, Prop } from '@stencil/core';

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
  referenceElement: string;

  render() {
    return (
      <calcite-popover reference-element={this.referenceElement} heading={this.popoverTitle} auto-close="true" dismissible="true" placement="leading">
        <div>
          <slot name="action"></slot>
          <section>{this.content}</section>
          <calcite-button appearance="outline" color="neutral">
            Back
          </calcite-button>
          <calcite-button>Next</calcite-button>
        </div>
      </calcite-popover>
    );
  }
}
