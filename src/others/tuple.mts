/**
 * Creates a readonly tuple with precise literal type inference.
 * A shorthand for `[a, b, c] as const` written as `tp(a, b, c)`.
 *
 * @template T - A tuple type with literal types inferred from the arguments
 * @param args - The elements to include in the tuple
 * @returns A readonly tuple containing the provided arguments with preserved literal types
 *
 * @example
 * ```ts
 * // Instead of [1, 'hello', true] as const
 * const tuple = tp(1, 'hello', true); // readonly [1, 'hello', true]
 * const coords = tp(10, 20); // readonly [10, 20]
 * const empty = tp(); // readonly []
 *
 * assert(tuple[0] === 1);
 * assert(tuple[1] === 'hello');
 * assert(coords.length === 2);
 * assert(empty.length === 0);
 * ```
 *
 */
export const tp = <const T extends readonly unknown[]>(
  ...args: T
): Readonly<T> => args;
