import { Component, Event, EventEmitter, Fragment, Host, Prop, h } from '@stencil/core';

import { getT9nData, getUIDataKeys, isCalciteModeDark } from '../support/utils';
import { languageTranslatorState, store } from '../support/store';
import { EInputType, ESettingType, EIcons, ECalciteMode } from '../support/enum';
import { LocaleSettingItem, InputType, LocaleSettingData, CalciteInputMap } from '../support/interfaces';
import { IClassicEditor } from '../../../interfaces/interfaces';

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
  nestedInput: `${BASE}__nested-input`,
};

@Component({
  tag: 'instant-apps-language-translator-item',
  styleUrl: 'instant-apps-language-translator-item.scss',
  scoped: true,
})
export class InstantAppsLanguageTranslatorItem {
  userInputs: CalciteInputMap = {};
  translatedInputs: CalciteInputMap = {};
  userEditorWrapper: HTMLInstantAppsCkeditorWrapperElement;
  translatedEditorWrapper: HTMLInstantAppsCkeditorWrapperElement;

  /**
   * Unique identifier tied to an associated setting in an app.
   */
  @Prop()
  fieldName: string;

  /**
   * Object containing labels of items in currently selected language.
   */
  @Prop()
  translatedLanguageLabels: { [key: string]: string };

  /**
   * Object containing data that describes the UI i.e. icon to indicate type of setting, label, value, etc.
   */
  @Prop()
  setting: LocaleSettingData;

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

  get isTextEditor() {
    return this.setting.type === ESettingType.TextEditor;
  }

  get calciteMode() {
    return isCalciteModeDark() ? ECalciteMode.Dark : ECalciteMode.Light;
  }

  get hasNestedContent() {
    return !!this.setting?.content;
  }

  get tipID() {
    return `${this.fieldName}goTo`;
  }

  componentDidLoad() {
    if (this.isTextEditor) {
      store.onChange('uiData', () => this.handleEditorCollapse());
    }
  }

  render() {
    if ('content' in this.setting && this.setting.content?.every(contentItem => contentItem?.content?.length === 0)) {
      return <Fragment></Fragment>;
    } else {
      return (
        <Host class={this.calciteMode}>
          {this.renderBase()}
          {this.renderPopover()}
        </Host>
      );
    }
  }

  renderBase(): HTMLDivElement {
    return (
      <div class={BASE}>
        {this.renderUserLocaleSection()}
        {this.renderTranslatedLanguageSection()}
      </div>
    );
  }

  renderPopover(): HTMLCalcitePopoverElement {
    const tip = this.getTip();
    return (
      <calcite-popover referenceElement={this.tipID} label="" auto-close="true" placement="trailing" closable>
        <span class={CSS.uiLocationPopoverContent}>
          <span class={CSS.uiLocationItems}>{this.getUILocation()}</span>
          {tip ? <span class={CSS.tip}>{tip}</span> : null}
        </span>
      </calcite-popover>
    );
  }

  renderUserLocaleSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const userLocaleData = uiDataItem?.userLocaleData;

    const isSelected = uiDataItem?.selected;
    const selected = isSelected ? ` ${CSS.selected}` : '';

    const label = userLocaleData?.label;
    const value = userLocaleData?.value;

