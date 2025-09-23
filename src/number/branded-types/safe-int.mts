import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

type ElementType = SafeInt;

const typeNameInMessage = 'a safe integer';

const {
  MIN_VALUE,
  MAX_VALUE,
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
  clamp,
} = TsDataForgeInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  SafeInt,
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  MIN_VALUE: Number.MIN_SAFE_INTEGER as SafeInt,
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Type guard that checks if a value is a safe integer.
 *
 * A safe integer is an integer that can be exactly represented in JavaScript
 * without precision loss. The range is [±(2^53 - 1)].
 *
 * @param value - The value to check
 * @returns `true` if the value is a safe integer, `false` otherwise
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/is-safe-int-example.mts|Sample code}.
 */
export const isSafeInt = is;

/**
 * Casts a number to a SafeInt branded type.
 *
 * This function validates that the input is a safe integer (within ±(2^53 - 1))
 * and returns it with the SafeInt brand. This ensures type safety for operations
 * that require precise integer arithmetic.
 *
 * @param value - The value to cast
 * @returns The value as a SafeInt branded type
 * @throws {TypeError} If the value is not a safe integer
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/as-safe-int-example.mts|Sample code}.
 */
export const asSafeInt = castType;

/**
 * Namespace providing type-safe operations for SafeInt branded types.
 *
 * SafeInt represents integers that can be exactly represented in JavaScript's
 * number type without precision loss. The range is [±(2^53 - 1)], which covers
 * approximately ±9 quadrillion.
 *
 * All operations automatically clamp results to stay within the safe range,
 * preventing precision loss that occurs with larger integers. This makes SafeInt
 * ideal for:
 * - Financial calculations requiring exact cents
 * - Database IDs and counters
 * - Array indices and sizes
 * - Any integer arithmetic requiring precision guarantees
 *
 */
export const SafeInt = {
  /**
   * Type guard that checks if a value is a safe integer.
   *
   * @param value - The value to check
   * @returns `true` if the value is a safe integer, `false` otherwise
   *
   * @see {@link isSafeInt} for usage examples
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/is-safe-int-example.mts|Sample code}.
   */
  is,

  /**
   * The minimum safe integer value (-(2^53 - 1)).
   * @readonly
   */
  MIN_VALUE,

  /**
   * The maximum safe integer value (2^53 - 1).
   * @readonly
   */
  MAX_VALUE,

  /**
   * Returns the absolute value of a safe integer.
   *
   * Note: `Math.abs(MIN_SAFE_INTEGER)` would exceed `MAX_SAFE_INTEGER`,
   * so this function clamps the result to maintain the safe integer guarantee.
   *
   * @param a - The safe integer value
   * @returns The absolute value as a SafeInt, clamped if necessary
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/abs-example.mts|Sample code}.
   */
  abs,

  /**
   * Returns the minimum value from a list of safe integers.
   *
   * @param values - The safe integers to compare (at least one required)
   * @returns The smallest value as a SafeInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/min-example.mts|Sample code}.
   */
  min: min_,

  /**
   * Returns the maximum value from a list of safe integers.
   *
   * @param values - The safe integers to compare (at least one required)
   * @returns The largest value as a SafeInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/max-example.mts|Sample code}.
   */
  max: max_,

  /**
   * Clamps a number to the safe integer range.
   * @param value The number to clamp.
   * @returns The value clamped to [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] as a SafeInt.
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/clamp-example.mts|Sample code}.
   */
  clamp,

  /**
   * Generates a random safe integer within the specified range (inclusive).
   *
   * The range is inclusive on both ends. If min > max, they are automatically swapped.
   *
   * @param min - The minimum value (inclusive)
   * @param max - The maximum value (inclusive)
   * @returns A random SafeInt in the range [min, max]
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/random-example.mts|Sample code}.
   */
  random,

  /**
   * Raises a SafeInt to the power of another SafeInt.
   * @param a The base SafeInt.
   * @param b The exponent SafeInt.
   * @returns `a ** b` clamped to safe integer range as a SafeInt.
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/pow-example.mts|Sample code}.
   */
  pow,

  /**
   * Adds two SafeInt values.
   * @param a The first SafeInt.
   * @param b The second SafeInt.
   * @returns `a + b` clamped to safe integer range as a SafeInt.
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/add-example.mts|Sample code}.
   */
  add,

  /**
   * Subtracts one SafeInt from another.
   * @param a The minuend SafeInt.
   * @param b The subtrahend SafeInt.
   * @returns `a - b` clamped to safe integer range as a SafeInt.
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/sub-example.mts|Sample code}.
   */
  sub,

  /**
   * Multiplies two SafeInt values.
   * @param a The first SafeInt.
   * @param b The second SafeInt.
   * @returns `a * b` clamped to safe integer range as a SafeInt.
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/mul-example.mts|Sample code}.
   */
  mul,

  /**
   * Divides one SafeInt by another using floor division.
   *
   * Performs mathematical floor division: `⌊a / b⌋`.
   * The divisor must be non-zero (enforced by type constraints).
   *
   * @param a - The dividend
   * @param b - The divisor (must be non-zero)
   * @returns The integer quotient as a SafeInt
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/safe-int/div-example.mts|Sample code}.
   */
  div,
} as const;

expectType<
  keyof typeof SafeInt,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'range'
  >
>('=');

expectType<
  typeof SafeInt,
  TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'range'
  >
>('<=');
