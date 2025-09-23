// Example: src/array/array-utils.mts (generateAsync)
import { Arr } from 'ts-data-forge';

const numbers = await Arr.generateAsync<number>(async function* () {
  yield 1;
  await Promise.resolve();
  yield 2;
});

assert.deepStrictEqual(numbers, [1, 2]);
