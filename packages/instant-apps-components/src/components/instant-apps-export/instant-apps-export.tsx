import { Component, Element, Event, EventEmitter, h, Host, Prop, State, VNode, Watch } from '@stencil/core';
import { CalciteCheckboxCustomEvent, CalciteInputCustomEvent } from '@esri/calcite-components';

import Export_T9n from '../../assets/t9n/instant-apps-export/resources.json';
import { ExportOutput, PopoverPlacement } from '../../interfaces/interfaces';
import { getMessages } from '../../utils/locale';
import { screenshotStyling, printStyling } from './resources';
import { loadModules } from '../../utils/loadModules';
import { getMode } from '../../utils/mode';

const CSS = {
  baseDark: 'instant-apps-export calcite-mode-dark',
  baseLight: 'instant-apps-export calcite-mode-light',
  inlineContainer: 'instant-apps-export__inline-container',
  popoverContainer: 'instant-apps-export__popover-container',
  hidden: 'instant-apps-export__visually-hidden',
  print: {
    base: 'instant-apps-export-print',
    contentContainer: 'instant-apps-export-print__content-container',
    extraContainer: 'instant-apps-export-print__extra-container',
    legendContainer: 'instant-apps-export-print__legend-container',
    compassContainer: 'instant-apps-export-print__compass-container',
    scaleBarContainer: 'instant-apps-export-print__scale-bar-container',
    popupContainer: 'instant-apps-export-print__popup-container',
    popupContent: 'instant-apps-export-print__popup-content',
    popupTitle: 'instant-apps-export-print__popup-title',
    view: 'instant-apps-export-print__view',
    viewContainer: 'instant-apps-export-print__view-container',
    viewSection: 'instant-apps-export-print__view-section',
    viewWrapper: 'instant-apps-export-print__view-wrapper',
  },
};

const dragHandlerName = 'instant-app-export-drag';

@Component({
  tag: 'instant-apps-export',
  styleUrl: 'instant-apps-export.scss',
  shadow: true,
})
export class InstantAppsExport {
  @Element() el: HTMLElement;

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
  @Prop() popoverIcon?: string = 'export';

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
   * When `true`, `extraContent` HTML element is included in the PDF.
   */
  @Prop({ mutable: true }) includeExtraContent?: boolean = true;

  /**
   * When `true`, legend is included in the export.
   */
  @Prop({ mutable: true }) includeLegend?: boolean = true;

  /**
   * When `true`, map is included in the export.
   */
  @Prop({ mutable: true }) includeMap?: boolean = true;

  /**
   * When `true`, popup is included in the export.
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
   * Show header title input in export tool.
   */
  @Prop() showHeaderTitle?: boolean = true;

  /**
   * Show include legend checkbox in export tool.
   */
  @Prop() showIncludeLegend?: boolean = true;

  /**
   * Show include map checkbox in export tool.
   */
  @Prop() showIncludeMap?: boolean = false;

  /**
   * Show popup checkbox in export tool.
   */
  @Prop() showIncludePopup?: boolean = true;

  /**
   * Show scale bar widget in map.
   */
  @Prop() showScaleBar?: boolean = true;

  /**
   * A reference to the MapView or SceneView.
   */
  @Prop() view: __esri.MapView | __esri.SceneView | undefined;

  /**
   * Adjust the mask background color for when users are setting the map area
   */
  @Prop() maskBackground = 'rgba(255, 51, 0, 0.1)';

  /**
   * Adjust the mask border for when users are setting the map area
   */
  @Prop() maskBorder = '2px dashed rgb(255, 51, 0)';

  @State() baseClass = CSS.baseLight;
  @State() exportIsLoading: boolean | undefined = undefined;
  @State() messages: typeof Export_T9n;

  /**
   * Emits when the instant-apps-export's output prop is updated after the "Export" button is clicked.
   */
  @Event() exportOutputUpdated: EventEmitter<void>;

  @Watch('includeMap')
  watchIncludeMap(newValue: boolean): void {
    if (newValue) {
      this.updateLegend();
    }
  }

