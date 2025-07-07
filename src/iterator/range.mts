import { SafeInt, asSafeInt } from '../number/index.mjs';

/**
 * Generates a sequence of numbers within a specified range using a generator function.
 *
 * This function creates a generator that yields numbers from `start` (inclusive) to `end` (exclusive)
 * with the specified `step` increment/decrement. The function implements the JavaScript iterator protocol,
 * making it compatible with for-of loops, spread operator, Array.from(), and other iterator consumers.
 *
 * The function has two overloaded signatures:
 * 1. For non-negative ranges: accepts SafeUint parameters and optional positive step
 * 2. For general ranges: accepts SafeInt parameters and optional non-zero step
 *
 * **Generator Behavior:**
 * - Yields values lazily (computed on-demand)
 * - Returns `void` when iteration completes
 * - Does not accept sent values (next parameter is ignored)
 * - Automatically handles direction based on step sign and start/end relationship
 *
 * **Step Parameter Behavior:**
 * - Positive step: iterates from start toward end (start < end expected)
 * - Negative step: iterates from start toward end (start > end expected)
 * - Zero step: not allowed (NonZeroSafeInt constraint)
 * - Default step: 1 (positive direction)
 *
 * **Edge Cases:**
 * - When start equals end: yields no values (empty sequence)
 * - When step direction conflicts with start/end relationship: yields no values
 * - All parameters must be safe integers (within JavaScript's safe integer range)
 *
 * @template T - The specific SafeInt or SafeUint type being generated
 * @param start - The starting number of the sequence (inclusive). Must be a safe integer.
 * @param end - The end number of the sequence (exclusive). Must be a safe integer.
 * @param step - The increment or decrement value. Defaults to 1. Must be non-zero safe integer.
 * @returns A Generator object that yields safe integers in the specified range.
 *
 * @example
 * ```ts
 * // Basic ascending range
 * const result1: number[] = [];
 * for (const n of range(0, 5)) {
 *   result1.push(n);
 * }
 * assert.deepStrictEqual(result1, [0, 1, 2, 3, 4]);
 *
 * // Range with custom step
 * const result2: number[] = [];
 * for (const n of range(0, 10, 2)) {
 *   result2.push(n);
 * }
 * assert.deepStrictEqual(result2, [0, 2, 4, 6, 8]);
 *
 * // Descending range with negative step
 * const result3: number[] = [];
 * for (const n of range(10, 0, -1)) {
 *   result3.push(n);
 * }
 * assert.deepStrictEqual(result3, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
 *
 * // Convert generator to array
 * const numbers = Array.from(range(1, 4));
 * assert.deepStrictEqual(numbers, [1, 2, 3]);
 * const evens = [...range(0, 11, 2)];
 * assert.deepStrictEqual(evens, [0, 2, 4, 6, 8, 10]);
 *
 * // Empty ranges
 * assert.deepStrictEqual(Array.from(range(5, 5)), []); // start equals end
 * assert.deepStrictEqual(Array.from(range(5, 3)), []); // positive step, start > end
 * assert.deepStrictEqual(Array.from(range(3, 5, -1)), []); // negative step, start < end
 *
 * // Using with iterator protocol manually
 * const gen = range(1, 4);
 * assert.deepStrictEqual(gen.next(), { value: 1, done: false });
 * assert.deepStrictEqual(gen.next(), { value: 2, done: false });
 * assert.deepStrictEqual(gen.next(), { value: 3, done: false });
 * assert.deepStrictEqual(gen.next(), { value: undefined, done: true });
 *
 * // Generate test data
 * const testIds = [...range(1, 6)];
 * assert.deepStrictEqual(testIds, [1, 2, 3, 4, 5]);
 * ```
 *
 */
export function range(
  start: SafeUintWithSmallInt,
  end: SafeUintWithSmallInt,
  step?: PositiveSafeIntWithSmallInt,
): Generator<SafeUint, void, unknown>;

export function range(
  start: SafeIntWithSmallInt,
  end: SafeIntWithSmallInt,
  step?: NonZeroSafeIntWithSmallInt,
): Generator<SafeInt, void, unknown>;

export function* range(
  start: SafeIntWithSmallInt,
  end: SafeIntWithSmallInt,
  step: NonZeroSafeIntWithSmallInt = 1,
): Generator<SafeInt, void, unknown> {
  for (
    let mut_i: SafeInt = asSafeInt(start);
    step > 0 ? mut_i < end : mut_i > end;
    mut_i = SafeInt.add(mut_i, step)
  ) {
    yield mut_i;
  }
}
