import { Component, Element, Event, EventEmitter, getMode, h, Host, Prop, State, VNode } from '@stencil/core';
import { CalciteCheckboxCustomEvent, CalciteInputCustomEvent } from '@esri/calcite-components';

import Export_T9n from '../../assets/t9n/instant-apps-export/resources.json';
import { ExportOutput, PopoverPlacement } from '../../interfaces/interfaces';
import { getLocaleComponentStrings } from '../../utils/locale';

const CSS = {
  baseLight: 'instant-apps-export calcite-mode-light',
  baseDark: 'instant-apps-export calcite-mode-dark',
  container: 'instant-apps-export__container',
};

@Component({
  tag: 'instant-apps-export',
  styleUrl: 'instant-apps-export.scss',
  shadow: true,
})
export class InstantAppsExport {
  @Element() hostElement: HTMLElement;

  /**
   * Export header name, updated in input.
   */
  @Prop({ mutable: true }) headerTitle?: string = '';

  /**
   * When `true`, include header theme in export.
   */
  @Prop({ mutable: true }) includeHeaderTheme?: boolean = false;

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
   * Show header theme checkbox.
   */
  @Prop() showIncludeHeaderTheme?: boolean = true;

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

  @State() baseClass = CSS.baseLight;
  @State() messages: typeof Export_T9n;

  /**
   * Emits when the export button is clicked.
   */
  @Event() exportBtnClick: EventEmitter<void>;

  popoverEl: HTMLCalcitePopoverElement;

  componentWillLoad(): void {
    this.baseClass = getMode(this.hostElement) === 'dark' ? CSS.baseDark : CSS.baseLight;
    this.getMessages();
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
        ref={el => (this.popoverEl = el!)}
      >
        {panel}
      </calcite-popover>,
      <calcite-action id="export-popover-btn" alignment="center" icon="print" scale={this.scale} text={this.messages?.toggleExport}></calcite-action>,
    ];
  }

  renderPanel(): VNode {
    const headerTitle = this.showHeaderTitle ? this.renderTitle() : null;
    const includeMap = this.showIncludeMap ? this.renderCheckbox('includeMap') : null;
    const includeLegend = this.showIncludeLegend ? this.renderCheckbox('includeLegend') : null;
    const includeHeaderTheme = this.showIncludeHeaderTheme ? this.renderCheckbox('includeHeaderTheme') : null;
    return (
      <div class={CSS.container}>
        {headerTitle}
        {includeMap}
        {includeLegend}
        {includeHeaderTheme}
        <calcite-button width="full" onClick={this.exportOnClick.bind(this)}>
          {this.messages?.export}
        </calcite-button>
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

  renderCheckbox(value: string): VNode {
    const checked = this[value];
    return (
      <calcite-label layout="inline-space-between">
        {this.messages?.[value]}
        <calcite-checkbox checked={checked} value={value} onCalciteCheckboxChange={this.checkboxOnChange.bind(this)}></calcite-checkbox>
      </calcite-label>
    );
  }

  checkboxOnChange(e: CalciteCheckboxCustomEvent<Event>): void {
    const { checked, value } = e.target;
    this[value] = checked;
  }

  updateHeaderTitle(e: CalciteInputCustomEvent<Event>): void {
    this.headerTitle = e.target.value;
  }

  exportOnClick(): void {
    this.output = {};
    if (this.showHeaderTitle) {
      this.output.headerTitle = this.headerTitle;
    }
    if (this.showIncludeHeaderTheme) {
      this.output.includeHeaderTheme = this.includeHeaderTheme;
    }
    if (this.showIncludeLegend) {
      this.output.includeLegend = this.includeLegend;
    }
    if (this.showIncludeMap) {
      this.output.includeMap = this.includeMap;
    }
    if (this.popoverEl != null) {
      this.popoverEl.open = false;
    }
    this.exportBtnClick.emit();
  }

  async getMessages(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.hostElement);
    this.messages = messages[0] as typeof Export_T9n;
  }
}
