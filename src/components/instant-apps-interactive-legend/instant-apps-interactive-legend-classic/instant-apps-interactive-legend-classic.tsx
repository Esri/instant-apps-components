import { Component, h, Prop, Element, State, forceUpdate } from '@stencil/core';

import {
  getUnivariateColorRampPreview,
  getUnivariateColorRampSize,
  getUnivariateColorRampMargin,
  getUnivariateAboveAndBelowRampElements,
  getUnivariateColorSizeRampElements,
} from '../support/univariateUtils';

import { isImageryStretchedLegend } from '../support/styleUtils';

import { validateInteractivity, generateData, handleFeatureCount, handleFilter, getIntLegendLayerData, checkNoneSelected } from '../support/helpers';

import { loadModules } from 'esri-loader';

import { FilterMode, IInteractiveLegendData } from './interfaces/interfaces';
import {
  ColorRampElement,
  ColorRampStop,
  HeatmapRampElement,
  ImageSymbolTableElementInfo,
  OpacityRampElement,
  PieChartRampElement,
  RampTitle,
  RendererTitle,
  StretchRampElement,
  UnivariateColorSizeRampElement,
} from '../../../interfaces/interfaces';

const CSS = {
  // jsapi styles
  service: 'esri-legend__service',
  label: 'esri-legend__service-label',
  layer: 'esri-legend__layer',
  groupLayer: 'esri-legend__group-layer',
  groupLayerChild: 'esri-legend__group-layer-child',
  layerTable: 'esri-legend__layer-table',
  layerTableSizeRamp: 'esri-legend__layer-table--size-ramp',
  layerChildTable: 'esri-legend__layer-child-table',
  layerCaption: 'esri-legend__layer-caption',
  layerBody: 'esri-legend__layer-body',
  layerRow: 'esri-legend__layer-row',
  layerCell: 'esri-legend__layer-cell',
  layerInfo: 'esri-legend__layer-cell esri-legend__layer-cell--info',
  imageryLayerStretchedImage: 'esri-legend__imagery-layer-image--stretched',
  imageryLayerCellStretched: 'esri-legend__imagery-layer-cell--stretched',
  imageryLayerInfoStretched: 'esri-legend__imagery-layer-info--stretched',
  symbolContainer: 'esri-legend__layer-cell esri-legend__layer-cell--symbols',
  symbol: 'esri-legend__symbol',
  rampContainer: 'esri-legend__ramps',
  sizeRamp: 'esri-legend__size-ramp',
  colorRamp: 'esri-legend__color-ramp',
  opacityRamp: 'esri-legend__opacity-ramp',
  borderlessRamp: 'esri-legend__borderless-ramp',
  rampTick: 'esri-legend__ramp-tick',
  rampFirstTick: 'esri-legend__ramp-tick-first',
  rampLastTick: 'esri-legend__ramp-tick-last',
  rampLabelsContainer: 'esri-legend__ramp-labels',
  rampLabel: 'esri-legend__ramp-label',
  univariateAboveAndBelowSymbol: 'esri-univariate-above-and-below-ramp__symbol',
  univariateAboveAndBelowLabel: 'esri-univariate-above-and-below-ramp__label',
  message: 'esri-legend__message',
  header: 'esri-widget__heading',
  hidden: 'esri-hidden',

  // instant-apps-interactive-legend
  interactiveLegendHeader: 'instant-apps-interactive-legend__header',
  layerCaptionBtnContainer: 'instant-apps-interactive-legend__layer-caption-btn-container',
  interactiveLayerRow: 'instant-apps-interactive-legend__layer-row--interactive',
  infoSelected: 'instant-apps-interactive-legend-element-info--selected',
};

const KEY = 'esri-legend__';
const GRADIENT_WIDTH = 24;
const univariateRampContainerStyles = { display: 'flex', alignItems: 'flex-start' };
const univariateColorRampContainerStyles = { marginLeft: '3px' };
const univariateColorRampStyles = { display: 'table-cell', verticalAlign: 'middle' };

