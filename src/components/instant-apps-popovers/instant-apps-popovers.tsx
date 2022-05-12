import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'instant-apps-popovers',
  styleUrl: 'instant-apps-popovers.scss',
  shadow: true,
})
export class InstantAppsPopovers {
  @State()
  currentId: string;

  @Element()
  host: HTMLElement;

  @Prop()
  instantAppsPopovers: Map<string, HTMLInstantAppsPopoverElement> = new Map();

  @State()
  previous: HTMLCalcitePopoverElement;

  componentWillLoad() {
    const popovers = Array.from(this.host.querySelector("[slot='popovers']")?.children as HTMLCollection) as HTMLInstantAppsPopoverElement[];
    popovers.forEach((popover, popoverIndex) => {
      const referenceElement = popover.getAttribute('reference-element') as string;
      if (popoverIndex === 0) this.currentId = referenceElement;
      popover.parent = this;
      popover.index = popoverIndex;
      this.instantAppsPopovers.set(referenceElement, popover);
    });
    this.host.addEventListener('calcitePopoverOpen', (e: CustomEvent) => {
      const node = e.target as HTMLCalcitePopoverElement;
      this.handlePrevious(node);
    });
  }

  render() {
    return (
      <Host>
        <slot name="popovers"></slot>
      </Host>
    );
  }

  handlePrevious(node: HTMLCalcitePopoverElement): void {
    if (this.previous) {
      const referenceElement = 'reference-element';
      const previousReference = this.previous.getAttribute(referenceElement);
      const currentReference = node.getAttribute(referenceElement);
      if (previousReference === currentReference) return;
      this.previous.toggle(false);
    }
    this.previous = node;
  }

  page(type: 'back' | 'next'): void {
    const key = this.getKey(type);
    if (!key) {
      const popover = this.instantAppsPopovers.get(this.currentId)?.firstElementChild as HTMLCalcitePopoverElement;
      this.handlePrevious(popover);
      popover.toggle(false);
      return;
    }
    const popover = this.instantAppsPopovers.get(key)?.firstElementChild as HTMLCalcitePopoverElement;
    this.handlePrevious(popover);
    popover.toggle(true);
    this.currentId = key;
  }

  getKey(type: 'back' | 'next'): string | undefined {
    const [...keys] = this.instantAppsPopovers.keys();
    const currentIndex = this.getIndex();
    if (currentIndex === null) return;
    return type === 'next' ? keys[currentIndex + 1] : keys[currentIndex - 1];
  }

  getIndex(): number | null {
    if (!this) return null;
    const { currentId } = this;
    const [...keys] = this.instantAppsPopovers.keys();
    return keys.indexOf(currentId);
  }
}
