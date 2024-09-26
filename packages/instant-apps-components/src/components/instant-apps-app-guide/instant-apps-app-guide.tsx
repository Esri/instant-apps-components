import { Component, Host, h, Prop, State } from '@stencil/core';
import { Element, HostElement, Watch } from '@stencil/core/internal';
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

  @Watch('data')
  watchPropHandler(newValue: AppGuidePage[]) {
    this.viewModel.pages = newValue;
    this.el.dispatchEvent(new CustomEvent('calciteCarouselChange'));
  }

  @State() messages: typeof AppGuide_T9n;
  @State() headerTitle: string;

  private viewModel: AppGuideViewModel = new AppGuideViewModel();
  private carouselRef: HTMLCalciteCarouselElement;

  connectedCallback() {
    this.viewModel.pages = this?.data || [];
    this.headerTitle = this?.data[0]?.title;
  }

  componentDidLoad() {
    getMessages(this);

    // Listen for the calciteCarouselChange event to update the header title to match the selected page
    this.el.addEventListener('calciteCarouselChange', (_event: CustomEvent) => {
      this._updateHeaderTitle();
    });
  }

  render(): HostElement {
    return (
      <Host>
        <calcite-panel scale="s">
          { this._renderAppGuideHeader() }
          <calcite-carousel ref={ el => this.carouselRef = el } arrow-type={this._getArrowType()}>
            { this._renderAppGuidePages(this.viewModel.pages) }
          </calcite-carousel>
        </calcite-panel>
      </Host>
    )
  }

  private _updateHeaderTitle() {
    const nodeArray = Array.from(this.carouselRef.childNodes);
    const selectedNodeIndex = nodeArray.indexOf(this.carouselRef.selectedItem);

    // DOM nodes get updated after the viewModel is updated, so the selectedNodeIndex
    // may be out of bounds of the pages collection in the viewModel when pages are removed.
    // When this happens, we default to the title of the first page.
    const targetIndex = this.viewModel.pages[selectedNodeIndex] ? selectedNodeIndex : 0;
    this.headerTitle = this?.viewModel?.pages[targetIndex]?.title;
  }

  private _getArrowType(): ArrowType {
    return this.viewModel.pages.length > 2 ? 'inline' : 'none';
  }

  private _renderAppGuideHeader() {
    return !!this.header && this.messages?.headerText ?
      (<span slot="header-content">{this.headerTitle} <calcite-icon icon="lightbulb" scale="s"></calcite-icon></span>) :
      null;
  }

  private _renderAppGuidePages(pages: AppGuidePage[]) {
    return pages.map((pageData, index) => {
      const { content, type } = pageData;
      return (
        <calcite-carousel-item key={`page_${index}`}>
          <div>
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
