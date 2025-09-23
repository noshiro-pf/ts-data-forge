/* eslint-disable import/no-internal-modules */
import * as ArrCreation from './impl/array-utils-creation.mjs';
import * as ArrElementAccess from './impl/array-utils-element-access.mjs';
import * as ArrIterators from './impl/array-utils-iterators.mjs';
import * as ArrModification from './impl/array-utils-modification.mjs';
import * as ArrReducingValue from './impl/array-utils-reducing-value.mjs';
import * as ArrSearch from './impl/array-utils-search.mjs';
import * as ArrSetOp from './impl/array-utils-set-op.mjs';
import * as ArrSize from './impl/array-utils-size.mjs';
import * as ArrSliceClamped from './impl/array-utils-slice-clamped.mjs';
import * as ArrSlicing from './impl/array-utils-slicing.mjs';
import * as ArrTransformation from './impl/array-utils-transformation.mjs';
import * as ArrValidation from './impl/array-utils-validation.mjs';

/**
 * A comprehensive, immutable utility library for array manipulations in
 * TypeScript. Provides a wide range of functions for array creation,
 * validation, transformation, reduction, slicing, set operations, and more,
 * with a focus on type safety and leveraging TypeScript's type inference
 * capabilities. All functions operate on `readonly` arrays and return new
 * `readonly` arrays, ensuring immutability.
 */
export namespace Arr {
  // #region array creation

  /**
   * Creates an array of zeros with the specified length.
   *
   * This function provides compile-time type safety with precise return types:
   *
   * - When `len` is a compile-time known `SmallUint` (0-100), returns a tuple
   *   with exact length
   * - When `len` is a positive runtime value, returns a `NonEmptyArray<0>`
   * - Otherwise, returns a `readonly 0[]` that may be empty
   *
   * @example
   *
   * ```ts
   * const emptyZeros = Arr.zeros(0);
   * const threeZeros = Arr.zeros(3);
   *
   * assert.deepStrictEqual(emptyZeros, []);
   * assert.deepStrictEqual(threeZeros, [0, 0, 0]);
   * ```
   *
   * @template N The type of the length parameter. When a `SmallUint` literal is
   *   provided, the return type will be a tuple of exactly that length filled
   *   with zeros.
   * @param len The length of the array to create. Must be a non-negative
   *   integer.
   * @returns An immutable array of zeros. The exact return type depends on the
   *   input:
   *
   *   - `ArrayOfLength<N, 0>` when `N` is a `SmallUint` literal
   *   - `NonEmptyArray<0>` when `len` is a positive runtime value
   *   - `readonly 0[]` for general non-negative values
   */
  export const zeros = ArrCreation.zeros;

  /**
   * Creates a sequence of consecutive integers from 0 to `len-1`.
   *
   * This function generates index sequences with precise compile-time typing:
   *
   * - When `len` is a compile-time known `SmallUint` (0-100), returns a tuple of
   *   consecutive integers
   * - When `len` is a positive runtime value, returns a
   *   `NonEmptyArray<SizeType.Arr>`
   * - Otherwise, returns a `readonly SizeType.Arr[]` that may be empty
   *
   * @example
   *
   * ```ts
   * const emptySeq = Arr.seq(0);
   * const firstFive = Arr.seq(5);
   *
   * assert.deepStrictEqual(emptySeq, []);
   * assert.deepStrictEqual(firstFive, [0, 1, 2, 3, 4]);
   * ```
   *
   * @template N The type of the length parameter. When a `SmallUint` literal is
   *   provided, the return type will be a tuple containing the sequence [0, 1,
   *   2, ..., N-1].
   * @param len The length of the sequence to create. Must be a non-negative
   *   integer.
   * @returns An immutable array containing the sequence [0, 1, 2, ..., len-1].
   *   The exact return type depends on the input:
   *
   *   - `Seq<N>` (precise tuple) when `N` is a `SmallUint` literal
   *   - `NonEmptyArray<SizeType.Arr>` when `len` is a positive runtime value
   *   - `readonly SizeType.Arr[]` for general non-negative values
   */
  export const seq = ArrCreation.seq;

  /**
   * Creates a new array of the specified length, with each position filled with
   * the provided initial value.
   *
   * This function provides compile-time type safety with precise return types
   * and performs shallow copying of the initial value (the same reference is
   * used for all positions):
   *
   * - When `len` is a compile-time known `SmallUint` (0-100), returns a tuple of
   *   exactly that length
   * - When `len` is a positive runtime value, returns a `NonEmptyArray<V>`
   * - Otherwise, returns a `readonly V[]` that may be empty
   *
   * @example
   *
   * ```ts
   * const threeOnes = Arr.create(3, 1);
   * const emptyStrings = Arr.create(0, 'Ada');
   *
   * assert.deepStrictEqual(threeOnes, [1, 1, 1]);
   * assert.deepStrictEqual(emptyStrings, []);
   * ```
   *
   * @template V The type of the initial value. The `const` constraint preserves
   *   literal types.
   * @template N The type of the length parameter when it's a `SmallUint`
   *   literal.
   * @param len The length of the array to create. Must be a non-negative
   *   integer.
   * @param init The value to fill each position with. The same reference is
   *   used for all positions.
   * @returns An immutable array filled with the initial value. The exact return
   *   type depends on the length:
   *
   *   - `ArrayOfLength<N, V>` when `len` is a `SmallUint` literal
   *   - `NonEmptyArray<V>` when `len` is a positive runtime value
   *   - `readonly V[]` for general non-negative values
   *
   * @see {@link zeros} for creating arrays filled with zeros
   * @see {@link seq} for creating sequences of consecutive integers
   */
  export const create = ArrCreation.create;

  /**
   * Alias for `create`. Creates a new array of the specified length, with each
   * position filled with the provided initial value.
   *
   * @see {@link create}
   */
  export const newArray = ArrCreation.newArray;

  /**
   * Creates a range of integers.
   *
   * @param start The starting number (inclusive).
   * @param end The ending number (exclusive).
   * @param step The step size (default: 1).
   * @returns An array of integers from start to end (exclusive) with the given step.
   */
  export const range = ArrCreation.range;

  /**
   * Creates an array from a generator function.
   *
   * This utility function provides enhanced type safety by constraining the
   * generator function to prevent incorrect return values. The generator can
   * only yield values of type T and must return void, which helps catch common
   * mistakes like returning values instead of yielding.
   *
   * @example
   *
   * ```ts
   * const numbers = Arr.generate(function* () {
   *   yield 1;
   *   yield 2;
   *   yield 3;
   * });
   *
   * assert.deepStrictEqual(numbers, [1, 2, 3]);
   * ```
   *
   * @template T - The type of elements in the generated array
   * @param generatorFn - A function that returns a generator yielding elements
   *   of type T
   * @returns A readonly array containing all yielded values from the generator
   */
  export const generate = ArrCreation.generate;

  /**
   * Asynchronously creates an array from an async generator function.
   *
   * This utility function provides enhanced type safety by constraining the
   * async generator function to prevent incorrect return values. The generator
   * can only yield values of type T and must return `void`, which helps catch
   * common mistakes like returning values instead of yielding.
   *
   * @example
   *
   * ```ts
   * const values = await Arr.generateAsync(async function* () {
   *   yield 'Ada';
   *   await Promise.resolve();
   *   yield 'Lovelace';
   * });
   *
   * assert.deepStrictEqual(values, ['Ada', 'Lovelace']);
   * ```
   *
   * @template T The type of elements in the generated array.
   * @param generatorFn A function that returns an async generator yielding
   *   elements of type `T`.
   * @returns A promise that resolves to a readonly array containing all yielded
   *   values from the async generator.
   */
  export const generateAsync = ArrCreation.generateAsync;

  /**
   * Creates a shallow copy of an array, preserving the exact type signature.
   *
   * This function creates a new array with the same elements as the input, but
   * with a new array reference. Object references within the array are
   * preserved (shallow copy), and the readonly/mutable status of the array type
   * is maintained.
   *
   * @example
   *
   * ```ts
   * const original = [{ id: 1 }, { id: 2 }] as const;
   * const cloned = Arr.copy(original);
   *
   * assert.deepStrictEqual(cloned, original);
   * assert.notStrictEqual(cloned, original);
   * ```
   *
   * @template Ar The exact type of the input array, preserving tuple types,
   *   readonly status, and element types.
   * @param array The array to copy. Can be any array type: mutable, readonly,
   *   tuple, or general array.
   * @returns A new array that is a shallow copy of the input. The return type
   *   exactly matches the input type, preserving readonly status, tuple
   *   structure, and element types.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice | Array.prototype.slice}
   *   The underlying implementation uses `slice()` for efficient shallow copying
   */
  export const copy = ArrCreation.copy;

  // #endregion

  // #region element access

