import { IMap } from '../collections/index.mjs';
import { expectType } from '../expect-type.mjs';
import { Optional, pipe, Result } from '../functional/index.mjs';
import { isString, isUndefined } from '../guard/index.mjs';
import { range as rangeIterator } from '../iterator/index.mjs';
import { asPositiveUint32, asUint32, Num, Uint32 } from '../number/index.mjs';
import { castMutable, tp, unknownToString } from '../others/index.mjs';

/**
 * A comprehensive, immutable utility library for array manipulations in TypeScript.
 * Provides a wide range of functions for array creation, validation, transformation,
 * reduction, slicing, set operations, and more, with a focus on type safety and
 * leveraging TypeScript's type inference capabilities.
 * All functions operate on `readonly` arrays and return new `readonly` arrays,
 * ensuring immutability.
 */
export namespace Arr {
  type ArrayIndex<Ar extends readonly unknown[]> =
    IsFixedLengthList<Ar> extends true ? IndexOfTuple<Ar> : SizeType.Arr;

  type ArgArrayIndex<Ar extends readonly unknown[]> =
    IsFixedLengthList<Ar> extends true ? IndexOfTuple<Ar> : SizeType.ArgArr;

  type ArgArrayIndexWithNegative<Ar extends readonly unknown[]> =
    IsFixedLengthList<Ar> extends true
      ? IndexOfTuple<[...Ar, 0]> | NegativeIndexOfTuple<Ar>
      : SizeType.ArgArrWithNegative;

  /**
   * Returns the size (length) of an array as a type-safe branded integer.
   *
   * This function provides the array length with enhanced type safety through branded types:
   * - For arrays known to be non-empty at compile time: returns `PositiveNumber & SizeType.Arr`
   * - For general arrays that may be empty: returns `SizeType.Arr` (branded Uint32)
   *
   * The returned value is always a non-negative integer that can be safely used for array indexing
   * and size comparisons. The branded type prevents common integer overflow issues and provides
   * better type checking than plain numbers.
   *
   * @template Ar The exact type of the input array, used for precise return type inference.
   * @param array The array to measure. Can be any readonly array type.
   * @returns The length of the array as a branded type:
   *   - `IntersectBrand<PositiveNumber, SizeType.Arr>` for known non-empty arrays
   *   - `SizeType.Arr` for general arrays (branded Uint32, may be 0)
   *
   * @see {@link length} - Alias for this function
   * @see {@link isEmpty} for checking if size is 0
   * @see {@link isNonEmpty} for checking if size > 0
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/size-example.mts|Sample code}.
   */
  export const size = <const Ar extends readonly unknown[]>(
    array: Ar,
  ): Ar extends NonEmptyArray<unknown>
    ? IntersectBrand<PositiveNumber, SizeType.Arr>
    : SizeType.Arr =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array.length as never;

  // type guard

  /**
   * Type guard that checks if a value is an array, excluding types that cannot be arrays.
   * This function refines the type by filtering out non-array types from unions.
   * @template E The input type that may or may not be an array.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-array-example.mts|Sample code}.
   */
  export const isArray = <E,>(value: E): value is FilterArray<E> =>
    Array.isArray(value);

  type FilterArray<T> = T extends T
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      BoolOr<TypeEq<T, unknown>, TypeEq<T, any>> extends true
      ? Cast<readonly unknown[], T>
      : T extends readonly unknown[]
        ? T
        : never // Exclude non-array types
    : never;

  type Cast<A, B> = A extends B ? A : never;

  // validation

  /**
   * Type guard that checks if an array is empty (has no elements).
   *
   * This function serves as both a runtime check and a TypeScript type guard,
   * narrowing the array type to `readonly []` when the check passes. It's useful
   * for conditional logic and type-safe handling of potentially empty arrays.
   *
   * @template E The type of elements in the array.
   * @param array The array to check for emptiness.
   * @returns `true` if the array has length 0, `false` otherwise.
   *   When `true`, TypeScript narrows the type to `readonly []`.
   *
   * @see {@link isNonEmpty} for the opposite check (non-empty arrays)
   * @see {@link size} for getting the exact length
   * @see {@link isArrayOfLength} for checking specific lengths
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-empty-example.mts|Sample code}.
   */
  export const isEmpty = <E,>(array: readonly E[]): array is readonly [] =>
    array.length === 0;

  /**
   * Type guard that checks if an array is non-empty (has at least one element).
   *
   * This function serves as both a runtime check and a TypeScript type guard,
   * narrowing the array type to `NonEmptyArray<E>` when the check passes. This enables
   * safe access to array elements without undefined checks, as TypeScript knows the array
   * has at least one element.
   *
   * @template E The type of elements in the array.
   * @param array The array to check for non-emptiness.
   * @returns `true` if the array has length > 0, `false` otherwise.
   *   When `true`, TypeScript narrows the type to `NonEmptyArray<E>`.
   *
   * @see {@link isEmpty} for the opposite check (empty arrays)
   * @see {@link size} for getting the exact length
   * @see {@link head} for safely getting the first element
   * @see {@link last} for safely getting the last element
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-non-empty-example.mts|Sample code}.
   */
  export const isNonEmpty = <E,>(
    array: readonly E[],
  ): array is NonEmptyArray<E> => array.length > 0;

  /**
   * Checks if an array has a specific length.
   * @template E The type of elements in the array.
   * @template N The expected length of the array (must be a number type).
   * @param array The array to check.
   * @param len The expected length.
   * @returns `true` if the array has the specified length, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-array-of-length-example.mts|Sample code}.
   */
  export const isArrayOfLength = <E, N extends SizeType.ArgArr>(
    array: readonly E[],
    len: N,
  ): array is ArrayOfLength<N, E> => array.length === len;

  /**
   * Checks if an array has at least a specific length.
   * @template E The type of elements in the array.
   * @template N The minimum expected length of the array (must be a number type).
   * @param array The array to check.
   * @param len The minimum expected length.
   * @returns `true` if the array has at least the specified length, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-array-at-least-length-example.mts|Sample code}.
   */
  export const isArrayAtLeastLength = <E, N extends SizeType.ArgArr>(
    array: readonly E[],
    len: N,
  ): array is ArrayAtLeastLen<N, E> => array.length >= len;

  /**
   * Checks if an index is within the valid range of an array (i.e., `0 <= index < array.length`).
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index to check.
   * @returns `true` if the index is within the array bounds, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/index-is-in-range-example.mts|Sample code}.
   */
  export const indexIsInRange = <E,>(
    array: readonly E[],
    index: SizeType.ArgArr,
  ): boolean => Num.isInRange(0, array.length)(index);

  // array creation

  /**
   * Creates an array of zeros with the specified length.
   *
   * This function provides compile-time type safety with precise return types:
   * - When `len` is a compile-time known `SmallUint` (0-100), returns a tuple with exact length
   * - When `len` is a positive runtime value, returns a `NonEmptyArray<0>`
   * - Otherwise, returns a `readonly 0[]` that may be empty
   *
   * @template N The type of the length parameter. When a `SmallUint` literal is provided,
   *   the return type will be a tuple of exactly that length filled with zeros.
   * @param len The length of the array to create. Must be a non-negative integer.
   * @returns An immutable array of zeros. The exact return type depends on the input:
   *   - `ArrayOfLength<N, 0>` when `N` is a `SmallUint` literal
   *   - `NonEmptyArray<0>` when `len` is a positive runtime value
   *   - `readonly 0[]` for general non-negative values
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/zeros-example.mts|Sample code}.
   */
  export const zeros = <N extends SizeType.ArgArr>(
    len: N,
  ): N extends SmallUint
    ? ArrayOfLength<N, 0>
    : N extends SizeType.ArgArrPositive
      ? NonEmptyArray<0>
      : readonly 0[] =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    Array.from<0>({ length: len }).fill(0) as never;

  /**
   * Creates a sequence of consecutive integers from 0 to `len-1`.
   *
   * This function generates index sequences with precise compile-time typing:
   * - When `len` is a compile-time known `SmallUint` (0-100), returns a tuple of consecutive integers
   * - When `len` is a positive runtime value, returns a `NonEmptyArray<SizeType.Arr>`
   * - Otherwise, returns a `readonly SizeType.Arr[]` that may be empty
   *
   * @template N The type of the length parameter. When a `SmallUint` literal is provided,
   *   the return type will be a tuple containing the sequence [0, 1, 2, ..., N-1].
   * @param len The length of the sequence to create. Must be a non-negative integer.
   * @returns An immutable array containing the sequence [0, 1, 2, ..., len-1].
   *   The exact return type depends on the input:
   *   - `Seq<N>` (precise tuple) when `N` is a `SmallUint` literal
   *   - `NonEmptyArray<SizeType.Arr>` when `len` is a positive runtime value
   *   - `readonly SizeType.Arr[]` for general non-negative values
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/seq-example.mts|Sample code}.
   */
  export const seq = <N extends SizeType.ArgArr>(
    len: N,
  ): N extends SmallUint
    ? Seq<N>
    : N extends SizeType.ArgArrPositive
      ? NonEmptyArray<SizeType.Arr>
      : readonly SizeType.Arr[] =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    Array.from({ length: len }, (_, i) => i) as never;

  /**
   * Creates a new array of the specified length, with each position filled with the provided initial value.
   *
   * This function provides compile-time type safety with precise return types and performs shallow copying
   * of the initial value (the same reference is used for all positions):
   * - When `len` is a compile-time known `SmallUint` (0-100), returns a tuple of exactly that length
   * - When `len` is a positive runtime value, returns a `NonEmptyArray<V>`
   * - Otherwise, returns a `readonly V[]` that may be empty
   *
   * @template V The type of the initial value. The `const` constraint preserves literal types.
   * @template N The type of the length parameter when it's a `SmallUint` literal.
   * @param len The length of the array to create. Must be a non-negative integer.
   * @param init The value to fill each position with. The same reference is used for all positions.
   * @returns An immutable array filled with the initial value. The exact return type depends on the length:
   *   - `ArrayOfLength<N, V>` when `len` is a `SmallUint` literal
   *   - `NonEmptyArray<V>` when `len` is a positive runtime value
   *   - `readonly V[]` for general non-negative values
   *
   * @see {@link zeros} for creating arrays filled with zeros
   * @see {@link seq} for creating sequences of consecutive integers
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/create-example.mts|Sample code}.
   */
  export const create = <const V, N extends SizeType.ArgArr>(
    len: N,
    init: V,
  ): N extends SmallUint
    ? ArrayOfLength<N, V>
    : N extends SizeType.ArgArrPositive
      ? NonEmptyArray<V>
      : readonly V[] =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    Array.from({ length: Math.max(0, len) }, () => init) as never;

  /**
   * Creates an array from a generator function.
   *
   * This utility function provides enhanced type safety by constraining the generator function
   * to prevent incorrect return values. The generator can only yield values of type T and
   * must return void, which helps catch common mistakes like returning values instead of yielding.
   *
   * @template T - The type of elements in the generated array
   * @param generatorFn - A function that returns a generator yielding elements of type T
   * @returns A readonly array containing all yielded values from the generator
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/generate-example.mts|Sample code}.
   */
  export const generate = <T,>(
    generatorFn: () => Generator<T, void, unknown>,
  ): readonly T[] => Array.from(generatorFn());

  /**
   * Asynchronously creates an array from an async generator function.
   *
   * This utility function provides enhanced type safety by constraining the async generator function
   * to prevent incorrect return values. The generator can only yield values of type T and
   * must return `void`, which helps catch common mistakes like returning values instead of yielding.
   *
   * @template T The type of elements in the generated array.
   * @param generatorFn A function that returns an async generator yielding elements of type `T`.
   * @returns A promise that resolves to a readonly array containing all yielded values from the async generator.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/generate-async-example.mts|Sample code}.
   */
  export const generateAsync = <T,>(
    generatorFn: () => AsyncGenerator<T, void, unknown>,
  ): Promise<readonly T[]> => Array.fromAsync(generatorFn());

  /**
   * Creates a shallow copy of an array, preserving the exact type signature.
   *
   * This function creates a new array with the same elements as the input, but with a new array reference.
   * Object references within the array are preserved (shallow copy), and the readonly/mutable status
   * of the array type is maintained.
   *
   * @template Ar The exact type of the input array, preserving tuple types, readonly status, and element types.
   * @param array The array to copy. Can be any array type: mutable, readonly, tuple, or general array.
   * @returns A new array that is a shallow copy of the input. The return type exactly matches the input type,
   *   preserving readonly status, tuple structure, and element types.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice | Array.prototype.slice}
   *   The underlying implementation uses `slice()` for efficient shallow copying
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/copy-example.mts|Sample code}.
   */
  export const copy = <const Ar extends readonly unknown[]>(array: Ar): Ar =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array.slice() as unknown as Ar;

  /**
   * @internal
   * Helper type for `range` function to represent a sequence of numbers up to N-1.
   * `LEQ[N]` would be `0 | 1 | ... | N-1`.
   */
  type LT = Readonly<{
    [N in SmallUint]: Index<N>;
  }>;

