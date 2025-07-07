import { expectType } from '../expect-type.mjs';

/**
 * Namespace providing utility functions for number manipulation and validation.
 *
 * This namespace offers a comprehensive set of type-safe number utilities including:
 * - Type conversion and validation
 * - Type guards for numeric constraints (non-zero, non-negative, positive)
 * - Range checking and clamping operations
 * - Mathematical operations with type safety
 * - Rounding utilities
 *
 * Many functions in this namespace leverage TypeScript's type system to provide
 * compile-time guarantees about numeric constraints.
 *
 * @example
 * ```ts
 * // Type conversion
 * const num = Num.from('123.45');
 * assert(num === 123.45);
 * const invalid = Num.from('abc');
 * assert(isNaN(invalid));
 *
 * // Type guards
 * const value = 5;
 * if (Num.isPositive(value)) {
 *   expectType<typeof value, PositiveNumber & 5>('=');
 * }
 *
 * // Range checking
 * const isValid = Num.isInRange(0, 100)(50);
 * assert(isValid === true);
 *
 * // Clamping
 * const clamped = Num.clamp(150, 0, 100);
 * assert(clamped === 100);
 * const clampFn = Num.clamp(0, 100);
 * const result = clampFn(150);
 * assert(result === 100);
 * ```
 *
 */
export namespace Num {
  /**
   * Converts an unknown value to a number. Alias for the `Number` constructor.
   * @param n The value to convert.
   * @returns The numeric representation of `n`.
   *
   * @example
   * ```ts
   * // Type conversion
   * const num = Num.from('123.45');
   * assert(num === 123.45);
   * const invalid = Num.from('abc');
   * assert(isNaN(invalid));
   *
   * // Type guards
   * const value = 5;
   * if (Num.isPositive(value)) {
   *   expectType<typeof value, PositiveNumber & 5>('=');
   * }
   *
   * // Range checking
   * const isValid = Num.isInRange(0, 100)(50);
   * assert(isValid === true);
   *
   * // Clamping
   * const clamped = Num.clamp(150, 0, 100);
   * assert(clamped === 100);
   * const clampFn = Num.clamp(0, 100);
   * const result = clampFn(150);
   * assert(result === 100);
   * ```
   *
   * @example
   * ```ts
   * assert(Num.from('123.45') === 123.45);
   * assert(isNaN(Num.from('hello')));
   * ```
   *
   */
  export const from: (n: unknown) => number = Number;

  /**
   * Type guard that checks if a number is non-zero.
   *
   * When this function returns `true`, TypeScript narrows the type to exclude zero,
   * providing compile-time safety for division operations and other calculations
   * that require non-zero values.
   *
   * @template N - The numeric literal type or number type to check
   * @param num - The number to check
   * @returns `true` if the number is not zero, `false` otherwise
   *
   * @example
   * ```ts
   * const value = 5;
   * if (Num.isNonZero(value)) {
   *   expectType<typeof value, NonZeroNumber & 5>('=');
   *   const result = 10 / value; // Safe division
   *   assert(result === 2);
   * }
   *
   * // Works with numeric literals
   * const literal = 0 as 0 | 1 | 2;
   * if (Num.isNonZero(literal)) {
   *   expectType<typeof literal, 1 | 2>('=');
   * }
   *
   * assert(Num.isNonZero(5) === true);
   * assert(Num.isNonZero(0) === false);
   * ```
   *
   */
  export const isNonZero = <N extends number>(
    num: N,
  ): num is NonZeroNumber & RelaxedExclude<N, 0> => num !== 0;

  expectType<NonZeroNumber & RelaxedExclude<123, 0>, UnknownBrand>('<=');

  /**
   * Type guard that checks if a number is non-negative (greater than or equal to zero).
   *
   * When this function returns `true`, TypeScript narrows the type to exclude negative
   * values, which is useful for operations that require non-negative inputs like
   * array indices or measurements.
   *
   * @template N - The numeric literal type or number type to check
   * @param num - The number to check
   * @returns `true` if the number is >= 0, `false` otherwise
   *
   * @example
   * ```ts
   * const value = 10;
   * if (Num.isNonNegative(value)) {
   *   expectType<typeof value, NonNegativeNumber & 10>('=');
   *   const arr = new Array(value); // Safe array creation
   *   assert(arr.length === 10);
   * }
   *
   * // Type narrowing with unions
   * const index = -1 as -1 | 0 | 1;
   * if (Num.isNonNegative(index)) {
   *   expectType<typeof index, 0 | 1>('=');
   * }
   *
   * assert(Num.isNonNegative(10) === true);
   * assert(Num.isNonNegative(0) === true);
   * assert(Num.isNonNegative(-5) === false);
   * ```
   *
   */
  export const isNonNegative = <N extends number>(
    num: N,
  ): num is NonNegativeNumber & RelaxedExclude<N, NegativeIndex<1024>> =>
    num >= 0;

