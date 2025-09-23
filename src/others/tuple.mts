/**
 * Creates a readonly tuple from the given arguments with precise literal type inference.
 *
 * This utility function provides a concise way to create tuples while preserving
 * exact literal types. Without this function, TypeScript would infer arrays with
 * widened types instead of tuples with literal types.
 *
 * **Key benefits:**
 * - Preserves literal types (e.g., `1` instead of `number`)
 * - Creates readonly tuples for immutability
 * - Provides better type inference than array literals
 * - Zero runtime overhead - just returns the arguments
 *
 * @template T - A tuple type with literal types inferred from the arguments
 * @param args - The elements to include in the tuple (variadic)
 * @returns A readonly tuple containing the provided arguments with preserved literal types
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
 */
export const tp = <const T extends readonly unknown[]>(
  ...args: T
): Readonly<T> => args;
