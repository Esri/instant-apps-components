import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

import { getT9nData, getUIDataKeys, isCalciteModeDark } from '../support/utils';
import { languageTranslatorState, store } from '../support/store';
import { EInputType, ESettingType, EIcons, ECalciteMode } from '../support/enum';
import { LocaleSettingItem, LocaleUIData, InputType, SettingType } from '../support/interfaces';

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
  scoped: true,
})
export class InstantAppsLanguageTranslatorItem {
  userLocaleInput: HTMLCalciteInputElement;
  userEditorWrapper: HTMLInstantAppsCkeditorWrapperElement;

  translatedLangInput: HTMLCalciteInputElement;
  translatedEditorWrapper: HTMLInstantAppsCkeditorWrapperElement;

  @Element()
  el: HTMLInstantAppsLanguageTranslatorElement;

  /**
   * Unique identifier tied to an associated setting in an app.
   */
  @Prop()
  fieldName: string;

  /**
   * Label of item in currently selected language.
   */
  @Prop()
  translatedLanguageLabel: string;

  /**
   * Determines whether to use a regular input or text editor
   */
  @Prop()
  type: SettingType;

  /**
   * Function to be called when the value in a user locale input has changed. This function will have 2 arguments - fieldName and value - and will return a promise. 
   */
  @Prop()
  userLocaleInputOnChangeCallback: (fieldName: string, value: string) => Promise<void>;

   /**
   * Function that is called when the value in a translated locale's input has changed. This function will have 4 arguments - fieldName, value, locale, and resource - and will return a promise. The callback function can be used to construct the data of key-value pairs that will be written to the portal item resource. 
   */
  @Prop()
  translatedLocaleInputOnChangeCallback: (fieldName: string, value: string, locale: string, resource: __esri.PortalItemResource) => Promise<void>;

  /**
   * Fires when a translation input's value has changed.
   */
  @Event()
  translatorItemDataUpdated: EventEmitter<void>;

  componentDidLoad() {
    this.init();
  }

  init(): void {
    if (this.type === ESettingType.TextEditor) store.onChange('uiData', () => this.handleEditorCollapse());
  }

  render() {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    return (
      <Host class={`${isCalciteModeDark() ? ECalciteMode.Dark : ECalciteMode.Light}`}>
        {this.renderBase(uiDataItem)}
        {this.renderPopover(uiDataItem)}
      </Host>
    );
  }

  renderBase(uiDataItem: LocaleSettingItem): HTMLDivElement {
    return (
      <div class={BASE}>
        {this.renderUserLocaleSection(uiDataItem)}
        {this.renderTranslatedLanguageSection()}
      </div>
    );
  }

  renderUserLocaleSection(uiDataItem: LocaleSettingItem): HTMLDivElement {
    const userLocaleData = uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const value = userLocaleData?.value;
    const isSelected = uiDataItem?.selected;
    const selected = isSelected ? ` ${CSS.selected}` : '';
    return (
      <div class={`${CSS.section}${selected}`}>
        {this.renderItemHeader(EInputType.User, label)}
        {uiDataItem?.expanded ? this.renderInput(value, EInputType.User) : null}
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
        {this.renderItemHeader(EInputType.Translation, this.translatedLanguageLabel)}
        {uiDataItem?.expanded ? this.renderInput(value, EInputType.Translation) : null}
      </div>
    );
  }

  renderInput(value: string, type: InputType): HTMLElement {
    return this.type === 'string' ? (type === EInputType.User ? this.renderUserLocaleInput(value) : this.renderTranslatedLanguageInput(value)) : this.renderTextEditor(value, type);
  }

  renderUserLocaleInput(value: string): HTMLCalciteInputElement {
    return (
      <calcite-input
        class={ECalciteMode.Light}
        ref={(node: HTMLCalciteInputElement) => (this.userLocaleInput = node)}
        data-field-name={this.fieldName}
        value={value}
        onFocus={this.handleSelection}
        onCalciteInputChange={this.handleUserInputChange.bind(this)}
      >
        {this.renderCopyButton(EInputType.User)}
      </calcite-input>
    );
  }

