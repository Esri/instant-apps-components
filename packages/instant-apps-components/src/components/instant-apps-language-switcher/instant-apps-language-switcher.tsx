import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';
import { getMessages } from '../instant-apps-language-translator/support/utils';
import { Element } from '@stencil/core';
import { getPortalItemResourceT9nData } from '../../utils/languageSwitcher';

@Component({
  tag: 'instant-apps-language-switcher',
  styleUrl: 'instant-apps-language-switcher.scss',
  shadow: true,
})
export class InstantAppsLanguageSwitcher {
  portalItemResourceT9n: __esri.PortalItemResource;

  @Element()
  el: HTMLInstantAppsLanguageSwitcherElement;

  /**
   * Icon to display.
   */
  @Prop()
  icon: string = 'globe';

  /**
   * Instant App portal item - used to fetch it's associated portal item resource. The portal item resource will contain the user defined translated strings.
   */
  @Prop()
  portalItem!: __esri.PortalItem;

  @State()
  locales: string[] = [];

  @State()
  messages: typeof LanguageTranslator_t9n;

  @State()
  selectedLanguage: string | null = null;

  @State()
  t9nData: any = null;

  @Event()
  selectedLanguageUpdated: EventEmitter<string>;

  async componentWillLoad() {
    this.messages = await getMessages(document.createElement('instant-apps-language-translator'));
    this.portalItemResourceT9n = await this.getPortalItemResourceT9n();
    const t9nData = await getPortalItemResourceT9nData(this.portalItemResourceT9n);
    if (t9nData) {
      this.t9nData = t9nData;
      this.locales = Object.keys(t9nData);
    }
  }

  render() {
    const trigger = this.renderTrigger();
    const dropdown = this.renderDropdownItems();
    return (
      <calcite-dropdown width="m">
        {trigger}
        {dropdown}
      </calcite-dropdown>
    );
  }

  renderTrigger(): HTMLCalciteActionElement {
    return (
      <calcite-action
        slot="trigger"
        icon={this.icon}
        text={!this.selectedLanguage ? this.messages?.selectLanguage : this.getSelectedLanguageText(this.selectedLanguage)}
        text-enabled={true}
      />
    );
  }

  renderDropdownItems(): HTMLCalciteDropdownItemElement[] {
    return this.locales?.map(translatedLanguage => this.renderDropdownItem(translatedLanguage));
  }

  renderDropdownItem(translatedLanguage: string): HTMLCalciteDropdownItemElement {
    const text = this.getSelectedLanguageText(translatedLanguage);
    const selected = translatedLanguage === this.selectedLanguage;

    return (
      <calcite-dropdown-item
        key={translatedLanguage}
        value={translatedLanguage}
        selected={selected}
        onCalciteDropdownItemSelect={this.calciteDropdownItemSelectCallback(translatedLanguage)}
      >
        {text}
      </calcite-dropdown-item>
    );
  }

  calciteDropdownItemSelectCallback(translatedLanguage: string): () => void {
    return () => {
      this.selectedLanguage = translatedLanguage;
      this.selectedLanguageUpdated.emit(this.t9nData[translatedLanguage]);
    };
  }

  getSelectedLanguageText(translatedLanguage: string): string {
    const { messages } = this;
    const translatedLanguageNames = messages?.translatedLanguageNames;
    const enLanguageNames = messages?.languages;
    const translatedLanguageName = translatedLanguageNames?.[translatedLanguage];
    const enLanguageName = enLanguageNames?.[translatedLanguage];
    return `${translatedLanguageName} - ${enLanguageName}`;
  }

  async getPortalItemResourceT9n(): Promise<__esri.PortalItemResource> {
    const { portalItem } = this;
    try {
      const fetchResourcesRes = await portalItem.fetchResources();
      const t9nDataItems = fetchResourcesRes.resources.filter(resourceDataItem => resourceDataItem.resource.path.indexOf('t9n/') > -1);
      const t9nResourceItem = t9nDataItems[0].resource;
      return Promise.resolve(t9nResourceItem);
    } catch {
      return Promise.reject(null);
    }
  }
}