    const uid = this.setting.id;
    return (
      <div class={`${CSS.section}${selected}`}>
        {this.renderItemHeader(EInputType.User, label, uid)}
        {this.handleInputRender(EInputType.User, value, uid)}
      </div>
    );
  }

  renderTranslatedLanguageSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;

    const uid = this.setting.id;

    const locale = store.get('currentLanguage') as string;
    const data = store.get('portalItemResourceT9n');

    const label = this.translatedLanguageLabels[this.fieldName];
    const value = data?.[locale]?.[uid] as string;

    const selected = uiDataItem?.selected ? ` ${CSS.selected}` : '';
    return (
      <div class={`${CSS.section}${selected}`}>
        {this.renderItemHeader(EInputType.Translation, label, uid)}
        {this.handleInputRender(EInputType.Translation, value, uid)}
      </div>
    );
  }

  handleInputRender(type: InputType, value: string, uid: string) {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const isExpanded = uiDataItem?.expanded;
    return isExpanded ? (this.hasNestedContent ? this.renderNestedInputs(type) : this.renderInput(type, value, uid)) : null;
  }

  renderNestedInputs(inputType: InputType, contentItem?: LocaleSettingData) {
    const settingToRender = contentItem ?? this.setting;
    const { content } = settingToRender;
    return content?.map(contentItem => (contentItem.hasOwnProperty('content') ? this.renderNestedInputs(inputType, contentItem) : this.renderNestedInput(inputType, contentItem)));
  }

  renderNestedInput(inputType: InputType, contentItem: LocaleSettingData) {
    const locale = store.get('currentLanguage') as string;
    const data = store.get('portalItemResourceT9n');
    const uid = contentItem?.id;
    const localeData = data?.[locale];
    const translatedValue = localeData?.[uid];
    const { label, value, id } = contentItem;
    const inputLabel = inputType === EInputType.Translation ? this.translatedLanguageLabels[id] : label;
    const isUser = inputType === EInputType.User;
    const inputValue = isUser ? value : translatedValue;
    return (
      <div class={CSS.nestedInput}>
        {this.renderItemHeader(inputType, inputLabel, uid, contentItem)}
        {this.renderInput(inputType, inputValue, uid, contentItem)}
      </div>
    );
  }

  renderItemHeader(type: InputType, label: string, uid: string, contentItem?: LocaleSettingData): HTMLDivElement {
    const doesNotHaveNestedContent = !this.hasNestedContent;
    const isNestedItem = !!contentItem;
    const showCopyButton = doesNotHaveNestedContent || isNestedItem;
    return (
      <div class={CSS.topRow}>
        {this.renderItemHeaderLabel(type, label, contentItem)}
        {showCopyButton ? this.renderCopyButton(type, uid) : null}
      </div>
    );
  }

  renderItemHeaderLabel(type: InputType, label: string, contentItem: LocaleSettingData | undefined) {
    const isUserSectionWithNoNestedContent = type === EInputType.User && !contentItem;
    return (
      <div class={CSS.labelContainer}>
        {!contentItem ? this.renderExpandCollapseButton() : null}
        <calcite-icon icon={this.getIcon(contentItem)} scale="s" />
        <span class={CSS.label}>{label}</span>
        {isUserSectionWithNoNestedContent ? this.renderInfoButton() : null}
      </div>
    );
  }

  renderExpandCollapseButton(): HTMLCalciteActionElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const isExpanded = uiDataItem?.expanded;
    const icon = isExpanded ? EIcons.Expanded : EIcons.Collapsed;
    return <calcite-action onClick={this.handleExpand.bind(this, uiDataItem)} icon={icon} scale="s" appearance="transparent" text="" />;
  }

  renderInfoButton() {
    return (
      <button id={this.tipID} class={CSS.infoButton}>
        <calcite-icon class={CSS.infoIcon} icon={EIcons.Popover} scale="s" />
      </button>
    );
  }

  renderCopyButton(type: InputType, uid: string) {
    return <calcite-action class={this.calciteMode} onClick={this.copySelection.bind(this, type, uid)} slot="action" icon={EIcons.Copy} appearance="transparent" text="" />;
  }

  renderInput(type: InputType, value: string, uid: string, contentItem?: LocaleSettingData): HTMLElement {
    const setting = contentItem ?? this.setting;
    const isNotRichText = setting.type === 'string' || setting.type === 'textarea';
    return isNotRichText
      ? type === EInputType.User
        ? this.renderUserLocaleInput(value, uid)
        : this.renderTranslatedLanguageInput(value, uid)
      : this.renderTextEditor(value, type);
  }

  renderUserLocaleInput(value: string, uid: string): HTMLCalciteInputElement {
    return (
      <calcite-input
        ref={(node: HTMLCalciteInputElement) => (this.userInputs[uid] = node)}
        key={uid}
        id={uid}
        class={ECalciteMode.Light}
        data-field-name={this.fieldName}
        value={value}
        onFocus={this.handleSelection}
        onCalciteInputChange={this.handleUserInputChange.bind(this)}
      />
    );
  }

  renderTranslatedLanguageInput(value: string, uid: string): HTMLCalciteInputElement {
    return (
      <calcite-input
        ref={(node: HTMLCalciteInputElement) => (this.translatedInputs[uid] = node)}
        key={uid}
        id={uid}
        class={ECalciteMode.Light}
        data-field-name={this.fieldName}
        value={value}
        onFocus={this.handleSelection}
        onCalciteInputChange={this.handleTranslatedInputChange.bind(this)}
      />
    );
  }

  renderTextEditor(value: string, type: InputType): HTMLInstantAppsCkeditorWrapperElement {
    const config = { toolbar: [] };
    return (
      <instant-apps-ckeditor-wrapper
        ref={this.setEditor.bind(this, type)}
        onDataChanged={this.handleTextEditorDataChange.bind(this, type)}
        onIsFocused={this.handleSelection}
        value={value ?? ''}
        data-field-name={this.fieldName}
        config={config}
      />
    );
  }

  getUIDataItem(): LocaleSettingItem | undefined {
    if (!languageTranslatorState.uiData) return;
    return languageTranslatorState.uiData.get(this.fieldName);
  }

  updateT9nStore(fieldName: string, value: string): void {
    const currentLanguage = store.get('currentLanguage') as string;
    const dataToWrite = { [fieldName]: value };
    const updatedData = getT9nData(currentLanguage, dataToWrite);
    store.set('portalItemResourceT9n', updatedData);
  }

  handleExpand(): void {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    uiDataItem.expanded = !uiDataItem.expanded;
    const uiData = new Map(languageTranslatorState.uiData);
    uiData.set(this.fieldName, uiDataItem);
    store.set('uiData', uiData);
  }

  handleEditorCollapse(): void {
    const uiData = store.get('uiData');
    const localeSettingItem = uiData?.get(this.fieldName) as LocaleSettingItem;
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
    const uiData = new Map(languageTranslatorState.uiData);
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach(key => {
      const setting = uiData?.get(key);
      setting.selected = false;
    });
    uiDataKeys.forEach(key => {
      const node = event?.target as HTMLCalciteInputElement;
      const fieldName = node?.getAttribute('data-field-name');
      if (key === fieldName) {
        const setting = uiData?.get(key);
        setting.selected = true;
      }
    });
    store.set('uiData', uiData);
  }

  getUILocation(): HTMLElement[] {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
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

  getTip(): string {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const { tip } = uiDataItem;
    return tip;
  }

  copySelection(type: InputType, uid: string): void {
    if (this.setting.type === ESettingType.TextEditor) {
      this.copyTextEditorContent(type);
    } else {
      this.copyCalciteInputContent(uid, type);
    }
  }

  copyTextEditorContent(type: InputType): void {
    const editor = type === EInputType.User ? this.userEditorWrapper?.editorInstance : this.translatedEditorWrapper?.editorInstance;
    const duration = 50;
    setTimeout(() => {
      this.selectContent(editor);
      setTimeout(() => this.selectContent(editor), duration);
    }, duration);
    this.copyContent(editor);
  }

  selectContent(editor: IClassicEditor): void {
    editor.editing.view.focus();
    const { model } = editor;
    const doc = model.document;
    const range = model.createRangeIn(doc.getRoot() as any);
    model.change(writer => writer.setSelection(range));
  }

  copyContent(editor: IClassicEditor): void {
    const data = editor.getData();
    const tempElement = document.createElement('div');
    tempElement.contentEditable = 'true';
    tempElement.innerHTML = data;
    document.body.appendChild(tempElement);
    const tempRange = document.createRange();
    tempRange.selectNodeContents(tempElement);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(tempRange);
    document.execCommand('copy');
    document.body.removeChild(tempElement);
  }

  copyCalciteInputContent(uid: string, inputType: InputType): void {
    const input = inputType === EInputType.User ? this.userInputs[uid] : this.translatedInputs[uid];
    if (input) {
      input.selectText();
      const value = input.value;
      navigator.clipboard.writeText(value);
    }
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
      const uid = node.id;
      const value = node.value;
      const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
      uiDataItem.userLocaleData.value = value;
      await this.userLocaleInputOnChangeCallback(uid, value);
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
      const uid = node.id;
      this.updateT9nStore(uid, node.value);
      const { locale, resource } = this.getTranslatedLocaleCallbackData();
      const value = (e.target as HTMLCalciteInputElement).value;
      await this.translatedLocaleInputOnChangeCallback(uid, value, locale, resource);
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
      const node = e.target as HTMLElement;
      const uid = node.id;
      this.updateT9nStore(uid, e.detail);
      const { locale, resource } = this.getTranslatedLocaleCallbackData();
      const value = e.detail;
      await this.translatedLocaleInputOnChangeCallback(uid, value, locale, resource);
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

  getTranslatedLocaleCallbackData(): { locale: string; resource: __esri.PortalItemResource } {
    const locale = store.get('currentLanguage') as string;
    const resource = store.get('portalItemResource') as __esri.PortalItemResource;
    return { locale, resource };
  }

  getIcon(setting?: LocaleSettingData) {
    const settingToUse = setting ?? this.setting;
    switch (settingToUse.stringType) {
      case 'title':
        return EIcons.Title;
      case 'subtitle':
        return EIcons.Subtitle;
      case 'text':
        return EIcons.Text;
      case 'button':
        return EIcons.Button;
      case 'string':
        return EIcons.String;
      default:
        return EIcons.SettingIndicator;
    }
  }
}
