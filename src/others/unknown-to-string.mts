import { Result } from '../functional/index.mjs';
import { isNonNullish } from '../guard/index.mjs';

/**
 * Converts an unknown value to its string representation in a type-safe manner.
 * Handles all JavaScript types with proper error handling for circular references.
 *
 * @param value - The unknown value to convert to string
 * @param options - Optional configuration for the conversion
 * @param options.prettyPrintObject - If true, objects are formatted with 2-space indentation
 * @returns A Result containing either the string representation or an Error for failures
 *
 * @example
 * ```ts
 * // Basic conversions
 * assert(Result.unwrapOk(unknownToString('hello')) === 'hello');
 * assert(Result.unwrapOk(unknownToString(123)) === '123');
 * assert(Result.unwrapOk(unknownToString(null)) === 'null');
 * assert(Result.unwrapOk(unknownToString({ a: 1 })) === '{"a":1}');
 *
 * // Circular reference handling
 * const circular: any = {};
 * circular.self = circular;
 * assert(Result.isErr(unknownToString(circular)));
 * ```
 *
 */
export const unknownToString = (
  value: unknown,
  options?: Partial<Readonly<{ prettyPrintObject: boolean }>>,
): Result<string, Error> => {
  switch (typeof value) {
    case 'string':
      return Result.ok(value);

    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol':
    case 'function':
      return Result.ok(value.toString());

    case 'object':
      if (!isNonNullish(value)) {
        return Result.ok('null');
      }
      try {
        const stringified =
          options?.prettyPrintObject === true
            ? JSON.stringify(value, undefined, 2)
            : JSON.stringify(value);
        return Result.ok(stringified);
      } catch (error) {
        return Result.err(
          error instanceof Error
            ? error
            : new Error('Failed to stringify object'),
        );
      }

    case 'undefined':
      return Result.ok('undefined');
  }
};
