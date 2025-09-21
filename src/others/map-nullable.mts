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
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/map-nullable/mapnullable-example-1.mts|Sample code}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/map-nullable/mapnullable-example-2.mts|Sample code 2}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/map-nullable/mapnullable-example-3.mts|Sample code 3}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/map-nullable/mapnullable-example-4.mts|Sample code 4}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/map-nullable/mapnullable-example-5.mts|Sample code 5}.
 *
 * @see {@link https://github.com/noshiro-pf/ts-data-forge/blob/main/samples/src/others/map-nullable/mapnullable-example-6.mts|Sample code 6}.
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
