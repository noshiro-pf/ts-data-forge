import { Num } from '../../number/index.mjs';

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
 * {
 *   const scientists = ['Ada', 'Grace', 'Katherine'] as const;
 *   const remainder = Arr.tail(scientists);
 *
 *   assert.deepStrictEqual(remainder, ['Grace', 'Katherine']);
 *   assert(remainder.length === 2);
 * }
 * {
 *   const values = [1, 2, 3] as const;
 *
 *   const remainder = Arr.rest(values);
 *   const emptyRemainder = Arr.rest([1] as const);
 *
 *   assert.deepStrictEqual(remainder, [2, 3] as const);
 *   assert.deepStrictEqual(emptyRemainder, [] as const);
 * }
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
export function sliceClamped<const Ar extends readonly unknown[]>(
  array: Ar,
  start: ArgArrayIndexWithNegative<Ar>,
  end: ArgArrayIndexWithNegative<Ar>,
): readonly Ar[number][];

export function sliceClamped(
  start: SizeType.ArgArrWithNegative,
  end: SizeType.ArgArrWithNegative,
): <E>(array: readonly E[]) => readonly E[];

export function sliceClamped<E>(
  ...args:
    | readonly [
        readonly E[],
        SizeType.ArgArrWithNegative,
        SizeType.ArgArrWithNegative,
      ]
    | readonly [SizeType.ArgArrWithNegative, SizeType.ArgArrWithNegative]
): readonly E[] | ((array: readonly E[]) => readonly E[]) {
  switch (args.length) {
    case 3: {
      const [array, start, end] = args;
      const startClamped = Num.clamp(0, array.length)(start);
      // Ensure endClamped is not less than startClamped.
      const endClamped = Num.clamp(startClamped, array.length)(end);
      return array.slice(startClamped, endClamped);
    }
    case 2: {
      const [start, end] = args;
      return (array) => sliceClamped(array, start, end);
    }
  }
}
