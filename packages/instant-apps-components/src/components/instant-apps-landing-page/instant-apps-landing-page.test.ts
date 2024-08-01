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

describe('uninitialized enableSignIn Prop', async () => {
  const landingPage = document.createElement('instant-apps-landing-page');
  landingPage.setAttribute('title-text', componentConfig.titleText);
  landingPage.setAttribute('subtitle-text', componentConfig.subtitleText);
  landingPage.setAttribute('description-text', componentConfig.descriptionText);
  landingPage.setAttribute('entry-button-text', componentConfig.entryButtonText);
  landingPage.setAttribute('icon-image-scale', componentConfig.iconImageScale);
  landingPage.setAttribute('icon-image', componentConfig.iconImage);
  document.body.appendChild(landingPage);
  await new Promise(resolve => requestIdleCallback(resolve));
  test('customization', async () => {
    expect(landingPage.subtitleText).toBe('Hi this is only for testing purposes');
    expect(landingPage.titleText).toBe('Vitest Instant App');
    expect(landingPage.descriptionText).toBe("Áádóó naashnishgo, náásht'įįh łeets'óózh jiní. Diné be'elyá bee iináanii át'éego, shił yá'");
    expect(landingPage.entryButtonText).toBe('Click me!');

    expect(landingPage.iconImageScale).toBe('s');
    expect(landingPage.iconImage).toBe('https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-instant-apps/assets/instant-apps-banner-fg.png');
  });

  test('empty string', async () => {
    landingPage.iconImageAltText = '';
    expect(landingPage.iconImageAltText).toBe('');
  });
  test('prop change', async () => {
    landingPage.entryButtonText = 'Do Not Click me!';
    expect(landingPage.entryButtonText).toBe('Do Not Click me!');
  });

  test('uninitialized button scale', async () => {
    expect(landingPage.entryButtonScale).toBe('l');
  });

  test('toggle open prop', async () => {
    expect(landingPage.open).toBe(true);
    landingPage.open = false;
    expect(landingPage.open).toBe(false);
  });

  test('font family', async () => {
    expect(landingPage.fontFamily).toBe('var(--calcite-sans-family);');
    landingPage.fontFamily = 'var(--monospace-family);';
    expect(landingPage.fontFamily).toBe('var(--monospace-family);');
  });
  test('uninitialized enableSignIn prop', async () => {
    expect(landingPage.enableSignIn).toBe(undefined);
  });
});

describe('initialized enableSignIn Prop', async () => {
  const landingPage = document.createElement('instant-apps-landing-page');

  landingPage.setAttribute('title-text', componentConfig.titleText);
  landingPage.setAttribute('subtitle-text', componentConfig.subtitleText);
  landingPage.setAttribute('description-text', componentConfig.descriptionText);
  landingPage.setAttribute('entry-button-text', componentConfig.entryButtonText);
  landingPage.setAttribute('icon-image-scale', componentConfig.iconImageScale);
  landingPage.setAttribute('icon-image', componentConfig.iconImage);
  landingPage.setAttribute('enable-sign-in', componentConfig.enableSignIn);
  document.body.appendChild(landingPage);
  await new Promise(resolve => requestIdleCallback(resolve));
  test('initialized enableSignIn prop', async () => {
    expect(landingPage.enableSignIn).toBe(true);
  });
  test('port and oauthappid', async () => {
    landingPage.oauthappid = 'wfblKnj2mvxLOiCx';

    expect(landingPage.oauthappid).toBe('wfblKnj2mvxLOiCx');
  });
});
