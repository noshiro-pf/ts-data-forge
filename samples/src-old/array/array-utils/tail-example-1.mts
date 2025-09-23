// Example: src/array/array-utils.mts (tail)
import { Arr } from 'ts-data-forge';

assert.deepStrictEqual(Arr.tail([1, 2, 3]) satisfies readonly [2, 3], [2, 3]);
assert.deepStrictEqual(Arr.tail([1]) satisfies readonly [], []);
assert.deepStrictEqual(Arr.tail([]) satisfies readonly [], []);
