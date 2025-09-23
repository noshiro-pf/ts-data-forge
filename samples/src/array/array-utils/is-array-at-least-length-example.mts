// Example: src/array/array-utils.mts (isArrayAtLeastLength)
import { Arr } from 'ts-data-forge';

const queue: readonly string[] = ['task-1', 'task-2'];
const emptyQueue: readonly string[] = [];

assert.strictEqual(Arr.isArrayAtLeastLength(queue, 1), true);
assert.strictEqual(Arr.isArrayAtLeastLength(emptyQueue, 1), false);

if (Arr.isArrayAtLeastLength(queue, 1)) {
  assert.strictEqual(queue[0], 'task-1');
}
