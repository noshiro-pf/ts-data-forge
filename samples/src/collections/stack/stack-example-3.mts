// Example: src/collections/stack.mts
import { createStack } from 'ts-data-forge';

const stack = createStack<string>(['first']);
stack.push('second');
const popped = stack.pop();

const summary = {
  isEmpty: stack.isEmpty,
  popped,
  size: stack.size,
};

// embed-sample-code-ignore-below
export { summary };
