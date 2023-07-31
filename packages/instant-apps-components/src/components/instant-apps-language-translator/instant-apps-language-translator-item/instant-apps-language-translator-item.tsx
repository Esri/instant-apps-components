import { Component, Host, Prop, h } from '@stencil/core';
import { LocaleSettingItem, LocaleUIData } from '../support/interfaces';
import { languageTranslatorState, store } from '../support/store';
import { getUIDataKeys } from '../support/utils';

const BASE = 'instant-apps-language-translator-item';

const CSS = {
  section: `${BASE}__section`,
  selected: `${BASE}__section--selected`,
  collapsed: `${BASE}__section--collapsed`,
  topRow: `${BASE}__top-row`,
  labelContainer: `${BASE}__label-container`,
  label: `${BASE}__label`,
  uiLocationPopoverContent: `${BASE}__ui-location-popover-content`,
  uiLocationItems: `${BASE}__ui-location-items`,
  uiLocationItem: `${BASE}__ui-location-item`,
};

@Component({
  tag: 'instant-apps-language-translator-item',
  styleUrl: 'instant-apps-language-translator-item.scss',
  shadow: true,
})
export class InstantAppsLanguageTranslatorItem {
  @Prop()
  fieldName: string;

  @Prop()
  translatedLanguageLabel: string;

  render() {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    return (
      <Host>
        <div class={BASE}>
          {this.renderUserLocaleSection(uiDataItem)}
          {this.renderTranslatedLanguageSection()}
        </div>
        <calcite-popover reference-element={`${this.fieldName}goTo`} auto-close="true" placement="trailing">
          <span class={CSS.uiLocationPopoverContent}>
            <span class={CSS.uiLocationItems}>{this.getUILocation(uiDataItem)}</span>
            <calcite-link>Go to setting</calcite-link>
          </span>
        </calcite-popover>
      </Host>
    );
  }

  renderUserLocaleSection(uiDataItem: LocaleSettingItem): HTMLDivElement {
    const userLocaleData = uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const value = userLocaleData?.value;
    const isSelected = uiDataItem?.selected;
    return (
      <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ''}`}>
        <div class={CSS.topRow}>
          <div class={CSS.labelContainer}>
            {this.renderExpandCollapseButton()}
            <calcite-icon icon="list-button" scale="s" />
            <span class={CSS.label}>{label}</span>
          </div>
          <calcite-button id={`${this.fieldName}goTo`} icon-start="magnifying-glass-plus" appearance="outline" round={true} scale="s" />
        </div>
        {uiDataItem?.expanded ? <calcite-input data-field-name={this.fieldName} value={value} onFocus={this.handleSelection} /> : null}
      </div>
    );
  }

  renderTranslatedLanguageSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const isSelected = uiDataItem?.selected;
    return (
      <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ''}`}>
        <div class={CSS.topRow}>
          <div class={CSS.labelContainer}>
            {this.renderExpandCollapseButton()}
            <calcite-icon icon="list-button" scale="s" />
            <span class={CSS.label}>{this.translatedLanguageLabel}</span>
          </div>
        </div>
        {uiDataItem?.expanded ? (
          <calcite-input data-field-name={this.fieldName} onFocus={this.handleSelection}>
            <calcite-button
              onclick={e => {
                const input = e.target.parentNode;
                const value = input.value;
                navigator.clipboard.writeText(value);
              }}
              slot="action"
              icon-start="duplicate"
              appearance="outline-fill"
            />
          </calcite-input>
        ) : null}
      </div>
    );
  }

  renderExpandCollapseButton(): HTMLCalciteActionElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    return <calcite-action onClick={this.handleExpand.bind(this, uiDataItem)} icon={uiDataItem?.expanded ? 'chevron-down' : 'chevron-right'} scale="s" appearance="transparent" />;
  }

  getUIDataItem(): LocaleSettingItem | undefined {
    if (!languageTranslatorState.uiData) return;
    return languageTranslatorState.uiData[this.fieldName] as LocaleSettingItem;
  }

  handleExpand(uiDataItem: LocaleSettingItem): void {
    uiDataItem.expanded = !uiDataItem.expanded;
    const uiData = {
      ...languageTranslatorState.uiData,
      [this.fieldName]: uiDataItem as LocaleSettingItem,
    } as LocaleUIData;
    store.set('uiData', uiData);
  }

  handleSelection(node: FocusEvent): void {
    const uiData = { ...languageTranslatorState.uiData } as LocaleUIData;
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach(key => ((uiData[key] as LocaleSettingItem).selected = false));
    uiDataKeys.forEach(key => {
      if (key === (node?.target as HTMLCalciteInputElement)?.getAttribute('data-field-name')) {
        (uiData[key] as LocaleSettingItem).selected = true;
      }
    });
    store.set('uiData', uiData);
  }

  getUILocation(uiDataItem: LocaleSettingItem): HTMLElement[] {
    const { uiLocation, userLocaleData } = uiDataItem;
    const { section, subsection } = uiLocation;
    const breadCrumbLabels = [section.label, subsection.label, userLocaleData.label].filter(uiLocationStr => !!uiLocationStr);
    return breadCrumbLabels.map((breadCrumbLabel, breadCrumbLabelIndex) => (
      <span class={CSS.uiLocationItem}>
        <span>{breadCrumbLabel}</span>
        {breadCrumbLabelIndex !== breadCrumbLabels.length - 1 ? <calcite-icon icon="chevron-right" scale="s" /> : null}
      </span>
    ));
  }
}
