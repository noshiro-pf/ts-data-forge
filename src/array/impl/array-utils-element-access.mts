import { Optional, pipe } from '../../functional/index.mjs';

/**
 * Safely retrieves an element at a given index from an array, returning an
 * {@link Optional}.
 *
 * This function provides type-safe array access with support for negative
 * indexing (e.g., -1 for the last element). Unlike direct array access which
 * can return `undefined` for out-of-bounds indices, this function always
 * returns a well-typed {@link Optional} that explicitly represents the
 * possibility of absence.
 *
 * **Negative Indexing:** Negative indices count from the end of the array:
 *
 * - `-1` refers to the last element
 * - `-2` refers to the second-to-last element, etc.
 *
 * **Curried Usage:** This function supports currying - when called with only
 * an index, it returns a function that can be applied to arrays, making it
 * ideal for use in pipe operations.
 *
 * **Optional Return Type:** The return type is always {@link Optional}<E>
 * which provides:
 *
 * - Type-safe access without `undefined` in your business logic
 * - Explicit handling of "not found" cases
 * - Composable error handling with {@link Optional} utilities
 *
 * @example
 *
 * ```ts
 * const users = [{ id: 1 }, { id: 2 }];
 * const empty: { id: number }[] = [];
 *
 * const first = Arr.head(users);
 * const none = Arr.head(empty);
 *
 * assert.deepStrictEqual(first, Optional.some({ id: 1 }));
 * assert.deepStrictEqual(none, Optional.none);
 * ```
 *
 * @template E The type of elements in the array.
 * @param array The array to access (when using direct call syntax).
 * @param index The index to access. Must be a branded `SizeType.ArgArr` (safe
 *   integer). Can be:
 *
 *   - **Positive integer:** 0-based index from the start (0, 1, 2, ...)
 *   - **Negative integer:** index from the end (-1 is last element, -2 is
 *       second-to-last, etc.)
 *   - **Out of bounds:** any index beyond array bounds returns
 *       {@link Optional.None}
 *
 * @returns An {@link Optional}<E> containing:
 *
 *   - {@link Optional.Some}<E> with the element if the index is valid
 *   - {@link Optional.None} if the index is out of bounds (including empty arrays)
 *
 * @see {@link head} for getting the first element specifically
 * @see {@link last} for getting the last element specifically
 * @see {@link Optional} for working with the returned Optional values
 * @see {@link Optional.unwrapOr} for safe unwrapping with defaults
 * @see {@link Optional.map} for transforming Optional values
 */
export function at<const Ar extends readonly unknown[]>(
  array: Ar,
  index: ArgArrayIndexWithNegative<Ar>,
): Optional<Ar[number]>;

// Curried version

export function at(
  index: SizeType.ArgArrWithNegative,
): <E>(array: readonly E[]) => Optional<E>;

export function at<E>(
  ...args:
    | readonly [array: readonly E[], index: SizeType.ArgArrWithNegative]
    | readonly [index: SizeType.ArgArrWithNegative]
): Optional<E> | ((array: readonly E[]) => Optional<E>) {
  switch (args.length) {
    case 2: {
      const [array, index] = args;
      return pipe(index < 0 ? array.length + index : index).map(
        (normalizedIndex) =>
          normalizedIndex < 0 || normalizedIndex >= array.length
            ? Optional.none
            : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              Optional.some(array[normalizedIndex]!),
      ).value;
    }
    case 1: {
      const [index] = args;
      return (array) => at(array, index);
    }
  }
}

export const head = <const Ar extends readonly unknown[]>(
  array: Ar,
): Ar extends readonly []
  ? Optional.None
  : Ar extends readonly [infer E, ...unknown[]]
    ? Optional.Some<E>
    : Ar extends NonEmptyArray<infer E>
      ? Optional.Some<E>
      : Optional<Ar[number]> =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  (array.length === 0 ? Optional.none : Optional.some(array.at(0))) as never;

export const last = <const Ar extends readonly unknown[]>(
  array: Ar,
): Ar extends readonly []
  ? Optional.None
  : Ar extends readonly [...unknown[], infer E]
    ? Optional.Some<E>
    : Ar extends NonEmptyArray<infer E>
      ? Optional.Some<E>
      : Optional<Ar[number]> =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  (array.length === 0 ? Optional.none : Optional.some(array.at(-1))) as never;

export const first = head;
