import { Component, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { store } from '../support/store';
import { LocaleSettingItem, LocaleUIData } from '../support/interfaces';

const BASE = 'instant-apps-language-translator-search';

const CSS = {
  base: BASE,
  input: `${BASE}__input`,
  suggestionList: `${BASE}__suggestion-list`,
  suggestionListItem: `${BASE}__suggestion-list-item`,
};

@Component({
  tag: 'instant-apps-language-translator-search',
  styleUrl: 'instant-apps-language-translator-search.scss',
  scoped: true,
})
export class InstantAppsLanguageTranslatorSearch {
  searchInput: HTMLCalciteInputElement;

  /**
   * Placeholder string for search input.
   */
  @Prop()
  t9nPlaceholder: string = 'Search';

  @State()
  results: any = [];

  @Event()
  suggestionSelected: EventEmitter<string>;

  render() {
    return (
      <Host>
        <calcite-input
          ref={node => (this.searchInput = node)}
          class={CSS.input}
          onCalciteInputInput={this.handleSearch.bind(this)}
          type="search"
          placeholder={this.t9nPlaceholder}
          icon="search"
        />
        {this.results.length > 0 ? (
          <ul class={CSS.suggestionList}>
            {this.results.map(result => {
              return (
                <li onClick={this.selectSuggestion.bind(this)} class={CSS.suggestionListItem} data-field-name={result.fieldName}>
                  {result.userLocaleData.label}
                </li>
              );
            })}
          </ul>
        ) : null}
      </Host>
    );
  }

  handleSearch(e: CustomEvent): void {
    const node = e.target as HTMLCalciteInputElement;
    const userInput = node.value?.toLowerCase()?.trim();

    const uiData = store.get('uiData') as LocaleUIData;
    const settingKeys = Object.keys(uiData);

    const portalItemResrouceT9n = store.get('portalItemResourceT9n');
    const currentLanguage = store.get('currentLanguage') as string;
    const translatedData = portalItemResrouceT9n[currentLanguage];

    const possibleResultKeys = this.getSettingDataItems(settingKeys);
    const matchedResults = possibleResultKeys.filter(this.matchedResultsCallback(uiData, translatedData, userInput, currentLanguage));
    this.results = [
      ...matchedResults.map(matchedKey => {
        return { fieldName: matchedKey, ...uiData[matchedKey] };
      }),
    ];
  }

  matchedResultsCallback(uiData: LocaleUIData, translatedData: { [key: string]: string }, userInput: string, currentLanguage: string) {
    return (key: string) => {
      const setting = uiData[key] as LocaleSettingItem;

      const { label } = setting.userLocaleData;
      const { value } = setting.userLocaleData;
      const translatedLanguageLabel = uiData.translatedLanguageLabels[currentLanguage][key];
      const translatedLanguageValue = translatedData[key];

      const labelMatch = this.testUserInput(label, userInput);
      const valueMatch = this.testUserInput(value, userInput);
      const translatedLanguageLabelMatch = this.testUserInput(translatedLanguageLabel, userInput);
      const translatedLangValueMatch = this.testUserInput(translatedLanguageValue, userInput);

      const isMatch = labelMatch || valueMatch || translatedLanguageLabelMatch || translatedLangValueMatch;

      return value && isMatch;
    };
  }

  getSettingDataItems(settingKeys: string[]): string[] {
    return settingKeys.filter(key => key !== 'locales' && key !== 'translatedLanguageLabels');
  }

  testUserInput(testValue: string, userInput: string): boolean {
    return !!testValue.trim() && !!userInput.trim() && testValue?.toLowerCase()?.search(userInput) !== -1;
  }

  selectSuggestion(e: CustomEvent) {
    const node = e.target as HTMLLIElement;
    const fieldName = node.getAttribute('data-field-name') as string;
    this.suggestionSelected.emit(fieldName);
    this.resetSearchInput();
  }

  resetSearchInput(): void {
    this.searchInput.value = '';
    this.results = [];
  }
}
