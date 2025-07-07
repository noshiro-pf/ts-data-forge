import { Optional } from '../index.mjs';
import { createQueue } from './queue.mjs';

describe('createQueue', () => {
  test('JSDoc example 1', () => {
    const queue = createQueue<string>();
    queue.enqueue('first');
    queue.enqueue('second');

    assert(Optional.unwrap(queue.dequeue()) === 'first'); // FIFO order
    assert(queue.size === 1);

    // Task processing example
    const taskQueue = createQueue<{ id: number }>();
    taskQueue.enqueue({ id: 1 });
    taskQueue.enqueue({ id: 2 });
    while (!taskQueue.isEmpty) {
      const task = Optional.unwrap(taskQueue.dequeue());
      assert(typeof task.id === 'number');
    }
  });

  test('JSDoc example 2', () => {
    const queue = createQueue<string>();
    queue.enqueue('first');
    queue.enqueue('second');

    const first = queue.dequeue();
    assert(Optional.isSome(first));
    assert(Optional.unwrap(first) === 'first');

    const empty = createQueue<number>();
    assert(Optional.isNone(empty.dequeue()));
  });

  test('JSDoc example 3', () => {
    const queue = createQueue<string>();
    queue.enqueue('first');
    queue.enqueue('second');

    assert(queue.size === 2);
    assert(Optional.unwrap(queue.dequeue()) === 'first'); // First in, first out
  });

  test('JSDoc example 4', () => {
    const queue = createQueue<string>();
    queue.enqueue('first');
    queue.enqueue('second');
    assert(Optional.unwrap(queue.dequeue()) === 'first');

    // With initial values
    const prePopulated = createQueue(['a', 'b', 'c']);
    assert(prePopulated.size === 3);
    assert(Optional.unwrap(prePopulated.dequeue()) === 'a'); // First element first
  });
});
