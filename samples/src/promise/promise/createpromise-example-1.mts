// Sample code extracted from src/promise/promise.mts (createPromise)

import { createPromise, Result } from 'ts-data-forge';

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
  console.log(result.value); // "Success!"
} else {
  console.log(result.value); // Error: Failed
}

export { result };
