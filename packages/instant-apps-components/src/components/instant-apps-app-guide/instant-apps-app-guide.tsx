import { Component, Host, h, Prop, State } from '@stencil/core';
import { Element, HostElement, Watch } from '@stencil/core/internal';
import AppGuideViewModel from './AppGuide/AppGuideViewModel';
import { AppGuidePage, AppGuideRenderType } from './AppGuide/interfaces/interfaces';
import AppGuide_T9n from '../../assets/t9n/instant-apps-app-guide/resources.json';
import { getMessages } from '../../utils/locale';
import { ArrowType } from '@esri/calcite-components';

const CSS = {
  contentList: 'instant-apps-app-guide__content-list',
  contentListItem: 'instant-apps-app-guide__content-list--item',
}

/**
 * The `instant-apps-app-guide` is a component containing a page(s) that describes features of a tool or Instant App.
 *
 * Data for the pages is passed as an array of `AppGuidePage` objects that each have the following properties:
 * - `title`: The title of the page; this will be displayed in the header if the `header` prop is set to true or the `header` attribute is present
 * - `content`: An array of strings that represent the content items on the page
 * - `type`: How the content items should be rendered. The default is 'paragraphs', but 'list' is also available for rendering as a numbered list.
 */

@Component({
  tag: 'instant-apps-app-guide',
  styleUrl: 'instant-apps-app-guide.scss',
  shadow: true,
})
export class InstantAppsAppGuide {
  @Element()
  el: HTMLInstantAppsAppGuideElement;

  /**
   * Show a header with the title of the current page
   */
  @Prop()
  header: boolean;

  /**
   * A collection of AppGuidePage objects that represent the content of the component
   */
  @Prop()
  data: AppGuidePage[];

  @Watch('data')
  watchPropHandler(newValue: AppGuidePage[]) {
    this.viewModel.pages = newValue;
    this._updateHeaderText();
  }

  @State() messages: typeof AppGuide_T9n;
  @State() headerText: string;

  private viewModel: AppGuideViewModel = new AppGuideViewModel();
  private carouselRef: HTMLCalciteCarouselElement;

  connectedCallback() {
    this.viewModel.pages = this?.data || [];
    this.headerText = this?.data[0]?.title;
  }

  componentDidLoad() {
    getMessages(this);
  }

  render(): HostElement {
    return (
      <Host>
        <calcite-panel scale="s">
          { this._renderAppGuideHeader() }
          <calcite-carousel
            onCalciteCarouselChange={() => this._updateHeaderText()}
            ref={ el => this.carouselRef = el }
            arrow-type={this._getArrowType()}>
            { this._renderAppGuidePages(this.viewModel.pages) }
          </calcite-carousel>
        </calcite-panel>
      </Host>
    )
  }

  private _updateHeaderText() {
    const nodeArray = Array.from(this.carouselRef.childNodes);
    const selectedNodeIndex = nodeArray.indexOf(this.carouselRef.selectedItem);

    // DOM nodes get updated after the viewModel is updated, so the selectedNodeIndex
    // may be out of bounds of the pages collection in the viewModel when pages are removed.
    // When this happens, we default to the title of the first page.
    const pages = this.viewModel?.pages;
    const selectedPage = pages?.[selectedNodeIndex] ?? pages[0];
    this.headerText = selectedPage?.title;
  }

  private _getArrowType(): ArrowType {
    return this.viewModel.pages.length > 2 ? 'inline' : 'none';
  }

  private _renderAppGuideHeader() {
    return !!this.header && this.messages?.headerText ?
      (<span slot="header-content">{this.headerText} <calcite-icon icon="lightbulb" scale="s"></calcite-icon></span>) :
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
