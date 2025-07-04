import { createPromise } from './promise.mjs';
import { Result } from '../functional/index.mjs';

describe('Promise JSDoc examples', () => {
  test('createPromise example', async () => {
    const result = await createPromise<string, Error>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Success!");
        } else {
          reject(new Error("Failed"));
        }
      }, 100); // Shorter timeout for tests
    });

    if (Result.isOk(result)) {
      console.log(result.value); // "Success!"
    } else {
      console.log(result.value); // Error: Failed
    }
  });
});