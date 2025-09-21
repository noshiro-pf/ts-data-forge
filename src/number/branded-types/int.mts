import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

type ElementType = Int;

const typeNameInMessage = 'an integer';

const {
  abs,
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
} = TsDataForgeInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  number,
  number
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: -Number.MAX_VALUE,
  MAX_VALUE: Number.MAX_VALUE,
  typeNameInMessage,
} as const);

/**
 * Type guard that checks if a value is an integer.
 *
 * Returns `true` if the value is any integer (positive, negative, or zero),
 * with no fractional component. This includes values outside the safe integer
 * range, unlike SafeInt.
 *
 * @param value - The value to check
 * @returns `true` if the value is an integer, `false` otherwise
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/isint-example-1.mts|Sample code}.
 */
export const isInt = is;

/**
 * Casts a number to an Int branded type.
 *
 * This function validates that the input is an integer and returns it with
 * the Int brand. Throws a TypeError if the value has a fractional component
 * or is not a finite number.
 *
 * @param value - The value to cast
 * @returns The value as an Int branded type
 * @throws {TypeError} If the value is not an integer
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/asint-example-1.mts|Sample code}.
 */
export const asInt = castType;

/**
 * Namespace providing type-safe operations for Int branded types.
 *
 * The Int type represents any integer value (no fractional component) without
 * range restrictions. All operations preserve the integer constraint, using
 * floor division for division operations.
 *
 * Unlike SafeInt, Int allows values outside the safe integer range
 * (±2^53 - 1), but be aware that very large integers may lose precision
 * in JavaScript's number type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-1.mts|Sample code}.
 */
export const Int = {
  /**
   * Type guard that checks if a value is an integer.
   *
   * @param value - The value to check
   * @returns `true` if the value is an integer, `false` otherwise
   *
   * @see {@link isInt} for usage examples
   */
  is,

  /**
   * Returns the absolute value of an integer.
   *
   * The result is always non-negative and maintains the Int brand.
   * Note that Math.abs(Number.MIN_SAFE_INTEGER) exceeds Number.MAX_SAFE_INTEGER,
   * so use SafeInt for guaranteed precision.
   *
   * @param a - The integer value
   * @returns The absolute value as a non-negative Int
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-2.mts|Sample code 2}.
   */
  abs,

  /**
   * Returns the minimum value from a list of integers.
   *
   * @param values - The integers to compare (at least one required)
   * @returns The smallest value as an Int
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-3.mts|Sample code 3}.
   */
  min: min_,

  /**
   * Returns the maximum value from a list of integers.
   *
   * @param values - The integers to compare (at least one required)
   * @returns The largest value as an Int
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-4.mts|Sample code 4}.
   */
  max: max_,

  /**
   * Generates a random integer within the specified range (inclusive).
   *
   * The range is inclusive on both ends, so random(1, 6) can return
   * any of: 1, 2, 3, 4, 5, or 6.
   *
   * @param min - The minimum value (inclusive)
   * @param max - The maximum value (inclusive)
   * @returns A random Int in the range [min, max]
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-5.mts|Sample code 5}.
   */
  random,

  /**
   * Raises an integer to a power.
   * @param a - The base integer
   * @param b - The exponent integer
   * @returns `a ** b` as an Int
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-6.mts|Sample code 6}.
   */
  pow,

  /**
   * Adds two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a + b` as an Int
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-7.mts|Sample code 7}.
   */
  add,

  /**
   * Subtracts two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a - b` as an Int
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-8.mts|Sample code 8}.
   */
  sub,

  /**
   * Multiplies two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a * b` as an Int
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-9.mts|Sample code 9}.
   */
  mul,

  /**
   * Divides two integers using floor division.
   *
   * Performs mathematical floor division: `⌊a / b⌋`.
   * The result is always an integer, rounding toward negative infinity.
   *
   * @param a - The dividend
   * @param b - The divisor (must be non-zero)
   * @returns The integer quotient as an Int
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/int/int-example-10.mts|Sample code 10}.
   */
  div,
} as const;

expectType<
  keyof typeof Int,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
>('=');

expectType<
  typeof Int,
  TsDataForgeInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
>('<=');
