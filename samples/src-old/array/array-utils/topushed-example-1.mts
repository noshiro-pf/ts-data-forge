// Example: src/array/array-utils.mts (toPushed)
import { Arr, pipe } from 'ts-data-forge';

// Regular usage
const appended = Arr.toPushed([1, 2], 3);
assert.deepStrictEqual(appended satisfies readonly [1, 2, 3], [1, 2, 3]);

// Curried usage for pipe composition
const addZero = Arr.toPushed(0);
const result = pipe([1, 2, 3]).map(addZero).value;
assert.deepStrictEqual(result satisfies readonly [1, 2, 3, 0], [1, 2, 3, 0]);
