import { DocDirection } from './types';

export function getElementDir(el: Element): DocDirection {
  const rootNode = el.getRootNode() as HTMLElement;
  const dir = rootNode.getAttribute('dir') as DocDirection;
  console.log(dir);
  return dir;
}
