import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-header.js';

describe('Header', () => {
  const header = document.createElement('instant-apps-header');
  header.setAttribute('background-color', '#151515');
  describe('titleText prop', async () => {
    test('custom title text', async () => {
      const customTitle = 'Instant Apps Header';
      header.titleText = customTitle;
      document.body.appendChild(header);
      await new Promise(resolve => requestIdleCallback(resolve));
      const element = document.querySelector('instant-apps-header');
      expect(element).toBeTruthy();
      expect(element!.titleText).toBe(customTitle);
    });
  });

  test('info button visibility', async () => {
    header.setAttribute('info-button', 'true');
    header.infoTitleText = 'info test';
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    header.toggleInfo();
    const element = document.querySelector('instant-apps-header');
    expect(element).toBeTruthy();
    expect(element!.infoButton).toBe(true);
    expect(element!.infoIsOpen).toBe(true);
  });

  test('info button toggle', async () => {
    header.toggleInfo();
    const element = document.querySelector('instant-apps-header');
    expect(element).toBeTruthy();
    expect(element!.infoIsOpen).toBe(false);
  });

  test('info text title prop', async () => {
    const infoElement = header.shadowRoot?.getElementById('infoButton');
    expect(header.shadowRoot).toBeTruthy();
    const infosTitle = infoElement?.getAttribute('title');
    expect(infosTitle).toBe(header.infoTitleText);
  });

  test('logo scale', async () => {
    header.logoScale = 's';
    header.setAttribute('logo-scale', 's');
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const element = document.querySelector('instant-apps-header');
    expect(element).toBeTruthy();
    expect(element!.logoScale).toBe(header.logoScale);
  });

  test('logo scale', async () => {
    header.logoScale = 'l';
    header.setAttribute('logo-scale', 'l');
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const element = document.querySelector('instant-apps-header');
    expect(element).toBeTruthy();
    expect(element!.logoScale).toBe(header.logoScale);
  });

  test('change background color', async () => {
    const newColor = '#836953';
    header.setAttribute('background-color', newColor);
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const element = document.querySelector('instant-apps-header');
    expect(element).toBeTruthy();
    expect(element!.backgroundColor).toBe(header.backgroundColor);
  });

  test('set title text link', async () => {
    const newLink = 'https://doc.arcgis.com/en/instant-apps/gallery/';
    header.titleTextLink = newLink;
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const element = document.querySelector('instant-apps-header');
    expect(element).toBeTruthy();
    expect(element!.titleTextLink).toBe(header.titleTextLink);
  });
});
