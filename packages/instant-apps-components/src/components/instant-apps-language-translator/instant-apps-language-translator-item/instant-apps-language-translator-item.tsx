import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { LocaleSettingItem, LocaleUIData } from '../support/interfaces';
import { languageTranslatorState, store } from '../support/store';
import { getT9nData, getUIDataKeys, writeToPortalItemResource } from '../support/utils';
import { debounceCalciteInput } from '../support/debounce';

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
  infoIcon: `${BASE}__info-icon`,
  infoButton: `${BASE}__info-button`,
  tip: `${BASE}__tip`,
};

@Component({
  tag: 'instant-apps-language-translator-item',
  styleUrl: 'instant-apps-language-translator-item.scss',
  shadow: true,
})
export class InstantAppsLanguageTranslatorItem {
  translatedLangInput;

  @Element()
  el: HTMLInstantAppsLanguageTranslatorElement;

  @Prop()
  fieldName: string;

  @Prop()
  translatedLanguageLabel: string;

  @Event()
  translatorItemDataUpdated: EventEmitter<void>;

  render() {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const tip = this.getTip(uiDataItem);
    return (
      <Host>
        <div class={BASE}>
          {this.renderUserLocaleSection(uiDataItem)}
          {this.renderTranslatedLanguageSection()}
        </div>
        <calcite-popover reference-element={`${this.fieldName}goTo`} auto-close="true" placement="trailing">
          <span class={CSS.uiLocationPopoverContent}>
            <span class={CSS.uiLocationItems}>{this.getUILocation(uiDataItem)}</span>
            {tip ? <span class={CSS.tip}>{tip}</span> : null}
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
          <button id={`${this.fieldName}goTo`} class={CSS.infoButton}>
            <calcite-icon class={CSS.infoIcon} icon="information" scale="s" />
          </button>
        </div>
        {uiDataItem?.expanded ? (
          <calcite-input data-field-name={this.fieldName} value={value} onCalciteInputInput={debounceCalciteInput(this.handleUserLocaleInput, this.updateAppSettingStore)} />
        ) : null}
      </div>
    );
  }

  renderTranslatedLanguageSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const isSelected = uiDataItem?.selected;
    const locale = store.get('currentLanguage') as string;
    const data = store.get('portalItemResourceT9n');
    const value = data?.[locale]?.[this.fieldName];
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
          <calcite-input
            ref={node => (this.translatedLangInput = node)}
            data-field-name={this.fieldName}
            onFocus={this.handleSelection}
            onCalciteInputInput={debounceCalciteInput(this.handleTranslatedLanguageInput.bind(this), this.updateT9nStore.bind(this))}
            value={value}
          >
            <calcite-button
              onclick={e => {
                this.translatedLangInput.selectText();
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
      const fieldName = (node?.target as HTMLCalciteInputElement)?.getAttribute('data-field-name');
      if (key === fieldName) {
        (uiData[key] as LocaleSettingItem).selected = true;
      }
    });
    store.set('uiData', uiData);
  }

  // Write data to portal item resource
  async handleTranslatedLanguageInput(): Promise<void> {
    store.set('processing', false);
    store.set('saving', true);
    try {
      const resource = store.get('portalItemResource') as __esri.PortalItemResource;
      const data = store.get('portalItemResourceT9n');
      await writeToPortalItemResource(resource, data);
      store.set('saving', false);
      this.translatorItemDataUpdated.emit();
    } catch (err) {
      console.error('Error writing to portal item resource: ', err);
      store.set('saving', false);
    }
  }

  updateT9nStore(e: CustomEvent): void {
    store.set('processing', true);
    const currentLanguage = store.get('currentLanguage') as string;
    const composedPath = e.composedPath();
    const node = composedPath[0] as HTMLCalciteInputElement;
    const fieldName = node.getAttribute('data-field-name') as string;
    const dataToWrite = { [fieldName]: node.value };
    const updatedData = getT9nData(currentLanguage, dataToWrite);
    store.set('portalItemResourceT9n', updatedData);
  }

  // Write data to template app item draft
  async handleUserLocaleInput(e: CustomEvent): Promise<void> {
    console.log('Called only after user has finished typing.');
  }

  updateAppSettingStore(e: CustomEvent): void {
    console.log('Called immediately...');
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

  getTip(uiDataItem: LocaleSettingItem): string {
    const { tip } = uiDataItem;
    return tip;
  }
}
