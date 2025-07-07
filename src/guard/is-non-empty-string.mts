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
 * @example
 * Basic usage with different string types:
 * ```ts
 * assert(isNonEmptyString("hello") === true);    // true
 * assert(isNonEmptyString(" ") === true);        // true (whitespace is considered non-empty)
 * assert(isNonEmptyString("\t\n") === true);     // true (whitespace characters are non-empty)
 * assert(isNonEmptyString("") === false);        // false
 * assert(isNonEmptyString(null) === false);      // false
 * assert(isNonEmptyString(undefined) === false); // false
 * ```
 *
 * @example
 * Type guard usage with nullable strings:
 * ```ts
 * const userInput: string | null | undefined = 'hello';
 *
 * if (isNonEmptyString(userInput)) {
 *   // userInput is now typed as non-empty string
 *   assert(userInput.charAt(0) === 'h');   // Safe to access string methods
 *   assert(userInput.toUpperCase() === 'HELLO'); // No need for null checks
 *   const length = userInput.length;       // Guaranteed to be > 0
 *   assert(length === 5);
 * } else {
 *   assert(false); // should not reach here
 * }
 * ```
 *
 * @example
 * Working with literal string types:
 * ```ts
 * type Status = "active" | "inactive" | "" | null;
 * const status: Status = "active";
 *
 * if (isNonEmptyString(status)) {
 *   // status is now typed as "active" | "inactive"
 *   assert(status === "active" || status === "inactive");
 * }
 * ```
 *
 * @example
 * Form validation patterns:
 * ```ts
 * interface FormData {
 *   name?: string;
 *   email?: string;
 *   phone?: string;
 * }
 *
 * function validateForm(data: FormData): string[] {
 *   const errors: string[] = [];
 *
 *   if (!isNonEmptyString(data.name)) {
 *     errors.push('Name is required');
 *   }
 *
 *   if (!isNonEmptyString(data.email)) {
 *     errors.push('Email is required');
 *   } else if (!data.email.includes('@')) {
 *     // Safe to access string methods after guard
 *     errors.push('Invalid email format');
 *   }
 *
 *   return errors;
 * }
 * ```
 *
 * @example
 * Filtering arrays of potentially empty strings:
 * ```ts
 * const responses: (string | null | undefined)[] = [
 *   "hello",
 *   "",
 *   "world",
 *   null,
 *   undefined,
 *   " "
 * ];
 *
 * const validResponses = responses.filter(isNonEmptyString);
 * // validResponses is now string[] containing ["hello", "world", " "]
 *
 * validResponses.forEach(response => {
 *   // Each response is guaranteed to be a non-empty string
 *   console.log(response.trim().toUpperCase());
 * });
 * ```
 *
 */
export const isNonEmptyString = <S extends string | null | undefined>(
  s: S,
): s is RelaxedExclude<NonNullable<S>, ''> =>
  typeof s === 'string' && s.length > 0;
