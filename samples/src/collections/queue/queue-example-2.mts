// Example: src/collections/queue.mts
import { createQueue } from 'ts-data-forge';

const queue = createQueue(['first']);
queue.enqueue('second');
const removed = queue.dequeue();

const summary = {
  isEmpty: queue.isEmpty,
  removed,
  size: queue.size,
};

// embed-sample-code-ignore-below
export { summary };
