import { Component, Element, Event, EventEmitter, getMode, h, Host, Prop, State, VNode } from '@stencil/core';
import { CalciteCheckboxCustomEvent, CalciteInputCustomEvent } from '@esri/calcite-components';

import Export_T9n from '../../assets/t9n/instant-apps-export/resources.json';
import { ExportOutput, PopoverPlacement } from '../../interfaces/interfaces';
import { getLocaleComponentStrings } from '../../utils/locale';
import { printStyling } from './resources';
import { loadModules } from '../../utils/loadModules';

const CSS = {
  baseDark: 'instant-apps-export calcite-mode-dark',
  baseLight: 'instant-apps-export calcite-mode-light',
  inlineContainer: 'instant-apps-export__inline-container',
  popoverContainer: 'instant-apps-export__popover-container',
  print: {
    base: 'instant-apps-export-print',
    extraContainer: 'instant-apps-export-print__extra-container',
    legendContainer: 'instant-apps-export-print__legend-container',
    popupContainer: 'instant-apps-export-print__popup-container',
    popupContent: 'instant-apps-export-print__popup-content',
    popupTitle: 'instant-apps-export-print__popup-title',
    sectionFullView: 'instant-apps-export-print__view-section--full-view',
    sectionGrid: 'instant-apps-export-print__view-section--grid',
    view: 'instant-apps-export-print__view',
    viewContainer: 'instant-apps-export-print__view-container',
    viewLegend: 'instant-apps-export-print__view-legend',
    viewPopup: 'instant-apps-export-print__view-popup',
    viewPopupLegend: 'instant-apps-export-print__view-popup-legend',
    viewSection: 'instant-apps-export-print__view-section',
  },
};

@Component({
  tag: 'instant-apps-export',
  styleUrl: 'instant-apps-export.scss',
  shadow: true,
})
export class InstantAppsExport {
  @Element() hostElement: HTMLElement;

  /**
   * Extra content that will be added below the view.
   */
  @Prop() extraContent?: HTMLElement;

  /**
   * Export header name, updated in input.
   */
  @Prop({ mutable: true }) headerTitle?: string = '';

  /**
   * When `true`, include popup in export.
   */
  @Prop({ mutable: true }) includePopup?: boolean = false;

  /**
   * When `true`, include legend in export.
   */
  @Prop({ mutable: true }) includeLegend?: boolean = true;

  /**
   * When `true`, include map in export.
   */
  @Prop({ mutable: true }) includeMap?: boolean = true;

  /**
   * Renders tool as a popover with a trigger button, or inline to place in a custom container.
   */
  @Prop({ reflect: true }) mode: 'popover' | 'inline' = 'popover';

  /**
   * Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's position CSS property is `"fixed"`.
   */
  @Prop() popoverPositioning?: 'absolute' | 'fixed' = 'absolute';

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   */
  @Prop() popoverPlacement?: PopoverPlacement = 'auto';

  /**
   * Adjusts the scale of the action button.
   */
  @Prop() scale?: 's' | 'm' | 'l' = 'm';

  /**
   * Show header title input.
   */
  @Prop() showHeaderTitle?: boolean = true;

  /**
   * Show popup checkbox.
   */
  @Prop() showIncludePopup?: boolean = true;

  /**
   * Show include legend checkbox.
   */
  @Prop() showIncludeLegend?: boolean = true;

  /**
   * Show include map checkbox.
   */
  @Prop() showIncludeMap?: boolean = false;

  /**
   * Output to use to set up export.
   */
  @Prop({ mutable: true }) output?: ExportOutput;

  /**
   * MapView or SceneView to reference when filtering.
   */
  @Prop() view: __esri.MapView | __esri.SceneView | undefined;

  @State() baseClass = CSS.baseLight;
  @State() exportIsLoading: boolean | undefined = undefined;
  @State() messages: typeof Export_T9n;

