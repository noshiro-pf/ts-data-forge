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
 * @example
 * ```ts
 * assert(isInt(5));
 * assert(isInt(-10));
 * assert(isInt(0));
 * assert(!isInt(5.5));
 * assert(!isInt(Number.NaN));
 * assert(!isInt(Number.POSITIVE_INFINITY));
 * ```
 *
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
 * @example
 * ```ts
 * const x = asInt(5); // Int
 * const y = asInt(-10); // Int
 * const z = asInt(0); // Int
 *
 * assert(x === 5);
 * assert(y === -10);
 * assert(z === 0);
 *
 * // These throw TypeError:
 * // asInt(5.5);         // Not an integer
 * // asInt(Number.NaN);         // Not a number
 * // asInt(Number.POSITIVE_INFINITY);    // Not finite
 * ```
 *
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
 * @example
 * ```ts
 * // Type validation
 * assert(Int.is(42));
 * assert(!Int.is(3.14));
 * assert(Int.is(-0)); // negative zero is an integer
 *
 * // Basic arithmetic
 * const a = asInt(10);
 * const b = asInt(3);
 *
 * assert(a === 10);
 * assert(b === 3);
 *
 * const sum = Int.add(a, b); // Int (13)
 * const diff = Int.sub(a, b); // Int (7)
 * const product = Int.mul(a, b); // Int (30)
 * const quotient = Int.div(a, b); // Int (3) - floor division
 * const power = Int.pow(a, b); // Int (1000)
 *
 * assert(sum === 13);
 * assert(diff === 7);
 * assert(product === 30);
 * assert(quotient === 3);
 * assert(power === 1000);
 *
 * // Utility operations
 * const absolute = Int.abs(asInt(-42)); // Int (42)
 * const minimum = Int.min(a, b, asInt(5)); // Int (3)
 * const maximum = Int.max(a, b, asInt(5)); // Int (10)
 *
 * assert(absolute === 42);
 * assert(minimum === 3);
 * assert(maximum === 10);
 *
 * // Random generation
 * const die = Int.random(asInt(1), asInt(6)); // Random Int in [1, 6]
 * assert(die >= 1 && die <= 6);
 * ```
 *
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
   * @example
   * ```ts
   * const abs1 = Int.abs(asInt(-5));  // Int (5)
   * const abs2 = Int.abs(asInt(3));   // Int (3)
   * const abs3 = Int.abs(asInt(-0));  // Int (0)
   *
   * assert(abs1 === 5);
   * assert(abs2 === 3);
   * assert(abs3 === 0);
   * ```
   *
   */
  abs,

  /**
   * Returns the minimum value from a list of integers.
   *
   * @param values - The integers to compare (at least one required)
   * @returns The smallest value as an Int
   *
   * @example
   * ```ts
   * const min1 = Int.min(asInt(5), asInt(3));           // Int (3)
   * const min2 = Int.min(asInt(-10), asInt(0), asInt(10)); // Int (-10)
   *
   * assert(min1 === 3);
   * assert(min2 === -10);
   * ```
   *
   */
  min: min_,

  /**
   * Returns the maximum value from a list of integers.
   *
   * @param values - The integers to compare (at least one required)
   * @returns The largest value as an Int
   *
   * @example
   * ```ts
   * const max1 = Int.max(asInt(5), asInt(3));           // Int (5)
   * const max2 = Int.max(asInt(-10), asInt(0), asInt(10)); // Int (10)
   *
   * assert(max1 === 5);
   * assert(max2 === 10);
   * ```
   *
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
   * @example
   * ```ts
   * // Dice roll
   * const d6 = Int.random(asInt(1), asInt(6));
   * assert(d6 >= 1 && d6 <= 6);
   *
   * // Random array index (example with array of length 5)
   * const array = [1, 2, 3, 4, 5];
   * const index = Int.random(asInt(0), asInt(array.length - 1));
   * assert(index >= 0 && index <= 4);
   *
   * // Can generate negative values
   * const temp = Int.random(asInt(-10), asInt(10));
   * assert(temp >= -10 && temp <= 10);
   * ```
   *
   */
  random,

  /**
   * Raises an integer to a power.
   * @param a - The base integer
   * @param b - The exponent integer
   * @returns `a ** b` as an Int
   *
   * @example
   * ```ts
   * const result = Int.pow(asInt(2), asInt(3)); // Int (8)
   * assert(result === 8);
   * ```
   *
   */
  pow,

  /**
   * Adds two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a + b` as an Int
   *
   * @example
   * ```ts
   * const result = Int.add(asInt(5), asInt(3)); // Int (8)
   * assert(result === 8);
   * ```
   *
   */
  add,

  /**
   * Subtracts two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a - b` as an Int
   *
   * @example
   * ```ts
   * const result = Int.sub(asInt(8), asInt(3)); // Int (5)
   * assert(result === 5);
   * ```
   *
   */
  sub,

  /**
   * Multiplies two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a * b` as an Int
   *
   * @example
   * ```ts
   * const result = Int.mul(asInt(4), asInt(3)); // Int (12)
   * assert(result === 12);
   * ```
   *
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
   * @example
   * ```ts
   * // Positive division
   * const div1 = Int.div(asInt(10), asInt(3));   // Int (3)
   * const div2 = Int.div(asInt(9), asInt(3));    // Int (3)
   *
   * assert(div1 === 3);
   * assert(div2 === 3);
   *
   * // Negative division (rounds toward -∞)
   * const div3 = Int.div(asInt(-10), asInt(3));  // Int (-4)
   * const div4 = Int.div(asInt(10), asInt(-3));  // Int (-4)
   * const div5 = Int.div(asInt(-10), asInt(-3)); // Int (3)
   *
   * assert(div3 === -4);
   * assert(div4 === -4);
   * assert(div5 === 3);
   * ```
   *
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
