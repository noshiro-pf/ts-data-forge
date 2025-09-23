import { asUint32, Num } from '../../number/index.mjs';

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
export const isArray = <E,>(value: E): value is FilterArray<E> =>
  Array.isArray(value);

type FilterArray<T> = T extends T
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BoolOr<TypeEq<T, unknown>, TypeEq<T, any>> extends true
    ? Cast<readonly unknown[], T>
    : T extends readonly unknown[]
      ? T
      : never // Exclude non-array types
  : never;

type Cast<A, B> = A extends B ? A : never;

// validation

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
export const isEmpty = <E,>(array: readonly E[]): array is readonly [] =>
  array.length === 0;

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
export const isNonEmpty = <E,>(
  array: readonly E[],
): array is NonEmptyArray<E> => array.length > 0;

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
export const isArrayOfLength = <E, N extends SizeType.ArgArr>(
  array: readonly E[],
  len: N,
): array is ArrayOfLength<N, E> => array.length === len;

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
export const isArrayAtLeastLength = <E, N extends SizeType.ArgArr>(
  array: readonly E[],
  len: N,
): array is ArrayAtLeastLen<N, E> => array.length >= len;

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
 * @template S The narrowed type when using type guard predicates.
 * @param array The array to test.
 * @param predicate A function that tests each element.
 * @returns `true` if all elements pass the test, `false` otherwise.
 */
// Type guard overloads - narrow the entire array type
export function every<E, S extends E>(
  array: readonly E[],
  predicate: (a: E, index: SizeType.Arr) => a is S,
): array is readonly S[];

export function every<E, S extends E>(
  predicate: (a: E, index: SizeType.Arr) => a is S,
): (array: readonly E[]) => array is readonly S[];

// Regular boolean predicate overloads
export function every<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
): boolean;

export function every<E>(
  predicate: (a: E, index: SizeType.Arr) => boolean,
): (array: readonly E[]) => boolean;

export function every<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (a: E, index: SizeType.Arr) => boolean,
      ]
    | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
): boolean | ((array: readonly E[]) => boolean) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return array.every((a, i) => predicate(a, asUint32(i)));
    }
    case 1: {
      const [predicate] = args;
      return (array) => every(array, predicate);
    }
  }
}

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
 * @template Ar The exact type of the input array.
 * @template E The type of elements in the array.
 * @param array The array to test.
 * @param predicate A function that tests each element.
 * @returns `true` if at least one element passes the test, `false` otherwise.
 */
export function some<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
): boolean;

export function some<E>(
  predicate: (a: E, index: SizeType.Arr) => boolean,
): (array: readonly E[]) => boolean;

export function some<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (a: E, index: SizeType.Arr) => boolean,
      ]
    | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
): boolean | ((array: readonly E[]) => boolean) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return array.some((a, i) => predicate(a, asUint32(i)));
    }
    case 1: {
      const [predicate] = args;
      return (array) => some(array, predicate);
    }
  }
}

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
export const indexIsInRange = <E,>(
  array: readonly E[],
  index: SizeType.ArgArr,
): boolean => Num.isInRange(0, array.length)(index);
