import { Component, Host, Prop, h } from '@stencil/core';

import { Element, HostElement, State } from '@stencil/core/internal';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';
import { generateUIData, getMessages, getUIDataKeys } from './support/utils';
import { languageTranslatorState, store } from './support/store';
import { LocaleSettingItem, LocaleUIData } from './support/interfaces';

const BASE = 'instant-apps-language-translator';

const CSS = {
  BASE,
  header: `${BASE}__header`,
  headerText: `${BASE}__header-text`,
  savingIndicator: `${BASE}__saving-indicator`,
  closeButton: `${BASE}__close-button`,
  headerTip: `${BASE}__header-tip`,
  topBar: `${BASE}__top-bar`,
  topBarSection: `${BASE}__top-bar-section`,
  collapseSearchContainer: `${BASE}__collapse-search-container`,
  userLangText: `${BASE}__user-lang-text`,
  lastItem: `${BASE}--last-item`,
};

@Component({
  tag: 'instant-apps-language-translator',
  styleUrl: 'instant-apps-language-translator.scss',
  shadow: true,
})
export class InstantAppsLanguageTranslator {
  @Element()
  el: HTMLInstantAppsLanguageTranslatorElement;

  @Prop()
  portalItem!: __esri.PortalItem;

  @Prop()
  portalItemResourceId!: string;

  @Prop()
  appSettings;

  @Prop()
  translatedLanguages: string[];

  @Prop({
    mutable: true,
  })
  open = false;

  @State()
  saving = false;

  @State()
  messages: typeof LanguageTranslator_t9n;

  async componentWillLoad() {
    this.messages = await getMessages(this.el);
    store.set('currentLanguage', this.translatedLanguages[0]);
    store.set('uiData', generateUIData(this.appSettings, this.translatedLanguages));
  }

  render(): HostElement {
    return (
      <Host>
        {this.renderModal()}
        {this.renderPopoverTip()}
      </Host>
    );
  }

  renderModal(): HTMLCalciteModalElement {
    return (
      <calcite-modal open={this.open} scale="l" fullscreen={true} oncalciteModalClose={() => (this.open = false)}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderPrimaryButton()}
      </calcite-modal>
    );
  }

  renderPopoverTip(): HTMLCalcitePopoverElement {
    return (
      <calcite-popover reference-element="headerTip" placement="trailing" auto-close={true}>
        <div class={CSS.headerTip}>{this.messages?.headerTip}</div>
      </calcite-popover>
    );
  }

  renderHeader(): HTMLElement {
    return (
      <header class={CSS.header} slot="header">
        {this.renderHeaderText()}
        {this.saving ? this.renderSavingIndicator() : null}
      </header>
    );
  }

  renderHeaderText(): HTMLDivElement {
    return (
      <div class={CSS.headerText}>
        <span>{`${this.messages?.header} | ${this.messages?.subHeader}`}</span>
        <calcite-button id="headerTip" appearance="transparent">
          <calcite-icon icon="information" scale="s" />
        </calcite-button>
      </div>
    );
  }

  renderSavingIndicator(): HTMLDivElement {
    const saving_t9n = this.messages?.saving;
    return (
      <div class={CSS.savingIndicator}>
        <calcite-loader label={saving_t9n} inline={true} />
        <span>{saving_t9n}</span>
      </div>
    );
  }

  renderContent(): HTMLDivElement {
    const locales = languageTranslatorState?.uiData?.locales as string[];
    return (
      <div slot="content">
        {this.renderTopBar()}
        {locales?.length > 0 ? this.renderUIData() : this.renderNotice()}
      </div>
    );
  }

  renderTopBar(): HTMLDivElement {
    return (
      <div class={CSS.topBar}>
        {this.renderLeadingTopBarSection()}
        {this.renderTrailingTopBarSection()}
      </div>
    );
  }

  renderLeadingTopBarSection(): HTMLDivElement {
    const languages = this.messages?.languages;
    return (
      <div class={CSS.topBarSection}>
        <div class={CSS.userLangText}>{languages?.en}</div>
        {this.renderCollapseSearchContainer()}
      </div>
    );
  }

  renderCollapseSearchContainer(): HTMLDivElement {
    return (
      <div class={CSS.collapseSearchContainer}>
        <calcite-button onClick={this.expandAll} appearance="transparent" icon-start="list-merge">
          {this.messages?.expandAll}
        </calcite-button>
        <calcite-button onClick={this.collapseAll} appearance="transparent" icon-start="list-merge">
          {this.messages?.collapseAll}
        </calcite-button>
        <calcite-input type="search" placeholder={this.messages?.searchPlaceholder} icon="search" />
      </div>
    );
  }

  renderTrailingTopBarSection(): void {
    return (
      <div class={CSS.topBarSection}>
        <calcite-label layout="inline">
          {this.messages?.translatedLanguage}
          <calcite-select
            onCalciteSelectChange={e => {
              const value = e.target.value;
              store.set('currentLanguage', value);
            }}
          >
            {this.renderTranslatedLangOptions()}
          </calcite-select>
        </calcite-label>
      </div>
    );
  }

  renderTranslatedLangOptions(): HTMLCalciteOptionElement[] {
    return (languageTranslatorState.uiData?.locales as string[])?.map(locale => {
      const { messages } = this;
      const translatedLanguageNames = messages?.translatedLanguageNames;
      const enLanguageNames = messages?.languages;
      const translatedLanguageName = translatedLanguageNames?.[locale];
      const enLanguageName = enLanguageNames?.[locale];
      const text = `${translatedLanguageName} - ${enLanguageName}`;
      return <calcite-option value={locale}>{text}</calcite-option>;
    });
  }

  renderUIData(): HTMLDivElement | undefined {
    if (!languageTranslatorState?.uiData) return;
    const uiDataKeys = getUIDataKeys();
    return <div>{uiDataKeys?.map((key, keyIndex) => this.renderUIDataItem(key, keyIndex, uiDataKeys.length))}</div>;
  }

  renderNotice(): HTMLCalciteNoticeElement {
    const noLanguage = this.messages?.noLanguage;
    return (
      <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
        <div slot="title">{noLanguage?.title}</div>
        <div slot="message">{noLanguage?.message}</div>
      </calcite-notice>
    );
  }

  renderUIDataItem(key: string, keyIndex: number, uiDataKeysLen: number): HTMLDivElement {
    const translatedLabel = this.appSettings.translatedLanguageLabels[languageTranslatorState.currentLanguage as string][key];
    return <instant-apps-language-translator-item class={`${keyIndex === uiDataKeysLen - 1 ? CSS.lastItem : ''}`} fieldName={key} translatedLanguageLabel={translatedLabel} />;
  }

  renderPrimaryButton(): HTMLCalciteButtonElement {
    return (
      <calcite-button onClick={() => (this.open = false)} slot="primary" class={CSS.closeButton}>
        {this.messages?.close}
      </calcite-button>
    );
  }

  expandAll(): void {
    const uiData = { ...languageTranslatorState.uiData };
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach(key => ((uiData[key] as LocaleSettingItem).expanded = true));
    store.set('uiData', { ...uiData } as LocaleUIData);
  }

  collapseAll(): void {
    const uiData = { ...languageTranslatorState.uiData };
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach(key => ((uiData[key] as LocaleSettingItem).expanded = false));
    store.set('uiData', { ...uiData } as LocaleUIData);
  }
}
