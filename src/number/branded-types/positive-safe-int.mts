import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveSafeInt;

const typeNameInMessage = 'a positive safe integer';

const {
  MIN_VALUE,
  MAX_VALUE,
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
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: 1,
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a PositiveSafeInt (a positive safe integer in the range [1, MAX_SAFE_INTEGER]).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveSafeInt, `false` otherwise.
 */
export const isPositiveSafeInt = is;

/**
 * Casts a number to a PositiveSafeInt type.
 * @param value The value to cast.
 * @returns The value as a PositiveSafeInt type.
 * @throws {TypeError} If the value is not a positive safe integer.
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-safe-int/aspositivesafeint-example-1.mts|Sample code}.
 */
export const asPositiveSafeInt = castType;

/**
 * Namespace providing type-safe arithmetic operations for positive safe integers.
 *
 * All operations automatically clamp results to the positive safe integer range [1, MAX_SAFE_INTEGER].
 * This ensures that all arithmetic maintains both the positive constraint and IEEE 754 precision guarantees,
 * preventing precision loss and ensuring results are always positive.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/number/branded-types/positive-safe-int/positivesafeint-example-1.mts|Sample code}.
 */
export const PositiveSafeInt = {
  /**
   * Type guard to check if a value is a PositiveSafeInt.
   * @param value The value to check.
   * @returns `true` if the value is a positive safe integer, `false` otherwise.
   */
  is,

  /**
   * The minimum value for a positive safe integer.
   * @readonly
   */
  MIN_VALUE,

  /**
   * The maximum safe integer value (2^53 - 1).
   * @readonly
   */
  MAX_VALUE,

  /**
   * Returns the smaller of two PositiveSafeInt values.
   * @param a The first PositiveSafeInt.
   * @param b The second PositiveSafeInt.
   * @returns The minimum value as a PositiveSafeInt.
   */
  min: min_,

  /**
   * Returns the larger of two PositiveSafeInt values.
   * @param a The first PositiveSafeInt.
   * @param b The second PositiveSafeInt.
   * @returns The maximum value as a PositiveSafeInt.
   */
  max: max_,

  /**
   * Clamps a number to the positive safe integer range.
   * @param value The number to clamp.
   * @returns The value clamped to [1, MAX_SAFE_INTEGER] as a PositiveSafeInt.
   */
  clamp,

  /**
   * Generates a random PositiveSafeInt value within the valid range.
   * @returns A random PositiveSafeInt between 1 and MAX_SAFE_INTEGER.
   */
  random,

  /**
   * Raises a PositiveSafeInt to the power of another PositiveSafeInt.
   * @param a The base PositiveSafeInt.
   * @param b The exponent PositiveSafeInt.
   * @returns `a ** b` clamped to [1, MAX_SAFE_INTEGER] as a PositiveSafeInt.
   */
  pow,

  /**
   * Adds two PositiveSafeInt values.
   * @param a The first PositiveSafeInt.
   * @param b The second PositiveSafeInt.
   * @returns `a + b` clamped to [1, MAX_SAFE_INTEGER] as a PositiveSafeInt.
   */
  add,

  /**
   * Subtracts one PositiveSafeInt from another.
   * @param a The minuend PositiveSafeInt.
   * @param b The subtrahend PositiveSafeInt.
   * @returns `a - b` clamped to [1, MAX_SAFE_INTEGER] as a PositiveSafeInt (minimum 1).
   */
  sub,

  /**
   * Multiplies two PositiveSafeInt values.
   * @param a The first PositiveSafeInt.
   * @param b The second PositiveSafeInt.
   * @returns `a * b` clamped to [1, MAX_SAFE_INTEGER] as a PositiveSafeInt.
   */
  mul,

  /**
   * Divides one PositiveSafeInt by another using floor division.
   * @param a The dividend PositiveSafeInt.
   * @param b The divisor PositiveSafeInt.
   * @returns `⌊a / b⌋` clamped to [1, MAX_SAFE_INTEGER] as a PositiveSafeInt.
   */
  div,
} as const;

expectType<
  keyof typeof PositiveSafeInt,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'positive' | 'range'
  >
>('=');

expectType<
  typeof PositiveSafeInt,
  TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'positive' | 'range'
  >
>('<=');