  /**
   * Emits when the instant-apps-export's output prop is updated after the "Export" button is clicked.
   */
  @Event() exportOutputUpdated: EventEmitter<void>;

  exportHandleImgLoaded: () => void;
  extraContainerEl: HTMLDivElement;
  legendContainerEl: HTMLDivElement;
  popoverEl: HTMLCalcitePopoverElement;
  popupContainerEl: HTMLDivElement;
  popupContentEl: HTMLDivElement;
  popupTitleEl: HTMLDivElement;
  printContainerEl: HTMLDivElement;
  printEl: HTMLDivElement;
  printStyleEl: HTMLStyleElement | undefined;
  viewEl: HTMLImageElement;
  viewContainerEl: HTMLDivElement;
  viewSectionEl: HTMLDivElement;

  componentWillLoad(): void {
    this.baseClass = getMode(this.hostElement) === 'dark' ? CSS.baseDark : CSS.baseLight;
    this.getMessages();
  }

  componentDidLoad(): void {
    this.printContainerEl.prepend(this.printEl);
  }

  async componentDidUpdate(): Promise<void> {
    if (this.includeMap && this.view != null && this.showIncludeLegend && this.includeLegend && !this.legendContainerEl?.innerHTML) {
      this.legendContainerEl.innerHTML = '';
      const [Legend] = await loadModules(['esri/widgets/Legend']);
      new Legend({
        container: this.legendContainerEl,
        view: this.view,
        style: {
          type: 'card',
          layout: 'side-by-side',
        },
      });
    }
  }

  render() {
    const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
    return (
      <Host>
        <div class={this.baseClass}>{mode}</div>
      </Host>
    );
  }

  renderPopover(): VNode[] {
    const panel = this.renderPanel();
    return [
      <calcite-popover
        referenceElement="export-popover-btn"
        label={this.messages?.exportPopover}
        overlayPositioning={this.popoverPositioning}
        placement={this.popoverPlacement}
        autoClose
        ref={(el: HTMLCalcitePopoverElement) => (this.popoverEl = el)}
      >
        {panel}
      </calcite-popover>,
      <calcite-action id="export-popover-btn" alignment="center" icon="print" scale={this.scale} text={this.messages?.toggleExport}></calcite-action>,
    ];
  }

  renderPanel(): VNode {
    const headerTitle = this.showHeaderTitle ? this.renderTitle() : null;
    const includeMap = this.showIncludeMap ? this.renderSwitch('includeMap') : null;
    const options = this.includeMap ? this.renderMapOptions() : null;
    const print = this.renderPrint();
    const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
    return (
      <div class={panelClass}>
        {headerTitle}
        {includeMap}
        {options}
        <calcite-button width="full" onClick={this.exportOnClick.bind(this)} loading={this.exportIsLoading}>
          {this.messages?.export}
        </calcite-button>
        {print}
      </div>
    );
  }

  renderTitle(): VNode {
    return (
      <calcite-label>
        {this.messages?.title}
        <calcite-input value={this.headerTitle} onCalciteInputInput={this.updateHeaderTitle.bind(this)}></calcite-input>
      </calcite-label>
    );
  }

  renderSwitch(value: string): VNode {
    const checked = this[value];
    return (
      <calcite-label layout="inline-space-between">
        {this.messages?.[value]}
        <calcite-switch checked={checked} value={value} onCalciteSwitchChange={this.optionOnChange.bind(this)}></calcite-switch>
      </calcite-label>
    );
  }

  renderMapOptions(): (VNode | null)[] {
    const includeLegend = this.showIncludeLegend ? this.renderSwitch('includeLegend') : null;
    const includePopup = this.showIncludePopup ? this.renderSwitch('includePopup') : null;
    return (
      <div>
        {includeLegend}
        {includePopup}
      </div>
    );
  }

