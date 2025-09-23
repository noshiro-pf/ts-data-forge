import { IMap } from '../../collections/index.mjs';
import { Optional, Result } from '../../functional/index.mjs';
import { isString, isUndefined } from '../../guard/index.mjs';
import { asUint32, Num, Uint32 } from '../../number/index.mjs';
import { unknownToString } from '../../others/index.mjs';
import { isNonEmpty } from './array-utils-validation.mjs';

/**
 * Finds the minimum value in an array.
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
 *   larger. Defaults to `x - y`.
 * @returns The minimum value in the array wrapped in Optional.
 */
export function min<const Ar extends readonly number[]>(
  array: Ar,
  // If the array elements are numbers, comparator is optional.
  comparator?: (x: Ar[number], y: Ar[number]) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function min<const Ar extends readonly unknown[]>(
  array: Ar,
  comparator: (x: Ar[number], y: Ar[number]) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function min<E extends number>(
  array: readonly E[],
  comparator?: (x: E, y: E) => number,
): Optional<E> {
  if (!isNonEmpty(array)) {
    return Optional.none;
  }

  const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));

  return Optional.some(
    array.reduce(
      (currentMin, curr) => (cmp(curr, currentMin) < 0 ? curr : currentMin),
      array[0],
    ),
  );
}

/**
 * Finds the maximum value in an array.
 *
 * - If the array is non-empty, returns the maximum value.
 * - If the array is empty, returns `Optional.none`.
 * - You can provide a custom comparator for arbitrary types.
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
 * @param array The input array.
 * @param comparator An optional custom comparator function `(x: A, y: A) =>
 *   number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is
 *   larger. Defaults to numeric comparison.
 * @returns The maximum value in the array wrapped in Optional.
 */
export function max<const Ar extends readonly number[]>(
  array: Ar,
  // If the array elements are numbers, comparator is optional.
  comparator?: (x: Ar[number], y: Ar[number]) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function max<const Ar extends readonly unknown[]>(
  array: Ar,
  comparator: (x: Ar[number], y: Ar[number]) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function max<E extends number>(
  array: readonly E[],
  comparator?: (x: E, y: E) => number,
): Optional<E> {
  const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));
  // Find max by finding min with an inverted comparator
  return min(array, (x, y) => -cmp(x, y));
}

/**
 * Finds the element with the minimum value according to a mapped numeric
 * value.
 *
 * - If the array is non-empty, returns the element with the minimum mapped
 *   value.
 * - If the array is empty, returns `Optional.none`.
 * - You can provide a custom comparator for the mapped values.
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
 * @returns The element with the minimum mapped value wrapped in Optional.
 */