@Component({
  tag: 'instant-apps-interactive-legend-classic',
  styleUrl: 'instant-apps-interactive-legend-classic.scss',
  scoped: true,
})
export class InstantAppsInteractiveLegendClassic {
  reactiveUtils: __esri.reactiveUtils;
  handles: __esri.Handles;
  intl: __esri.intl;

  @State()
  isLoading = true;

  @State()
  data: IInteractiveLegendData;

  @State()
  reRender = false;

  @State()
  intLegendId: string;

  /**
   * Legend View model from the 4.x ArcGIS API for JavaScript
   */
  @Prop()
  legendvm: __esri.LegendViewModel;

  @Element()
  el: HTMLElement;

  /**
   * Displays 'Zoom To' button - updates the extent of the view based on the selected legend infos.
   */
  @Prop()
  zoomTo = false;

  /**
   * Display individual counts and total counts for legend infos.
   */
  @Prop()
  featureCount = false;

  /**
   * Filter mode to use when filtering features.
   */
  @Prop()
  filterMode: FilterMode = {
    type: 'filter',
  };

  @Prop()
  messages;

  async componentWillLoad() {
    const [intl, reactiveUtils, Handles] = await loadModules(['esri/intl', 'esri/core/reactiveUtils', 'esri/core/Handles']);
    this.reactiveUtils = reactiveUtils;
    this.handles = new Handles();
    this.intl = intl;

    const observer = new MutationObserver(() => {
      this.reRender = !this.reRender;
    });
    observer.observe(document.body, {
      attributes: true,
    });
  }

  async componentDidLoad() {
    await this.reactiveUtils.whenOnce(() => this.legendvm);
    await (this.legendvm?.view?.map as __esri.WebMap).loadAll();
    this.data = await generateData(this.legendvm, this.reactiveUtils);

    this.reactiveUtils.on(
      () => this.legendvm?.activeLayerInfos,
      'change',
      async () => {
        this.data = await generateData(this.legendvm, this.reactiveUtils);
      },
    );

    if (this.featureCount) {
      const data = await handleFeatureCount(this.legendvm, this.data);
      this.data = data;

      this.handleFeatureCount();
    }

    const featureCountKey = 'feature-count';
    if (this.handles.has(featureCountKey)) this.handles.remove(featureCountKey);
    this.isLoading = false;
    this.reRender = !this.reRender;

    document.addEventListener('legendLayerCaption', () => {
      this.reRender = !this.reRender;
    });
  }

  render() {
    const activeLayerInfos = this.legendvm?.activeLayerInfos;
    const filteredLayers =
      activeLayerInfos &&
      activeLayerInfos
        .toArray()
        .map(activeLayerInfo => this.renderLegendForLayer(activeLayerInfo))
        .filter(layer => !!layer);

    return this.isLoading ? (
      <calcite-loader scale="m" label={this.messages?.loading} text={this.messages?.loading}></calcite-loader>
    ) : (
      <div class={this.el.classList.contains('calcite-theme-dark') ? 'calcite-theme-dark' : 'calcite-theme-light'}>
        {filteredLayers && filteredLayers.length ? filteredLayers : <div class={CSS.message}>{this.messages?.noLegend}</div>}
      </div>
    );
  }

