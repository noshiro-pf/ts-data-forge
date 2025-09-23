// Example: src/array/array-utils.mts (foldl)
import { Arr } from 'ts-data-forge';

const sum = Arr.foldl([1, 2, 3], (total, n) => total + n, 0);
assert.strictEqual(sum, 6);
const uppercased = Arr.foldl(
  ['a', 'b', 'c'],
  (acc, str) => acc + str.toUpperCase(),
  '',
);
assert.strictEqual(uppercased, 'ABC');
