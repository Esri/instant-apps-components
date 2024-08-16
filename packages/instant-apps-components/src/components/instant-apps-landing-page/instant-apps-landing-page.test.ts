import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-landing-page.js';
const componentConfig = {
  enableSignIn: 'true',
  titleText: 'Vitest Instant App',
  subtitleText: 'Hi this is only for testing purposes',
  descriptionText: "Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'",
  entryButtonText: 'Click me!',
  iconImageScale: 's',
  iconImage: 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png',
};
const {enableSignIn, titleText, subtitleText, descriptionText, entryButtonText,iconImageScale ,iconImage } = componentConfig;


describe('Landing Page', async () => {
  const landingPage = document.createElement('instant-apps-landing-page');
  landingPage.setAttribute('title-text', titleText);
  landingPage.setAttribute('subtitle-text', subtitleText);
  landingPage.setAttribute('description-text', descriptionText);
  landingPage.setAttribute('entry-button-text',entryButtonText);
  landingPage.setAttribute('icon-image-scale', iconImageScale);
  landingPage.setAttribute('icon-image', iconImage);
  document.body.appendChild(landingPage);
  await new Promise(resolve => requestIdleCallback(resolve));
  test('customization', async () => {
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.subtitleText).toBe('Hi this is only for testing purposes');
    expect(element?.titleText).toBe('Vitest Instant App');
    expect(element?.descriptionText).toBe("Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'");
    expect(element?.entryButtonText).toBe('Click me!');

    expect(element?.iconImageScale).toBe('s');
    expect(element?.iconImage).toBe('https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png');
  });

  test('empty string', async () => {
    landingPage.iconImageAltText = '';
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.iconImageAltText).toBe('');
  });
  test('prop change', async () => {
    landingPage.entryButtonText = 'Do Not Click me!';
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.entryButtonText).toBe('Do Not Click me!');
  });

  test('uninitialized button scale', async () => {
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.entryButtonScale).toBe('l');
  });

  test('toggle open prop', async () => {
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.open).toBe(true);
    landingPage.open = false;

    expect(element?.open).toBe(false);
  });

  test('font family', async () => {
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.fontFamily).toBe('var(--calcite-sans-family);');
    landingPage.fontFamily = 'var(--monospace-family);';

    expect(element?.fontFamily).toBe('var(--monospace-family);');
  });
  test('uninitialized enableSignIn prop', async () => {
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.enableSignIn).toBe(undefined);
  });
  test('initialized enableSignIn prop', async () => {
    landingPage.setAttribute('enable-sign-in', enableSignIn);
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.enableSignIn).toBe(true);
  });
  test('port and oauthappid', async () => {
    landingPage.oauthappid = 'wfblKnj2mvxLOiCx';
    const element = document.querySelector('instant-apps-landing-page');
    expect(element).toBeTruthy();
    expect(element?.oauthappid).toBe(landingPage.oauthappid);
  });
});
