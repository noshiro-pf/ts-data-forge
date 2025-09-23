// Example: src/functional/result.mts (Result.unwrapOk)
import { Result } from 'ts-data-forge';

const okResult = Result.ok(42);
const errResult = Result.err('oops');

assert.strictEqual(Result.unwrapOk(okResult), 42);
assert.strictEqual(Result.unwrapOk(errResult), undefined);
