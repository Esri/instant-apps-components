import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import SignIn_T9n from '../../assets/t9n/instant-apps-sign-in/resources.json';
import { IPortal } from '../../interfaces/interfaces';
import { loadModules } from '../../utils/loadModules';
import { getMessages } from '../../utils/locale';

const CSS = {
  base: 'instant-apps-sign-in__container',
  landing: 'instant-apps-sign-in__landing-page',
  landingBtn: 'instant-apps-sign-in__landing-page-btns',
  SignInBtn: 'instant-apps-sign-in__sign-in-btn',
};

@Component({
  tag: 'instant-apps-sign-in',
  styleUrl: 'instant-apps-sign-in.scss',
  shadow: true,
})
export class InstantAppsSignIn {
  @Element() el: HTMLElement;

  /**
   * Pick the look of the sign in/out component. `navigation` will put sign out in calcite-navigation-user.
   * `avatar` will put sign out in calcite-avatar. `landingPage` is used for instant-apps-landing-page.
   */
  @Prop()
  type: 'navigation' | 'avatar' | 'landingPage' = 'navigation';

  /**
   * The apps Portal, used to setup sign in capabilities.
   */
  @Prop()
  portal!: IPortal;

  /**
   * The registered application id, used to setup sign in capabilities.
   */
  @Prop()
  oauthappid!: string;

  /**
   * Set to true to show the OAuth sign-in page in a popup window.
   */
  @Prop()
  openInPopup: boolean;

  /**
   * Set to `true` if app has landing page
   */
  @Prop()
  landingPage: boolean;

  @State()
  isSignedIn: boolean;

  @State()
  user: __esri.PortalUser;

  /**
   * Landing page title text.
   */
  @Prop()
  titleText: string;

  /**
   * Landing page subtitle text.
   */
  @Prop()
  subtitleText: string;

  /**
   * Landing page description text.
   */
  @Prop()
  descriptionText: string;

  @Prop()
  closeLandingPage: Function;

  @State()
  ready = false;

  @State()
  messages: typeof SignIn_T9n;

  idManager: __esri.IdentityManager;
  info: __esri.OAuthInfo;

  @Watch('portal')
  async watchPortal() {
    await this.initSignIn();
  }

  @Watch('oauthappid')
  async watchOauthappid() {
    await this.initSignIn();
  }

  async componentWillLoad() {
    getMessages(this);
    await this.initSignIn();
  }

  render() {
    const signIn = this.ready ? this.renderContent() : null;
    return <Host>{signIn}</Host>;
  }

  renderContent() {
    return this.type === 'landingPage' ? this.renderLandingPageSignIn() : this.renderSignInContainer();
  }

  renderSignInContainer() {
    return <div class={CSS.base}>{this.isSignedIn ? this.renderSignInDropdown() : this.renderSignInButton()}</div>;
  }

  renderSignInDropdown() {
    const dropdownScale = this.type === 'navigation' ? 'm' : 's';
    return (
      <calcite-dropdown placement="bottom-end" scale={dropdownScale}>
        {this.type === 'navigation' ? (
          <calcite-navigation-user
            slot="trigger"
            thumbnail={this.user?.thumbnailUrl}
            full-name={this.user?.fullName}
            username={this.user?.username}
            textDisabled
          ></calcite-navigation-user>
        ) : (
          <button slot="trigger">
            <calcite-avatar thumbnail={this.user?.thumbnailUrl} full-name={this.user?.fullName} username={this.user?.username}></calcite-avatar>
          </button>
        )}
        <calcite-dropdown-group selection-mode="none">
          <calcite-dropdown-item onClick={this.signOut.bind(this)}>{this.messages?.signOut}</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    );
  }

  renderSignInButton() {
    const appearance = this.type === 'navigation' ? 'transparent' : 'solid';
    const className = this.type === 'navigation' ? CSS.SignInBtn : '';
    return (
      <calcite-button class={className} onClick={this.signIn.bind(this)} scale="s" icon-start="sign-in" appearance={appearance}>
        {this.messages?.signIn}
      </calcite-button>
    );
  }

  renderLandingPageSignIn() {
    return (
      <div class={CSS.landing}>
        <h1>{this.titleText}</h1>
        <h2>{this.subtitleText}</h2>
        <p>{this.descriptionText}</p>
        <div class={CSS.landingBtn}>
          <calcite-button onClick={this.landingPageSignIn.bind(this)}>{this.messages?.signIn}</calcite-button>
          <calcite-button onClick={this.guestOnClick.bind(this)} appearance="outline">
            {this.messages?.continueAsGuest}
          </calcite-button>
        </div>
      </div>
    );
  }

  async initSignIn(): Promise<void> {
    if (this.portal == null || this.oauthappid == null) return;
    const [OAuthInfo, esriId, reactiveUtils] = await loadModules(['esri/identity/OAuthInfo', 'esri/identity/IdentityManager', 'esri/core/reactiveUtils']);

    this.idManager = esriId;
    this.info = new OAuthInfo({
      appId: this.oauthappid,
      portalUrl: this.portal.url,
      flowType: 'authorization-code',
      popup: this.openInPopup,
    });
    this.idManager.registerOAuthInfos([this.info]);
    this.isSignedIn = await this.checkSignInStatus();
    this.ready = true;
    this.watchCredential();
    reactiveUtils
      .whenOnce(() => this.portal.user)
      .then(() => {
        this.user = this.portal.user;
        this.ready = true;
      });
  }

  signIn() {
    if (this.landingPage) {
      this.setSignInLocalStorage();
    }
    this.idManager
      .getCredential(this.info.portalUrl + '/sharing', {
        oAuthPopupConfirmation: false,
      })
      .then(async () => {
        await this.checkSignInStatus();
      });
  }

  signOut() {
    this.idManager.destroyCredentials();
    this.portal.authMode = 'anonymous';
    localStorage.removeItem('_AGO_SESSION_');
    this.isSignedIn = false;
    this.portal.credential = null;
  }

  landingPageSignIn() {
    if (!this.isSignedIn) {
      this.setSignInLocalStorage();
      this.signIn();
    } else if (this.closeLandingPage != null) {
      this.closeLandingPage();
    }
  }

  guestOnClick() {
    this.signOut();
    if (this.closeLandingPage != null) {
      this.closeLandingPage();
    }
  }

  checkSignInStatus(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.idManager
        .checkSignInStatus(this.info.portalUrl + '/sharing')
        .then(async credential => {
          this.portal.credential = credential;
          resolve(true);
        })
        .catch(() => {
          this.portal.credential = null;
          resolve(false);
        });
    });
  }

  watchCredential() {
    this.portal.addHandles(
      this.portal.watch('credential', credential => {
        this.isSignedIn = credential != null;
      }),
    );
  }

  setSignInLocalStorage() {
    const date = new Date();
    localStorage.setItem('signing-in', date.getTime().toString());
    // remove from local storage if page doens't immediately redirect to sign in
    setTimeout(() => {
      localStorage.removeItem('signing-in');
    }, 2000);
  }
}
