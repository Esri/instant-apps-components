import { Component, Host, Prop, State, h } from '@stencil/core';
import { store } from '../support/store';
import { LocaleSettingItem, LocaleUIData } from '../support/interfaces';

@Component({
  tag: 'instant-apps-language-translator-search',
  styleUrl: 'instant-apps-language-translator-search.scss',
  shadow: true,
})
export class InstantAppsLanguageTranslatorSearch {
  /**
   * Placeholder string for search input.
   */
  @Prop()
  t9nPlaceholder: string = 'Search';

  @State()
  results: any = [];

  render() {
    console.log(this.results);
    return (
      <Host>
        <calcite-input onCalciteInputInput={this.handleSearch.bind(this)} type="search" placeholder={this.t9nPlaceholder} icon="search" />
        <ul>
          {this.results.map(result => {
            return <li>{result.userLocaleData.label}</li>;
          })}
        </ul>
      </Host>
    );
  }

  handleSearch(e: CustomEvent): void {
    const node = e.target as HTMLCalciteInputElement;
    const value = node.value;
    const uiData = store.get('uiData') as LocaleUIData;
    // const portalItemResrouceT9n = store.get('portalItemResourceT9n');
    // const currentLanguage = store.get('currentLanguage') as string;
    // const translatedData = portalItemResrouceT9n[currentLanguage];
    const settingKeys = Object.keys(uiData);
    const resultKeys = settingKeys
      .filter(key => key !== 'locales' && key !== 'translatedLanguageLabels')
      .filter(key => {
        const setting = uiData[key] as LocaleSettingItem;
        const label = setting.userLocaleData.label;
        const userInput = value?.toLowerCase()?.trim();
        const isMatch = label?.toLowerCase()?.search(userInput) !== -1;
        return value && isMatch;
      });
    this.results = [...resultKeys.map(resultKey => uiData[resultKey])];
  }
}
