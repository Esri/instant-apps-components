import { AppGuidePage } from '../AppGuide/interfaces/interfaces.js';

const singleParagraph:AppGuidePage = {
  title: 'Test Title',
  content: ['Test Content'],
  type: 'paragraphs'
};

const list:AppGuidePage = {
  title: 'Test Title 3',
  content: ['Test Content 1', 'Test Content 2', 'Test Content 3'],
  type: 'list'
};

const paragraphs:AppGuidePage = {
  title: 'Test Title 2',
  content: ['Test Content 1', 'Test Content 2'],
  type: 'paragraphs'
};

const emptyTitle:AppGuidePage = {
  title: '',
  content: ['Generic Tip 1', 'Generic Tip 2'],
  type: 'paragraphs'
};

export default { singleParagraph, list, paragraphs, emptyTitle };