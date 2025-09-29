// Example: src/collections/queue.mts (queue)
import { range } from 'ts-data-forge';

const taskQueue = createQueue<string>();

// Add tasks in order of arrival
taskQueue.enqueue('Process order #1001'); // O(1)
taskQueue.enqueue('Send notification'); // O(1)
taskQueue.enqueue('Update inventory'); // O(1)

console.log(taskQueue.size); // 3

// Tasks will be processed in the order they were added
while (!taskQueue.isEmpty) {
  const task = taskQueue.dequeue().unwrap();
  console.log(`Executing: ${task}`);
}

// High-volume enqueueing (demonstrates amortized O(1) performance)
const dataQueue = createQueue<number>();

for (const i of range(1000000)) {
  dataQueue.enqueue(i); // Each operation is O(1) amortized
}

console.log(dataQueue.size); // 1000000

export { dataQueue, taskQueue };
