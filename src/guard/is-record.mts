import { isNonNullObject } from './is-non-null-object.mjs';

/**
 * Type guard that checks if a value is a plain object (record) - a non-null object that is not an array.
 *
 * This function is useful for identifying "plain" JavaScript objects (also called records or
 * dictionaries) - objects that are typically used as key-value collections. It excludes arrays,
 * functions, and special object types like Date, RegExp, etc., focusing on objects that can be
 * safely treated as property collections.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `UnknownRecord` (equivalent to `Record<PropertyKey, unknown>`)
 * - Excludes `null`, `undefined`, primitives, arrays, and functions
 * - Returns `true` for plain objects `{}`, object literals, and objects created with `Object.create()`
 * - Returns `false` for arrays, even though they are technically objects
 *
 * **Implementation:** Uses `isNonNullObject()` to check for objects, then `Array.isArray()` to exclude arrays.
 *
 * @param u - The value to check
 * @returns `true` if `u` is a non-null object and not an array, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `UnknownRecord`.
 *
 * @example
 * Basic usage with different value types:
 * ```ts
 * assert(isRecord({}) === true);                    // empty object
 * assert(isRecord({ name: 'John' }) === true);      // object literal
 * assert(isRecord(Object.create(null)) === true);   // object created with Object.create
 * assert(isRecord(new Object()) === true);          // object constructor
 *
 * assert(isRecord([]) === false);                    // array
 * assert(isRecord([1, 2, 3]) === false);            // array with elements
 * assert(isRecord(null) === false);                  // null
 * assert(isRecord(undefined) === false);             // undefined
 * assert(isRecord("string") === false);              // primitive
 * assert(isRecord(42) === false);                    // primitive
 * assert(isRecord(() => {}) === false);              // function
 * assert(isRecord(new Date()) === true);             // Date object - is an object but not a plain record
 * assert(isRecord(/regex/) === true);                // RegExp object - is an object but not a plain record
 * ```
 *
 * @example
 * Type guard usage for safe property access:
 * ```ts
 * const obj = { id: 'user123', name: 'John' };
 *
 * if (isRecord(obj)) {
 *   // obj is now typed as UnknownRecord
 *   expectType<typeof obj, UnknownRecord>('=');
 *   assert(Object.keys(obj).length === 2);
 * }
 *
 * assert(isRecord({ a: 1, b: 2 }) === true);
 * assert(isRecord([1, 2, 3]) === false);
 * ```
 *
 * @example
 * Filtering mixed arrays to find plain objects:
 * ```ts
 * const mixedData: unknown[] = [
 *   { type: 'user', name: 'Alice' },
 *   [1, 2, 3],
 *   'string',
 *   { type: 'admin', permissions: ['read', 'write'] },
 *   new Date(),
 *   null,
 *   { id: 123 }
 * ];
 *
 * const records = mixedData.filter(isRecord);
 * expectType<typeof records, UnknownRecord[]>('=');
 * assert(records.length === 4); // Objects: user, admin, Date, and id objects
 *
 * // Verify the records are valid
 * assert(records.every(record => typeof record === 'object' && record !== null));
 * ```
 *
 * @example
 * Progressive validation of nested structures:
 * ```ts
 * const userData: unknown = {
 *   id: 'user123',
 *   profile: {
 *     name: 'John',
 *     email: 'john@example.com'
 *   }
 * };
 *
 * // First check if it's a record
 * if (isRecord(userData)) {
 *   expectType<typeof userData, UnknownRecord>('=');
 *   assert('id' in userData);
 *   assert('profile' in userData);
 *
 *   // Check nested structure
 *   if (isRecord(userData.profile)) {
 *     expectType<typeof userData.profile, UnknownRecord>('=');
 *     assert('name' in userData.profile);
 *     assert('email' in userData.profile);
 *   }
 * }
 *
 * // Test with invalid data
 * const invalidData: unknown = [1, 2, 3];
 * assert(isRecord(invalidData) === false);
 * ```
 *
 * @example
 * Object transformation and mapping:
 * ```ts
 * function transformRecords(data: readonly unknown[]): Record<string, unknown>[] {
 *   return data
 *     .filter(isRecord)  // Keep only plain objects
 *     .map(record => {
 *       // Transform each record
 *       const transformed: Record<string, unknown> = {};
 *
 *       for (const [key, value] of Object.entries(record)) {
 *         // Apply some transformation logic
 *         transformed[key.toLowerCase()] = value;
 *       }
 *
 *       return transformed;
 *     });
 * }
 *
 * const testData = [{ Name: 'John', AGE: 30 }, 'string', { TYPE: 'user' }];
 * const result = transformRecords(testData);
 * assert(Arr.isArrayOfLength(result, 2));
 * assert(result[0]['name'] === 'John');
 * assert(result[0]['age'] === 30);
 * ```
 *
 * @see {@link isNonNullObject} - For checking any object type (includes arrays)
 * @see {@link hasKey} - For checking if a record has specific keys
 */
export const isRecord = (u: unknown): u is UnknownRecord =>
  isNonNullObject(u) && !Array.isArray(u);
