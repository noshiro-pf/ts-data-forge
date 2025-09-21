// Sample code extracted from src/collections/queue.mts (queue)
const queue = createQueue<string>();

// Add some elements
queue.enqueue('first');
queue.enqueue('second');
queue.enqueue('third');

// Remove elements in FIFO order
const first = queue.dequeue();
if (first.isSome) {
  console.log(first.value); // "first"
}

const second = queue.dequeue().unwrap(); // "second"
console.log(queue.size); // 1

// Safe handling of empty queue
const emptyQueue = createQueue<number>();
const result = emptyQueue.dequeue();
if (result.isNone) {
  console.log('Queue is empty');
}
