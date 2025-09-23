import { IMap } from '../../collections/index.mjs';
import { expectType } from '../../expect-type.mjs';
import { asPositiveUint32, asUint32, Uint32 } from '../../number/index.mjs';
import { castMutable, tp } from '../../others/index.mjs';
import { newArray, seq } from './array-utils-creation.mjs';
import { size } from './array-utils-size.mjs';

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
 * const numbers = [1, 2, 3, 4] as const;
 *
 * const evens = Arr.filter(numbers, (value) => value % 2 === 0);
 * const greaterThanTwo = Arr.filter<number>((value) => value > 2)(numbers);
 *
 * assert.deepStrictEqual(evens, [2, 4]);
 * assert.deepStrictEqual(greaterThanTwo, [3, 4]);
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
export function map<const Ar extends readonly unknown[], B>(
  array: Ar,
  mapFn: (a: Ar[number], index: ArrayIndex<Ar>) => B,
): Readonly<{ [K in keyof Ar]: B }>;

// curried version
export function map<A, B>(
  mapFn: (a: A, index: SizeType.Arr) => B,
): <const Ar extends readonly A[]>(
  array: Ar,
) => Readonly<{ [K in keyof Ar]: B }>;

export function map<A, B>(
  ...args:
    | readonly [array: readonly A[], mapFn: (a: A, index: SizeType.Arr) => B]
    | readonly [mapFn: (a: A, index: SizeType.Arr) => B]
): readonly B[] | ((array: readonly A[]) => readonly B[]) {
  switch (args.length) {
    case 2: {
      const [array, mapFn] = args;
      // eslint-disable-next-line total-functions/no-unsafe-type-assertion
      return array.map(mapFn as never);
    }
    case 1: {
      const [mapFn] = args;
      return (array: readonly A[]) => map(array, mapFn);
    }
  }
}

/**
 * Returns an array of successively reduced values from an array, starting
 * with an initial value.
 *
 * This function creates a "running tally" by applying a reducer function to
 * each element and accumulating the results. Unlike {@link reduce} which
 * returns a single final value, `scan` returns all intermediate accumulated
 * values, providing visibility into the reduction process.
 *
 * **Key Differences from Reduce:**
 *
 * - {@link reduce}: `[1, 2, 3] -> 6` (final sum only)
 * - `scan`: `[1, 2, 3] -> [0, 1, 3, 6]` (all intermediate sums including
 *   initial value)
 *
 * **Guaranteed Non-Empty Return:** The result is always a
 * {@link NonEmptyArray}<S> because it includes the initial value as the first
 * element, even for empty input arrays. This provides type safety and
 * eliminates the need for empty array checks.
 *
 * **Array Length Relationship:** `result.length === array.length + 1`
 * (includes initial value)
 *
 * **Curried Usage:** Supports currying for functional composition - when
 * called with only the reducer and initial value, returns a reusable function
 * that can be applied to arrays.
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
 *
 * assert.deepStrictEqual(
 *   groupedByFirstLetter.get('a'),
 *   Optional.some(['ant'] as const),
 * );
 * assert.deepStrictEqual(
 *   groupedByFirstLetter.get('d'),
 *   Optional.some(['dove'] as const),
 * );
 * ```
 *
 * @template E The type of elements in the input array.
 * @template S The type of the accumulated values and the initial value.
 * @param array The input array to scan over. Can be empty (result will still
 *   contain the initial value).
 * @param reducer A function `(accumulator: S, currentValue: E, currentIndex:
 *   SizeType.Arr) => S` that:
 *
 *   - **accumulator:** The current accumulated value (starts with `init`, then
 *       previous results)
 *   - **currentValue:** The current array element being processed
 *   - **currentIndex:** The 0-based index of the current element (typed as
 *       {@link SizeType.Arr})
 *   - **returns:** The new accumulated value to include in the result array
 *
 * @param init The initial accumulated value. Becomes the first element of the
 *   result array.
 * @returns A {@link NonEmptyArray}<S> of accumulated values with length
 *   `array.length + 1`:
 *
 *   - `result[0]` is always the `init` value
 *   - `result[i+1]` is the result of applying the reducer to `result[i]` and
 *       `array[i]`
 *   - Guaranteed to be non-empty regardless of input array length
 *
 * @see {@link reduce} for getting only the final accumulated value
 * @see {@link NonEmptyArray} for understanding the guaranteed non-empty return type
 * @see {@link SizeType.Arr} for the index parameter type
 * @see Array.prototype.reduce for the standard reduce function
 */
