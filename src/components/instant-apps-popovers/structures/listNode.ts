export class ListNode {
  constructor(value: unknown) {
    this.prev = null;
    this.next = null;
    this.value = value;
  }

  prev: ListNode | null;
  next: ListNode | null;
  value: unknown;
}
