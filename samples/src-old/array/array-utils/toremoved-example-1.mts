// Example: src/array/array-utils.mts (toRemoved)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Regular usage
const removed = Arr.toRemoved([1, 2, 3], 1);
expectType<typeof removed, readonly (1 | 2 | 3)[]>('=');
assert.deepStrictEqual(removed, [1, 3]);

// Curried usage for pipe composition
const removeFirst = Arr.toRemoved(0);
const result = pipe([10, 20, 30]).map(removeFirst).value;
expectType<typeof result, readonly (10 | 20 | 30)[]>('=');
assert.deepStrictEqual(result, [20, 30]);
