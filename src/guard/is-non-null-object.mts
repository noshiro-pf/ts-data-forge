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
 * @example
 * Basic usage with different value types:
 * ```ts
 * assert(isNonNullObject({}) === true);           // true (plain object)
 * assert(isNonNullObject([]) === true);           // true (arrays are objects)
 * assert(isNonNullObject(new Date()) === true);   // true (Date instance)
 * assert(isNonNullObject(/regex/) === true);      // true (RegExp instance)
 * assert(isNonNullObject(new Map()) === true);    // true (Map instance)
 * assert(isNonNullObject(null) === false);        // false (null is not considered object here)
 * assert(isNonNullObject(undefined) === false);   // false (primitive)
 * assert(isNonNullObject("string") === false);    // false (primitive)
 * assert(isNonNullObject(42) === false);          // false (primitive)
 * assert(isNonNullObject(true) === false);        // false (primitive)
 * assert(isNonNullObject(() => {}) === false);    // false (functions are not objects in this context)
 * ```
 *
 * @example
 * Type guard usage with unknown values:
 * ```ts
 * const value: unknown = { name: 'John', age: 30 };
 *
 * if (isNonNullObject(value)) {
 *   // value is now typed as object
 *   assert(typeof value === 'object');
 *
 *   // You can now safely use object-specific operations
 *   const keys = Object.keys(value);
 *   assert(keys.length >= 0);
 *   const str = value.toString();
 *   assert(typeof str === 'string');
 *
 *   // But you may need additional checks for specific object types
 *   if (Array.isArray(value)) {
 *     assert(false); // This won't execute for this example
 *   }
 * } else {
 *   assert(false); // should not reach here
 * }
 * ```
 *
 * @example
 * Filtering arrays to find objects:
 * ```ts
 * const mixedArray: unknown[] = [
 *   { name: 'John' },
 *   'string',
 *   [1, 2, 3],
 *   42,
 *   null,
 *   new Date(),
 *   () => 'function'
 * ];
 *
 * const objects = mixedArray.filter(isNonNullObject);
 * // objects contains: [{ name: 'John' }, [1, 2, 3], Date instance]
 * // Note: includes both plain objects and arrays
 *
 * objects.forEach(obj => {
 *   // Each obj is guaranteed to be an object
 *   console.log('Object type:', obj.constructor.name);
 * });
 * ```
 *
 * @example
 * Progressive type narrowing with other guards:
 * ```ts
 * const apiResponse: unknown = { status: 'success', data: [1, 2, 3] };
 *
 * if (isNonNullObject(apiResponse)) {
 *   // apiResponse is now object
 *   assert(typeof apiResponse === 'object');
 *
 *   // Simplified check without external function dependencies
 *   if (!Array.isArray(apiResponse)) {
 *     // Plain object, not array
 *     const keys = Object.keys(apiResponse);
 *     assert(keys.length > 0);
 *   } else {
 *     assert(false); // This won't execute for this example
 *   }
 * }
 * ```
 *
 * @see {@link isRecord} - For checking plain objects specifically (excludes arrays)
 */
// eslint-disable-next-line @typescript-eslint/no-restricted-types
export const isNonNullObject = (u: unknown): u is object =>
  typeof u === 'object' && u !== null;
