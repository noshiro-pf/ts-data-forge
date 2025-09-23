// Example: src/functional/result.mts
import { Optional, Result } from 'ts-data-forge';

const success = Result.ok(5);
const failure = Result.err(new Error('fail'));
const mapped = Result.map(success, (n) => n * 2);
const mappedErr = Result.mapErr(failure, (error) => error.message);
const swapped = Result.swap(failure);
const optional = Result.toOptional(success);
const fallback = Result.orElse(failure, success);

assert.deepStrictEqual(fallback, Result.ok(5));
assert.deepStrictEqual(mapped, Result.ok(10));
assert.deepStrictEqual(mappedErr, Result.err('fail'));
assert.deepStrictEqual(optional, Optional.some(5));
assert.deepStrictEqual(success, Result.ok(5));
assert.deepStrictEqual(swapped, Result.ok(Result.unwrapErrThrow(failure)));
