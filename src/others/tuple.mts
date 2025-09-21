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
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-1.mts|Sample code}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-2.mts|Sample code 2}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-3.mts|Sample code 3}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-4.mts|Sample code 4}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-5.mts|Sample code 5}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-6.mts|Sample code 6}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/tuple/tp-example-7.mts|Sample code 7}.
 *
 * @see https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
 */
export const tp = <const T extends readonly unknown[]>(
  ...args: T
): Readonly<T> => args;