export function scan<const Ar extends readonly unknown[], S>(
  array: Ar,
  reducer: (
    accumulator: S,
    currentValue: Ar[number],
    currentIndex: ArrayIndex<Ar>,
  ) => S,
  init: S,
): NonEmptyArray<S>;

export function scan<E, S>(
  reducer: (accumulator: S, currentValue: E, currentIndex: SizeType.Arr) => S,
  init: S,
): (array: readonly E[]) => NonEmptyArray<S>;

export function scan<E, S>(
  ...args:
    | readonly [
        array: readonly E[],
        reducer: (
          accumulator: S,
          currentValue: E,
          currentIndex: SizeType.Arr,
        ) => S,
        init: S,
      ]
    | readonly [
        reducer: (
          accumulator: S,
          currentValue: E,
          currentIndex: SizeType.Arr,
        ) => S,
        init: S,
      ]
): NonEmptyArray<S> | ((array: readonly E[]) => NonEmptyArray<S>) {
  switch (args.length) {
    case 3: {
      const [array, reducer, init] = args;
      const mut_result: MutableNonEmptyArray<S> = castMutable(
        newArray<S, PositiveUint32>(asPositiveUint32(array.length + 1), init),
      );

      let mut_acc = init;

      for (const [index, value] of array.entries()) {
        mut_acc = reducer(mut_acc, value, asUint32(index));
        mut_result[index + 1] = mut_acc;
      }

      return mut_result;
    }
    case 2: {
      const [reducer, init] = args;
      return (array) => scan(array, reducer, init);
    }
  }
}

/**
 * Reverses a tuple, preserving element types in their new positions.
 *
 * The type system precisely tracks the reversal, so the returned tuple has
 * its element types in the exact reverse order. This is more precise than
 * array reversal which loses positional type information.
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
 * @template T - The tuple type to reverse
 * @param array - The input tuple
 * @returns A new tuple with elements in reverse order and precise typing
 */
export const toReversed = <const Ar extends readonly unknown[]>(
  array: Ar,
): List.Reverse<Ar> =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  array.toReversed() as never;

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
export const toSorted = <const Ar extends readonly unknown[]>(
  ...[array, comparator]: Ar extends readonly number[]
    ? readonly [
        array: Ar,
        // If the array elements are mapped to numbers, comparator is optional.
        comparator?: (x: Ar[number], y: Ar[number]) => number,
      ]
    : readonly [array: Ar, comparator: (x: Ar[number], y: Ar[number]) => number]
): IsFixedLengthList<Ar> extends true
  ? ArrayOfLength<Ar['length'], Ar[number]>
  : Ar extends NonEmptyArray<unknown>
    ? NonEmptyArray<Ar[number]>
    : readonly Ar[number][] =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  array.toSorted(
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    (comparator as ((x: unknown, y: unknown) => number) | undefined) ??
      // eslint-disable-next-line total-functions/no-unsafe-type-assertion
      ((x, y) => (x as number) - (y as number)),
  ) as never;

/**
 * Sorts an array by a value derived from its elements, using a numeric
 * mapping.
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
 * @template E The type of elements in the array.
 * @param array The input array.
 * @param comparatorValueMapper A function `(value: A) => number` that maps an
 *   element to a number for comparison.
 * @param comparator An optional custom comparator function `(x: number, y:
 *   number) => number` for the mapped numbers. Defaults to ascending sort (x
 *   - y).
 * @returns A new array sorted by the mapped values.
 */
