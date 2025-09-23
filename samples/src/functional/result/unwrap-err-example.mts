// Example: src/functional/result.mts (Result.unwrapErr)
import { Result } from 'ts-data-forge';

const okResult = Result.ok('data');
const errResult = Result.err('problem');

assert.strictEqual(Result.unwrapErr(okResult), undefined);
assert.strictEqual(Result.unwrapErr(errResult), 'problem');