  /**
   * Safely accesses an array element at the specified index, supporting negative indices.
   *
   * This function provides type-safe array element access with Optional return type,
   * eliminating the risk of undefined access errors. It supports both positive and
   * negative indices, where negative indices count from the end of the array.
   *
   * **Index Behavior:**
   * - Positive indices: `0` is the first element, `1` is the second, etc.
   * - Negative indices: `-1` is the last element, `-2` is the second-to-last, etc.
   * - Out-of-bounds indices (either direction): returns `Optional.None`
   *
   * **Curried Usage:** This function supports currying - when called with only an index,
   * it returns a function that can be applied to arrays, making it ideal for functional
   * composition.
   *
   * @example
   * ```ts
   * const items = ['first', 'second', 'third'];
   *
   * const first = Arr.at(items, 0);
   * const last = Arr.at(items, -1);
   * const outOfBounds = Arr.at(items, 10);
   *
   * assert.deepStrictEqual(first, Optional.some('first'));
   * assert.deepStrictEqual(last, Optional.some('third'));
   * assert.deepStrictEqual(outOfBounds, Optional.none);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @param array The array to access (when using direct call syntax).
   * @param index The index of the element to retrieve. Can be negative to count from the end.
   * @returns An Optional containing the element at the specified index, or Optional.None if the index is out of bounds.
   */
  export const at = ArrElementAccess.at;

  /**
   * Returns the first element of an array wrapped in an Optional.
   *
   * This function provides type-safe access to the first element with precise
   * return types:
   *
   * - For empty arrays: returns `Optional.None`
   * - For tuples with known first element: returns
   *   `Optional.Some<FirstElementType>`
   * - For non-empty arrays: returns `Optional.Some<ElementType>`
   * - For general arrays: returns `Optional<ElementType>`
   *
   * The function leverages TypeScript's type system to provide the most precise
   * return type based on the input array type, making it safer than direct
   * indexing.
   *
   * @example
   *
   * ```ts
   * const queue = ['first', 'second'];
   * const emptyQueue: string[] = [];
   *
   * const headValue = Arr.head(queue);
   * const none = Arr.head(emptyQueue);
   *
   * assert.deepStrictEqual(headValue, Optional.some('first'));
   * assert.deepStrictEqual(none, Optional.none);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to get the first element from.
   * @returns An Optional containing the first element:
   *
   *   - `Optional.None` if the array is empty
   *   - `Optional.Some<E>` containing the first element if the array is non-empty
   *
   * @see {@link last} for getting the last element
   * @see {@link at} for accessing elements at specific indices
   * @see {@link tail} for getting all elements except the first
   */
  export const head = ArrElementAccess.head;

  /**
   * Returns the last element of an array wrapped in an Optional.
   *
   * This function provides type-safe access to the last element with precise
   * return types:
   *
   * - For empty arrays: returns `Optional.None`
   * - For tuples with known last element: returns
   *   `Optional.Some<LastElementType>`
   * - For non-empty arrays: returns `Optional.Some<ElementType>`
   * - For general arrays: returns `Optional<ElementType>`
   *
   * The function leverages TypeScript's type system to provide the most precise
   * return type based on the input array type, making it safer than direct
   * indexing.
   *
   * @example
   *
   * ```ts
   * const queue = ['first', 'second'];
   * const emptyQueue: string[] = [];
   *
   * const lastValue = Arr.last(queue);
   * const none = Arr.last(emptyQueue);
   *
   * assert.deepStrictEqual(lastValue, Optional.some('second'));
   * assert.deepStrictEqual(none, Optional.none);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to get the last element from.
   * @returns An Optional containing the last element:
   *
   *   - `Optional.None` if the array is empty
   *   - `Optional.Some<E>` containing the last element if the array is non-empty
   *
   * @see {@link head} for getting the first element
   * @see {@link at} for accessing elements at specific indices with negative indexing support
   * @see {@link butLast} for getting all elements except the last
   */
  export const last = ArrElementAccess.last;

  /**
   * Alias for `head`. Returns the first element of an array.
   *
   * @see {@link head}
   */
  export const first = ArrElementAccess.first;

  // #endregion

  // #region size

  /**
   * Returns the size (length) of an array as a type-safe branded integer.
   *
   * This function provides the array length with enhanced type safety through
   * branded types:
   *
   * - For arrays known to be non-empty at compile time: returns `PositiveNumber &
   *   SizeType.Arr`
   * - For general arrays that may be empty: returns `SizeType.Arr` (branded
   *   Uint32)
   *
   * The returned value is always a non-negative integer that can be safely used
   * for array indexing and size comparisons. The branded type prevents common
   * integer overflow issues and provides better type checking than plain
   * numbers.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3] as const;
   * const letters: string[] = [];
   *
   * const sizeOfNumbers = Arr.size(numbers);
   * const sizeOfLetters = Arr.size(letters);
   *
   * assert(sizeOfNumbers === 3);
   * assert(sizeOfLetters === 0);
   * ```
   *
   * @template Ar The exact type of the input array, used for precise return
   *   type inference.
   * @param array The array to measure. Can be any readonly array type.
   * @returns The length of the array as a branded type:
   *
   *   - `IntersectBrand<PositiveNumber, SizeType.Arr>` for known non-empty arrays
   *   - `SizeType.Arr` for general arrays (branded Uint32, may be 0)
   *
   * @see {@link length} - Alias for this function
   * @see {@link isEmpty} for checking if size is 0
   * @see {@link isNonEmpty} for checking if size > 0
   */
  export const size = ArrSize.size;

  /**
   * Alias for `size`. Returns the length of an array.
   *
   * @see {@link size}
   */
  export const length = ArrSize.length;

  // #endregion

  // #region validation

  /**
   * Type guard that checks if a value is an array, excluding types that cannot
   * be arrays. This function refines the type by filtering out non-array types
   * from unions.
   *
   * @example
   *
   * ```ts
   * const maybeArray: unknown = [1, 2, 3];
   * const maybeValue: unknown = 'Ada';
   *
   * assert.ok(Arr.isArray(maybeArray));
   * assert.notOk(Arr.isArray(maybeValue));
   *
   * if (Arr.isArray(maybeArray)) {
   *   assert.deepStrictEqual(maybeArray, [1, 2, 3]);
   * }
   * ```
   *
   * @template E The input type that may or may not be an array.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   */
  export const isArray = ArrValidation.isArray;

  /**
   * Type guard that checks if an array is empty (has no elements).
   *
   * This function serves as both a runtime check and a TypeScript type guard,
   * narrowing the array type to `readonly []` when the check passes. It's
   * useful for conditional logic and type-safe handling of potentially empty
   * arrays.
   *
   * @example
   *
   * ```ts
   * const emptyNumbers: readonly number[] = [] as const;
   * const words = ['Ada', 'Lovelace'] as const;
   *
   * assert.ok(Arr.isEmpty(emptyNumbers));
   * assert.notOk(Arr.isEmpty(words));
   *
   * if (Arr.isEmpty(emptyNumbers)) {
   *   assert.deepStrictEqual(emptyNumbers, []);
   * }
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to check for emptiness.
   * @returns `true` if the array has length 0, `false` otherwise. When `true`,
   *   TypeScript narrows the type to `readonly []`.
   * @see {@link isNonEmpty} for the opposite check (non-empty arrays)
   * @see {@link size} for getting the exact length
   * @see {@link isArrayOfLength} for checking specific lengths
   */
  export const isEmpty = ArrValidation.isEmpty;

  /**
   * Type guard that checks if an array is non-empty (has at least one element).
   *
   * This function serves as both a runtime check and a TypeScript type guard,
   * narrowing the array type to `NonEmptyArray<E>` when the check passes. This
   * enables safe access to array elements without undefined checks, as
   * TypeScript knows the array has at least one element.
   *
   * @example
   *
   * ```ts
   * const users: readonly { id: number }[] = [{ id: 1 }];
   * const emptyUsers: readonly { id: number }[] = [];
   *
   * assert.ok(Arr.isNonEmpty(users));
   * assert.notOk(Arr.isNonEmpty(emptyUsers));
   *
   * if (Arr.isNonEmpty(users)) {
   *   assert.deepStrictEqual(users[0], { id: 1 });
   * }
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to check for non-emptiness.
   * @returns `true` if the array has length > 0, `false` otherwise. When
   *   `true`, TypeScript narrows the type to `NonEmptyArray<E>`.
   * @see {@link isEmpty} for the opposite check (empty arrays)
   * @see {@link size} for getting the exact length
   * @see {@link head} for safely getting the first element
   * @see {@link last} for safely getting the last element
   */
  export const isNonEmpty = ArrValidation.isNonEmpty;