  /**
   * @internal
   * This type is used to avoid incorrect type calculation results for unions with `Seq`.
   * It computes the type of an array generated by `Arr.range(S, E)`.
   * If `S` or `E` is a union type, it falls back to a more general `readonly number[]` type
   * to prevent overly complex or incorrect tuple/union types.
   * Otherwise, it computes a precise tuple type like `readonly [S, S+1, ..., E-1]`.
   * @template S The start of the range (inclusive), constrained to `SmallUint`.
   * @template E The end of the range (exclusive), constrained to `SmallUint`.
   */
  type RangeList<S extends SmallUint, E extends SmallUint> =
    BoolOr<IsUnion<S>, IsUnion<E>> extends true
      ? readonly RelaxedExclude<LT[E], LT[Min<S>]>[] // Avoid incorrect type calculation for unions with Seq
      : List.Skip<S, Seq<E>>;

  expectType<RangeList<1, 5>, readonly [1, 2, 3, 4]>('=');
  expectType<RangeList<1, 2>, readonly [1]>('=');
  expectType<RangeList<1, 1>, readonly []>('=');
  expectType<RangeList<1, 1 | 3>, readonly (1 | 2)[]>('=');
  expectType<RangeList<1 | 3, 3 | 5>, readonly (1 | 2 | 3 | 4)[]>('=');
  expectType<
    RangeList<1 | 2 | 3, 5 | 6 | 7>,
    readonly (1 | 2 | 3 | 4 | 5 | 6)[]
  >('=');
  expectType<RangeList<5, 1>, readonly []>('=');

  /**
   * Creates an array of numbers within a specified range with optional step increment.
   *
   * This function generates arithmetic sequences with advanced compile-time type inference:
   * - When `start` and `end` are {@link SmallUint} literals and `step` is 1 (or omitted), returns a precise tuple type
   * - When parameters are runtime values, returns appropriate array types based on sign constraints
   * - Empty arrays are returned for invalid ranges (e.g., start ≥ end with positive step)
   * - Never throws exceptions - invalid parameters result in empty arrays
   *
   * **SmallUint Constraint:** The {@link SmallUint} constraint (0-255) enables precise tuple type inference
   * for compile-time known ranges. This allows TypeScript to compute exact tuple types like `readonly [1, 2, 3, 4]`
   * instead of generic `readonly number[]`.
   *
   * **Type Inference Behavior:**
   * - Literal {@link SmallUint} values with step=1 → precise tuple type (`RangeList<S, E>`)
   * - Non-negative parameters → `readonly SafeUint[]`
   * - Mixed signs or negative parameters → `readonly SafeInt[]`
   * - Runtime values → lose precise typing but maintain safety
   *
   * @template S The type of the start value. When a {@link SmallUint} literal (0-255), enables precise tuple typing.
   * @template E The type of the end value. When a {@link SmallUint} literal (0-255), enables precise tuple typing.
   * @param start The start of the range (inclusive). Must be a safe integer. Supports:
   *   - **Literal {@link SmallUint}:** Enables precise tuple types (0-255)
   *   - **Runtime {@link SafeInt}:** Fallback to general array types
   *   - **Negative values:** Supported for countdown sequences
   * @param end The end of the range (exclusive). Must be a safe integer. Supports:
   *   - **Literal {@link SmallUint}:** Enables precise tuple types (0-255)
   *   - **Runtime {@link SafeInt}:** Fallback to general array types
   *   - **Equal to start:** Results in empty array
   * @param step The step increment (default: 1). Must be a non-zero safe integer.
   *   - **Positive step:** generates increasing sequence from start to end
   *   - **Negative step:** generates decreasing sequence from start to end
   *   - **Zero step:** Not allowed (branded type prevents this)
   * @returns An immutable array containing the arithmetic sequence. Return type depends on parameters:
   *   - `RangeList<S, E>` (precise tuple like `readonly [1, 2, 3, 4]`) when `S` and `E` are {@link SmallUint} literals and step is 1
   *   - `readonly SafeUint[]` when all parameters are non-negative
   *   - `readonly SafeInt[]` for general integer ranges including negative values
   *
   * @throws Never throws - invalid ranges simply return empty arrays
   * @see {@link seq} for creating sequences starting from 0
   * @see {@link SmallUint} for understanding the constraint that enables precise typing
   * @see {@link SafeInt} and {@link SafeUint} for the safe integer types used
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/range-example.mts|Sample code}.
   */
  export function range<S extends SmallUint, E extends SmallUint>(
    start: S,
    end: E,
    step?: 1,
  ): RangeList<S, E>;

  export function range(
    start: SafeUintWithSmallInt,
    end: SafeUintWithSmallInt,
    step?: PositiveSafeIntWithSmallInt,
  ): readonly SafeUint[];

  export function range(
    start: SafeIntWithSmallInt,
    end: SafeIntWithSmallInt,
    step?: NonZeroSafeIntWithSmallInt,
  ): readonly SafeInt[];

  export function range(
    start: SafeIntWithSmallInt,
    end: SafeIntWithSmallInt,
    step: NonZeroSafeIntWithSmallInt = 1,
  ): readonly SafeInt[] {
    return Array.from(rangeIterator(start, end, step));
  }

  // element access

  /**
   * Safely retrieves an element at a given index from an array, returning an {@link Optional}.
   *
   * This function provides type-safe array access with support for negative indexing
   * (e.g., -1 for the last element). Unlike direct array access which can return
   * `undefined` for out-of-bounds indices, this function always returns a well-typed
   * {@link Optional} that explicitly represents the possibility of absence.
   *
   * **Negative Indexing:** Negative indices count from the end of the array:
   * - `-1` refers to the last element
   * - `-2` refers to the second-to-last element, etc.
   *
   * **Curried Usage:** This function supports currying - when called with only an index, it returns
   * a function that can be applied to arrays, making it ideal for use in pipe operations.
   *
   * **Optional Return Type:** The return type is always {@link Optional}<E> which provides:
   * - Type-safe access without `undefined` in your business logic
   * - Explicit handling of \"not found\" cases
   * - Composable error handling with {@link Optional} utilities
   *
   * @template E The type of elements in the array.
   * @param array The array to access (when using direct call syntax).
   * @param index The index to access. Must be a branded `SizeType.ArgArr` (safe integer). Can be:
   *   - **Positive integer:** 0-based index from the start (0, 1, 2, ...)
   *   - **Negative integer:** index from the end (-1 is last element, -2 is second-to-last, etc.)
   *   - **Out of bounds:** any index beyond array bounds returns {@link Optional.None}
   * @returns An {@link Optional}<E> containing:
   *   - {@link Optional.Some}<E> with the element if the index is valid
   *   - {@link Optional.None} if the index is out of bounds (including empty arrays)
   * @example
   *
   * ```ts
   * // Example: src/array/array-utils.mts (at)
   * import { Arr, Optional } from 'ts-data-forge';
   *
   * const letters: readonly string[] = ['a', 'b', 'c'];
   *
   * const two = Arr.at(letters, 1);
   * const last = Arr.at(-1)(letters);
   * const missing = Arr.at(letters, 5);
   *
   * assert.deepStrictEqual(two, Optional.some('b'));
   * assert.deepStrictEqual(last, Optional.some('c'));
   * assert.deepStrictEqual(missing, Optional.none);
   * ```
   *
   * @see {@link head} for getting the first element specifically
   * @see {@link last} for getting the last element specifically
   * @see {@link Optional} for working with the returned Optional values
   * @see {@link Optional.unwrapOr} for safe unwrapping with defaults
   * @see {@link Optional.map} for transforming Optional values
   */
  export function at<const Ar extends readonly unknown[]>(
    array: Ar,
    index: ArgArrayIndexWithNegative<Ar>,
  ): Optional<Ar[number]>;

  // Curried version

  export function at(
    index: SizeType.ArgArrWithNegative,
  ): <E>(array: readonly E[]) => Optional<E>;

  export function at<E>(
    ...args:
      | readonly [array: readonly E[], index: SizeType.ArgArrWithNegative]
      | readonly [index: SizeType.ArgArrWithNegative]
  ): Optional<E> | ((array: readonly E[]) => Optional<E>) {
    switch (args.length) {
      case 2: {
        const [array, index] = args;
        return pipe(index < 0 ? array.length + index : index).map(
          (normalizedIndex) =>
            normalizedIndex < 0 || normalizedIndex >= array.length
              ? Optional.none
              : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Optional.some(array[normalizedIndex]!),
        ).value;
      }
      case 1: {
        const [index] = args;
        return (array) => at(array, index);
      }
    }
  }

  /**
   * Returns the first element of an array wrapped in an Optional.
   *
   * This function provides type-safe access to the first element with precise return types:
   * - For empty arrays: returns `Optional.None`
   * - For tuples with known first element: returns `Optional.Some<FirstElementType>`
   * - For non-empty arrays: returns `Optional.Some<ElementType>`
   * - For general arrays: returns `Optional<ElementType>`
   *
   * The function leverages TypeScript's type system to provide the most precise return type
   * based on the input array type, making it safer than direct indexing.
   *
   * @template E The type of elements in the array.
   * @param array The array to get the first element from.
   * @returns An Optional containing the first element:
   *   - `Optional.None` if the array is empty
   *   - `Optional.Some<E>` containing the first element if the array is non-empty
   *
   * @see {@link last} for getting the last element
   * @see {@link at} for accessing elements at specific indices
   * @see {@link tail} for getting all elements except the first
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/head-example.mts|Sample code}.
   */
  export const head = <const Ar extends readonly unknown[]>(
    array: Ar,
  ): Ar extends readonly []
    ? Optional.None
    : Ar extends readonly [infer E, ...unknown[]]
      ? Optional.Some<E>
      : Ar extends NonEmptyArray<infer E>
        ? Optional.Some<E>
        : Optional<Ar[number]> =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    (array.length === 0 ? Optional.none : Optional.some(array.at(0))) as never;

  /**
   * Returns the last element of an array wrapped in an Optional.
   *
   * This function provides type-safe access to the last element with precise return types:
   * - For empty arrays: returns `Optional.None`
   * - For tuples with known last element: returns `Optional.Some<LastElementType>`
   * - For non-empty arrays: returns `Optional.Some<ElementType>`
   * - For general arrays: returns `Optional<ElementType>`
   *
   * The function leverages TypeScript's type system to provide the most precise return type
   * based on the input array type, making it safer than direct indexing.
   *
   * @template E The type of elements in the array.
   * @param array The array to get the last element from.
   * @returns An Optional containing the last element:
   *   - `Optional.None` if the array is empty
   *   - `Optional.Some<E>` containing the last element if the array is non-empty
   *
   * @see {@link head} for getting the first element
   * @see {@link at} for accessing elements at specific indices with negative indexing support
   * @see {@link butLast} for getting all elements except the last
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/last-example.mts|Sample code}.
   */
  export const last = <const Ar extends readonly unknown[]>(
    array: Ar,
  ): Ar extends readonly []
    ? Optional.None
    : Ar extends readonly [...unknown[], infer E]
      ? Optional.Some<E>
      : Ar extends NonEmptyArray<infer E>
        ? Optional.Some<E>
        : Optional<Ar[number]> =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    (array.length === 0 ? Optional.none : Optional.some(array.at(-1))) as never;

  // slicing

  /**
   * Slices an array with automatically clamped start and end indices for safe bounds handling.
   *
   * This function provides a safer alternative to `Array.slice()` by automatically clamping
   * the start and end indices to valid bounds, preventing out-of-bounds access and ensuring
   * consistent behavior regardless of input values.
   *
   * **Clamping Behavior:**
   * - `start` is clamped to `[0, array.length]`
   * - `end` is clamped to `[clampedStart, array.length]` (ensuring end ≥ start)
   * - Invalid ranges (start > end after clamping) return empty arrays
   * - Negative indices are clamped to 0, large indices are clamped to array.length
   *
   * **Curried Usage:** This function supports currying - when called with only start and end
   * indices, it returns a function that can be applied to arrays.
   *
   * @template E The type of elements in the array.
   * @param array The array to slice (when using direct call syntax).
   * @param start The start index for the slice (inclusive). Will be clamped to valid bounds.
   * @param end The end index for the slice (exclusive). Will be clamped to valid bounds.
   * @returns A new immutable array containing the sliced elements. Always returns a valid array,
   *   never throws for out-of-bounds indices.
   *
   * @see {@link take} for taking the first N elements
   * @see {@link skip} for skipping the first N elements
   * @see {@link takeLast} for taking the last N elements
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/slice-clamped-example.mts|Sample code}.
   */
  export function sliceClamped<const Ar extends readonly unknown[]>(
    array: Ar,
    start: ArgArrayIndexWithNegative<Ar>,
    end: ArgArrayIndexWithNegative<Ar>,
  ): readonly Ar[number][];

