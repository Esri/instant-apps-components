import { Component, h, Prop, State } from '@stencil/core';
import { substitute } from '@arcgis/core/intl';

const base = 'instant-apps-social-share';

const CSS = {
  base,
  dialog: `${base}__dialog`,
  options: `${base}__options`,
  tipContainer: `${base}__tip`,
  tipHeader: `${base}__tip-header`,
  tipContent: `${base}__tip-content`,
  icon: `${base}__icon`,
  optionText: `${base}__option-text`,
};

const SOCIAL_URL_TEMPLATES = {
  facebook: 'https://www.facebook.com/sharer/sharer.php?u={url}',
  twitter: 'https://twitter.com/intent/tweet?text={text}&url={url}',
  linkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url={url}',
};

@Component({
  tag: 'instant-apps-social-share',
  styleUrl: 'instant-apps-social-share.scss',
  shadow: true,
})
export class InstantAppsSocialShare {
  popover: HTMLCalcitePopoverElement;
  successPopover: HTMLCalcitePopoverElement;

  @Prop() shareText: string = '';
  @Prop() view: __esri.MapView | __esri.SceneView;
  @State() opened = false;
  @State() copied = false;

  componentDidLoad() {
    this.setupAutoCloseListeners();
    if (this.opened) {
      this.popover.toggle(true);
    }
  }

  setupAutoCloseListeners() {
    document.body.addEventListener('click', this.autoCloseCallback.bind(this));
    this.popover.addEventListener('click', this.stopPropagationCallback.bind(this));
  }

  autoCloseCallback() {
    this.opened = false;
    this.popover.toggle(this.opened);
  }

  stopPropagationCallback(event: Event) {
    event.stopPropagation();
  }

  disconnectedCallback() {
    document.body.removeEventListener('click', this.autoCloseCallback);
    this.popover.removeEventListener('click', this.stopPropagationCallback);
  }

  render() {
    const content = [this.renderOptions(), this.renderTip()];
    return [
      <calcite-popover ref={(el: HTMLCalcitePopoverElement) => (this.popover = el)} label="Share dialog" reference-element="shareButton" placement="bottom-start">
        <div class={CSS.dialog}>{content}</div>
      </calcite-popover>,
      <calcite-button onClick={this.togglePopover.bind(this)} id="shareButton" appearance="transparent">
        <calcite-icon icon="share" />
      </calcite-button>,
    ];
  }

  renderOptions() {
    return (
      <ul class={CSS.options} role="menu">
        <li id="copyToClipboard" onClick={this.handleShareItem.bind(this, 'link')} role="menuitem">
          <calcite-icon icon="link" scale="s" />
          <span class={CSS.optionText}>Copy Link</span>
        </li>
        <li onClick={this.handleShareItem.bind(this, 'facebook')} role="menuitem">
          <span class={CSS.icon}>{this.renderFacebookIcon()}</span>
          <span class={CSS.optionText}>Facebook</span>
        </li>
        <li onClick={this.handleShareItem.bind(this, 'twitter')} role="menuitem">
          <span class={CSS.icon}>{this.renderTwitterIcon()}</span>
          <span class={CSS.optionText}>Twitter</span>
        </li>
        <li onClick={this.handleShareItem.bind(this, 'linkedIn')} role="menuitem">
          <span class={CSS.icon}>{this.renderLinkedInIcon()}</span>
          <span class={CSS.optionText}>LinkedIn</span>
        </li>
      </ul>
    );
  }