  /**
   * Type guard that checks if a number is positive (greater than zero).
   *
   * When this function returns `true`, TypeScript narrows the type to exclude zero
   * and negative values. This is particularly useful for validating inputs that
   * must be strictly positive, such as dimensions, counts, or rates.
   *
   * @template N - The numeric literal type or number type to check
   * @param num - The number to check
   * @returns `true` if the number is > 0, `false` otherwise
   *
   * @example
   * ```ts
   * const count = 5;
   * const total = 25;
   * if (Num.isPositive(count)) {
   *   expectType<typeof count, PositiveNumber & 5>('=');
   *   const average = total / count; // Safe division
   *   assert(average === 5);
   * }
   *
   * // Type narrowing with numeric literals
   * const testValue = 0 as -1 | 0 | 1 | 2;
   * if (Num.isPositive(testValue)) {
   *   expectType<typeof testValue, 1 | 2>('=');
   * }
   *
   * assert(Num.isPositive(5) === true);
   * assert(Num.isPositive(0) === false);
   * assert(Num.isPositive(-3) === false);
   * ```
   *
   */
  export const isPositive = <N extends number>(
    num: N,
  ): num is PositiveNumber & RelaxedExclude<N, NegativeIndex<1024> | 0> =>
    num > 0;

  /**
   * Creates a function that checks if a number `x` is within the range `lowerBound <= x < upperBound`.
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (exclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is in the range, `false` otherwise.
   *
   * @example
   * ```ts
   * const isInRange0to10 = Num.isInRange(0, 10);
   * assert(isInRange0to10(5) === true);
   * assert(isInRange0to10(0) === true); // inclusive lower bound
   * assert(isInRange0to10(10) === false); // exclusive upper bound
   * assert(isInRange0to10(-1) === false);
   * ```
   *
   */
  export const isInRange =
    (lowerBound: number, upperBound: number) =>
    (x: number): boolean =>
      lowerBound <= x && x < upperBound;

  /**
   * Creates a function that checks if a number `x` is within the range `lowerBound <= x <= upperBound`.
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (inclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is in the range, `false` otherwise.
   *
   * @example
   * ```ts
   * const inRange = Num.isInRangeInclusive(1, 10);
   * console.log(inRange(1)); // true (lower bound)
   * console.log(inRange(5)); // true
   * console.log(inRange(10)); // true (upper bound)
   * console.log(inRange(11)); // false
   * ```
   *
   */
  export const isInRangeInclusive =
    (lowerBound: number, upperBound: number) =>
    (x: number): boolean =>
      lowerBound <= x && x <= upperBound;

  /**
   * @internal
   * Helper type mapping each SmallUint N to the union of integers from 0 to N-1.
   * Used internally for type-safe range operations.
   *
   * For example:
   * - LT[3] = 0 | 1 | 2
   * - LT[5] = 0 | 1 | 2 | 3 | 4
   *
   * @template N - A SmallUint representing the exclusive upper bound
   */
  type LT = {
    [N in SmallUint]: Index<N>;
  };

  /**
   * @internal
   * Helper type mapping each SmallUint N to the union of integers from 0 to N (inclusive).
   * Used internally for type-safe range operations with inclusive upper bounds.
   *
   * For example:
   * - LEQ[3] = 0 | 1 | 2 | 3
   * - LEQ[5] = 0 | 1 | 2 | 3 | 4 | 5
   *
   * @template N - A SmallUint representing the inclusive upper bound
   */
  type LEQ = {
    [N in SmallUint]: Index<N> | N;
  };

  /**
   * Creates a type guard that checks if a number is an unsigned integer within a specified range.
   *
   * This function returns a predicate that validates whether a number is:
   * - A safe integer (no floating point)
   * - Within the range [lowerBound, upperBound)
   *
   * The returned type guard provides precise type narrowing when the bounds are
   * SmallUint literals, making it ideal for array index validation.
   *
   * @template L - The lower bound as a SmallUint literal type
   * @template U - The upper bound as a SmallUint literal type
   * @param lowerBound - The minimum value (inclusive)
   * @param upperBound - The maximum value (exclusive)
   * @returns A type guard function that validates and narrows number types
   *
   * @example
   * ```ts
   * // Custom range validation
   * const isValidPercentage = Num.isUintInRange(0, 101);
   * const percentValue = 85;
   * if (isValidPercentage(percentValue)) {
   *   // percentValue is typed as 0 | 1 | ... | 100
   *   assert(percentValue >= 0 && percentValue <= 100);
   * }
   * ```
   *
   */
  export const isUintInRange =
    <L extends SmallUint, U extends SmallUint>(lowerBound: L, upperBound: U) =>
    (x: number): x is RelaxedExclude<LT[U], LT[Min<L>]> =>
      Number.isSafeInteger(x) && lowerBound <= x && x < upperBound;

