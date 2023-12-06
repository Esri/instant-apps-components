import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import Sanitizer from '@esri/arcgis-html-sanitizer';
import { createSanitizerInstance } from 'templates-common-library/functionality/securityUtils';
import { getLocalStorageItem, removeItemFromLocalStorage, setLocalStorageItem } from './support/storageUtils';
import { getLocaleComponentStrings } from '../../utils/locale';
import Splash_T9n from '../../assets/t9n/instant-apps-splash/resources.json';

const CSS = {
  back: 'instant-apps-splash__back-content',
};

@Component({
  tag: 'instant-apps-splash',
  styleUrl: 'instant-apps-splash.scss',
  shadow: true,
})
export class InstantAppsSplash {
  private _sanitizer = createSanitizerInstance(Sanitizer);

  @Element()
  el: HTMLInstantAppsSplashElement;

  /**
   * Local storage key used to determine whether or not user has opted into "Don't show this again" checkbox.
   */
  @Prop()
  localStorageKey!: string;

  /**
   * Title of splash screen.
   */
  @Prop()
  titleText: string = '';

  /**
   * Content of splash screen.
   */
  @Prop()
  content: string = '';

  /**
   * Primary button text.
   */
  @Prop()
  primaryButtonText: string = '';

  /**
   * Controls the 'open' state of the modal element.
   */
  @Prop({
    mutable: true,
  })
  open = true;

  /**
   * When `true`, disables the component's close button.
   */
  @Prop()
  closeButtonDisabled = false;

  @State()
  messages: typeof Splash_T9n;

  /**
   * Emits when the splash modal is closed.
   */
  @Event() splashClose: EventEmitter<void>;

  @Watch('content')
  sanitizeContent(): void {
    this.content = this._sanitizer.sanitize(this.content);
  }

  componentWillLoad(): void {
    let open: boolean;
    const { localStorageKey } = this;
    if (localStorageKey) {
      open = this.open && !getLocalStorageItem(this.localStorageKey);
    } else {
      open = this.open;
    }
    this.el.open = open;
    if (this.content && this._sanitizer) this.sanitizeContent();
  }

  componentDidLoad(): void {
    this.setMessages();
  }

  render(): HTMLCalciteModalElement {
    return (
      <calcite-modal onCalciteModalClose={this.close.bind(this)} open={this.open} closeButtonDisabled={this.closeButtonDisabled}>
        {this.renderHeader()}
        {this.renderContent()}
        {this.localStorageKey ? this.renderDontShowThisAgainCheckbox() : null}
        {this.renderPrimaryButton()}
      </calcite-modal>
    );
  }

  renderHeader(): HTMLElement {
    const { titleText } = this;
    return <header slot="header">{titleText}</header>;
  }

  renderContent(): HTMLElement {
    const { content } = this;
    return <div slot="content" innerHTML={content}></div>;
  }

  renderDontShowThisAgainCheckbox(): HTMLDivElement {
    const { localStorageKey, messages } = this;
    const checked = getLocalStorageItem(localStorageKey) ? true : null;
    return (
      <div class={CSS.back} slot="back">
        <calcite-label layout="inline">
          <calcite-checkbox onCalciteCheckboxChange={this.handleDontShowThisAgain.bind(this)} checked={checked ?? undefined} />
          {messages?.dontShowThisAgain}
        </calcite-label>
      </div>
    );
  }

  renderPrimaryButton(): HTMLElement {
    const { primaryButtonText } = this;
    return (
      <calcite-button onClick={this.close.bind(this)} slot="primary">
        {primaryButtonText}
      </calcite-button>
    );
  }

  close(): void {
    this.open = false;
    this.splashClose.emit();
  }

  async setMessages(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0] as typeof Splash_T9n;
  }

  protected handleDontShowThisAgain(event: CustomEvent): void {
    const { localStorageKey } = this;
    if (!localStorageKey) return;
    const checkboxNode = event.target as HTMLCalciteCheckboxElement;
    const { checked } = checkboxNode;
    if (checked) {
      setLocalStorageItem(localStorageKey);
    } else {
      removeItemFromLocalStorage(localStorageKey);
    }
  }
}
