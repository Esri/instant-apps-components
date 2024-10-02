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
      const content = shadowRoot?.querySelector('p');
      expect(content).toBeDefined();
      expect(content?.textContent).toBe('Test Content');
    });

    test('instant-apps-app-guide has header with text', () => {
      const headerSpan = shadowRoot?.querySelector('[slot="header-content"]');
      expect(headerSpan).toBeDefined();
      expect(headerSpan?.textContent?.trim()).toBe('Test Title');
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

    test('instant-apps-app-guide has no header', () => {
      const headerSpan = shadowRoot?.querySelector('[slot="header-content"]');
      expect(headerSpan).toBeNull();
      expect(appGuide.header).toBeFalsy();
    });
  });
});
