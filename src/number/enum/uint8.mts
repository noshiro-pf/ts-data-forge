import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

const typeNameInMessage = 'an non-negative integer less than 256';

const {
  MIN_VALUE,
  MAX_VALUE,
  random: randomImpl,
  is: isImpl,
  castType: castTypeImpl,
  clamp: clampImpl,
} = TsDataForgeInternals.RefinedNumberUtils.operatorsForInteger<Uint16, 0, 255>(
  {
    integerOrSafeInteger: 'SafeInteger',
    MIN_VALUE: 0,
    MAX_VALUE: 255,
    typeNameInMessage,
  } as const,
);

const is = (x: number): x is Uint8 => isImpl(x);

const castType = (x: number): Uint8 =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  castTypeImpl(x) as Uint8;

const clamp = (a: number): Uint8 => castType(clampImpl(a));

/**
 * Returns the minimum value from a list of Uint8 values.
 *
 * @param values - The Uint8 values to compare (at least one required)
 * @returns The smallest value as a Uint8
 *
 * @example
 * ```ts
 * min_(asUint8(50), asUint8(30), asUint8(100)); // Uint8 (30)
 * min_(asUint8(0), asUint8(255));               // Uint8 (0)
 * ```
 *
 */
const min_ = (...values: readonly Uint8[]): Uint8 =>
  castType(Math.min(...values));

/**
 * Returns the maximum of the given Uint8 values.
 * @param values - The Uint8 values to compare
 * @returns The maximum value
 */
const max_ = (...values: readonly Uint8[]): Uint8 =>
  castType(Math.max(...values));

/**
 * Raises x to the power of y, clamped to Uint8 range.
 * @param x - The base
 * @param y - The exponent
 * @returns x^y clamped to [0, 255]
 */
const pow = (x: Uint8, y: Uint8): Uint8 => clamp(x ** y);

/**
 * Adds two Uint8 values, clamped to Uint8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x + y clamped to [0, 255]
 */
const add = (x: Uint8, y: Uint8): Uint8 => clamp(x + y);

/**
 * Subtracts two Uint8 values, clamped to Uint8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x - y clamped to [0, 255]
 */
const sub = (x: Uint8, y: Uint8): Uint8 => clamp(x - y);

/**
 * Multiplies two Uint8 values, clamped to Uint8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x * y clamped to [0, 255]
 */
const mul = (x: Uint8, y: Uint8): Uint8 => clamp(x * y);

/**
 * Divides two Uint8 values, clamped to Uint8 range.
 * @param x - The dividend
 * @param y - The divisor (cannot be 0)
 * @returns ⌊x / y⌋ clamped to [0, 255]
 */
const div = (x: Uint8, y: Exclude<Uint8, 0>): Uint8 => clamp(Math.floor(x / y));

/**
 * Generates a random Uint8 value within the specified range.
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random Uint8 between min and max
 */
const random = (min: Uint8, max: Uint8): Uint8 =>
  castType(randomImpl(castTypeImpl(min), castTypeImpl(max)));

/**
 * Checks if a number is a Uint8 (8-bit unsigned integer in the range [0, 255]).
 * @param value The value to check.
 * @returns `true` if the value is a Uint8, `false` otherwise.
 *
 * @example
 * ```ts
 * assert(isUint8(100)); // true
 * assert(isUint8(0)); // true (minimum value)
 * assert(isUint8(255)); // true (maximum value)
 * assert(!isUint8(256)); // false (exceeds max)
 * assert(!isUint8(-1)); // false (negative)
 * assert(!isUint8(5.5)); // false (not integer)
 * ```
 *
 * @example
 * ```ts
 * const byte = asUint8(200); // Uint8
 * const zero = asUint8(0); // Uint8 (minimum)
 * const max = asUint8(255); // Uint8 (maximum)
 *
 * assert(byte === 200);
 * assert(zero === 0);
 * assert(max === 255);
 *
 * // These throw TypeError:
 * expect(() => asUint8(256)).toThrow(TypeError); // Exceeds maximum
 * expect(() => asUint8(-1)).toThrow(TypeError); // Negative value
 * expect(() => asUint8(1.5)).toThrow(TypeError); // Not an integer
 * ```
 *
 * @example
 * ```ts
 * Uint8.min(asUint8(50), asUint8(30), asUint8(100)); // Uint8 (30)
 * Uint8.min(asUint8(0), asUint8(255)); // Uint8 (0)
 * ```
 *
 */
export const isUint8 = is;

