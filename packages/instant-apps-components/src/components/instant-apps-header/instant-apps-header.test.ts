import { expect, test, describe, beforeEach } from 'vitest';
import '../../../dist/components/instant-apps-header.js';
import { waitForShadowRoot } from '../../utils/testUtils.js';
describe('Header', () => {
  const header = document.createElement('instant-apps-header');
  header.setAttribute('background-color', '#151515');
  header.setAttribute('logo-image', "https://www.esri.com/content/dam/esrisites/en-us/common/icons/product-logos/arcgis-instant-apps-64.svg");
  header.setAttribute('logo-link', "https://www.esri.com/en-us/arcgis/products/arcgis-instant-apps/overview"); 
  let shadow;
  let element;
  beforeEach(async () => {
    document.body.append(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    shadow = await waitForShadowRoot(document.querySelector('instant-apps-header')!);
    element = document.querySelector('instant-apps-header');

  }); 
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
    test('custom title text in render title h1', async () => {
      expect(element).toBeTruthy();
     
      const h1 = shadow?.querySelector("h1");
      expect(h1!.innerHTML).toBe(header.titleText);
    });
  });
  describe('infoTitleText prop', async () => {

    test('info button visibility', async () => {
      header.setAttribute('info-button', 'true');
      header.infoTitleText = 'info test';
      document.body.appendChild(header);
      await new Promise(resolve => requestIdleCallback(resolve));
      header.toggleInfo();
      expect(element).toBeTruthy();

      console.log("toggle -> ", element!.infoIsOpen);
      expect(element!.infoButton).toBe(true);
      expect(element!.infoIsOpen).toBe(true);
    });
    test('info button toggle', async () => {
      expect(element).toBeTruthy();
      console.log("info open -> ", element?.getAttribute("info-is-open"));
      expect(element?.getAttribute("info-is-open")).toBe("");
      header.toggleInfo();
      expect(element!.infoIsOpen).toBe(false);
    });
    test("infoTitleText prop in calcite button", async () => {
      const button = shadow?.querySelector("calcite-button");
      expect(button?.title).toBe(header.infoTitleText);
      
    })
  });
//test logoimage on header then on img 
//test logolink on header then on a parent of img

  describe("logo scale prop", async () => {
    test('logo scale', async () => {
      header.logoScale = 's';
      header.setAttribute('logo-scale', 's');
      document.body.appendChild(header);
      await new Promise(resolve => requestIdleCallback(resolve));
      expect(element).toBeTruthy();
      expect(element!.logoScale).toBe(header.logoScale);
    });



    test('logo scale', async () => {
      header.logoScale = 'l';
      header.setAttribute('logo-scale', 'l');
      document.body.appendChild(header);
      await new Promise(resolve => requestIdleCallback(resolve));
      expect(element).toBeTruthy();
      expect(element!.logoScale).toBe(header.logoScale);
    });
    test('logo scale in logo img element', async () => {
      document.body.appendChild(header);
      await new Promise(resolve => requestIdleCallback(resolve));
      expect(shadow).toBeTruthy();
      const logoElem = shadow.querySelector("img");
      console.log("logo elem ---> ", logoElem);
      expect(logoElem).toBeTruthy();
      expect(logoElem?.classList.contains(`instant-apps-header__logo-scale--${header.logoScale}`)).toBe(true);
    })

  });
  test('change background color', async () => {
    const newColor = '#836953';
    header.setAttribute('background-color', newColor);
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(element).toBeTruthy();
    expect(element!.backgroundColor).toBe(header.backgroundColor);
  });

  test('set title text link', async () => {
    const newLink = 'https://doc.arcgis.com/en/instant-apps/gallery/';
    header.titleTextLink = newLink;
    document.body.appendChild(header);
    await new Promise(resolve => requestIdleCallback(resolve));
    expect(element).toBeTruthy();
    expect(element!.titleTextLink).toBe(header.titleTextLink);
  });
});
