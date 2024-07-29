import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-landing-page.js';
const enableSignIn = 'true';
const titleText = 'Vitest Instant App';
const subtitleText = 'Hi this is only for testing purposes';
const descriptionText = "Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'";
const entryButtonText = 'Click me!';
const iconImageScale = 's';
const iconImage = 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png';
const idCurrent = 'landingTheOnly';

describe('unitilialized enableSignIn Prop', async () => {
  const landingPage = document.createElement('instant-apps-landing-page');
  landingPage.setAttribute('id', idCurrent);
  landingPage.setAttribute('title-text', titleText);
  landingPage.setAttribute('subtitle-text', subtitleText);
  landingPage.setAttribute('description-text', descriptionText);
  landingPage.setAttribute('entry-button-text', entryButtonText);
  landingPage.setAttribute('icon-image-scale', iconImageScale);
  landingPage.setAttribute('icon-image', iconImage);
  document.body.appendChild(landingPage);
  await new Promise(resolve => requestIdleCallback(resolve));
  test('test customization', async () => {
    expect(landingPage.subtitleText).toBe('Hi this is only for testing purposes');
    expect(landingPage.titleText).toBe('Vitest Instant App');
    expect(landingPage.descriptionText).toBe("Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'");
    expect(landingPage.entryButtonText).toBe('Click me!');

    expect(landingPage.iconImageScale).toBe('s');
    expect(landingPage.iconImage).toBe('https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png');
  });

  test('test empty string', async () => {
    landingPage.iconImageAltText = '';
    expect(landingPage.iconImageAltText).toBe('');
  });
  test('test prop change', async () => {
    landingPage.entryButtonText = 'Do Not Click me!';
    expect(landingPage.entryButtonText).toBe('Do Not Click me!');
  });

  test('test uninitialized button scale', async () => {
    expect(landingPage.entryButtonScale).toBe('l');
  });

  test('test toggle open prop', async () => {
    expect(landingPage.open).toBe(true);
    landingPage.open = false;
    expect(landingPage.open).toBe(false);
  });

  test('test font family', async () => {
    expect(landingPage.fontFamily).toBe('var(--calcite-sans-family);');
    landingPage.fontFamily = 'var(--monospace-family);';
    expect(landingPage.fontFamily).toBe('var(--monospace-family);');
  });
  test('test unitilialized enableSignIn prop', async () => {
    //enableSignIn is not initialized anywehre therefore it must be undefined
    expect(landingPage.enableSignIn).toBe(undefined);
  });
});

describe('unitilialized enableSignIn Prop', async () => {
  const landingPage = document.createElement('instant-apps-landing-page');

  landingPage.setAttribute('title-text', titleText);
  landingPage.setAttribute('subtitle-text', subtitleText);
  landingPage.setAttribute('description-text', descriptionText);
  landingPage.setAttribute('entry-button-text', entryButtonText);
  landingPage.setAttribute('icon-image-scale', iconImageScale);
  landingPage.setAttribute('icon-image', iconImage);
  landingPage.setAttribute('enable-sign-in', enableSignIn);
  document.body.appendChild(landingPage);
  await new Promise(resolve => requestIdleCallback(resolve));
  test('test itilialized enableSignIn prop', async () => {
    expect(landingPage.enableSignIn).toBe(true);
  });
  test('test port and oauthappid', async () => {
    landingPage.oauthappid = 'wfblKnj2mvxLOiCx';

    expect(landingPage.oauthappid).toBe('wfblKnj2mvxLOiCx');
  });
});
