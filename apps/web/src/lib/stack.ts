export class Stack<T> {
  stack: T[];

  constructor(items: T[] = []) {
    this.stack = items;
  }

  stackPush(item: T) {
    this.stack.push(item);
  }

  stackPop() {
    return this.stack.pop();
  }

  stackPeek() {
    return this.stack[this.stack.length - 1];
  }
}