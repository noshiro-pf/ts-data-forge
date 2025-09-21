// Sample code extracted from src/collections/queue.mts (Queue)
import type { Queue } from 'ts-data-forge';

import { createQueue } from './queue';

// Example 1: Basic FIFO operations
const messageQueue: Queue<string> = createQueue<string>();

messageQueue.enqueue('first message'); // Add to back
messageQueue.enqueue('second message'); // Add to back
messageQueue.enqueue('third message'); // Add to back

console.log(messageQueue.size); // Output: 3

// Process messages in FIFO order
console.log(messageQueue.dequeue().unwrap()); // "first message" (first in, first out)
console.log(messageQueue.dequeue().unwrap()); // "second message"
console.log(messageQueue.size); // Output: 1

// Example 2: Task processing system
type Task = { id: number; priority: string; action: () => void };
const taskQueue: Queue<Task> = createQueue<Task>();

taskQueue.enqueue({
  id: 1,
  priority: 'high',
  action: () => console.log('Task 1'),
});
taskQueue.enqueue({
  id: 2,
  priority: 'low',
  action: () => console.log('Task 2'),
});

// Process tasks in order
while (!taskQueue.isEmpty) {
  const task = taskQueue.dequeue().unwrap();
  console.log(`Processing task ${task.id} with ${task.priority} priority`);
  task.action();
}
