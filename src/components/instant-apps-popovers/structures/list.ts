import { ListNode } from './listNode';

export class List {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  head: ListNode | null;
  tail: ListNode | null;
  length: number;

  push(value: unknown) {
    const node = new ListNode(value);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      const oldTail = this.tail as ListNode;
      oldTail.next = node;
      this.tail = node;
    }
    this.length++;
  }
}
