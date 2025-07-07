import { Arr } from '../array/index.mjs';
import { Optional } from '../functional/index.mjs';
import { asUint32 } from '../number/index.mjs';
import { castMutable } from '../others/index.mjs';

/**
 * Interface for a high-performance queue with FIFO (First-In, First-Out) behavior.
 * Uses a circular buffer for O(1) enqueue/dequeue operations.
 *
 * @template T The type of elements stored in the queue.
 *
 * @example
 * ```ts
 * import { Optional } from '../functional/index.mjs';
 *
 * const queue = createQueue<string>();
 * queue.enqueue("first");
 * queue.enqueue("second");
 *
 * assert(Optional.unwrap(queue.dequeue()) === "first"); // FIFO order
 * assert(queue.size === 1);
 *
 * // Task processing example
 * const taskQueue = createQueue<{ id: number }>();
 * taskQueue.enqueue({ id: 1 });
 * taskQueue.enqueue({ id: 2 });
 * while (!taskQueue.isEmpty) {
 *   const task = Optional.unwrap(taskQueue.dequeue());
 *   assert(typeof task.id === "number");
 * }
 * ```
 *
 */
export type Queue<T> = Readonly<{
  /** Checks if the queue is empty. */
  isEmpty: boolean;

  /** The number of elements in the queue. */
  size: SizeType.Arr;

  /**
   * Removes and returns the element at the front of the queue.
   * @returns The element at the front of the queue, or `Optional.none` if the queue is empty.
   */
  dequeue: () => Optional<T>;

  /**
   * Adds an element to the back of the queue.
   * @param value The element to add.
   */
  enqueue: (value: T) => void;
}>;

/**
 * Class implementation for a queue with FIFO (First-In, First-Out) behavior using a circular buffer.
 * This implementation provides O(1) enqueue and dequeue operations by using a fixed-size buffer
 * with head and tail pointers that wrap around when they reach the buffer boundary.
 *
 * The circular buffer automatically resizes when it becomes full, ensuring that the queue
 * can grow to accommodate any number of elements while maintaining efficient operations.
 *
 * @template T The type of elements in the queue.
 * @implements Queue
 */
class QueueClass<T> implements Queue<T> {
  /** @internal Circular buffer to store queue elements. */
  #buffer: (T | undefined)[];

  /** @internal Index of the first element (front of queue). */
  #head: number;

  /** @internal Index where the next element will be added (back of queue). */
  #tail: number;

  /** @internal Current number of elements in the queue. */
  #mut_size: number;

  /** @internal Current capacity of the buffer. */
  #capacity: number;

  /** @internal Initial capacity for new queues. */
  static readonly #INITIAL_CAPACITY = 8;

  /**
   * Constructs a new QueueClass instance.
   * @param initialValues Optional initial values to populate the queue.
   */
  constructor(initialValues: readonly T[] = []) {
    const initialCapacity = asUint32(
      Math.max(QueueClass.#INITIAL_CAPACITY, initialValues.length * 2),
    );

    this.#buffer = castMutable(
      Arr.create<T | undefined, Uint32>(initialCapacity, undefined),
    );
    this.#head = 0;
    this.#tail = 0;
    this.#mut_size = 0;
    this.#capacity = initialCapacity;

    // Add initial values
    for (const value of initialValues) {
      this.enqueue(value);
    }
  }

  /** @inheritdoc */
  get isEmpty(): boolean {
    return this.#mut_size === 0;
  }

