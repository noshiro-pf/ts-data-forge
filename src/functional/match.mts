import { expectType } from '../expect-type.mjs';
import { keyIsIn } from '../guard/index.mjs';

/**
 * Type-safe pattern matching function for string-based discriminated unions.
 *
 * Provides compile-time guarantees for exhaustive case handling when working with
 * literal string unions. Automatically enforces completeness checking when all
 * cases are covered, and requires a default value when cases are incomplete.
 *
 * ## Key Features:
 * - **Exhaustive Matching**: When all cases of a literal union are handled, no default value is needed
 * - **Partial Matching**: When cases are incomplete or working with general string types, a default value is required
 * - **Type Safety**: Prevents extra cases and ensures only valid keys are used
 * - **Strict Property Checking**: Rejects objects with unexpected properties
 *
 * @param target - The value to match against
 * @param cases - Object mapping possible values to their corresponding results
 * @param defaultValue - Fallback value (required when not all cases are covered)
 * @returns The matched result or default value
 *
 * @example
 * Exhaustive matching (no default needed):
 * ```ts
 * type Status = 'loading' | 'success' | 'error';
 * const status: Status = 'loading';
 *
 * const message = match(status, {
 *   loading: 'Please wait...',
 *   success: 'Operation completed!',
 *   error: 'Something went wrong',
 * } as const);
 * // Type: string
 * assert(message === 'Please wait...');
 * ```
 *
 * @example
 * Partial matching (default required):
 * ```ts
 * type Priority = 'low' | 'medium' | 'high' | 'critical';
 * const priority: Priority = 'medium';
 *
 * const color = match(priority, {
 *   high: 'red',
 *   critical: 'darkred',
 * } as const, 'gray'); // Default required for uncovered cases
 * // Type: 'red' | 'darkred' | 'gray'
 * assert(color === 'gray');
 * ```
 *
 * @example
 * Working with general string types:
 * ```ts
 * const userInput: string = 'unknown';
 *
 * const route = match(userInput, {
 *   'home': '/',
 *   'about': '/about',
 *   'contact': '/contact'
 * }, '/404'); // Default required for string type
 * // Type: '/' | '/about' | '/contact' | '/404'
 * assert(route === '/404');
 * ```
 *
 * @example
 * HTTP status code handling:
 * ```ts
 * type HttpStatus = 200 | 404 | 500;
 * const status: HttpStatus = 404;
 *
 * const response = match(String(status), {
 *   '200': { ok: true, message: 'Success' },
 *   '404': { ok: false, message: 'Not Found' },
 *   '500': { ok: false, message: 'Server Error' }
 * });
 * // All cases covered, no default needed
 * assert.deepStrictEqual(response, { ok: false, message: 'Not Found' });
 * ```
 *
 * @example
 * Complex discriminated union handling:
 * ```ts
 * type ApiResponse =
 *   | { status: 'loading' }
 *   | { status: 'success'; data: string }
 *   | { status: 'error'; error: string };
 *
 * const handleResponse = (response: ApiResponse): string =>
 *   match(response.status, {
 *     loading: 'Please wait...',
 *     success: 'Data loaded successfully!',
 *     error: 'Failed to load data'
 *   });
 *
 * const response: ApiResponse = { status: 'loading' };
 * assert(handleResponse(response) === 'Please wait...');
 * ```
 *
 * @example
 * Advanced usage with functional composition:
 * ```ts
 * // Creating reusable matchers
 * const logLevelToColor = (level: string): string => match(level, {
 *   'debug': 'gray',
 *   'info': 'blue',
 *   'warn': 'yellow',
 *   'error': 'red'
 * }, 'black'); // Default for unknown levels
 *
 * const logLevelToIcon = (level: string): string => match(level, {
 *   'debug': '🐛',
 *   'info': 'ℹ️',
 *   'warn': '⚠️',
 *   'error': '❌'
 * }, '📝');
 *
 * // Combining matchers
 * const formatLogEntry = (level: string, message: string): { color: string; icon: string; text: string } => ({
 *   color: logLevelToColor(level),
 *   icon: logLevelToIcon(level),
 *   text: `${logLevelToIcon(level)} ${message}`
 * });
 *
 * assert(logLevelToColor('error') === 'red');
 * assert(logLevelToIcon('info') === 'ℹ️');
 * assert(logLevelToColor('unknown') === 'black');
 * assert(formatLogEntry('error', 'Test').color === 'red');
 * ```
 *
 */
