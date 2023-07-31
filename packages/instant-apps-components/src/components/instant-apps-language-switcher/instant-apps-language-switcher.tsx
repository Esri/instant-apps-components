import { Component, Host, Prop, State, h } from '@stencil/core';

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
  translatedLanguages: string[] = ['en'];

  @State()
  messages: typeof LanguageTranslator_t9n;

  async componentWillLoad() {
    this.messages = await getMessages(document.createElement('instant-apps-language-translator'));
  }

  render() {
    return (
      <Host>
        <calcite-dropdown width="m">
          <calcite-action slot="trigger" icon={this.icon} text="Select language" text-enabled={true} />

          {this.translatedLanguages.map(translatedLanguage => (
            <calcite-dropdown-item value={translatedLanguage}>{this.messages?.languages?.[translatedLanguage]}</calcite-dropdown-item>
          ))}
        </calcite-dropdown>
      </Host>
    );
  }
}
