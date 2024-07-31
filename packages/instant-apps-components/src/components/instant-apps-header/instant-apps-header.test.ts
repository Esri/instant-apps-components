import { expect, test, describe } from 'vitest';
import '../../../dist/components/instant-apps-header.js';
const header = document.createElement('instant-apps-header');
header.setAttribute('id', 'instant-apps-header');
header.setAttribute('background-color', '#151515');

describe ("Testing prop changes", () => {
  test('should render component with custom title text', async () => {
    const customTitle = 'Instant Apps Header';
    header.titleText = customTitle;
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));

    expect(header.titleText).toBe(customTitle);
  });

  test('test info button visibility', async () => {
    header.infoButton = true;
    header.setAttribute('info-button', 'true');
    header.infoTitleText = 'info test';
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    header.toggleInfo();
    expect(header.infoButton).toBe(true);
    expect(header.infoIsOpen).toBe(true);
  });

  test('test info button toggle', async () => {
    header.toggleInfo();
    expect(header.infoIsOpen).toBe(false);
  });

  test('test info text title prop', async () => {
    const infoElement = header.shadowRoot?.getElementById('infoButton');
    expect(infoElement ? true : false).toBe(true);
    expect(infoElement).toBeTruthy();
    const infosTitle = infoElement?.getAttribute('title');
    expect(infosTitle).toBe(header.infoTitleText);
  })

  test('logo scale change should be reflected', async () => {
    header.logoScale = 's';
    header.setAttribute('logo-scale', 's');
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const elem = document.getElementById('instant-apps-header');
    expect(elem?.getAttribute('logo-scale')).toBe('s');
  });

  test('logo scale change to large should be reflected', async () => {
    header.logoScale = 'l';
    header.setAttribute('logo-scale', 'l');
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const elem = document.getElementById('instant-apps-header');
    expect(elem?.getAttribute('logo-scale')).toBe('l');
  });

  test('change background color', async () => {
    const newColor = '#836953';
    header.setAttribute('background-color', newColor);
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    const elem = document.getElementById('instant-apps-header');
    expect(elem?.getAttribute('background-color')).toBe(newColor);
  });

  test('set title text link', async () => {
    const newLink = 'https://doc.arcgis.com/en/instant-apps/gallery/';
    header.titleTextLink = newLink;
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(header.titleTextLink).toBe(newLink);
  });
})