  area: __esri.MapViewTakeScreenshotOptionsArea | __esri.MapViewTakeScreenshotOptionsArea | undefined;
  compass: __esri.Compass | null;
  compassContainerEl: HTMLDivElement;
  extraContainerEl: HTMLDivElement;
  handles: __esri.Handles | null;
  legend: __esri.Legend;
  legendContainerEl: HTMLDivElement;
  maskDivEl: HTMLDivElement;
  popoverEl: HTMLCalcitePopoverElement;
  popupContainerEl: HTMLDivElement;
  popupContentEl: HTMLDivElement;
  popupTitleEl: HTMLDivElement;
  printContainerEl: HTMLDivElement;
  printEl: HTMLDivElement;
  printStyleEl: HTMLStyleElement | undefined;
  scaleBar: __esri.ScaleBar | null;
  scaleBarContainerEl: HTMLDivElement;
  screenshot: __esri.Screenshot | null;
  screenshotPreview: HTMLDivElement;
  screenshotImgContainer: HTMLDivElement;
  screenshotImg: HTMLImageElement;
  screenshotStyle: HTMLStyleElement;
  viewWrapperEl: HTMLDivElement;
  viewContainerEl: HTMLDivElement;
  viewEl: HTMLImageElement;

  componentWillLoad(): void {
    this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
    getMessages(this);
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
    const compass = this.renderCompass();
    return (
      <Host>
        <div class={this.baseClass} onMouseEnter={this.handleWidgetCreation.bind(this)} onFocusin={this.handleWidgetCreation.bind(this)}>
          {mode}
          <div class={CSS.hidden}>{compass}</div>
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
      <calcite-action
        id="export-popover-btn"
        alignment="center"
        icon={this.popoverIcon}
        scale={this.scale}
        title={this.messages?.exportBtn}
        text={this.messages?.exportBtn}
      ></calcite-action>,
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
        {this.includeMap ? (
          <calcite-button appearance="transparent" width="full" onClick={this.setMapAreaOnClick.bind(this)} disabled={this.exportIsLoading}>
            {this.messages?.setMapArea}
          </calcite-button>
        ) : null}
        <calcite-button width="full" onClick={this.exportOnClick.bind(this)} loading={this.exportIsLoading} disabled={this.exportIsLoading}>
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
    const legend = this.includeMap && this.showIncludeLegend ? this.renderLegend() : null;
    const popup = this.includeMap && this.showIncludePopup ? this.renderPopup() : null;
    return (
      <div ref={(el: HTMLDivElement) => (this.printContainerEl = el)}>
        <div class={CSS.print.base} ref={(el: HTMLDivElement) => (this.printEl = el)}>
          {printMap}
          {legend}
          <div class={CSS.print.contentContainer}>
            {popup}
            {extraContent}
          </div>
        </div>
      </div>
    );
  }

  renderPrintMap(): VNode {
    const scaleBar = this.renderScaleBar();
    return (
      <div class={CSS.print.viewContainer} ref={(el: HTMLDivElement) => (this.viewContainerEl = el)}>
        <div class={CSS.print.viewWrapper} ref={(el: HTMLDivElement) => (this.viewWrapperEl = el)}>
          {this.headerTitle ? <instant-apps-header titleText={this.headerTitle} backgroundColor="#fff" textColor="#323232"></instant-apps-header> : null}
          <img class={CSS.print.view} ref={(el: HTMLImageElement) => (this.viewEl = el)}></img>
          {scaleBar}
        </div>
      </div>
    );
  }

  renderLegend(): VNode {
    return <div class={CSS.print.legendContainer} ref={(el: HTMLDivElement) => (this.legendContainerEl = el)}></div>;
  }

  renderCompass(): VNode {
    return <div class={CSS.print.compassContainer} ref={(el: HTMLDivElement) => (this.compassContainerEl = el)}></div>;
  }

  renderScaleBar(): VNode {
    return <div class={CSS.print.scaleBarContainer} ref={(el: HTMLDivElement) => (this.scaleBarContainerEl = el)}></div>;
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
    return <div class={CSS.print.extraContainer} id="export-content" ref={(el: HTMLDivElement) => (this.extraContainerEl = el)}></div>;
  }

  optionOnChange(e: CalciteCheckboxCustomEvent<Event>): void {
    const { checked, value } = e.target;
    this[value] = checked;
    this.updateExportOutput();
  }

  updateHeaderTitle(e: CalciteInputCustomEvent<Event>): void {
    this.headerTitle = e.target.value;
    this.updateExportOutput();
  }

  async exportOnClick(): Promise<void> {
    this.removeScreenshotElements();
    await this.beforeExport();
    if (this.viewWrapperEl != null && !this.viewWrapperEl.contains(this.compassContainerEl)) {
      this.viewWrapperEl.append(this.compassContainerEl);
    }
    this.handleViewExportOnClick();
    if (this.popoverEl != null) {
      this.popoverEl.open = false;
    }
  }

  async handleViewExportOnClick(): Promise<void> {
    if (this.view != null) {
      this.addPrintStyling();
      document.body.prepend(this.printEl);
      this.handleExtraContent();
      if (this.includeMap) {
        this.updatePopupToPrint();
        this.viewScreenshot();
        this.handleImgLoaded();
      } else {
        this.handleImgLoaded();
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
    }, 1500);
  }

  handleExtraContent(): void {
    const extraContainerEl = this.printEl.querySelector('#export-content') as HTMLDivElement;
    if (extraContainerEl != null) {
      extraContainerEl.innerHTML = '';
      if (this.extraContent != null && this.includeExtraContent) {
        extraContainerEl.style.display = 'block';
        extraContainerEl.append(this.extraContent.cloneNode(true));
      } else {
        extraContainerEl.style.display = 'none';
      }
    }
  }

  resetPrintContent(): void {
    if (this.view != null) {
      this.screenshot = null;
      this.printContainerEl?.prepend(this.printEl);
      this.printStyleEl?.remove();
      this.printStyleEl = undefined;
      const extraContainerEl = this.printEl.querySelector('#export-content') as HTMLDivElement;
      if (extraContainerEl) {
        extraContainerEl.innerHTML = '';
      }
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
      this.handleLegendSetup();
      const title = document.title;
      if (this.showHeaderTitle && this.headerTitle) {
        document.title = this.headerTitle;
      }
      window.print();
      document.title = title;
      setTimeout(() => {
        this.resetPrintContent();
      }, 1000);
    }
  }

  handleLegendSetup(): void {
    if (this.showIncludeLegend && this.view != null && this.includeMap && this.legendContainerEl != null) {
      this.legendContainerEl.style.display = this.includeLegend ? 'block' : 'none';
    }
  }

  handleWidgetCreation(): void {
    this.handleLegendCreation();
    this.handleCompassCreation();
    this.handleScaleBarCreation();
  }

  handleLegendCreation(): void {
    if (this.includeMap && this.view != null && this.showIncludeLegend && this.legendContainerEl != null) {
      const map = this.view.map as __esri.WebMap | __esri.WebScene;
      const legendMap = this.legend?.view?.map as __esri.WebMap | __esri.WebScene;
      const checkId = map?.portalItem.id === legendMap?.portalItem.id;
      if (!checkId) {
        this.updateLegend();
      }
    }
  }

  updateLegend(): void {
    this.view?.when(async (view: __esri.MapView | __esri.SceneView) => {
      this.legend?.destroy();
      if (this.legendContainerEl != null) {
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
      }
    });
  }

  handleCompassCreation(): void {
    if (this.includeMap && this.view != null && this.compassContainerEl != null) {
      const map = this.view.map as __esri.WebMap | __esri.WebScene;
      const compassMap = this.compass?.view?.map as __esri.WebMap | __esri.WebScene;
      const checkId = map?.portalItem.id === compassMap?.portalItem.id;
      if (!checkId) {
        this.updateCompass();
      }
    }
  }

  updateCompass(): void {
    this.view?.when(async (view: __esri.MapView | __esri.SceneView) => {
      this.compass?.destroy();
      this.compass = null;
      const container = document.createElement('div');
      this.compassContainerEl.append(container);
      const [Compass] = await loadModules(['esri/widgets/Compass']);
      this.compass = new Compass({ container, view });
    });
  }

  handleScaleBarCreation(): void {
    if (this.showScaleBar && this.includeMap && this.view != null && this.view.type === '2d' && this.scaleBarContainerEl != null) {
      const map = this.view.map as __esri.WebMap;
      const scaleBarMap = this.scaleBar?.view?.map as __esri.WebMap;
      const checkId = map?.portalItem.id === scaleBarMap?.portalItem.id && this.scaleBarContainerEl.innerHTML;
      if (!checkId) {
        this.updateScaleBar();
      }
    }
  }

  updateScaleBar(): void {
    this.view?.when(async (view: __esri.MapView) => {
      this.scaleBar?.destroy();
      this.scaleBar = null;
      this.scaleBarContainerEl.innerHTML = '';
      const [ScaleBar] = await loadModules(['esri/widgets/ScaleBar']);
      this.scaleBar = new ScaleBar({ container: this.scaleBarContainerEl, unit: 'dual', view });
    });
  }

  async viewScreenshot(): Promise<void> {
    if (this.view != null && this.includeMap) {
      if (this.screenshot == null) {
        this.screenshot = await this.view.takeScreenshot({
          width: this.view.width * 2,
          height: this.view.height * 2,
        });
      }
      this.handleScaleBarSize();
      if (this.viewEl != null && this.viewWrapperEl != null) {
        const { height, width } = this.screenshot.data;
        if (height > width) {
          this.setMaxRowHeightOnViewContainer();
        } else {
          this.setMaxWidthOnViewContainer();
        }
        this.viewEl.src = this.screenshot.dataUrl;
      }
    }
  }

  setMaxRowHeightOnViewContainer(): void {
    this.printEl.style.gridTemplateRows = 'minmax(auto, 70%)';
    this.viewEl.style.height = '100%';
    this.viewEl.style.width = '';
    this.viewWrapperEl.style.height = '100%';
    this.viewWrapperEl.style.width = 'fit-content';
  }

  setMaxWidthOnViewContainer(): void {
    this.printEl.style.gridTemplateRows = '';
    this.viewEl.style.width = '100%';
    this.viewEl.style.height = '';
    this.viewWrapperEl.style.height = 'fit-content';
    this.viewWrapperEl.style.width = '100%';
  }

  checkPopupOpen(): void {
    if (this.view != null) {
      const popupContainer = this.view.popup.container as HTMLElement;
      const popup = popupContainer?.querySelector('.esri-popup .esri-feature__main-container');
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

  createScreenshot(): void {
    if (this.view != null) {
      this.screenshotPreview = document.createElement('div');
      this.screenshotPreview.className = 'screenshot-preview hide';
      this.screenshotImgContainer = document.createElement('div');
      this.screenshotImgContainer.className = 'screenshot-img-container';
      this.screenshotImg = document.createElement('img');
      const screenshotBtnContainer = document.createElement('div');
      const exportBtn = document.createElement('calcite-button');
      const returnBtn = document.createElement('calcite-button');
      exportBtn.innerHTML = this.messages?.export;
      returnBtn.innerHTML = this.messages?.returnToMap;
      returnBtn.appearance = 'outline-fill';
      exportBtn.onclick = this.exportOnClick.bind(this);
      returnBtn.onclick = this.screenshotReturn.bind(this);
      screenshotBtnContainer.append(returnBtn, exportBtn);
      this.screenshotImgContainer.append(this.screenshotImg, screenshotBtnContainer);
      this.screenshotPreview.append(this.screenshotImgContainer);
      this.view.container.append(this.screenshotPreview);
    }
  }

  createMaskDiv(): void {
    if (this.view != null) {
      this.maskDivEl = document.createElement('div');
      this.maskDivEl.id = 'screenshot-mask';
      this.maskDivEl.className = 'hide screenshot-cursor';
      this.maskDivEl.style.setProperty('--instant-apps-screenshot-mask-background', this.maskBackground);
      this.maskDivEl.style.setProperty('--instant-apps-screenshot-mask-border', this.maskBorder);
      this.screenshotStyle = document.createElement('style');
      this.screenshotStyle.innerHTML = screenshotStyling;
      this.view.container.append(this.screenshotStyle);
      this.view.container.append(this.maskDivEl);
    }
  }

  screenshotReturn(): void {
    this.removeScreenshotElements();
    this.exportIsLoading = false;
    this.screenshot = null;
  }

  setMapAreaOnClick(): void {
    if (this.view == null) return;
    this.exportIsLoading = true;
    this.createMaskDiv();
    this.createScreenshot();
    this.view.container.classList.add('screenshot-cursor', 'relative');
    this.view.addHandles(
      this.view.on('drag', async event => {
        if (this.view == null) return;
        event.stopPropagation();
        if (event.action !== 'end') {
          this.updateMaskSize(event);
        } else {
          this.maskScreenshot();
        }
      }),
      dragHandlerName,
    );
  }

  updateMaskSize(event: __esri.ViewDragEvent): void {
    if (this.view != null) {
      const xmin = this.clamp(Math.min(event.origin.x, event.x), 0, this.view.width);
      const xmax = this.clamp(Math.max(event.origin.x, event.x), 0, this.view.width);
      const ymin = this.clamp(Math.min(event.origin.y, event.y), 0, this.view.height);
      const ymax = this.clamp(Math.max(event.origin.y, event.y), 0, this.view.height);
      this.area = {
        x: xmin,
        y: ymin,
        width: xmax - xmin,
        height: ymax - ymin,
      };
      this.setMaskPosition(this.area);
    }
  }

  maskScreenshot(): void {
    if (this.view != null && this.area != null) {
      this.view.removeHandles(dragHandlerName);
      const height = this.area.height!;
      const width = this.area.width!;
      this.view.takeScreenshot({ area: this.area, width: width * 2, height: height * 2, format: 'jpg' }).then(screenshot => {
        this.screenshot = screenshot;
        this.showPreview();
        this.view?.container.classList.remove('screenshot-cursor');
        this.setMaskPosition(null);
      });
    }
  }

  setMaskPosition(area: __esri.MapViewTakeScreenshotOptionsArea | __esri.MapViewTakeScreenshotOptionsArea | null) {
    if (area != null) {
      this.maskDivEl.classList.remove('hide');
      this.maskDivEl.style.left = `${area.x}px`;
      this.maskDivEl.style.top = `${area.y}px`;
      this.maskDivEl.style.width = `${area.width}px`;
      this.maskDivEl.style.height = `${area.height}px`;
    } else {
      this.maskDivEl.remove();
    }
  }

  clamp(value: number, from: number, to: number) {
    return value < from ? from : value > to ? to : value;
  }

  showPreview() {
    this.screenshotPreview.classList.remove('hide');
    if (this.screenshotImg != null && this.screenshot != null) {
      this.screenshotImg.src = this.screenshot.dataUrl;
    }
  }

  handleScaleBarSize(): void {
    if (this.view?.type === '2d') {
      if (this.scaleBarContainerEl != null) {
        const topBar: HTMLDivElement | null = this.scaleBarContainerEl.querySelector('.esri-scale-bar__line--top');
        const bottomBar: HTMLDivElement | null = this.scaleBarContainerEl.querySelector('.esri-scale-bar__line--bottom');
        this.setScalebarWidth(topBar, 'top');
        this.setScalebarWidth(bottomBar, 'bottom');
      }
    }
  }

  setScalebarWidth(bar: HTMLDivElement | null, position: 'bottom' | 'top'): void {
    if (this.view != null && bar != null && this.screenshot != null) {
      const width = this.screenshot.data.width / 2;
      const barWidth = Number(bar.style.width.replace('px', ''));
      const widthPercentage = (barWidth / width) * 100;
      bar.style.setProperty(`--instant-apps-scale-bar-${position}`, `${widthPercentage}%`);
    }
  }

  removeScreenshotElements(): void {
    this.screenshotPreview?.remove();
    this.screenshotStyle?.remove();
  }
}