/**
 * Casts a number to a Uint8 type.
 * @param value The value to cast.
 * @returns The value as a Uint8 type.
 * @throws {TypeError} If the value is not a valid 8-bit unsigned integer.
 *
 * @example
 * ```ts
 * const x = asUint8(255); // Uint8
 * const y = asUint8(0); // Uint8
 *
 * assert(x === 255);
 * assert(y === 0);
 *
 * // These throw TypeError:
 * expect(() => asUint8(-1)).toThrow(TypeError);
 * expect(() => asUint8(256)).toThrow(TypeError);
 * expect(() => asUint8(1.5)).toThrow(TypeError);
 * ```
 *
 */
export const asUint8 = castType;

/**
 * Namespace providing type-safe arithmetic operations for 8-bit unsigned integers.
 *
 * All operations automatically clamp results to the valid Uint8 range [0, 255].
 * This ensures that all arithmetic maintains the 8-bit unsigned integer constraint,
 * with negative results clamped to 0 and overflow results clamped to MAX_VALUE.
 *
 * @example
 * ```ts
 * const a = asUint8(200);
 * const b = asUint8(100);
 *
 * assert(a === 200);
 * assert(b === 100);
 *
 * // Arithmetic operations with automatic clamping
 * const sum = Uint8.add(a, b); // Uint8 (255 - clamped to MAX_VALUE)
 * const diff = Uint8.sub(a, b); // Uint8 (100)
 * const reverseDiff = Uint8.sub(b, a); // Uint8 (0 - clamped to MIN_VALUE)
 * const product = Uint8.mul(a, b); // Uint8 (255 - clamped due to overflow)
 *
 * assert(sum === 255);
 * assert(diff === 100);
 * assert(reverseDiff === 0);
 * assert(product === 255);
 *
 * // Range operations
 * const clamped = Uint8.clamp(-10); // Uint8 (0)
 * const minimum = Uint8.min(a, b); // Uint8 (100)
 * const maximum = Uint8.max(a, b); // Uint8 (200)
 *
 * assert(clamped === 0);
 * assert(minimum === 100);
 * assert(maximum === 200);
 *
 * // Utility operations
 * const random = Uint8.random(asUint8(50), asUint8(150)); // Uint8 (random value in [50, 150])
 * const power = Uint8.pow(asUint8(2), asUint8(7)); // Uint8 (128)
 *
 * assert(random >= 50 && random <= 150);
 * assert(power === 128);
 * ```
 *
 */
export const Uint8 = {
  /**
   * Type guard to check if a value is a Uint8.
   * @param value The value to check.
   * @returns `true` if the value is an 8-bit unsigned integer, `false` otherwise.
   */
  is,

  /**
   * The minimum value for an 8-bit unsigned integer.
   * @readonly
   */
  MIN_VALUE,

  /**
   * The maximum value for an 8-bit unsigned integer.
   * @readonly
   */
  MAX_VALUE,

  /**
   * Returns the larger of the given Uint8 values.
   * @param values The Uint8 values to compare.
   * @returns The maximum value as a Uint8.
   */
  max: max_,

  /**
   * Returns the smaller of the given Uint8 values.
   * @param values The Uint8 values to compare.
   * @returns The minimum value as a Uint8.
   */
  min: min_,

  /**
   * Clamps a number to the Uint8 range.
   * @param value The number to clamp.
   * @returns The value clamped to [0, 255] as a Uint8.
   */
  clamp,

  /**
   * Generates a random Uint8 value within the specified range.
   * @param min The minimum value (inclusive).
   * @param max The maximum value (inclusive).
   * @returns A random Uint8 between min and max.
   */
  random,

  /**
   * Raises a Uint8 to the power of another Uint8.
   * @param a The base Uint8.
   * @param b The exponent Uint8.
   * @returns `a ** b` clamped to [0, 255] as a Uint8.
   */
  pow,

  /**
   * Adds two Uint8 values.
   * @param a The first Uint8.
   * @param b The second Uint8.
   * @returns `a + b` clamped to [0, 255] as a Uint8.
   */
  add,

  /**
   * Subtracts one Uint8 from another.
   * @param a The minuend Uint8.
   * @param b The subtrahend Uint8.
   * @returns `a - b` clamped to [0, 255] as a Uint8 (minimum 0).
   */
  sub,

  /**
   * Multiplies two Uint8 values.
   * @param a The first Uint8.
   * @param b The second Uint8.
   * @returns `a * b` clamped to [0, 255] as a Uint8.
   */
  mul,

  /**
   * Divides one Uint8 by another using floor division.
   * @param a The dividend Uint8.
   * @param b The divisor Uint8 (cannot be 0).
   * @returns `⌊a / b⌋` clamped to [0, 255] as a Uint8.
   */
  div,
} as const;

expectType<
  keyof typeof Uint8,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    Uint16,
    'int' | 'non-negative' | 'range'
  >
>('=');