export function minBy<const Ar extends readonly unknown[]>(
  array: Ar,
  // If the array elements are mapped to numbers, comparator is optional.
  comparatorValueMapper: (value: Ar[number]) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function minBy<const Ar extends readonly unknown[], V>(
  array: Ar,
  comparatorValueMapper: (value: Ar[number]) => V,
  comparator: (x: V, y: V) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function minBy<E, V>(
  array: readonly E[],
  comparatorValueMapper: (value: E) => V,
  comparator?: (x: V, y: V) => number,
): Optional<E> {
  return min(array, (x, y) =>
    comparator === undefined
      ? Num.from(comparatorValueMapper(x)) - Num.from(comparatorValueMapper(y))
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Finds the element with the maximum value according to a mapped numeric
 * value.
 *
 * - If the array is non-empty, returns the element with the maximum mapped
 *   value.
 * - If the array is empty, returns `Optional.none`.
 * - You can provide a custom comparator for the mapped values.
 *
 * @example
 *
 * ```ts
 * const words = ['Ada', 'Grace', 'Linus'] as const;
 *
 * const longWords = Arr.count(words, (word) => word.length > 4);
 * const withCurried = Arr.count<string>((word) => word.includes('a'))(words);
 *
 * assert(longWords === 2);
 * assert(withCurried === 2);
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
export function maxBy<const Ar extends readonly unknown[]>(
  array: Ar,
  // If the array elements are mapped to numbers, comparator is optional.
  comparatorValueMapper: (value: Ar[number]) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function maxBy<const Ar extends readonly unknown[], V>(
  array: Ar,
  comparatorValueMapper: (value: Ar[number]) => V,
  comparator: (x: V, y: V) => number,
): Ar extends NonEmptyArray<unknown>
  ? Optional.Some<Ar[number]>
  : Optional<Ar[number]>;

export function maxBy<E, V>(
  array: readonly E[],
  comparatorValueMapper: (value: E) => V,
  comparator?: (x: V, y: V) => number,
): Optional<E> {
  return max(array, (x, y) =>
    comparator === undefined
      ? Num.from(comparatorValueMapper(x)) - Num.from(comparatorValueMapper(y))
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Counts the number of elements in an array that satisfy a predicate.
 *
 * @example
 *
 * ```ts
 * const numbers = [1, 2, 3, 4] as const;
 * const negatives = [3, -2, 5] as const;
 *
 * const total = Arr.sum(numbers);
 * const totalNegatives = Arr.sum(negatives);
 *
 * assert(total === 10);
 * assert(totalNegatives === 6);
 * ```
 *
 * @template E The type of elements in the array.
 * @param array The input array.
 * @param predicate A function `(value: A, index: number) => boolean` to test
 *   each element for a condition.
 * @returns The number of elements that satisfy the predicate.
 */
export function count<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (value: Ar[number], index: ArrayIndex<Ar>) => boolean,
): SizeType.Arr;

export function count<E>(
  predicate: (value: E, index: SizeType.Arr) => boolean,
): (array: readonly E[]) => SizeType.Arr;

export function count<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (value: E, index: SizeType.Arr) => boolean,
      ]
    | readonly [predicate: (value: E, index: SizeType.Arr) => boolean]
): SizeType.Arr | ((array: readonly E[]) => SizeType.Arr) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return array.reduce<Uint32>(
        (acc, curr, index) =>
          predicate(curr, asUint32(index)) ? Uint32.add(acc, 1) : acc,
        asUint32(0),
      );
    }
    case 1: {
      const [predicate] = args;
      return (array) => count(array, predicate);
    }
  }
}

/**
 * Groups elements of an array by a key derived from each element and counts
 * the elements in each group.
 *
 * @template E The type of elements in the array.
 * @template G The type of the group key (must be a primitive type: `string`,
 *   `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`).
 * @param array The input array.
 * @param grouper A function `(value: A, index: number) => G` that maps an
 *   element and its index to a group key.
 * @returns An `IMap` where keys are group keys and values are the counts of
 *   elements in each group.
 */
export function countBy<
  const Ar extends readonly unknown[],
  G extends MapSetKeyType,
>(
  array: Ar,
  grouper: (value: Ar[number], index: ArrayIndex<Ar>) => G,
): IMap<G, ArrayIndex<Ar>>;

export function countBy<E, G extends MapSetKeyType>(
  grouper: (value: E, index: SizeType.Arr) => G,
): (array: readonly E[]) => IMap<G, SizeType.Arr>;

export function countBy<E, G extends MapSetKeyType>(
  ...args:
    | readonly [
        array: readonly E[],
        grouper: (value: E, index: SizeType.Arr) => G,
      ]
    | readonly [grouper: (value: E, index: SizeType.Arr) => G]
): IMap<G, SizeType.Arr> | ((array: readonly E[]) => IMap<G, SizeType.Arr>) {
  switch (args.length) {
    case 2: {
      const [array, grouper] = args;
      const mut_groups = new Map<G, SizeType.Arr>();

      for (const [index, e] of array.entries()) {
        const key = grouper(e, asUint32(index));
        const curr = mut_groups.get(key) ?? 0;

        mut_groups.set(key, asUint32(curr + 1));
      }

      return IMap.create(mut_groups);
    }
    case 1: {
      const [grouper] = args;
      return (array) => countBy(array, grouper);
    }
  }
}

/**
 * Applies a function against an accumulator and each element in the array
 * (from left to right) to reduce it to a single value. This is an alias for
 * `Array.prototype.reduce`.
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
export function foldl<const Ar extends readonly unknown[], P>(
  array: Ar,
  callbackfn: (
    previousValue: P,
    currentValue: Ar[number],
    currentIndex: ArrayIndex<Ar>,
  ) => P,
  initialValue: P,
): P;

export function foldl<E, P>(
  callbackfn: (
    previousValue: P,
    currentValue: E,
    currentIndex: SizeType.Arr,
  ) => P,
  initialValue: P,
): (array: readonly E[]) => P;

export function foldl<E, P>(
  ...args:
    | readonly [
        array: readonly E[],
        callbackfn: (
          previousValue: P,
          currentValue: E,
          currentIndex: SizeType.Arr,
        ) => P,
        initialValue: P,
      ]
    | readonly [
        callbackfn: (
          previousValue: P,
          currentValue: E,
          currentIndex: SizeType.Arr,
        ) => P,
        initialValue: P,
      ]
): P | ((array: readonly E[]) => P) {
  switch (args.length) {
    case 3: {
      const [array, callbackfn, initialValue] = args;
      return array.reduce(
        (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
        initialValue,
      );
    }
    case 2: {
      const [callbackfn, initialValue] = args;
      return (array) => foldl(array, callbackfn, initialValue);
    }
  }
}

/**
 * Applies a function against an accumulator and each element in the array
 * (from right to left) to reduce it to a single value. This is an alias for
 * `Array.prototype.reduceRight`.
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
 * @template E The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param array The input array.
 * @param callbackfn A function to execute on each element in the array:
 *   `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
 * @param initialValue The initial value of the accumulator.
 * @returns The single value that results from the reduction.
 */
export function foldr<const Ar extends readonly unknown[], P>(
  array: Ar,
  callbackfn: (
    previousValue: P,
    currentValue: Ar[number],
    currentIndex: ArrayIndex<Ar>,
  ) => P,
  initialValue: P,
): P;

export function foldr<E, P>(
  callbackfn: (
    previousValue: P,
    currentValue: E,
    currentIndex: SizeType.Arr,
  ) => P,
  initialValue: P,
): (array: readonly E[]) => P;

export function foldr<E, P>(
  ...args:
    | readonly [
        array: readonly E[],
        callbackfn: (
          previousValue: P,
          currentValue: E,
          currentIndex: SizeType.Arr,
        ) => P,
        initialValue: P,
      ]
    | readonly [
        callbackfn: (
          previousValue: P,
          currentValue: E,
          currentIndex: SizeType.Arr,
        ) => P,
        initialValue: P,
      ]
): P | ((array: readonly E[]) => P) {
  switch (args.length) {
    case 3: {
      const [array, callbackfn, initialValue] = args;
      return array.reduceRight(
        (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
        initialValue,
      );
    }
    case 2: {
      const [callbackfn, initialValue] = args;
      return (array) => foldr(array, callbackfn, initialValue);
    }
  }
}

/**
 * Calculates the sum of numbers in an array.
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
 * @param array The input array of numbers.
 * @returns The sum of the numbers. Returns 0 for an empty array.
 */
export function sum(array: readonly []): 0;

export function sum<N extends number>(array: readonly [N]): N;

export function sum(array: readonly Uint[]): Uint;

export function sum(array: readonly Int[]): Int;

export function sum(array: readonly number[]): number;

export function sum(array: readonly number[]): number {
  return array.reduce((prev, curr) => prev + curr, 0);
}

/**
 * Joins array elements into a string.
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
 * @param array The array to join.
 * @param separator The separator string.
 * @returns Result.Ok with the joined string, Result.Err if the operation
 *   throws.
 */
export function join<E>(
  array: readonly E[],
  separator?: string,
): Result<string, Error>;

export function join(
  separator?: string,
): <E>(array: readonly E[]) => Result<string, Error>;

export function join<E>(
  ...args:
    | readonly [array: readonly E[], separator?: string]
    | readonly [separator?: string]
): Result<string, Error> | ((array: readonly E[]) => Result<string, Error>) {
  switch (args.length) {
    case 0:
      return (array) => joinImpl(array, undefined);

    case 1: {
      const [arg] = args;
      if (isString(arg) || isUndefined(arg)) {
        return (array) => joinImpl(array, arg);
      }
      return joinImpl(arg, undefined);
    }
    case 2: {
      const [array, separator] = args;
      return joinImpl(array, separator);
    }
  }
}

const joinImpl = <E,>(
  array: readonly E[],
  separator: string | undefined,
): Result<string, Error> => {
  try {
    const result = array.join(separator);
    return Result.ok(result);
  } catch (error) {
    return Result.err(
      Error.isError(error) ? error : new Error(unknownToString(error)),
    );
  }
};

/**
 * Alias for `foldl`. Applies a function against an accumulator and each
 * element in the array (from left to right) to reduce it to a single value.
 *
 * @see {@link foldl}
 */
export const reduce = foldl;

/**
 * Alias for `foldr`. Applies a function against an accumulator and each
 * element in the array (from right to left) to reduce it to a single value.
 *
 * @see {@link foldr}
 */
export const reduceRight = foldr;