  renderLegendForLayer(activeLayerInfo: __esri.ActiveLayerInfo) {
    if (this.data?.selectedLayerId !== activeLayerInfo?.layer.id) return;
    if (!activeLayerInfo.ready) {
      if (this.reactiveUtils) {
        this.reactiveUtils.when(
          () => activeLayerInfo?.ready,
          () => {
            this.reRender = !this.reRender;
          },
        );
      }
      return null;
    }

    const hasChildren = !!activeLayerInfo.children.length;
    const key = `${KEY}${(activeLayerInfo.layer as any).uid}-version-${activeLayerInfo.version}`;

    // const labelNode = activeLayerInfo.title ? Heading({ level: this.headingLevel, class: (CSS.header, CSS.label) }, activeLayerInfo.title) : null;

    if (hasChildren) {
      const layers = activeLayerInfo.children.map(childActiveLayerInfo => this.renderLegendForLayer(childActiveLayerInfo)).toArray();

      return (
        <div key={key} class={`${CSS.service} ${CSS.groupLayer}`}>
          <instant-apps-interactive-legend-caption
            data={this.data}
            legendvm={this.legendvm}
            feature-count={this.featureCount}
            activeLayerInfo={activeLayerInfo}
            messages={this.messages}
          ></instant-apps-interactive-legend-caption>
          {layers}
        </div>
      );
    }
    {
      const legendElements = activeLayerInfo.legendElements;

      if (legendElements && !legendElements.length) {
        return null;
      }

      const filteredElements = legendElements
        .map((legendElement, legendElementIndex) =>
          this.renderLegendForElement(legendElement, activeLayerInfo.layer as any, (activeLayerInfo as any).effectList, activeLayerInfo, legendElementIndex),
        )
        .filter(element => !!element);

      if (!filteredElements.length) {
        return null;
      }

      const layerClasses = !!activeLayerInfo.parent ? ` ${CSS.groupLayerChild}` : '';

      return (
        <div key={key} class={`${CSS.service}${layerClasses}`} tabIndex={0}>
          <instant-apps-interactive-legend-caption
            data={this.data}
            legendvm={this.legendvm}
            feature-count={this.featureCount}
            activeLayerInfo={activeLayerInfo}
            messages={this.messages}
          />
          <div class={CSS.layer}>{filteredElements}</div>
        </div>
      );
    }
  }

  renderLegendForElement(legendElement: any, layer: __esri.Layer, effectList: any, activeLayerInfo: __esri.ActiveLayerInfo, legendElementIndex: number, isChild?: boolean) {
    const isColorRamp = legendElement.type === 'color-ramp',
      isOpacityRamp = legendElement.type === 'opacity-ramp',
      isSizeRamp = legendElement.type === 'size-ramp';

    let content: any = null;

    const isInteractive = validateInteractivity(activeLayerInfo, legendElement, legendElementIndex);

    // build symbol table or size ramp
    const isNotRelationship = (activeLayerInfo?.layer as __esri.FeatureLayer)?.renderer?.authoringInfo?.type !== 'relationship'; // TEMP
    if ((legendElement.type === 'symbol-table' || isSizeRamp) && isNotRelationship) {
      const rows = (legendElement.infos as any)
        .map((info: any, infoIndex: number) =>
          this.renderLegendForElementInfo(info, layer, effectList, isSizeRamp, legendElement, activeLayerInfo, legendElementIndex, infoIndex, isInteractive),
        )
        .filter((row: any) => !!row);

      if (rows.length) {
        content = <div class={CSS.layerBody}>{rows}</div>;
      }
    } else if (legendElement.type === 'color-ramp' || legendElement.type === 'opacity-ramp' || legendElement.type === 'heatmap-ramp' || legendElement.type === 'stretch-ramp') {
      content = this.renderLegendForRamp(legendElement, layer.opacity);
    } else if (legendElement.type === 'relationship-ramp') {
      content = (
        <span class={CSS.layerRow}>
          <b>{this.messages?.relationship?.notSupported}</b>
        </span>
      );
    } else if (legendElement.type === 'pie-chart-ramp') {
      content = this.renderPieChartRamp(legendElement);
    } else if (legendElement.type === 'univariate-above-and-below-ramp') {
      content = this.renderUnivariateAboveAndBelowRamp(legendElement, layer.opacity, effectList);
    } else if (legendElement.type === 'univariate-color-size-ramp') {
      content = this.renderUnivariateColorSizeRamp(legendElement, layer.opacity, effectList);
    }

    if (!content) return null;

    const titleObj = legendElement.title;
    let title: string | null = null;

    if (typeof titleObj === 'string') {
      title = titleObj;
    } else if (titleObj) {
      const genTitle = this.getTitle(this.messages, titleObj, isColorRamp || isOpacityRamp);

      if (this.isRendererTitle(titleObj, isColorRamp || isOpacityRamp) && titleObj.title) {
        title = `${(titleObj as RendererTitle).title} (${genTitle})`;
      } else {
        title = genTitle as any;
      }
    }

    const tableClass = isChild ? CSS.layerChildTable : CSS.layerTable;

    const expanded = this.getExpanded(activeLayerInfo, legendElementIndex);

    const caption = (
      <instant-apps-interactive-legend-layer-caption
        data={this.data}
        legendvm={this.legendvm}
        activeLayerInfo={activeLayerInfo}
        layer={layer as __esri.FeatureLayer}
        titleText={title as string}
        legendElementIndex={legendElementIndex}
        zoomTo={this.zoomTo}
        isInteractive={isInteractive}
        expanded={expanded}
        messages={this.messages}
      />
    );

    const tableClasses = isSizeRamp || !isChild ? ` ${CSS.layerTableSizeRamp}` : '';
    return (
      <div class={`${tableClass}${tableClasses}`}>
        {caption}
        {expanded === false ? null : content}
      </div>
    );
  }

