import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

type ElementType = Uint32;

const typeNameInMessage = 'a non-negative integer less than 2^32';

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
  0,
  number
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: 0,
  MAX_VALUE: 2 ** 32 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a Uint32 (32-bit unsigned integer in the range [0, 2^32)).
 * @param value The value to check.
 * @returns `true` if the value is a Uint32, `false` otherwise.
 */
export const isUint32 = is;

/**
 * Casts a number to a Uint32 type.
 * @param value The value to cast.
 * @returns The value as a Uint32 type.
 * @throws {TypeError} If the value is not a non-negative integer less than 2^32.
 *
 * @example
 * ```ts
 * const x = asUint32(1000000); // Uint32
 * const y = asUint32(0); // Uint32
 *
 * assert(x === 1000000);
 * assert(y === 0);
 *
 * expect(() => asUint32(-1)).toThrow(TypeError); // Negative value
 * expect(() => asUint32(5000000000)).toThrow(TypeError); // Exceeds range
 * ```
 *
 */
export const asUint32 = castType;

/**
 * Utility functions for working with Uint32 (32-bit unsigned integer) branded types.
 * Provides type-safe operations that ensure results remain within the valid range [0, 2^32).
 * All arithmetic operations are clamped to maintain the Uint32 constraint.
 *
 * @example
 * ```ts
 * // Type checking
 * assert(Uint32.is(1000000));
 * assert(!Uint32.is(-1));
 * assert(!Uint32.is(5000000000)); // exceeds 2^32
 *
 * // Constants
 * assert(Uint32.MIN_VALUE === 0);
 * assert(Uint32.MAX_VALUE === 4294967295); // 2^32 - 1
 *
 * // Arithmetic operations (all results clamped to [0, 2^32))
 * const a = asUint32(1000000);
 * const b = asPositiveUint32(500000);
 *
 * assert(a === 1000000);
 * assert(b === 500000);
 *
 * const sum = Uint32.add(a, b); // Uint32 (1500000)
 * const diff = Uint32.sub(a, b); // Uint32 (500000)
 * const product = Uint32.mul(a, b); // Uint32 (clamped if overflow)
 * const quotient = Uint32.div(a, b); // Uint32 (2)
 * const power = Uint32.pow(asUint32(2), asUint32(10)); // Uint32 (1024)
 *
 * assert(sum === 1500000);
 * assert(diff === 500000);
 * assert(product === Uint32.MAX_VALUE);
 * assert(quotient === 2);
 * assert(power === 1024);
 *
 * // Utility functions
 * const minimum = Uint32.min(a, b); // Uint32 (500000)
 * const maximum = Uint32.max(a, b); // Uint32 (1000000)
 * const clamped = Uint32.clamp(2000000000); // Uint32 (2000000000)
 * const random = Uint32.random(); // Random Uint32
 *
 * assert(minimum === 500000);
 * assert(maximum === 1000000);
 * assert(clamped === 2000000000);
 * assert(random >= 0 && random <= Uint32.MAX_VALUE);
 * ```
 *
 */
export const Uint32 = {
  /**
   * Type guard that checks if a value is a 32-bit unsigned integer.
   * @param value - The value to check
   * @returns `true` if the value is within the range [0, 2^32), `false` otherwise
   */
  is,

  /**
   * The minimum value for a Uint32.
   * @readonly
   */
  MIN_VALUE,

  /**
   * The maximum value for a Uint32.
   * @readonly
   */
  MAX_VALUE,

  /**
   * Returns the minimum of multiple Uint32 values.
   * @param values - The Uint32 values to compare
   * @returns The smallest value as a Uint32
   */
  min: min_,

  /**
   * Returns the maximum of multiple Uint32 values.
   * @param values - The Uint32 values to compare
   * @returns The largest value as a Uint32
   */
  max: max_,

  /**
   * Clamps a Uint32 to be within the specified range.
   * @param value - The value to clamp
   * @param min - The minimum value
   * @param max - The maximum value
   * @returns The clamped value as a Uint32
   *
   * @example
   * ```ts
   * const result = Uint32.clamp(asUint32(2000000000), Uint32.MIN_VALUE, asUint32(1000)); // Uint32 (1000)
   * assert(result === 1000);
   * ```
   *
   */
  clamp,

  /**
   * Generates a random Uint32 value.
   * @returns A random Uint32 value within [0, 2^32)
   */
  random,

  /**
   * Raises a Uint32 to a power, with result clamped to [0, 2^32).
   * @param a - The base Uint32
   * @param b - The exponent Uint32
   * @returns `a ** b` as a Uint32, clamped to valid range
   *
   * @example
   * ```ts
   * const result = Uint32.pow(asUint32(2), asUint32(10)); // Uint32 (1024)
   * assert(result === 1024);
   * ```
   *
   */
  pow,

  /**
   * Adds two Uint32 values, with result clamped to [0, 2^32).
   * @param a - First Uint32
   * @param b - Second Uint32
   * @returns `a + b` as a Uint32, clamped to valid range
   *
   * @example
   * ```ts
   * const result = Uint32.add(asUint32(1000000), asUint32(500000)); // Uint32 (1500000)
   * assert(result === 1500000);
   * ```
   *
   */
  add,

  /**
   * Subtracts two Uint32 values, with result clamped to [0, 2^32).
   * @param a - First Uint32
   * @param b - Second Uint32
   * @returns `a - b` as a Uint32, clamped to valid range (minimum 0)
   *
   * @example
   * ```ts
   * const result1 = Uint32.sub(asUint32(1000000), asUint32(500000)); // Uint32 (500000)
   * const result2 = Uint32.sub(asUint32(100), asUint32(500)); // Uint32 (0) - clamped
   * assert(result1 === 500000);
   * assert(result2 === 0);
   * ```
   *
   */
  sub,

  /**
   * Multiplies two Uint32 values, with result clamped to [0, 2^32).
   * @param a - First Uint32
   * @param b - Second Uint32
   * @returns `a * b` as a Uint32, clamped to valid range
   *
   * @example
   * ```ts
   * const result = Uint32.mul(asUint32(1000), asUint32(500)); // Uint32 (500000)
   * assert(result === 500000);
   * ```
   *
   */
  mul,

  /**
   * Divides two Uint32 values using floor division, with result clamped to [0, 2^32).
   * @param a - The dividend Uint32
   * @param b - The divisor Uint32
   * @returns `⌊a / b⌋` as a Uint32, clamped to valid range
   *
   * @example
   * ```ts
   * const result1 = Uint32.div(asUint32(1000000), asUint32(500000)); // Uint32 (2)
   * const result2 = Uint32.div(asUint32(7), asUint32(3)); // Uint32 (2) - floor division
   * assert(result1 === 2);
   * assert(result2 === 2);
   * ```
   *
   */
  div,
} as const;

expectType<
  keyof typeof Uint32,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'non-negative' | 'range'
  >
>('=');

expectType<
  typeof Uint32,
  TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'non-negative' | 'range'
  >
>('<=');
