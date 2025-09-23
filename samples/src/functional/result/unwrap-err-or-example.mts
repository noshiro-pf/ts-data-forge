// Example: src/functional/result.mts (Result.unwrapErrOr)
import { Result } from 'ts-data-forge';

const okResult = Result.ok('success');
const errResult = Result.err('failure');

assert.strictEqual(Result.unwrapErrOr(okResult, 'default'), 'default');
assert.strictEqual(Result.unwrapErrOr(errResult, 'default'), 'failure');

const unwrapError = Result.unwrapErrOr('fallback error');

assert.strictEqual(unwrapError(Result.err('boom')), 'boom');
assert.strictEqual(unwrapError(Result.ok('no error')), 'fallback error');
