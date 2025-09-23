// Example: src/array/array-utils.mts (take)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const taken = Arr.take([1, 2, 3, 4], 2);
assert.deepStrictEqual(taken satisfies readonly [1, 2], [1, 2]);

// Curried usage for pipe composition
const takeFirst3 = Arr.take(3);
const result = pipe([1, 2, 3, 4, 5]).map(takeFirst3).value;
assert.deepStrictEqual(result satisfies readonly [1, 2, 3], [1, 2, 3]);