  /**
   * Checks if an array has a specific length.
   *
   * @example
   *
   * ```ts
   * const pair: readonly number[] = [1, 2];
   * const triple: readonly number[] = [1, 2, 3];
   *
   * assert.ok(Arr.isArrayOfLength(pair, 2));
   * assert.notOk(Arr.isArrayOfLength(triple, 2));
   *
   * if (Arr.isArrayOfLength(pair, 2)) {
   *   assert.deepStrictEqual(pair, [1, 2]);
   * }
   * ```
   *
   * @template E The type of elements in the array.
   * @template N The expected length of the array (must be a number type).
   * @param array The array to check.
   * @param len The expected length.
   * @returns `true` if the array has the specified length, `false` otherwise.
   */
  export const isArrayOfLength = ArrValidation.isArrayOfLength;

  /**
   * Checks if an array has at least a specific length.
   *
   * @example
   *
   * ```ts
   * const queue: readonly string[] = ['task-1', 'task-2'];
   * const emptyQueue: readonly string[] = [];
   *
   * assert.ok(Arr.isArrayAtLeastLength(queue, 1));
   * assert.notOk(Arr.isArrayAtLeastLength(emptyQueue, 1));
   *
   * if (Arr.isArrayAtLeastLength(queue, 1)) {
   *   assert(queue[0] === 'task-1');
   * }
   * ```
   *
   * @template E The type of elements in the array.
   * @template N The minimum expected length of the array (must be a number
   *   type).
   * @param array The array to check.
   * @param len The minimum expected length.
   * @returns `true` if the array has at least the specified length, `false`
   *   otherwise.
   */
  export const isArrayAtLeastLength = ArrValidation.isArrayAtLeastLength;

  /**
   * Tests whether all elements in an array pass a test implemented by a
   * predicate function.
   *
   * This function returns `true` if all elements satisfy the predicate, `false`
   * otherwise. For empty arrays, it returns `true` (vacuous truth). Supports
   * type guard predicates for type narrowing of the entire array.
   *
   * @example
   *
   * ```ts
   * const numbers = [2, 4, 6] as const;
   * const words = ['Ada', 'Grace'] as const;
   *
   * const allEven = Arr.every(numbers, (value) => value % 2 === 0);
   * const allStartWithA = Arr.every(words, (value) => value.startsWith('A'));
   *
   * assert.ok(allEven);
   * assert.notOk(allStartWithA);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @template S The narrowed type when using type guard predicates.
   * @param array The array to test.
   * @param predicate A function that tests each element.
   * @returns `true` if all elements pass the test, `false` otherwise.
   */
  export const every = ArrValidation.every;

  /**
   * Tests whether at least one element in an array passes a test implemented by
   * a predicate function.
   *
   * This function returns `true` if at least one element satisfies the
   * predicate, `false` otherwise. For empty arrays, it returns `false`.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 3, 5] as const;
   * const words = ['Ada', 'Grace'] as const;
   *
   * const hasEven = Arr.some(numbers, (value) => value % 2 === 0);
   * const hasShortName = Arr.some(words, (value) => value.length <= 3);
   *
   * assert.notOk(hasEven);
   * assert.ok(hasShortName);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @param array The array to test.
   * @param predicate A function that tests each element.
   * @returns `true` if at least one element passes the test, `false` otherwise.
   */
  export const some = ArrValidation.some;

  /**
   * Checks if an index is within the valid range of an array (i.e., `0 <= index
   * < array.length`).
   *
   * @example
   *
   * ```ts
   * const items = ['Ada', 'Grace', 'Katherine'] as const;
   *
   * assert.ok(Arr.indexIsInRange(items, 1));
   * assert.notOk(Arr.indexIsInRange(items, 3));
   *
   * if (Arr.indexIsInRange(items, 2)) {
   *   assert(items[2] === 'Katherine');
   * }
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index to check.
   * @returns `true` if the index is within the array bounds, `false` otherwise.
   */
  export const indexIsInRange = ArrValidation.indexIsInRange;

  // #endregion

  // #region iterators

  /**
   * Returns an iterable of key-value pairs for every entry in the array.
   *
   * This function returns an array where each element is a tuple containing the
   * index and value. The indices are branded as `SizeType.Arr` for type
   * safety.
   *
   * @example
   *
   * ```ts
   * const players = ['Ada', 'Grace', 'Alan'];
   *
   * const valueList = Array.from(Arr.values(players));
   *
   * assert.deepStrictEqual(valueList, players);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @param array The array to get entries from.
   * @returns An array of `[index, value]` pairs.
   */
  export const entries = ArrIterators.entries;

  /**
   * Returns an iterable of values in the array.
   *
   * This function is essentially an identity function that returns a copy of
   * the array. It's included for API completeness and consistency with native
   * Array methods.
   *
   * @example
   *
   * ```ts
   * const items = ['zero', 'one', 'two'] as const;
   *
   * const indexList = Array.from(Arr.indices(items));
   *
   * assert.deepStrictEqual(indexList, [0, 1, 2]);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @param array The array to get values from.
   * @returns A copy of the input array.
   */
  export const values = ArrIterators.values;

  /**
   * Returns an iterable of keys in the array.
   *
   * This function returns an array of branded indices (`SizeType.Arr`) for type
   * safety.
   *
   * @example
   *
   * ```ts
   *   ```
   *
   * @template Ar The exact type of the input array.
   * @param array The array to get indices from.
   * @returns An array of indices.
   */
  export const indices = ArrIterators.indices;

  /**
   * Alias for `indices`. Returns an iterable of keys in the array.
   *
   * @see {@link indices}
   */
  export const keys = ArrIterators.keys;

  // #endregion

  // #region modification (returns new array)

  /**
   * Returns a new tuple with the element at the specified index replaced.
   *
   * This operation is type-safe with compile-time index validation. The
   * resulting tuple type reflects that the element at the given index may be
   * either the new type or the original type.
   *
   * @example
   *
   * ```ts
   * const temperatures: number[] = [20, 21, 22];
   *
   * const increased = Arr.toUpdated(temperatures, 1, (value) => value + 5);
   * const incrementLast = Arr.toUpdated<number>(
   *   2,
   *   (value) => value + 1,
   * )(temperatures);
   *
   * assert.deepStrictEqual(increased, [20, 26, 22]);
   * assert.deepStrictEqual(incrementLast, [20, 21, 23]);
   * ```
   *
   * @template T - The type of the input tuple
   * @template N - The type of the new value to set
   * @param tpl - The input tuple
   * @param index - The index to update (must be valid for the tuple length)
   * @param newValue - The new value to place at the index
   * @returns A new tuple with the updated element
   */
  export const set = ArrModification.set;

  /**
   * Returns a new array with the element at the specified index updated by a
   * function.
   *
   * This function provides immutable array updates with type-safe bounds
   * checking. It applies an updater function to the element at the given index
   * and returns a new array with the transformed value. The original array is
   * never modified, ensuring immutability.
   *
   * **Type Union Behavior:** When the updater function returns a different type
   * `U` than the original element type `E`, the result type becomes `readonly
   * (E | U)[]` to accommodate both original and updated element types. This
   * ensures type safety when elements have different types after updating.
   *
   * **Bounds Checking:** Unlike native array access which can cause runtime
   * errors, this function performs safe bounds checking:
   *
   * - **Valid index:** Creates new array with updated element
   * - **Invalid index:** Returns the original array unchanged (no errors thrown)
   * - **Negative index:** Treated as invalid (returns original array)
   *
   * **Curried Usage:** Supports currying for functional composition - when
   * called with only index and updater, returns a reusable function that can be
   * applied to arrays.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 4] as const;
   *
   * const withThree = Arr.toInserted(numbers, 2, 3);
   * const appendFive = Arr.toInserted(3, 5)(numbers);
   *
   * assert.deepStrictEqual(withThree, [1, 2, 3, 4]);
   * assert.deepStrictEqual(appendFive, [1, 2, 4, 5]);
   * ```
   *
   * @template E The type of elements in the original array.
   * @template V The type of the value returned by the updater function.
   * @param array The input array to update. Can be any readonly array.
   * @param index The index of the element to update. Must be a non-negative
   *   {@link SizeType.ArgArr}.
   *
   *   - **Valid range:** `0 <= index < array.length`
   *   - **Out of bounds:** Returns original array unchanged
   *   - **Negative values:** Not allowed by type system (non-negative constraint)
   *
   * @param updater A function `(prev: E) => U` that transforms the existing
   *   element:
   *
   *   - **prev:** The current element at the specified index
   *   - **returns:** The new value to place at that index (can be different type)
   *
   * @returns A new `readonly (E | U)[]` array where:
   *
   *   - All elements except the target index remain unchanged (type `E`)
   *   - The element at the target index is replaced with the updater result (type
   *       `U`)
   *   - Type union `E | U` accommodates both original and updated element types
   *   - If index is out of bounds, returns the original array unchanged
   *
   * @see {@link Array.prototype.with} for the native method with different error handling
   * @see {@link SizeType.ArgArr} for the index type constraint
   * @see Immutable update patterns for functional programming approaches
   */
  export const toUpdated = ArrModification.toUpdated;

