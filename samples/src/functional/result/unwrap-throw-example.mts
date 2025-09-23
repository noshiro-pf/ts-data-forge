// Example: src/functional/result.mts (Result.unwrapThrow)
import { Result } from 'ts-data-forge';

const okResult = Result.ok('data');
const errResult = Result.err(new Error('fail'));

assert.strictEqual(Result.unwrapThrow(okResult), 'data');
assert.throws(() => Result.unwrapThrow(errResult), /fail/);
