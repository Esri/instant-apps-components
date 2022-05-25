import { ListNode } from './listNode';
export class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(value) {
    const node = new ListNode(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    }
    else {
      const oldTail = this.tail;
      oldTail.next = node;
      this.tail = node;
    }
    this.length++;
  }
}
