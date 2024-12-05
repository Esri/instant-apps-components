import { Component, Host, h, Prop, State } from '@stencil/core';
import { Element, HostElement, Watch } from '@stencil/core/internal';
import AppGuideViewModel from './AppGuide/AppGuideViewModel';
import { AppGuidePage, AppGuideRenderType, CalciteCarouselArrowType } from './AppGuide/interfaces/interfaces';
import AppGuide_T9n from '../../assets/t9n/instant-apps-app-guide/resources.json';
import { getMessages } from '../../utils/locale';

const CSS = {
  contentList: 'instant-apps-app-guide__content-list',
  contentListItem: 'instant-apps-app-guide__content-list--item',
  contentWrapper: 'instant-apps-app-guide__content-wrapper'
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
  header: boolean = true;

  /**
   * A collection of AppGuidePage objects that represent the content of the component
   */
  @Prop()
  data: AppGuidePage[];

  @State() messages: typeof AppGuide_T9n;
  @State() headerText: string;

  @Watch('data')
  watchPropHandler(newValue: AppGuidePage[]) {
    this._setContent(newValue);
  }

  @Watch('headerText')
  watchStateHandler(newValue: string) {
    this._viewModel.headerText = newValue;
  }

  /**
   * Private Variables
   */
  private _viewModel: AppGuideViewModel = new AppGuideViewModel();
  private _carouselRef!: HTMLCalciteCarouselElement;

  componentWillLoad() {
    this._setContent(this?.data);
  }

  componentDidLoad() {
    getMessages(this);
  }

  render(): HostElement {
    const pages = this._renderAppGuidePages(this._viewModel.pages);
    const header = this._renderAppGuideHeader();
    return (
      <Host>
        <calcite-panel scale="s">
          { header }
          <calcite-carousel
            label="App Guide"
            onCalciteCarouselChange={() => this._updateHeaderText()}
            ref={ el => this._carouselRef = el! }
            arrow-type={this._getArrowType()}>
            { pages }
          </calcite-carousel>
        </calcite-panel>
      </Host>
    )
  }

  private _setContent(content: AppGuidePage[]) : void {
    this._viewModel.setPages(content);
    this.headerText = this._viewModel.headerText;
  }

  private _updateHeaderText() : void {
    const { _viewModel, _carouselRef, messages } = this;
    if (!(_viewModel && _carouselRef)) return;

    const nodeArray = Array.from(_carouselRef.childNodes);
    const selectedNodeIndex = nodeArray.indexOf(_carouselRef.selectedItem);

    // DOM nodes get updated after the viewModel is updated, so the selectedNodeIndex
    // may be out of bounds of the pages collection in the viewModel when pages are removed.
    // When this happens, we default to the title of the first page.
    const pages = _viewModel?.pages;
    const selectedPage = pages?.[selectedNodeIndex] ?? pages[0];
    this.headerText = selectedPage?.title || messages?.headerText;
  }

  private _getArrowType() : CalciteCarouselArrowType {
    return this._viewModel.pages.length > 2 ? 'inline' : 'none';
  }

  private _renderAppGuideHeader() : HTMLElement | null {
    const { messages, header, headerText } = this;
    const displayHeader = !!header && messages?.headerText;
    const _headerText = headerText || messages?.headerText;

    return displayHeader ?
      (<span slot="header-content">{_headerText} <calcite-icon icon="lightbulb" scale="s"></calcite-icon></span>) :
      null;
  }

  private _renderAppGuidePages(pages: AppGuidePage[]) : HTMLCalciteCarouselItemElement[] {
    return pages.map((pageData, index) => {
      const { content, type, title } = pageData;
      return (
        <calcite-carousel-item label={title} key={`page_${index}`}>
          <div class={CSS.contentWrapper}>
            { this._renderContentItems(content, type) }
          </div>
        </calcite-carousel-item>
      );
    });
  }

  private _renderContentItems(content: string[], type: AppGuideRenderType) : HTMLOListElement | HTMLParagraphElement[] {
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
