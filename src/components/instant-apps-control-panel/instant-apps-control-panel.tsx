import { Component, Element, Host, Prop, h } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';
import { loadModules } from 'esri-loader';

const BORDER = 'border-bottom: 1px solid var(--calcite-ui-border-3)';

@Component({
  tag: 'instant-apps-control-panel',
  styleUrl: 'instant-apps-control-panel.scss',
  shadow: true,
})
export class InstantAppsControlPanel {
  Expand: any;

  @Element()
  el: HostElement;

  @Prop()
  components: {
    content: any;
    isExpand?: boolean;
    expandIconClass?: string;
  }[] = [];

  @Prop()
  view: __esri.MapView | __esri.SceneView;

  connectedCallback() {}

  async componentWillLoad() {
    const [Expand] = await loadModules(['esri/widgets/Expand']);
    this.Expand = Expand;
    this._handleComponents();
  }

  render() {
    return (
      <Host>
        <slot name="components" />
      </Host>
    );
  }

  private _handleComponents() {
    const selector = '[slot="components"]';
    const componentsNode = this.el.querySelector(selector);
    if (componentsNode && componentsNode?.children?.length > 0) {
      while (componentsNode.firstChild) {
        componentsNode.removeChild(componentsNode.firstChild);
      }
    }
    if (componentsNode) {
      this.components.forEach((component, index) => {
        let content = component.content;

        if (component.isExpand) {
          content = new this.Expand({
            content: component.content,
            mode: 'floating',
            view: this.view,
            group: 'instant-apps-control-panel',
            expanded: false,
          });
          if (component.expandIconClass) {
            content.expandIconClass = component.expandIconClass;
          }
        }

        if (!content.container) {
          content.container = document.createElement('div');
        }

        componentsNode?.appendChild(content.container);
        if (index !== this.components.length - 1) content.container.style = BORDER;
      });
    }
  }
}
