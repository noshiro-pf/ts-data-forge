/**
 * Type guard that checks if a value is `undefined`.
 *
 * **Type Narrowing Behavior:**
 * - Narrows the input type to `undefined` when `true`
 * - Useful for explicit undefined checks
 *
 * @param u - The value to check
 * @returns `true` if `u` is `undefined`, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `undefined`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isundefined-example-1.mts|Sample code}.
 */
export const isUndefined = (u: unknown): u is undefined => u === undefined;

/**
 * Type guard that checks if a value is not `undefined`.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `undefined` from the input type when `true`
 * - Preserves all other types in the union
 * - Commonly used to filter out undefined values
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not `undefined`, `false` otherwise.
 *          When `true`, TypeScript excludes `undefined` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotundefined-example-1.mts|Sample code}.
 */
export const isNotUndefined = <T,>(u: T): u is RelaxedExclude<T, undefined> =>
  u !== undefined;

/**
 * Type guard that checks if a value is a boolean.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `boolean` when `true`
 * - Preserves literal boolean types (`true | false`)
 *
 * @param u - The value to check
 * @returns `true` if `u` is a boolean, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `boolean`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isboolean-example-1.mts|Sample code}.
 */
export const isBoolean = (u: unknown): u is boolean => typeof u === 'boolean';

/**
 * Type guard that checks if a value is not a boolean.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `boolean` from the input type when `true`
 * - Preserves all other types in the union
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not a boolean, `false` otherwise.
 *          When `true`, TypeScript excludes `boolean` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotboolean-example-1.mts|Sample code}.
 */
export const isNotBoolean = <T,>(u: T): u is RelaxedExclude<T, boolean> =>
  typeof u !== 'boolean';

/**
 * Type guard that checks if a value is a number.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `number` when `true`
 * - Includes `NaN`, `Infinity`, and `-Infinity` as valid numbers
 * - Preserves literal number types when possible
 *
 * @param u - The value to check
 * @returns `true` if `u` is a number, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `number`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnumber-example-1.mts|Sample code}.
 */
export const isNumber = (u: unknown): u is number => typeof u === 'number';

/**
 * Type guard that checks if a value is not a number.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `number` from the input type when `true`
 * - Preserves all other types in the union
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not a number, `false` otherwise.
 *          When `true`, TypeScript excludes `number` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotnumber-example-1.mts|Sample code}.
 */
export const isNotNumber = <T,>(u: T): u is RelaxedExclude<T, number> =>
  typeof u !== 'number';

/**
 * Type guard that checks if a value is a bigint.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `bigint` when `true`
 * - Identifies values created with `BigInt()` constructor or `n` suffix
 *
 * @param u - The value to check
 * @returns `true` if `u` is a bigint, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `bigint`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isbigint-example-1.mts|Sample code}.
 */
export const isBigint = (u: unknown): u is bigint => typeof u === 'bigint';

/**
 * Type guard that checks if a value is not a bigint.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `bigint` from the input type when `true`
 * - Preserves all other types in the union
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not a bigint, `false` otherwise.
 *          When `true`, TypeScript excludes `bigint` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotbigint-example-1.mts|Sample code}.
 */
export const isNotBigint = <T,>(u: T): u is RelaxedExclude<T, bigint> =>
  typeof u !== 'bigint';

/**
 * Type guard that checks if a value is a string.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `string` when `true`
 * - Preserves literal string types when possible
 * - Includes empty strings
 *
 * @param u - The value to check
 * @returns `true` if `u` is a string, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `string`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isstring-example-1.mts|Sample code}.
 */
export const isString = (u: unknown): u is string => typeof u === 'string';

/**
 * Type guard that checks if a value is not a string.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `string` from the input type when `true`
 * - Preserves all other types in the union
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not a string, `false` otherwise.
 *          When `true`, TypeScript excludes `string` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotstring-example-1.mts|Sample code}.
 */
export const isNotString = <T,>(u: T): u is RelaxedExclude<T, string> =>
  typeof u !== 'string';

/**
 * Type guard that checks if a value is a symbol.
 *
 * **Type Narrowing Behavior:**
 * - Narrows `unknown` to `symbol` when `true`
 * - Identifies values created with `Symbol()` constructor
 *
 * @param u - The value to check
 * @returns `true` if `u` is a symbol, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `symbol`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/issymbol-example-1.mts|Sample code}.
 */
export const isSymbol = (u: unknown): u is symbol => typeof u === 'symbol';

/**
 * Type guard that checks if a value is not a symbol.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `symbol` from the input type when `true`
 * - Preserves all other types in the union
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not a symbol, `false` otherwise.
 *          When `true`, TypeScript excludes `symbol` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotsymbol-example-1.mts|Sample code}.
 */
export const isNotSymbol = <T,>(u: T): u is RelaxedExclude<T, symbol> =>
  typeof u !== 'symbol';

/**
 * Type guard that checks if a value is `null`.
 *
 * **Type Narrowing Behavior:**
 * - Narrows the input type to `null` when `true`
 * - Useful for explicit null checks
 *
 * @param u - The value to check
 * @returns `true` if `u` is `null`, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `null`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnull-example-1.mts|Sample code}.
 */
export const isNull = (u: unknown): u is null => u === null;

/**
 * Type guard that checks if a value is not `null`.
 *
 * **Type Narrowing Behavior:**
 * - Excludes `null` from the input type when `true`
 * - Preserves all other types including `undefined`
 * - Commonly used to filter out null values
 *
 * @template T - The type of the input value (which could be `null`)
 * @param u - The value to check
 * @returns `true` if `u` is not `null`, `false` otherwise.
 *          When `true`, TypeScript excludes `null` from the type.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnotnull-example-1.mts|Sample code}.
 */
export const isNotNull = <T,>(u: T | null): u is T => u !== null;

/**
 * Type guard that checks if a value is `null` or `undefined` (nullish).
 *
 * This function uses the loose equality operator (`==`) to check for both `null` and `undefined`
 * in a single comparison, which is the standard JavaScript idiom for nullish checks.
 *
 * **Type Narrowing Behavior:**
 * - Narrows the input type to `null | undefined` when `true`
 * - Useful for checking if a value is "nullish" (either null or undefined)
 *
 * @param u - The value to check
 * @returns `true` if `u` is `null` or `undefined`, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `null | undefined`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnullish-example-1.mts|Sample code}.
 */
export const isNullish = (u: unknown): u is null | undefined => u == null;

/**
 * Type guard that checks if a value is not `null` or `undefined` (non-nullish).
 *
 * This function uses the loose inequality operator (`!=`) to check that a value is neither
 * `null` nor `undefined` in a single comparison. This is equivalent to TypeScript's
 * `NonNullable<T>` utility type.
 *
 * **Type Narrowing Behavior:**
 * - Excludes both `null` and `undefined` from the input type when `true`
 * - Equivalent to applying TypeScript's `NonNullable<T>` utility type
 * - Commonly used to filter out nullish values from arrays
 *
 * @template T - The type of the input value
 * @param u - The value to check
 * @returns `true` if `u` is not `null` and not `undefined`, `false` otherwise.
 *          When `true`, TypeScript narrows the type to `NonNullable<T>`.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnonnullish-example-1.mts|Sample code}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-type/isnonnullish-example-2.mts|Sample code 2}.
 */
export const isNonNullish = <T,>(u: T): u is NonNullable<T> => u != null;
