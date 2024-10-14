import { expect, test, describe } from 'vitest';
import { waitForShadowRoot } from '../../../utils/testUtils.js';

import '../../../../dist/components/instant-apps-app-guide.js';
import { AppGuidePage } from '../AppGuide/interfaces/interfaces.js';
import testPages from './testdata';

const _createAppGuideComponent = async (data:AppGuidePage[], header?: boolean ) => {
  const appGuide = document.createElement('instant-apps-app-guide');

  appGuide.header = header ?? true;
  appGuide.data = data;
  document.body.appendChild(appGuide);

  await new Promise(resolve => requestIdleCallback(resolve));
  const shadowRoot = await waitForShadowRoot(appGuide);

  return { appGuide, shadowRoot };
}

describe('Instant Apps App Guide', async () => {
  describe('default component', async () => {

    const { appGuide, shadowRoot } = await _createAppGuideComponent([testPages.singleParagraph]);

    test('instant-apps-app-guide is defined', () => {
      expect(appGuide).toBeDefined();
    });
  
    test('instant-apps-app-guide has shadowRoot', () => {
      expect(shadowRoot).toBeDefined();
    });

    test('instant-apps-app-guide has data assigned', () => {
      expect(appGuide.data).toEqual([
        {
          title: 'Test Title',
          content: ['Test Content'],
          type: 'paragraphs'
        }
      ]);
    });

    test('instant-apps-app-guide header property has been set', () => {
      expect(appGuide.header).toBeTruthy();
    });

    test('instant-apps-app-guide has paragraph content', () => {
      const wrapper = shadowRoot?.querySelector('.instant-apps-app-guide__content-wrapper');
      expect(wrapper).toBeDefined();

      const content = shadowRoot?.querySelector('p');
      expect(content).toBeDefined();
      expect(content?.textContent).toBe('Test Content');
    });

    test('instant-apps-app-guide has header with text', () => {
      const headerSpan = shadowRoot?.querySelector('[slot="header-content"]');
      expect(headerSpan).toBeDefined();
      expect(headerSpan?.textContent?.trim()).toBe('Test Title');
    });

    test('instant-apps-app-guide has fallback header text', async () => {
      const { shadowRoot: _shadowRoot } = await _createAppGuideComponent([testPages.emptyTitle]);
      const headerSpan = _shadowRoot?.querySelector('[slot="header-content"]');
      expect(headerSpan).toBeDefined();
      expect(headerSpan?.textContent?.trim()).toBe('Tips');
    });

    test('instant-apps-app-guide has header with lightbulb icon', () => {
      const headerIcon = shadowRoot?.querySelector('calcite-icon');
      expect(headerIcon).toBeDefined();
      expect(headerIcon?.getAttribute('icon')).toBe('lightbulb');
    });
  }); 

  describe('component with no header', async () => {
    const header = false;
    const { appGuide, shadowRoot } = await _createAppGuideComponent([testPages.singleParagraph], header);

    test('instant-apps-app-guide has no header span', () => {
      const headerSpan = shadowRoot?.querySelector('[slot="header-content"]');
      expect(headerSpan).toBeNull();
      expect(appGuide.header).toBeFalsy();
    });
  });

  describe('component with two pages', async () => {
    const { shadowRoot } = await _createAppGuideComponent([testPages.singleParagraph, testPages.paragraphs]);

    test('instant-apps-app-guide has 2 pages', () => {
      const pages = shadowRoot?.querySelectorAll('calcite-carousel-item');
      expect(pages).toHaveLength(2);
    });

    test('instant-apps-app-guide has arrow type "none"', () => {
      const arrowType = shadowRoot?.querySelector('calcite-carousel')?.getAttribute('arrow-type');
      expect(arrowType).toBe('none');
    });
  });

  describe('component with three or more pages', async () => {
    const pages = [testPages.singleParagraph, testPages.paragraphs, testPages.list];
    const { appGuide, shadowRoot } = await _createAppGuideComponent(pages);

    test(`instant-apps-app-guide has ${pages.length} pages`, () => {
      const pages = shadowRoot?.querySelectorAll('calcite-carousel-item');
      expect(pages).toHaveLength(pages?.length as number);
    });

    test('instant-apps-app-guide has arrow type "inline"', () => {
      const arrowType = shadowRoot?.querySelector('calcite-carousel')?.getAttribute('arrow-type');
      expect(arrowType).toBe('inline');
    });

    test('instant-apps-app-guide header text updates with data changes', async () => {
      // Data changes trigger _updateHeaderText() and so does the onCalciteCarouselChange
      // event handler; we'll use this as a proxy for paging through the carousel
      // since can't actually do that from the Shadow DOM
      appGuide.data = appGuide.data.slice(1);
      await new Promise(resolve => requestIdleCallback(resolve));
      const headerSpan = shadowRoot?.querySelector('[slot="header-content"]');
      expect(headerSpan?.textContent?.trim()).toBe('Test Title 2');
    });
  });

  describe('component with list content', async () => {
    const { shadowRoot } = await _createAppGuideComponent([testPages.list]);

    test('instant-apps-app-guide has list content', () => {
      const list = shadowRoot?.querySelector('.instant-apps-app-guide__content-list');
      expect(list).toBeDefined();
      expect(list?.querySelectorAll('.instant-apps-app-guide__content-list--item')).toHaveLength(3);
    });
  });
});
