/*
 *   Copyright (c) 2023 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Host, h, Prop, Element, Method } from '@stencil/core';

@Component({
  tag: 'instant-apps-popovers',
  styleUrl: 'instant-apps-popovers.scss',
  shadow: false,
})
export class InstantAppsPopovers {
  @Prop({
    mutable: true,
    reflect: true,
  })
  inTour: boolean;

  @Prop({
    mutable: true,
    reflect: true,
  })
  currentId: string;

  @Element()
  host: HTMLElement;

  @Prop()
  instantAppsPopovers: Map<string, HTMLInstantAppsPopoverElement> = new Map();

  @Prop() beforeOpen: () => Promise<void> = () => Promise.resolve();

  componentWillLoad() {
    const popovers = Array.from(this.host.querySelector("[slot='popovers']")?.children as HTMLCollection) as HTMLInstantAppsPopoverElement[];
    popovers.forEach((popover, popoverIndex) => {
      const refId = popover.getAttribute('ref-id') as string;
      popover.parent = this;
      popover.index = popoverIndex;
      this.instantAppsPopovers.set(refId, popover);
    });
    this.host.addEventListener('calcitePopoverOpen', e => {
      const node = e.target as HTMLCalcitePopoverElement;
      const refId = node.getAttribute('ref-id') as string;
      this.currentId = refId;
    });
  }

  render() {
    return (
      <Host>
        <slot name="popovers"></slot>
      </Host>
    );
  }

  next(): void {
    const refIds = Array.from(this.instantAppsPopovers.keys());
    const index = refIds.indexOf(this.currentId) + 1;
    const nextId = refIds[index];
    this.close(this.currentId);
    this.open(nextId);
  }

  previous(): void {
    const refIds = Array.from(this.instantAppsPopovers.keys());
    const index = refIds.indexOf(this.currentId) - 1;
    const previousId = refIds[index];
    this.close(this.currentId);
    this.open(previousId);
  }

  done(): void {
    this.endTour();
  }

  handlePopoverProps(config: { pagination: boolean; disableAction: boolean }): void {
    const popovers = Array.from(this.host.querySelector("[slot='popovers']")?.children as HTMLCollection) as HTMLInstantAppsPopoverElement[];
    popovers.forEach(popover => {
      popover.disableAction = config.disableAction;
      popover.pagination = config.pagination;
    });
  }

  @Method()
  async open(key: string): Promise<void> {
    return this.beforeOpen().then(() => {
      const popover = this.instantAppsPopovers.get(key)?.firstElementChild as HTMLCalcitePopoverElement;
      popover.open = true;
    });
  }

  @Method()
  async close(key: string): Promise<void> {
    const popover = this.instantAppsPopovers.get(key)?.firstElementChild as HTMLCalcitePopoverElement;
    popover.open = false;
  }

  @Method()
  async beginTour(): Promise<void> {
    this.inTour = true;
    this.handlePopoverProps({ pagination: true, disableAction: true });
    const refIds = Array.from(this.instantAppsPopovers.keys());
    this.open(refIds[0]);
  }

  @Method()
  async endTour(): Promise<void> {
    this.close(this.currentId);
    this.inTour = false;
    this.handlePopoverProps({ pagination: false, disableAction: false });
  }
}
