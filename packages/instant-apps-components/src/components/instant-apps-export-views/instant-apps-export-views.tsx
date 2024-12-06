import { CalciteCheckboxCustomEvent } from '@esri/calcite-components';
import { Component, Element, Event, EventEmitter, Host, Prop, State, VNode, Watch, h } from '@stencil/core';

import Export_T9n from '../../assets/t9n/instant-apps-export-views/resources.json';
import { ExportOutput, ExportView, PopoverPlacement } from '../../interfaces/interfaces';
import { getMessages } from '../../utils/locale';
import { getMode } from '../../utils/mode';
import { printStyling } from './resources';
import { importCoreReactiveUtils, newCoreHandles, newWidgetsCompass, newWidgetsLegend } from '@arcgis/core-adapter';

const CSS = {
  baseDark: 'instant-apps-export calcite-mode-dark',
  baseLight: 'instant-apps-export calcite-mode-light',
  inlineContainer: 'instant-apps-export__inline-container',
  popoverContainer: 'instant-apps-export__popover-container',
  hidden: 'instant-apps-export__visually-hidden',
  print: {
    base: 'instant-apps-export-print',
    legendContainer: 'instant-apps-export-print__legend-container',
    compassContainer: 'instant-apps-export-print__compass-container',
    scaleBarContainer: 'instant-apps-export-print__scale-bar-container',
    popupContainer: 'instant-apps-export-print__popup-container',
    popupContent: 'instant-apps-export-print__popup-content',
    popupTitle: 'instant-apps-export-print__popup-title',
    view: 'instant-apps-export-print__view',
    viewContainer: 'instant-apps-export-print__view-container',
    viewsContainer: 'instant-apps-export-print__views-container',
    viewSection: 'instant-apps-export-print__view-section',
    viewWrapper: 'instant-apps-export-print__view-wrapper',
    viewContent: 'instant-apps-export-print__view-content',
    viewHeader: 'instant-apps-export-print__view-header',
  },
};

@Component({
  tag: 'instant-apps-export-views',
  styleUrl: 'instant-apps-export-views.scss',
  shadow: true,
})
export class InstantAppsExportViews {
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
   * When `true`, header is included in the export.
   */
  @Prop({ mutable: true }) includeHeader?: boolean = false;

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
   * Show header checkbox in export tool.
   */
  @Prop() showIncludeHeader?: boolean = true;

  /**
   * Show scale bar widget in map if view has it.
   */
  @Prop() showScaleBar?: boolean = false;

  /**
   * A reference to an array of MapViews or SceneViews.
   */
  @Prop() exportViews: ExportView[] | undefined;

  @State() baseClass = CSS.baseLight;
  @State() exportIsLoading: boolean | undefined = undefined;
  @State() messages: typeof Export_T9n;

  /**
   * Emits when the instant-apps-export's output prop is updated after the "Export" button is clicked.
   */
  @Event() exportOutputUpdated: EventEmitter<void>;

  @Watch('includeMap')
  watchIncludeMap(includeMap: boolean): void {
    if (includeMap) {
      this.exportViews?.forEach(({ view }, index) => {
        const legendContainerEl = this.printEl.querySelector(`#legend-${index}`) as HTMLElement;
        if (legendContainerEl != null) {
          this.updateLegend(view, index, legendContainerEl);
        }
      });
    }
  }

  @Watch('exportViews')
  watchView(): void {
    this.exportViews?.forEach(({ view }, index) => {
      this.handleIncludePopup(view, index);
    });
  }

  handles: __esri.Handles | null;
  printContainerEl: HTMLDivElement;
  popoverEl: HTMLCalcitePopoverElement;
  printEl: HTMLDivElement;
  compassContainerEl: HTMLDivElement;
  printStyleEl: HTMLStyleElement | undefined;
  reactiveUtils: __esri.reactiveUtils;
  legends: { [key: number]: __esri.Legend } = {};
  compasses: { [key: number]: __esri.Compass } = {};

  async componentWillLoad(): Promise<void> {
    this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
    getMessages(this);
    await this.initializeModules();
  }

  componentDidLoad(): void {
    this.printContainerEl.prepend(this.printEl);
    this.exportViews?.forEach(({ view }, index) => {
      this.handleIncludePopup(view, index);
    });
  }

  componentDidUpdate(): void {
    this.exportViews?.forEach(({ view }, index) => {
      const lengendContainerEl = this.printEl.querySelector(`#legend-${index}`) as HTMLElement;
      this.updateLegend(view, index, lengendContainerEl);
    });
  }

