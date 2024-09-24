import { Component, Host, h, Prop, State } from '@stencil/core';
import { Element, HostElement } from '@stencil/core/internal';
import AppGuideViewModel from './AppGuide/AppGuideViewModel';
import { AppGuidePage, AppGuideRenderType } from './AppGuide/interfaces/interfaces';
import AppGuide_T9n from '../../assets/t9n/instant-apps-app-guide/resources.json';
import { getMessages } from '../../utils/locale';
import { ArrowType } from '@esri/calcite-components';

const CSS = {
  contentList: 'esri-content-list',
  contentListItem: 'esri-content-list--item',
}

@Component({
  tag: 'instant-apps-app-guide',
  styleUrl: 'instant-apps-app-guide.scss',
  shadow: true,
})
export class InstantAppsAppGuide {
  @Element()
  el: HTMLInstantAppsAppGuideElement;

  @Prop()
  header: boolean;

  @Prop()
  data: AppGuidePage[];

  @State() messages: typeof AppGuide_T9n;

  viewModel: AppGuideViewModel = new AppGuideViewModel();

  componentWillRender() {
    this._initialize();
  }

  componentDidRender() {
    getMessages(this);
  }

  render(): HostElement {
    return (
      <Host>
        <calcite-panel scale="s">
          { this._renderAppGuideHeader() }
          <calcite-carousel arrow-type={this._getArrowType()}>
            {this._renderAppGuidePages(this.viewModel.pages)}
          </calcite-carousel>
        </calcite-panel>
      </Host>
    )
  }

  private _getArrowType(): ArrowType {
    return this.viewModel.pages.length > 2 ? 'inline' : 'none';
  }

  private _initialize() {
    this.viewModel.pages = this?.data || [];
  }

  private _renderAppGuideHeader() {
    return !!this.header && this.messages?.headerText ?
      (<span slot="header-content">{this.messages?.headerText} <calcite-icon icon="lightbulb" scale="s"></calcite-icon></span>) :
      null;
  }

  private _renderAppGuidePages(pages: AppGuidePage[]) {
    return pages.map(pageData => {
      const { title, content, type } = pageData;
      return (
        <calcite-carousel-item>
          <div>
            <span class="content-heading">{title}</span>
            { this._renderContentItems(content, type) }
          </div>
        </calcite-carousel-item>
      );
    });
  }

  private _renderContentItems(content: string[], type: AppGuideRenderType) {
    switch(type) {
      case 'list':
        return (
          <ol class={CSS.contentList}>
            {content.map((contentItem, index) => (<li key={`content-list-item-${index}`} class={CSS.contentListItem}>{contentItem}</li>))}
          </ol>
        );
      case 'paragraphs':
      default:
        return content.map((contentItem, index) => (<p key={`content-paragraph-${index}`}>{contentItem}</p>));
    }
  }
}
