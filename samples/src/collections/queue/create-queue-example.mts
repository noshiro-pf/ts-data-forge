// Example: src/collections/queue.mts (createQueue)
import { Optional, createQueue } from 'ts-data-forge';

const queue = createQueue<number>();

assert.strictEqual(queue.isEmpty, true);
assert.strictEqual(queue.size, 0);

queue.enqueue(1);
queue.enqueue(2);

assert.strictEqual(queue.isEmpty, false);
assert.strictEqual(queue.size, 2);
assert.deepStrictEqual(queue.dequeue(), Optional.some(1));
assert.deepStrictEqual(queue.dequeue(), Optional.some(2));
assert.deepStrictEqual(queue.dequeue(), Optional.none);

const seededQueue = createQueue(['first', 'second']);

assert.strictEqual(seededQueue.size, 2);
assert.deepStrictEqual(seededQueue.dequeue(), Optional.some('first'));
assert.deepStrictEqual(seededQueue.dequeue(), Optional.some('second'));
