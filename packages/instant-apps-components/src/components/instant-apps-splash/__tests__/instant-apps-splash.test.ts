import { expect, test, describe } from 'vitest';
import { waitForShadowRoot } from '../../../utils/testUtils.js';

// Adjust the import path as needed
import '../../../../dist/components/instant-apps-splash.js';

describe('Instant Apps Splash', async () => {
  const splash = document.createElement('instant-apps-splash');

  document.body.appendChild(splash);

  await new Promise(resolve => requestIdleCallback(resolve));
  const shadowRoot = await waitForShadowRoot(splash);

  test('instant-apps-splash is defined', () => {
    expect(splash).toBeDefined();
  });

  test('instant-apps-splash has shadowRoot', () => {
    expect(shadowRoot).toBeDefined();
  });

  test('instant-apps-splash has titleText', () => {
    splash.titleText = 'Test Title';
    expect(splash.titleText).toBe('Test Title');
  });

  test('instant-apps-splash has content', () => {
    splash.content = 'Test Content';
    expect(splash.content).toBe('Test Content');
  });

  test('instant-apps-splash has primaryButtonText', () => {
    splash.primaryButtonText = 'Test Button';
    expect(splash.primaryButtonText).toBe('Test Button');
  });

  test('instant-apps-splash has closeButtonDisabled', () => {
    splash.closeButtonDisabled = true;
    expect(splash.closeButtonDisabled).toBeTruthy();
  });

  test('instant-apps-splash has localStorageKey', () => {
    splash.localStorageKey = 'keyTest';
    expect(splash.localStorageKey).toBe('keyTest');
  });

  test('instant-apps-splash has open', () => {
    splash.open = false;
    expect(splash.open).toBeFalsy();
  });

  test('instant-apps-splash has secondaryButton', () => {
    splash.secondaryButton = true;
    expect(splash.secondaryButton).toBeTruthy();
  });

  test('instant-apps-splash has secondaryButtonText', () => {
    splash.secondaryButtonText = 'Secondary Button';
    expect(splash.secondaryButtonText).toBe('Secondary Button');
  });

  test('instant-apps-splash has secondaryButtonIcon', () => {
    splash.secondaryButtonIcon = 'icon';
    expect(splash.secondaryButtonIcon).toBe('icon');
  });

  test('instant-apps-splash has outsideCloseDisabled', () => {
    splash.outsideCloseDisabled = true;
    expect(splash.outsideCloseDisabled).toBeTruthy();
  });

  // check the dont-show-again button and then retest to see if it is hidden
  test('instant-apps-splash test dont-show-again button', async () => {
    const dontShowAgainButton = splash?.shadowRoot?.querySelector('.instant-apps-splash__back-content');
    expect(dontShowAgainButton).toBeDefined();
    dontShowAgainButton?.querySelector('calcite-checkbox')?.click();
    splash.open = false;
    await new Promise(resolve => requestAnimationFrame(resolve));
    // rerender the splash component
    splash.open = true;
    await new Promise(resolve => requestAnimationFrame(resolve));
    const modalRef = splash?.shadowRoot?.querySelector('calcite-modal');
    expect(modalRef?.open).toBeFalsy();
  });
});
