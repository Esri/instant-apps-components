import { Component, Host, Prop, h, Event } from '@stencil/core';

import { Element, EventEmitter, HostElement, Listen, State } from '@stencil/core/internal';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';
import { generateUIData, getMessages, getPortalItemResource, getUIDataKeys } from './support/utils';
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
  writingIcon: `${BASE}__writing-icon`,
};

@Component({
  tag: 'instant-apps-language-translator',
  styleUrl: 'instant-apps-language-translator.scss',
  shadow: true,
})
export class InstantAppsLanguageTranslator {
  @Element()
  el: HTMLInstantAppsLanguageTranslatorElement;

  /**
   * Instant App portal item - used to fetch it's associated portal item resource. The portal item resource will contain the user defined translated strings.
   */
  @Prop()
  portalItem!: __esri.PortalItem;

  /**
   * Data object containing a series of key-value pairs used to render the components UI.
   */
  @Prop()
  appSettings;

  /**
   * Specified languages that the user-defined strings will be translated in.
   */
  @Prop()
  translatedLanguages: string[];

  /**
   * Controls the open/close state of the modal.
   */
  @Prop({
    mutable: true,
  })
  open = false;

  @State()
  saving = false;

  @State()
  messages: typeof LanguageTranslator_t9n;

  @Listen('translatorItemDataUpdated', { target: 'window' })
  handleT9nItemUpdate() {
    this.translatorDataUpdated.emit();
  }

  @Event()
  translatorDataUpdated: EventEmitter<string>;

  async componentDidLoad() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    const { el, appSettings, translatedLanguages } = this;
    const messages = await getMessages(el);
    const initialLanguage = translatedLanguages?.[0];
    const uiData = generateUIData(appSettings, translatedLanguages);
    const portalItemResource = await getPortalItemResource(this.portalItem);

    this.messages = messages;
    store.set('currentLanguage', initialLanguage);
    store.set('uiData', uiData);
    store.set('portalItemResource', portalItemResource as __esri.PortalItemResource);
    try {
      const t9nData = await portalItemResource?.fetch();
      store.set('portalItemResourceT9n', t9nData);
    } catch {}
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
    const saving = store.get('saving');
    const processing = store.get('processing');
    const handlingData = saving || processing;
    return (
      <header class={CSS.header} slot="header">
        {this.renderHeaderText()}
        {handlingData ? this.renderFeedbackIndicator() : null}
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

  renderFeedbackIndicator(): HTMLDivElement {
    const processing = store.get('processing');
    const saving = store.get('saving');
    const t9n = processing ? this.messages?.writing : this.messages?.saving;
    return (
      <div class={CSS.savingIndicator}>
        {processing ? <span class={CSS.writingIcon}>{<calcite-icon icon="pencil" scale="s" />}</span> : saving ? <calcite-loader label={t9n} inline={true} /> : null}
        <span>{t9n}</span>
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
        {/* <calcite-button onClick={this.expandAll} appearance="transparent" icon-start="list-merge">
          {this.messages?.expandAll}
        </calcite-button> */}
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
      return (
        <calcite-option key={`translated-lang-option-${locale}`} value={locale}>
          {text}
        </calcite-option>
      );
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
    return (
      <instant-apps-language-translator-item
        key={`${key}-${keyIndex}`}
        class={`${keyIndex === uiDataKeysLen - 1 ? CSS.lastItem : ''}`}
        fieldName={key}
        translatedLanguageLabel={translatedLabel}
      />
    );
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