export function toSortedBy<const Ar extends readonly unknown[]>(
  array: Ar,
  comparatorValueMapper: (value: Ar[number]) => number,
  // If the array elements are mapped to numbers, comparator is optional.
  comparator?: (x: number, y: number) => number,
): IsFixedLengthList<Ar> extends true
  ? ArrayOfLength<Ar['length'], Ar[number]>
  : Ar extends NonEmptyArray<unknown>
    ? NonEmptyArray<Ar[number]>
    : readonly Ar[number][];

export function toSortedBy<const Ar extends readonly unknown[], const V>(
  array: Ar,
  comparatorValueMapper: (value: Ar[number]) => V,
  comparator: (x: V, y: V) => number,
): IsFixedLengthList<Ar> extends true
  ? ArrayOfLength<Ar['length'], Ar[number]>
  : Ar extends NonEmptyArray<unknown>
    ? NonEmptyArray<Ar[number]>
    : readonly Ar[number][];

export function toSortedBy<E, const V>(
  array: readonly E[],
  comparatorValueMapper: (value: E) => V,
  comparator?: (x: V, y: V) => number,
): readonly E[] {
  return array.toSorted((x, y) =>
    comparator === undefined
      ? // This branch assumes V is number if comparator is undefined.
        // The overloads should handle this, but explicit cast might be needed if V is not number.
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        (comparatorValueMapper(x) as number) -
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        (comparatorValueMapper(y) as number)
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

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
 * const names = ['Ada', 'Grace', 'Linus'] as const;
 *
 * const notAda = Arr.filterNot(names, (name) => name === 'Ada');
 * const notShort = Arr.filterNot<string>((name) => name.length <= 4)(names);
 *
 * assert.deepStrictEqual(notAda, ['Grace', 'Linus']);
 * assert.deepStrictEqual(notShort, ['Grace', 'Linus']);
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
// Type guard overloads
export function filter<
  const Ar extends readonly unknown[],
  S extends Ar[number],
>(
  array: Ar,
  predicate: (a: Ar[number], index: ArrayIndex<Ar>) => a is S,
): readonly S[];

export function filter<E, S extends E>(
  predicate: (a: E, index: SizeType.Arr) => a is S,
): (array: readonly E[]) => readonly S[];

// Regular boolean predicate overloads
export function filter<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
): readonly Ar[number][];

export function filter<E>(
  predicate: (a: E, index: SizeType.Arr) => boolean,
): (array: readonly E[]) => readonly E[];

export function filter<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (a: E, index: SizeType.Arr) => boolean,
      ]
    | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
): readonly E[] | ((array: readonly E[]) => readonly E[]) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return array.filter((a, i) => predicate(a, asUint32(i)));
    }
    case 1: {
      const [predicate] = args;
      return (array) => filter(array, predicate);
    }
  }
}

/**
 * Filters an array by excluding elements for which the predicate returns
 * true. This is the opposite of `Array.prototype.filter`.
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
 * @template E The type of elements in the array.
 * @param array The input array.
 * @param predicate A function `(a: A, index: number) => boolean` that returns
 *   `true` for elements to be excluded.
 * @returns A new array with elements for which the predicate returned
 *   `false`.
 */
export function filterNot<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
): readonly Ar[number][];

export function filterNot<E>(
  predicate: (a: E, index: SizeType.Arr) => boolean,
): (array: readonly E[]) => readonly E[];

export function filterNot<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (a: E, index: SizeType.Arr) => boolean,
      ]
    | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
): readonly E[] | ((array: readonly E[]) => readonly E[]) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return array.filter((a, i) => !predicate(a, asUint32(i)));
    }
    case 1: {
      const [predicate] = args;
      return (array) => filterNot(array, predicate);
    }
  }
}

/**
 * Creates a new array with unique elements from the input array. Order is
 * preserved from the first occurrence. Uses `Set` internally for efficient
 * uniqueness checking.
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
 * @template P The type of elements in the array.
 * @param array The input array.
 * @returns A new array with unique elements from the input array. Returns
 *   `[]` for an empty input.
 */
