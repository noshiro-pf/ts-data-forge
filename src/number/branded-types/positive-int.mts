import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveInt;

const typeNameInMessage = 'a positive integer';

const {
  MIN_VALUE,
  min: min_,
  max: max_,
  pow,
  add,
  sub,
  mul,
  div,
  random,
  is,
  castType,
  clamp,
} = TsDataForgeInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  1,
  number
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: 1,
  MAX_VALUE: Number.MAX_VALUE,
  typeNameInMessage,
} as const);

/**
 * Type guard that checks if a value is a positive integer.
 *
 * A positive integer is any integer greater than zero (>= 1).
 * This excludes zero, negative numbers, and non-integers.
 *
 * @param value - The value to check
 * @returns `true` if the value is a positive integer, `false` otherwise
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/ispositiveint-example-1.mts|Sample code}.
 */
export const isPositiveInt = is;

/**
 * Casts a number to a PositiveInt branded type.
 *
 * This function validates that the input is a positive integer (>= 1)
 * and returns it with the PositiveInt brand. This ensures type safety
 * for operations that require strictly positive integer values.
 *
 * @param value - The value to cast
 * @returns The value as a PositiveInt branded type
 * @throws {TypeError} If the value is not a positive integer
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/aspositiveint-example-1.mts|Sample code}.
 */
export const asPositiveInt = castType;

/**
 * Namespace providing type-safe operations for PositiveInt branded types.
 *
 * PositiveInt represents integers that are strictly greater than zero (>= 1).
 * All operations automatically clamp results to maintain the positive constraint,
 * ensuring that arithmetic operations never produce zero or negative values.
 *
 * This type is essential for:
 * - Array lengths and sizes (length >= 1)
 * - Counts and quantities that must be positive
 * - Denominators in division operations
 * - Loop counters and iteration counts
 * - Database primary keys and IDs
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positiveint-example-1.mts|Sample code}.
 */
export const PositiveInt = {
  /**
   * Type guard that checks if a value is a positive integer.
   *
   * @param value - The value to check
   * @returns `true` if the value is a positive integer, `false` otherwise
   *
   * @see {@link isPositiveInt} for usage examples
   */
  is,

  /**
   * The minimum value for a PositiveInt.
   * @readonly
   */
  MIN_VALUE,

  /**
   * Returns the minimum value from a list of positive integers.
   *
   * Since all inputs are guaranteed to be >= 1, the result is also guaranteed
   * to be a positive integer.
   *
   * @param values - The positive integers to compare (at least one required)
   * @returns The smallest value as a PositiveInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positiveint-example-2.mts|Sample code 2}.
   */
  min: min_,

  /**
   * Returns the maximum value from a list of positive integers.
   *
   * @param values - The positive integers to compare (at least one required)
   * @returns The largest value as a PositiveInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-1.mts|Sample code}.
   */
  max: max_,

  /**
   * Clamps a number to the positive integer range.
   *
   * Since PositiveInt has a minimum value of 1, this function ensures
   * that any input less than 1 is clamped to 1.
   *
   * @param value - The number to clamp
   * @returns The value clamped to >= 1 as a PositiveInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-2.mts|Sample code 2}.
   */
  clamp,

  /**
   * Generates a random positive integer within the specified range (inclusive).
   *
   * Both bounds are inclusive, and both min and max must be positive integers.
   * If min > max, they are automatically swapped.
   *
   * @param min - The minimum value (inclusive, must be >= 1)
   * @param max - The maximum value (inclusive, must be >= min)
   * @returns A random PositiveInt in the range [min, max]
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-3.mts|Sample code 3}.
   */
  random,

  /**
   * Raises a positive integer to a power, ensuring the result is never less than 1.
   * @param a - The base positive integer
   * @param b - The exponent positive integer
   * @returns `a ** b` as a PositiveInt, but never less than 1
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-4.mts|Sample code 4}.
   */
  pow,

  /**
   * Adds two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a + b` as a PositiveInt, but never less than 1
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-5.mts|Sample code 5}.
   */
  add,

  /**
   * Subtracts two positive integers, clamping the result to remain positive.
   *
   * If the mathematical result would be <= 0, it is clamped to 1 to maintain
   * the positive integer constraint.
   *
   * @param a - The minuend (positive integer)
   * @param b - The subtrahend (positive integer)
   * @returns `max(1, a - b)` as a PositiveInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-6.mts|Sample code 6}.
   */
  sub,

  /**
   * Multiplies two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a * b` as a PositiveInt, but never less than 1
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-7.mts|Sample code 7}.
   */
  mul,

  /**
   * Divides two positive integers using floor division, clamping to remain positive.
   *
   * Performs mathematical floor division: `⌊a / b⌋`. If the result would be 0
   * (when a < b), it is clamped to 1 to maintain the positive integer constraint.
   *
   * @param a - The dividend (positive integer)
   * @param b - The divisor (positive integer, guaranteed non-zero)
   * @returns `max(1, ⌊a / b⌋)` as a PositiveInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-int/positive-int-example-8.mts|Sample code 8}.
   */
  div,
} as const;

expectType<
  keyof typeof PositiveInt,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'positive'
  >
>('=');

expectType<
  typeof PositiveInt,
  TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'positive'
  >
>('<=');
