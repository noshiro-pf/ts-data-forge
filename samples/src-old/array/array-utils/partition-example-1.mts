// Example: src/array/array-utils.mts (partition)
import { Arr } from 'ts-data-forge';

assert.deepStrictEqual(
  Arr.partition([1, 2, 3, 4, 5, 6], 2) satisfies readonly (readonly number[])[],
  [
    [1, 2],
    [3, 4],
    [5, 6],
  ],
);
assert.deepStrictEqual(
  Arr.partition(
    [1, 2, 3, 4, 5, 6, 7],
    3,
  ) satisfies readonly (readonly number[])[],
  [[1, 2, 3], [4, 5, 6], [7]],
);
