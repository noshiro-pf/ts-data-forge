// Example: src/collections/queue.mts
import { createQueue, Optional } from 'ts-data-forge';

const queue = createQueue<string>(['first']);
queue.enqueue('second');
const removed = queue.dequeue();

assert.strictEqual(queue.isEmpty, false);
assert.deepStrictEqual(removed, Optional.some('first'));
assert.strictEqual(queue.size, 1);