  /**
   * Returns a new array with a new value inserted at the specified index. Index
   * can be out of bounds (e.g., negative or greater than length), `toSpliced`
   * handles this.
   *
   * @example
   *
   * ```ts
   * const letters = ['a', 'b', 'c', 'd'] as const;
   *
   * const withoutSecond = Arr.toRemoved(letters, 1);
   * const withoutFirstCurried = Arr.toRemoved(0)(letters);
   *
   * assert.deepStrictEqual(withoutSecond, ['a', 'c', 'd']);
   * assert.deepStrictEqual(withoutFirstCurried, ['b', 'c', 'd']);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index at which to insert the new value.
   * @param newValue The value to insert.
   * @returns A new array with the value inserted.
   */
  export const toInserted = ArrModification.toInserted;

  /**
   * Returns a new array with the element at the specified index removed. If
   * index is out of bounds, `toSpliced` handles this (usually by returning a
   * copy).
   *
   * @example
   *
   * ```ts
   * const base = [1, 2] as const;
   *
   * const appended = Arr.toPushed(base, 3);
   * const appendedCurried = Arr.toPushed(4)(base);
   *
   * assert.deepStrictEqual(appended, [1, 2, 3]);
   * assert.deepStrictEqual(appendedCurried, [1, 2, 4]);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index of the element to remove.
   * @returns A new array with the element removed.
   */
  export const toRemoved = ArrModification.toRemoved;

  /**
   * Returns a new array with a value added to the end.
   *
   * @example
   *
   * ```ts
   * const base = [2, 3] as const;
   *
   * const prefixed = Arr.toUnshifted(base, 1);
   * const prefixedCurried = Arr.toUnshifted(0)(base);
   *
   * assert.deepStrictEqual(prefixed, [1, 2, 3]);
   * assert.deepStrictEqual(prefixedCurried, [0, 2, 3]);
   * ```
   *
   * @template E The type of the input array (can be a tuple).
   * @template V The type of the value to add.
   * @param array The input array.
   * @param newValue The value to add.
   * @returns A new array with the value added to the end. Type is `readonly
   *   [...E, V]`.
   */
  export const toPushed = ArrModification.toPushed;

  /**
   * Returns a new array with a value added to the beginning.
   *
   * @example
   *
   * ```ts
   * const base = [1, 2, 3];
   *
   * const filled = Arr.toFilled(base, 0);
   * const filledCurried = Arr.toFilled('x')(base);
   *
   * assert.deepStrictEqual(filled, [0, 0, 0]);
   * assert.deepStrictEqual(filledCurried, ['x', 'x', 'x']);
   * ```
   *
   * @template E The type of the input array (can be a tuple).
   * @template V The type of the value to add.
   * @param array The input array.
   * @param newValue The value to add.
   * @returns A new array with the value added to the beginning. Type is
   *   `readonly [V, ...E]`.
   */
  export const toUnshifted = ArrModification.toUnshifted;

  /**
   * Creates a new array of the same length filled with a specified value.
   *
   * This function replaces all elements in the array with the provided value,
   * maintaining the original array's length and structure. It provides
   * type-safe array filling with precise return types.
   *
   * @example
   *
   * ```ts
   * const base = [0, 1, 2, 3, 4];
   *
   * const filledMiddle = Arr.toRangeFilled(base, 9, [1, 4]);
   * const filledPrefix = Arr.toRangeFilled(8, [0, 2])(base);
   *
   * assert.deepStrictEqual(filledMiddle, [0, 9, 9, 9, 4]);
   * assert.deepStrictEqual(filledPrefix, [8, 8, 2, 3, 4]);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template V The type of the fill value.
   * @param array The array to fill.
   * @param value The value to fill the array with.
   * @returns A new array of the same length filled with the specified value:
   *
   *   - For fixed-length arrays: returns `ArrayOfLength<Ar['length'], V>`
   *   - For non-empty arrays: returns `NonEmptyArray<V>`
   *   - For general arrays: returns `readonly V[]`
   *
   * @see {@link toRangeFilled} for filling only a specific range
   * @see {@link create} for creating new arrays filled with a value
   */
  export const toFilled = ArrModification.toFilled;

  /**
   * Creates a new array with a specific range filled with a specified value.
   *
   * This function fills only the specified range of indices with the provided
   * value, leaving other elements unchanged. It provides type-safe range
   * filling with precise return types.
   *
   * @example
   *
   * ```ts
   * const users = [
   *   { id: 1, name: 'Ada' },
   *   { id: 2, name: 'Grace' },
   * ];
   *
   * const found = Arr.find(users, (user) => user.id === 2);
   * const missing = Arr.find<{ id: number }>((user) => user.id === 3)(users);
   *
   * assert.deepStrictEqual(found, Optional.some({ id: 2, name: 'Grace' }));
   * assert.deepStrictEqual(missing, Optional.none);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template V The type of the fill value.
   * @param array The array to fill a range of.
   * @param value The value to fill the range with.
   * @param fillRange A tuple containing [start, end] indices for the range to
   *   fill.
   * @returns A new array with the specified range filled:
   *
   *   - For fixed-length arrays: returns `ArrayOfLength<Ar['length'], V |
   *       Ar[number]>`
   *   - For non-empty arrays: returns `NonEmptyArray<V | Ar[number]>`
   *   - For general arrays: returns `readonly (V | Ar[number])[]`
   *
   * @see {@link toFilled} for filling the entire array
   */
  export const toRangeFilled = ArrModification.toRangeFilled;

  // #endregion

  // #region slicing

  /**
   * Returns all elements of an array except the first one.
   *
   * @example
   *
   * ```ts
   * const scientists = ['Ada', 'Grace', 'Katherine'] as const;
   * const remainder = Arr.tail(scientists);
   *
   * assert.deepStrictEqual(remainder, ['Grace', 'Katherine']);
   * assert(remainder.length === 2);
   * ```
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @param array The input array.
   * @returns A new array containing all elements except the first. The type is
   *   inferred as `List.Tail<T>`.
   */
  export const tail = ArrSlicing.tail;

  /**
   * Alias for `tail`. Returns all elements of an array except the first one.
   *
   * @see {@link tail}
   */
  export const rest = ArrSlicing.rest;

  /**
   * Returns all elements of an array except the last one.
   *
   * @example
   *
   * ```ts
   * const queue = ['task-1', 'task-2', 'task-3'] as const;
   * const withoutLast = Arr.butLast(queue);
   *
   * assert.deepStrictEqual(withoutLast, ['task-1', 'task-2']);
   * assert(withoutLast.length === 2);
   * ```
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @param array The input array.
   * @returns A new array containing all elements except the last. The type is
   *   inferred as `List.ButLast<T>`.
   */
  export const butLast = ArrSlicing.butLast;

  /**
   * Takes the first N elements from an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple of the
   *   first N elements.
   * - If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns
   *   a NonEmptyArray.
   * - Otherwise, returns a readonly array of up to N elements.
   *
   * @example
   *
   * ```ts
   * const values = [1, 2, 3, 4];
   *
   * const firstTwo = Arr.take(values, 2);
   * const firstThree = Arr.take(3)(values);
   *
   * assert.deepStrictEqual(firstTwo, [1, 2]);
   * assert.deepStrictEqual(firstThree, [1, 2, 3]);
   * ```
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to take, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to take.
   * @returns A new array containing the first N elements.
   */
  export const take = ArrSlicing.take;

  /**
   * Takes the last N elements from an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple of the last
   *   N elements.
   * - If the array is a non-empty array and N is a positive integer, returns a
   *   non-empty array.
   * - Otherwise, returns a readonly array of up to N elements.
   *
   * @example
   *
   * ```ts
   * const values = [1, 2, 3, 4];
   *
   * const lastTwo = Arr.takeLast(values, 2);
   * const lastThree = Arr.takeLast(3)(values);
   *
   * assert.deepStrictEqual(lastTwo, [3, 4]);
   * assert.deepStrictEqual(lastThree, [2, 3, 4]);
   * ```
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to take, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to take.
   * @returns A new array containing the last N elements.
   */
  export const takeLast = ArrSlicing.takeLast;

  /**
   * Skips the first N elements of an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple with the
   *   first N elements removed.
   * - If the array is a non-empty array and N is a positive integer, returns a
   *   readonly array (may be empty).
   * - Otherwise, returns a readonly array with the first N elements skipped.
   *
   * @example
   *
   * ```ts
   * const values = ['a', 'b', 'c', 'd'] as const;
   *
   * const withoutFirstTwo = Arr.skip(values, 2);
   * const withoutFirstThree = Arr.skip(3)(values);
   *
   * assert.deepStrictEqual(withoutFirstTwo, ['c', 'd']);
   * assert.deepStrictEqual(withoutFirstThree, ['d']);
   * ```
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to skip, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to skip.
   * @returns A new array containing the elements after skipping the first N.
   */
  export const skip = ArrSlicing.skip;

  /**
   * Alias for `skip`. Skips the first N elements of an array.
   *
   * @see {@link skip}
   */
  export const drop = ArrSlicing.drop;

