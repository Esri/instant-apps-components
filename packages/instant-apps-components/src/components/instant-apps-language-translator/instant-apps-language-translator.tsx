import { Component, Host, Prop, h, Event } from '@stencil/core';
import { Element, EventEmitter, HostElement, Listen, State } from '@stencil/core/internal';

import { generateUIData, getLocales, getMessages, getPortalItemResource, getUIDataKeys } from './support/utils';

import { languageTranslatorState, store } from './support/store';

import { EIcons } from './support/enum';
import { LocaleItem, LocaleSettingItem, LocaleUIData } from './support/interfaces';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';
import { loadModules } from 'esri-loader';
import { getComponentClosestLanguage } from '../../utils/locale';

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
  intl: __esri.intl;

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
  locales: LocaleItem[];

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
    const [intl] = await loadModules(['esri/intl']);
    this.intl = intl;
    await this.initMessages();
    this.initUIData();
    this.initPortalItemResourceT9nData();
    this.initSelectLanguage();
  }

  // Init t9n files
  async initMessages(): Promise<void> {
    try {
      const { el } = this;
      const messages = await getMessages(el);
      this.messages = messages;
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  }

  initUIData(): void {
    // Initialize store with UI Data (for translator-item rendering)
    const { appSettings, locales } = this;
    const uiData = generateUIData(appSettings, locales) as LocaleUIData;
    store.set('uiData', uiData);
  }

  // Initialize selected language
  initSelectLanguage(): void {
    const { locales } = this;
    const initialLanguage = locales?.[0] ?? this.intl.getLocale();
    store.set('currentLanguage', initialLanguage.locale);
  }

  // Fetch portal item resource associated with portal item. Fetch and store t9n data
  async initPortalItemResourceT9nData(): Promise<void> {
    try {
      const portalItemResource = await getPortalItemResource(this.portalItem);
      store.set('portalItemResource', portalItemResource as __esri.PortalItemResource);
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
      <calcite-modal open={this.open} scale="l" fullscreen={true} onCalciteModalClose={this.close.bind(this)}>
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
        {saving ? this.renderSavingIndicator() : null}
      </header>
    );
  }

  renderHeaderText(): HTMLDivElement {
    const { messages } = this;
    return (
      <div class={CSS.headerText}>
        <span>{`${messages?.header} | ${messages?.subHeader}`}</span>
        <calcite-button id="headerTip" appearance="transparent">
          <calcite-icon icon={EIcons.Popover} scale="s" />
        </calcite-button>
      </div>
    );
  }

  renderSavingIndicator(): HTMLDivElement {
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
    const localeItems = getLocales(this.locales);
    return (
      <div slot="content">
        {this.renderTopBar()}
        {localeItems?.length > 0 ? this.renderUIData() : this.renderNotice()}
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
    return (
      <div class={CSS.topBarSection}>
        {this.renderUserLocale()}
        {this.renderCollapseSearchContainer()}
      </div>
    );
  }

  renderUserLocale(): HTMLDivElement {
    const languages = this.messages?.languages;
    const localeFlag = getComponentClosestLanguage(this.el) as string;
    const langText = languages?.[localeFlag];
    return <div class={CSS.userLangText}>{langText}</div>;
  }

  renderCollapseSearchContainer(): HTMLDivElement {
    return (
      <div class={CSS.collapseSearchContainer}>
        {this.renderExpandCollapseButton()}
        {this.renderSearch()}
      </div>
    );
  }

  renderExpandCollapseButton(): HTMLCalciteButtonElement {
    const { isCollapse, messages } = this;
    const text = isCollapse ? messages?.collapseAll : messages?.expandAll;
    return (
      <calcite-button onClick={this.handleExpandCollapseAll.bind(this)} appearance="transparent" icon-start={EIcons.ExpandCollapse}>
        {text}
      </calcite-button>
    );
  }

  renderSearch(): HTMLInstantAppsLanguageTranslatorSearchElement {
    return (
      <instant-apps-language-translator-search
        onSuggestionSelected={this.onSuggestionSelect.bind(this)}
        t9nPlaceholder={this.messages?.searchPlaceholder}
      ></instant-apps-language-translator-search>
    );
  }

  renderTrailingTopBarSection(): void {
    return <div class={CSS.topBarSection}>{this.renderLanguageSelection()}</div>;
  }

  renderLanguageSelection(): HTMLCalciteLabelElement {
    return (
      <calcite-label layout="inline">
        {this.messages?.translatedLanguage}
        <calcite-select onCalciteSelectChange={this.handleLanguageSelection.bind(this)}>{this.renderTranslatedLangOptions()}</calcite-select>
      </calcite-label>
    );
  }

  renderTranslatedLangOptions(): HTMLCalciteOptionElement[] {
    const locales = languageTranslatorState.uiData?.locales as LocaleItem[];
    const localeFlags = getLocales(locales);
    return localeFlags?.map(locale => {
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
    const isLast = `${keyIndex === uiDataKeysLen - 1 ? CSS.lastItem : ''}`;
    return (
      <instant-apps-language-translator-item
        key={`${key}-${keyIndex}`}
        class={isLast}
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

  onSuggestionSelect(e: CustomEvent): void {
    const fieldName = e.detail;
    const uiData = { ...languageTranslatorState.uiData } as LocaleUIData;
    const uiDataKeys = getUIDataKeys();
    const handleSelection = (key: string) => {
      const setting = uiData[key] as LocaleSettingItem;
      if (key === fieldName) {
        setting.selected = true;
        return;
      }
      setting.selected = false;
    };
    uiDataKeys.forEach(handleSelection);
    store.set('uiData', uiData);
  }

  close(): void {
    this.open = false;
  }

  handleLanguageSelection(e: CustomEvent): void {
    const node = e.target as HTMLCalciteSelectElement;
    const value = node.value;
    store.set('currentLanguage', value);
  }
}