  export function sliceClamped(
    start: SizeType.ArgArrWithNegative,
    end: SizeType.ArgArrWithNegative,
  ): <E>(array: readonly E[]) => readonly E[];

  export function sliceClamped<E>(
    ...args:
      | readonly [
          readonly E[],
          SizeType.ArgArrWithNegative,
          SizeType.ArgArrWithNegative,
        ]
      | readonly [SizeType.ArgArrWithNegative, SizeType.ArgArrWithNegative]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 3: {
        const [array, start, end] = args;
        const startClamped = Num.clamp(0, array.length)(start);
        // Ensure endClamped is not less than startClamped.
        const endClamped = Num.clamp(startClamped, array.length)(end);
        return array.slice(startClamped, endClamped);
      }
      case 2: {
        const [start, end] = args;
        return (array) => sliceClamped(array, start, end);
      }
    }
  }

  /**
   * Returns all elements of an array except the first one.
   * @template E The type of the array (can be a tuple for more precise typing).
   * @param array The input array.
   * @returns A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/tail-example.mts|Sample code}.
   */
  export const tail = <const Ar extends readonly unknown[]>(
    array: Ar,
  ): List.Tail<Ar> =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array.slice(1) as unknown as List.Tail<Ar>;

  /**
   * Returns all elements of an array except the last one.
   * @template E The type of the array (can be a tuple for more precise typing).
   * @param array The input array.
   * @returns A new array containing all elements except the last. The type is inferred as `List.ButLast<T>`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/but-last-example.mts|Sample code}.
   */
  export const butLast = <const Ar extends readonly unknown[]>(
    array: Ar,
  ): List.ButLast<Ar> =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    (isEmpty(array) ? [] : array.slice(0, -1)) as unknown as List.ButLast<Ar>;

  /**
   * Takes the first N elements from an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple of the first N elements.
   * - If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
   * - Otherwise, returns a readonly array of up to N elements.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to take, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to take.
   * @returns A new array containing the first N elements.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/take-example.mts|Sample code}.
   */
  export function take<
    const Ar extends readonly unknown[],
    N extends SizeType.ArgArr,
  >(
    array: Ar,
    num: N,
  ): N extends SmallUint
    ? List.Take<N, Ar>
    : N extends SizeType.ArgArrPositive
      ? Ar extends NonEmptyArray<unknown>
        ? NonEmptyArray<Ar[number]>
        : readonly Ar[number][]
      : readonly Ar[number][];

  export function take<N extends SizeType.ArgArr>(
    num: N,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => N extends SmallUint
    ? List.Take<N, Ar>
    : N extends SizeType.ArgArrPositive
      ? Ar extends NonEmptyArray<unknown>
        ? NonEmptyArray<Ar[number]>
        : readonly Ar[number][]
      : readonly Ar[number][];

  export function take<E>(
    ...args:
      | readonly [array: readonly E[], num: SizeType.ArgArr]
      | readonly [num: SizeType.ArgArr]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, num] = args;
        return sliceClamped(array, 0, num);
      }
      case 1: {
        const [num] = args;
        return (array) => take(array, num);
      }
    }
  }

  /**
   * Takes the last N elements from an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple of the last N elements.
   * - If the array is a non-empty array and N is a positive integer, returns a non-empty array.
   * - Otherwise, returns a readonly array of up to N elements.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to take, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to take.
   * @returns A new array containing the last N elements.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/take-last-example.mts|Sample code}.
   */
  export function takeLast<
    const Ar extends readonly unknown[],
    N extends SizeType.ArgArr,
  >(
    array: Ar,
    num: N,
  ): N extends SmallUint
    ? List.TakeLast<N, Ar>
    : N extends SizeType.ArgArrPositive
      ? Ar extends NonEmptyArray<unknown>
        ? NonEmptyArray<Ar[number]>
        : readonly Ar[number][]
      : readonly Ar[number][];

  export function takeLast<N extends SizeType.ArgArr>(
    num: N,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => N extends SmallUint
    ? List.TakeLast<N, Ar>
    : N extends SizeType.ArgArrPositive
      ? Ar extends NonEmptyArray<unknown>
        ? NonEmptyArray<Ar[number]>
        : readonly Ar[number][]
      : readonly Ar[number][];

  export function takeLast<E>(
    ...args:
      | readonly [array: readonly E[], num: SizeType.ArgArr]
      | readonly [num: SizeType.ArgArr]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, num] = args;
        return sliceClamped(array, Uint32.sub(size(array), num), size(array));
      }
      case 1: {
        const [num] = args;
        return (array) => takeLast(array, num);
      }
    }
  }

  /**
   * Skips the first N elements of an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
   * - If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
   * - Otherwise, returns a readonly array with the first N elements skipped.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to skip, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to skip.
   * @returns A new array containing the elements after skipping the first N.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/skip-example.mts|Sample code}.
   */
  export function skip<
    const Ar extends readonly unknown[],
    N extends SizeType.ArgArr,
  >(
    array: Ar,
    num: N,
  ): N extends SmallUint ? List.Skip<N, Ar> : readonly Ar[number][];

  // curried version
  export function skip<N extends SizeType.ArgArr>(
    num: N,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => N extends SmallUint ? List.Skip<N, Ar> : readonly Ar[number][];

  export function skip<E>(
    ...args:
      | readonly [readonly E[], SizeType.ArgArr]
      | readonly [SizeType.ArgArr]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, num] = args;
        return sliceClamped(array, num, size(array));
      }
      case 1: {
        const [num] = args;
        return (array) => skip(array, num);
      }
    }
  }

  /**
   * Skips the last N elements of an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
   * - If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
   * - Otherwise, returns a readonly array with the last N elements skipped.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to skip, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to skip from the end.
   * @returns A new array containing the elements after skipping the last N.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/skip-last-example.mts|Sample code}.
   */
  export function skipLast<
    const Ar extends readonly unknown[],
    N extends SizeType.ArgArr,
  >(
    array: Ar,
    num: N,
  ): N extends SmallUint ? List.SkipLast<N, Ar> : readonly Ar[number][];

  // curried version
  export function skipLast<N extends SizeType.ArgArr>(
    num: N,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => N extends SmallUint ? List.SkipLast<N, Ar> : readonly Ar[number][];

  export function skipLast<E>(
    ...args:
      | readonly [array: readonly E[], num: SizeType.ArgArr]
      | readonly [num: SizeType.ArgArr]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, num] = args;
        return sliceClamped(array, 0, Uint32.sub(size(array), num));
      }
      case 1: {
        const [num] = args;
        return (array) => skipLast(array, num);
      }
    }
  }

  // modification (returns new array)

  /**
   * Returns a new tuple with the element at the specified index replaced.
   *
   * This operation is type-safe with compile-time index validation.
   * The resulting tuple type reflects that the element at the given index
   * may be either the new type or the original type.
   *
   * @template T - The type of the input tuple
   * @template N - The type of the new value to set
   * @param tpl - The input tuple
   * @param index - The index to update (must be valid for the tuple length)
   * @param newValue - The new value to place at the index
   * @returns A new tuple with the updated element
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/set-example.mts|Sample code}.
   */
  export function set<
    const Ar extends readonly unknown[],
    const V = Ar[number],
  >(
    array: Ar,
    index: ArgArrayIndex<Ar>,
    newValue: V,
  ): IsFixedLengthList<Ar> extends true
    ? Readonly<{ [K in keyof Ar]: Ar[K] | V }>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number] | V>
      : readonly (Ar[number] | V)[];

  // curried version
  export function set<const V>(
    index: SizeType.ArgArr,
    newValue: V,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => IsFixedLengthList<Ar> extends true
    ? Readonly<{ [K in keyof Ar]: Ar[K] | V }>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number] | V>
      : readonly (Ar[number] | V)[];

  export function set<E, const V = E>(
    ...args:
      | readonly [array: readonly E[], index: SizeType.ArgArr, newValue: V]
      | readonly [index: SizeType.ArgArr, newValue: V]
  ): readonly (E | V)[] | ((array: readonly E[]) => readonly (E | V)[]) {
    switch (args.length) {
      case 3: {
        const [array, index, newValue] = args;
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        return (array as (E | V)[]).with(index, newValue);
      }
      case 2: {
        const [index, newValue] = args;
        return (array) => set(array, index, newValue);
      }
    }
  }

  /**
   * Returns a new array with the element at the specified index updated by a function.
   *
   * This function provides immutable array updates with type-safe bounds checking. It applies an updater
   * function to the element at the given index and returns a new array with the transformed value.
   * The original array is never modified, ensuring immutability.
   *
   * **Type Union Behavior:** When the updater function returns a different type `U` than the original
   * element type `E`, the result type becomes `readonly (E | U)[]` to accommodate both original and
   * updated element types. This ensures type safety when elements have different types after updating.
   *
   * **Bounds Checking:** Unlike native array access which can cause runtime errors, this function
   * performs safe bounds checking:
   * - **Valid index:** Creates new array with updated element
   * - **Invalid index:** Returns the original array unchanged (no errors thrown)
   * - **Negative index:** Treated as invalid (returns original array)
   *
   * **Curried Usage:** Supports currying for functional composition - when called with only index and
   * updater, returns a reusable function that can be applied to arrays.
   *
   * @template E The type of elements in the original array.
   * @template V The type of the value returned by the updater function.
   * @param array The input array to update. Can be any readonly array.
   * @param index The index of the element to update. Must be a non-negative {@link SizeType.ArgArr}.
   *   - **Valid range:** `0 <= index < array.length`
   *   - **Out of bounds:** Returns original array unchanged
   *   - **Negative values:** Not allowed by type system (non-negative constraint)
   * @param updater A function `(prev: E) => U` that transforms the existing element:
   *   - **prev:** The current element at the specified index
   *   - **returns:** The new value to place at that index (can be different type)
   * @returns A new `readonly (E | U)[]` array where:
   *   - All elements except the target index remain unchanged (type `E`)
   *   - The element at the target index is replaced with the updater result (type `U`)
   *   - Type union `E | U` accommodates both original and updated element types
   *   - If index is out of bounds, returns the original array unchanged
   *
   * @see {@link Array.prototype.with} for the native method with different error handling
   * @see {@link SizeType.ArgArr} for the index type constraint
   * @see Immutable update patterns for functional programming approaches
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-updated-example.mts|Sample code}.
   */
  export function toUpdated<
    const Ar extends readonly unknown[],
    const V = Ar[number],
  >(
    array: Ar,
    index: ArgArrayIndex<Ar>,
    updater: (prev: Ar[number]) => V,
  ): IsFixedLengthList<Ar> extends true
    ? Readonly<{ [K in keyof Ar]: Ar[K] | V }>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number] | V>
      : readonly (Ar[number] | V)[];

  // curried version
  export function toUpdated<E, const V = E>(
    index: SizeType.ArgArr,
    updater: (prev: E) => V,
  ): <const Ar extends readonly E[]>(
    array: Ar,
  ) => IsFixedLengthList<Ar> extends true
    ? Readonly<{ [K in keyof Ar]: Ar[K] | V }>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number] | V>
      : readonly (Ar[number] | V)[];

  export function toUpdated<E, V = E>(
    ...args:
      | readonly [
          array: readonly E[],
          index: SizeType.ArgArr,
          updater: (prev: E) => V,
        ]
      | readonly [index: SizeType.ArgArr, updater: (prev: E) => V]
  ): readonly (E | V)[] | ((array: readonly E[]) => readonly (E | V)[]) {
    switch (args.length) {
      case 3: {
        const [array, index, updater] = args;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, total-functions/no-unsafe-type-assertion
        return (array as (E | V)[]).with(index, updater(array[index]!));
      }
      case 2: {
        const [index, updater] = args;
        return (array) => toUpdated(array, index, updater);
      }
    }
  }

  /**
   * Returns a new array with a new value inserted at the specified index.
   * Index can be out of bounds (e.g., negative or greater than length), `toSpliced` handles this.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index at which to insert the new value.
   * @param newValue The value to insert.
   * @returns A new array with the value inserted.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-inserted-example.mts|Sample code}.
   */
  export function toInserted<
    const Ar extends readonly unknown[],
    const V = Ar[number],
  >(
    array: Ar,
    index: ArgArrayIndexWithNegative<Ar>,
    newValue: V,
  ): IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<CastToNumber<Increment<Ar['length']>>, Ar[number] | V>
    : NonEmptyArray<Ar[number] | V>;

  // curried version
  export function toInserted<const V>(
    index: SizeType.ArgArrWithNegative,
    newValue: V,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<CastToNumber<Increment<Ar['length']>>, Ar[number] | V>
    : NonEmptyArray<Ar[number] | V>;

  export function toInserted<E, const V = E>(
    ...args:
      | readonly [
          array: readonly E[],
          index: SizeType.ArgArrWithNegative,
          newValue: V,
        ]
      | readonly [index: SizeType.ArgArrWithNegative, newValue: V]
  ): NonEmptyArray<E | V> | ((array: readonly E[]) => NonEmptyArray<E | V>) {
    switch (args.length) {
      case 3: {
        const [array, index, newValue] = args;
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        return (array as readonly (E | V)[]).toSpliced(
          index,
          0,
          newValue,
        ) as unknown as NonEmptyArray<E | V>;
      }
      case 2: {
        const [index, newValue] = args;
        return (array) => toInserted(array, index, newValue);
      }
    }
  }

  type CastToNumber<T> = T extends number ? T : never;

  /**
   * Returns a new array with the element at the specified index removed.
   * If index is out of bounds, `toSpliced` handles this (usually by returning a copy).
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index of the element to remove.
   * @returns A new array with the element removed.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-removed-example.mts|Sample code}.
   */
  export function toRemoved<const Ar extends readonly unknown[]>(
    array: Ar,
    index: ArgArrayIndexWithNegative<Ar>,
  ): readonly Ar[number][];

  export function toRemoved(
    index: SizeType.ArgArrWithNegative,
  ): <E>(array: readonly E[]) => readonly E[];

  export function toRemoved<E>(
    ...args:
      | readonly [array: readonly E[], index: SizeType.ArgArrWithNegative]
      | readonly [index: SizeType.ArgArrWithNegative]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, index] = args;
        return array.toSpliced(index, 1);
      }
      case 1: {
        const [index] = args;
        return (array) => toRemoved(array, index);
      }
    }
  }

  /**
   * Returns a new array with a value added to the end.
   * @template E The type of the input array (can be a tuple).
   * @template V The type of the value to add.
   * @param array The input array.
   * @param newValue The value to add.
   * @returns A new array with the value added to the end. Type is `readonly [...E, V]`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-pushed-example.mts|Sample code}.
   */
  export function toPushed<const Ar extends readonly unknown[], const V>(
    array: Ar,
    newValue: V,
  ): readonly [...Ar, V];

  export function toPushed<const V>(
    newValue: V,
  ): <const Ar extends readonly unknown[]>(array: Ar) => readonly [...Ar, V];

  export function toPushed<const Ar extends readonly unknown[], const V>(
    ...args: readonly [array: Ar, newValue: V] | readonly [newValue: V]
  ): readonly [...Ar, V] | ((array: Ar) => readonly [...Ar, V]) {
    switch (args.length) {
      case 2: {
        const [array, newValue] = args;
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        return array.toSpliced(
          array.length,
          0,
          newValue,
        ) as unknown as readonly [...Ar, V];
      }
      case 1: {
        const [newValue] = args;
        return (array) => toPushed(array, newValue);
      }
    }
  }

  /**
   * Returns a new array with a value added to the beginning.
   * @template E The type of the input array (can be a tuple).
   * @template V The type of the value to add.
   * @param array The input array.
   * @param newValue The value to add.
   * @returns A new array with the value added to the beginning. Type is `readonly [V, ...E]`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-unshifted-example.mts|Sample code}.
   */
  export function toUnshifted<const Ar extends readonly unknown[], const V>(
    array: Ar,
    newValue: V,
  ): readonly [V, ...Ar];

  export function toUnshifted<const V>(
    newValue: V,
  ): <const Ar extends readonly unknown[]>(array: Ar) => readonly [V, ...Ar];

  export function toUnshifted<Ar extends readonly unknown[], const V>(
    ...args: readonly [array: Ar, newValue: V] | readonly [newValue: V]
  ): readonly [V, ...Ar] | ((array: Ar) => readonly [V, ...Ar]) {
    switch (args.length) {
      case 2: {
        const [array, newValue] = args;
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        return array.toSpliced(0, 0, newValue) as unknown as readonly [
          V,
          ...Ar,
        ];
      }
      case 1: {
        const [newValue] = args;
        return (array) => toUnshifted(array, newValue);
      }
    }
  }

  /**
   * Creates a new array of the same length filled with a specified value.
   *
   * This function replaces all elements in the array with the provided value,
   * maintaining the original array's length and structure. It provides type-safe
   * array filling with precise return types.
   *
   * @template Ar The exact type of the input array.
   * @template V The type of the fill value.
   * @param array The array to fill.
   * @param value The value to fill the array with.
   * @returns A new array of the same length filled with the specified value:
   *   - For fixed-length arrays: returns `ArrayOfLength<Ar['length'], V>`
   *   - For non-empty arrays: returns `NonEmptyArray<V>`
   *   - For general arrays: returns `readonly V[]`
   *
   * @see {@link toRangeFilled} for filling only a specific range
   * @see {@link create} for creating new arrays filled with a value
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-filled-example.mts|Sample code}.
   */
  export function toFilled<const Ar extends readonly unknown[], const V>(
    array: Ar,
    value: V,
  ): IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], V>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<V>
      : readonly V[];

  // curried version
  export function toFilled<const V>(
    value: V,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], V>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<V>
      : readonly V[];

  export function toFilled<E>(
    ...args: readonly [array: readonly E[], value: E] | readonly [value: E]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, value] = args;
        return create(asPositiveUint32(array.length), value);
      }
      case 1: {
        const [value] = args;
        return (array) => toFilled(array, value);
      }
    }
  }

  /**
   * Creates a new array with a specific range filled with a specified value.
   *
   * This function fills only the specified range of indices with the provided value,
   * leaving other elements unchanged. It provides type-safe range filling with
   * precise return types.
   *
   * @template Ar The exact type of the input array.
   * @template V The type of the fill value.
   * @param array The array to fill a range of.
   * @param value The value to fill the range with.
   * @param fillRange A tuple containing [start, end] indices for the range to fill.
   * @returns A new array with the specified range filled:
   *   - For fixed-length arrays: returns `ArrayOfLength<Ar['length'], V | Ar[number]>`
   *   - For non-empty arrays: returns `NonEmptyArray<V | Ar[number]>`
   *   - For general arrays: returns `readonly (V | Ar[number])[]`
   *
   * @see {@link toFilled} for filling the entire array
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-range-filled-example.mts|Sample code}.
   */
  export function toRangeFilled<const Ar extends readonly unknown[], const V>(
    array: Ar,
    value: V,
    fillRange: readonly [
      start: ArgArrayIndexWithNegative<Ar>,
      end: ArgArrayIndexWithNegative<Ar>,
    ],
  ): IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], V | Ar[number]>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<V | Ar[number]>
      : readonly (V | Ar[number])[];

  // curried version
  export function toRangeFilled<const V>(
    value: V,
    fillRange: readonly [
      start: SizeType.ArgArrWithNegative,
      end: SizeType.ArgArrWithNegative,
    ],
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], V | Ar[number]>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<V | Ar[number]>
      : readonly (V | Ar[number])[];

  export function toRangeFilled<E, const V>(
    ...args:
      | readonly [
          array: readonly E[],
          value: V,
          fillRange: readonly [
            start: SizeType.ArgArrWithNegative,
            end: SizeType.ArgArrWithNegative,
          ],
        ]
      | readonly [
          value: V,
          fillRange: readonly [
            start: SizeType.ArgArrWithNegative,
            end: SizeType.ArgArrWithNegative,
          ],
        ]
  ): readonly (E | V)[] | ((array: readonly E[]) => readonly (E | V)[]) {
    switch (args.length) {
      case 3: {
        const [array, value, [start, end]] = args;
        const mut_cp: (E | V)[] = castMutable(copy(array));
        mut_cp.fill(value, start, end);
        return mut_cp;
      }
      case 2: {
        const [value, fillRange] = args;
        return (array) => toRangeFilled(array, value, fillRange);
      }
    }
  }

  // searching

  /**
   * Safely finds the first element in an array that satisfies a predicate function.
   *
   * This function provides type-safe searching with no risk of runtime errors. It returns
   * the first element that matches the predicate wrapped in an Optional, or Optional.None
   * if no element is found. The predicate receives the element, its index, and the entire array.
   *
   * **Curried Usage:** This function supports currying - when called with only a predicate,
   * it returns a function that can be applied to arrays, making it ideal for functional composition.
   *
   * @template E The type of elements in the array.
   * @param array The array to search through (when using direct call syntax).
   * @param predicate A function that tests each element. Called with:
   *   - `value`: The current element being tested
   *   - `index`: The index of the current element (branded as `SizeType.Arr`)
   *   - `arr`: The entire array being searched
   * @returns An `Optional<E>` containing:
   *   - `Optional.Some<E>` with the first matching element if found
   *   - `Optional.None` if no element satisfies the predicate
   *
   * @see {@link findIndex} for finding the index instead of the element
   * @see {@link indexOf} for finding elements by equality
   * @see {@link Optional} for working with the returned Optional values
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/find-example.mts|Sample code}.
   */
  export function find<E, F extends E>(
    array: readonly E[],
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => value is F,
  ): Optional<F>;

  export function find<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
  ): Optional<Ar[number]>;

  export function find<E>(
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
  ): (array: readonly E[]) => Optional<E>;

  export function find<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
      | readonly [
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
  ): Optional<E> | ((array: readonly E[]) => Optional<E>) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        const foundIndex = array.findIndex(
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          predicate as () => boolean,
        );

        expectType<
          Parameters<typeof array.findIndex>[0],
          (value: E, index: number, arr: readonly E[]) => unknown
        >('=');

        expectType<
          typeof predicate,
          (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
        >('=');

        return foundIndex === -1
          ? Optional.none
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            Optional.some(array[foundIndex]!);
      }
      case 1: {
        const [predicate] = args;

        expectType<
          typeof predicate,
          (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
        >('=');

        return (array) => find(array, predicate);
      }
    }
  }

  /**
   * Returns the last element in an array that satisfies a predicate function.
   *
   * This function searches from the end of the array and returns an Optional containing
   * the first element found that satisfies the predicate, or None if no such element exists.
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @param array The array to search.
   * @param predicate A function that tests each element.
   * @returns An Optional containing the found element, or None if no element satisfies the predicate.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/find-last-example.mts|Sample code}.
   */
  export function findLast<E, F extends E>(
    array: readonly E[],
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => value is F,
  ): Optional<F>;

  export function findLast<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
  ): Optional<Ar[number]>;

  export function findLast<E>(
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
  ): (array: readonly E[]) => Optional<E>;

  export function findLast<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
      | readonly [
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
  ): Optional<E> | ((array: readonly E[]) => Optional<E>) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        const foundIndex = array.findLastIndex(
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          predicate as () => boolean,
        );

        expectType<
          Parameters<typeof array.findIndex>[0],
          (value: E, index: number, arr: readonly E[]) => unknown
        >('=');

        expectType<
          typeof predicate,
          (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
        >('=');

        return foundIndex === -1
          ? Optional.none
          : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            Optional.some(array[foundIndex]!);
      }
      case 1: {
        const [predicate] = args;

        expectType<
          typeof predicate,
          (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean
        >('=');

        return (array) => findLast(array, predicate);
      }
    }
  }

  /**
   * Safely finds the index of the first element in an array that satisfies a predicate function.
   *
   * This function provides type-safe index searching with no risk of runtime errors. It returns
   * the index of the first element that matches the predicate wrapped in an Optional, or Optional.None
   * if no element is found. The returned index is branded as `SizeType.Arr` for type safety.
   *
   * **Curried Usage:** This function supports currying - when called with only a predicate,
   * it returns a function that can be applied to arrays, making it ideal for functional composition.
   *
   * @template E The type of elements in the array.
   * @param array The array to search through (when using direct call syntax).
   * @param predicate A function that tests each element. Called with:
   *   - `value`: The current element being tested
   *   - `index`: The index of the current element (branded as `SizeType.Arr`)
   * @returns An `Optional<SizeType.Arr>` containing:
   *   - `Optional.Some<SizeType.Arr>` with the index of the first matching element if found
   *   - `Optional.None` if no element satisfies the predicate
   *
   * @see {@link find} for finding the element instead of its index
   * @see {@link indexOf} for finding elements by equality (not predicate)
   * @see {@link lastIndexOf} for finding the last occurrence
   * @see {@link Optional} for working with the returned Optional values
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/find-index-example.mts|Sample code}.
   */
  export function findIndex<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
  ): ArrayIndex<Ar> | -1;

  export function findIndex<E>(
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
  ): (array: readonly E[]) => SizeType.Arr | -1;

  export function findIndex<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
      | readonly [
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
  ): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return pipe(
          array.findIndex(
            // eslint-disable-next-line total-functions/no-unsafe-type-assertion
            predicate as (value: E, index: number) => boolean,
          ),
        ).map((idx) => (idx >= 0 ? asUint32(idx) : -1)).value;
      }
      case 1: {
        const [predicate] = args;
        return (array) => findIndex(array, predicate);
      }
    }
  }

  /**
   * Safely finds the index of the last element in an array that satisfies a predicate function.
   *
   * This function provides type-safe index searching with no risk of runtime errors. It searches
   * from the end of the array backwards and returns the index of the last element that matches
   * the predicate, or -1 if no element is found. The returned index is branded as `SizeType.Arr`
   * for type safety.
   *
   * **Curried Usage:** This function supports currying - when called with only a predicate,
   * it returns a function that can be applied to arrays, making it ideal for functional composition.
   *
   * @template Ar The exact type of the input array, used for precise return type inference.
   * @template E The type of elements in the array.
   * @param array The array to search through (when using direct call syntax).
   * @param predicate A function that tests each element. Called with:
   *   - `value`: The current element being tested
   *   - `index`: The index of the current element (branded as `SizeType.Arr`)
   *   - `arr`: The array being searched
   * @returns The index of the last matching element as `SizeType.Arr`, or -1 if no element satisfies the predicate.
   *
   * @see {@link findLast} for finding the element instead of its index
   * @see {@link findIndex} for finding the first occurrence
   * @see {@link lastIndexOf} for finding elements by equality (not predicate)
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/find-last-index-example.mts|Sample code}.
   */
  export function findLastIndex<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (value: Ar[number], index: ArrayIndex<Ar>, arr: Ar) => boolean,
  ): ArrayIndex<Ar> | -1;

  export function findLastIndex<E>(
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
  ): (array: readonly E[]) => SizeType.Arr | -1;

  export function findLastIndex<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
      | readonly [
          predicate: (
            value: E,
            index: SizeType.Arr,
            arr: readonly E[],
          ) => boolean,
        ]
  ): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return pipe(
          array.findLastIndex(
            // eslint-disable-next-line total-functions/no-unsafe-type-assertion
            predicate as (value: E, index: number) => boolean,
          ),
        ).map((idx) => (idx >= 0 ? asUint32(idx) : -1)).value;
      }
      case 1: {
        const [predicate] = args;
        return (array) => findLastIndex(array, predicate);
      }
    }
  }

  /**
   * Gets the index of a value in an array.
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @param fromIndex The index to start searching from.
   * @returns The index if found, -1 otherwise.
   */
  export function indexOf<const Ar extends readonly unknown[]>(
    array: Ar,
    searchElement: Ar[number],
  ): ArrayIndex<Ar> | -1;

  export function indexOf<E>(
    searchElement: E,
  ): (array: readonly E[]) => SizeType.Arr | -1;

  export function indexOf<E>(
    ...args:
      | readonly [array: readonly E[], searchElement: E]
      | readonly [searchElement: E]
  ): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
    switch (args.length) {
      case 2: {
        const [array, searchElement] = args;

        const index = array.indexOf(searchElement);
        return index !== -1 ? asUint32(index) : -1;
      }
      case 1: {
        const [searchElement] = args;
        return (array) => indexOf(array, searchElement);
      }
    }
  }

  export function indexOfFrom<const Ar extends readonly unknown[]>(
    array: Ar,
    searchElement: Ar[number],
    fromIndex: ArgArrayIndexWithNegative<Ar>,
  ): ArrayIndex<Ar> | -1;

  export function indexOfFrom<E>(
    searchElement: E,
    fromIndex: SizeType.ArgArrWithNegative,
  ): (array: readonly E[]) => SizeType.Arr | -1;

  export function indexOfFrom<E>(
    ...args:
      | readonly [
          array: readonly E[],
          searchElement: E,
          fromIndex: SizeType.ArgArrWithNegative,
        ]
      | readonly [searchElement: E, fromIndex: SizeType.ArgArrWithNegative]
  ): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
    switch (args.length) {
      case 3: {
        const [array, searchElement, fromIndex] = args;
        const index = array.indexOf(searchElement, fromIndex);
        return index !== -1 ? asUint32(index) : -1;
      }
      case 2: {
        const [searchElement, fromIndex] = args;
        return (array) => indexOfFrom(array, searchElement, fromIndex);
      }
    }
  }

  /**
   * Gets the last index of a value in an array.
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @param fromIndex The index to start searching from (searches backwards).
   * @returns Optional.Some with the index if found, Optional.None otherwise.
   */
  export function lastIndexOf<const Ar extends readonly unknown[]>(
    array: Ar,
    searchElement: Ar[number],
  ): ArrayIndex<Ar> | -1;

  export function lastIndexOf<E>(
    searchElement: E,
  ): (array: readonly E[]) => SizeType.Arr | -1;

  export function lastIndexOf<E>(
    ...args:
      | readonly [array: readonly E[], searchElement: E]
      | readonly [searchElement: E]
  ): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
    switch (args.length) {
      case 2: {
        const [array, searchElement] = args;
        const index = array.lastIndexOf(searchElement);
        return index !== -1 ? asUint32(index) : -1;
      }
      case 1: {
        const [searchElement] = args;
        return (array) => lastIndexOf(array, searchElement);
      }
    }
  }

  export function lastIndexOfFrom<const Ar extends readonly unknown[]>(
    array: Ar,
    searchElement: Ar[number],
    fromIndex: ArgArrayIndexWithNegative<Ar>,
  ): ArrayIndex<Ar> | -1;

  export function lastIndexOfFrom<E>(
    searchElement: E,
    fromIndex: SizeType.ArgArrWithNegative,
  ): (array: readonly E[]) => SizeType.Arr | -1;

  export function lastIndexOfFrom<E>(
    ...args:
      | readonly [
          array: readonly E[],
          searchElement: E,
          fromIndex: SizeType.ArgArrWithNegative,
        ]
      | readonly [searchElement: E, fromIndex: SizeType.ArgArrWithNegative]
  ): SizeType.Arr | -1 | ((array: readonly E[]) => SizeType.Arr | -1) {
    switch (args.length) {
      case 3: {
        const [array, searchElement, fromIndex] = args;

        const index = array.lastIndexOf(searchElement, fromIndex);

        return index !== -1 ? asUint32(index) : -1;
      }
      case 2: {
        const [searchElement, fromIndex] = args;
        return (array) => lastIndexOfFrom(array, searchElement, fromIndex);
      }
    }
  }

  /**
   * Tests whether all elements in an array pass a test implemented by a predicate function.
   *
   * This function returns `true` if all elements satisfy the predicate, `false` otherwise.
   * For empty arrays, it returns `true` (vacuous truth).
   * Supports type guard predicates for type narrowing of the entire array.
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @template S The narrowed type when using type guard predicates.
   * @param array The array to test.
   * @param predicate A function that tests each element.
   * @returns `true` if all elements pass the test, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/every-example.mts|Sample code}.
   *
   */
  // Type guard overloads - narrow the entire array type
  export function every<E, S extends E>(
    array: readonly E[],
    predicate: (a: E, index: SizeType.Arr) => a is S,
  ): array is readonly S[];

  export function every<E, S extends E>(
    predicate: (a: E, index: SizeType.Arr) => a is S,
  ): (array: readonly E[]) => array is readonly S[];

  // Regular boolean predicate overloads
  export function every<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
  ): boolean;

  export function every<E>(
    predicate: (a: E, index: SizeType.Arr) => boolean,
  ): (array: readonly E[]) => boolean;

  export function every<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (a: E, index: SizeType.Arr) => boolean,
        ]
      | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
  ): boolean | ((array: readonly E[]) => boolean) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return array.every((a, i) => predicate(a, asUint32(i)));
      }
      case 1: {
        const [predicate] = args;
        return (array) => every(array, predicate);
      }
    }
  }

  /**
   * Tests whether at least one element in an array passes a test implemented by a predicate function.
   *
   * This function returns `true` if at least one element satisfies the predicate, `false` otherwise.
   * For empty arrays, it returns `false`.
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @param array The array to test.
   * @param predicate A function that tests each element.
   * @returns `true` if at least one element passes the test, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/some-example.mts|Sample code}.
   *
   */
  export function some<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
  ): boolean;

  export function some<E>(
    predicate: (a: E, index: SizeType.Arr) => boolean,
  ): (array: readonly E[]) => boolean;

  export function some<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (a: E, index: SizeType.Arr) => boolean,
        ]
      | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
  ): boolean | ((array: readonly E[]) => boolean) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return array.some((a, i) => predicate(a, asUint32(i)));
      }
      case 1: {
        const [predicate] = args;
        return (array) => some(array, predicate);
      }
    }
  }

  // reducing value

  /**
   * Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
   * This is an alias for `Array.prototype.reduce`.
   * @template E The type of elements in the array.
   * @template S The type of the accumulated value.
   * @param array The input array.
   * @param callbackfn A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
   * @param initialValue The initial value of the accumulator.
   * @returns The single value that results from the reduction.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/foldl-example.mts|Sample code}.
   */
  export function foldl<const Ar extends readonly unknown[], P>(
    array: Ar,
    callbackfn: (
      previousValue: P,
      currentValue: Ar[number],
      currentIndex: ArrayIndex<Ar>,
    ) => P,
    initialValue: P,
  ): P;

  export function foldl<E, P>(
    callbackfn: (
      previousValue: P,
      currentValue: E,
      currentIndex: SizeType.Arr,
    ) => P,
    initialValue: P,
  ): (array: readonly E[]) => P;

  export function foldl<E, P>(
    ...args:
      | readonly [
          array: readonly E[],
          callbackfn: (
            previousValue: P,
            currentValue: E,
            currentIndex: SizeType.Arr,
          ) => P,
          initialValue: P,
        ]
      | readonly [
          callbackfn: (
            previousValue: P,
            currentValue: E,
            currentIndex: SizeType.Arr,
          ) => P,
          initialValue: P,
        ]
  ): P | ((array: readonly E[]) => P) {
    switch (args.length) {
      case 3: {
        const [array, callbackfn, initialValue] = args;
        return array.reduce(
          (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
          initialValue,
        );
      }
      case 2: {
        const [callbackfn, initialValue] = args;
        return (array) => foldl(array, callbackfn, initialValue);
      }
    }
  }

  /**
   * Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
   * This is an alias for `Array.prototype.reduceRight`.
   * @template E The type of elements in the array.
   * @template S The type of the accumulated value.
   * @param array The input array.
   * @param callbackfn A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
   * @param initialValue The initial value of the accumulator.
   * @returns The single value that results from the reduction.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/foldr-example.mts|Sample code}.
   */
  export function foldr<const Ar extends readonly unknown[], P>(
    array: Ar,
    callbackfn: (
      previousValue: P,
      currentValue: Ar[number],
      currentIndex: ArrayIndex<Ar>,
    ) => P,
    initialValue: P,
  ): P;

  export function foldr<E, P>(
    callbackfn: (
      previousValue: P,
      currentValue: E,
      currentIndex: SizeType.Arr,
    ) => P,
    initialValue: P,
  ): (array: readonly E[]) => P;

  export function foldr<E, P>(
    ...args:
      | readonly [
          array: readonly E[],
          callbackfn: (
            previousValue: P,
            currentValue: E,
            currentIndex: SizeType.Arr,
          ) => P,
          initialValue: P,
        ]
      | readonly [
          callbackfn: (
            previousValue: P,
            currentValue: E,
            currentIndex: SizeType.Arr,
          ) => P,
          initialValue: P,
        ]
  ): P | ((array: readonly E[]) => P) {
    switch (args.length) {
      case 3: {
        const [array, callbackfn, initialValue] = args;
        return array.reduceRight(
          (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
          initialValue,
        );
      }
      case 2: {
        const [callbackfn, initialValue] = args;
        return (array) => foldr(array, callbackfn, initialValue);
      }
    }
  }

  /**
   * Finds the minimum value in an array.
   * @template E The type of numbers in the array (must extend `number`).
   * @param array The input array.
   * @param comparator An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.
   * @returns The minimum value in the array wrapped in Optional.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/min-example.mts|Sample code}.
   */
  export function min<const Ar extends readonly number[]>(
    array: Ar,
    // If the array elements are numbers, comparator is optional.
    comparator?: (x: Ar[number], y: Ar[number]) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function min<const Ar extends readonly unknown[]>(
    array: Ar,
    comparator: (x: Ar[number], y: Ar[number]) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function min<E extends number>(
    array: readonly E[],
    comparator?: (x: E, y: E) => number,
  ): Optional<E> {
    if (!isNonEmpty(array)) {
      return Optional.none;
    }

    const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));

    return Optional.some(
      array.reduce(
        (currentMin, curr) => (cmp(curr, currentMin) < 0 ? curr : currentMin),
        array[0],
      ),
    );
  }

  /**
   * Finds the maximum value in an array.
   *
   * - If the array is non-empty, returns the maximum value.
   * - If the array is empty, returns `Optional.none`.
   * - You can provide a custom comparator for arbitrary types.
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparator An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.
   * @returns The maximum value in the array wrapped in Optional.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/max-example.mts|Sample code}.
   */
  export function max<const Ar extends readonly number[]>(
    array: Ar,
    // If the array elements are numbers, comparator is optional.
    comparator?: (x: Ar[number], y: Ar[number]) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function max<const Ar extends readonly unknown[]>(
    array: Ar,
    comparator: (x: Ar[number], y: Ar[number]) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function max<E extends number>(
    array: readonly E[],
    comparator?: (x: E, y: E) => number,
  ): Optional<E> {
    const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));
    // Find max by finding min with an inverted comparator
    return min(array, (x, y) => -cmp(x, y));
  }

  /**
   * Finds the element with the minimum value according to a mapped numeric value.
   *
   * - If the array is non-empty, returns the element with the minimum mapped value.
   * - If the array is empty, returns `Optional.none`.
   * - You can provide a custom comparator for the mapped values.
   *
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function that maps an element to a value for comparison.
   * @param comparator An optional custom comparator function for the mapped values.
   * @returns The element with the minimum mapped value wrapped in Optional.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/min-by-example.mts|Sample code}.
   */
  export function minBy<const Ar extends readonly unknown[]>(
    array: Ar,
    // If the array elements are mapped to numbers, comparator is optional.
    comparatorValueMapper: (value: Ar[number]) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function minBy<const Ar extends readonly unknown[], V>(
    array: Ar,
    comparatorValueMapper: (value: Ar[number]) => V,
    comparator: (x: V, y: V) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function minBy<E, V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator?: (x: V, y: V) => number,
  ): Optional<E> {
    return min(array, (x, y) =>
      comparator === undefined
        ? Num.from(comparatorValueMapper(x)) -
          Num.from(comparatorValueMapper(y))
        : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
    );
  }

  /**
   * Finds the element with the maximum value according to a mapped numeric value.
   *
   * - If the array is non-empty, returns the element with the maximum mapped value.
   * - If the array is empty, returns `Optional.none`.
   * - You can provide a custom comparator for the mapped values.
   *
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function that maps an element to a value for comparison.
   * @param comparator An optional custom comparator function for the mapped values.
   * @returns The element with the maximum mapped value wrapped in Optional.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/max-by-example.mts|Sample code}.
   */
  export function maxBy<const Ar extends readonly unknown[]>(
    array: Ar,
    // If the array elements are mapped to numbers, comparator is optional.
    comparatorValueMapper: (value: Ar[number]) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function maxBy<const Ar extends readonly unknown[], V>(
    array: Ar,
    comparatorValueMapper: (value: Ar[number]) => V,
    comparator: (x: V, y: V) => number,
  ): Ar extends NonEmptyArray<unknown>
    ? Optional.Some<Ar[number]>
    : Optional<Ar[number]>;

  export function maxBy<E, V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator?: (x: V, y: V) => number,
  ): Optional<E> {
    return max(array, (x, y) =>
      comparator === undefined
        ? Num.from(comparatorValueMapper(x)) -
          Num.from(comparatorValueMapper(y))
        : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
    );
  }

  /**
   * Counts the number of elements in an array that satisfy a predicate.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param predicate A function `(value: A, index: number) => boolean` to test each element for a condition.
   * @returns The number of elements that satisfy the predicate.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/count-example.mts|Sample code}.
   */
  export function count<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (value: Ar[number], index: ArrayIndex<Ar>) => boolean,
  ): SizeType.Arr;

  export function count<E>(
    predicate: (value: E, index: SizeType.Arr) => boolean,
  ): (array: readonly E[]) => SizeType.Arr;

  export function count<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (value: E, index: SizeType.Arr) => boolean,
        ]
      | readonly [predicate: (value: E, index: SizeType.Arr) => boolean]
  ): SizeType.Arr | ((array: readonly E[]) => SizeType.Arr) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return array.reduce<Uint32>(
          (acc, curr, index) =>
            predicate(curr, asUint32(index)) ? Uint32.add(acc, 1) : acc,
          asUint32(0),
        );
      }
      case 1: {
        const [predicate] = args;
        return (array) => count(array, predicate);
      }
    }
  }

  /**
   * Groups elements of an array by a key derived from each element and counts the elements in each group.
   * @template E The type of elements in the array.
   * @template G The type of the group key (must be a primitive type: `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`).
   * @param array The input array.
   * @param grouper A function `(value: A, index: number) => G` that maps an element and its index to a group key.
   * @returns An `IMap` where keys are group keys and values are the counts of elements in each group.
   */
  export function countBy<
    const Ar extends readonly unknown[],
    G extends MapSetKeyType,
  >(
    array: Ar,
    grouper: (value: Ar[number], index: ArrayIndex<Ar>) => G,
  ): IMap<G, ArrayIndex<Ar>>;

  export function countBy<E, G extends MapSetKeyType>(
    grouper: (value: E, index: SizeType.Arr) => G,
  ): (array: readonly E[]) => IMap<G, SizeType.Arr>;

  export function countBy<E, G extends MapSetKeyType>(
    ...args:
      | readonly [
          array: readonly E[],
          grouper: (value: E, index: SizeType.Arr) => G,
        ]
      | readonly [grouper: (value: E, index: SizeType.Arr) => G]
  ): IMap<G, SizeType.Arr> | ((array: readonly E[]) => IMap<G, SizeType.Arr>) {
    switch (args.length) {
      case 2: {
        const [array, grouper] = args;
        const mut_groups = new Map<G, SizeType.Arr>();

        for (const [index, e] of array.entries()) {
          const key = grouper(e, asUint32(index));
          const curr = mut_groups.get(key) ?? 0;

          mut_groups.set(key, asUint32(curr + 1));
        }

        return IMap.create(mut_groups);
      }
      case 1: {
        const [grouper] = args;
        return (array) => countBy(array, grouper);
      }
    }
  }

  /**
   * Calculates the sum of numbers in an array.
   * @param array The input array of numbers.
   * @returns The sum of the numbers. Returns 0 for an empty array.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/sum-example.mts|Sample code}.
   */
  export function sum(array: readonly []): 0;

  export function sum<N extends number>(array: readonly [N]): N;

  export function sum(array: readonly Uint[]): Uint;

  export function sum(array: readonly Int[]): Int;

  export function sum(array: readonly number[]): number;

  export function sum(array: readonly number[]): number {
    return array.reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Joins array elements into a string.
   * @param array The array to join.
   * @param separator The separator string.
   * @returns Result.Ok with the joined string, Result.Err if the operation throws.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/join-example.mts|Sample code}.
   */
  export function join<E>(
    array: readonly E[],
    separator?: string,
  ): Result<string, Error>;

  export function join(
    separator?: string,
  ): <E>(array: readonly E[]) => Result<string, Error>;

  export function join<E>(
    ...args:
      | readonly [array: readonly E[], separator?: string]
      | readonly [separator?: string]
  ): Result<string, Error> | ((array: readonly E[]) => Result<string, Error>) {
    switch (args.length) {
      case 0:
        return (array) => joinImpl(array, undefined);

      case 1: {
        const [arg] = args;
        if (isString(arg) || isUndefined(arg)) {
          return (array) => joinImpl(array, arg);
        }
        return joinImpl(arg, undefined);
      }
      case 2: {
        const [array, separator] = args;
        return joinImpl(array, separator);
      }
    }
  }

  const joinImpl = <E,>(
    array: readonly E[],
    separator: string | undefined,
  ): Result<string, Error> => {
    try {
      const result = array.join(separator);
      return Result.ok(result);
    } catch (error) {
      return Result.err(
        Error.isError(error) ? error : new Error(unknownToString(error)),
      );
    }
  };

  // transformation

  /**
   * Creates an array of tuples by pairing up corresponding elements from two arrays.
   * The resulting array has a length equal to the minimum of the two input array lengths.
   * @template E1 The type of the first array.
   * @template E2 The type of the second array.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns An array of tuples where each tuple contains corresponding elements from both arrays.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/zip-example.mts|Sample code}.
   */
  export const zip = <
    const Ar1 extends readonly unknown[],
    const Ar2 extends readonly unknown[],
  >(
    array1: Ar1,
    array2: Ar2,
  ): List.Zip<Ar1, Ar2> =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    seq(Uint32.min(size(array1), size(array2))).map((i) =>
      // Non-null assertion is safe here because `i` is always within bounds of both arrays up to the length of the shorter one.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tp(array1[i]!, array2[i]!),
    ) as unknown as List.Zip<Ar1, Ar2>;

  /**
   * Creates a new tuple by transforming each element with a mapping function.
   *
   * Preserves the tuple's length while allowing element type transformation.
   * The resulting tuple has the same structure but with transformed element types.
   *
   * @template T - The type of the input tuple
   * @template B - The type that elements will be transformed to
   * @param array - The input tuple
   * @param mapFn - Function that transforms each element (receives element and index)
   * @returns A new tuple with transformed elements, preserving the original length
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/map-example.mts|Sample code}.
   */
  export function map<const Ar extends readonly unknown[], B>(
    array: Ar,
    mapFn: (a: Ar[number], index: ArrayIndex<Ar>) => B,
  ): Readonly<{ [K in keyof Ar]: B }>;

  // curried version
  export function map<A, B>(
    mapFn: (a: A, index: SizeType.Arr) => B,
  ): <const Ar extends readonly A[]>(
    array: Ar,
  ) => Readonly<{ [K in keyof Ar]: B }>;

  export function map<A, B>(
    ...args:
      | readonly [array: readonly A[], mapFn: (a: A, index: SizeType.Arr) => B]
      | readonly [mapFn: (a: A, index: SizeType.Arr) => B]
  ): readonly B[] | ((array: readonly A[]) => readonly B[]) {
    switch (args.length) {
      case 2: {
        const [array, mapFn] = args;
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        return array.map(mapFn as never);
      }
      case 1: {
        const [mapFn] = args;
        return (array: readonly A[]) => map(array, mapFn);
      }
    }
  }

  /**
   * Filters an array based on a predicate function.
   *
   * This function returns a new array containing only the elements that satisfy the predicate.
   * It provides both direct usage and curried versions for functional composition.
   * Supports type guard predicates for type narrowing.
   *
   * @template Ar The exact type of the input array, used for precise return type inference.
   * @template E The type of elements in the array.
   * @template S The narrowed type when using type guard predicates.
   * @param array The array to filter.
   * @param predicate A function that tests each element. Returns `true` to keep the element, `false` to filter it out.
   * @returns A new array containing only the elements that satisfy the predicate.
   *
   * @see {@link filterNot} for filtering with negated predicate
   * @see {@link every} for testing if all elements satisfy a predicate
   * @see {@link some} for testing if any elements satisfy a predicate
   * @see {@link find} for finding the first element that satisfies a predicate
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/filter-example.mts|Sample code}.
   */
  // Type guard overloads
  export function filter<
    const Ar extends readonly unknown[],
    S extends Ar[number],
  >(
    array: Ar,
    predicate: (a: Ar[number], index: ArrayIndex<Ar>) => a is S,
  ): readonly S[];

  export function filter<E, S extends E>(
    predicate: (a: E, index: SizeType.Arr) => a is S,
  ): (array: readonly E[]) => readonly S[];

  // Regular boolean predicate overloads
  export function filter<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
  ): readonly Ar[number][];

  export function filter<E>(
    predicate: (a: E, index: SizeType.Arr) => boolean,
  ): (array: readonly E[]) => readonly E[];

  export function filter<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (a: E, index: SizeType.Arr) => boolean,
        ]
      | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return array.filter((a, i) => predicate(a, asUint32(i)));
      }
      case 1: {
        const [predicate] = args;
        return (array) => filter(array, predicate);
      }
    }
  }

  /**
   * Filters an array by excluding elements for which the predicate returns true.
   * This is the opposite of `Array.prototype.filter`.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param predicate A function `(a: A, index: number) => boolean` that returns `true` for elements to be excluded.
   * @returns A new array with elements for which the predicate returned `false`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/filter-not-example.mts|Sample code}.
   */
  export function filterNot<const Ar extends readonly unknown[]>(
    array: Ar,
    predicate: (a: Ar[number], index: ArrayIndex<Ar>) => boolean,
  ): readonly Ar[number][];

  export function filterNot<E>(
    predicate: (a: E, index: SizeType.Arr) => boolean,
  ): (array: readonly E[]) => readonly E[];

  export function filterNot<E>(
    ...args:
      | readonly [
          array: readonly E[],
          predicate: (a: E, index: SizeType.Arr) => boolean,
        ]
      | readonly [predicate: (a: E, index: SizeType.Arr) => boolean]
  ): readonly E[] | ((array: readonly E[]) => readonly E[]) {
    switch (args.length) {
      case 2: {
        const [array, predicate] = args;
        return array.filter((a, i) => !predicate(a, asUint32(i)));
      }
      case 1: {
        const [predicate] = args;
        return (array) => filterNot(array, predicate);
      }
    }
  }

  /**
   * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
   *
   * This function flattens nested arrays to the specified depth level.
   * A depth of 1 flattens one level, Number.POSITIVE_INFINITY flattens all levels.
   *
   * @template Ar The exact type of the input array.
   * @template D The depth of flattening.
   * @param array The array to flatten.
   * @param depth The depth level specifying how deep a nested array structure should be flattened.
   * @returns A new array with the sub-array elements concatenated.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/flat-example.mts|Sample code}.
   */
  export function flat<
    const Ar extends readonly unknown[],
    D extends SafeUintWithSmallInt = 1,
  >(array: Ar, depth?: D): readonly FlatArray<Ar, D>[];

  export function flat<D extends SafeUintWithSmallInt = 1>(
    depth?: number,
  ): <const Ar extends readonly unknown[]>(
    array: Ar,
  ) => readonly FlatArray<Ar, D>[];

  export function flat<E, D extends SafeUintWithSmallInt = 1>(
    ...args: readonly [array: readonly E[], depth?: D] | readonly [depth?: D]
  ): readonly unknown[] | ((array: readonly unknown[]) => readonly unknown[]) {
    switch (args.length) {
      case 2: {
        const [array, depth] = args;
        return array.flat(depth);
      }
      case 1: {
        const [arrayOrDepth] = args;
        if (typeof arrayOrDepth === 'number') {
          const depth = arrayOrDepth as SafeUintWithSmallInt | undefined;
          return (array) => flat(array, depth);
        } else if (arrayOrDepth === undefined) {
          return (array) => flat(array, 1);
        } else {
          expectType<typeof arrayOrDepth, readonly E[]>('=');
          return arrayOrDepth.flat();
        }
      }

      case 0:
        return (array) => flat(array, 1);
    }
  }

  /**
   * Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth,
   * after first mapping each element using a mapping function.
   *
   * This function is equivalent to calling `map` followed by `flat` with depth 1.
   *
   * @template Ar The exact type of the input array.
   * @template E The type of elements in the array.
   * @template B The type of elements returned by the mapping function.
   * @param array The array to map and flatten.
   * @param mapFn A function that produces new elements for the new array.
   * @returns A new array with mapped elements flattened.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/flat-map-example.mts|Sample code}.
   */
  export function flatMap<const Ar extends readonly unknown[], B>(
    array: Ar,
    mapFn: (a: Ar[number], index: ArrayIndex<Ar>) => readonly B[],
  ): readonly B[];

  export function flatMap<A, B>(
    mapFn: (a: A, index: SizeType.Arr) => readonly B[],
  ): (array: readonly A[]) => readonly B[];

  export function flatMap<A, B>(
    ...args:
      | readonly [
          array: readonly A[],
          mapFn: (a: A, index: SizeType.Arr) => readonly B[],
        ]
      | readonly [mapFn: (a: A, index: SizeType.Arr) => readonly B[]]
  ): readonly B[] | ((array: readonly A[]) => readonly B[]) {
    switch (args.length) {
      case 2: {
        const [array, mapFn] = args;
        return array.flatMap((a, i) => mapFn(a, asUint32(i)));
      }
      case 1: {
        const [mapFn] = args;
        return (array: readonly A[]) => flatMap(array, mapFn);
      }
    }
  }

  /**
   * Concatenates two arrays.
   * @template E1 The type of the first array (can be a tuple).
   * @template E2 The type of the second array (can be a tuple).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array that is the concatenation of the two input arrays. Type is `readonly [...E1, ...E2]`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/concat-example.mts|Sample code}.
   */
  export const concat = <
    const Ar1 extends readonly unknown[],
    const Ar2 extends readonly unknown[],
  >(
    array1: Ar1,
    array2: Ar2,
  ): readonly [...Ar1, ...Ar2] => [...array1, ...array2];

  /**
   * Partitions an array into sub-arrays of a specified size.
   * The last partition may be smaller if the array length is not a multiple of `chunkSize`.
   * Returns an empty array if chunkSize < 2.
   * @template N The size of each partition (must be a number type, typically a literal for precise typing).
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param chunkSize The size of each partition.
   * @returns An array of arrays, where each inner array has up to `chunkSize` elements.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/partition-example.mts|Sample code}.
   */
  export function partition<
    N extends WithSmallInt<PositiveInt & SizeType.Arr>,
    E,
  >(array: readonly E[], chunkSize: N): readonly (readonly E[])[];

  export function partition<N extends WithSmallInt<PositiveInt & SizeType.Arr>>(
    chunkSize: N,
  ): <E>(array: readonly E[]) => readonly (readonly E[])[];

  export function partition<
    N extends WithSmallInt<PositiveInt & SizeType.Arr>,
    E,
  >(
    ...args:
      | readonly [array: readonly E[], chunkSize: N]
      | readonly [chunkSize: N]
  ):
    | readonly (readonly E[])[]
    | ((array: readonly E[]) => readonly (readonly E[])[]) {
    switch (args.length) {
      case 2: {
        const [array, chunkSize] = args;
        return chunkSize < 2
          ? []
          : // eslint-disable-next-line total-functions/no-partial-division
            seq(asUint32(Math.ceil(array.length / chunkSize))).map((i) =>
              array.slice(chunkSize * i, chunkSize * (i + 1)),
            );
      }
      case 1: {
        const [chunkSize] = args;
        return (array) => partition(array, chunkSize);
      }
    }
  }

  /**
   * Reverses a tuple, preserving element types in their new positions.
   *
   * The type system precisely tracks the reversal, so the returned tuple
   * has its element types in the exact reverse order. This is more precise
   * than array reversal which loses positional type information.
   *
   * @template T - The tuple type to reverse
   * @param array - The input tuple
   * @returns A new tuple with elements in reverse order and precise typing
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-reversed-example.mts|Sample code}.
   *
   */
  export const toReversed = <const Ar extends readonly unknown[]>(
    array: Ar,
  ): List.Reverse<Ar> =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array.toReversed() as never;

  /**
   * Sorts an array by a value derived from its elements, using a numeric mapping.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparatorValueMapper A function `(value: A) => number` that maps an element to a number for comparison.
   * @param comparator An optional custom comparator function `(x: number, y: number) => number` for the mapped numbers. Defaults to ascending sort (x - y).
   * @returns A new array sorted by the mapped values.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-sorted-example.mts|Sample code}.
   */
  export const toSorted = <const Ar extends readonly unknown[]>(
    ...[array, comparator]: Ar extends readonly number[]
      ? readonly [
          array: Ar,
          // If the array elements are mapped to numbers, comparator is optional.
          comparator?: (x: Ar[number], y: Ar[number]) => number,
        ]
      : readonly [
          array: Ar,
          comparator: (x: Ar[number], y: Ar[number]) => number,
        ]
  ): IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], Ar[number]>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number]>
      : readonly Ar[number][] =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array.toSorted(
      // eslint-disable-next-line total-functions/no-unsafe-type-assertion
      (comparator as ((x: unknown, y: unknown) => number) | undefined) ??
        // eslint-disable-next-line total-functions/no-unsafe-type-assertion
        ((x, y) => (x as number) - (y as number)),
    ) as never;

  /**
   * Sorts an array by a value derived from its elements, using a numeric mapping.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparatorValueMapper A function `(value: A) => number` that maps an element to a number for comparison.
   * @param comparator An optional custom comparator function `(x: number, y: number) => number` for the mapped numbers. Defaults to ascending sort (x - y).
   * @returns A new array sorted by the mapped values.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/to-sorted-by-example.mts|Sample code}.
   */
  export function toSortedBy<const Ar extends readonly unknown[]>(
    array: Ar,
    comparatorValueMapper: (value: Ar[number]) => number,
    // If the array elements are mapped to numbers, comparator is optional.
    comparator?: (x: number, y: number) => number,
  ): IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], Ar[number]>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number]>
      : readonly Ar[number][];

  export function toSortedBy<const Ar extends readonly unknown[], const V>(
    array: Ar,
    comparatorValueMapper: (value: Ar[number]) => V,
    comparator: (x: V, y: V) => number,
  ): IsFixedLengthList<Ar> extends true
    ? ArrayOfLength<Ar['length'], Ar[number]>
    : Ar extends NonEmptyArray<unknown>
      ? NonEmptyArray<Ar[number]>
      : readonly Ar[number][];

  export function toSortedBy<E, const V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator?: (x: V, y: V) => number,
  ): readonly E[] {
    return array.toSorted((x, y) =>
      comparator === undefined
        ? // This branch assumes V is number if comparator is undefined.
          // The overloads should handle this, but explicit cast might be needed if V is not number.
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          (comparatorValueMapper(x) as number) -
          // eslint-disable-next-line total-functions/no-unsafe-type-assertion
          (comparatorValueMapper(y) as number)
        : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
    );
  }

  /**
   * Returns an array of successively reduced values from an array, starting with an initial value.
   *
   * This function creates a \"running tally\" by applying a reducer function to each element and
   * accumulating the results. Unlike {@link reduce} which returns a single final value, `scan`
   * returns all intermediate accumulated values, providing visibility into the reduction process.
   *
   * **Key Differences from Reduce:**
   * - {@link reduce}: `[1, 2, 3] -> 6` (final sum only)
   * - `scan`: `[1, 2, 3] -> [0, 1, 3, 6]` (all intermediate sums including initial value)
   *
   * **Guaranteed Non-Empty Return:** The result is always a {@link NonEmptyArray}<S> because it includes
   * the initial value as the first element, even for empty input arrays. This provides type safety
   * and eliminates the need for empty array checks.
   *
   * **Array Length Relationship:** `result.length === array.length + 1` (includes initial value)
   *
   * **Curried Usage:** Supports currying for functional composition - when called with only the reducer
   * and initial value, returns a reusable function that can be applied to arrays.
   *
   * @template E The type of elements in the input array.
   * @template S The type of the accumulated values and the initial value.
   * @param array The input array to scan over. Can be empty (result will still contain the initial value).
   * @param reducer A function `(accumulator: S, currentValue: E, currentIndex: SizeType.Arr) => S` that:
   *   - **accumulator:** The current accumulated value (starts with `init`, then previous results)
   *   - **currentValue:** The current array element being processed
   *   - **currentIndex:** The 0-based index of the current element (typed as {@link SizeType.Arr})
   *   - **returns:** The new accumulated value to include in the result array
   * @param init The initial accumulated value. Becomes the first element of the result array.
   * @returns A {@link NonEmptyArray}<S> of accumulated values with length `array.length + 1`:
   *   - `result[0]` is always the `init` value
   *   - `result[i+1]` is the result of applying the reducer to `result[i]` and `array[i]`
   *   - Guaranteed to be non-empty regardless of input array length
   *
   * @see {@link reduce} for getting only the final accumulated value
   * @see {@link NonEmptyArray} for understanding the guaranteed non-empty return type
   * @see {@link SizeType.Arr} for the index parameter type
   * @see Array.prototype.reduce for the standard reduce function
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/scan-example.mts|Sample code}.
   */
  export function scan<const Ar extends readonly unknown[], S>(
    array: Ar,
    reducer: (
      accumulator: S,
      currentValue: Ar[number],
      currentIndex: ArrayIndex<Ar>,
    ) => S,
    init: S,
  ): NonEmptyArray<S>;

  export function scan<E, S>(
    reducer: (accumulator: S, currentValue: E, currentIndex: SizeType.Arr) => S,
    init: S,
  ): (array: readonly E[]) => NonEmptyArray<S>;

  export function scan<E, S>(
    ...args:
      | readonly [
          array: readonly E[],
          reducer: (
            accumulator: S,
            currentValue: E,
            currentIndex: SizeType.Arr,
          ) => S,
          init: S,
        ]
      | readonly [
          reducer: (
            accumulator: S,
            currentValue: E,
            currentIndex: SizeType.Arr,
          ) => S,
          init: S,
        ]
  ): NonEmptyArray<S> | ((array: readonly E[]) => NonEmptyArray<S>) {
    switch (args.length) {
      case 3: {
        const [array, reducer, init] = args;
        const mut_result: MutableNonEmptyArray<S> = castMutable(
          newArray<S, PositiveUint32>(asPositiveUint32(array.length + 1), init),
        );

        let mut_acc = init;

        for (const [index, value] of array.entries()) {
          mut_acc = reducer(mut_acc, value, asUint32(index));
          mut_result[index + 1] = mut_acc;
        }

        return mut_result;
      }
      case 2: {
        const [reducer, init] = args;
        return (array) => scan(array, reducer, init);
      }
    }
  }

  /**
   * Groups elements of an array by a key derived from each element, returning an immutable {@link IMap}.
   *
   * This function categorizes array elements into groups based on a computed key, using the efficient
   * {@link IMap} data structure for the result. The grouper function receives both the element and its
   * index, enabling flexible grouping strategies.
   *
   * **MapSetKeyType Constraint:** The group key type `G` must extend {@link MapSetKeyType}, which includes
   * primitive types that can be used as Map keys (string, number, boolean, symbol, null, undefined).
   * This constraint ensures type safety and efficient key-based operations.
   *
   * **IMap Return Type:** Returns an {@link IMap}<G, readonly E[]> where:
   * - Keys are the computed group identifiers of type `G`
   * - Values are immutable arrays containing all elements that belong to each group
   * - Preserves insertion order of first occurrence of each group
   * - Maintains type safety with precise generic types
   *
   * **Curried Usage:** Supports currying for functional composition - when called with only the grouper
   * function, returns a reusable function that can be applied to arrays.
   *
   * @template E The type of elements in the input array.
   * @template G The type of the group key, constrained to {@link MapSetKeyType} (primitives usable as Map keys).
   *   Must be one of: `string | number | boolean | symbol | null | undefined`
   * @param array The input array to group. Can be empty (returns empty {@link IMap}).
   * @param grouper A function `(value: E, index: SizeType.Arr) => G` that computes the group key for each element.
   *   - **value:** The current array element
   *   - **index:** The 0-based index of the element (typed as {@link SizeType.Arr})
   *   - **returns:** The group key (must be {@link MapSetKeyType})
   * @returns An {@link IMap}<G, readonly E[]> where:
   *   - Keys are unique group identifiers computed by the grouper function
   *   - Values are immutable arrays of elements belonging to each group
   *   - Empty groups are not included (only groups with at least one element)
   *   - Insertion order is preserved based on first occurrence of each group key
   *
   * @see {@link IMap} for working with the returned immutable map
   * @see {@link MapSetKeyType} for understanding valid key types
   * @see {@link IMap.get} for safely accessing grouped results
   * @see {@link IMap.map} for transforming grouped data
   * @see {@link Optional} for handling potentially missing groups
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/group-by-example.mts|Sample code}.
   */
  export function groupBy<
    const Ar extends readonly unknown[],
    G extends MapSetKeyType,
  >(
    array: Ar,
    grouper: (value: Ar[number], index: ArrayIndex<Ar>) => G,
  ): IMap<G, readonly Ar[number][]>;

  export function groupBy<E, G extends MapSetKeyType>(
    grouper: (value: E, index: SizeType.Arr) => G,
  ): (array: readonly E[]) => IMap<G, readonly E[]>;

  export function groupBy<E, G extends MapSetKeyType>(
    ...args:
      | readonly [
          array: readonly E[],
          grouper: (value: E, index: SizeType.Arr) => G,
        ]
      | readonly [grouper: (value: E, index: SizeType.Arr) => G]
  ): IMap<G, readonly E[]> | ((array: readonly E[]) => IMap<G, readonly E[]>) {
    switch (args.length) {
      case 2: {
        const [array, grouper] = args;
        const mut_groups = new Map<G, E[]>(); // Store mutable arrays internally

        for (const [index, e] of array.entries()) {
          const key = grouper(e, asUint32(index)); // Ensure index is treated as SizeType.Arr
          const mut_group = mut_groups.get(key);
          if (mut_group !== undefined) {
            mut_group.push(e);
          } else {
            mut_groups.set(key, [e]);
          }
        }
        // Cast to IMap<G, readonly A[]> for the public interface
        return IMap.create<G, readonly E[]>(mut_groups);
      }
      case 1: {
        const [grouper] = args;
        return (array) => groupBy(array, grouper);
      }
    }
  }

  /**
   * Creates a new array with unique elements from the input array. Order is preserved from the first occurrence.
   * Uses `Set` internally for efficient uniqueness checking.
   * @template P The type of elements in the array.
   * @param array The input array.
   * @returns A new array with unique elements from the input array. Returns `[]` for an empty input.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/uniq-example.mts|Sample code}.
   */
  export const uniq = <const Ar extends readonly Primitive[]>(
    array: Ar,
  ): Ar extends NonEmptyArray<unknown>
    ? NonEmptyArray<Ar[number]>
    : readonly Ar[number][] =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    Array.from(new Set(array)) as never;

  /**
   * Creates a new array with unique elements from the input array, based on the values returned by `mapFn`.
   *
   * - If the input is a non-empty array, returns a non-empty array.
   * - Otherwise, returns a readonly array.
   *
   * @template E The type of elements in the array.
   * @template P The type of the mapped value (used for uniqueness comparison).
   * @param array The input array.
   * @param mapFn A function `(value: A) => P` to map elements to values for uniqueness comparison.
   * @returns A new array with unique elements based on the mapped values.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/uniq-by-example.mts|Sample code}.
   */
  export const uniqBy = <
    const Ar extends readonly unknown[],
    P extends Primitive,
  >(
    array: Ar,
    mapFn: (value: Ar[number]) => P,
  ): Ar extends NonEmptyArray<unknown>
    ? NonEmptyArray<Ar[number]>
    : readonly Ar[number][] => {
    const mut_mappedValues = new Set<P>();

    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    return array.filter((val) => {
      const mappedValue = mapFn(val);

      if (mut_mappedValues.has(mappedValue)) return false;
      mut_mappedValues.add(mappedValue);

      return true;
    }) satisfies readonly Ar[number][] as never;
  };

  // set operations & equality

  /**
   * Checks if two arrays are equal by performing a shallow comparison of their elements.
   * @template E The type of elements in the arrays.
   * @param array1 The first array.
   * @param array2 The second array.
   * @param equality An optional function `(a: T, b: T) => boolean` to compare elements. Defaults to `Object.is`.
   * @returns `true` if the arrays have the same length and all corresponding elements are equal according to the `equality` function, `false` otherwise.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/eq-example.mts|Sample code}.
   */
  export const eq = <E,>(
    array1: readonly E[],
    array2: readonly E[],
    equality: (a: E, b: E) => boolean = Object.is,
  ): boolean =>
    array1.length === array2.length &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    array1.every((v, i) => equality(v, array2[i]!));

  /**
   * Alias for `eq`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/equal-example.mts|Sample code}.
   */
  export const equal = eq;

  /**
   * Checks if the first array (`array1`) is a subset of the second array (`array2`).
   * An array `A` is a subset of `B` if all elements of `A` are also present in `B`.
   * Elements must be primitive types for `includes` to work reliably for comparison.
   * @template E1 The type of elements in the first array (subset candidate), must be a primitive type.
   * @template E2 The type of elements in the second array (superset candidate), must be a primitive type.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns `true` if `array1` is a subset of `array2`, `false` otherwise.
   * @remarks `array1` ⊂ `array2`
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-subset-example.mts|Sample code}.
   */
  export const isSubset = <E1 extends Primitive, E2 extends Primitive = E1>(
    array1: readonly E1[],
    array2: readonly E2[],
  ): boolean =>
    array1.every((a) =>
      // eslint-disable-next-line total-functions/no-unsafe-type-assertion
      array2.includes(a as E1 & E2),
    );

  /**
   * Checks if the first array (`array1`) is a superset of the second array (`array2`).
   * An array `A` is a superset of `B` if all elements of `B` are also present in `A`.
   * Elements must be primitive types.
   * @template E1 The type of elements in the first array (superset candidate), must be a primitive type.
   * @template E2 The type of elements in the second array (subset candidate), must be a primitive type.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns `true` if `array1` is a superset of `array2`, `false` otherwise.
   * @remarks `array1` ⊃ `array2`
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/is-superset-example.mts|Sample code}.
   */
  export const isSuperset = <E1 extends Primitive, E2 extends Primitive = E1>(
    array1: readonly E1[],
    array2: readonly E2[],
  ): boolean => isSubset(array2, array1);

  /**
   * Returns the intersection of two arrays of primitive types.
   * The intersection contains elements that are present in both arrays. Order is based on `array1`.
   * @template E1 The type of elements in the first array (must be a primitive type).
   * @template E2 The type of elements in the second array (must be a primitive type).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array containing elements that are in both `array1` and `array2`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/set-intersection-example.mts|Sample code}.
   */
  export const setIntersection = <
    E1 extends Primitive,
    E2 extends Primitive = E1,
  >(
    array1: readonly E1[],
    array2: readonly E2[],
  ): readonly (E1 & E2)[] =>
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    array1.filter((e) => array2.includes(e as E1 & E2)) as (E1 & E2)[];

  /**
   * Returns the set difference of two arrays (`array1` - `array2`).
   * The difference contains elements that are in `array1` but not in `array2`. Order is based on `array1`.
   * Elements must be primitive types.
   * @template E The type of elements in the arrays (must be a primitive type).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array containing elements from `array1` that are not in `array2`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/set-difference-example.mts|Sample code}.
   */
  export const setDifference = <E extends Primitive>(
    array1: readonly E[],
    array2: readonly E[],
  ): readonly E[] => array1.filter((e) => !array2.includes(e));

  /**
   * Returns the set difference of two sorted arrays of numbers (`sortedList1` - `sortedList2`).
   * This operation is more efficient for sorted arrays than the generic `setDifference`.
   * The resulting array is also sorted.
   * @template E The type of numbers in the arrays (must extend `number`).
   * @param sortedList1 The first sorted array of numbers.
   * @param sortedList2 The second sorted array of numbers.
   * @returns A new sorted array containing numbers from `sortedList1` that are not in `sortedList2`.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/sorted-num-set-difference-example.mts|Sample code}.
   */
  export const sortedNumSetDifference = <E extends number>(
    sortedList1: readonly E[],
    sortedList2: readonly E[],
  ): readonly E[] => {
    const mut_result: E[] = [];
    let mut_it1 = 0; // iterator for sortedList1
    let mut_it2 = 0; // iterator for sortedList2

    while (mut_it1 < sortedList1.length && mut_it2 < sortedList2.length) {
      // Non-null assertions are safe due to loop condition
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const val1 = sortedList1[mut_it1]!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const val2 = sortedList2[mut_it2]!;

      if (val1 === val2) {
        mut_it1 += 1;
        mut_it2 += 1;
      } else if (val1 < val2) {
        mut_result.push(val1);
        mut_it1 += 1;
      } else {
        // val1 > val2
        mut_it2 += 1;
      }
    }
    // Add remaining elements from sortedList1
    for (; mut_it1 < sortedList1.length; mut_it1 += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mut_result.push(sortedList1[mut_it1]!);
    }

    return mut_result;
  };

  // iterators

  /**
   * Returns an iterable of key-value pairs for every entry in the array.
   *
   * This function returns an array where each element is a tuple containing the index and value.
   * The indices are branded as `SizeType.Arr` for type safety.
   *
   * @template Ar The exact type of the input array.
   * @param array The array to get entries from.
   * @returns An array of `[index, value]` pairs.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/entries-example.mts|Sample code}.
   *
   */
  export const entries = function* <E>(
    array: readonly E[],
  ): ArrayIterator<readonly [SizeType.Arr, E]> {
    for (const [index, value] of array.entries()) {
      yield [asUint32(index), value] as const;
    }
  };

  /**
   * Returns an iterable of values in the array.
   *
   * This function is essentially an identity function that returns a copy of the array.
   * It's included for API completeness and consistency with native Array methods.
   *
   * @template Ar The exact type of the input array.
   * @param array The array to get values from.
   * @returns A copy of the input array.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/values-example.mts|Sample code}.
   *
   */
  export const values = function* <E>(array: readonly E[]): ArrayIterator<E> {
    for (const value of array.values()) {
      yield value;
    }
  };

  /**
   * Returns an iterable of keys in the array.
   *
   * This function returns an array of branded indices (`SizeType.Arr`) for type safety.
   *
   * @template Ar The exact type of the input array.
   * @param array The array to get indices from.
   * @returns An array of indices.
   *
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/indices-example.mts|Sample code}.
   *
   */
  export const indices = function* <E>(
    array: readonly E[],
  ): ArrayIterator<SizeType.Arr> {
    for (const key of array.keys()) {
      yield asUint32(key);
    }
  };

  // aliases

  /**
   * Alias for `head`. Returns the first element of an array.
   * @see {@link head}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/first-example.mts|Sample code}.
   */
  export const first = head;

  /**
   * Alias for `tail`. Returns all elements of an array except the first one.
   * @see {@link tail}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/rest-example.mts|Sample code}.
   */
  export const rest = tail;

  /**
   * Alias for `skip`. Skips the first N elements of an array.
   * @see {@link skip}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/drop-example.mts|Sample code}.
   */
  export const drop = skip;

  /**
   * Alias for `foldl`. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
   * @see {@link foldl}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/reduce-example.mts|Sample code}.
   */
  export const reduce = foldl;

  /**
   * Alias for `foldr`. Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
   * @see {@link foldr}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/reduce-right-example.mts|Sample code}.
   */
  export const reduceRight = foldr;

  /**
   * Alias for `partition`. Splits an array into chunks of a specified size.
   * @see {@link partition}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/chunk-example.mts|Sample code}.
   */
  export const chunk = partition;

  /**
   * Alias for `create`. Creates a new array of the specified length, with each position filled with the provided initial value.
   * @see {@link create}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/new-array-example.mts|Sample code}.
   */
  export const newArray = create;

  /**
   * Alias for `size`. Returns the length of an array.
   * @see {@link size}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/length-example.mts|Sample code}.
   */
  export const length = size;

  /**
   * Alias for `indices`. Returns an iterable of keys in the array.
   * @see {@link indices}
   * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/array/array-utils/keys-example.mts|Sample code}.
   */
  export const keys = indices;
}
