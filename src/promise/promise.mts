import { Result } from '../functional/index.mjs';

/**
 * Creates a Promise that wraps the result in a Result type for type-safe error handling.
 * This function is an alternative to `new Promise(executor)` that provides enhanced type safety
 * by returning a Result type instead of throwing exceptions.
 *
 * @template S - The type of successful value
 * @template E - The type of error value
 * @param executor - Function that takes resolve and reject callbacks
 * @returns A Promise that resolves to a Result containing either success or error
 *
 */
export const createPromise = <S, E>(
  executor: (resolve: (value: S) => void, reject: (reason?: E) => void) => void,
): Promise<Result<S, E>> =>
  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  Result.fromPromise(new Promise<S>(executor)) satisfies Promise<
    Result<S, unknown>
  > as Promise<Result<S, E>>;
