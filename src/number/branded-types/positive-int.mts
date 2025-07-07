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
 * @example
 * ```ts
 * isPositiveInt(5); // true
 * isPositiveInt(1); // true
 * isPositiveInt(0); // false (zero is not positive)
 * isPositiveInt(-1); // false (negative)
 * isPositiveInt(5.5); // false (not an integer)
 * isPositiveInt(Number.NaN); // false
 * ```
 *
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
 * @example
 * ```ts
 * const count = asPositiveInt(5); // PositiveInt
 * const length = asPositiveInt(100); // PositiveInt
 * const one = asPositiveInt(1); // PositiveInt (minimum valid)
 *
 * assert(count === 5);
 * assert(length === 100);
 * assert(one === 1);
 *
 * // These throw TypeError:
 * expect(() => asPositiveInt(0)).toThrow(TypeError); // Zero is not positive
 * expect(() => asPositiveInt(-1)).toThrow(TypeError); // Negative numbers not allowed
 * expect(() => asPositiveInt(5.5)).toThrow(TypeError); // Not an integer
 * expect(() => asPositiveInt(Number.POSITIVE_INFINITY)).toThrow(TypeError); // Not finite
 * ```
 *
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
 * @example
 * ```ts
 * // Type validation
 * const isValid1 = PositiveInt.is(5); // true
 * const isValid2 = PositiveInt.is(1); // true (minimum value)
 * const isValid3 = PositiveInt.is(0); // false
 * const isValid4 = PositiveInt.is(-1); // false
 *
 * assert(isValid1);
 * assert(isValid2);
 * assert(!isValid3);
 * assert(!isValid4);
 *
 * // Automatic clamping in operations
 * const a = asPositiveInt(10);
 * const b = asPositiveInt(3);
 *
 * const sum = PositiveInt.add(a, b); // PositiveInt (13)
 * const diff1 = PositiveInt.sub(a, b); // PositiveInt (7)
 * const diff2 = PositiveInt.sub(b, a); // PositiveInt (1) - clamped!
 * const product = PositiveInt.mul(a, b); // PositiveInt (30)
 * const quotient = PositiveInt.div(a, b); // PositiveInt (3)
 *
 * assert(sum === 13);
 * assert(diff1 === 7);
 * assert(diff2 === 1);
 * assert(product === 30);
 * assert(quotient === 3);
 *
 * // Edge case: division that would be < 1
 * const small = PositiveInt.div(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (1)
 *
 * assert(small === 1);
 *
 * // Range operations
 * const minimum = PositiveInt.min(a, b); // PositiveInt (3)
 * const maximum = PositiveInt.max(a, b); // PositiveInt (10)
 *
 * assert(minimum === 3);
 * assert(maximum === 10);
 *
 * // Random generation
 * const dice = PositiveInt.random(asPositiveInt(1), asPositiveInt(6)); // 1-6
 * const id = PositiveInt.random(asPositiveInt(1000), asPositiveInt(9999)); // 4-digit ID
 *
 * assert(dice >= 1 && dice <= 6);
 * assert(id >= 1000 && id <= 9999);
 * ```
 *
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
   * @example
   * ```ts
   * const min1 = PositiveInt.min(asPositiveInt(5), asPositiveInt(3));    // PositiveInt (3)
   * const min2 = PositiveInt.min(asPositiveInt(10), asPositiveInt(1), asPositiveInt(7)); // PositiveInt (1)
   *
   * assert(min1 === 3);
   * assert(min2 === 1);
   * ```
   *
   */
  min: min_,

  /**
   * Returns the maximum value from a list of positive integers.
   *
   * @param values - The positive integers to compare (at least one required)
   * @returns The largest value as a PositiveInt
   *
   * @example
   * ```ts
   * const max1 = PositiveInt.max(asPositiveInt(5), asPositiveInt(3));    // PositiveInt (5)
   * const max2 = PositiveInt.max(asPositiveInt(10), asPositiveInt(1), asPositiveInt(7)); // PositiveInt (10)
   *
   * assert(max1 === 5);
   * assert(max2 === 10);
   * ```
   *
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
   * @example
   * ```ts
   * const clamp1 = PositiveInt.clamp(5);    // PositiveInt (5)
   * const clamp2 = PositiveInt.clamp(0);    // PositiveInt (1) - clamped to minimum
   * const clamp3 = PositiveInt.clamp(-10);  // PositiveInt (1) - clamped to minimum
   * const clamp4 = PositiveInt.clamp(100);  // PositiveInt (100)
   *
   * assert(clamp1 === 5);
   * assert(clamp2 === 1);
   * assert(clamp3 === 1);
   * assert(clamp4 === 100);
   * ```
   *
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
   * @example
   * ```ts
   * // Dice roll
   * const d6 = PositiveInt.random(asPositiveInt(1), asPositiveInt(6));
   *
   * // Random user ID
   * const userId = PositiveInt.random(asPositiveInt(1000), asPositiveInt(9999));
   *
   * // Random page count
   * const pages = PositiveInt.random(asPositiveInt(50), asPositiveInt(500));
   *
   * assert(d6 >= 1 && d6 <= 6);
   * assert(userId >= 1000 && userId <= 9999);
   * assert(pages >= 50 && pages <= 500);
   * ```
   *
   */
  random,

  /**
   * Raises a positive integer to a power, ensuring the result is never less than 1.
   * @param a - The base positive integer
   * @param b - The exponent positive integer
   * @returns `a ** b` as a PositiveInt, but never less than 1
   *
   * @example
   * ```ts
   * const power = PositiveInt.pow(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (8)
   *
   * assert(power === 8);
   * ```
   *
   */
  pow,

  /**
   * Adds two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a + b` as a PositiveInt, but never less than 1
   *
   * @example
   * ```ts
   * const sum = PositiveInt.add(asPositiveInt(5), asPositiveInt(3)); // PositiveInt (8)
   *
   * assert(sum === 8);
   * ```
   *
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
   * @example
   * ```ts
   * const sub1 = PositiveInt.sub(asPositiveInt(8), asPositiveInt(3));  // PositiveInt (5)
   * const sub2 = PositiveInt.sub(asPositiveInt(3), asPositiveInt(8));  // PositiveInt (1) - clamped
   * const sub3 = PositiveInt.sub(asPositiveInt(5), asPositiveInt(5));  // PositiveInt (1) - clamped
   *
   * assert(sub1 === 5);
   * assert(sub2 === 1);
   * assert(sub3 === 1);
   * ```
   *
   */
  sub,

  /**
   * Multiplies two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a * b` as a PositiveInt, but never less than 1
   *
   * @example
   * ```ts
   * const product = PositiveInt.mul(asPositiveInt(4), asPositiveInt(3)); // PositiveInt (12)
   *
   * assert(product === 12);
   * ```
   *
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
   * @example
   * ```ts
   * const div1 = PositiveInt.div(asPositiveInt(10), asPositiveInt(3)); // PositiveInt (3)
   * const div2 = PositiveInt.div(asPositiveInt(9), asPositiveInt(3));  // PositiveInt (3)
   * const div3 = PositiveInt.div(asPositiveInt(2), asPositiveInt(3));  // PositiveInt (1) - clamped
   * const div4 = PositiveInt.div(asPositiveInt(1), asPositiveInt(5));  // PositiveInt (1) - clamped
   *
   * assert(div1 === 3);
   * assert(div2 === 3);
   * assert(div3 === 1);
   * assert(div4 === 1);
   * ```
   *
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