  renderPrint(): VNode {
    const printMap = this.includeMap ? this.renderPrintMap() : null;
    return (
      <div ref={(el: HTMLDivElement) => (this.printContainerEl = el)}>
        <div class={CSS.print.base} ref={(el: HTMLDivElement) => (this.printEl = el)}>
          <div>{printMap}</div>
          <div class={CSS.print.extraContainer} ref={(el: HTMLDivElement) => (this.extraContainerEl = el)}></div>
        </div>
      </div>
    );
  }

  renderPrintMap(): VNode {
    const legend = this.showIncludeLegend ? this.renderLegend() : null;
    const popup = this.showIncludePopup ? this.renderPopup() : null;
    return (
      <div class={CSS.print.viewSection} ref={(el: HTMLDivElement) => (this.viewSectionEl = el)}>
        <div class={CSS.print.viewContainer} ref={(el: HTMLDivElement) => (this.viewContainerEl = el)}>
          <instant-apps-header titleText={this.headerTitle}></instant-apps-header>
          <img class={CSS.print.view} ref={(el: HTMLImageElement) => (this.viewEl = el)} src="" />
        </div>
        {popup}
        {legend}
      </div>
    );
  }

  renderLegend(): VNode {
    return <div class={CSS.print.legendContainer} ref={(el: HTMLDivElement) => (this.legendContainerEl = el)}></div>;
  }

  renderPopup(): VNode {
    return (
      <div class={CSS.print.popupContainer} ref={(el: HTMLDivElement) => (this.popupContainerEl = el)}>
        <div ref={(el: HTMLDivElement) => (this.popupTitleEl = el)} class={CSS.print.popupTitle}></div>
        <div ref={(el: HTMLDivElement) => (this.popupContentEl = el)} class={CSS.print.popupContent}></div>
      </div>
    );
  }

  optionOnChange(e: CalciteCheckboxCustomEvent<Event>): void {
    const { checked, value } = e.target;
    this[value] = checked;
  }

  updateHeaderTitle(e: CalciteInputCustomEvent<Event>): void {
    this.headerTitle = e.target.value;
  }

  exportOnClick(): void {
    this.handleViewExportOnClick();
    this.updateExportOutput();
  }

  async handleViewExportOnClick(): Promise<void> {
    if (this.view != null) {
      this.exportHandleImgLoaded = this.handleImgLoaded.bind(this);
      this.addPrintStyling();
      this.handleExtraContent();
      if (this.includeMap) {
        this.viewEl?.addEventListener('load', this.exportHandleImgLoaded);
        this.handleExtraContent();
        this.addPopupToPrint();
        await this.viewScreenshot();
      } else {
        this.exportHandleImgLoaded();
      }
    } else {
      if (this.popoverEl != null) {
        this.popoverEl.open = false;
      }
    }
  }

  addPrintStyling(): void {
    if (this.printStyleEl == null) {
      this.printStyleEl = document.createElement('style');
      this.printStyleEl.innerHTML = printStyling;
      document.body.prepend(this.printStyleEl);
    }
  }

  handleImgLoaded(): void {
    this.exportIsLoading = true;
    setTimeout(() => {
      this.exportIsLoading = undefined;
      this.setupViewPrintElements();
      this.resetPrintContent();
    }, 1500);
  }

  handleExtraContent(): void {
    if (this.extraContainerEl != null) {
      this.extraContainerEl.innerHTML = '';
      if (this.extraContent != null) {
        this.extraContainerEl.style.display = 'block';
        this.extraContainerEl.append(this.extraContent.cloneNode(true));
      } else {
        this.extraContainerEl.style.display = 'none';
      }
    }
  }

  resetPrintContent(): void {
    if (this.view != null) {
      this.printContainerEl?.prepend(this.printEl);
      this.printStyleEl?.remove();
      this.printStyleEl = undefined;
      if (this.popoverEl != null) {
        this.popoverEl.open = false;
      }
      this.viewEl?.removeEventListener('load', this.exportHandleImgLoaded);
    }
  }

