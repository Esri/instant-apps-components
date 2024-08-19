import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-landing-page.js';
import { waitForShadowRoot } from '../../utils/testUtils.js';
const componentConfig = {
  enableSignIn: true,
  titleText: 'Vitest Instant App',
  subtitleText: 'Hi this is only for testing purposes',
  descriptionText: "Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'",
  entryButtonText: 'Click me!',
  iconImageScale: 's',
  iconImage: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png',
};
const {enableSignIn, titleText, subtitleText, descriptionText, entryButtonText,iconImageScale ,iconImage } = componentConfig;
const CSS = {
  BASE: 'instant-apps-landing-page',
  titleText: 'instant-apps-landing-page__title-text',
  subtitleText: 'instant-apps-landing-page__subtitle-text',
  descriptionText: 'instant-apps-landing-page__description-text',
  closed: 'instant-apps-landing-page--closed',
  closedNoTransition: 'instant-apps-landing-page--closed-no-transition',
  iconImage: 'instant-apps-landing-page__icon-image',
  removeTransition: 'instant-apps-landing-page__remove-transition',
  removePadding: 'instant-apps-landing-page__remove-padding',
  alignment: 'instant-apps-landing-page__alignment--',
  entryButton: 'instant-apps-landing-page__entry-button',
  contentContainer: 'instant-apps-landing-page__content-container',
  buttonContainer: 'instant-apps-landing-page__button-container',
  signIn: 'instant-apps-landing-page__sign-in',
  signInOverlay: 'instant-apps-landing-page__sign-in--overlay',
  iconImageScale: {
    s: ' instant-apps-landing-page__icon-image-scale--s',
    m: ' instant-apps-landing-page__icon-image-scale--m',
    l: ' instant-apps-landing-page__icon-image-scale--l',
  },
};
  
type cases  = [boolean, () => HTMLInstantAppsLandingPageElement]
type allTests = cases[]

const testCases : allTests = 
 [[false,   function createNoSignIn() {
  let ss = document.createElement('instant-apps-landing-page');
  return ss;
}],

 [true,   function createSignIn() {
  let ss = document.createElement('instant-apps-landing-page');
  ss.enableSignIn = enableSignIn;
  return ss;
}]]

describe('Landing Page', async () => {
  testCases.forEach( async (arr) => {
    const [elem, getElem] = arr;
    const landingPage = getElem() ;
    landingPage.setAttribute('title-text', titleText);
    landingPage.setAttribute('subtitle-text', subtitleText);
    landingPage.setAttribute('description-text', descriptionText);
    landingPage.setAttribute('entry-button-text',entryButtonText);
    landingPage.setAttribute('icon-image-scale', iconImageScale);
    landingPage.setAttribute('icon-image', iconImage);
    document.body.appendChild(landingPage);
    await new Promise(resolve => requestIdleCallback(resolve));
    let element;
    let shadow;
    let signInComp;
    let signInShadow
    beforeEach( async () =>{
      element = document.querySelector('instant-apps-landing-page');
      shadow = await waitForShadowRoot(element);
      if (elem){
        signInComp = shadow.querySelector('instant-apps-sign-in');
        signInShadow = await waitForShadowRoot(signInComp);
      } 
    })
    describe('customization', async () => {
      expect(element).toBeTruthy();
      describe.runIf(elem) ("sign in enabled", async () => {
        test("renderLandingPageSignIn",async () => {
          const signInSubText = signInComp.subtitleText;
          expect(signInSubText).toBe(subtitleText);
        })
        test("titleText", () => {
          const prop = signInComp.titleText;
          expect(prop).toBe(titleText);
        })

        test("descriptionText", () => {
          const descriptionText = signInComp.descriptionText;
          expect(descriptionText).toBe(descriptionText);
        })
      });
      describe.runIf(!elem)("sign in disabled subtitleText", async () => { 
        test("subtitleText", () => {
          expect(element?.subtitleText).toBe(subtitleText);
          const subtitleSpan = shadow.querySelector(`span[class='${CSS.subtitleText}']`);
          expect(subtitleSpan.innerHTML).toBe(landingPage.subtitleText);
        }); 
      
        test("titleText", () => {
          expect(element?.titleText).toBe(titleText);
          const h1 = shadow.querySelector(`h1[class='${CSS.titleText}']`).innerHTML;
          expect(h1).toBe(titleText);
        })

        test('descriptionText', () => {
          expect(element?.descriptionText).toBe(descriptionText);
          const p = shadow.querySelector(`p[class=${CSS.descriptionText}]`).innerHTML;
          expect(p).toBe(descriptionText); 
        });
        test('entryButtonText', () =>{
          expect(element?.entryButtonText).toBe(entryButtonText);
          const button = shadow.querySelector(`calcite-button[class='${CSS.entryButton}']`).innerHTML;
          expect(button).toBe(entryButtonText);
      
      });
    });
      expect(element?.iconImageScale).toBe('s');
      expect(element?.iconImage).toBe('https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png');
    });

    test('empty string', async () => {
      landingPage.iconImageAltText = '';
      expect(element).toBeTruthy();
      expect(element?.iconImageAltText).toBe('');
    });
    test('prop change', async () => {
      landingPage.entryButtonText = 'Do Not Click me!';
      expect(element).toBeTruthy();
      expect(element?.entryButtonText).toBe('Do Not Click me!');
    });

    test('uninitialized button scale', async () => {
      const element = document.querySelector('instant-apps-landing-page');
      expect(element).toBeTruthy();
      expect(element?.entryButtonScale).toBe('l');
    });

    test('toggle open prop', async () => {
      expect(element).toBeTruthy();
      expect(element?.open).toBe(true);
      landingPage.open = false;

      expect(element?.open).toBe(false);
    });

    test('font family', async () => {
      expect(element).toBeTruthy();
      expect(element?.fontFamily).toBe('var(--calcite-sans-family);');
      landingPage.fontFamily = 'var(--monospace-family);';

      expect(element?.fontFamily).toBe('var(--monospace-family);');
    });
    test('uninitialized enableSignIn prop', async () => {
      expect(element).toBeTruthy();
      expect(element?.enableSignIn).toBe(undefined);
    });
    test('port and oauthappid', async () => {
      landingPage.oauthappid = 'wfblKnj2mvxLOiCx';
      expect(element).toBeTruthy();
      expect(element?.oauthappid).toBe(landingPage.oauthappid);
    });
  });
});
