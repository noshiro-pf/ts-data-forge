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
export const size = <const Ar extends readonly unknown[]>(
  array: Ar,
): Ar extends NonEmptyArray<unknown>
  ? IntersectBrand<PositiveNumber, SizeType.Arr>
  : SizeType.Arr =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  array.length as never;

/**
 * Alias for `size`. Returns the length of an array.
 *
 * @see {@link size}
 */
export const length = size;
