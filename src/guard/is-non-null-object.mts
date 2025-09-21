/**
 * Type guard that checks if a value is a non-null object.
 *
 * This function checks if a value has type `"object"` according to the `typeof` operator
 * and is not `null`. This includes all object types such as plain objects, arrays, dates,
 * regular expressions, and other object instances, but excludes functions.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `object`
 * - Excludes `null`, `undefined`, and all primitive types
 * - Excludes functions (they have `typeof` === `"function"`, not `"object"`)
 * - Includes arrays, dates, regex, and other object instances
 *
 * **Note:** This function returns `true` for arrays. If you need to check for plain objects
 * specifically (excluding arrays), use `isRecord()` instead.
 *
 * @param u - The value to check
 * @returns `true` if `u` is an object and not `null`, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `object`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-null-object/isnonnullobject-example-1.mts|Sample code}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-null-object/isnonnullobject-example-2.mts|Sample code 2}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-null-object/isnonnullobject-example-3.mts|Sample code 3}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-null-object/isnonnullobject-example-4.mts|Sample code 4}.
 *
 * @see {@link isRecord} - For checking plain objects specifically (excludes arrays)
 */
// eslint-disable-next-line @typescript-eslint/no-restricted-types
export const isNonNullObject = (u: unknown): u is object =>
  typeof u === 'object' && u !== null;