  /**
   * Skips the last N elements of an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple with the
   *   last N elements removed.
   * - If the array is a non-empty array and N is a positive integer, returns a
   *   readonly array (may be empty).
   * - Otherwise, returns a readonly array with the last N elements skipped.
   *
   * @example
   *
   * ```ts
   * const values = ['a', 'b', 'c', 'd'];
   *
   * const withoutLastTwo = Arr.skipLast(values, 2);
   * const withoutLastThree = Arr.skipLast(3)(values);
   *
   * assert.deepStrictEqual(withoutLastTwo, ['a', 'b']);
   * assert.deepStrictEqual(withoutLastThree, ['a']);
   * ```
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to skip, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to skip from the end.
   * @returns A new array containing the elements after skipping the last N.
   */
  export const skipLast = ArrSlicing.skipLast;

  /**
   * Slices an array with automatically clamped start and end indices for safe
   * bounds handling.
   *
   * This function provides a safer alternative to `Array.slice()` by
   * automatically clamping the start and end indices to valid bounds,
   * preventing out-of-bounds access and ensuring consistent behavior regardless
   * of input values.
   *
   * **Clamping Behavior:**
   *
   * - `start` is clamped to `[0, array.length]`
   * - `end` is clamped to `[clampedStart, array.length]` (ensuring end ≥ start)
   * - Invalid ranges (start > end after clamping) return empty arrays
   * - Negative indices are clamped to 0, large indices are clamped to
   *   array.length
   *
   * **Curried Usage:** This function supports currying - when called with only
   * start and end indices, it returns a function that can be applied to
   * arrays.
   *
   * @example
   *
   * ```ts
   * const letters = ['a', 'b', 'c', 'd', 'e'];
   *
   * const lastThree = Arr.sliceClamped(letters, -3, 10);
   * const middleTwo = Arr.sliceClamped(1, 3)(letters);
   *
   * assert.deepStrictEqual(lastThree, ['a', 'b', 'c', 'd', 'e']);
   * assert.deepStrictEqual(middleTwo, ['b', 'c']);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to slice (when using direct call syntax).
   * @param start The start index for the slice (inclusive). Will be clamped to
   *   valid bounds.
   * @param end The end index for the slice (exclusive). Will be clamped to
   *   valid bounds.
   * @returns A new immutable array containing the sliced elements. Always
   *   returns a valid array, never throws for out-of-bounds indices.
   * @see {@link take} for taking the first N elements
   * @see {@link skip} for skipping the first N elements
   * @see {@link takeLast} for taking the last N elements
   */
  export const sliceClamped = ArrSliceClamped.sliceClamped;

  // #endregion

  // #region searching

  /**
   * Safely finds the first element in an array that satisfies a predicate
   * function.
   *
   * This function provides type-safe searching with no risk of runtime errors.
   * It returns the first element that matches the predicate wrapped in an
   * Optional, or Optional.None if no element is found. The predicate receives
   * the element, its index, and the entire array.
   *
   * **Curried Usage:** This function supports currying - when called with only
   * a predicate, it returns a function that can be applied to arrays, making it
   * ideal for functional composition.
   *
   * @example
   *
   * ```ts
   * const users = [
   *   { id: 1, name: 'Ada' },
   *   { id: 2, name: 'Grace' },
   * ];
   *
   * const found = Arr.find(users, (user) => user.id === 2);
   * const missing = Arr.find<{ id: number }>((user) => user.id === 3)(users);
   *
   * assert.deepStrictEqual(found, Optional.some({ id: 2, name: 'Grace' }));
   * assert.deepStrictEqual(missing, Optional.none);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to search through (when using direct call syntax).
   * @param predicate A function that tests each element. Called with:
   *
   *   - `value`: The current element being tested
   *   - `index`: The index of the current element (branded as `SizeType.Arr`)
   *   - `arr`: The entire array being searched
   *
   * @returns An `Optional<E>` containing:
   *
   *   - `Optional.Some<E>` with the first matching element if found
   *   - `Optional.None` if no element satisfies the predicate
   *
   * @see {@link findIndex} for finding the index instead of the element
   * @see {@link indexOf} for finding elements by equality
   * @see {@link Optional} for working with the returned Optional values
   */
  export const find = ArrSearch.find;

  /**
   * Returns the last element in an array that satisfies a predicate function.
   *
   * This function searches from the end of the array and returns an Optional
   * containing the first element found that satisfies the predicate, or None if
   * no such element exists.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 3, 2, 4, 5];
   *
   * const lastEven = Arr.findLast(numbers, (n) => n % 2 === 0);
   * const none = Arr.findLast<number>((n) => n > 10)(numbers);
   *
   * assert.deepStrictEqual(lastEven, Optional.some(4));
   * assert.deepStrictEqual(none, Optional.none);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @param array The array to search.
   * @param predicate A function that tests each element.
   * @returns An Optional containing the found element, or None if no element
   *   satisfies the predicate.
   */
  export const findLast = ArrSearch.findLast;

  /**
   * Safely finds the index of the first element in an array that satisfies a
   * predicate function.
   *
   * This function provides type-safe index searching with no risk of runtime
   * errors. It returns the index of the first element that matches the
   * predicate wrapped in an Optional, or Optional.None if no element is found.
   * The returned index is branded as `SizeType.Arr` for type safety.
   *
   * **Curried Usage:** This function supports currying - when called with only
   * a predicate, it returns a function that can be applied to arrays, making it
   * ideal for functional composition.
   *
   * @example
   *
   * ```ts
   * const letters = ['a', 'b', 'c'];
   *
   * const indexOfB = Arr.findIndex(letters, (letter) => letter === 'b');
   * const indexOfMissing = Arr.findIndex<string>((letter) => letter === 'z')(
   *   letters,
   * );
   *
   * assert(indexOfB === 1);
   * assert(indexOfMissing === -1);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The array to search through (when using direct call syntax).
   * @param predicate A function that tests each element. Called with:
   *
   *   - `value`: The current element being tested
   *   - `index`: The index of the current element (branded as `SizeType.Arr`)
   *
   * @returns An `Optional<SizeType.Arr>` containing:
   *
   *   - `Optional.Some<SizeType.Arr>` with the index of the first matching element
   *       if found
   *   - `Optional.None` if no element satisfies the predicate
   *
   * @see {@link find} for finding the element instead of its index
   * @see {@link indexOf} for finding elements by equality (not predicate)
   * @see {@link lastIndexOf} for finding the last occurrence
   * @see {@link Optional} for working with the returned Optional values
   */
  export const findIndex = ArrSearch.findIndex;

  /**
   * Safely finds the index of the last element in an array that satisfies a
   * predicate function.
   *
   * This function provides type-safe index searching with no risk of runtime
   * errors. It searches from the end of the array backwards and returns the
   * index of the last element that matches the predicate, or -1 if no element
   * is found. The returned index is branded as `SizeType.Arr` for type safety.
   *
   * **Curried Usage:** This function supports currying - when called with only
   * a predicate, it returns a function that can be applied to arrays, making it
   * ideal for functional composition.
   *
   * @example
   *
   * ```ts
   * const letters = ['a', 'b', 'c', 'b'];
   *
   * const lastIndexOfB = Arr.findLastIndex(letters, (letter) => letter === 'b');
   * const notFound = Arr.findLastIndex<string>((letter) => letter === 'z')(letters);
   *
   * assert(lastIndexOfB === 3);
   * assert(notFound === -1);
   * ```
   *
   * @template Ar The exact type of the input array, used for precise return
   *   type inference.
   * @template E The type of elements in the array.
   * @param array The array to search through (when using direct call syntax).
   * @param predicate A function that tests each element. Called with:
   *
   *   - `value`: The current element being tested
   *   - `index`: The index of the current element (branded as `SizeType.Arr`)
   *   - `arr`: The array being searched
   *
   * @returns The index of the last matching element as `SizeType.Arr`, or -1 if
   *   no element satisfies the predicate.
   * @see {@link findLast} for finding the element instead of its index
   * @see {@link findIndex} for finding the first occurrence
   * @see {@link lastIndexOf} for finding elements by equality (not predicate)
   */
  export const findLastIndex = ArrSearch.findLastIndex;

  /**
   * Gets the index of a value in an array.
   *
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @returns The index if found, -1 otherwise.
   */
  export const indexOf = ArrSearch.indexOf;

  /**
   * Gets the index of a value in an array, starting from a specific index.
   *
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @param fromIndex The index to start searching from.
   * @returns The index if found, -1 otherwise.
   */
  export const indexOfFrom = ArrSearch.indexOfFrom;

  /**
   * Gets the last index of a value in an array.
   *
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @returns The index if found, -1 otherwise.
   */
  export const lastIndexOf = ArrSearch.lastIndexOf;

  /**
   * Gets the last index of a value in an array, starting from a specific index.
   *
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @param fromIndex The index to start searching from (searches backwards).
   * @returns The index if found, -1 otherwise.
   */
  export const lastIndexOfFrom = ArrSearch.lastIndexOfFrom;

