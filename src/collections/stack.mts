import { Arr } from '../array/index.mjs';
import { Optional } from '../functional/index.mjs';
import { asUint32, Uint32 } from '../number/index.mjs';
import { castMutable } from '../others/index.mjs';

/**
 * Interface for a high-performance stack with LIFO (Last-In, First-Out) behavior.
 * Uses a dynamic array for O(1) push/pop operations.
 *
 * @template T The type of elements stored in the stack.
 *
 * @example
 * ```ts
 * import { Optional } from '../functional/index.mjs';
 *
 * const stack = createStack<string>();
 * stack.push("first");
 * stack.push("second");
 *
 * assert(Optional.unwrap(stack.pop()) === "second"); // LIFO order
 * assert(stack.size === 1);
 *
 * // Undo functionality example
 * const undoStack = createStack<{ action: string }>();
 * undoStack.push({ action: "delete" });
 * if (!undoStack.isEmpty) {
 *   const lastAction = Optional.unwrap(undoStack.pop());
 *   assert(lastAction.action === "delete");
 * }
 * ```
 *
 */
export type Stack<T> = Readonly<{
  /** Checks if the stack is empty. */
  isEmpty: boolean;

  /** The number of elements in the stack. */
  size: SizeType.Arr;

  /**
   * Removes and returns the element at the top of the stack.
   * @returns The element at the top of the stack, or `Optional.none` if the stack is empty.
   */
  pop: () => Optional<T>;

  /**
   * Adds an element to the top of the stack.
   * @param value The element to add.
   */
  push: (value: T) => void;
}>;

/**
 * Class implementation for a stack with LIFO (Last-In, First-Out) behavior using a dynamic array.
 * This implementation provides O(1) amortized push and O(1) pop operations by using a resizable buffer
 * that grows as needed.
 *
 * The underlying array automatically resizes when it becomes full, ensuring that the stack
 * can grow to accommodate any number of elements while maintaining efficient operations.
 *
 * @template T The type of elements in the stack.
 * @implements Stack
 */
class StackClass<T> implements Stack<T> {
  /** @internal Dynamic array to store stack elements. */
  #buffer: (T | undefined)[];

  /** @internal Current number of elements in the stack. */
  #mut_size: Uint32;

  /** @internal Current capacity of the buffer. */
  #capacity: Uint32;

  /** @internal Initial capacity for new stacks. */
  static readonly #INITIAL_CAPACITY = 8;

  /**
   * Constructs a new StackClass instance.
   * @param initialValues Optional initial values to populate the stack.
   */
  constructor(initialValues: readonly T[] = []) {
    const initialCapacity = asUint32(
      Math.max(StackClass.#INITIAL_CAPACITY, initialValues.length * 2),
    );

    this.#buffer = castMutable(
      Arr.create<T | undefined, Uint32>(initialCapacity, undefined),
    );
    this.#mut_size = asUint32(0);
    this.#capacity = initialCapacity;

    // Add initial values
    for (const value of initialValues) {
      this.push(value);
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
   * Removes and returns the element at the top of the stack (LIFO).
   * Returns Optional.none if the stack is empty. O(1) operation.
   *
   * @returns An Optional containing the removed element, or Optional.none if empty.
   *
   * @example
   * ```ts
   * const stack = createStack<string>();
   * stack.push("first");
   * stack.push("second");
   *
   * const top = stack.pop();
   * assert(Optional.isSome(top));
   * assert(Optional.unwrap(top) === "second");
   *
   * const empty = createStack<number>();
   * assert(Optional.isNone(empty.pop()));
   * ```
   *
   */
  pop(): Optional<T> {
    if (this.isEmpty) {
      return Optional.none;
    }

    this.#mut_size = Uint32.sub(this.#mut_size, 1);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = this.#buffer[this.#mut_size]!;
    this.#buffer[this.#mut_size] = undefined; // Clear reference for garbage collection

    return Optional.some(element);
  }

  /**
   * Adds an element to the top of the stack (LIFO).
   * O(1) amortized operation.
   *
   * @param value The element to add to the top of the stack.
   *
   * @example
   * ```ts
   * const stack = createStack<string>();
   * stack.push("first");
   * stack.push("second");
   *
   * assert(stack.size === 2);
   * assert(Optional.unwrap(stack.pop()) === "second"); // Last in, first out
   * ```
   *
   */
  push(value: T): void {
    // Resize if buffer is full
    if (this.#mut_size === this.#capacity) {
      this.#resize();
    }

    this.#buffer[this.#mut_size] = value;
    this.#mut_size = Uint32.add(this.#mut_size, 1);
  }

  /**
   * @internal
   * Resizes the buffer when it becomes full.
   * Doubles the capacity while preserving all elements.
   */
  #resize(): void {
    const newCapacity = asUint32(this.#capacity * 2);
    const newBuffer = castMutable(
      Arr.create<T | undefined, Uint32>(newCapacity, undefined),
    );

    // Copy existing elements
    for (let i = 0; i < this.#mut_size; i++) {
      newBuffer[i] = this.#buffer[i];
    }

    this.#buffer = newBuffer;
    this.#capacity = newCapacity;
  }
}

/**
 * Creates a new Stack instance with LIFO behavior.
 * Provides O(1) push/pop operations with automatic buffer resizing.
 *
 * @template T The type of elements stored in the stack.
 * @param initialValues Optional array of initial elements to populate the stack.
 * @returns A new Stack instance.
 *
 * @example
 * ```ts
 * const stack = createStack<string>();
 * stack.push('first');
 * stack.push('second');
 *
 * assert(Optional.unwrap(stack.pop()) === 'second'); // LIFO order
 * assert(stack.size === 1);
 *
 * // Undo functionality example
 * const undoStack = createStack<{ action: string }>();
 * undoStack.push({ action: 'delete' });
 * if (!undoStack.isEmpty) {
 *   const lastAction = Optional.unwrap(undoStack.pop());
 *   assert(lastAction.action === 'delete');
 * }
 * ```
 *
 * @example
 * ```ts
 * const stack = createStack<string>();
 * stack.push('first');
 * stack.push('second');
 *
 * const top = stack.pop();
 * assert(Optional.isSome(top));
 * assert(Optional.unwrap(top) === 'second');
 *
 * const empty = createStack<number>();
 * assert(Optional.isNone(empty.pop()));
 * ```
 *
 * @example
 * ```ts
 * const stack = createStack<string>();
 * stack.push('first');
 * stack.push('second');
 *
 * assert(stack.size === 2);
 * assert(Optional.unwrap(stack.pop()) === 'second'); // Last in, first out
 * ```
 *
 * @example
 * ```ts
 * const stack = createStack<string>();
 * stack.push('first');
 * stack.push('second');
 * assert(Optional.unwrap(stack.pop()) === 'second');
 *
 * // With initial values
 * const prePopulated = createStack(['a', 'b', 'c']);
 * assert(prePopulated.size === 3);
 * assert(Optional.unwrap(prePopulated.pop()) === 'c'); // Last element first
 * ```
 *
 */
export const createStack = <T,>(initialValues?: readonly T[]): Stack<T> =>
  new StackClass<T>(initialValues);
