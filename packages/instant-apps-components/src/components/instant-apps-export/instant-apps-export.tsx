import { Component, Element, Event, EventEmitter, h, Host, Prop, State, VNode } from '@stencil/core';
import { CalciteCheckboxCustomEvent, CalciteInputCustomEvent } from '@esri/calcite-components';

import Export_T9n from '../../assets/t9n/instant-apps-export/resources.json';
import { ExportOutput, PopoverPlacement } from '../../interfaces/interfaces';
import { getLocaleComponentStrings } from '../../utils/locale';
import { printStyling } from './resources';
import { loadModules } from '../../utils/loadModules';
import { getMode } from '../../utils/mode';

const CSS = {
  baseDark: 'instant-apps-export calcite-mode-dark',
  baseLight: 'instant-apps-export calcite-mode-light',
  inlineContainer: 'instant-apps-export__inline-container',
  popoverContainer: 'instant-apps-export__popover-container',
  print: {
    base: 'instant-apps-export-print',
    extraContainer: 'instant-apps-export-print__extra-container',
    legendContainer: 'instant-apps-export-print__legend-container',
    compassContainer: 'instant-apps-export-print__compass-container',
    popupContainer: 'instant-apps-export-print__popup-container',
    popupContent: 'instant-apps-export-print__popup-content',
    popupTitle: 'instant-apps-export-print__popup-title',
    view: 'instant-apps-export-print__view',
    viewContainer: 'instant-apps-export-print__view-container',
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
   * Output to use to set up export.
   */
  @Prop({ mutable: true }) output?: ExportOutput;

  /**
   * Passes the initial function to run when the Export button is clicked.
   */
  @Prop() beforeExport: () => Promise<void> = () => Promise.resolve();

  /**
   * Update popover button icon.
   */
  @Prop() popoverIcon?: string = 'print';

  /**
   * Extra content that will be added below the view.
   */
  @Prop() extraContent?: HTMLElement;

  /**
   * Custom label for `extraContent` checkbox.
   */
  @Prop() extraContentLabel?: string;

  /**
   * Export header name, updated in input.
   */
  @Prop({ mutable: true }) headerTitle?: string = '';

  /**
   * When `true`, include `extraContent` HTML element in PDF.
   */
  @Prop({ mutable: true }) includeExtraContent?: boolean = true;

  /**
   * When `true`, include legend in export.
   */
  @Prop({ mutable: true }) includeLegend?: boolean = true;

  /**
   * When `true`, include map in export.
   */
  @Prop({ mutable: true }) includeMap?: boolean = true;

  /**
   * When `true`, include popup in export.
   */
  @Prop({ mutable: true }) includePopup?: boolean = false;

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
   * Show include legend checkbox.
   */
  @Prop() showIncludeLegend?: boolean = true;

  /**
   * Show include map checkbox.
   */
  @Prop() showIncludeMap?: boolean = false;

  /**
   * Show popup checkbox.
   */
  @Prop() showIncludePopup?: boolean = true;

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
  compass: __esri.Compass;
  compassContainerEl: HTMLDivElement;
  extraContainerEl: HTMLDivElement;
  handles: __esri.Handles | null;
  legend: __esri.Legend;
  legendContainerEl: HTMLDivElement;
  popoverEl: HTMLCalcitePopoverElement;
  popupContainerEl: HTMLDivElement;
  popupContentEl: HTMLDivElement;
  popupTitleEl: HTMLDivElement;
  printContainerEl: HTMLDivElement;
  printEl: HTMLDivElement;
  printStyleEl: HTMLStyleElement | undefined;
  viewContainerEl: HTMLDivElement;
  viewEl: HTMLImageElement;

  componentWillLoad(): void {
    this.baseClass = getMode(this.hostElement) === 'dark' ? CSS.baseDark : CSS.baseLight;
    this.getMessages();
    this.initializeModules();
  }

  componentDidLoad(): void {
    this.printContainerEl.prepend(this.printEl);
  }

  disconnectedCallback(): void {
    this.handles?.removeAll();
    this.handles?.destroy();
    this.handles = null;
  }

  async initializeModules() {
    const [Handles] = await loadModules(['esri/core/Handles']);
    this.handles = new Handles();

    return Promise.resolve();
  }

  render() {
    const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
    return (
      <Host>
        <div class={this.baseClass} onMouseOver={this.handleWidgetCreation.bind(this)} onFocusin={this.handleWidgetCreation.bind(this)}>
          {mode}
        </div>
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
      <calcite-action id="export-popover-btn" alignment="center" icon={this.popoverIcon} scale={this.scale} text={this.messages?.toggleExport}></calcite-action>,
    ];
  }

  renderPanel(): VNode {
    const headerTitle = this.showHeaderTitle ? this.renderTitle() : null;
    const includeExtraContent = this.extraContent != null ? this.renderSwitch('includeExtraContent', this.extraContentLabel) : null;
    const includeMap = this.showIncludeMap ? this.renderSwitch('includeMap') : null;
    const options = this.includeMap ? this.renderMapOptions() : null;
    const print = this.renderPrint();
    const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
    return (
      <div class={panelClass}>
        {headerTitle}
        {includeExtraContent}
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

  renderSwitch(value: string, label?: string): VNode {
    const checked = this[value];
    const title = label != null ? label : this.messages?.[value];
    return (
      <calcite-label layout="inline-space-between">
        {title}
        <calcite-switch checked={checked} value={value} onCalciteSwitchChange={this.optionOnChange.bind(this)}></calcite-switch>
      </calcite-label>
    );
  }

  renderMapOptions(): VNode {
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
    const extraContent = this.renderExtraContent();
    const legend = this.showIncludeLegend ? this.renderLegend() : null;
    const popup = this.showIncludePopup ? this.renderPopup() : null;
    return (
      <div ref={(el: HTMLDivElement) => (this.printContainerEl = el)}>
        <div class={CSS.print.base} ref={(el: HTMLDivElement) => (this.printEl = el)}>
          {printMap}
          {extraContent}
          {legend}
          {popup}
        </div>
      </div>
    );
  }

  renderPrintMap(): VNode {
    const compass = this.renderCompass();
    return (
      <div class={CSS.print.viewContainer} ref={(el: HTMLDivElement) => (this.viewContainerEl = el)}>
        <instant-apps-header titleText={this.headerTitle}></instant-apps-header>
        <img class={CSS.print.view} ref={(el: HTMLImageElement) => (this.viewEl = el)} src="" />
        {compass}
      </div>
    );
  }

  renderLegend(): VNode {
    return <div class={CSS.print.legendContainer} ref={(el: HTMLDivElement) => (this.legendContainerEl = el)}></div>;
  }

  renderCompass(): VNode {
    return <div class={CSS.print.compassContainer} ref={(el: HTMLDivElement) => (this.compassContainerEl = el)}></div>;
  }

  renderPopup(): VNode {
    return (
      <div class={CSS.print.popupContainer} ref={(el: HTMLDivElement) => (this.popupContainerEl = el)}>
        <div ref={(el: HTMLDivElement) => (this.popupTitleEl = el)} class={CSS.print.popupTitle}></div>
        <div ref={(el: HTMLDivElement) => (this.popupContentEl = el)} class={CSS.print.popupContent}></div>
      </div>
    );
  }

  renderExtraContent(): VNode {
    return <div class={CSS.print.extraContainer} ref={(el: HTMLDivElement) => (this.extraContainerEl = el)}></div>;
  }

  optionOnChange(e: CalciteCheckboxCustomEvent<Event>): void {
    const { checked, value } = e.target;
    this[value] = checked;
  }

  updateHeaderTitle(e: CalciteInputCustomEvent<Event>): void {
    this.headerTitle = e.target.value;
  }

  async exportOnClick(): Promise<void> {
    await this.beforeExport();
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
        this.updatePopupToPrint();
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
      if (this.extraContent != null && this.includeExtraContent) {
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

  async updatePopupToPrint(): Promise<void> {
    if (this.view != null) {
      if (this.popupContainerEl != null) {
        this.popupContainerEl.style.display = this.includePopup && this.view.popup.visible ? 'block' : 'none';
        this.checkPopupOpen();
      }
      if (this.view.popup.visible && this.view.popup.selectedFeature != null) {
        const heading = document.createElement(`h${this.view.popup.headingLevel ?? 2}`);
        heading.innerHTML = this.view.popup.title ?? '';
        heading.className = 'esri-widget__heading esri-popup__header-title';
        if (this.popupTitleEl != null) {
          this.popupTitleEl.style.display = this.view.popup.title ? 'block' : 'none';
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
      this.handleLegendSetup();
      const title = document.title;
      if (this.showHeaderTitle && this.headerTitle) {
        document.title = this.headerTitle;
      }
      window.print();
      document.title = title;
    }
  }

  handleLegendSetup(): void {
    if (this.showIncludeLegend && this.view != null && this.includeMap) {
      this.legendContainerEl.style.display = this.includeLegend ? 'block' : 'none';
    }
  }

  handleWidgetCreation(): void {
    this.handleLegendCreation();
    this.handleCompassCreation();
  }

  handleLegendCreation(): void {
    if (this.includeMap && this.view != null && this.showIncludeLegend) {
      const map = this.view.map as __esri.WebMap | __esri.WebScene;
      const legendMap = this.legend?.view.map as __esri.WebMap | __esri.WebScene;
      const checkId = map?.portalItem.id === legendMap?.portalItem.id;
      if (!checkId) {
        this.view.when(async (view: __esri.MapView | __esri.SceneView) => {
          this.legend?.destroy();
          this.legendContainerEl.innerHTML = '';
          const [Legend] = await loadModules(['esri/widgets/Legend']);
          this.legend = new Legend({
            container: this.legendContainerEl,
            view,
            style: {
              type: 'card',
              layout: 'side-by-side',
            },
          });
        });
      }
    }
  }

  handleCompassCreation(): void {
    if (this.includeMap && this.view != null) {
      const map = this.view.map as __esri.WebMap | __esri.WebScene;
      const compassMap = this.compass?.view.map as __esri.WebMap | __esri.WebScene;
      const checkId = map?.portalItem.id === compassMap?.portalItem.id;
      if (!checkId) {
        this.view.when(async (view: __esri.MapView | __esri.SceneView) => {
          this.compass?.destroy();
          this.compassContainerEl.innerHTML = '';
          const [Compass] = await loadModules(['esri/widgets/Compass']);
          this.compass = new Compass({ container: this.compassContainerEl, view });
        });
      }
    }
  }

  async viewScreenshot(): Promise<void> {
    if (this.view != null && this.includeMap) {
      const pixelRatio = 2;
      const screenshot = await this.view.takeScreenshot({ width: this.view.width * pixelRatio, height: this.view.height * pixelRatio });
      if (this.viewEl != null) this.viewEl.src = screenshot.dataUrl;
    }
  }

  checkPopupOpen(): void {
    if (this.view != null) {
      const popupContainer = this.view.popup.container as HTMLElement;
      const popup = popupContainer?.querySelector('.esri-popup__content');
      if (popup != null) {
        const popupCanvas = popup.querySelectorAll('canvas');
        this.popupContentEl.innerHTML = '';
        this.popupContentEl.append(popup.cloneNode(true));
        const popContCanvas = this.popupContentEl.querySelectorAll('canvas');
        popupCanvas.forEach((canvas, key) => {
          const image = canvas.toDataURL();
          const img = document.createElement('img');
          img.src = image;
          const style = canvas.getAttribute('style');
          if (style) {
            img.setAttribute('style', style);
          }
          const popCanvas = popContCanvas[key];
          if (popCanvas != null) {
            popCanvas.replaceWith(img);
            if (document.querySelector("link[href*='esri/themes/dark/main.css']") && img.parentElement?.parentElement != null) {
              img.parentElement.style.background = '#242424';
              img.parentElement.parentElement.style.background = '#242424';
            }
          }
        });
      }
    }
  }

  async getMessages(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.hostElement);
    this.messages = messages[0] as typeof Export_T9n;
  }
}