  renderPieChartRamp(legendElement: PieChartRampElement) {
    return <div innerHTML={`${legendElement.preview?.outerHTML}`}></div>;
  }

  async renderUnivariateAboveAndBelowRamp(legendElement: UnivariateColorSizeRampElement, opacity: number, effectList: any) {
    const { sizeRampElement, colorRampElement } = getUnivariateAboveAndBelowRampElements(legendElement, opacity);

    if (!sizeRampElement) {
      return null;
    }

    const colorRampAboveHeight = getUnivariateColorRampSize(sizeRampElement, 'above', true);
    const colorRampBelowHeight = getUnivariateColorRampSize(sizeRampElement, 'below', true);
    const colorRampWidth = 12;
    const colorRampAbovePreview = (await getUnivariateColorRampPreview(colorRampElement, {
      width: colorRampWidth,
      height: colorRampAboveHeight,
      rampAlignment: 'vertical',
      opacity,
      type: 'above',
      effectList,
    })) as any;
    const colorRampBelowPreview = (await getUnivariateColorRampPreview(colorRampElement, {
      width: colorRampWidth,
      height: colorRampBelowHeight,
      rampAlignment: 'vertical',
      opacity,
      type: 'below',
      effectList,
    })) as any;
    const colorRampTopMargin = getUnivariateColorRampMargin(sizeRampElement);

    const labels = (sizeRampElement as any).infos.map(stop => stop.label);
    const aboveRampLabels = labels.map((label, index) => {
      const isStartLabel = index === 0;
      const isMidLabel = index === 2;

      return isStartLabel ? (
        <div key={index} class={label ? (colorRampAbovePreview ? CSS.univariateAboveAndBelowLabel : CSS.rampLabel) : ''}>
          {label}
        </div>
      ) : isMidLabel ? (
        <div />
      ) : null;
    });
    const endIndex = labels.length - 1;
    const midIndex = Math.floor(labels.length / 2);
    const belowRampLabels = labels.map((label, index) => {
      const isEndLabel = index === endIndex;
      const isMidLabel = index === midIndex;

      return isMidLabel || isEndLabel ? (
        <div key={index} class={label ? (colorRampAbovePreview ? CSS.univariateAboveAndBelowLabel : CSS.rampLabel) : ''}>
          {label}
        </div>
      ) : null;
    });

    const sizeRampPreviewStyles = { display: 'table-cell', verticalAlign: 'middle' };
    const colorRampPreviewStyles = { marginTop: `${colorRampTopMargin}px` };
    const colorRampAboveLabelStyles = { height: `${colorRampAboveHeight}px` };
    const colorRampBelowLabelStyles = { height: `${colorRampBelowHeight}px` };

    return (
      <div key="univariate-above-and-below-ramp-preview" style={univariateRampContainerStyles}>
        <div class={CSS.layerBody}>
          {(sizeRampElement as any).infos.map((info, i) => (
            <div class={`${CSS.layerRow} ${CSS.sizeRamp}`}>
              <div class={CSS.symbol} style={sizeRampPreviewStyles} innerHTML={`${info.preview.outerHTML}`}></div>
              {!colorRampAbovePreview && i % 2 === 0 ? <div class={CSS.layerInfo}>{labels[i]}</div> : null}
            </div>
          ))}
        </div>
        {colorRampAbovePreview ? (
          <div style={colorRampPreviewStyles} key="color-ramp-preview">
            <div style={univariateColorRampContainerStyles}>
              <div style={univariateColorRampStyles}>
                <div class={CSS.rampContainer}>{colorRampAbovePreview}</div>
              </div>
              <div style={univariateColorRampStyles}>
                <div class={CSS.rampLabelsContainer} style={colorRampAboveLabelStyles}>
                  {aboveRampLabels}
                </div>
              </div>
            </div>
            <div style={univariateColorRampContainerStyles}>
              <div style={univariateColorRampStyles}>
                <div class={CSS.rampContainer}>{colorRampBelowPreview}</div>
              </div>
              <div style={univariateColorRampStyles}>
                <div class={CSS.rampLabelsContainer} style={colorRampBelowLabelStyles}>
                  {belowRampLabels}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  renderUnivariateColorSizeRamp(legendElement: UnivariateColorSizeRampElement, opacity: number, effectList: any) {
    const { sizeRampElement, colorRampElement } = getUnivariateColorSizeRampElements(legendElement);

    if (!sizeRampElement) {
      return null;
    }

    const colorRampTopMargin = getUnivariateColorRampMargin(sizeRampElement);
    const colorRampWidth = 12;
    const colorRampHeight = getUnivariateColorRampSize(sizeRampElement, 'full', false);
    const colorRampPreview = getUnivariateColorRampPreview(colorRampElement, {
      width: colorRampWidth,
      height: colorRampHeight,
      rampAlignment: 'vertical',
      opacity,
      type: 'full',
      effectList,
    });
    const endIndex = (sizeRampElement as any).infos.length - 1;
    const labels = (sizeRampElement as any).infos.map((stop, index) =>
      index === 0 || index === endIndex ? (
        <div key={index} class={stop.label ? (colorRampElement ? CSS.univariateAboveAndBelowLabel : CSS.rampLabel) : ''}>
          {stop.label}
        </div>
      ) : null,
    );
    const sizeRampPreviewStyles = { display: 'table-cell', verticalAlign: 'middle' };
    const colorRampPreviewStyles = { marginTop: `${colorRampTopMargin}px` };
    const colorRampLabelStyles = { height: `${colorRampHeight}px` };

    return (
      <div key="univariate-above-and-below-ramp-preview" style={univariateRampContainerStyles}>
        <div class={CSS.layerBody}>
          {(sizeRampElement as any).infos.map(info => (
            <div class={`${CSS.layerRow} ${CSS.sizeRamp}`}>
              <div class={CSS.symbol} style={sizeRampPreviewStyles} innerHTML={`${info.preview.outerHTML}`}></div>
            </div>
          ))}
        </div>
        <div style={colorRampPreviewStyles} key="color-ramp-preview">
          <div style={univariateColorRampContainerStyles}>
            <div style={univariateColorRampStyles}>
              <div class={CSS.rampContainer}>{colorRampPreview}</div>
            </div>
            <div style={univariateColorRampStyles}>
              <div class={CSS.rampLabelsContainer} style={colorRampLabelStyles}>
                {labels}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderLegendForRamp(legendElement: ColorRampElement | StretchRampElement | OpacityRampElement | HeatmapRampElement, opacity: number) {
    const rampStops: any[] = legendElement.infos;
    const isOpacityRamp = legendElement.type === 'opacity-ramp';
    const isHeatmapRamp = legendElement.type === 'heatmap-ramp';
    const isStretchRamp = legendElement.type === 'stretch-ramp';

    const rampDiv = legendElement.preview;
    const opacityRampClass = isOpacityRamp ? CSS.opacityRamp : '';

    if (rampDiv) {
      rampDiv.classList.add(CSS.colorRamp);
      if (opacityRampClass) rampDiv.classList.add(opacityRampClass);
    }

    if (opacity != null && rampDiv) {
      rampDiv.style.opacity = opacity.toString();
    }

    const labelsContent = rampStops.map(stop => (
      <div class={stop.label ? CSS.rampLabel : ''}>{isHeatmapRamp ? this.messages[stop.label] || stop.label : isStretchRamp ? this.getStretchStopLabel(stop) : stop.label}</div>
    ));

    const symbolContainerStyles = { width: `${GRADIENT_WIDTH}px` },
      rampLabelsContainerStyles = { height: rampDiv?.style?.height };
    return (
      <div class={CSS.layerRow}>
        <div class={CSS.symbolContainer} style={{ ...symbolContainerStyles }}>
          <div
            ref={el => {
              el?.appendChild(rampDiv as HTMLElement);
            }}
            class={CSS.rampContainer}
          ></div>
        </div>
        <div class={CSS.layerInfo}>
          <div class={CSS.rampLabelsContainer} style={{ ...rampLabelsContainerStyles }}>
            {labelsContent}
          </div>
        </div>
      </div>
    );
  }

  getStretchStopLabel(stop: ColorRampStop): String {
    return stop.label
      ? this.messages[stop.label] +
          ': ' +
          (typeof stop.value === 'string'
            ? stop.value
            : this.intl.formatNumber(stop.value, {
                style: 'decimal',
                notation: stop.value.toString().includes('e') ? 'scientific' : 'standard',
              }))
      : '';
  }

  renderLegendForElementInfo(
    elementInfo: any,
    layer: __esri.Layer,
    effectList: any,
    isSizeRamp: boolean,
    legendElement: any,
    activeLayerInfo: __esri.ActiveLayerInfo,
    legendElementIndex: number,
    infoIndex: number,
    isInteractive: boolean,
  ) {
    // nested
    if (elementInfo.type) {
      return this.renderLegendForElement(elementInfo, layer, effectList, activeLayerInfo, legendElementIndex, true);
    }

    let content;
    const isStretched = !isImageryStretchedLegend(layer as __esri.ImageryLayer, legendElement.type);

    if (elementInfo.preview) {
      content = <div class={CSS.symbol} innerHTML={`${elementInfo.preview.outerHTML}`}></div>;
    } else if (elementInfo.src) {
      content = this.renderImage(elementInfo, layer, isStretched);
    }

    if (!content) {
      return null;
    }

    const imageryLayerInfoStretched = isStretched ? ` ${CSS.imageryLayerInfoStretched}` : '';
    const sizeRamp = !isStretched && isSizeRamp ? ` ${CSS.sizeRamp}` : '';

    let selected;

    if (this.data) {
      const data = getIntLegendLayerData(layer as __esri.FeatureLayer, this.data);
      const category = data?.categories?.get(elementInfo?.label);
      // If no items are selected, then apply 'selected' style to all -- UX
      const noneSelected = checkNoneSelected(data);
      selected = noneSelected || category?.selected;
    }
    return isInteractive ? (
      // Regular LegendElementInfo
      <button
        onClick={() => {
          const dataFromActiveLayerInfo = this.data?.[layer?.id];
          handleFilter(dataFromActiveLayerInfo, elementInfo, infoIndex, this.filterMode);
          this.reRender = !this.reRender;
        }}
        class={`${CSS.layerRow} ${CSS.interactiveLayerRow}${selected ? ` ${CSS.infoSelected}` : ''}`}
      >
        <div class={`${CSS.symbolContainer}${imageryLayerInfoStretched}${sizeRamp}`}>{content}</div>
        <div class={`${CSS.layerInfo}${imageryLayerInfoStretched}`}>{this.getTitle(this.messages, elementInfo.label, false) || ''}</div>
        {this.featureCount ? (
          <instant-apps-interactive-legend-count
            categoryId={elementInfo.label}
            layerId={activeLayerInfo.layer.id}
            data={this.data}
            legendvm={this.legendvm}
            messages={this.messages}
          ></instant-apps-interactive-legend-count>
        ) : null}
      </button>
    ) : (
      <div class={CSS.layerRow}>
        <div class={`${CSS.symbolContainer}${imageryLayerInfoStretched}${sizeRamp}`}>{content}</div>
        <div class={`${CSS.layerInfo}${imageryLayerInfoStretched}`}>{this.getTitle(this.messages, elementInfo.label, false) || ''}</div>
      </div>
    );
  }

  renderImage(elementInfo: ImageSymbolTableElementInfo, layer: __esri.Layer, isStretched: boolean) {
    const { label, src, opacity } = elementInfo;

    const imageryLayerStretchedImage = isStretched ? ` ${CSS.imageryLayerStretchedImage}` : '';
    const symbol = !isStretched ? ` ${CSS.symbol}` : '';

    const dynamicStyles = {
      opacity: `${opacity != null ? opacity : layer.opacity}`,
    };

    return (
      <img
        alt={this.getTitle(this.messages, label, false) as string}
        src={src}
        // border={0}
        width={elementInfo.width}
        height={elementInfo.height}
        class={`$${imageryLayerStretchedImage}${symbol}`}
        style={dynamicStyles}
      />
    );
  }

  getTitle(
    messages: any, // LegendMessages,
    titleInfo: any, // RendererTitle | DotDensityTitle | RampTitle | StretchMultibandTitle | ClusterTitle | string,
    isRamp: boolean,
  ): string | number | undefined {
    if (!titleInfo) {
      return undefined;
    }

    if (typeof titleInfo === 'string' || typeof titleInfo === 'number') {
      return titleInfo;
    }

    if ('value' in titleInfo || 'unit' in titleInfo) {
      return this.intl.substitute(messages.dotValue, titleInfo);
    }

    if ('colorName' in titleInfo || 'bandName' in titleInfo) {
      return messages[titleInfo.colorName] + ': ' + (messages[titleInfo.bandName] || titleInfo.bandName);
    }

    if ('showCount' in titleInfo) {
      return titleInfo.showCount ? messages['clusterCountTitle'] : null;
    }

    // let bundleKey: "showField" | keyof LegendMessages = null;
    let bundleKey: any = null;

    if (this.isRampTitle(titleInfo, isRamp)) {
      bundleKey = titleInfo.ratioPercentTotal
        ? 'showRatioPercentTotal'
        : titleInfo.ratioPercent
        ? 'showRatioPercent'
        : titleInfo.ratio
        ? 'showRatio'
        : titleInfo.normField
        ? 'showNormField'
        : titleInfo.field
        ? 'showField'
        : null;
    } else if (this.isRendererTitle(titleInfo, isRamp)) {
      bundleKey = titleInfo.normField ? 'showNormField' : titleInfo.normByPct ? 'showNormPct' : titleInfo.field ? 'showField' : null;
    }

    return bundleKey
      ? this.intl.substitute(bundleKey === 'showField' ? '{field}' : messages[bundleKey], {
          field: titleInfo.field,
          normField: titleInfo.normField,
        })
      : '';
  }

  isRampTitle(_titleInfo: any, isRamp: boolean): _titleInfo is RampTitle {
    return isRamp;
  }

  isRendererTitle(_titleInfo: any, isRamp: boolean): _titleInfo is RendererTitle {
    return !isRamp;
  }

  handleFeatureCount() {
    this.handles.add(
      this.reactiveUtils.when(
        () => !this.legendvm.view?.updating,
        async () => {
          const selector = 'instant-apps-interactive-legend-count';
          const countNodes = document.querySelectorAll(selector);
          await handleFeatureCount(this.legendvm, this.data);
          countNodes.forEach(countNode => forceUpdate(countNode));
        },
      ),
    );
  }

  getExpanded(activeLayerInfo: __esri.ActiveLayerInfo, legendElementIndex: number): boolean {
    return this.data?.[activeLayerInfo?.layer?.id]?.expanded?.[legendElementIndex];
  }
}