// Example: src/array/array-utils.mts (setDifference)
import { Arr } from 'ts-data-forge';

assert.deepStrictEqual(
  Arr.setDifference([1, 2, 3], [2, 3, 4]) satisfies readonly number[],
  [1],
);
assert.deepStrictEqual(
  Arr.setDifference([1, 2, 3], [1, 2, 3]) satisfies readonly number[],
  [],
);
assert.deepStrictEqual(
  Arr.setDifference([1, 2], [3, 4]) satisfies readonly number[],
  [1, 2],
);
