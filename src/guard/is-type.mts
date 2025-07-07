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
 * @example
 * ```ts
 * const value = undefined as string | undefined;
 *
 * if (isUndefined(value)) {
 *   expectType<typeof value, undefined>('=');
 *   assert(value === undefined);
 * } else {
 *   expectType<typeof value, string>('=');
 *   assert(value.length > 0);
 * }
 *
 * const definedValue: string | undefined = 'hello';
 * assert(!isUndefined(definedValue));
 * assert(isUndefined(undefined));
 * ```
 *
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
 * @example
 * ```ts
 * const items: readonly (string | undefined)[] = [
 *   'a',
 *   undefined,
 *   'b',
 *   undefined,
 *   'c',
 * ];
 *
 * const definedItems = items.filter(isNotUndefined);
 * expectType<typeof definedItems, string[]>('=');
 * assert(definedItems.length === 3);
 * assert(definedItems.every((item) => typeof item === 'string'));
 *
 * definedItems.forEach((item) => {
 *   expectType<typeof item, string>('=');
 *   assert(item.toUpperCase().length > 0);
 * });
 * ```
 *
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
 * @example
 * ```ts
 * const userInput: unknown = true;
 *
 * if (isBoolean(userInput)) {
 *   expectType<typeof userInput, boolean>('=');
 *   assert(typeof userInput === 'boolean');
 * }
 *
 * assert(isBoolean(true));
 * assert(isBoolean(false));
 * assert(!isBoolean('true'));
 * assert(!isBoolean(1));
 * ```
 *
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
 * @example
 * ```ts
 * type MixedValue = string | number | boolean;
 * const value = 'hello' as MixedValue;
 *
 * if (isNotBoolean(value)) {
 *   expectType<typeof value, string | number>('=');
 *   assert(typeof value === 'string' || typeof value === 'number');
 * }
 *
 * assert(isNotBoolean('hello'));
 * assert(isNotBoolean(42));
 * assert(!isNotBoolean(true));
 * ```
 *
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
 * @example
 * ```ts
 * const userInput: unknown = 42;
 *
 * if (isNumber(userInput)) {
 *   expectType<typeof userInput, number>('=');
 *   assert(userInput.toFixed(2) === '42.00');
 *
 *   // Note: this includes NaN and Infinity
 *   if (Number.isFinite(userInput)) {
 *     assert(userInput === 42);
 *   }
 * }
 *
 * assert(isNumber(42));
 * assert(isNumber(Number.NaN));
 * assert(isNumber(Number.POSITIVE_INFINITY));
 * assert(!isNumber('42'));
 * ```
 *
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
 * @example
 * ```ts
 * type Value = string | number | boolean;
 * const values: readonly Value[] = ['hello', 42, true, 3.14, false];
 *
 * const nonNumbers = values.filter(isNotNumber);
 * expectType<typeof nonNumbers, (string | boolean)[]>('=');
 * assert(nonNumbers.length === 3);
 * assert(nonNumbers.every((val) => typeof val !== 'number'));
 * ```
 *
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
 * @example
 * ```ts
 * const userInput: unknown = 123n;
 *
 * if (isBigint(userInput)) {
 *   expectType<typeof userInput, bigint>('=');
 *   assert(userInput.toString() === '123');
 *   const doubled = userInput * 2n; // Safe bigint operations
 *   assert(doubled === 246n);
 * }
 *
 * assert(isBigint(123n));
 * assert(!isBigint(123));
 * assert(!isBigint('123'));
 * ```
 *
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
 * @example
 * ```ts
 * type NumericValue = number | bigint;
 * const value: NumericValue = 42;
 *
 * if (isNotBigint(value)) {
 *   expectType<typeof value, number>('=');
 *   assert(value.toFixed(2) === '42.00');
 * }
 *
 * assert(isNotBigint(42));
 * assert(!isNotBigint(42n));
 * ```
 *
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
 * @example
 * ```ts
 * const userInput: unknown = 'hello';
 *
 * if (isString(userInput)) {
 *   expectType<typeof userInput, string>('=');
 *   assert(userInput.length === 5);
 *   assert(userInput.toUpperCase() === 'HELLO');
 *
 *   // You can further check for non-empty strings
 *   if (userInput.length > 0) {
 *     assert(userInput === 'hello');
 *   }
 * }
 *
 * assert(isString('hello'));
 * assert(isString(''));
 * assert(!isString(123));
 * ```
 *
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
 * @example
 * ```ts
 * type Value = string | number | boolean;
 * const mixedValues: readonly Value[] = ['hello', 42, true, 'world', 3.14];
 *
 * const nonStrings = mixedValues.filter(isNotString);
 * expectType<typeof nonStrings, (number | boolean)[]>('=');
 * assert(nonStrings.length === 3);
 * assert(nonStrings.every((val) => typeof val !== 'string'));
 * ```
 *
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
 * @example
 * ```ts
 * const userInput: unknown = Symbol('test');
 *
 * if (isSymbol(userInput)) {
 *   expectType<typeof userInput, symbol>('=');
 *   assert(userInput.description === 'test');
 *   assert(userInput.toString() === 'Symbol(test)');
 * }
 *
 * assert(isSymbol(Symbol()));
 * assert(isSymbol(Symbol('key')));
 * assert(!isSymbol('string'));
 * assert(!isSymbol(42));
 * ```
 *
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
 * @example
 * ```ts
 * type PropertyKey = string | number | symbol;
 * const key = 'name' as PropertyKey;
 *
 * if (isNotSymbol(key)) {
 *   expectType<typeof key, string | number>('=');
 *   assert(typeof key === 'string' || typeof key === 'number');
 * }
 *
 * assert(isNotSymbol('key'));
 * assert(isNotSymbol(42));
 * assert(!isNotSymbol(Symbol('test')));
 * ```
 *
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
 * @example
 * ```ts
 * const value = null as string | null;
 *
 * if (isNull(value)) {
 *   expectType<typeof value, null>('=');
 *   assert(value === null);
 * } else {
 *   expectType<typeof value, string>('=');
 *   assert(value.length >= 0);
 * }
 *
 * const stringValue: string | null = 'hello';
 * if (isNull(stringValue)) {
 *   assert(false); // should not reach here
 * } else {
 *   expectType<typeof stringValue, string>('=');
 *   assert(stringValue.length === 5);
 * }
 *
 * assert(isNull(null));
 * assert(!isNull(undefined));
 * assert(!isNull('string'));
 * ```
 *
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
 * @example
 * ```ts
 * const items: readonly (string | null)[] = ['a', null, 'b', null, 'c'];
 *
 * const nonNullItems = items.filter(isNotNull);
 * expectType<typeof nonNullItems, string[]>('=');
 * assert(nonNullItems.length === 3);
 * assert(nonNullItems.every((item) => typeof item === 'string'));
 *
 * nonNullItems.forEach((item) => {
 *   expectType<typeof item, string>('=');
 *   assert(item.toUpperCase().length > 0);
 * });
 * ```
 *
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
 * @example
 * ```ts
 * const value = null as string | null | undefined;
 *
 * if (isNullish(value)) {
 *   expectType<typeof value, null | undefined>('=');
 *   assert(value === null || value === undefined);
 * } else {
 *   expectType<typeof value, string>('=');
 *   assert(value.length >= 0);
 * }
 *
 * const undefinedValue: string | null | undefined = undefined;
 * assert(isNullish(undefinedValue));
 * assert(isNullish(null));
 * assert(!isNullish('hello'));
 * ```
 *
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
 * @example
 * ```ts
 * const items: readonly (string | null | undefined)[] = [
 *   'hello',
 *   null,
 *   'world',
 *   undefined,
 *   'test',
 * ];
 *
 * const definedItems = items.filter(isNonNullish);
 * expectType<typeof definedItems, string[]>('=');
 * assert(definedItems.length === 3);
 * assert(definedItems.every((item) => typeof item === 'string'));
 *
 * definedItems.forEach((item) => {
 *   expectType<typeof item, string>('=');
 *   assert(item.toUpperCase().length > 0);
 * });
 * ```
 *
 * @example
 * ```ts
 * // Progressive validation with optional chaining alternative
 * type User = DeepReadonly<{
 *   profile?: {
 *     name?: string;
 *     email?: string;
 *   };
 * }>;
 *
 * const user: User = { profile: { name: 'John', email: 'john@example.com' } };
 *
 * // Instead of optional chaining: user.profile?.name
 * if (isNonNullish(user.profile) && isNonNullish(user.profile.name)) {
 *   expectType<typeof user.profile.name, string>('=');
 *   assert(user.profile.name.toUpperCase() === 'JOHN');
 * }
 *
 * assert(isNonNullish('hello'));
 * assert(isNonNullish(42));
 * assert(!isNonNullish(null));
 * assert(!isNonNullish(undefined));
 * ```
 *
 */
export const isNonNullish = <T,>(u: T): u is NonNullable<T> => u != null;