export const uniq = <const Ar extends readonly Primitive[]>(
  array: Ar,
): Ar extends NonEmptyArray<unknown>
  ? NonEmptyArray<Ar[number]>
  : readonly Ar[number][] =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  Array.from(new Set(array)) as never;

/**
 * Creates a new array with unique elements from the input array, based on the
 * values returned by `mapFn`.
 *
 * - If the input is a non-empty array, returns a non-empty array.
 * - Otherwise, returns a readonly array.
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
 * @template E The type of elements in the array.
 * @template P The type of the mapped value (used for uniqueness comparison).
 * @param array The input array.
 * @param mapFn A function `(value: A) => P` to map elements to values for
 *   uniqueness comparison.
 * @returns A new array with unique elements based on the mapped values.
 */
export const uniqBy = <
  const Ar extends readonly unknown[],
  P extends Primitive,
>(
  array: Ar,
  mapFn: (value: Ar[number]) => P,
): Ar extends NonEmptyArray<unknown>
  ? NonEmptyArray<Ar[number]>
  : readonly Ar[number][] => {
  const mut_mappedValues = new Set<P>();

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return array.filter((val) => {
    const mappedValue = mapFn(val);

    if (mut_mappedValues.has(mappedValue)) return false;
    mut_mappedValues.add(mappedValue);

    return true;
  }) satisfies readonly Ar[number][] as never;
};

/**
 * Creates a new array with all sub-array elements concatenated into it
 * recursively up to the specified depth.
 *
 * This function flattens nested arrays to the specified depth level. A depth
 * of 1 flattens one level, Number.POSITIVE_INFINITY flattens all levels.
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
 * @template D The depth of flattening.
 * @param array The array to flatten.
 * @param depth The depth level specifying how deep a nested array structure
 *   should be flattened.
 * @returns A new array with the sub-array elements concatenated.
 */
export function flat<
  const Ar extends readonly unknown[],
  D extends SafeUintWithSmallInt = 1,
>(array: Ar, depth?: D): readonly FlatArray<Ar, D>[];

export function flat<D extends SafeUintWithSmallInt = 1>(
  depth?: number,
): <const Ar extends readonly unknown[]>(
  array: Ar,
) => readonly FlatArray<Ar, D>[];

export function flat<E, D extends SafeUintWithSmallInt = 1>(
  ...args: readonly [array: readonly E[], depth?: D] | readonly [depth?: D]
): readonly unknown[] | ((array: readonly unknown[]) => readonly unknown[]) {
  switch (args.length) {
    case 2: {
      const [array, depth] = args;
      return array.flat(depth);
    }
    case 1: {
      const [arrayOrDepth] = args;
      if (typeof arrayOrDepth === 'number') {
        const depth = arrayOrDepth as SafeUintWithSmallInt | undefined;
        return (array) => flat(array, depth);
      } else if (arrayOrDepth === undefined) {
        return (array) => flat(array, 1);
      } else {
        expectType<typeof arrayOrDepth, readonly E[]>('=');
        return arrayOrDepth.flat();
      }
    }

    case 0:
      return (array) => flat(array, 1);
  }
}

/**
 * Creates a new array with all sub-array elements concatenated into it
 * recursively up to the specified depth, after first mapping each element
 * using a mapping function.
 *
 * This function is equivalent to calling `map` followed by `flat` with depth
 * 1.
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
 * @template Ar The exact type of the input array.
 * @template E The type of elements in the array.
 * @template B The type of elements returned by the mapping function.
 * @param array The array to map and flatten.
 * @param mapFn A function that produces new elements for the new array.
 * @returns A new array with mapped elements flattened.
 */
export function flatMap<const Ar extends readonly unknown[], B>(
  array: Ar,
  mapFn: (a: Ar[number], index: ArrayIndex<Ar>) => readonly B[],
): readonly B[];

export function flatMap<A, B>(
  mapFn: (a: A, index: SizeType.Arr) => readonly B[],
): (array: readonly A[]) => readonly B[];

