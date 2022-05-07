import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'instant-apps-popovers',
  styleUrl: 'instant-apps-popovers.scss',
  shadow: true,
})
export class InstantAppsPopovers {
  @Element()
  host: HTMLElement;

  @Prop()
  instantAppsPopovers: { [id: string]: HTMLInstantAppsPopoverElement } = {};

  @State()
  previous: HTMLCalcitePopoverElement;

  componentDidLoad() {
    const popovers = Array.from(this.host.querySelector("[slot='popovers']")?.children as HTMLCollection) as HTMLInstantAppsPopoverElement[];

    popovers.forEach(popover => {
      const referenceElement = popover.getAttribute('reference-element') as string;
      this.instantAppsPopovers[referenceElement] = popover;
    });

    this.host.addEventListener('calcitePopoverOpen', this.handlePrevious.bind(this));
  }

  render() {
    return (
      <Host>
        <slot name="popovers"></slot>
      </Host>
    );
  }

  handlePrevious(e: CustomEvent) {
    const node = e.target as HTMLCalcitePopoverElement;
    if (this.previous) {
      const previousReference = this.previous.getAttribute('reference-element');
      const currentReference = node.getAttribute('reference-element');
      if (previousReference === currentReference) return;
      this.previous.toggle(false);
    }
    this.previous = node;
  }
}
