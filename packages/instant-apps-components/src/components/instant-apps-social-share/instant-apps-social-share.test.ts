import { expect, test, describe } from 'vitest';

import '../../../dist/components/instant-apps-social-share.js';

describe('popover', () => {
  const socialShare = document.createElement('instant-apps-social-share');

  document.body.appendChild(socialShare);
  new Promise(resolve => requestIdleCallback(resolve));

  test('popover default', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.mode).toBe('popover');
  });

  test('current URL window', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareUrl).toBe(window.location.href);
  });

  test('autoUpdateShareUrl', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.autoUpdateShareUrl).toBe(true);
  });

  test('shareText', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareText).toBe('');
    socialShare.shareText = 'This is the test shareText !';
    expect(element?.shareText).toBe('This is the test shareText !');
  });
  test('embed prop', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.embed).toBe(false);
    socialShare.embed = true;
    expect(element?.embed).toBe(true);
  });
  test('shareButtonColor', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareButtonColor).toBe('neutral');
    socialShare.shareButtonColor = 'inverse';
    expect(element?.shareButtonColor).toBe('inverse');
  });

  test('shareButtonType', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareButtonType).toBe('button');
    socialShare.shareButtonType = 'action';
    expect(element?.shareButtonType).toBe('action');
  });

  test('shareButtonScale', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareButtonScale).toBe(undefined);
    //should be defaulted to whatever scale is in the render logic
    socialShare.shareButtonScale = 's';
    expect(element?.shareButtonScale).toBe('s');
  });

  test('iframeInnerText', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.iframeInnerText).toBe('');

    socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
    expect(element?.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
  });

  test('popoverButtonIconScale', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.popoverButtonIconScale).toBe('m');

    socialShare.popoverButtonIconScale = 's';
    expect(element?.popoverButtonIconScale).toBe('s');
  });
  test('displayTipText', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.displayTipText).toBe(true);

    socialShare.displayTipText = false;
    expect(element?.displayTipText).toBe(false);
  });
  test('shortenShareUrl', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shortenShareUrl).toBe(true);

    socialShare.shortenShareUrl = false;
    expect(element?.shortenShareUrl).toBe(false);
  });
  test('socialMedia', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.socialMedia).toBe(true);

    socialShare.socialMedia = false;
    expect(element?.socialMedia).toBe(false);
  });
  test('shareIconsLayout', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareIconsLayout).toBe('vertical');

    socialShare.shareIconsLayout = 'horizontal';
    expect(element?.shareIconsLayout).toBe('horizontal');
  });
  test('scale', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.scale).toBe('m');

    socialShare.scale = 'l';
    expect(element?.scale).toBe('l');
  });
  test('successMessage', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.successMessage).toBe('');

    socialShare.successMessage = 'Your awsome map has been copied to clipboard';
    expect(element?.successMessage).toBe('Your awsome map has been copied to clipboard');
  });

  test('defaultUrlParams', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.defaultUrlParams).toBe(null);
    const shareParams = {
      center: true,
      level: true,
      viewpoint: true,
      selectedFeature: false,
      hiddenLayers: true,
    };

    socialShare.defaultUrlParams = shareParams;

    expect(socialShare.defaultUrlParams).toBe(shareParams);

    expect(element?.defaultUrlParams).toHaveProperty('center', shareParams['center']);
    expect(element?.defaultUrlParams).toHaveProperty('level', shareParams['level']);
    expect(element?.defaultUrlParams).toHaveProperty('viewpoint', shareParams['viewpoint']);
    expect(element?.defaultUrlParams).toHaveProperty('selectedFeature', shareParams['selectedFeature']);
    expect(element?.defaultUrlParams).toHaveProperty('hiddenLayers', shareParams['hiddenLayers']);
  });

  test('popoverPositioning', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.popoverPositioning).toBe('absolute');

    socialShare.popoverPositioning = 'fixed';
    expect(element?.popoverPositioning).toBe('fixed');
  });

  test('removePopoverOffset', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.removePopoverOffset).toBe(false);

    socialShare.removePopoverOffset = true;
    expect(element?.removePopoverOffset).toBe(true);
    socialShare.remove();
  });
});

describe('inline', () => {
  const socialShare = document.createElement('instant-apps-social-share');
  socialShare.setAttribute('mode', 'inline');
  document.body.appendChild(socialShare);
  new Promise(resolve => requestIdleCallback(resolve));

  test('defaulting to popover', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.mode).toBe('inline');
  });

  test('URL window', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareUrl).toBe(window.location.href);
  });
  //autoUpdateShareUrl
  test('autoUpdateShareUrl defualt', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.autoUpdateShareUrl).toBe(true);
  });
  //shareText
  test(' shareText', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareText).toBe('');
    socialShare.shareText = 'This is the test shareText !';
    expect(element?.shareText).toBe('This is the test shareText !');
  });
  test('embed prop', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.embed).toBe(false);
    socialShare.embed = true;
    expect(element?.embed).toBe(true);
  });
  test('shareButtonColor', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareButtonColor).toBe('neutral');
    socialShare.shareButtonColor = 'inverse';
    expect(element?.shareButtonColor).toBe('inverse');
  });

  test('shareButtonType', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareButtonType).toBe('button');
    socialShare.shareButtonType = 'action';
    expect(element?.shareButtonType).toBe('action');
  });

  test('shareButtonType', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareButtonScale).toBe(undefined);
    //should be defaulted to whatever scale is in the render logic
    socialShare.shareButtonScale = 's';
    expect(element?.shareButtonScale).toBe('s');
  });

  test('shareButtonType', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.iframeInnerText).toBe('');

    socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
    expect(element?.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
  });

  test('displayTipText', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.displayTipText).toBe(true);

    socialShare.displayTipText = false;
    expect(element?.displayTipText).toBe(false);
  });
  test('shortenShareUrl', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shortenShareUrl).toBe(true);

    socialShare.shortenShareUrl = false;
    expect(element?.shortenShareUrl).toBe(false);
  });
  test('socialMedia', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.socialMedia).toBe(true);

    socialShare.socialMedia = false;
    expect(element?.socialMedia).toBe(false);
  });
  test('shareIconsLayout', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.shareIconsLayout).toBe('vertical');

    socialShare.shareIconsLayout = 'horizontal';
    expect(element?.shareIconsLayout).toBe('horizontal');
  });
  test('scale', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.scale).toBe('m');

    socialShare.scale = 'l';
    expect(element?.scale).toBe('l');
  });
  test('successMessage', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.successMessage).toBe('');

    socialShare.successMessage = 'Your awsome map has been copied to clipboard';
    expect(element?.successMessage).toBe('Your awsome map has been copied to clipboard');
  });

  test('defaultUrlParams', () => {
    const element = document.querySelector('instant-apps-social-share');
    expect(element).toBeTruthy();
    expect(element?.defaultUrlParams).toBe(null);
    const shareParams = {
      center: true,
      level: true,
      viewpoint: true,
      selectedFeature: false,
      hiddenLayers: true,
    };
    socialShare.defaultUrlParams = shareParams;

    expect(element?.defaultUrlParams).toBe(shareParams);

    expect(element?.defaultUrlParams).toHaveProperty('center', shareParams['center']);
    expect(element?.defaultUrlParams).toHaveProperty('level', shareParams['level']);
    expect(element?.defaultUrlParams).toHaveProperty('viewpoint', shareParams['viewpoint']);
    expect(element?.defaultUrlParams).toHaveProperty('selectedFeature', shareParams['selectedFeature']);
    expect(element?.defaultUrlParams).toHaveProperty('hiddenLayers', shareParams['hiddenLayers']);
  });
});
