import { expect, test, describe } from 'vitest';

import '../../../dist/components/instant-apps-social-share.js';

describe('popover', () => {
  const socialShare = document.createElement('instant-apps-social-share');
  document.body.appendChild(socialShare);
  new Promise(resolve => requestIdleCallback(resolve));

  test('popover default', () => {
    expect(socialShare.mode).toBe('popover');
  });

  test('current URL window', () => {
    expect(socialShare.shareUrl).toBe(window.location.href);
  });

  test('autoUpdateShareUrl', () => {
    expect(socialShare.autoUpdateShareUrl).toBe(true);
  });

  test('shareText', () => {
    expect(socialShare.shareText).toBe('');
    socialShare.shareText = 'This is the test shareText !';
    expect(socialShare.shareText).toBe('This is the test shareText !');
  });
  test('embed prop', () => {
    expect(socialShare.embed).toBe(false);
    socialShare.embed = true;
    expect(socialShare.embed).toBe(true);
  });
  test('shareButtonColor', () => {
    expect(socialShare.shareButtonColor).toBe('neutral');
    socialShare.shareButtonColor = 'inverse';
    expect(socialShare.shareButtonColor).toBe('inverse');
  });

  test('shareButtonType', () => {
    expect(socialShare.shareButtonType).toBe('button');
    socialShare.shareButtonType = 'action';
    expect(socialShare.shareButtonType).toBe('action');
  });

  test('shareButtonScale', () => {
    expect(socialShare.shareButtonScale).toBe(undefined);
    //should be defaulted to whatever scale is in the render logic
    socialShare.shareButtonScale = 's';
    expect(socialShare.shareButtonScale).toBe('s');
  });

  test('iframeInnerText', () => {
    expect(socialShare.iframeInnerText).toBe('');

    socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
    expect(socialShare.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
  });

  test('popoverButtonIconScale', () => {
    expect(socialShare.popoverButtonIconScale).toBe('m');

    socialShare.popoverButtonIconScale = 's';
    expect(socialShare.popoverButtonIconScale).toBe('s');
  });
  test('displayTipText', () => {
    expect(socialShare.displayTipText).toBe(true);

    socialShare.displayTipText = false;
    expect(socialShare.displayTipText).toBe(false);
  });
  test('shortenShareUrl', () => {
    expect(socialShare.shortenShareUrl).toBe(true);

    socialShare.shortenShareUrl = false;
    expect(socialShare.shortenShareUrl).toBe(false);
  });
  test('socialMedia', () => {
    expect(socialShare.socialMedia).toBe(true);

    socialShare.socialMedia = false;
    expect(socialShare.socialMedia).toBe(false);
  });
  test('shareIconsLayout', () => {
    expect(socialShare.shareIconsLayout).toBe('vertical');

    socialShare.shareIconsLayout = 'horizontal';
    expect(socialShare.shareIconsLayout).toBe('horizontal');
  });
  test('scale', () => {
    expect(socialShare.scale).toBe('m');

    socialShare.scale = 'l';
    expect(socialShare.scale).toBe('l');
  });
  test('successMessage', () => {
    expect(socialShare.successMessage).toBe('');

    socialShare.successMessage = 'Your awsome map has been copied to clipboard';
    expect(socialShare.successMessage).toBe('Your awsome map has been copied to clipboard');
  });

  test('defaultUrlParams', () => {
    expect(socialShare.defaultUrlParams).toBe(null);
    const shareParams = {
      center: true,
      level: true,
      viewpoint: true,
      selectedFeature: false,
      hiddenLayers: true,
    };

    socialShare.defaultUrlParams = shareParams;

    expect(socialShare.defaultUrlParams).toBe(shareParams);

    expect(socialShare.defaultUrlParams).toHaveProperty('center', shareParams['center']);
    expect(socialShare.defaultUrlParams).toHaveProperty('level', shareParams['level']);
    expect(socialShare.defaultUrlParams).toHaveProperty('viewpoint', shareParams['viewpoint']);
    expect(socialShare.defaultUrlParams).toHaveProperty('selectedFeature', shareParams['selectedFeature']);
    expect(socialShare.defaultUrlParams).toHaveProperty('hiddenLayers', shareParams['hiddenLayers']);
  });

  test('popoverPositioning', () => {
    expect(socialShare.popoverPositioning).toBe('absolute');

    socialShare.popoverPositioning = 'fixed';
    expect(socialShare.popoverPositioning).toBe('fixed');
  });

  test('removePopoverOffset', () => {
    expect(socialShare.removePopoverOffset).toBe(false);

    socialShare.removePopoverOffset = true;
    expect(socialShare.removePopoverOffset).toBe(true);
  });
});

describe('inline', () => {
  const socialShare = document.createElement('instant-apps-social-share');
  socialShare.setAttribute('mode', 'inline');
  document.body.appendChild(socialShare);
  new Promise(resolve => requestIdleCallback(resolve));

  test('defaulting to popover', () => {
    expect(socialShare.mode).toBe('inline');
  });

  test('URL window', () => {
    expect(socialShare.shareUrl).toBe(window.location.href);
  });
  //autoUpdateShareUrl
  test('autoUpdateShareUrl defualt', () => {
    expect(socialShare.autoUpdateShareUrl).toBe(true);
  });
  //shareText
  test(' shareText', () => {
    expect(socialShare.shareText).toBe('');
    socialShare.shareText = 'This is the test shareText !';
    expect(socialShare.shareText).toBe('This is the test shareText !');
  });
  test('embed prop', () => {
    expect(socialShare.embed).toBe(false);
    socialShare.embed = true;
    expect(socialShare.embed).toBe(true);
  });
  test('shareButtonColor', () => {
    expect(socialShare.shareButtonColor).toBe('neutral');
    socialShare.shareButtonColor = 'inverse';
    expect(socialShare.shareButtonColor).toBe('inverse');
  });

  test('shareButtonType', () => {
    expect(socialShare.shareButtonType).toBe('button');
    socialShare.shareButtonType = 'action';
    expect(socialShare.shareButtonType).toBe('action');
  });

  test('shareButtonType', () => {
    expect(socialShare.shareButtonScale).toBe(undefined);
    //should be defaulted to whatever scale is in the render logic
    socialShare.shareButtonScale = 's';
    expect(socialShare.shareButtonScale).toBe('s');
  });

  test('shareButtonType', () => {
    expect(socialShare.iframeInnerText).toBe('');

    socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
    expect(socialShare.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
  });

  test('popoverButtonIconScale', () => {
    expect(socialShare.popoverButtonIconScale).toBe('m');

    socialShare.popoverButtonIconScale = 's';
    expect(socialShare.popoverButtonIconScale).toBe('s');
  });
  test('displayTipText', () => {
    expect(socialShare.displayTipText).toBe(true);

    socialShare.displayTipText = false;
    expect(socialShare.displayTipText).toBe(false);
  });
  test('shortenShareUrl', () => {
    expect(socialShare.shortenShareUrl).toBe(true);

    socialShare.shortenShareUrl = false;
    expect(socialShare.shortenShareUrl).toBe(false);
  });
  test('socialMedia', () => {
    expect(socialShare.socialMedia).toBe(true);

    socialShare.socialMedia = false;
    expect(socialShare.socialMedia).toBe(false);
  });
  test('shareIconsLayout', () => {
    expect(socialShare.shareIconsLayout).toBe('vertical');

    socialShare.shareIconsLayout = 'horizontal';
    expect(socialShare.shareIconsLayout).toBe('horizontal');
  });
  test('scale', () => {
    expect(socialShare.scale).toBe('m');

    socialShare.scale = 'l';
    expect(socialShare.scale).toBe('l');
  });
  test('successMessage', () => {
    expect(socialShare.successMessage).toBe('');

    socialShare.successMessage = 'Your awsome map has been copied to clipboard';
    expect(socialShare.successMessage).toBe('Your awsome map has been copied to clipboard');
  });

  test('defaultUrlParams', () => {
    expect(socialShare.defaultUrlParams).toBe(null);
    const shareParams = {
      center: true,
      level: true,
      viewpoint: true,
      selectedFeature: false,
      hiddenLayers: true,
    };
    socialShare.defaultUrlParams = shareParams;

    expect(socialShare.defaultUrlParams).toBe(shareParams);
  });

  test('popoverPositioning', () => {
    expect(socialShare.popoverPositioning).toBe('absolute');

    socialShare.popoverPositioning = 'fixed';
    expect(socialShare.popoverPositioning).toBe('fixed');
  });

  test('removePopoverOffset', () => {
    expect(socialShare.removePopoverOffset).toBe(false);

    socialShare.removePopoverOffset = true;
    expect(socialShare.removePopoverOffset).toBe(true);
  });
});