  renderFacebookIcon() {
    return (
      <svg
        height="100%"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }}
        version="1.1"
        viewBox="0 0 512 512"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M512,256c0,-141.385 -114.615,-256 -256,-256c-141.385,0 -256,114.615 -256,256c0,127.777 93.616,233.685 216,252.89l0,-178.89l-65,0l0,-74l65,0l0,-56.4c0,-64.16 38.219,-99.6 96.695,-99.6c28.009,0 57.305,5 57.305,5l0,63l-32.281,0c-31.801,0 -41.719,19.733 -41.719,39.978l0,48.022l71,0l-11.35,74l-59.65,0l0,178.89c122.385,-19.205 216,-125.113 216,-252.89Z"
            style={{ fill: '#1877f2', fillRule: 'nonzero' }}
          />
          <path
            d="M355.65,330l11.35,-74l-71,0l0,-48.022c0,-20.245 9.917,-39.978 41.719,-39.978l32.281,0l0,-63c0,0 -29.297,-5 -57.305,-5c-58.476,0 -96.695,35.44 -96.695,99.6l0,56.4l-65,0l0,74l65,0l0,178.89c13.033,2.045 26.392,3.11 40,3.11c13.608,0 26.966,-1.065 40,-3.11l0,-178.89l59.65,0Z"
            style={{ fill: '#fff', fillRule: 'nonzero' }}
          />
        </g>
      </svg>
    );
  }

  renderTwitterIcon() {
    return (
      <svg
        height="100%"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }}
        version="1.1"
        viewBox="0 0 512 512"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect height="400" style={{ fill: 'none' }} width="400" x="56" y="56" />
        <path
          d="M161.014,464.013c193.208,0 298.885,-160.071 298.885,-298.885c0,-4.546 0,-9.072 -0.307,-13.578c20.558,-14.871 38.305,-33.282 52.408,-54.374c-19.171,8.495 -39.51,14.065 -60.334,16.527c21.924,-13.124 38.343,-33.782 46.182,-58.102c-20.619,12.235 -43.18,20.859 -66.703,25.498c-19.862,-21.121 -47.602,-33.112 -76.593,-33.112c-57.682,0 -105.145,47.464 -105.145,105.144c0,8.002 0.914,15.979 2.722,23.773c-84.418,-4.231 -163.18,-44.161 -216.494,-109.752c-27.724,47.726 -13.379,109.576 32.522,140.226c-16.715,-0.495 -33.071,-5.005 -47.677,-13.148l0,1.331c0.014,49.814 35.447,93.111 84.275,102.974c-15.464,4.217 -31.693,4.833 -47.431,1.802c13.727,42.685 53.311,72.108 98.14,72.95c-37.19,29.227 -83.157,45.103 -130.458,45.056c-8.358,-0.016 -16.708,-0.522 -25.006,-1.516c48.034,30.825 103.94,47.18 161.014,47.104"
          style={{ fill: '#1da1f2', fillRule: 'nonzero' }}
        />
      </svg>
    );
  }

  renderLinkedInIcon() {
    return (
      <svg
        height="100%"
        style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: '2' }}
        version="1.1"
        viewBox="0 0 512 512"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="g5891">
          <path
            d="M512,64c0,-35.323 -28.677,-64 -64,-64l-384,0c-35.323,0 -64,28.677 -64,64l0,384c0,35.323 28.677,64 64,64l384,0c35.323,0 64,-28.677 64,-64l0,-384Z"
            id="background"
            style={{ fill: '#2867b2' }}
          />
          <g id="shapes">
            <rect height="257.962" id="rect11" style={{ fill: '#fff' }} width="85.76" x="61.053" y="178.667" />
            <path
              d="M104.512,54.28c-29.341,0 -48.512,19.29 -48.512,44.573c0,24.752 18.588,44.574 47.377,44.574l0.554,0c29.903,0 48.516,-19.822 48.516,-44.574c-0.555,-25.283 -18.611,-44.573 -47.935,-44.573Z"
              id="path13-0"
              style={{ fill: '#fff', fillRule: 'nonzero' }}
            />
            <path
              d="M357.278,172.601c-45.49,0 -65.866,25.017 -77.276,42.589l0,-36.523l-85.738,0c1.137,24.197 0,257.961 0,257.961l85.737,0l0,-144.064c0,-7.711 0.554,-15.42 2.827,-20.931c6.188,-15.4 20.305,-31.352 43.993,-31.352c31.012,0 43.436,23.664 43.436,58.327l0,138.02l85.741,0l0,-147.93c0,-79.237 -42.305,-116.097 -98.72,-116.097Z"
              id="path15"
              style={{ fill: '#fff', fillRule: 'nonzero' }}
            />
          </g>
        </g>
      </svg>
    );
  }

  renderTip() {
    return (
      <div class={CSS.tipContainer}>
        <span class={CSS.tipHeader}>
          <calcite-icon icon="lightbulb" scale="s" /> Did you know?
        </span>
        <p class={CSS.tipContent}>Copy link will preserve the current map view, visible layers, and open popups. Use this option to share what you see in the app.</p>
      </div>
    );
  }

  togglePopover(event: Event) {
    event.stopPropagation();
    this.opened = !this.opened;
    this.popover.toggle(this.opened);
  }

  closePopover() {
    this.opened = false;
    this.popover.toggle(this.opened);
  }

  handleShareItem(type: 'link' | 'facebook' | 'twitter' | 'linkedIn') {
    switch (type) {
      case 'link':
        navigator.clipboard.writeText(window.location.href);
        return;
      case 'facebook':
      case 'twitter':
      case 'linkedIn':
        const urlData = {
          url: encodeURI(window.location.href),
        };
        const data = type === 'twitter' ? { ...urlData, text: this.shareText } : urlData;
        const url = substitute(SOCIAL_URL_TEMPLATES[type], data);
        window.open(encodeURI(url), '_blank');
        this.closePopover();
        return;
    }
  }
}
