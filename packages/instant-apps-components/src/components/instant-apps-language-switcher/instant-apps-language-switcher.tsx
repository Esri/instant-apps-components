import { Component, Host, Prop, h } from '@stencil/core';

import { LocaleData } from "./support/interfaces";

@Component({
  tag: 'instant-apps-language-switcher',
  styleUrl: 'instant-apps-language-switcher.scss',
  shadow: true,
})
export class InstantAppsLanguageSwitcher {

  @Prop()
  data: LocaleData;

  render() {
    return (
      <calcite-modal title-text="Language Switcher | Translation">
        <calcite-button slot="primary">
          Close
        </calcite-button>
      </calcite-modal>
    );
  }

}
