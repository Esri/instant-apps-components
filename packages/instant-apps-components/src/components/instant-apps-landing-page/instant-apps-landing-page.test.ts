import { expect, test, describe, beforeEach } from 'vitest';
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
  
describe('Landing Page', async () => {
  type cases  = [boolean, () => HTMLInstantAppsLandingPageElement]
  type allTests = cases[]

  const testCases : allTests = 
  [[false,   function createNoSignIn() {
    let ss = document.createElement('instant-apps-landing-page');
    return ss;
  }],
   [true, function createSignIn(){
    let ss = document.createElement('instant-apps-landing-page');
    ss.enableSignIn =  enableSignIn;
    return ss;
   }

   ]]

  testCases.forEach( async (arr) => {
    const [elem, getElem] = arr;
    const landingPage = getElem() ;
    landingPage.setAttribute('title-text', titleText);
    landingPage.setAttribute('subtitle-text', subtitleText);
    landingPage.setAttribute('description-text', descriptionText);
    landingPage.setAttribute('entry-button-text',entryButtonText);
    landingPage.setAttribute('icon-image-scale', iconImageScale);
    landingPage.setAttribute('icon-image', iconImage);
    let element;
    let shadow;

   describe('customization', async () => {
    beforeEach( async () =>{
      if (element){
        element.remove();
      }
      document.body.appendChild(landingPage);
        await new Promise(resolve => requestIdleCallback(resolve));

      element = document.querySelector('instant-apps-landing-page');
      shadow = await waitForShadowRoot(element);

    })
      describe.runIf(elem) ("sign in enabled", async () => {
        test("renderLandingPageSignIn", () => {
          
          const signInSubText = element.subtitleText;
          expect(signInSubText).toBe(subtitleText);
        })
        test("titleText", () => {
          const prop = element.titleText;
          expect(prop).toBe(titleText);
        })

        test("descriptionText", () => {
          const descriptionText = element.descriptionText;
          expect(descriptionText).toBe(descriptionText);
        })

      test('toggle open prop', async () => {
        expect(element).toBeTruthy();
        expect(element?.open).toBe(true);
        landingPage.open = false;
        document.body.appendChild(landingPage);
        await new Promise(resolve => requestIdleCallback(resolve));
        const closed = !landingPage.open ? (landingPage.disableTransition ? ` ${CSS.closedNoTransition}` : ` ${CSS.closed}`) : '';
        const divs = Array.from(shadow.querySelectorAll('div[class]'));
        expect(divs.some((div : HTMLElement) => div.className.includes(closed))).toBe(true);
        
    
        expect(element?.open).toBe(false);
      });


      });
      describe.runIf(!elem)("sign in disabled subtitleText", async () => { 
        test("subtitleText", () => {
          expect(element?.subtitleText).toBe(subtitleText);
          const subtitleSpan = shadow.querySelector(`span[class='${CSS.subtitleText}']`);
          expect(subtitleSpan.innerHTML).toBe(landingPage.subtitleText);
        }); 
      
        test("titleText", () => {
          expect(element?.titleText).toBe(titleText);
          const h1 = shadow.querySelector(`h1[class='${CSS.titleText}']`).innerText;
          expect(h1).toBe(titleText);
        })

        test('descriptionText', () => {
          expect(element?.descriptionText).toBe(descriptionText);
          const p = shadow.querySelector(`p[class=${CSS.descriptionText}]`).innerText;
          expect(p).toBe(descriptionText); 
        });
        test('entryButtonText', () =>{
          expect(element?.entryButtonText).toBe(entryButtonText);
          const button = shadow.querySelector(`calcite-button[class='${CSS.entryButton}']`).innerText;
          expect(button).toBe(entryButtonText);
      
        });
        test('entryButtonText prop change', async () => {
          landingPage.entryButtonText = 'Do Not Click me!';
          expect(element).toBeTruthy();
          expect(element?.entryButtonText).toBe('Do Not Click me!');
          document.body.appendChild(landingPage);
          await new Promise(resolve => requestIdleCallback(resolve));
          const button = shadow.querySelector(`calcite-button[class='${CSS.entryButton}']`).innerText;
          expect(button).toBe(landingPage.entryButtonText);
      
        });


        test('IconImageScale', () => {
          expect(element?.iconImageScale).toBe('s');
          const { s, m, l } = CSS.iconImageScale;
          const iconImageScaleCurr  = element?.iconImageScale === 'l' ? l : iconImageScale === 's' ? s : m;
          const image = shadow.querySelector(`img[class='${CSS.iconImage}${iconImageScaleCurr}']`);
          expect(image).toBeTruthy();
        });
        test('iconImage', () => {

          expect(element?.iconImage).toBe('https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png');
          const { s, m, l } = CSS.iconImageScale;
          const iconImageScaleCurr  = element?.iconImageScale === 'l' ? l : iconImageScale === 's' ? s : m;
          const image = shadow.querySelector(`img[class='${CSS.iconImage}${iconImageScaleCurr}']`);
          expect(image.getAttribute('src')).toBe(iconImage);
        });
        test('empty string', async () => {
          landingPage.iconImageAltText = '';
          expect(element).toBeTruthy();
          expect(element?.iconImageAltText).toBe('');
          const { s, m, l } = CSS.iconImageScale;
          const iconImageScaleCurr  = element?.iconImageScale === 'l' ? l : iconImageScale === 's' ? s : m;
          const image = shadow.querySelector(`img[class='${CSS.iconImage}${iconImageScaleCurr}']`);
          expect(image.alt).toBe(landingPage.iconImageAltText);

        });

      test('toggle open prop', async () => {
        expect(element).toBeTruthy();
        expect(element?.open).toBe(true);
        landingPage.open = false;
        document.body.appendChild(landingPage);
        await new Promise(resolve => requestIdleCallback(resolve));
      const closed = !landingPage.open ? (landingPage.disableTransition ? ` ${CSS.closedNoTransition}` : ` ${CSS.closed}`) : '';
        const removeTransition = landingPage.disableTransition ? ` ${CSS.removeTransition}` : '';
        const divs = Array.from(shadow.querySelectorAll('div[class]'));

        expect(divs.some((div : HTMLElement) => div.className.includes(closed) && div.className.includes(removeTransition))).toBe(true);
        
    
        expect(element?.open).toBe(false);
      });



    });
    });
    test('font family', async () => {
      expect(element).toBeTruthy();
      expect(element?.fontFamily).toBe('var(--calcite-sans-family);');
      landingPage.fontFamily = 'var(--monospace-family);';

      expect(element?.fontFamily).toBe('var(--monospace-family);');

    });
    test('port and oauthappid', async () => {
      landingPage.oauthappid = 'wfblKnj2mvxLOiCx';
      expect(element).toBeTruthy();
      expect(element?.oauthappid).toBe(landingPage.oauthappid);
    });
  });
});
