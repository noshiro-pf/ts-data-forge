// Example: src/array/array-utils.mts (setIntersection)
import { Arr } from 'ts-data-forge';

assert.deepStrictEqual(
  Arr.setIntersection([1, 2, 3], [2, 3, 4]) satisfies readonly number[],
  [2, 3],
);
assert.deepStrictEqual(
  Arr.setIntersection(['a', 'b'], ['b', 'c']) satisfies readonly string[],
  ['b'],
);
assert.deepStrictEqual(
  Arr.setIntersection([1, 2], [3, 4]) satisfies readonly number[],
  [],
);