  // #endregion

  // #region reducing value

  /**
   * Finds the minimum value in an array.
   *
   * @example
   *
   * ```ts
   * const values = [5, 3, 9] as const;
   * const empty: readonly number[] = [];
   *
   * const smallest = Arr.min(values);
   * const none = Arr.min(empty);
   * const custom = Arr.min(values, (a, b) => b - a);
   *
   * assert.deepStrictEqual(smallest, Optional.some(3));
   * assert.deepStrictEqual(none, Optional.none);
   * assert.deepStrictEqual(custom, Optional.some(9));
   * ```
   *
   * @template E The type of numbers in the array (must extend `number`).
   * @param array The input array.
   * @param comparator An optional custom comparator function `(x: N, y: N) =>
   *   number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is
   *   larger. Defaults to `x - y`.
   * @returns The minimum value in the array wrapped in Optional.
   */
  export const min = ArrReducingValue.min;

  /**
   * Finds the maximum value in an array.
   *
   * @example
   *
   * ```ts
   * const values = [5, 3, 9];
   *
   * const largest = Arr.max(values);
   * const reversed = Arr.max(values, (a, b) => b - a);
   *
   * assert.deepStrictEqual(largest, Optional.some(9));
   * assert.deepStrictEqual(reversed, Optional.some(3));
   * ```
   *
   * @template E The type of numbers in the array (must extend `number`).
   * @param array The input array.
   * @param comparator An optional custom comparator function `(x: N, y: N) =>
   *   number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is
   *   larger. Defaults to numeric comparison.
   * @returns The maximum value in the array wrapped in Optional.
   */
  export const max = ArrReducingValue.max;

  /**
   * Finds the element with the minimum value according to a mapped numeric
   * value.
   *
   * @example
   *
   * ```ts
   * const users = [
   *   { id: 1, visits: 10 },
   *   { id: 2, visits: 3 },
   *   { id: 3, visits: 5 },
   * ] as const;
   *
   * const leastVisits = Arr.minBy(users, (user) => user.visits);
   * const custom = Arr.minBy(
   *   users,
   *   (user) => user.visits,
   *   (a, b) => b - a,
   * );
   *
   * assert.deepStrictEqual(leastVisits, Optional.some({ id: 2, visits: 3 }));
   * assert.deepStrictEqual(custom, Optional.some({ id: 1, visits: 10 }));
   * ```
   *
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function that maps an element to a value for
   *   comparison.
   * @param comparator An optional custom comparator function for the mapped
   *   values.
   * @returns The element with the minimum mapped value wrapped in Optional.
   */
  export const minBy = ArrReducingValue.minBy;

  /**
   * Finds the element with the maximum value according to a mapped numeric
   * value.
   *
   * @example
   *
   * ```ts
   * const projects = [
   *   { id: 'a', stars: 10 },
   *   { id: 'b', stars: 30 },
   *   { id: 'c', stars: 20 },
   * ];
   *
   * const mostStars = Arr.maxBy(projects, (project) => project.stars);
   * const smallestStars = Arr.maxBy(
   *   projects,
   *   (project) => project.stars,
   *   (a, b) => b - a,
   * );
   *
   * assert.deepStrictEqual(mostStars, Optional.some({ id: 'b', stars: 30 }));
   * assert.deepStrictEqual(smallestStars, Optional.some({ id: 'a', stars: 10 }));
   * ```
   *
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function that maps an element to a value for
   *   comparison.
   * @param comparator An optional custom comparator function for the mapped
   *   values.
   * @returns The element with the maximum mapped value wrapped in Optional.
   */
  export const maxBy = ArrReducingValue.maxBy;

  /**
   * Counts the number of elements in an array that satisfy a predicate.
   *
   * @example
   *
   * ```ts
   * const words = ['Ada', 'Grace', 'Linus'] as const;
   *
   * const longNames = Arr.count(words, (name) => name.length > 4);
   *
   * assert(longNames === 2);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param predicate A function that tests each element.
   * @returns The number of elements that satisfy the predicate.
   */
  export const count = ArrReducingValue.count;

  /**
   * Counts the occurrences of each group key in an array.
   *
   * @example
   *
   * ```ts
   * const words = ['Ada', 'Alan', 'Grace', 'Linus'] as const;
   *
   * const lengthCounts = Arr.countBy(words, (word) => word.length);
   *
   * assert.deepStrictEqual(lengthCounts.get(3), Optional.some(2));
   * assert.deepStrictEqual(lengthCounts.get(4), Optional.some(1));
   * assert.deepStrictEqual(lengthCounts.get(5), Optional.some(1));
   * ```
   *
   * @template E The type of elements in the array.
   * @template G The type of the group key.
   * @param array The input array.
   * @param grouper A function that maps each element to a group key.
   * @returns An IMap of group keys to counts.
   */
  export const countBy = ArrReducingValue.countBy;

  /**
   * Applies a function against an accumulator and each element in the array
   * (from left to right) to reduce it to a single value. This is an alias for
   * `Array.prototype.reduce`.
   *
   * @example
   *
   * ```ts
   * const words = ['Ada', 'Lovelace'];
   *
   * const totalLength = Arr.foldl(words, (acc, word) => acc + word.length, 0);
   * const concat = Arr.foldl<string | number, string>(
   *   (acc, value) => `${acc}-${value}`,
   *   'items',
   * )(words);
   *
   * assert(totalLength === 11);
   * assert(concat === 'items-Ada-Lovelace');
   * ```
   *
   * @template E The type of elements in the array.
   * @template S The type of the accumulated value.
   * @param array The input array.
   * @param callbackfn A function to execute on each element in the array:
   *   `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
   * @param initialValue The initial value of the accumulator.
   * @returns The single value that results from the reduction.
   */
  export const foldl = ArrReducingValue.foldl;

  /**
   * Applies a function against an accumulator and each element in the array
   * (from right to left) to reduce it to a single value. This is an alias for
   * `Array.prototype.reduceRight`.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3];
   *
   * const subtractRight = Arr.foldr(numbers, (acc, value) => acc - value, 0);
   * const joinFromRight = Arr.foldr<number, string>(
   *   (acc, value) => `${acc}${value}`,
   *   '',
   * )(numbers);
   *
   * assert(subtractRight === -6);
   * assert(joinFromRight === '321');
   * ```
   *
   * @template E The type of elements in the array.
   * @template S The type of the accumulated value.
   * @param array The input array.
   * @param callbackfn A function to execute on each element in the array:
   *   `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
   * @param initialValue The initial value of the accumulator.
   * @returns The single value that results from the reduction.
   */
  export const foldr = ArrReducingValue.foldr;

  /**
   * Calculates the sum of numbers in an array.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3, 4] as const;
   *
   * const total = Arr.sum(numbers);
   *
   * assert(total === 10);
   * ```
   *
   * @param array The input array of numbers.
   * @returns The sum of the numbers. Returns 0 for an empty array.
   */
  export const sum = ArrReducingValue.sum;

  /**
   * Joins array elements into a string.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3] as const;
   *
   * const defaultSeparator = Arr.join(numbers);
   * const hyphenSeparated = Arr.join(numbers, '-');
   *
   * assert.deepStrictEqual(defaultSeparator, Result.ok('1,2,3'));
   * assert.deepStrictEqual(hyphenSeparated, Result.ok('1-2-3'));
   * ```
   *
   * @param array The array to join.
   * @param separator The separator string.
   * @returns Result.Ok with the joined string, Result.Err if the operation
   *   throws.
   */
  export const join = ArrReducingValue.join;

  /**
   * Alias for `foldl`. Applies a function against an accumulator and each
   * element in the array (from left to right) to reduce it to a single value.
   *
   * @see {@link foldl}
   */
  export const reduce = ArrReducingValue.reduce;

  /**
   * Alias for `foldr`. Applies a function against an accumulator and each
   * element in the array (from right to left) to reduce it to a single value.
   *
   * @see {@link foldr}
   */
  export const reduceRight = ArrReducingValue.reduceRight;

  // #endregion

  // #region transformation

  /**
   * Creates a new tuple by transforming each element with a mapping function.
   *
   * Preserves the tuple's length while allowing element type transformation.
   * The resulting tuple has the same structure but with transformed element
   * types.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3] as const;
   *
   * const doubled = Arr.map(numbers, (value) => value * 2);
   * const indexed = Arr.map<number, string>((value, index) => `${index}:${value}`)(
   *   numbers,
   * );
   *
   * assert.deepStrictEqual(doubled, [2, 4, 6]);
   * assert.deepStrictEqual(indexed, ['0:1', '1:2', '2:3']);
   * ```
   *
   * @template T - The type of the input tuple
   * @template B - The type that elements will be transformed to
   * @param array - The input tuple
   * @param mapFn - Function that transforms each element (receives element and
   *   index)
   * @returns A new tuple with transformed elements, preserving the original
   *   length
   */
  export const map = ArrTransformation.map;