  renderTranslatedLanguageInput(value: string): HTMLCalciteInputElement {
    return (
      <calcite-input
        class={ECalciteMode.Light}
        ref={(node: HTMLCalciteInputElement) => (this.translatedLangInput = node)}
        data-field-name={this.fieldName}
        onFocus={this.handleSelection}
        onCalciteInputChange={this.handleTranslatedInputChange.bind(this)}
        value={value}
      >
        {this.renderCopyButton(EInputType.Translation)}
      </calcite-input>
    );
  }

  renderTextEditor(value: string, type: InputType): HTMLInstantAppsCkeditorWrapperElement {
    return (
      <instant-apps-ckeditor-wrapper
        ref={this.setEditor.bind(this, type)}
        onDataChanged={this.handleTextEditorDataChange.bind(this, type)}
        onIsFocused={this.handleSelection}
        value={value ?? ''}
        data-field-name={this.fieldName}
        config={{ toolbar: [] }}
      />
    );
  }

  renderItemHeader(type: string, label: string): HTMLDivElement {
    return (
      <div class={CSS.topRow}>
        <div class={CSS.labelContainer}>
          {this.renderExpandCollapseButton()}
          <calcite-icon icon={EIcons.SettingIndicator} scale="s" />
          <span class={CSS.label}>{type === EInputType.Translation ? this.translatedLanguageLabel : label}</span>
        </div>
        {type === EInputType.User ? (
          <button id={`${this.fieldName}goTo`} class={CSS.infoButton}>
            <calcite-icon class={CSS.infoIcon} icon={EIcons.Popover} scale="s" />
          </button>
        ) : null}
      </div>
    );
  }

