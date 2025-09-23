// Example: src/array/array-utils.mts (takeLast)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const tail = Arr.takeLast([1, 2, 3, 4], 2);
assert.deepStrictEqual(tail satisfies readonly [3, 4], [3, 4]);

// Curried usage for pipe composition
const takeLast2 = Arr.takeLast(2);
const result = pipe([1, 2, 3, 4, 5]).map(takeLast2).value;
assert.deepStrictEqual(result satisfies readonly [4, 5], [4, 5]);
