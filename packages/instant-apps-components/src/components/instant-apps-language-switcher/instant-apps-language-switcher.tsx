import { Component, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';
import { getMessages } from '../instant-apps-language-translator/support/utils';
import { Element } from '@stencil/core';
import { getPortalItemResourceT9nData } from '../../utils/languageSwitcher';
import { loadModules } from 'esri-loader';
import { getComponentClosestLanguage } from '../../utils/locale';

@Component({
  tag: 'instant-apps-language-switcher',
  styleUrl: 'instant-apps-language-switcher.scss',
  shadow: true,
})
export class InstantAppsLanguageSwitcher {
  portalItemResourceT9n: __esri.PortalItemResource;
  userLocale: string;
  intl: __esri.intl;
  defaultWebMapId: string;

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

  /**
   * Reference to map view to switch web maps if present in locales.
   */
  @Prop()
  view?: __esri.MapView | __esri.SceneView;

  /**
   * Data used to populate language switcher dropdown.
   */
  @Prop()
  locales: { locale: string; webmap?: string }[] = [];

  @State()
  messages: typeof LanguageTranslator_t9n;

  @State()
  selectedLanguage: string | null = null;

  @State()
  t9nData: any = null;

    /**
   * Fires when a language is selected from the dropdown. This event will emit an object containing the information on the selected language and a flat object of unique identifiers and their associated values. 
   */
  @Event()
  selectedLanguageUpdated: EventEmitter<{
    locale: string;
    data?: {
      [key: string]: string;
    };
  }>;

  async componentWillLoad() {
    const [intl] = await loadModules(['esri/intl']);
    this.intl = intl;
    this.messages = await getMessages(document.createElement('instant-apps-language-translator'));
    try {
      this.portalItemResourceT9n = await this.getPortalItemResourceT9n();
      const t9nData = await getPortalItemResourceT9nData(this.portalItemResourceT9n);
      if (t9nData) {
        this.t9nData = t9nData;
      }
    } catch(err) {
      this.t9nData = {};
      console.error("NO PORTAL ITEM RESOURCE AVAILABLE.");
    } finally {
      const lang = getComponentClosestLanguage(document.body) as string;
      if (lang) {
        this.userLocale = lang;
        this.selectedLanguage = lang;
      }
   
      if (this.view) {
        const webmap = this.view.map as __esri.WebMap;
        this.defaultWebMapId = webmap.portalItem.id;
      }
    }

  }

  render() {
    const trigger = this.renderTrigger();
    const dropdown = this.renderDropdownItems();
    const { userLocale } = this;
    return (
      <calcite-dropdown width="m">
        {trigger}
        <calcite-dropdown-item
          key={`default-${userLocale}`}
          value={userLocale}
          onCalciteDropdownItemSelect={this.calciteDropdownItemSelectCallback(userLocale)}
          selected={this.selectedLanguage === this.userLocale}
        >
          {this.getSelectedLanguageText(userLocale)}
        </calcite-dropdown-item>
        {dropdown}
      </calcite-dropdown>
    );
  }

  renderTrigger(): HTMLCalciteActionElement {
    return <calcite-action slot="trigger" icon={this.icon} text={this.getSelectedLanguageText(this.selectedLanguage as string)} text-enabled={true} />;
  }

  renderDropdownItems(): HTMLCalciteDropdownItemElement[] {
    return this.locales?.map(localeItem => localeItem.locale)?.map(translatedLanguage => this.renderDropdownItem(translatedLanguage));
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
    return async () => {
      this.selectedLanguage = translatedLanguage;

      const { intl, selectedLanguage, t9nData, userLocale } = this;

      const eventData = this.locales.filter(locale => locale.locale === selectedLanguage)[0];

      if (selectedLanguage !== userLocale) eventData['data'] = t9nData[translatedLanguage];

      // Set url parameter 'locale' with value
      const params = new URLSearchParams(window.location.search);
      params.set('locale', this.selectedLanguage);

      intl.setLocale(selectedLanguage);

      if (this.view) {
        const [WebMap] = await loadModules(['esri/WebMap']);
        const webmap = this.locales.filter(localeItem => localeItem.locale === selectedLanguage)?.[0]?.webmap;
        if (webmap) {
          this.view.map = new WebMap({
            portalItem: {
              id: webmap,
            },
          });
        } else {
          this.view.map = new WebMap({
            portalItem: {
              id: this.defaultWebMapId,
            },
          });
        }
      }

      document.documentElement.setAttribute('lang', this.selectedLanguage);
      const prefersRTL = this.intl.prefersRTL();
      if (prefersRTL) {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }

      window.history.replaceState({}, '', decodeURIComponent(`${window.location.pathname}?${params}`));

      this.selectedLanguageUpdated.emit(eventData);
    };
  }

  getSelectedLanguageText(translatedLanguage: any): string {
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
      const testPath = 't9n/';
      const t9nDataItems = fetchResourcesRes.resources.filter(resourceDataItem => resourceDataItem.resource.path.indexOf(testPath) > -1);
      const t9nResourceItem = t9nDataItems[0].resource;
      return Promise.resolve(t9nResourceItem);
    } catch {
      return Promise.reject(null);
    }
  }

  @Method()
  async refresh(): Promise<void> {
    try {
      const t9nResourceItem = await this.getPortalItemResourceT9n();
      const [request] = await loadModules(['esri/request']);
      const reqConfig = { responseType: 'json', cacheBust: true };
      const reqRes = await request(t9nResourceItem.url, reqConfig);
      this.t9nData = reqRes.data;
      const refreshedData = { locale: this.selectedLanguage as string, data: this.t9nData[this.selectedLanguage as string] };
      this.selectedLanguageUpdated.emit(refreshedData);
    } catch {}
  }
}
