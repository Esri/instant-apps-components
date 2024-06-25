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

test('should toggleInfo', async () => {
  header.toggleInfo();
  expect(header.infoIsOpen).toBe(true);
});