export function match<
  const Case extends string,
  const R extends ReadonlyRecord<Case, unknown>,
>(target: Case, cases: StrictPropertyCheck<R, Case>): R[Case];

export function match<
  const Case extends string,
  const R extends UnknownRecord,
  const D,
>(
  target: Case,
  cases: StrictPropertyCheck<R, Case>,
  defaultValue: IsLiteralUnionFullyCovered<Case, R> extends true ? never : D,
): ValueOf<R> | D;

export function match<
  const Case extends string,
  const R extends UnknownRecord,
  const D,
>(
  ...args:
    | readonly [target: Case, cases: R]
    | readonly [target: Case, cases: R, defaultValue: D]
): ValueOf<R> | D {
  switch (args.length) {
    case 2: {
      const [target, cases] = args;
      return cases[target];
    }
    case 3: {
      const [target, cases, defaultValue] = args;
      if (keyIsIn(target, cases)) {
        return cases[target];
      } else {
        return defaultValue;
      }
    }
  }
}

/**
 * @internal
 * Helper type to ensure that an object `T` only contains keys specified in `ExpectedKeys`.
 * If `T` has any keys not in `ExpectedKeys`, this type resolves to `never`.
 * @template T The object type to check.
 * @template ExpectedKeys The union of string literal types representing the allowed keys.
 */
type StrictPropertyCheck<T, ExpectedKeys extends PropertyKey> =
  RelaxedExclude<keyof T, ExpectedKeys> extends never ? T : never;

/**
 * @internal
 * Helper type to check if all cases in `Case` union are fully covered by keys in `R`.
 * This checks bidirectional coverage: all Case members are in R, and no extra keys.
 * @template Case A union of string literal types representing the possible cases.
 * @template R A record type.
 */
type AllCasesCovered<Case extends PropertyKey, R> =
  TypeEq<Case, keyof R> extends true ? true : false;

expectType<AllCasesCovered<'a' | 'b', { a: 1; b: 2 }>, true>('=');
expectType<AllCasesCovered<'a' | 'b' | 'c', { a: 1; b: 2 }>, false>('=');
expectType<AllCasesCovered<'a' | 'b', { a: 1; b: 2; c: 3 }>, false>('=');
expectType<AllCasesCovered<string, Record<string, string>>, true>('=');

/**
 * @internal
 * Helper type to check if Case is a literal union type and all cases are covered.
 * @template Case A union of string literal types.
 * @template R A record type.
 */
type IsLiteralUnionFullyCovered<
  Case extends PropertyKey,
  R extends UnknownRecord,
> =
  TypeEq<IsLiteralType<Case>, true> extends true
    ? AllCasesCovered<Case, R>
    : false;

expectType<IsLiteralUnionFullyCovered<'a' | 'b', { a: 1; b: 2 }>, true>('=');
expectType<IsLiteralUnionFullyCovered<'a' | 'b' | 'c', { a: 1; b: 2 }>, false>(
  '=',
);
expectType<IsLiteralUnionFullyCovered<'a' | 'b', { a: 1; b: 2; c: 3 }>, false>(
  '=',
);
expectType<IsLiteralUnionFullyCovered<string, Record<string, string>>, false>(
  '=',
);
expectType<
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  IsLiteralUnionFullyCovered<'a' | 'b' | string, { a: 1; b: 2 }>,
  false
>('=');

/**
 * @internal
 * Helper type to determine if a given PropertyKey `T` is a literal type (e.g., 'a', 1)
 * or a general type (e.g., string, number).
 * @template T The PropertyKey type to check.
 * @returns `true` if `T` is a literal type, `false` otherwise.
 */
type IsLiteralType<T extends PropertyKey> = string extends T
  ? false
  : number extends T
    ? false
    : symbol extends T
      ? false
      : true;

expectType<IsLiteralType<'a' | 'b'>, true>('=');
expectType<IsLiteralType<'a'>, true>('=');
expectType<IsLiteralType<string>, false>('=');
expectType<IsLiteralType<number>, false>('=');
expectType<IsLiteralType<1>, true>('=');
expectType<IsLiteralType<number | 'aa'>, false>('=');
expectType<IsLiteralType<'aa' | 32>, true>('=');