  /**
   * Creates a type guard that checks if a number is an unsigned integer within a specified inclusive range.
   *
   * This function returns a predicate that validates whether a number is:
   * - A safe integer (no floating point)
   * - Within the range [lowerBound, upperBound] (both bounds inclusive)
   *
   * The returned type guard provides precise type narrowing when the bounds are
   * SmallUint literals, useful for validating scores, percentages, or other bounded values.
   *
   * @template L - The lower bound as a SmallUint literal type
   * @template U - The upper bound as a SmallUint literal type
   * @param lowerBound - The minimum value (inclusive)
   * @param upperBound - The maximum value (inclusive)
   * @returns A type guard function that validates and narrows number types
   *
   * @example
   * ```ts
   * const isValidScore = Num.isUintInRangeInclusive(0, 100);
   * const score: number = 85;
   * if (isValidScore(score)) {
   *   // score is typed as 0 | 1 | 2 | ... | 100
   *   assert(score >= 0 && score <= 100);
   * }
   * ```
   *
   */
  export const isUintInRangeInclusive =
    <L extends SmallUint, U extends SmallUint>(lowerBound: L, upperBound: U) =>
    (x: number): x is RelaxedExclude<LEQ[U], LT[Min<L>]> =>
      Number.isSafeInteger(x) && lowerBound <= x && x <= upperBound;

  /**
   * Clamps a value within the given range. If the target value is invalid (not finite), returns the lower bound.
   *
   * Provides two usage patterns for maximum flexibility:
   * - **Direct usage**: Pass all three arguments to get the clamped value immediately
   * - **Curried usage**: Pass bounds to get a reusable clamping function
   *
   * @example
   * ```ts
   * // Direct usage
   * Num.clamp(15, 0, 10); // 10 (clamped to upper bound)
   * Num.clamp(5, 0, 10); // 5 (within bounds)
   *
   * // Curried usage
   * const clampToPercent = Num.clamp(0, 100);
   * clampToPercent(150); // 100
   * ```
   *
   */
  export function clamp(
    target: number,
    lowerBound: number,
    upperBound: number,
  ): number;

  // Curried version
  export function clamp(
    lowerBound: number,
    upperBound: number,
  ): (target: number) => number;

  export function clamp(
    ...args:
      | readonly [target: number, lowerBound: number, upperBound: number]
      | readonly [lowerBound: number, upperBound: number]
  ): number | ((target: number) => number) {
    switch (args.length) {
      case 3: {
        const [target, lowerBound, upperBound] = args;
        return !Number.isFinite(target)
          ? lowerBound
          : Math.max(lowerBound, Math.min(upperBound, target));
      }

      case 2: {
        const [lowerBound, upperBound] = args;
        return (target: number): number =>
          clamp(target, lowerBound, upperBound);
      }
    }
  }

  /**
   * Performs type-safe division with compile-time zero-check.
   *
   * This function leverages TypeScript's type system to prevent division by zero
   * at compile time. The divisor must be typed as NonZeroNumber or a non-zero
   * numeric literal.
   *
   * @param a - The dividend
   * @param b - The divisor (must be non-zero, enforced by types)
   * @returns The quotient of a / b
   *
   * @example
   * ```ts
   * const result = Num.div(10, 2); // 5
   * // Num.div(10, 0); // ❌ TypeScript error: Type '0' is not assignable
   *
   * // With type guards
   * const divisor: number = 5;
   * if (Num.isNonZero(divisor)) {
   *   const result = Num.div(100, divisor); // ✅ Safe
   *   assert(result === 20);
   * }
   *
   * // With branded types
   * const nonZero = 5 as NonZeroNumber;
   * const result3 = Num.div(20, nonZero); // 4
   * assert(result3 === 4);
   * ```
   *
   */
  export const div = (a: number, b: NonZeroNumber | SmallInt<'!=0'>): number =>
    a / b;

