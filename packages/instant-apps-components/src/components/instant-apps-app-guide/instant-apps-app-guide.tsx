import { Component, Host, h, Prop, State } from '@stencil/core';
import { Element, HostElement } from '@stencil/core/internal';
import AppGuideViewModel from './AppGuide/AppGuideViewModel';
import { AppGuidePage, AppGuideRenderType } from './AppGuide/interfaces/interfaces';
import AppGuide_T9n from '../../assets/t9n/instant-apps-app-guide/resources.json';
import { getMessages } from '../../utils/locale';

@Component({
  tag: 'instant-apps-app-guide',
  styleUrl: 'instant-apps-app-guide.scss',
  shadow: true,
})
export class InstantAppsAppGuide {
  @Element()
  el: HTMLInstantAppsAppGuideElement;

  @Prop()
  withHeader: boolean;

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

  private _getArrowType() {
    return this.viewModel.pages.length > 2 ? 'inline' : 'none';
  }

  private _initialize() {
    this.viewModel.pages = this?.data || [];
  }

  private _renderAppGuideHeader() {
    return !!this.withHeader && this.messages?.headerText ?
      (<span slot="header-content">{this.messages?.headerText} <calcite-icon icon="lightbulb" scale="s"></calcite-icon></span>) :
      null;
  }

  private _renderAppGuidePages(pages: AppGuidePage[]) {
    return pages.map(pageData => {
      const { title, content, renderContentAs } = pageData;
      return (
        <calcite-carousel-item>
          <div>
            <b class="content-heading">{title}</b>
            { this._renderContentItems(content, renderContentAs) }
          </div>
        </calcite-carousel-item>
      );
    });
  }

  private _renderContentItems(content: string[], renderAs: AppGuideRenderType) {
    switch(renderAs) {
      case 'list':
        return (
          <ol>
            {content.map(contentItem => (<li>{contentItem}</li>))}
          </ol>
        );
      case 'paragraphs':
      default:
        return content.map(contentItem => (<p>{contentItem}</p>));
    }
  }
}
