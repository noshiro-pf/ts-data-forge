import { expectType } from '../../expect-type.mjs';
import { TsDataForgeInternals } from '../refined-number-utils.mjs';

type ElementType = NonNegativeFiniteNumber;

const typeNameInMessage = 'a non-negative finite number';

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
} = TsDataForgeInternals.RefinedNumberUtils.operatorsForFloat<
  ElementType,
  0,
  number
>({
  MIN_VALUE: 0,
  MAX_VALUE: Number.MAX_VALUE,
  typeNameInMessage,
} as const);

const floor = (
  x: ElementType,
): TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.floor(x) as TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType>;

const ceil = (
  x: ElementType,
): TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.ceil(x) as TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType>;

const round = (
  x: ElementType,
): TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.round(x) as TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType>;

expectType<TsDataForgeInternals.RefinedNumberUtils.ToInt<ElementType>, Uint>(
  '=',
);

/**
 * Checks if a number is a NonNegativeFiniteNumber (a finite number >= 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonNegativeFiniteNumber, `false` otherwise.
 */
export const isNonNegativeFiniteNumber = is;

/**
 * Casts a number to a NonNegativeFiniteNumber type.
 * @param value The value to cast.
 * @returns The value as a NonNegativeFiniteNumber type.
 * @throws {TypeError} If the value is not a non-negative finite number.
 *
 * @example
 * ```ts
 * const x = asNonNegativeFiniteNumber(5.5); // NonNegativeFiniteNumber
 * const y = asNonNegativeFiniteNumber(0); // NonNegativeFiniteNumber
 *
 * assert(x === 5.5);
 * assert(y === 0);
 *
 * expect(() => asNonNegativeFiniteNumber(-1)).toThrow(TypeError); // Negative values are not allowed
 * expect(() => asNonNegativeFiniteNumber(Number.POSITIVE_INFINITY)).toThrow(
 *   TypeError,
 * ); // Infinity is not a finite number
 * ```
 *
 */
export const asNonNegativeFiniteNumber = castType;

/**
 * Namespace providing type-safe arithmetic operations for non-negative finite numbers.
 *
 * All operations maintain the non-negative constraint by clamping negative results to 0,
 * while ensuring results remain finite (excluding NaN and Infinity). This type is useful
 * for representing measurements, distances, weights, and other inherently non-negative values.
 *
 * @example
 * ```ts
 * const distance = asNonNegativeFiniteNumber(5.5);
 * const speed = asNonNegativeFiniteNumber(2.2);
 *
 * // Arithmetic operations with non-negative clamping
 * const total = NonNegativeFiniteNumber.add(distance, speed); // NonNegativeFiniteNumber (7.7)
 * const diff = NonNegativeFiniteNumber.sub(speed, distance); // NonNegativeFiniteNumber (0 - clamped)
 * const area = NonNegativeFiniteNumber.mul(distance, speed); // NonNegativeFiniteNumber (12.1)
 * const ratio = NonNegativeFiniteNumber.div(distance, speed); // NonNegativeFiniteNumber (2.5)
 *
 * assert(total === 7.7);
 * assert(diff === 0); // clamped to 0
 * assert(Math.abs(area - 12.1) < 0.0000000000000001);
 * assert(Math.abs(ratio - 2.5) < 0.0000000000000001);
 *
 * // Range operations
 * const clamped = NonNegativeFiniteNumber.clamp(-10.5); // NonNegativeFiniteNumber (0)
 * const minimum = NonNegativeFiniteNumber.min(distance, speed); // NonNegativeFiniteNumber (2.2)
 * const maximum = NonNegativeFiniteNumber.max(distance, speed); // NonNegativeFiniteNumber (5.5)
 *
 * assert(clamped === 0);
 * assert(minimum === 2.2);
 * assert(maximum === 5.5);
 *
 * // Rounding operations (return Uint)
 * const pixels = NonNegativeFiniteNumber.round(distance); // Uint (6)
 * const floorValue = NonNegativeFiniteNumber.floor(distance); // Uint (5)
 * const ceilValue = NonNegativeFiniteNumber.ceil(distance); // Uint (6)
 *
 * assert(pixels === 6);
 * assert(floorValue === 5);
 * assert(ceilValue === 6);
 * ```
 *
 */
