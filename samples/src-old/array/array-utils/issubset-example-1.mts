// Example: src/array/array-utils.mts (isSubset)
import { Arr } from 'ts-data-forge';

assert.ok(Arr.isSubset([1, 2], [1, 2, 3]));
assert.notOk(Arr.isSubset([1, 2, 3], [1, 2]));
assert.ok(Arr.isSubset([], [1, 2, 3]));
assert.notOk(Arr.isSubset([1, 5], [1, 2, 3]));