  /**
   * Returns an array of successively reduced values from an array, starting
   * with an initial value.
   *
   * This function creates a "running tally" by applying a reducer function to
   * each element and accumulating the results. Unlike {@link reduce} which
   * returns a single final value, `scan` returns all intermediate accumulated
   * values, providing visibility into the reduction process.
   *
   * @example
   *
   * ```ts
   * const changes = [5, -2, 3] as const;
   *
   * const runningTotals = Arr.scan(changes, (total, change) => total + change, 0);
   * const runningTotalsFromCurried = Arr.scan(
   *   (total: number, change: number) => total + change,
   *   10,
   * )([-5, 15]);
   *
   * const expectedTotals = [0, 5, 3, 6] as const;
   * const expectedCurriedTotals = [10, 5, 20] as const;
   *
   * assert.deepStrictEqual(runningTotals, expectedTotals);
   * assert.deepStrictEqual(runningTotalsFromCurried, expectedCurriedTotals);
   * ```
   *
   * @template E The type of elements in the input array.
   * @template S The type of the accumulated values and the initial value.
   * @param array The input array to scan over. Can be empty (result will still
   *   contain the initial value).
   * @param reducer A function `(accumulator: S, currentValue: E, currentIndex:
   *   SizeType.Arr) => S`
   * @param init The initial accumulated value. Becomes the first element of the
   *   result array.
   * @returns A NonEmptyArray<S> of accumulated values.
   */
  export const scan = ArrTransformation.scan;

  /**
   * Reverses a tuple, preserving element types in their new positions.
   *
   * @example
   *
   * ```ts
   * const tuple = [1, 'two', true] as const;
   *
   * const reversed = Arr.toReversed(tuple);
   *
   * const expected = [true, 'two', 1] as const;
   *
   * assert.deepStrictEqual(reversed, expected);
   * ```
   *
   * @template T - The tuple type to reverse
   * @param array - The input tuple
   * @returns A new tuple with elements in reverse order and precise typing
   */
  export const toReversed = ArrTransformation.toReversed;

  /**
   * Sorts an array.
   *
   * @example
   *
   * ```ts
   * const numbers = [3, 1, 2] as const;
   * const words = ['banana', 'apple', 'cherry'] as const;
   *
   * const ascendingNumbers = Arr.toSorted(numbers);
   * const alphabetical = Arr.toSorted(words, (left, right) =>
   *   left.localeCompare(right),
   * );
   *
   * const expectedNumbers = [1, 2, 3] as const;
   * const expectedWords = ['apple', 'banana', 'cherry'] as const;
   *
   * assert.deepStrictEqual(ascendingNumbers, expectedNumbers);
   * assert.deepStrictEqual(alphabetical, expectedWords);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparator A comparator function.
   * @returns A new sorted array.
   */
  export const toSorted = ArrTransformation.toSorted;

  /**
   * Sorts an array by a value derived from its elements, using a numeric
   * mapping.
   *
   * @example
   *
   * ```ts
   * const projects = [
   *   { name: 'compiler', issues: 7 },
   *   { name: 'docs', issues: 2 },
   *   { name: 'ui', issues: 5 },
   * ] as const;
   *
   * const byIssueCount = Arr.toSortedBy(projects, (project) => project.issues);
   * const byIssueCountDescending = Arr.toSortedBy(
   *   projects,
   *   (project) => project.issues,
   *   (left, right) => right - left,
   * );
   *
   * const expectedByIssues = [
   *   { name: 'docs', issues: 2 },
   *   { name: 'ui', issues: 5 },
   *   { name: 'compiler', issues: 7 },
   * ] as const;
   *
   * const expectedByIssueCountDescending = [
   *   { name: 'compiler', issues: 7 },
   *   { name: 'ui', issues: 5 },
   *   { name: 'docs', issues: 2 },
   * ] as const;
   *
   * assert.deepStrictEqual(byIssueCount, expectedByIssues);
   * assert.deepStrictEqual(byIssueCountDescending, expectedByIssueCountDescending);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparatorValueMapper A function `(value: A) => number` that maps an
   *   element to a number for comparison.
   * @param comparator An optional custom comparator function `(x: number, y:
   *   number) => number` for the mapped numbers. Defaults to ascending sort (x
   *   - y).
   * @returns A new array sorted by the mapped values.
   */
  export const toSortedBy = ArrTransformation.toSortedBy;

  /**
   * Filters an array based on a predicate function.
   *
   * This function returns a new array containing only the elements that satisfy
   * the predicate. It provides both direct usage and curried versions for
   * functional composition. Supports type guard predicates for type narrowing.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3, 4] as const;
   *
   * const evens = Arr.filter(numbers, (value) => value % 2 === 0);
   * const greaterThanTwo = Arr.filter<number>((value) => value > 2)(numbers);
   *
   * assert.deepStrictEqual(evens, [2, 4]);
   * assert.deepStrictEqual(greaterThanTwo, [3, 4]);
   * ```
   *
   * @template Ar The exact type of the input array, used for precise return
   *   type inference.
   * @template E The type of elements in the array.
   * @template S The narrowed type when using type guard predicates.
   * @param array The array to filter.
   * @param predicate A function that tests each element. Returns `true` to keep
   *   the element, `false` to filter it out.
   * @returns A new array containing only the elements that satisfy the
   *   predicate.
   * @see {@link filterNot} for filtering with negated predicate
   * @see {@link every} for testing if all elements satisfy a predicate
   * @see {@link some} for testing if any elements satisfy a predicate
   * @see {@link find} for finding the first element that satisfies a predicate
   */
  export const filter = ArrTransformation.filter;

  /**
   * Filters an array by excluding elements for which the predicate returns
   * true. This is the opposite of `Array.prototype.filter`.
   *
   * @example
   *
   * ```ts
   * const names = ['Ada', 'Grace', 'Linus'] as const;
   *
   * const notAda = Arr.filterNot(names, (name) => name === 'Ada');
   * const notShort = Arr.filterNot<string>((name) => name.length <= 4)(names);
   *
   * assert.deepStrictEqual(notAda, ['Grace', 'Linus']);
   * assert.deepStrictEqual(notShort, ['Grace', 'Linus']);
   * ```
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param predicate A function `(a: A, index: number) => boolean` that returns
   *   `true` for elements to be excluded.
   * @returns A new array with elements for which the predicate returned
   *   `false`.
   */
  export const filterNot = ArrTransformation.filterNot;

  /**
   * Creates a new array with unique elements from the input array. Order is
   * preserved from the first occurrence. Uses `Set` internally for efficient
   * uniqueness checking.
   *
   * @example
   *
   * ```ts
   * const letters = ['a', 'b', 'a', 'c', 'b'] as const;
   *
   * const uniqueLetters = Arr.uniq(letters);
   *
   * const expected = ['a', 'b', 'c'] as const;
   *
   * assert.deepStrictEqual(uniqueLetters, expected);
   * ```
   *
   * @template P The type of elements in the array.
   * @param array The input array.
   * @returns A new array with unique elements from the input array. Returns
   *   `[]` for an empty input.
   */
  export const uniq = ArrTransformation.uniq;

  /**
   * Creates a new array with unique elements from the input array, based on the
   * values returned by `mapFn`.
   *
   * @example
   *
   * ```ts
   * const people = [
   *   { id: 1, name: 'Ada' },
   *   { id: 2, name: 'Brian' },
   *   { id: 1, name: 'Alan' },
   *   { id: 3, name: 'Grace' },
   * ] as const;
   *
   * const uniqueById = Arr.uniqBy(people, (person) => person.id);
   *
   * const expected = [
   *   { id: 1, name: 'Ada' },
   *   { id: 2, name: 'Brian' },
   *   { id: 3, name: 'Grace' },
   * ] as const;
   *
   * assert.deepStrictEqual(uniqueById, expected);
   * ```
   *
   * @template E The type of elements in the array.
   * @template P The type of the mapped value (used for uniqueness comparison).
   * @param array The input array.
   * @param mapFn A function `(value: A) => P` to map elements to values for
   *   uniqueness comparison.
   * @returns A new array with unique elements based on the mapped values.
   */
  export const uniqBy = ArrTransformation.uniqBy;

  /**
   * Creates a new array with all sub-array elements concatenated into it
   * recursively up to the specified depth.
   *
   * @example
   *
   * ```ts
   * const nested = [
   *   [1, 2],
   *   [3, 4],
   * ] as const;
   *
   * const flatOnce = Arr.flat(nested, 1);
   * const flatCurried = Arr.flat()(nested);
   *
   * assert.deepStrictEqual(flatOnce, [1, 2, 3, 4]);
   * assert.deepStrictEqual(flatCurried, [1, 2, 3, 4]);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template D The depth of flattening.
   * @param array The array to flatten.
   * @param depth The depth level specifying how deep a nested array structure
   *   should be flattened.
   * @returns A new array with the sub-array elements concatenated.
   */
  export const flat = ArrTransformation.flat;

