// Example: src/array/array-utils.mts (zip)
import { Arr } from 'ts-data-forge';

assert.deepStrictEqual(
  Arr.zip([1, 2, 3], ['a', 'b', 'c']) satisfies readonly (readonly [
    number,
    string,
  ])[],
  [
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ],
);
assert.deepStrictEqual(
  Arr.zip([1, 2], ['a', 'b', 'c']) satisfies readonly (readonly [
    number,
    string,
  ])[],
  [
    [1, 'a'],
    [2, 'b'],
  ],
);
assert.deepStrictEqual(
  Arr.zip([1, 2, 3], ['a']) satisfies readonly (readonly [number, string])[],
  [[1, 'a']],
);
assert.deepStrictEqual(
  Arr.zip([], ['a']) satisfies readonly (readonly [number, string])[],
  [],
);
