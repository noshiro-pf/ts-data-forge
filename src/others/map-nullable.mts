/**
 * Applies a function to a value if the value is not `null` or `undefined`.
 * If the value is `null` or `undefined`, it returns `undefined`.
 *
 * This function provides a safe way to transform nullable values without explicit null checks.
 * It's similar to Optional.map() but works directly with TypeScript's nullable types.
 * Supports both regular and curried usage for functional composition.
 *
 * @template A - The type of the input value (excluding null/undefined)
 * @template B - The type of the value returned by the mapping function
 * @param value - The value to potentially transform (can be `A`, `null`, or `undefined`)
 * @param mapFn - A function that transforms a non-nullable value of type `A` to type `B`
 * @returns The result of applying `mapFn` to `value` if value is not null/undefined; otherwise `undefined`
 *
 * @example Basic usage with nullable values
 * ```typescript
 * // Safe string transformation
 * mapNullable("hello", s => s.toUpperCase()); // "HELLO"
 * mapNullable(null, s => s.toUpperCase()); // undefined
 * mapNullable(undefined, s => s.toUpperCase()); // undefined
 *
 * // Number operations
 * mapNullable(5, n => n * 2); // 10
 * mapNullable(0, n => n * 2); // 0 (note: 0 is not null/undefined)
 * mapNullable(null as number | null, n => n * 2); // undefined
 * ```
 *
 * @example Working with optional object properties
 * ```typescript
 * interface User {
 *   id: number;
 *   name?: string;
 *   email?: string;
 * }
 *
 * function formatUserDisplay(user: User): string {
 *   const displayName = mapNullable(user.name, name => name.toUpperCase()) ?? 'Anonymous';
 *   const emailDomain = mapNullable(user.email, email => email.split('@')[1]);
 *
 *   return `${displayName} ${emailDomain ? `(${emailDomain})` : ''}`;
 * }
 *
 * formatUserDisplay({ id: 1, name: 'John', email: 'john@example.com' }); // "JOHN (example.com)"
 * formatUserDisplay({ id: 2 }); // "Anonymous "
 * ```
 *
 * @example Curried usage for functional composition
 * ```typescript
 * // Create reusable transformers
 * const toUpperCase = mapNullable((s: string) => s.toUpperCase());
 * const addPrefix = mapNullable((s: string) => `PREFIX_${s}`);
 * const parseNumber = mapNullable((s: string) => parseInt(s, 10));
 *
 * // Use in different contexts
 * toUpperCase("hello"); // "HELLO"
 * toUpperCase(null); // undefined
 *
 * // Compose transformations
 * const processString = (s: string | null) => {
 *   const upper = toUpperCase(s);
 *   return addPrefix(upper);
 * };
 *
 * processString("test"); // "PREFIX_TEST"
 * processString(null); // undefined
 * ```
 *
 * @example Chaining nullable operations
 * ```typescript
 * // API response handling
 * interface ApiResponse {
 *   data?: {
 *     user?: {
 *       profile?: {
 *         displayName?: string;
 *       };
 *     };
 *   };
 * }
 *
 * function getDisplayName(response: ApiResponse): string | undefined {
 *   return mapNullable(
 *     response.data?.user?.profile?.displayName,
 *     name => name.trim().toUpperCase()
 *   );
 * }
 *
 * // Chain multiple transformations
 * function processNullableChain(value: string | null): string | undefined {
 *   const step1 = mapNullable(value, v => v.trim());
 *   const step2 = mapNullable(step1, v => v.length > 0 ? v : null);
 *   const step3 = mapNullable(step2, v => v.toUpperCase());
 *   return step3;
 * }
 * ```
 *
 * @example Integration with array methods
 * ```typescript
 * const nullableNumbers: (number | null | undefined)[] = [1, null, 3, undefined, 5];
 *
 * // Transform and filter in one step
 * const doubled = nullableNumbers
 *   .map(n => mapNullable(n, x => x * 2))
 *   .filter((n): n is number => n !== undefined);
 * // Result: [2, 6, 10]
 *
 * // Process optional array elements
 * const users: Array<{ name?: string }> = [
 *   { name: 'Alice' },
 *   { name: undefined },
 *   { name: 'Bob' }
 * ];
 *
 * const upperNames = users
 *   .map(u => mapNullable(u.name, n => n.toUpperCase()))
 *   .filter((n): n is string => n !== undefined);
 * // Result: ['ALICE', 'BOB']
 * ```
 *
 * @example Error handling patterns
 * ```typescript
 * // Safe JSON parsing
 * function parseJsonSafe<T>(json: string | null): T | undefined {
 *   return mapNullable(json, j => {
 *     try {
 *       return JSON.parse(j) as T;
 *     } catch {
 *       return null;
 *     }
 *   }) ?? undefined;
 * }
 *
 * // Safe property access with computation
 * function calculateAge(birthYear: number | null): string | undefined {
 *   return mapNullable(birthYear, year => {
 *     const age = new Date().getFullYear() - year;
 *     return age >= 0 ? `${age} years old` : null;
 *   }) ?? undefined;
 * }
 * ```
 *
 * @see Optional - For more complex optional value handling
 * @see Result - For error handling with detailed error information
 */
export function mapNullable<const A, const B>(
  value: A | null | undefined,
  mapFn: (v: A) => B,
): B | undefined;

// Curried version
export function mapNullable<const A, const B>(
  mapFn: (v: A) => B,
): (value: A | null | undefined) => B | undefined;

export function mapNullable<const A, const B>(
  ...args:
    | readonly [value: A | null | undefined, mapFn: (v: A) => B]
    | readonly [mapFn: (v: A) => B]
): (B | undefined) | ((value: A | null | undefined) => B | undefined) {
  switch (args.length) {
    case 2: {
      const [value, mapFn] = args;
      return value == null ? undefined : mapFn(value);
    }
    case 1: {
      const [mapFn] = args;
      return (value: A | null | undefined) => mapNullable(value, mapFn);
    }
  }
}
