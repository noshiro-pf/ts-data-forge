import { Result } from '../index.mjs';
import { createPromise } from './promise.mjs';

describe('createPromise', () => {
  test('JSDoc example', async () => {
    const result = await createPromise<string, Error>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve('Success!');
        } else {
          reject(new Error('Failed'));
        }
      }, 1000);
    });

    if (Result.isOk(result)) {
      console.log(Result.unwrapOk(result)); // "Success!"
    } else {
      console.log(Result.unwrapErr(result)); // Error: Failed
    }
  });
});
