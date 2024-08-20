import { expect, test, describe, beforeEach } from 'vitest';
import { waitForShadowRoot } from '../../utils/testUtils.js';
import '../../../dist/components/instant-apps-social-share.js';
import SocialShare_T9n from '../../assets/t9n/instant-apps-social-share/resources.json';

describe('social share', async () => {
  const shareParams = {
    center: true,
    level: true,
    viewpoint: true,
    selectedFeature: false,
    hiddenLayers: true,
  };
  const { center, level, viewpoint, selectedFeature, hiddenLayers } = shareParams;

  type cases = [string, () => HTMLInstantAppsSocialShareElement];
  type allTests = cases[];

  const testCases: allTests = [
    [
      'popover',
      function createPopover() {
        let ss = document.createElement('instant-apps-social-share');
        return ss;
      },
    ],
    [
      'inline',
      function createInline() {
        let ss = document.createElement('instant-apps-social-share');
        ss.setAttribute('mode', 'inline');
        return ss;
      },
    ],
  ];

  testCases.forEach(arr => {
    let element;
    let shadow;
    const [elem, getElem] = arr;
    const socialShare = getElem();

    const isInline = elem === 'inline';
    describe(`${elem}`, async () => {
      beforeEach(async () => {
        document.body.append(socialShare);
        await new Promise(resolve => requestIdleCallback(resolve));
        element = document.querySelector('instant-apps-social-share');
        shadow = await waitForShadowRoot(element);
      });
      test('default', () => {
        expect(element).toBeTruthy();
        expect(element.getAttribute('mode')).toBe(`${elem}`);
      });
      test('embed prop', async () => {
        expect(element).toBeTruthy();
        expect(element?.embed).toBe(false);
        socialShare.embed = true;
        document.body.append(socialShare);
        await new Promise(resolve => requestIdleCallback(resolve));

        expect(element?.embed).toBe(true);
        expect(element.inlineCopyEmbedOpened).toBe(false);
      });
      describe.runIf(!isInline)('popover render', async () => {
        test('check renderButton', async () => {
          const button = shadow.querySelector("calcite-button[id='shareButton']");
          expect(button).toBeTruthy();
        });
        test('check popover', async () => {
          const popover = shadow.querySelector(`calcite-popover[label='${SocialShare_T9n.share.label}']`);
          expect(popover).toBeTruthy();
        });
        test('shareButtonColor', async () => {
          expect(element).toBeTruthy();
          expect(element?.shareButtonColor).toBe('neutral');
          socialShare.shareButtonColor = 'inverse';
          document.body.append(socialShare);
          await new Promise(resolve => requestIdleCallback(resolve));
          expect(element?.shareButtonColor).toBe('inverse');
          const kind = shadow.querySelector("calcite-button[id='shareButton']").getAttribute('kind');
          expect(kind).toBe(socialShare.shareButtonColor);
        });

        test('shareButtonType', async () => {
          expect(element).toBeTruthy();
          expect(element?.shareButtonType).toBe('button');
          const button = shadow.querySelector("calcite-button[id='shareButton']");
          expect(button).toBeTruthy();

          socialShare.shareButtonType = 'action';
          document.body.append(socialShare);
          await new Promise(resolve => requestIdleCallback(resolve));
          const action = shadow.querySelector("calcite-action[id='shareButton']");
          expect(action).toBeTruthy();
          expect(element?.shareButtonType).toBe('action');
        });

        test('shareButtonScale', () => {
          expect(element).toBeTruthy();
          expect(element?.shareButtonScale).toBe(undefined);
          //should be defaulted to whatever scale is in the render logic
          socialShare.shareButtonScale = 's';
          expect(element?.shareButtonScale).toBe('s');
        });
      });
      describe.runIf(isInline)('inline render', () => {
        test('check popover', async () => {
          const popovers = shadow.querySelectorAll('calcite-popover');
          expect(popovers.length).toBe(2);
          let [copyToClipboard, copyEmbedToClipboard] = ['copyToClipboard', 'copyEmbedToClipboard'];
          popovers.forEach(elem => {
            let ref: string = elem.getAttribute('referenceElement');
            if (ref === copyToClipboard && copyToClipboard) {
              copyToClipboard = '';
            } else if (ref === copyEmbedToClipboard && copyEmbedToClipboard) {
              copyEmbedToClipboard = '';
            } else {
              expect(true).toBe(false);
            }
          });
        });
        test('check renderEmbedSuccess', async () => {
          const popover = shadow.querySelectorAll('span');
          let found = false;
          popover.forEach(element => {
            if (element.innerHTML === SocialShare_T9n.success.embed) {
              found = true;
              return;
            }
          });
          expect(found).toBe(true);
        });
        test('iframeInnerText', async () => {
          expect(element).toBeTruthy();
          expect(element?.iframeInnerText).toBe('');

          socialShare.iframeInnerText = 'This is the test for ifrmae inner text !@';
          socialShare.setAttribute('embed', 'true');
          document.body.append(socialShare);
          await new Promise(resolve => requestIdleCallback(resolve));
          expect(element.mode).toBe('inline');
          expect(element?.iframeInnerText).toBe('This is the test for ifrmae inner text !@');
          const iframe = shadow.querySelector('textarea')!;
          expect(iframe).toBeTruthy();
          const iframeText = iframe.value;
          const regex =
            /<iframe src="http:\/\/localhost:4444\/__vitest_test__\/__test__\/.* width="400" height="600" frameborder="0" style="border:0" allowfullscreen>This is the test for ifrmae inner text !@<\/iframe>/gm;
          const found = iframeText.match(regex);
          expect(found).toBeTruthy();
        });
        test('displayTipText', () => {
          expect(element).toBeTruthy();
          expect(element?.displayTipText).toBe(true);
          const renderTip = shadow.querySelector("calcite-icon[icon='lightbulb']");
          expect(renderTip).toBeTruthy();
        });
      });

      test('current URL window', () => {
        expect(element).toBeTruthy();
        expect(element?.shareUrl).toBe(window.location.href);
      });

      test('autoUpdateShareUrl', () => {
        expect(element).toBeTruthy();
        expect(element?.autoUpdateShareUrl).toBe(true);
      });

      test('shareText', () => {
        expect(element).toBeTruthy();
        expect(element?.shareText).toBe('');
        socialShare.shareText = 'This is the test shareText !';
        expect(element?.shareText).toBe('This is the test shareText !');
      });

      test('popoverButtonIconScale', () => {
        expect(element).toBeTruthy();
        expect(element?.popoverButtonIconScale).toBe('m');

        socialShare.popoverButtonIconScale = 's';
        expect(element?.popoverButtonIconScale).toBe('s');
      });

      test('shortenShareUrl', () => {
        expect(element).toBeTruthy();
        expect(element?.shortenShareUrl).toBe(true);

        socialShare.shortenShareUrl = false;
        expect(element?.shortenShareUrl).toBe(false);
      });
      test('socialMedia', () => {
        expect(element).toBeTruthy();
        expect(element?.socialMedia).toBe(true);

        socialShare.socialMedia = false;
        expect(element?.socialMedia).toBe(false);
      });
      test('shareIconsLayout', () => {
        expect(element).toBeTruthy();
        expect(element?.shareIconsLayout).toBe('vertical');

        socialShare.shareIconsLayout = 'horizontal';
        expect(element?.shareIconsLayout).toBe('horizontal');
      });
      test('scale', () => {
        expect(element).toBeTruthy();
        expect(element?.scale).toBe('m');

        socialShare.scale = 'l';
        expect(element?.scale).toBe('l');
      });
      test('successMessage', () => {
        expect(element).toBeTruthy();
        expect(element?.successMessage).toBe('');

        socialShare.successMessage = 'Your awsome map has been copied to clipboard';
        expect(element?.successMessage).toBe('Your awsome map has been copied to clipboard');
      });

      test('defaultUrlParams', () => {
        expect(element).toBeTruthy();
        expect(element?.defaultUrlParams).toBe(null);
        socialShare.defaultUrlParams = shareParams;

        expect(socialShare.defaultUrlParams).toBe(shareParams);

        expect(element?.defaultUrlParams).toHaveProperty('center', center);
        expect(element?.defaultUrlParams).toHaveProperty('level', level);
        expect(element?.defaultUrlParams).toHaveProperty('viewpoint', viewpoint);
        expect(element?.defaultUrlParams).toHaveProperty('selectedFeature', selectedFeature);
        expect(element?.defaultUrlParams).toHaveProperty('hiddenLayers', hiddenLayers);
      });
      describe.skipIf(isInline)('CSS popover', async () => {
        test('popoverPositioning', () => {
          expect(element).toBeTruthy();
          expect(element?.popoverPositioning).toBe('absolute');

          socialShare.popoverPositioning = 'fixed';
          expect(element?.popoverPositioning).toBe('fixed');
        });

        test('removePopoverOffset', () => {
          expect(element).toBeTruthy();
          expect(element?.removePopoverOffset).toBe(false);

          socialShare.removePopoverOffset = true;
          expect(element?.removePopoverOffset).toBe(true);
          socialShare.remove();
        });
      });
    });
  });
});
