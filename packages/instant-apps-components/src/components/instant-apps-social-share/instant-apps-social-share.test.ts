import { expect, test, describe } from 'vitest';

import '../../../dist/components/instant-apps-social-share.js';

describe('test popover', () => {
  const socialShare = document.createElement('instant-apps-social-share');
  socialShare.setAttribute('id', 'create-popover');
  document.body.appendChild(socialShare);
  new Promise(resolve => requestIdleCallback(resolve));

  test('should be defaulted to popover without explicit prop', () => {
    expect(socialShare.mode).toBe('popover');
  });

  test('should be current URL window', () => {
    expect(socialShare.shareUrl).toBe(window.location.href);
  });

  test('autoUpdateShareUrl should have a default value ', () => {
    expect(socialShare.autoUpdateShareUrl).toBe(true);
  });

  test('test setting shareText and checking default value', () => {
    expect(socialShare.shareText).toBe('');
    socialShare.shareText = 'This is the test shareText !';
    expect(socialShare.shareText).toBe('This is the test shareText !');
  });
  test('test setting embed prop and checking default value', () => {
    expect(socialShare.embed).toBe(false);
    socialShare.embed = true;
    expect(socialShare.embed).toBe(true);
  });
  test('test shareButtonColor and check default value', () => {
    expect(socialShare.shareButtonColor).toBe('neutral');
    socialShare.shareButtonColor = 'inverse';
    expect(socialShare.shareButtonColor).toBe('inverse');
  });

  test('test shareButtonType and setting default values', () => {
    expect(socialShare.shareButtonType).toBe('button');
    socialShare.shareButtonType = 'action';
    expect(socialShare.shareButtonType).toBe('action');
  });

  test('test shareButtonType and setting default values', () => {
    expect(socialShare.shareButtonScale).toBe(undefined);
    //should be defaulted to whatever scale is in the render logic
    socialShare.shareButtonScale = 's';
    expect(socialShare.shareButtonScale).toBe('s');
  });

  test('test shareButtonType and setting default values', () => {
    expect(socialShare.iframeInnerText).toBe('');

    socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
    expect(socialShare.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
  });

  test('test popoverButtonIconScale and setting default values', () => {
    expect(socialShare.popoverButtonIconScale).toBe('m');

    socialShare.popoverButtonIconScale = 's';
    expect(socialShare.popoverButtonIconScale).toBe('s');
  });
  test('test displayTipText and setting default values', () => {
    expect(socialShare.displayTipText).toBe(true);

    socialShare.displayTipText = false;
    expect(socialShare.displayTipText).toBe(false);
  });
  test('test shortenShareUrl and setting default values', () => {
    expect(socialShare.shortenShareUrl).toBe(true);

    socialShare.shortenShareUrl = false;
    expect(socialShare.shortenShareUrl).toBe(false);
  });
  test('test socialMedia and setting default values', () => {
    expect(socialShare.socialMedia).toBe(true);

    socialShare.socialMedia = false;
    expect(socialShare.socialMedia).toBe(false);
  });
  test('test shareIconsLayout and setting default values', () => {
    expect(socialShare.shareIconsLayout).toBe('vertical');

    socialShare.shareIconsLayout = 'horizontal';
    expect(socialShare.shareIconsLayout).toBe('horizontal');
  });
  test('test scale and setting default values', () => {
    expect(socialShare.scale).toBe('m');

    socialShare.scale = 'l';
    expect(socialShare.scale).toBe('l');
  });
  test('test successMessage and setting default values', () => {
    expect(socialShare.successMessage).toBe('');

    socialShare.successMessage = 'Your awsome map has been copied to clipboard';
    expect(socialShare.successMessage).toBe('Your awsome map has been copied to clipboard');
  });

  test('test defaultUrlParams and setting default values', () => {
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

  test('test popoverPositioning and setting default values', () => {
    expect(socialShare.popoverPositioning).toBe('absolute');

    socialShare.popoverPositioning = 'fixed';
    expect(socialShare.popoverPositioning).toBe('fixed');
  });

  test('test removePopoverOffset and setting default values', () => {
    expect(socialShare.removePopoverOffset).toBe(false);

    socialShare.removePopoverOffset = true;
    expect(socialShare.removePopoverOffset).toBe(true);
  });
});

describe('test inline', () => {
  const socialShare = document.createElement('instant-apps-social-share');
  socialShare.setAttribute('mode', 'inline');
  socialShare.setAttribute('id', 'create-inline');
  document.body.appendChild(socialShare);
  new Promise(resolve => requestIdleCallback(resolve));

  test('should be defaulted to popover without explicit prop', () => {
    expect(socialShare.mode).toBe('inline');
  });

  test('should be current URL window', () => {
    expect(socialShare.shareUrl).toBe(window.location.href);
  });
  //autoUpdateShareUrl
  test('autoUpdateShareUrl should haev default value ', () => {
    expect(socialShare.autoUpdateShareUrl).toBe(true);
  });
  //shareText
  test('test setting shareText and checking default value', () => {
    expect(socialShare.shareText).toBe('');
    socialShare.shareText = 'This is the test shareText !';
    expect(socialShare.shareText).toBe('This is the test shareText !');
  });
  test('test setting embed prop and checking default value', () => {
    expect(socialShare.embed).toBe(false);
    socialShare.embed = true;
    expect(socialShare.embed).toBe(true);
  });
  test('test shareButtonColor and check default value', () => {
    expect(socialShare.shareButtonColor).toBe('neutral');
    socialShare.shareButtonColor = 'inverse';
    expect(socialShare.shareButtonColor).toBe('inverse');
  });

  test('test shareButtonType and setting default values', () => {
    expect(socialShare.shareButtonType).toBe('button');
    socialShare.shareButtonType = 'action';
    expect(socialShare.shareButtonType).toBe('action');
  });

  test('test shareButtonType and setting default values', () => {
    expect(socialShare.shareButtonScale).toBe(undefined);
    //should be defaulted to whatever scale is in the render logic
    socialShare.shareButtonScale = 's';
    expect(socialShare.shareButtonScale).toBe('s');
  });

  test('test shareButtonType and setting default values', () => {
    expect(socialShare.iframeInnerText).toBe('');

    socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
    expect(socialShare.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
  });

  test('test popoverButtonIconScale and setting default values', () => {
    expect(socialShare.popoverButtonIconScale).toBe('m');

    socialShare.popoverButtonIconScale = 's';
    expect(socialShare.popoverButtonIconScale).toBe('s');
  });
  test('test displayTipText and setting default values', () => {
    expect(socialShare.displayTipText).toBe(true);

    socialShare.displayTipText = false;
    expect(socialShare.displayTipText).toBe(false);
  });
  test('test shortenShareUrl and setting default values', () => {
    expect(socialShare.shortenShareUrl).toBe(true);

    socialShare.shortenShareUrl = false;
    expect(socialShare.shortenShareUrl).toBe(false);
  });
  test('test socialMedia and setting default values', () => {
    expect(socialShare.socialMedia).toBe(true);

    socialShare.socialMedia = false;
    expect(socialShare.socialMedia).toBe(false);
  });
  test('test shareIconsLayout and setting default values', () => {
    expect(socialShare.shareIconsLayout).toBe('vertical');

    socialShare.shareIconsLayout = 'horizontal';
    expect(socialShare.shareIconsLayout).toBe('horizontal');
  });
  test('test scale and setting default values', () => {
    expect(socialShare.scale).toBe('m');

    socialShare.scale = 'l';
    expect(socialShare.scale).toBe('l');
  });
  test('test successMessage and setting default values', () => {
    expect(socialShare.successMessage).toBe('');

    socialShare.successMessage = 'Your awsome map has been copied to clipboard';
    expect(socialShare.successMessage).toBe('Your awsome map has been copied to clipboard');
  });

  test('test defaultUrlParams and setting default values', () => {
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

  test('test popoverPositioning and setting default values', () => {
    expect(socialShare.popoverPositioning).toBe('absolute');

    socialShare.popoverPositioning = 'fixed';
    expect(socialShare.popoverPositioning).toBe('fixed');
  });

  test('test removePopoverOffset and setting default values', () => {
    expect(socialShare.removePopoverOffset).toBe(false);

    socialShare.removePopoverOffset = true;
    expect(socialShare.removePopoverOffset).toBe(true);
  });
});
