/// <reference types="arcgis-js-api" />
import SocialShare_T9n from '../../assets/t9n/instant-apps-social-share/resources.json';
import { PopperPlacement } from '@esri/calcite-components/dist/types/utils/popper';
declare type ShareItemOptions = 'link' | 'facebook' | 'twitter' | 'linkedIn';
export declare class InstantAppsSocialShare {
  el: HTMLInstantAppsSocialShareElement;
  popoverRef: HTMLCalcitePopoverElement;
  embedWidthRef: HTMLInputElement | undefined;
  embedHeightRef: HTMLInputElement | undefined;
  embedCodeRef: HTMLTextAreaElement | undefined;
  copyLinkPopoverRef: HTMLCalcitePopoverElement;
  copyEmbedPopoverRef: HTMLCalcitePopoverElement;
  dialogContentRef: HTMLDivElement | undefined;
  shareListRef: HTMLUListElement | undefined;
  popoverButtonRef: HTMLCalciteButtonElement | undefined;
  /**
   * Renders tool as a popover with a trigger button, or inline to place in a custom container.
   */
  mode: 'popover' | 'inline';
  /**
   * Generated share URL. Use this property to append custom URL parameters if needed.
   */
  shareUrl: string;
  shareText: string;
  /**
   * Show/hide the embed UI.
   */
  embed: boolean;
  shareButtonColor: 'inverse' | 'neutral';
  /**
   * Text to nest in embed iframe code.
   */
  iframeInnerText: string;
  /**
   * Adjusts the scale of the popover button icon.
   */
  popoverButtonIconScale: 's' | 'm' | 'l';
  /**
   * MapView or SceneView to reference when URL parameter values are generated, i.e. center, level, viewpoint, etc.
   */
  view: __esri.MapView | __esri.SceneView;
  /**
   * Show/hide the tip text below the share options.
   */
  displayTipText: boolean;
  /**
   * Show/hide social media icons.
   */
  socialMedia: boolean;
  /**
   * Display the share icons in a vertical or horizontal layout.
   */
  shareIconsLayout: 'vertical' | 'horizontal';
  /**
   * Adjusts the scale of the component.
   */
  scale: 's' | 'm' | 'l';
  /**
   * Configure the default URL parameters that are appended to the generated share URL.
   */
  defaultUrlParams: {
    center?: boolean;
    level?: boolean;
    viewpoint?: boolean;
    selectedFeature?: boolean;
    hiddenLayers?: boolean;
  } | null;
  /**
   * Configures the placement of the success message popover for the 'Copy Link' button.
   * See options here: https://github.com/Esri/calcite-components/blob/v1.0.0-beta.83/src/utils/popper.ts#L34
   */
  inlineSuccessPopoverPlacement: PopperPlacement;
  messages: typeof SocialShare_T9n;
  opened: boolean;
  copied: boolean;
  inlineCopyLinkOpened: boolean;
  inlineCopyEmbedOpened: boolean;
  embedWidth: number;
  embedHeight: number;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  getMessages(): Promise<void>;
  setupAutoCloseListeners(): void;
  handlePopoverRefKeyDown(e: KeyboardEvent): void;
  autoCloseCallback(): void;
  stopPropagationCallback(event: Event): void;
  resetPopoverCopyState(): void;
  updateDimensions(type: 'width' | 'height'): void;
  render(): any;
  renderSuccess(): any;
  renderEmbedSuccess(): any;
  renderOptions(): any;
  handleOptionKeyDown(type: ShareItemOptions): (e: KeyboardEvent) => void;
  renderFacebookIcon(): any;
  renderTwitterIcon(): any;
  renderLinkedInIcon(): any;
  renderTip(): any;
  renderEmbed(): any;
  togglePopover(event: Event): void;
  closePopover(): void;
  handleShareItem(type: ShareItemOptions): Promise<void>;
  shortenUrl(url: string): Promise<any>;
  getEmbedCode(): string;
  copyEmbedCode(): void;
  generateShareUrl(): Promise<string>;
  processPoint(point: __esri.Point): Promise<__esri.Point>;
  generateShareUrlParams(point: __esri.Point): string;
  roundValue(val: number, decimalPoints?: number): number;
}
export {};