  /**
   * Performs integer division using floor division.
   *
   * Computes `⌊a / b⌋` by flooring both operands before division and then
   * flooring the result. This ensures integer arithmetic semantics.
   *
   * Note: Unlike `div`, this function does not enforce non-zero divisor at
   * compile time. Division by zero returns `NaN`.
   *
   * @param a - The dividend
   * @param b - The divisor
   * @returns The integer quotient, or `NaN` if b is zero
   *
   * @example
   * ```ts
   * Num.divInt(10, 3); // 3
   * Num.divInt(10, -3); // -4 (floor division)
   * ```
   *
   */
  export const divInt = (
    a: number,
    b: NonZeroNumber | SmallInt<'!=0'>,
  ): number => Math.floor(Math.floor(a) / Math.floor(b));

  /**
   * Rounds a number to a specified number of decimal places.
   *
   * Uses the standard rounding algorithm (round half up) to round the number
   * to the given precision. The precision must be a positive safe integer.
   *
   * @param num - The number to round
   * @param precision - The number of decimal places (must be positive)
   * @returns The rounded number
   *
   * @example
   * ```ts
   * Num.roundAt(3.14159, 2); // 3.14
   * Num.roundAt(10.5, 0); // 11
   * ```
   *
   */
  export const roundAt = (
    num: number,
    precision: PositiveSafeIntWithSmallInt,
  ): number => {
    const digit = 10 ** precision;

    return Math.round(num * digit) / digit;
  };

  /**
   * Rounds a number to the nearest integer using bitwise operations.
   *
   * This function uses a bitwise OR trick for potentially faster rounding.
   * Note: This implementation rounds half up for positive numbers but may
   * behave differently for negative numbers compared to Math.round.
   *
   * @param num - The number to round
   * @returns The rounded integer as an Int branded type
   *
   * @example
   * ```ts
   * Num.roundToInt(3.2); // 3
   * Num.roundToInt(3.5); // 4
   * ```
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  export const roundToInt = (num: number): Int => (0 | (num + 0.5)) as Int;

  /**
   * Creates a reusable rounding function with a fixed precision.
   *
   * This is a curried version of roundAt that returns a function configured
   * to always round to the specified number of decimal places. Useful for
   * creating consistent rounding behavior across multiple values.
   *
   * @param digit - The number of decimal places for rounding
   * @returns A function that rounds numbers to the specified precision
   *
   * @example
   * ```ts
   * const roundTo2 = Num.round(2);
   * roundTo2(3.14159); // 3.14
   * roundTo2(2.71828); // 2.72
   * ```
   *
   */
  export const round = (
    digit: PositiveSafeIntWithSmallInt,
  ): ((num: number) => number) => {
    const powAmount = 10 ** digit;

    return (target: number) => roundToInt(powAmount * target) / powAmount;
  };

  /**
   * Converts NaN values to undefined while preserving all other numbers.
   *
   * This function is useful for handling potentially invalid numeric operations
   * in a type-safe way, converting NaN results to undefined for easier handling
   * with optional chaining or nullish coalescing.
   *
   * @template N - The numeric type (literal or number)
   * @param num - The number to check
   * @returns The original number if not NaN, otherwise undefined
   *
   * @example
   * ```ts
   * Num.mapNaN2Undefined(42); // 42
   * Num.mapNaN2Undefined(NaN); // undefined
   * ```
   *
   */
  export const mapNaN2Undefined = <N extends number>(
    num: N,
  ): RelaxedExclude<N, NaNType> | undefined =>
    Number.isNaN(num)
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (num as RelaxedExclude<N, NaNType>);

  /**
   * Type-safe increment operation for SmallUint values.
   *
   * Increments a SmallUint (0-40) by 1 with the result type computed at
   * compile time. This provides type-level arithmetic for small unsigned
   * integers, useful for type-safe counter operations.
   *
   * @template N - A SmallUint literal type (0-40)
   * @param n - The SmallUint value to increment
   * @returns The incremented value with type Increment<N>
   *
   * @example
   * ```ts
   * const zero = 0 as 0;
   * const one = Num.increment(zero); // type is 1, value is 1
   * ```
   *
   */
  export const increment = <N extends SmallUint>(n: N): Increment<N> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    (n + 1) as Increment<N>;

  /**
   * Type-safe decrement operation for positive SmallInt values.
   *
   * Decrements a positive SmallInt (1-40) by 1 with the result type computed
   * at compile time. This provides type-level arithmetic for small positive
   * integers, useful for type-safe countdown operations.
   *
   * @template N - A positive SmallInt literal type (1-40)
   * @param n - The positive SmallInt value to decrement
   * @returns The decremented value with type Decrement<N>
   *
   * @example
   * ```ts
   * const three = 3 as 3;
   * const two = Num.decrement(three); // type is 2, value is 2
   * ```
   *
   */
  export const decrement = <N extends SmallPositiveInt>(n: N): Decrement<N> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    (n - 1) as Decrement<N>;
}
