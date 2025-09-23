// Example: src/array/array-utils.mts (sum)
import { Arr } from 'ts-data-forge';

assert.strictEqual(Arr.sum([1, 2, 3]), 6);
assert.strictEqual(Arr.sum([]), 0);
assert.strictEqual(Arr.sum([-1, 0, 1]), 0);
