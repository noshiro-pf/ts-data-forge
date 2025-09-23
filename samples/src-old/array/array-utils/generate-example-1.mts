// Example: src/array/array-utils.mts (generate)
import { Arr } from 'ts-data-forge';

const numbers = Arr.generate<number>(function* () {
  yield 1;
  yield 2;
  yield 3;
});

assert.deepStrictEqual(numbers, [1, 2, 3]);