  renderExpandCollapseButton(): HTMLCalciteActionElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    return (
      <calcite-action onClick={this.handleExpand.bind(this, uiDataItem)} icon={uiDataItem?.expanded ? EIcons.Expanded : EIcons.Collapsed} scale="s" appearance="transparent" />
    );
  }

  renderPopover(uiDataItem: LocaleSettingItem): HTMLCalcitePopoverElement {
    const tip = this.getTip(uiDataItem);
    return (
      <calcite-popover reference-element={`${this.fieldName}goTo`} auto-close="true" placement="trailing" closable>
        <span class={CSS.uiLocationPopoverContent}>
          <span class={CSS.uiLocationItems}>{this.getUILocation(uiDataItem)}</span>
          {tip ? <span class={CSS.tip}>{tip}</span> : null}
        </span>
      </calcite-popover>
    );
  }

  renderCopyButton(type: InputType) {
    const darkMode = isCalciteModeDark();
    return (
      <calcite-button
        class={darkMode ? ECalciteMode.Dark : ECalciteMode.Light}
        onclick={this.copySelection.bind(this, type)}
        slot="action"
        icon-start={EIcons.Copy}
        appearance="outline-fill"
      />
    );
  }

  getUIDataItem(): LocaleSettingItem | undefined {
    if (!languageTranslatorState.uiData) return;
    return languageTranslatorState.uiData[this.fieldName] as LocaleSettingItem;
  }

  updateT9nStore(fieldName: string, value: string): void {
    const currentLanguage = store.get('currentLanguage') as string;
    const dataToWrite = { [fieldName]: value };
    const updatedData = getT9nData(currentLanguage, dataToWrite);
    store.set('portalItemResourceT9n', updatedData);
  }

  handleExpand(uiDataItem: LocaleSettingItem): void {
    uiDataItem.expanded = !uiDataItem.expanded;
    const uiData = {
      ...languageTranslatorState.uiData,
      [this.fieldName]: uiDataItem as LocaleSettingItem,
    } as LocaleUIData;
    store.set('uiData', uiData);
  }

  handleEditorCollapse(): void {
    const uiData = store.get('uiData');
    const localeSettingItem = uiData?.[this.fieldName] as LocaleSettingItem;
    const isExpanded = localeSettingItem?.expanded;
    if (!isExpanded && this.userEditorWrapper?.editorInstance && this.translatedEditorWrapper?.editorInstance) {
      const { userEditorWrapper, translatedEditorWrapper } = this;
      const userEditorData = userEditorWrapper.editorInstance.getData();
      userEditorWrapper.value = userEditorData;
      const translatedEditorData = translatedEditorWrapper.editorInstance.getData();
      translatedEditorWrapper.value = translatedEditorData;
      userEditorWrapper.editorInstance.destroy();
      translatedEditorWrapper.editorInstance.destroy();
    }
  }

  handleSelection(event: Event): void {
    const uiData = { ...languageTranslatorState.uiData } as LocaleUIData;
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach(key => ((uiData[key] as LocaleSettingItem).selected = false));
    uiDataKeys.forEach(key => {
      const fieldName = (event?.target as HTMLCalciteInputElement)?.getAttribute('data-field-name');
      if (key === fieldName) {
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

  getTip(uiDataItem: LocaleSettingItem): string {
    const { tip } = uiDataItem;
    return tip;
  }

  copySelection(type: InputType) {
    const input = type === EInputType.User ? this.userLocaleInput : this.translatedLangInput;
    input.selectText();
    const value = input.value;
    navigator.clipboard.writeText(value);
  }

  setEditor(type: InputType, node: HTMLInstantAppsCkeditorWrapperElement) {
    if (type === EInputType.User) {
      this.userEditorWrapper = node;
    } else {
      this.translatedEditorWrapper = node;
    }
  }

  // INPUT DATA HANDLING

  // User locale input data handling
  async handleUserInputChange(e: CustomEvent): Promise<void> {
    store.set('saving', true);
    try {
      const node = e.target as HTMLCalciteInputElement;
      const value = node.value;
      const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
      uiDataItem.userLocaleData.value = value;
      await this.userLocaleInputOnChangeCallback(this.fieldName, value);
      store.set('saving', false);
    } catch {
      store.set('saving', false);
    }
  }

  async handleUserTextEditorChange(e: CustomEvent): Promise<void> {
    store.set('saving', true);
    try {
      const value = e.detail;
      const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
      uiDataItem.userLocaleData.value = value;
      await this.userLocaleInputOnChangeCallback(this.fieldName, value);
      store.set('saving', false);
    } catch {
      store.set('saving', false);
    }
  }

  // Translated locale input data handling
  async handleTranslatedInputChange(e: CustomEvent): Promise<void> {
    store.set('saving', true);
    try {
      const composedPath = e.composedPath();
      const node = composedPath[0] as HTMLCalciteInputElement;
      this.updateT9nStore(this.fieldName, node.value);
      const { fieldName, locale, resource } = this.getTranslatedLocaleCallbackData();
      const value = (e.target as HTMLCalciteInputElement).value;
      await this.translatedLocaleInputOnChangeCallback(fieldName, value, locale, resource);
      setTimeout(() => store.set('saving', false), 1500);
      this.translatorItemDataUpdated.emit();
    } catch (err) {
      console.error('Error writing to portal item resource: ', err);
      store.set('saving', false);
    }
  }

  async handleTranslatedTextEditorChange(e: CustomEvent): Promise<void> {
    store.set('saving', true);
    try {
      this.updateT9nStore(this.fieldName, e.detail);
      const { fieldName, locale, resource } = this.getTranslatedLocaleCallbackData();
      const value = e.detail;
      await this.translatedLocaleInputOnChangeCallback(fieldName, value, locale, resource);
      setTimeout(() => store.set('saving', false), 1500);
      this.translatorItemDataUpdated.emit();
    } catch (err) {
      console.error('Error writing to portal item resource: ', err);
      store.set('saving', false);
    }
  }

  handleTextEditorDataChange(type: EInputType.User | EInputType.Translation, e: CustomEvent) {
    if (type === EInputType.User) {
      this.handleUserTextEditorChange(e);
    } else {
      this.handleTranslatedTextEditorChange(e);
    }
  }

  getTranslatedLocaleCallbackData(): { fieldName: string; locale: string; resource: __esri.PortalItemResource } {
    const { fieldName } = this;
    const locale = store.get('currentLanguage') as string;
    const resource = store.get('portalItemResource') as __esri.PortalItemResource;
    return { fieldName, locale, resource };
  }
}
