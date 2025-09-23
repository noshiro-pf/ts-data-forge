// Example: src/functional/result.mts (Result.ok / Result.err)
import { Result } from 'ts-data-forge';

const success = Result.ok({ id: 1 });
const failure = Result.err(new Error('missing data'));

assert.deepStrictEqual(success, {
  $$tag: 'ts-data-forge::Result.ok',
  value: { id: 1 },
});
assert.strictEqual(Result.isErr(failure), true);
