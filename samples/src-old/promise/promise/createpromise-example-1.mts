// Example: src/promise/promise.mts (createPromise)

import { createPromise, Result } from 'ts-data-forge';

const successResult = await createPromise<string, Error>((resolve) => {
  resolve('Success!');
});
assert(Result.isOk(successResult));
assert.strictEqual(successResult.value, 'Success!');

const failure = new Error('Failed');
const errorResult = await createPromise<string, Error>((_, reject) => {
  reject(failure);
});

assert(Result.isErr(errorResult));
assert.strictEqual(errorResult.value, failure);