  addPopupToPrint(): void {
    if (this.view != null) {
      if (this.popupContainerEl != null) {
        this.popupContainerEl.style.display = this.includePopup && this.view.popup.visible ? 'block' : 'none';
      }
      if (this.view.popup.visible && this.view.popup.selectedFeature != null) {
        if (this.popupContentEl != null) {
          const feature = this.view.container.querySelector('.esri-feature.esri-widget') as HTMLElement;
          if (feature != null) {
            const padding = 16;
            this.popupContentEl.innerHTML = feature.innerHTML ?? '';
            this.popupContainerEl.style.minWidth = `${feature.offsetWidth + padding}px`;
          }
        }
        const heading = document.createElement(`h${this.view.popup.headingLevel ?? 2}`);
        heading.innerHTML = this.view.popup.title ?? '';
        heading.className = 'esri-widget__heading esri-popup__header-title';
        if (this.popupTitleEl != null) {
          this.popupTitleEl.innerHTML = '';
          this.popupTitleEl.prepend(heading);
        }
      }
    }
  }

  updateExportOutput(): void {
    this.output = {};
    if (this.showHeaderTitle) {
      this.output.headerTitle = this.headerTitle;
    }
    if (this.showIncludeLegend) {
      this.output.includeLegend = this.includeLegend;
    }
    if (this.showIncludeMap) {
      this.output.includeMap = this.includeMap;
    }
    if (this.showIncludePopup) {
      this.output.includePopup = this.includePopup;
    }
    this.exportOutputUpdated.emit();
  }

  setupViewPrintElements(): void {
    if (this.view != null) {
      document.body.prepend(this.printEl);
      if (this.viewSectionEl != null) {
        this.viewSectionEl.className = CSS.print.viewSection;
      }
      this.handleLegendSetup();
      this.handleViewSectionDisplay();
      const title = document.title;
      if (this.showHeaderTitle && this.headerTitle) {
        document.title = this.headerTitle;
      }
      window.print();
      document.title = title;
    }
  }

  handleLegendSetup(): void {
    if (this.view != null && this.includeMap) {
      const hasLegend = this.showIncludeLegend && this.includeLegend;
      if (hasLegend) {
        this.legendContainerEl.style.display = 'block';
        const gridGap = 8;
        const totalMargin = '.50in';
        const fullLegendHeight = this.legendContainerEl.offsetHeight + gridGap;
        this.viewContainerEl.style.height = `calc(100vh - ${fullLegendHeight}px - ${totalMargin})`;
        this.viewSectionEl.style.gridTemplateRows = `calc(100vh - ${fullLegendHeight}px - ${totalMargin}) auto`;
      } else {
        this.legendContainerEl.style.display = 'none';
        this.viewContainerEl.style.height = '';
        this.viewSectionEl.style.gridTemplateRows = '';
      }
    }
  }

  handleViewSectionDisplay(): void {
    if (this.view != null && this.includeMap) {
      const hasLegend = this.showIncludeLegend && this.includeLegend;
      const hasPopup = this.includePopup && this.view.popup.selectedFeature && this.view.popup.visible;
      if (hasLegend && hasPopup) {
        this.viewSectionEl.classList.add(CSS.print.viewPopupLegend);
      } else if (hasLegend) {
        this.viewSectionEl.classList.add(CSS.print.viewLegend);
      } else if (hasPopup) {
        this.viewSectionEl.classList.add(CSS.print.viewPopup);
      }
      this.viewSectionEl.classList.add(hasLegend || hasPopup ? CSS.print.sectionGrid : CSS.print.sectionFullView);
    }
  }

  async viewScreenshot(): Promise<void> {
    if (this.view != null && this.includeMap) {
      const pixelRatio = 2;
      const screenshot = await this.view.takeScreenshot({ width: this.view.width * pixelRatio, height: this.view.height * pixelRatio });
      if (this.viewEl != null) this.viewEl.src = screenshot.dataUrl;
    }
  }

  async getMessages(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.hostElement);
    this.messages = messages[0] as typeof Export_T9n;
  }
}
