/*
 *   Copyright (c) 2024 Esri
 *   All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 *   This material is licensed for use under the Esri Master License Agreement (MLA), and is bound by the terms of that agreement.
 *   You may redistribute and use this code without modification, provided you adhere to the terms of the MLA and include this copyright notice.
 *   See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
 */

import { Component, Element, h, Host, Prop, State, VNode, Watch } from '@stencil/core';

// import Create_T9N from '../../assets/t9n/instant-apps-create/resources.json';
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
  optionTextWrapper: 'instant-apps-create__option-text-wrapper',
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
   * Renders tool as a popover with a trigger button, or inline to place in a custom container.
   */
  @Prop({ reflect: true }) mode: 'popover' | 'inline' = 'inline';

  /**
   * Determines the type of positioning to use for the overlaid content. Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout. `"fixed"` value should be used to escape an overflowing parent container, or when the reference element's position CSS property is `"fixed"`.
   */
  @Prop() popoverPositioning?: 'absolute' | 'fixed' = 'absolute';

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   */
  @Prop() popoverPlacement?: PopoverPlacement = 'auto';

  /**
   * Show header with title and subtitle
   */
  @Prop() showHeader?: boolean = true;

  /**
   * Content item to create with
   */
  @Prop() content: __esri.WebMap | __esri.WebScene | __esri.PortalGroup | undefined;

  @Watch('content')
  contentChanged() {
    Object.keys(this.CreateOptionsLookup).forEach(key => {
      this.CreateOptionsLookup[key].href = this.hrefLookup(key as PredefinedOptions);
    });
  }

  @Prop() options: (PredefinedOptions | CreateOption)[] = ['instant-apps', 'map-viewer', 'story-maps', 'experience-builder', 'dashboards'];

  @Prop() portal: __esri.Portal;

  @State() baseClass = CSS.baseLight;
  @State() messages: any = {} as any;
  @State() CreateOptionsLookup: Record<PredefinedOptions, CreateOption>;

  handles: __esri.Handles | null;
  popoverEl: any;

  componentWillLoad() {
    this.baseClass = getMode(this.el) === 'dark' ? CSS.baseDark : CSS.baseLight;
    this.initializeModules();
  }

  async componentDidLoad() {
    try {
      await getMessages(this);
    } catch {
    } finally {
      this.initializePredefinedOptions();
    }
  }

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
    const { instantApps, instantAppsDesc, mapViewer, mapViewerDesc, arcgisStoryMaps, storyMapsDesc, experienceBuilder, experienceBuilderDesc, dashboards, dashboardsDesc } =
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
        title: arcgisStoryMaps,
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
    const portalUrl = this.getBaseUrl(this.portal);
    const env = this._getEnvironment(portalUrl);
    const contentParam = this.contentHref();

    switch (predefined) {
      case 'instant-apps':
        return `${portalUrl}/apps/instantgallery/index.html?${contentParam}`;
      case 'dashboards':
        return `${portalUrl}/apps/dashboards/new#id=${(this.content as any)?.portalItem?.id}`;
      case 'map-viewer':
        return `${portalUrl}/apps/mapviewer/index.html?${contentParam}`;
      case 'story-maps':
        return `https://storymaps${env === 'prod' ? '' : env}.arcgis.com/stories/new?${contentParam}`;
      case 'experience-builder':
        return `https://experience${env === 'prod' ? '' : env}.arcgis.com/builder/page/template/?${contentParam}`;
    }
    return '';
  }

  contentHref() {
    if ((this?.content as __esri.WebMap)?.portalItem?.type === 'Web Map') {
      return `webmap=${(this.content as __esri.WebMap).portalItem.id}`;
    } else if ((this?.content as __esri.WebScene)?.portalItem?.type === 'Web Scene') {
      return `webscene=${(this.content as __esri.WebScene).portalItem.id}`;
    } else if (typeof (this?.content as __esri.PortalGroup)?.fetchMembers === 'function') {
      return `group=${(this.content as __esri.PortalGroup).id}`;
    } else {
      return '';
    }
  }

  // getBaseUrl
  private getBaseUrl(portal?: __esri.Portal): string {
    if (!portal) {
      return '';
    }
    const { customBaseUrl, portalHostname, urlKey } = portal;
    const { protocol } = location;
    const url = urlKey ? `${urlKey}.${customBaseUrl}` : portalHostname;
    return `${protocol}//${url}`;
  }

  private _getEnvironment(url: string): 'dev' | 'qa' | 'prod' {
    let hostname: any = null;
    try {
      hostname = new URL(url)?.hostname;
    } catch (e) {}
    if (hostname == null || hostname.indexOf('arcgis.com') === -1) {
      return 'dev';
    } else {
      return (hostname.indexOf('devext') !== -1 && 'dev') || (hostname.indexOf('qaext') !== -1 && 'qa') || 'prod';
    }
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
        // HARDCODED IN EN
        label="Create panel"
      >
        {panel}
      </calcite-popover>,
      <calcite-action id="create-popover-btn" alignment="center" icon={this.popoverIcon} title={this.messages?.create} text={this.messages?.create}></calcite-action>,
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
      <div class={CSS.header}>
        <h3>{create}</h3>
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
      <a class={CSS.option} href={href} target="_blank">
        <span class={CSS.optionIcon} innerHTML={img}></span>
        <span class={CSS.optionText}>
          <span class={CSS.optionTextWrapper}>
            <h3 class={CSS.optionTitle}>{title}</h3>
            <calcite-icon scale="s" icon="launch"></calcite-icon>
          </span>
          <p class={CSS.optionSubtitle}>{subtitle}</p>
        </span>
      </a>
    );
  }
}
