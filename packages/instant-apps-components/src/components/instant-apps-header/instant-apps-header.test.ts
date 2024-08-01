import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-header.js';

describe('prop changes', () => {
  const header = document.createElement('instant-apps-header');
  header.setAttribute('background-color', '#151515');
  test('custom title text', async () => {
    const customTitle = 'Instant Apps Header';
    header.titleText = customTitle;
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));

    expect(header.titleText).toBe(customTitle);
  });

  test('info button visibility', async () => {
    header.setAttribute('info-button', 'true');
    header.infoTitleText = 'info test';
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    header.toggleInfo();
    expect(header.infoButton).toBe(true);
    expect(header.infoIsOpen).toBe(true);
  });

  test('info button toggle', async () => {
    header.toggleInfo();
    expect(header.infoIsOpen).toBe(false);
  });

  test('info text title prop', async () => {
    const infoElement = header.shadowRoot?.getElementById('infoButton');
    expect(infoElement).toBeTruthy();
    const infosTitle = infoElement?.getAttribute('title');
    expect(infosTitle).toBe(header.infoTitleText);
  });

  test('logo scale', async () => {
    header.logoScale = 's';
    header.setAttribute('logo-scale', 's');
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(header.getAttribute('logo-scale')).toBe('s');
  });

  test('logo scale', async () => {
    header.logoScale = 'l';
    header.setAttribute('logo-scale', 'l');
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(header.getAttribute('logo-scale')).toBe('l');
  });

  test('change background color', async () => {
    const newColor = '#836953';
    header.setAttribute('background-color', newColor);
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(header.getAttribute('background-color')).toBe(newColor);
  });

  test('set title text link', async () => {
    const newLink = 'https://doc.arcgis.com/en/instant-apps/gallery/';
    header.titleTextLink = newLink;
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(header.titleTextLink).toBe(newLink);
  });
});
