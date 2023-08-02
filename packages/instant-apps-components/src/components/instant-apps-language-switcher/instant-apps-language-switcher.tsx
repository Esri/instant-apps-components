import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';

import LanguageTranslator_t9n from '../../assets/t9n/instant-apps-language-translator/resources.json';
import { getMessages } from '../instant-apps-language-translator/support/utils';
import { Element } from '@stencil/core';

@Component({
  tag: 'instant-apps-language-switcher',
  styleUrl: 'instant-apps-language-switcher.scss',
  shadow: true,
})
export class InstantAppsLanguageSwitcher {
  @Element()
  el: HTMLInstantAppsLanguageSwitcherElement;

  @Prop()
  icon: string;

  @Prop()
  portalItemResourceId: string;

  @Prop()
  translatedLanguages: string[] = [];

  @State()
  messages: typeof LanguageTranslator_t9n;

  @Event()
  selectedLanguageUpdated: EventEmitter<string>;

  @State()
  selectedLanguage: string | null = null;

  async componentWillLoad() {
    this.messages = await getMessages(document.createElement('instant-apps-language-translator'));
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
    return this.translatedLanguages.map(translatedLanguage => this.renderDropdownItem(translatedLanguage));
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
      this.selectedLanguageUpdated.emit(translatedLanguage);
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
}
