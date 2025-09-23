// Example: src/functional/result.mts (Result.unwrapOkOr)
import { Result } from 'ts-data-forge';

const okValue = Result.ok(10);
const errValue = Result.err('fail');

assert.strictEqual(Result.unwrapOkOr(okValue, 0), 10);
assert.strictEqual(Result.unwrapOkOr(errValue, 0), 0);

const unwrapWithDefault = Result.unwrapOkOr(5);

assert.strictEqual(unwrapWithDefault(Result.ok(3)), 3);
assert.strictEqual(unwrapWithDefault(Result.err('no data')), 5);
