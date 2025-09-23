// Example: src/array/array-utils.mts (sortedNumSetDifference)
import { Arr } from 'ts-data-forge';

assert.deepStrictEqual(
  Arr.sortedNumSetDifference(
    [1, 2, 3, 5],
    [2, 4, 5],
  ) satisfies readonly number[],
  [1, 3],
);
assert.deepStrictEqual(
  Arr.sortedNumSetDifference([1, 2, 3], [1, 2, 3]) satisfies readonly number[],
  [],
);
assert.deepStrictEqual(
  Arr.sortedNumSetDifference([1, 2], [3, 4]) satisfies readonly number[],
  [1, 2],
);
