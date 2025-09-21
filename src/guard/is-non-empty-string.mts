/**
 * Type guard that checks if a value is a non-empty string.
 *
 * This function performs both a type check (ensuring the value is a string) and a length check
 * (ensuring the string is not empty). It acts as a type guard that narrows the input type to
 * exclude `null`, `undefined`, and empty strings.
 *
 * **Type Narrowing Behavior:**
 * - Eliminates `null` and `undefined` from the type
 * - Excludes empty string (`""`) from the type
 * - Preserves literal string types when possible
 * - Whitespace-only strings are considered non-empty
 *
 * @template S - The input type, which can include `string`, `null`, or `undefined`
 * @param s - The value to check
 * @returns `true` if `s` is a string with length > 0, `false` otherwise.
 *          When `true`, TypeScript narrows the type to exclude empty strings and nullish values.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-empty-string/isnonemptystring-example-1.mts|Sample code}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-empty-string/isnonemptystring-example-2.mts|Sample code 2}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-empty-string/isnonemptystring-example-3.mts|Sample code 3}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-empty-string/isnonemptystring-example-4.mts|Sample code 4}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/guard/is-non-empty-string/isnonemptystring-example-5.mts|Sample code 5}.
 */
export const isNonEmptyString = <S extends string | null | undefined>(
  s: S,
): s is RelaxedExclude<NonNullable<S>, ''> =>
  typeof s === 'string' && s.length > 0;