  /**
   * Creates a new array with all sub-array elements concatenated into it
   * recursively up to the specified depth, after first mapping each element
   * using a mapping function.
   *
   * @example
   *
   * ```ts
   * const words = ['Ada', 'AI'] as const;
   *
   * const characters = Arr.flatMap(words, (word) => word.split(''));
   * const labeled = Arr.flatMap<string, string>((word, index) =>
   *   word.split('').map((char) => `${index}-${char}`),
   * )(words);
   *
   * assert.deepStrictEqual(characters, ['A', 'd', 'a', 'A', 'I']);
   * assert.deepStrictEqual(labeled, ['0-A', '0-d', '0-a', '1-A', '1-I']);
   * ```
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @template B The type of elements returned by the mapping function.
   * @param array The array to map and flatten.
   * @param mapFn A function that produces new elements for the new array.
   * @returns A new array with mapped elements flattened.
   */
  export const flatMap = ArrTransformation.flatMap;

  /**
   * Partitions an array into sub-arrays of a specified size. The last partition
   * may be smaller if the array length is not a multiple of `chunkSize`.
   *
   * @example
   *
   * ```ts
   * const values = [1, 2, 3, 4, 5] as const;
   *
   * const pairs = Arr.partition(values, 2);
   * const triples = Arr.partition(3)(values);
   *
   * const expectedPairs = [[1, 2], [3, 4], [5]] as const;
   *
   * assert.deepStrictEqual(pairs, expectedPairs);
   * assert.deepStrictEqual(triples, [
   *   [1, 2, 3],
   *   [4, 5],
   * ]);
   * ```
   *
   * @template N The size of each partition.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param chunkSize The size of each partition.
   * @returns An array of arrays, where each inner array has up to `chunkSize`
   *   elements.
   */
  export const partition = ArrTransformation.partition;

  /**
   * Alias for `partition`. Splits an array into chunks of a specified size.
   *
   * @see {@link partition}
   */
  export const chunk = ArrTransformation.chunk;

  /**
   * Concatenates two arrays.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2] as const;
   * const words = ['three', 'four'] as const;
   *
   * const combined = Arr.concat(numbers, words);
   *
   * const expectedCombined = [1, 2, 'three', 'four'] as const;
   *
   * assert.deepStrictEqual(combined, expectedCombined);
   * ```
   *
   * @template E1 The type of the first array (can be a tuple).
   * @template E2 The type of the second array (can be a tuple).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array that is the concatenation of the two input arrays.
   */
  export const concat = ArrTransformation.concat;

  /**
   * Groups elements of an array by a key derived from each element, returning
   * an immutable IMap.
   *
   * @example
   *
   * ```ts
   * const animals = ['ant', 'bat', 'cat', 'dove'] as const;
   *
   * const groupedByLength = Arr.groupBy(animals, (animal) => animal.length);
   * const groupedByFirstLetter = Arr.groupBy((animal: string) => animal[0])(
   *   animals,
   * );
   *
   * assert.deepStrictEqual(
   *   groupedByLength.get(3),
   *   Optional.some(['ant', 'bat', 'cat'] as const),
   * );
   * assert.deepStrictEqual(
   *   groupedByLength.get(4),
   *   Optional.some(['dove'] as const),
   * );
   * assert.deepStrictEqual(groupedByLength.get(5), Optional.none);
   * ```
   *
   * @template E The type of elements in the input array.
   * @template G The type of the group key.
   * @param array The input array to group.
   * @param grouper A function `(value: E, index: SizeType.Arr) => G`.
   * @returns An IMap<G, readonly E[]>.
   */
  export const groupBy = ArrTransformation.groupBy;

  /**
   * Creates an array of tuples by pairing up corresponding elements from two
   * arrays.
   *
   * @example
   *
   * ```ts
   * const letters = ['a', 'b', 'c'] as const;
   * const numbers = [1, 2, 3] as const;
   *
   * const pairs = Arr.zip(letters, numbers);
   *
   * const expectedPairs = [
   *   ['a', 1],
   *   ['b', 2],
   *   ['c', 3],
   * ] as const;
   *
   * assert.deepStrictEqual(pairs, expectedPairs);
   * ```
   *
   * @template E1 The type of the first array.
   * @template E2 The type of the second array.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns An array of tuples where each tuple contains corresponding
   *   elements from both arrays.
   */
  export const zip = ArrTransformation.zip;

  // #endregion

  // #region set operations & equality

  /**
   * Checks if two arrays are equal by performing a shallow comparison of their
   * elements.
   *
   * @example
   *
   * ```ts
   * const numbers = [1, 2, 3] as const;
   * const sameNumbers = [1, 2, 3] as const;
   * const differentNumbers = [1, 2, 4] as const;
   *
   * assert.ok(Arr.eq(numbers, sameNumbers));
   * assert.notOk(Arr.eq(numbers, differentNumbers));
   * ```
   *
   * @template E The type of elements in the arrays.
   * @param array1 The first array.
   * @param array2 The second array.
   * @param equality An optional function `(a: T, b: T) => boolean` to compare
   *   elements. Defaults to `Object.is`.
   * @returns `true` if the arrays have the same length and all corresponding
   *   elements are equal according to the `equality` function, `false`
   *   otherwise.
   */
  export const eq = ArrSetOp.eq;

  /**
   * Alias for `eq`. Checks if two arrays are equal by performing a shallow
   * comparison of their elements.
   *
   * @see {@link eq}
   */
  export const equal = ArrSetOp.equal;

  /**
   * Checks if the first array is a subset of the second array.
   *
   * @example
   *
   * ```ts
   * const subset = [1, 2] as const;
   * const superset = [1, 2, 3] as const;
   * const notSubset = [2, 4] as const;
   *
   * assert.ok(Arr.isSubset(subset, superset));
   * assert.notOk(Arr.isSubset(notSubset, superset));
   * ```
   *
   * @template E1 The type of elements in the first array.
   * @template E2 The type of elements in the second array.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns `true` if `array1` is a subset of `array2`, `false` otherwise.
   */
  export const isSubset = ArrSetOp.isSubset;

  /**
   * Checks if the first array is a superset of the second array.
   *
   * @example
   *
   * ```ts
   * const potentialSuperset = ['a', 'b', 'c'] as const;
   * const subset = ['a', 'c'] as const;
   * const notSuperset = ['a', 'd'] as const;
   *
   * assert.ok(Arr.isSuperset(potentialSuperset, subset));
   * assert.notOk(Arr.isSuperset(subset, potentialSuperset));
   * assert.notOk(Arr.isSuperset(potentialSuperset, notSuperset));
   * ```
   *
   * @template E1 The type of elements in the first array.
   * @template E2 The type of elements in the second array.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns `true` if `array1` is a superset of `array2`, `false` otherwise.
   */
  export const isSuperset = ArrSetOp.isSuperset;

  /**
   * Returns the intersection of two arrays of primitive types.
   *
   * @example
   *
   * ```ts
   * const refs = ['Ada', 'Alan', 'Grace'] as const;
   * const attendees = ['Grace', 'Alan', 'Barbara'] as const;
   *
   * const both = Arr.setIntersection(refs, attendees);
   *
   * assert.deepStrictEqual(both, ['Alan', 'Grace']);
   * ```
   *
   * @template E1 The type of elements in the first array.
   * @template E2 The type of elements in the second array.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array containing elements that are in both arrays.
   */
  export const setIntersection = ArrSetOp.setIntersection;

  /**
   * Returns the set difference of two arrays.
   *
   * @example
   *
   * ```ts
   * const baseline = [1, 2, 3, 4] as const;
   * const removed = [2, 4] as const;
   *
   * const remaining = Arr.setDifference(baseline, removed);
   *
   * assert.deepStrictEqual(remaining, [1, 3]);
   * ```
   *
   * @template E The type of elements in the arrays.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array containing elements from `array1` that are not in
   *   `array2`.
   */
  export const setDifference = ArrSetOp.setDifference;

  /**
   * Returns the set difference of two sorted arrays of numbers.
   *
   * @example
   *
   * ```ts
   * const upcoming = [1, 3, 5, 7, 9] as const;
   * const completed = [3, 4, 7] as const;
   *
   * const remaining = Arr.sortedNumSetDifference(upcoming, completed);
   *
   * const expected = [1, 5, 9] as const;
   *
   * assert.deepStrictEqual(remaining, expected);
   * ```
   *
   * @template E The type of numbers in the arrays.
   * @param sortedList1 The first sorted array of numbers.
   * @param sortedList2 The second sorted array of numbers.
   * @returns A new sorted array containing numbers from `sortedList1` that are
   *   not in `sortedList2`.
   */
  export const sortedNumSetDifference = ArrSetOp.sortedNumSetDifference;

  // #endregion
}