export function flatMap<A, B>(
  ...args:
    | readonly [
        array: readonly A[],
        mapFn: (a: A, index: SizeType.Arr) => readonly B[],
      ]
    | readonly [mapFn: (a: A, index: SizeType.Arr) => readonly B[]]
): readonly B[] | ((array: readonly A[]) => readonly B[]) {
  switch (args.length) {
    case 2: {
      const [array, mapFn] = args;
      return array.flatMap((a, i) => mapFn(a, asUint32(i)));
    }
    case 1: {
      const [mapFn] = args;
      return (array: readonly A[]) => flatMap(array, mapFn);
    }
  }
}

/**
 * Partitions an array into sub-arrays of a specified size. The last partition
 * may be smaller if the array length is not a multiple of `chunkSize`.
 * Returns an empty array if chunkSize < 2.
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
 * @template N The size of each partition (must be a number type, typically a
 *   literal for precise typing).
 * @template E The type of elements in the array.
 * @param array The input array.
 * @param chunkSize The size of each partition.
 * @returns An array of arrays, where each inner array has up to `chunkSize`
 *   elements.
 */
export function partition<
  N extends WithSmallInt<PositiveInt & SizeType.Arr>,
  E,
>(array: readonly E[], chunkSize: N): readonly (readonly E[])[];

export function partition<N extends WithSmallInt<PositiveInt & SizeType.Arr>>(
  chunkSize: N,
): <E>(array: readonly E[]) => readonly (readonly E[])[];

export function partition<
  N extends WithSmallInt<PositiveInt & SizeType.Arr>,
  E,
>(
  ...args:
    | readonly [array: readonly E[], chunkSize: N]
    | readonly [chunkSize: N]
):
  | readonly (readonly E[])[]
  | ((array: readonly E[]) => readonly (readonly E[])[]) {
  switch (args.length) {
    case 2: {
      const [array, chunkSize] = args;
      return chunkSize < 2
        ? []
        : // eslint-disable-next-line total-functions/no-partial-division
          seq(asUint32(Math.ceil(array.length / chunkSize))).map((i: Uint32) =>
            array.slice(chunkSize * i, chunkSize * (i + 1)),
          );
    }
    case 1: {
      const [chunkSize] = args;
      return (array) => partition(array, chunkSize);
    }
  }
}

/**
 * Concatenates two arrays.
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
 *
 * const pairs2 = Arr.chunk([1, 2, 3, 4, 5, 6], 2);
 *
 * assert.deepStrictEqual(pairs2, [
 *   [1, 2],
 *   [3, 4],
 *   [5, 6],
 * ]);
 * ```
 *
 * @template E1 The type of the first array (can be a tuple).
 * @template E2 The type of the second array (can be a tuple).
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns A new array that is the concatenation of the two input arrays.
 *   Type is `readonly [...E1, ...E2]`.
 */
export const concat = <
  const Ar1 extends readonly unknown[],
  const Ar2 extends readonly unknown[],
>(
  array1: Ar1,
  array2: Ar2,
): readonly [...Ar1, ...Ar2] => [...array1, ...array2];

