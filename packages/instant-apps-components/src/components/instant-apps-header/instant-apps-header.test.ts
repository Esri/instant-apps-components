import { expect, test } from 'vitest';

import '../../../dist/components/instant-apps-header.js';
const header = document.createElement('instant-apps-header');

test('should render component with custom title text', async () => {
  const customTitle = 'Instant Apps Header';
  header.titleText = customTitle;
  document.body.appendChild(header);
  await new Promise(resolve => requestIdleCallback(resolve));
  
  expect(header.titleText).toBe(customTitle);
});

test('test info button visibility', async () => {
  header.infoButton = true;
  header.infoTitleText = "info test"
  document.body.appendChild(header);
  await new Promise(resolve => requestIdleCallback(resolve));
  header.toggleInfo();
  expect(header.infoButton).toBe(true);
  expect(header.infoIsOpen).toBe(true);
  header.toggleInfo();
  expect(header.infoIsOpen).toBe(false);
  const infoElement = header.shadowRoot?.querySelector('#infoButton');
  expect(infoElement? true : false).toBe(true);
  const infosTitle = infoElement?.getAttribute('title')
  expect(infosTitle).toBe(header.infoTitleText);
})


test('logo scale change should be reflected', async () => {
  header.logoScale = 's';
  document.body.appendChild(header);
  await new Promise(resolve => requestIdleCallback(resolve));
  expect(header.logoScale).toBe('s');

})

test('logo scale change to large should be reflected', async () => {
  header.logoScale = 'l';
  document.body.appendChild(header);
  await new Promise(resolve => requestIdleCallback(resolve));
  expect(header.logoScale).toBe('l');

})

test('change background color', async () => {
  const newColor = "#836953";
  header.backgroundColor = newColor;
  document.body.appendChild(header);
  await new Promise(resolve => requestIdleCallback(resolve));
  expect(header.backgroundColor).toBe(newColor);

})

test('set title text link', async () => {
  const newLink = "#https://doc.arcgis.com/en/instant-apps/gallery/";
  header.titleTextLink = newLink;
  document.body.appendChild(header);
  await new Promise(resolve => requestIdleCallback(resolve));
  expect(header.titleTextLink).toBe(newLink);
})

