// Example: src/functional/result.mts (Result.isResult)
import { Result } from 'ts-data-forge';

const okValue = Result.ok('success');
const errValue = Result.err(new Error('failure'));
const notResult = { $$tag: 'ts-data-forge::Result.ok' };

assert.strictEqual(Result.isResult(okValue), true);
assert.strictEqual(Result.isResult(errValue), true);
assert.strictEqual(Result.isResult(notResult), false);
