import { Component, Element, Event, EventEmitter, h, Host, Prop, State, VNode } from '@stencil/core';
// import { CalciteCheckboxCustomEvent, CalciteInputCustomEvent } from '@esri/calcite-components';

import Create_T9N from '../../assets/t9n/instant-apps-create/resources.json';
import { CreateOption, PopoverPlacement } from '../../interfaces/interfaces';
import { getMessages } from '../../utils/locale';
import { loadModules } from '../../utils/loadModules';
import { getMode } from '../../utils/mode';

// Images
import { getProductGlyph } from '../../utils/productGlyphs';

const CSS = {
  baseDark: 'instant-apps-create calcite-mode-dark',
  baseLight: 'instant-apps-create calcite-mode-light',
  inlineContainer: 'instant-apps-create__inline-container',
  popoverContainer: 'instant-apps-create__popover-container',
  hidden: 'instant-apps-create__visually-hidden',
  header: 'instant-apps-create__header',
  options: 'instant-apps-create__options',
  option: 'instant-apps-create__option',
  optionIcon: 'instant-apps-create__option-icon',
  optionText: 'instant-apps-create__option-text',
  optionTitle: 'instant-apps-create__option-title',
  optionSubtitle: 'instant-apps-create__option-subtitle',
  optionLink: 'instant-apps-create__option-link',
};

export type PredefinedOptions = 'instant-apps' | 'map-viewer' | 'story-maps' | 'experience-builder' | 'dashboards';

@Component({
  tag: 'instant-apps-create',
  styleUrl: 'instant-apps-create.scss',
  shadow: true,
})
export class InstantAppsCreate {
  @Element() el: HTMLElement;

  /**
   * Update popover button icon.
   */
  @Prop() popoverIcon?: string = 'grid';

  /**
   * Export header name, updated in input.
   */
  @Prop({ mutable: true }) headerTitle?: string = '';

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
   * Show header input in export tool.
   */
  @Prop() showHeader?: boolean = true;

  /**
   * Content item to create with
   */
  @Prop() content: __esri.WebMap | __esri.WebScene | __esri.PortalGroup | undefined;

  @Prop() options: (PredefinedOptions | CreateOption)[] = ['instant-apps', 'map-viewer', 'story-maps', 'experience-builder', 'dashboards'];

  @State() baseClass = CSS.baseLight;
  @State() messages: typeof Create_T9N = {} as any;
  @State() CreateOptionsLookup: Record<PredefinedOptions, CreateOption>;

  /**
   * Emits when the instant-apps-create's output prop is updated after the "Export" button is clicked.
   */
  @Event() exportOutputUpdated: EventEmitter<void>;

  handles: __esri.Handles | null;
  popoverEl: HTMLCalcitePopoverElement;

  componentWillLoad() {
    this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
    this.initializeModules();
    return getMessages(this).then(() => {
      this.initializePredefinedOptions();
    });
  }

  componentDidLoad(): void {}

  disconnectedCallback(): void {
    this.handles?.removeAll();
    this.handles?.destroy();
    this.handles = null;
  }

  render() {
    const mode = this.mode === 'popover' ? this.renderPopover() : this.renderPanel();
    return (
      <Host>
        <div class={this.baseClass}>{mode}</div>
      </Host>
    );
  }

  async initializeModules() {
    const [Handles] = await loadModules(['esri/core/Handles']);
    this.handles = new Handles();

    return Promise.resolve();
  }

  initializePredefinedOptions() {
    const { instantApps, instantAppsDesc, mapViewer, mapViewerDesc, storyMaps, storyMapsDesc, experienceBuilder, experienceBuilderDesc, dashboards, dashboardsDesc } =
      this.messages;

    this.CreateOptionsLookup = {
      'instant-apps': {
        title: instantApps,
        subtitle: instantAppsDesc,
        img: getProductGlyph('instant-apps'),
        href: this.hrefLookup('instant-apps'),
      },
      'map-viewer': {
        title: mapViewer,
        subtitle: mapViewerDesc,
        img: getProductGlyph('map-viewer'),
        href: this.hrefLookup('map-viewer'),
      },
      'story-maps': {
        title: storyMaps,
        subtitle: storyMapsDesc,
        img: getProductGlyph('story-maps'),
        href: this.hrefLookup('story-maps'),
      },
      'experience-builder': {
        title: experienceBuilder,
        subtitle: experienceBuilderDesc,
        img: getProductGlyph('experience-builder'),
        href: this.hrefLookup('experience-builder'),
      },
      'dashboards': {
        title: dashboards,
        subtitle: dashboardsDesc,
        img: getProductGlyph('dashboards'),
        href: this.hrefLookup('dashboards'),
      },
    };
  }

  hrefLookup(predefined?: PredefinedOptions): string | undefined {
    console.log('hrefLookup', predefined);
    // const env = this.getEnvironment();
    // if (env) {
    //   return `${env}/create/${predefined}`;
    // } else {
    //   return undefined;
    // }
    return '';
  }

  renderPopover(): VNode[] {
    const panel = this.renderPanel();
    return [
      <calcite-popover
        referenceElement="create-popover-btn"
        overlayPositioning={this.popoverPositioning}
        placement={this.popoverPlacement}
        autoClose
        ref={(el: HTMLCalcitePopoverElement) => (this.popoverEl = el)}
      >
        {panel}
      </calcite-popover>,
      <calcite-action
        id="create-popover-btn"
        alignment="center"
        icon={this.popoverIcon}
        scale={this.scale}
        title={this.messages?.create}
        text={this.messages?.create}
      ></calcite-action>,
    ];
  }

  renderPanel(): VNode {
    const header = this.showHeader ? this.renderHeader() : null;
    const options = this.renderOptions();
    const panelClass = this.mode === 'inline' ? CSS.inlineContainer : CSS.popoverContainer;
    return (
      <div class={panelClass}>
        {header}
        {options}
      </div>
    );
  }

  renderHeader() {
    const { create, createSubheading } = this.messages;
    return (
      <div>
        <h2>{create}</h2>
        <p>{createSubheading}</p>
      </div>
    );
  }

  renderOptions() {
    return <nav>{this.options.map(option => this.renderOption(option))}</nav>;
  }

  renderOption(option: PredefinedOptions | CreateOption) {
    if (typeof option === 'string') {
      option = this?.CreateOptionsLookup?.[option];
    }
    const { title, subtitle, img, href } = option || {};
    return (
      <a class={CSS.option} href={href}>
        <span class={CSS.optionIcon} innerHTML={img}></span>
        <span class={CSS.optionText}>
          <h3 class={CSS.optionTitle}>{title}</h3>
          <p class={CSS.optionSubtitle}>{subtitle}</p>
        </span>
      </a>
    );
  }
}
