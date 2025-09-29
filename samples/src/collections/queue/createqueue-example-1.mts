// Example: src/collections/queue.mts (createQueue)
import { range } from 'ts-data-forge';

import { createQueue } from './queue';

// Example 1: Basic FIFO workflow
const requestQueue = createQueue<string>();

// Add requests to the queue
requestQueue.enqueue('GET /api/users'); // O(1)
requestQueue.enqueue('POST /api/orders'); // O(1)
requestQueue.enqueue('DELETE /api/cache'); // O(1)

// Process requests in order
while (!requestQueue.isEmpty) {
  const request = requestQueue.dequeue().unwrap(); // O(1)
  console.log(`Processing: ${request}`);
}
// Output:
// Processing: GET /api/users
// Processing: POST /api/orders
// Processing: DELETE /api/cache

// Example 2: High-throughput event processing
type Event = { timestamp: number; type: string; data: any };
const eventQueue = createQueue<Event>();

// Simulate high-volume event ingestion
for (const i of range(10_000)) {
  eventQueue.enqueue({
    timestamp: Date.now(),
    type: `event-${i % 5}`,
    data: { value: i },
  }); // Each enqueue is O(1) amortized
}

// Process events efficiently
let processedCount = 0;
while (!eventQueue.isEmpty) {
  const event = eventQueue.dequeue().unwrap(); // O(1)
  // Process event...
  processedCount++;
}
console.log(`Processed ${processedCount} events`); // 10000

// Example 3: Queue with pre-populated data
const priorityTasks = createQueue<string>([
  'Initialize system',
  'Load configuration',
  'Start services',
  'Begin processing',
]);

console.log(priorityTasks.size); // Output: 4

// Execute tasks in initialization order
while (!priorityTasks.isEmpty) {
  const task = priorityTasks.dequeue().unwrap();
  console.log(`Executing: ${task}`);
}

// Example 4: Producer-Consumer pattern
const workQueue = createQueue<() => Promise<void>>();

// Producer: Add work items
const addWork = (workFn: () => Promise<void>) => {
  workQueue.enqueue(workFn);
};

// Consumer: Process work items
const processWork = async () => {
  while (!workQueue.isEmpty) {
    const workItem = workQueue.dequeue().unwrap();
    await workItem();
  }
};

// Add some work
addWork(async () => { console.log('Work item 1'); });
addWork(async () => { console.log('Work item 2'); });

// Process the work
await processWork();

export {
  addWork,
  eventQueue,
  priorityTasks,
  processedCount,
  processWork,
  requestQueue,
  workQueue,
};
export type { Event };
