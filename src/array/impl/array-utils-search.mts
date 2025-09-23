import { expectType } from '../../expect-type.mjs';
import { Optional, pipe } from '../../functional/index.mjs';
import { asUint32 } from '../../number/index.mjs';

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
 * const numbers = [1, 3, 2, 4, 5];
 *
 * const lastEven = Arr.findLast(numbers, (n) => n % 2 === 0);
 * const none = Arr.findLast<number>((n) => n > 10)(numbers);
 *
 * assert.deepStrictEqual(lastEven, Optional.some(4));
 * assert.deepStrictEqual(none, Optional.none);
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
export function find<E, F extends E>(
  array: readonly E[],
  predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => value is F,
): Optional<F>;

export function find<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
): Optional<Ar[number]>;

export function find<E>(
  predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
): (array: readonly E[]) => Optional<E>;

export function find<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
    | readonly [
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
): Optional<E> | ((array: readonly E[]) => Optional<E>) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      const foundIndex = array.findIndex(
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        predicate as () => boolean,
      );

      expectType<
        Parameters<typeof array.findIndex>[0],
        (value: E, index: number, arr: readonly E[]) => unknown
      >('=');

      expectType<
        typeof predicate,
        (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
      >('=');

      return foundIndex === -1
        ? Optional.none
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Optional.some(array[foundIndex]!);
    }
    case 1: {
      const [predicate] = args;

      expectType<
        typeof predicate,
        (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
      >('=');

      return (array) => find(array, predicate);
    }
  }
}

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
 * const letters = ['a', 'b', 'c'];
 *
 * const indexOfB = Arr.findIndex(letters, (letter) => letter === 'b');
 * // eslint-disable-next-line unicorn/prefer-array-index-of
 * const indexOfMissing = Arr.findIndex<string>((letter) => letter === 'z')(
 *   letters,
 * );
 *
 * assert(indexOfB === 1);
 * assert(indexOfMissing === -1);
 * ```
 *
 * @template Ar The exact type of the input array.
 * @template E The type of elements in the array.
 * @param array The array to search.
 * @param predicate A function that tests each element.
 * @returns An Optional containing the found element, or None if no element
 *   satisfies the predicate.
 */
export function findLast<E, F extends E>(
  array: readonly E[],
  predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => value is F,
): Optional<F>;

export function findLast<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
): Optional<Ar[number]>;

export function findLast<E>(
  predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
): (array: readonly E[]) => Optional<E>;

export function findLast<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
    | readonly [
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
): Optional<E> | ((array: readonly E[]) => Optional<E>) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      const foundIndex = array.findLastIndex(
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        predicate as () => boolean,
      );

      expectType<
        Parameters<typeof array.findIndex>[0],
        (value: E, index: number, arr: readonly E[]) => unknown
      >('=');

      expectType<
        typeof predicate,
        (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
      >('=');

      return foundIndex === -1
        ? Optional.none
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Optional.some(array[foundIndex]!);
    }
    case 1: {
      const [predicate] = args;

      expectType<
        typeof predicate,
        (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
      >('=');

      return (array) => findLast(array, predicate);
    }
  }
}

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
 * const letters = ['a', 'b', 'c', 'b'];
 *
 * const lastIndexOfB = Arr.findLastIndex(letters, (letter) => letter === 'b');
 * // eslint-disable-next-line unicorn/prefer-array-index-of
 * const notFound = Arr.findLastIndex<string>((letter) => letter === 'z')(letters);
 *
 * assert(lastIndexOfB === 3);
 * assert(notFound === -1);
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
export function findIndex<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
): ArrayIndex<Ar> | -1;

export function findIndex<E>(
  predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
): (array: readonly E[]) => SizeType.Arr | -1;

export function findIndex<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
    | readonly [
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return pipe(
        array.findIndex(
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          predicate as (value: E, index: number) => boolean,
        ),
      ).map((idx) => (idx >= 0 ? asUint32(idx) : -1)).value;
    }
    case 1: {
      const [predicate] = args;
      return (array) => findIndex(array, predicate);
    }
  }
}

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
export function findLastIndex<const Ar extends readonly unknown[]>(
  array: Ar,
  predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
): ArrayIndex<Ar> | -1;

export function findLastIndex<E>(
  predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
): (array: readonly E[]) => SizeType.Arr | -1;

export function findLastIndex<E>(
  ...args:
    | readonly [
        array: readonly E[],
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
    | readonly [
        predicate: (
          value: E,
          index: SizeType.Arr,
          arr: readonly E[],
        ) => boolean,
      ]
): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
  switch (args.length) {
    case 2: {
      const [array, predicate] = args;
      return pipe(
        array.findLastIndex(
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          predicate as (value: E, index: number) => boolean,
        ),
      ).map((idx) => (idx >= 0 ? asUint32(idx) : -1)).value;
    }
    case 1: {
      const [predicate] = args;
      return (array) => findLastIndex(array, predicate);
    }
  }
}

/**
 * Gets the index of a value in an array.
 *
 * @param array The array to search.
 * @param searchElement The element to search for.
 * @param fromIndex The index to start searching from.
 * @returns The index if found, -1 otherwise.
 */
export function indexOf<const Ar extends readonly unknown[]>(
  array: Ar,
  searchElement: Ar[number],
): ArrayIndex<Ar> | -1;

export function indexOf<E>(
  searchElement: E,
): (array: readonly E[]) => SizeType.Arr | -1;

export function indexOf<E>(
  ...args:
    | readonly [array: readonly E[], searchElement: E]
    | readonly [searchElement: E]
): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
  switch (args.length) {
    case 2: {
      const [array, searchElement] = args;

      const index = array.indexOf(searchElement);
      return index !== -1 ? asUint32(index) : -1;
    }
    case 1: {
      const [searchElement] = args;
      return (array) => indexOf(array, searchElement);
    }
  }
}

export function indexOfFrom<const Ar extends readonly unknown[]>(
  array: Ar,
  searchElement: Ar[number],
  fromIndex: ArgArrayIndexWithNegative<Ar>,
): ArrayIndex<Ar> | -1;

export function indexOfFrom<E>(
  searchElement: E,
  fromIndex: SizeType.ArgArrWithNegative,
): (array: readonly E[]) => SizeType.Arr | -1;

export function indexOfFrom<E>(
  ...args:
    | readonly [
        array: readonly E[],
        searchElement: E,
        fromIndex: SizeType.ArgArrWithNegative,
      ]
    | readonly [searchElement: E, fromIndex: SizeType.ArgArrWithNegative]
): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
  switch (args.length) {
    case 3: {
      const [array, searchElement, fromIndex] = args;
      const index = array.indexOf(searchElement, fromIndex);
      return index !== -1 ? asUint32(index) : -1;
    }
    case 2: {
      const [searchElement, fromIndex] = args;
      return (array) => indexOfFrom(array, searchElement, fromIndex);
    }
  }
}

/**
 * Gets the last index of a value in an array.
 *
 * @param array The array to search.
 * @param searchElement The element to search for.
 * @param fromIndex The index to start searching from (searches backwards).
 * @returns Optional.Some with the index if found, Optional.None otherwise.
 */
export function lastIndexOf<const Ar extends readonly unknown[]>(
  array: Ar,
  searchElement: Ar[number],
): ArrayIndex<Ar> | -1;

export function lastIndexOf<E>(
  searchElement: E,
): (array: readonly E[]) => SizeType.Arr | -1;

export function lastIndexOf<E>(
  ...args:
    | readonly [array: readonly E[], searchElement: E]
    | readonly [searchElement: E]
): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
  switch (args.length) {
    case 2: {
      const [array, searchElement] = args;
      const index = array.lastIndexOf(searchElement);
      return index !== -1 ? asUint32(index) : -1;
    }
    case 1: {
      const [searchElement] = args;
      return (array) => lastIndexOf(array, searchElement);
    }
  }
}

export function lastIndexOfFrom<const Ar extends readonly unknown[]>(
  array: Ar,
  searchElement: Ar[number],
  fromIndex: ArgArrayIndexWithNegative<Ar>,
): ArrayIndex<Ar> | -1;

export function lastIndexOfFrom<E>(
  searchElement: E,
  fromIndex: SizeType.ArgArrWithNegative,
): (array: readonly E[]) => SizeType.Arr | -1;

export function lastIndexOfFrom<E>(
  ...args:
    | readonly [
        array: readonly E[],
        searchElement: E,
        fromIndex: SizeType.ArgArrWithNegative,
      ]
    | readonly [searchElement: E, fromIndex: SizeType.ArgArrWithNegative]
): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
  switch (args.length) {
    case 3: {
      const [array, searchElement, fromIndex] = args;

      const index = array.lastIndexOf(searchElement, fromIndex);

      return index !== -1 ? asUint32(index) : -1;
    }
    case 2: {
      const [searchElement, fromIndex] = args;
      return (array) => lastIndexOfFrom(array, searchElement, fromIndex);
    }
  }
}