/**
 * Groups elements of an array by a key derived from each element, returning
 * an immutable {@link IMap}.
 *
 * This function categorizes array elements into groups based on a computed
 * key, using the efficient {@link IMap} data structure for the result. The
 * grouper function receives both the element and its index, enabling flexible
 * grouping strategies.
 *
 * **MapSetKeyType Constraint:** The group key type `G` must extend
 * {@link MapSetKeyType}, which includes primitive types that can be used as
 * Map keys (string, number, boolean, symbol, null, undefined). This
 * constraint ensures type safety and efficient key-based operations.
 *
 * **IMap Return Type:** Returns an {@link IMap}<G, readonly E[]> where:
 *
 * - Keys are the computed group identifiers of type `G`
 * - Values are immutable arrays containing all elements that belong to each
 *   group
 * - Preserves insertion order of first occurrence of each group
 * - Maintains type safety with precise generic types
 *
 * **Curried Usage:** Supports currying for functional composition - when
 * called with only the grouper function, returns a reusable function that can
 * be applied to arrays.
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
 * @template E The type of elements in the input array.
 * @template G The type of the group key, constrained to {@link MapSetKeyType}
 *   (primitives usable as Map keys). Must be one of: `string | number |
 *   boolean | symbol | null | undefined`
 * @param array The input array to group. Can be empty (returns empty
 *   {@link IMap}).
 * @param grouper A function `(value: E, index: SizeType.Arr) => G` that
 *   computes the group key for each element.
 *
 *   - **value:** The current array element
 *   - **index:** The 0-based index of the element (typed as {@link SizeType.Arr})
 *   - **returns:** The group key (must be {@link MapSetKeyType})
 *
 * @returns An {@link IMap}<G, readonly E[]> where:
 *
 *   - Keys are unique group identifiers computed by the grouper function
 *   - Values are immutable arrays of elements belonging to each group
 *   - Empty groups are not included (only groups with at least one element)
 *   - Insertion order is preserved based on first occurrence of each group key
 *
 * @see {@link IMap} for working with the returned immutable map
 * @see {@link MapSetKeyType} for understanding valid key types
 * @see {@link IMap.get} for safely accessing grouped results
 * @see {@link IMap.map} for transforming grouped data
 * @see {@link Optional} for handling potentially missing groups
 */
export function groupBy<
  const Ar extends readonly unknown[],
  G extends MapSetKeyType,
>(
  array: Ar,
  grouper: (value: Ar[number], index: ArrayIndex<Ar>) => G,
): IMap<G, readonly Ar[number][]>;

export function groupBy<E, G extends MapSetKeyType>(
  grouper: (value: E, index: SizeType.Arr) => G,
): (array: readonly E[]) => IMap<G, readonly E[]>;

export function groupBy<E, G extends MapSetKeyType>(
  ...args:
    | readonly [
        array: readonly E[],
        grouper: (value: E, index: SizeType.Arr) => G,
      ]
    | readonly [grouper: (value: E, index: SizeType.Arr) => G]
): IMap<G, readonly E[]> | ((array: readonly E[]) => IMap<G, readonly E[]>) {
  switch (args.length) {
    case 2: {
      const [array, grouper] = args;
      const mut_groups = new Map<G, E[]>(); // Store mutable arrays internally

      for (const [index, e] of array.entries()) {
        const key = grouper(e, asUint32(index)); // Ensure index is treated as SizeType.Arr
        const mut_group = mut_groups.get(key);
        if (mut_group !== undefined) {
          mut_group.push(e);
        } else {
          mut_groups.set(key, [e]);
        }
      }
      // Cast to IMap<G, readonly A[]> for the public interface
      return IMap.create<G, readonly E[]>(mut_groups);
    }
    case 1: {
      const [grouper] = args;
      return (array: readonly E[]) => groupBy(array, grouper);
    }
  }
}

/**
 * Creates an array of tuples by pairing up corresponding elements from two
 * arrays. The resulting array has a length equal to the minimum of the two
 * input array lengths.
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
 * @template E1 The type of the first array.
 * @template E2 The type of the second array.
 * @param array1 The first array.
 * @param array2 The second array.
 * @returns An array of tuples where each tuple contains corresponding
 *   elements from both arrays.
 */
export const zip = <
  const Ar1 extends readonly unknown[],
  const Ar2 extends readonly unknown[],
>(
  array1: Ar1,
  array2: Ar2,
): List.Zip<Ar1, Ar2> =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  seq(Uint32.min(size(array1), size(array2))).map((i: Uint32) =>
    // Non-null assertion is safe here because `i` is always within bounds of both arrays up to the length of the shorter one.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tp(array1[i]!, array2[i]!),
  ) as unknown as List.Zip<Ar1, Ar2>;

/**
 * Alias for `partition`. Splits an array into chunks of a specified size.
 *
 * @see {@link partition}
 */
export const chunk = partition;
