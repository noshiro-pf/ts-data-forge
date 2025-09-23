// Example: src/array/array-utils.mts (isSuperset)
import { Arr } from 'ts-data-forge';

assert.ok(Arr.isSuperset([1, 2, 3], [1, 2]));
assert.notOk(Arr.isSuperset([1, 2], [1, 2, 3]));
assert.ok(Arr.isSuperset([1, 2, 3], []));
