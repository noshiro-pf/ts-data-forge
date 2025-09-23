// Example: src/collections/stack.mts
import { createStack, Optional } from 'ts-data-forge';

const stack = createStack<string>(['first']);
stack.push('second');
const popped = stack.pop();

assert.strictEqual(stack.isEmpty, false);
assert.deepStrictEqual(popped, Optional.some('second'));
assert.strictEqual(stack.size, 1);