  async initializeModules() {
    const reactiveUtils = await importCoreReactiveUtils();
    this.handles = await newCoreHandles();
    this.reactiveUtils = reactiveUtils;

    return Promise.resolve();
  }

  render() {
    const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
    return (
      <Host>
        <div class={this.baseClass} onMouseEnter={this.handleWidgetCreation.bind(this)} onFocusin={this.handleWidgetCreation.bind(this)}>
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
    const includeMap = this.showIncludeMap ? this.renderSwitch('includeMap') : null;
    const options = this.includeMap ? this.renderMapOptions() : null;
    const print = this.renderPrint();
    const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
    return (
      <div class={panelClass}>
        {includeMap}
        {options}
        <calcite-button width="full" onClick={this.exportOnClick.bind(this)} disabled={this.exportIsLoading}>
          {this.messages?.export}
        </calcite-button>
        {print}
      </div>
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
    // HARDCODED_IN_EN
    const includeHeader = this.showIncludeHeader ? this.renderSwitch('includeHeader', 'Include header') : null;
    const includeLegend = this.showIncludeLegend ? this.renderSwitch('includeLegend') : null;
    const includePopup = this.showIncludePopup ? this.renderSwitch('includePopup') : null;
    return (
      <div>
        {includeHeader}
        {includeLegend}
        {includePopup}
      </div>
    );
  }

  renderPrint(): VNode {
    return (
      <div ref={(el: HTMLDivElement) => (this.printContainerEl = el)}>
        <div class={CSS.print.base} ref={(el: HTMLDivElement) => (this.printEl = el)}>
          <div class={CSS.print.viewsContainer}>
            {this.exportViews?.map(({ title, view }, index) => {
              const mapId = (view.map as __esri.WebMap)?.portalItem?.id;
              const printMap = this.includeMap ? this.renderPrintMap(title, index) : null;
              const legend = this.includeMap && this.showIncludeLegend ? this.renderLegend(index) : null;
              const popup = this.includeMap && this.showIncludePopup ? this.renderPopup(index) : null;
              return (
                <div key={mapId} id={`print-${index}`} class={CSS.print.viewContent}>
                  {printMap}
                  {legend}
                  {popup}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  renderPrintMap(title: string, index: number): VNode {
    return (
      <div id={`view-container-${index}`} class={CSS.print.viewContainer}>
        <div id={`view-wrapper-${index}`} class={CSS.print.viewWrapper}>
          {this.includeHeader && title ? (
            <div class={CSS.print.viewHeader}>
              <h1>{title}</h1>
            </div>
          ) : null}
          <img id={`view-${index}`} class={CSS.print.view}></img>
          <div id={`scalebar-container-${index}`} class={CSS.print.scaleBarContainer}></div>
        </div>
      </div>
    );
  }

  renderLegend(index: number): VNode {
    return <div id={`legend-${index}`} class={CSS.print.legendContainer}></div>;
  }

  renderCompass(index: number): VNode {
    return <div id={`compass-${index}`} class={CSS.print.compassContainer}></div>;
  }

  renderPopup(index: number): VNode {
    return (
      <div id={`popup-${index}`} class={CSS.print.popupContainer}>
        <div id={`popup-title-${index}`} class={CSS.print.popupTitle}></div>
        <div id={`popup-content-${index}`} class={CSS.print.popupContent}></div>
      </div>
    );
  }

  optionOnChange(e: CalciteCheckboxCustomEvent<Event>): void {
    const { checked, value } = e.target;
    this[value] = checked;
    this.updateExportOutput();
  }

  async exportOnClick(): Promise<void> {
    await this.beforeExport();
    if (this.exportViews?.length) {
      this.addPrintStyling();
      document.body.prepend(this.printEl);
      this.exportViews.forEach(({ view }, index) => {
        // Hide compass this release

        // const viewWrapperEl = this.printEl.querySelector(`#view-wrapper-${index}`);
        // const compassContainerEl = this.compassContainerEl.querySelector(`#compass-${index}`) as HTMLElement;
        // if (viewWrapperEl != null && compassContainerEl != null && !viewWrapperEl.contains(compassContainerEl)) {
        //   if (!title) compassContainerEl.style.top = '15px';
        //   viewWrapperEl.append(compassContainerEl);
        // }
        this.handleViewExportOnClick(view, index);
      });
      this.handleImgLoaded();
    } else {
      if (this.popoverEl != null) {
        this.popoverEl.open = false;
      }
    }
  }

  async handleViewExportOnClick(view: __esri.MapView | __esri.SceneView, index: number): Promise<void> {
    if (this.includeMap) {
      this.updateScaleBar(view, index);
      this.updatePopupToPrint(view, index);
      this.viewScreenshot(view, index);
      this.handleLegendSetup(index);
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

  resetPrintContent(): void {
    // this.printContainerEl?.prepend(this.printEl);
    // this.printStyleEl?.remove();
    // this.printStyleEl = undefined;
  }

  async updatePopupToPrint(view: __esri.MapView | __esri.SceneView, index: number): Promise<void> {
    const popupContainerEl = this.printEl.querySelector(`#popup-${index}`) as HTMLElement;
    if (popupContainerEl != null) {
      popupContainerEl.style.display = this.includePopup && view.popup.visible ? 'block' : 'none';
      this.checkPopupOpen(view, index);
    }
    if (view.popup.visible && view.popup.selectedFeature != null) {
      const heading = document.createElement(`h${view.popup.headingLevel ?? 2}`);
      heading.innerHTML = view.popup.title ?? '';
      heading.className = 'esri-widget__heading esri-popup__header-title';
      const popupTitleEl = this.printEl.querySelector(`#popup-title-${index}`) as HTMLElement;
      if (popupTitleEl != null) {
        popupTitleEl.style.display = view.popup.title ? 'block' : 'none';
        popupTitleEl.innerHTML = '';
        popupTitleEl.prepend(heading);
      }
    }
  }

  updateExportOutput(): void {
    this.output = {};
    if (this.showIncludeLegend) {
      this.output.includeLegend = this.includeLegend;
    }
    if (this.showIncludeMap) {
      this.output.includeMap = this.includeMap;
    }
    if (this.showIncludePopup) {
      this.output.includePopup = this.includePopup;
    }
    if (this.showIncludeHeader) {
      this.output.includeHeader = this.includeHeader;
    }
    this.exportOutputUpdated.emit();
  }

  setupViewPrintElements(): void {
    const title = document.title;
    window.print();
    document.title = title;
    setTimeout(() => {
      this.resetPrintContent();
    }, 1000);
  }

  handleLegendSetup(index: number): void {
    const legendContainerEl = this.printEl.querySelector(`#legend-${index}`) as HTMLElement;
    if (this.showIncludeLegend && this.includeMap && legendContainerEl) {
      const legend = this.legends[index];
      const hasActiveLayers = legend != null && legend.activeLayerInfos?.length > 0;
      legendContainerEl.style.display = this.includeLegend && hasActiveLayers ? 'block' : 'none';
    }
  }

  handleWidgetCreation(): void {
    if (this.includeMap) {
      this.exportViews?.forEach(({ view }, index) => {
        this.handleLegendCreation(view, index);
        // Hide compass this release

        // this.handleCompassCreation(view, index);
      });
    }
  }

  handleIncludePopup(view: __esri.MapView | __esri.SceneView, index: number): void {
    if (this.showIncludePopup) {
      const handleId = `includePopup-${index}`;
      this.handles?.remove(handleId);
      this.reactiveUtils
        ?.whenOnce(() => view?.ready)
        .then(() => {
          this.handles?.add(
            this.reactiveUtils.watch(
              () => view?.popup?.visible,
              (visible: boolean) => {
                this.includePopup = visible;
              },
            ),
            handleId,
          );
        });
    }
  }

  handleLegendCreation(view: __esri.MapView | __esri.SceneView, index: number): void {
    const legendContainerEl = this.printEl.querySelector(`#legend-${index}`) as HTMLElement;
    if (this.showIncludeLegend && legendContainerEl != null) {
      const map = view.map as __esri.WebMap | __esri.WebScene;
      const legend = this.legends[index];
      const legendMap = legend?.view?.map as __esri.WebMap | __esri.WebScene;
      const checkId = map?.portalItem?.id != null && map?.portalItem?.id === legendMap?.portalItem?.id;
      if (!checkId) {
        this.updateLegend(view, index, legendContainerEl);
      }
    }
  }

  async updateLegend(view: __esri.MapView | __esri.SceneView, index: number, legendContainerEl: HTMLElement): Promise<void> {
    view?.when(async (view: __esri.MapView | __esri.SceneView) => {
      if (this.legends[index] == null && legendContainerEl != null) {
        legendContainerEl.innerHTML = '';
        const legendCont = document.createElement('div');
        legendContainerEl.append(legendCont);
        this.legends[index] = await newWidgetsLegend({
          id: `legend-widget-${index}`,
          container: legendCont,
          view,
          style: {
            type: 'card',
            layout: 'side-by-side',
          },
        });
      }
    });
  }

  handleCompassCreation(view: __esri.MapView | __esri.SceneView, index: number): void {
    const compassContainerEl = this.compassContainerEl.querySelector(`#compass-${index}`) as HTMLElement;
    if (compassContainerEl != null) {
      const map = view.map as __esri.WebMap | __esri.WebScene;
      const compass = this.compasses[index];
      const compassMap = compass?.view?.map as __esri.WebMap | __esri.WebScene;
      const checkId = map?.portalItem?.id === compassMap?.portalItem?.id;
      if (!checkId) {
        this.updateCompass(view, index, compassContainerEl);
      }
    }
  }

  updateCompass(view: __esri.MapView | __esri.SceneView, index: number, compassContainerEl: HTMLElement): void {
    view?.when(async (view: __esri.MapView | __esri.SceneView) => {
      const container = document.createElement('div');
      if (compassContainerEl == null) return;
      compassContainerEl.append(container);
      this.compasses[index] = await newWidgetsCompass({ id: `compass-widget-${index}`, container, view });
    });
  }

  updateScaleBar(view: __esri.MapView | __esri.SceneView, index: number): void {
    const scaleBarContainerEl = this.printEl.querySelector(`#scalebar-container-${index}`);
    if (scaleBarContainerEl && view != null) {
      scaleBarContainerEl.innerHTML = '';
      if (this.showScaleBar) {
        const widgets = view.ui.getComponents() as __esri.Widget[];
        const scaleBar = widgets?.find(({ container }) => (container as HTMLElement)?.className?.includes('esri-scale-bar'));
        if (scaleBar?.container != null && typeof scaleBar.container !== 'string') {
          scaleBarContainerEl.append(scaleBar.container.cloneNode(true));
        }
      }
    }
  }

  async viewScreenshot(view: __esri.MapView | __esri.SceneView, index: number): Promise<void> {
    if (this.includeMap) {
      const scaleBarContainerEl = this.printEl.querySelector(`#scalebar-container-${index}`) as HTMLElement;
      scaleBarContainerEl?.classList.toggle('instant-apps-export-print__scale-bar-container--position', view.width > 1000);
      const screenshot = await view.takeScreenshot({
        width: view.width * 2,
        height: view.height * 2,
      });
      this.handleScaleBarSize(view, screenshot, scaleBarContainerEl);
      const viewEl = this.printEl.querySelector(`#view-${index}`) as HTMLImageElement;
      if (screenshot != null && viewEl != null) {
        viewEl.src = screenshot.dataUrl;
      }
    }
  }

  checkPopupOpen(view: __esri.MapView | __esri.SceneView, index: number): void {
    const popupContainer = view.popup.container as HTMLElement;
    const popup = popupContainer?.querySelector('.esri-popup .esri-feature__main-container');
    if (popup != null) {
      const popupCanvas = popup.querySelectorAll('canvas');
      const popupContentEl = this.printEl.querySelector(`#popup-content-${index}`);
      if (popupContentEl == null) return;
      popupContentEl.innerHTML = '';
      popupContentEl.append(popup.cloneNode(true));
      const popContCanvas = popupContentEl.querySelectorAll('canvas');
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

  handleScaleBarSize(view: __esri.MapView | __esri.SceneView, screenshot, scaleBarContainerEl: HTMLElement): void {
    if (this.showScaleBar && view?.type === '2d') {
      if (scaleBarContainerEl != null) {
        const topBar: HTMLDivElement | null = scaleBarContainerEl.querySelector('.esri-scale-bar__line--top');
        const bottomBar: HTMLDivElement | null = scaleBarContainerEl.querySelector('.esri-scale-bar__line--bottom');
        this.setScalebarWidth(screenshot, scaleBarContainerEl, topBar, 'top');
        this.setScalebarWidth(screenshot, scaleBarContainerEl, bottomBar, 'bottom');
      }
    }
  }

  setScalebarWidth(screenshot, scaleBarContainerEl: HTMLElement, bar: HTMLDivElement | null, position: 'bottom' | 'top'): void {
    if (bar != null && screenshot != null) {
      const width = screenshot.data.width / 2;
      const barWidth = Number(bar.style.width.replace('px', ''));
      const widthPercentage = (barWidth / width) * 100;
      scaleBarContainerEl?.style.setProperty(`--instant-apps-scale-bar-${position}`, `${widthPercentage}%`);
    }
  }
}
