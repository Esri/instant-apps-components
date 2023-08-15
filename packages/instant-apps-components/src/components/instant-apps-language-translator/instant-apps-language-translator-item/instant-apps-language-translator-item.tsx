import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { LocaleSettingItem, LocaleUIData } from '../support/interfaces';
import { languageTranslatorState, store } from '../support/store';
import { getT9nData, getUIDataKeys, writeToPortalItemResource } from '../support/utils';

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
  translatedLangInput: HTMLCalciteInputElement;
  userLocaleInput: HTMLCalciteInputElement;

  ckEditorWrapper;
  ckEditorWrapper2;

  @Element()
  el: HTMLInstantAppsLanguageTranslatorElement;

  @Prop()
  fieldName: string;

  @Prop()
  translatedLanguageLabel: string;

  @Prop()
  type: string;

  @Event()
  translatorItemDataUpdated: EventEmitter<void>;

  componentDidLoad() {
    store.onChange('uiData', () => {
      const uiData = store.get('uiData');
      const localeSettingItem = uiData?.[this.fieldName] as LocaleSettingItem;
      const isExpanded = localeSettingItem?.expanded;
      if (!isExpanded) {
        const data = this.ckEditorWrapper.editorInstance.getData();
        this.ckEditorWrapper.value = data;
        const data2 = this.ckEditorWrapper2.editorInstance.getData();
        this.ckEditorWrapper2.value = data2;
        this.ckEditorWrapper.editorInstance.destroy();
        this.ckEditorWrapper2.editorInstance.destroy();
      }
    });
  }

  render() {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    return (
      <Host>
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

  renderPopover(uiDataItem: LocaleSettingItem): HTMLCalcitePopoverElement {
    const tip = this.getTip(uiDataItem);
    return (
      <calcite-popover reference-element={`${this.fieldName}goTo`} auto-close="true" placement="trailing">
        <span class={CSS.uiLocationPopoverContent}>
          <span class={CSS.uiLocationItems}>{this.getUILocation(uiDataItem)}</span>
          {tip ? <span class={CSS.tip}>{tip}</span> : null}
        </span>
      </calcite-popover>
    );
  }

  renderUserLocaleSection(uiDataItem: LocaleSettingItem): HTMLDivElement {
    const userLocaleData = uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const value = userLocaleData?.value;
    const isSelected = uiDataItem?.selected;
    return (
      <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ''}`}>
        {this.renderItemHeader('user', label)}
        {uiDataItem?.expanded ? this.renderInput(value, 'user') : null}
      </div>
    );
  }

  renderUserLocaleInput(value: string): HTMLCalciteInputElement {
    return (
      <calcite-input ref={node => (this.userLocaleInput = node)} data-field-name={this.fieldName} value={value} onFocus={this.handleSelection}>
        {this.renderCopyButton('user')}
      </calcite-input>
    );
  }

  renderCopyButton(type: 'user' | 'translated') {
    return <calcite-button onclick={this.copySelection.bind(this, type)} slot="action" icon-start="copy-to-clipboard" appearance="outline-fill" />;
  }

  renderTranslatedLanguageSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const isSelected = uiDataItem?.selected;
    const locale = store.get('currentLanguage') as string;
    const data = store.get('portalItemResourceT9n');
    const value = data?.[locale]?.[this.fieldName];
    return (
      <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ''}`}>
        {this.renderItemHeader('translated', this.translatedLanguageLabel)}
        {uiDataItem?.expanded ? this.renderInput(value, 'translated') : null}
      </div>
    );
  }

  renderItemHeader(type: string, label: string): HTMLDivElement {
    return (
      <div class={CSS.topRow}>
        <div class={CSS.labelContainer}>
          {this.renderExpandCollapseButton()}
          <calcite-icon icon="list-button" scale="s" />
          <span class={CSS.label}>{type === 'translated' ? this.translatedLanguageLabel : label}</span>
        </div>
        {type === 'user' ? (
          <button id={`${this.fieldName}goTo`} class={CSS.infoButton}>
            <calcite-icon class={CSS.infoIcon} icon="information" scale="s" />
          </button>
        ) : null}
      </div>
    );
  }

  renderInput(value: string, type: 'user' | 'translated'): HTMLElement {
    return this.type === 'string' ? this.renderTranslatedLanguageInput(value) : this.renderTextEditor(value, type);
  }

  renderTranslatedLanguageInput(value: string): HTMLCalciteInputElement {
    return (
      <calcite-input
        ref={(node: HTMLCalciteInputElement) => (this.translatedLangInput = node)}
        data-field-name={this.fieldName}
        onFocus={this.handleSelection}
        onCalciteInputChange={this.handleCalciteInputChange.bind(this)}
        value={value}
      >
        {this.renderCopyButton('translated')}
      </calcite-input>
    );
  }

  renderTextEditor(value: string, type: 'user' | 'translated'): HTMLInstantAppsCkeditorWrapperElement {
    return (
      <instant-apps-ckeditor-wrapper
        ref={node => {
          if (type === 'user') {
            this.ckEditorWrapper = node;
          } else {
            this.ckEditorWrapper2 = node;
          }
        }}
        onDataChanged={e => {
          const dataToWrite = { [this.fieldName]: e.detail };
          const updatedData = getT9nData(store.get('currentLanguage') as string, dataToWrite);
          store.set('portalItemResourceT9n', updatedData);
        }}
        onIsFocused={this.handleSelection}
        value={value}
        data-field-name={this.fieldName}
      />
    );
  }

  handleCalciteInputChange(e: CustomEvent) {
    this.updateT9nStore(e);
    this.handleTranslatedLanguageInput();
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

  // Write data to portal item resource
  async handleTranslatedLanguageInput(): Promise<void> {
    store.set('saving', true);
    try {
      const resource = store.get('portalItemResource') as __esri.PortalItemResource;
      const data = store.get('portalItemResourceT9n');
      await writeToPortalItemResource(resource, data);
      setTimeout(() => store.set('saving', false), 1500);
      this.translatorItemDataUpdated.emit();
    } catch (err) {
      console.error('Error writing to portal item resource: ', err);
      store.set('saving', false);
    }
  }

  updateT9nStore(e: CustomEvent): void {
    const currentLanguage = store.get('currentLanguage') as string;
    const composedPath = e.composedPath();
    const node = composedPath[0] as HTMLCalciteInputElement;
    const fieldName = node.getAttribute('data-field-name') as string;
    const dataToWrite = { [fieldName]: node.value };
    const updatedData = getT9nData(currentLanguage, dataToWrite);
    store.set('portalItemResourceT9n', updatedData);
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

  copySelection(type: 'user' | 'translated') {
    const input = type === 'user' ? this.userLocaleInput : this.translatedLangInput;
    input.selectText();
    const value = input.value;
    navigator.clipboard.writeText(value);
  }
}
