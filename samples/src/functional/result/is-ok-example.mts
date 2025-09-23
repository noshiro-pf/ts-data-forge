// Example: src/functional/result.mts (Result.isOk / Result.isErr)
import { Result } from 'ts-data-forge';

const operation = Result.ok(3);
const failure = Result.err('error');

if (Result.isOk(operation)) {
  const value: number = operation.value;
  assert.strictEqual(value, 3);
}

assert.strictEqual(Result.isErr(failure), true);
