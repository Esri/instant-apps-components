import { Component, Element, Host, Prop, h } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';
import { loadModules } from 'esri-loader';
import { ControlPanelComponent } from '../../interfaces/interfaces';

const MODE = 'floating';
const GROUP = 'instant-apps-control-panel';
const BORDER = 'border-bottom: 1px solid var(--calcite-ui-border-3)';
const SLOT_NAME = 'components';
const SLOT_SELECTOR = `[slot="${SLOT_NAME}"]`;

@Component({
  tag: 'instant-apps-control-panel',
  styleUrl: 'instant-apps-control-panel.scss',
  shadow: true,
})
export class InstantAppsControlPanel {
  Expand: typeof __esri.Expand;

  @Element()
  el: HostElement;

  @Prop()
  components: ControlPanelComponent[] = [];

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  async componentWillLoad() {
    const [Expand] = await loadModules(['esri/widgets/Expand']);
    this.Expand = Expand;
    this._handleComponents();
  }

  componentWillUpdate() {
    this._handleComponents();
  }

  render() {
    return (
      <Host>
        <slot name={SLOT_NAME} />
      </Host>
    );
  }

  private _handleComponents(): void {
    const componentsNode = this._getComponentsNode();
    if (componentsNode) {
      this._resetUI(componentsNode);
      this._attachComponents(componentsNode);
    }
  }

  private _attachComponents(componentsNode: HTMLDivElement): void {
    this.components.forEach(this._attachmentComponent(componentsNode));
  }

  private _attachmentComponent(componentsNode: HTMLDivElement): (component: ControlPanelComponent, index: number) => void {
    return (component: ControlPanelComponent, index: number) => {
      let content = component.content;

      // Check if component isExpand widget, if so, create expande widget
      if (component.isExpand) {
        content = this._getExpand(component);
        if (component.expandIconClass) content.expandIconClass = component.expandIconClass;
        if (component.collapseTooltip) content.collapseTooltip = component.collapseTooltip;
        if (component.expandTooltip) content.expandTooltip = component.expandTooltip;
      }

      // Check if dom node exists, if not create dom node
      if (!content.container) content.container = document.createElement('div');

      // Append dom node to slot element
      componentsNode?.appendChild(content.container);

      // Create border for all components but last
      const isNotLast = index !== this.components.length - 1;
      if (isNotLast) content.container.style = BORDER;
    };
  }

  private _getExpand(component: ControlPanelComponent): __esri.Expand {
    const { view } = this;
    const { content } = component;
    const expanded = false;
    return new this.Expand({ content, view, expanded, mode: MODE, group: GROUP });
  }

  private _getComponentsNode(): HTMLDivElement {
    const selector = SLOT_SELECTOR;
    return this.el.querySelector(selector) as HTMLDivElement;
  }

  private _resetUI(componentsNode: HTMLDivElement): void {
    const hasChildren = componentsNode.children.length > 0;
    if (hasChildren) {
      const { firstChild } = componentsNode;
      while (firstChild) {
        componentsNode.removeChild(firstChild);
      }
    }
  }
}
