import { Component, Host, Prop, h, Event } from '@stencil/core';
import { Element, EventEmitter, HostElement, Listen, State } from '@stencil/core/internal';

import { generateUIData, getMessages, getPortalItemResource, getUIDataKeys } from './support/utils';

import { languageTranslatorState, store } from './support/store';

import { EIcons } from './support/enum';
import { LocaleSettingItem, LocaleUIData } from './support/interfaces';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';

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
  scoped: true,
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
  appSettings: any;

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

  /**
   * Function to be called when data in user locale inputs have changed. This function will have 2 arguments - fieldName and value. Field name is a unique identifier for a given setting/field. Value is the entered value within the input.
   */
  @Prop()
  userLocaleInputOnChangeCallback: (fieldName: string, value: string) => void;

  @State()
  saving = false;

  @State()
  messages: typeof LanguageTranslator_t9n;

  @State()
  isCollapse = true;

  @Listen('translatorItemDataUpdated', { target: 'window' })
  handleT9nItemUpdate(): void {
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
      <calcite-modal open={this.open} scale="l" fullscreen={true} onCalciteModalClose={() => (this.open = false)}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderPrimaryButton()}
      </calcite-modal>
    );
  }

  renderPopoverTip(): HTMLCalcitePopoverElement {
    return (
      <calcite-popover reference-element="headerTip" placement="trailing" auto-close={true} closable>
        <div class={CSS.headerTip}>{this.messages?.headerTip}</div>
      </calcite-popover>
    );
  }

  renderHeader(): HTMLElement {
    const saving = store.get('saving');

    return (
      <header class={CSS.header} slot="header">
        {this.renderHeaderText()}
        {saving ? this.renderFeedbackIndicator() : null}
      </header>
    );
  }

  renderHeaderText(): HTMLDivElement {
    return (
      <div class={CSS.headerText}>
        <span>{`${this.messages?.header} | ${this.messages?.subHeader}`}</span>
        <calcite-button id="headerTip" appearance="transparent">
          <calcite-icon icon={EIcons.Popover} scale="s" />
        </calcite-button>
      </div>
    );
  }

  renderFeedbackIndicator(): HTMLDivElement {
    const saving = store.get('saving');
    const t9n = this.messages?.saving;
    return (
      <div class={CSS.savingIndicator}>
        {saving ? <calcite-loader label={t9n} inline={true} /> : null}
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
        <calcite-button onClick={this.handleExpandCollapseAll.bind(this)} appearance="transparent" icon-start={EIcons.ExpandCollapse}>
          {this.isCollapse ? this.messages?.collapseAll : this.messages?.expandAll}
        </calcite-button>
        <instant-apps-language-translator-search
          onSuggestionSelected={e => {
            const uiData = { ...languageTranslatorState.uiData } as LocaleUIData;
            const uiDataKeys = getUIDataKeys();
            uiDataKeys.forEach(key => ((uiData[key] as LocaleSettingItem).selected = false));
            uiDataKeys.forEach(key => {
              const fieldName = e.detail;
              if (key === fieldName) {
                (uiData[key] as LocaleSettingItem).selected = true;
              }
            });
            store.set('uiData', uiData);
          }}
          t9nPlaceholder={this.messages?.searchPlaceholder}
        ></instant-apps-language-translator-search>
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
        type={this.appSettings[key].type}
        userLocaleInputOnChangeCallback={this.userLocaleInputOnChangeCallback}
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

  handleExpandCollapseAll(): void {
    this.isCollapse = !this.isCollapse;
    const uiData = { ...languageTranslatorState.uiData };
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach(key => ((uiData[key] as LocaleSettingItem).expanded = this.isCollapse));
    store.set('uiData', { ...uiData } as LocaleUIData);
  }
}