  /** @inheritdoc */
  get size(): SizeType.Arr {
    return asUint32(this.#mut_size);
  }

  /**
   * Removes and returns the element at the front of the queue (FIFO).
   * Returns Optional.none if the queue is empty. O(1) operation.
   *
   * @returns An Optional containing the removed element, or Optional.none if empty.
   *
   * @example
   * ```ts
   * import { Optional } from '../functional/index.mjs';
   *
   * const queue = createQueue<string>();
   * queue.enqueue("first");
   * queue.enqueue("second");
   *
   * const first = queue.dequeue();
   * assert(Optional.isSome(first));
   * assert(Optional.unwrap(first) === "first");
   *
   * const empty = createQueue<number>();
   * assert(Optional.isNone(empty.dequeue()));
   * ```
   *
   */
  dequeue(): Optional<T> {
    if (this.isEmpty) {
      return Optional.none;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = this.#buffer[this.#head]!;
    this.#buffer[this.#head] = undefined; // Clear reference for garbage collection
    this.#head = (this.#head + 1) % this.#capacity;
    this.#mut_size -= 1;

    return Optional.some(element);
  }

  /**
   * Adds an element to the back of the queue (FIFO).
   * O(1) amortized operation.
   *
   * @param value The element to add to the back of the queue.
   *
   * @example
   * ```ts
   * import { Optional } from '../functional/index.mjs';
   *
   * const queue = createQueue<string>();
   * queue.enqueue("first");
   * queue.enqueue("second");
   *
   * assert(queue.size === 2);
   * assert(Optional.unwrap(queue.dequeue()) === "first"); // First in, first out
   * ```
   *
   */
  enqueue(value: T): void {
    // Resize if buffer is full
    if (this.#mut_size === this.#capacity) {
      this.#resize();
    }

    this.#buffer[this.#tail] = value;
    this.#tail = (this.#tail + 1) % this.#capacity;
    this.#mut_size += 1;
  }

  /**
   * @internal
   * Resizes the circular buffer when it becomes full.
   * Doubles the capacity and reorganizes elements to maintain queue order.
   */
  #resize(): void {
    const newCapacity = asUint32(this.#capacity * 2);
    const newBuffer = castMutable(
      Arr.create<T | undefined, Uint32>(newCapacity, undefined),
    );

    // Copy elements in order from head to tail
    for (let i = 0; i < this.#mut_size; i++) {
      const sourceIndex = (this.#head + i) % this.#capacity;
      newBuffer[i] = this.#buffer[sourceIndex];
    }

    this.#buffer = newBuffer;
    this.#head = 0;
    this.#tail = this.#mut_size;
    this.#capacity = newCapacity;
  }
}

/**
 * Creates a new Queue instance with FIFO behavior.
 * Provides O(1) enqueue/dequeue operations with automatic buffer resizing.
 *
 * @template T The type of elements stored in the queue.
 * @param initialValues Optional array of initial elements to populate the queue.
 * @returns A new Queue instance.
 *
 * @example
 * ```ts
 * const queue = createQueue<string>();
 * queue.enqueue('first');
 * queue.enqueue('second');
 *
 * assert(Optional.unwrap(queue.dequeue()) === 'first'); // FIFO order
 * assert(queue.size === 1);
 *
 * // Task processing example
 * const taskQueue = createQueue<{ id: number }>();
 * taskQueue.enqueue({ id: 1 });
 * taskQueue.enqueue({ id: 2 });
 * while (!taskQueue.isEmpty) {
 *   const task = Optional.unwrap(taskQueue.dequeue());
 *   assert(typeof task.id === 'number');
 * }
 * ```
 *
 * @example
 * ```ts
 * const queue = createQueue<string>();
 * queue.enqueue('first');
 * queue.enqueue('second');
 *
 * const first = queue.dequeue();
 * assert(Optional.isSome(first));
 * assert(Optional.unwrap(first) === 'first');
 *
 * const empty = createQueue<number>();
 * assert(Optional.isNone(empty.dequeue()));
 * ```
 *
 * @example
 * ```ts
 * const queue = createQueue<string>();
 * queue.enqueue('first');
 * queue.enqueue('second');
 *
 * assert(queue.size === 2);
 * assert(Optional.unwrap(queue.dequeue()) === 'first'); // First in, first out
 * ```
 *
 * @example
 * ```ts
 * const queue = createQueue<string>();
 * queue.enqueue('first');
 * queue.enqueue('second');
 * assert(Optional.unwrap(queue.dequeue()) === 'first');
 *
 * // With initial values
 * const prePopulated = createQueue(['a', 'b', 'c']);
 * assert(prePopulated.size === 3);
 * assert(Optional.unwrap(prePopulated.dequeue()) === 'a'); // First element first
 * ```
 *
 */
export const createQueue = <T,>(initialValues?: readonly T[]): Queue<T> =>
  new QueueClass<T>(initialValues);
