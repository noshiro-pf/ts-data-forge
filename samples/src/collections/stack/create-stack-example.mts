// Example: src/collections/stack.mts (createStack)
import { Optional, createStack } from 'ts-data-forge';

const stack = createStack<string>();

assert.strictEqual(stack.isEmpty, true);
assert.strictEqual(stack.size, 0);

stack.push('first');
stack.push('second');

assert.strictEqual(stack.isEmpty, false);
assert.strictEqual(stack.size, 2);
assert.deepStrictEqual(stack.pop(), Optional.some('second'));
assert.deepStrictEqual(stack.pop(), Optional.some('first'));
assert.deepStrictEqual(stack.pop(), Optional.none);

const seededStack = createStack([10, 20, 30]);

assert.strictEqual(seededStack.size, 3);
assert.deepStrictEqual(seededStack.pop(), Optional.some(30));
