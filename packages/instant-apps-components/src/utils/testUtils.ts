export async function waitForShadowRoot(element: HTMLElement): Promise<ShadowRoot | null> {
  return new Promise<ShadowRoot | null>((resolve, reject) => {
    const interval = setInterval(() => {
      if (element.shadowRoot) {
        clearInterval(interval);
        resolve(element.shadowRoot);
      }
    }, 100); // Check every 100ms

    // Timeout to avoid waiting indefinitely
    setTimeout(() => {
      clearInterval(interval);
      reject(new Error('Timeout: ShadowRoot not found'));
    }, 5000); // 5 seconds timeout
  });
}

export async function waitForElement(selector: string, root: ShadowRoot): Promise<Element | null> {
  return new Promise<Element | null>((resolve) => {
    const interval = setInterval(() => {
      const element = root.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element);
      }
    }, 100); // Check every 100ms

    // Timeout to avoid waiting indefinitely
    setTimeout(() => {
      clearInterval(interval);
      resolve(null); // Resolve with null if element is not found
    }, 5000); // 5 seconds timeout
  });
}