export const NonNegativeFiniteNumber = {
  /**
   * Type guard to check if a value is a NonNegativeFiniteNumber.
   * @param value The value to check.
   * @returns `true` if the value is a non-negative finite number, `false` otherwise.
   */
  is,

  /**
   * The minimum value for a non-negative finite number.
   * @readonly
   */
  MIN_VALUE,

  /**
   * Returns the smaller of two NonNegativeFiniteNumber values.
   * @param a The first NonNegativeFiniteNumber.
   * @param b The second NonNegativeFiniteNumber.
   * @returns The minimum value as a NonNegativeFiniteNumber.
   */
  min: min_,

  /**
   * Returns the larger of two NonNegativeFiniteNumber values.
   * @param a The first NonNegativeFiniteNumber.
   * @param b The second NonNegativeFiniteNumber.
   * @returns The maximum value as a NonNegativeFiniteNumber.
   */
  max: max_,

  /**
   * Clamps a number to the non-negative finite range.
   * @param value The number to clamp.
   * @returns The value clamped to [0, +∞) as a NonNegativeFiniteNumber.
   */
  clamp,

  /**
   * Rounds down a NonNegativeFiniteNumber to the nearest integer.
   * @param x The NonNegativeFiniteNumber to round down.
   * @returns The floor value as a Uint.
   */
  floor,

  /**
   * Rounds up a NonNegativeFiniteNumber to the nearest integer.
   * @param x The NonNegativeFiniteNumber to round up.
   * @returns The ceiling value as a Uint.
   */
  ceil,

  /**
   * Rounds a NonNegativeFiniteNumber to the nearest integer.
   * @param x The NonNegativeFiniteNumber to round.
   * @returns The rounded value as a Uint.
   */
  round,

  /**
   * Generates a random NonNegativeFiniteNumber value.
   * @returns A random non-negative finite number.
   */
  random,

  /**
   * Raises a NonNegativeFiniteNumber to the power of another NonNegativeFiniteNumber.
   * @param a The base NonNegativeFiniteNumber.
   * @param b The exponent NonNegativeFiniteNumber.
   * @returns `a ** b` clamped to [0, +∞) as a NonNegativeFiniteNumber.
   */
  pow,

  /**
   * Adds two NonNegativeFiniteNumber values.
   * @param a The first NonNegativeFiniteNumber.
   * @param b The second NonNegativeFiniteNumber.
   * @returns `a + b` clamped to [0, +∞) as a NonNegativeFiniteNumber.
   */
  add,

  /**
   * Subtracts one NonNegativeFiniteNumber from another.
   * @param a The minuend NonNegativeFiniteNumber.
   * @param b The subtrahend NonNegativeFiniteNumber.
   * @returns `a - b` clamped to [0, +∞) as a NonNegativeFiniteNumber (minimum 0).
   */
  sub,

  /**
   * Multiplies two NonNegativeFiniteNumber values.
   * @param a The first NonNegativeFiniteNumber.
   * @param b The second NonNegativeFiniteNumber.
   * @returns `a * b` clamped to [0, +∞) as a NonNegativeFiniteNumber.
   */
  mul,

  /**
   * Divides one NonNegativeFiniteNumber by another.
   * @param a The dividend NonNegativeFiniteNumber.
   * @param b The divisor NonNegativeFiniteNumber.
   * @returns `a / b` clamped to [0, +∞) as a NonNegativeFiniteNumber.
   */
  div,
} as const;

expectType<
  keyof typeof NonNegativeFiniteNumber,
  keyof TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'non-negative'
  >
>('=');

expectType<
  typeof NonNegativeFiniteNumber,
  TsDataForgeInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'non-negative'
  >
>('<=');
