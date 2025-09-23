// Example: src/array/array-utils.mts (skipLast)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Regular usage
const trimmed = Arr.skipLast([1, 2, 3, 4], 2);
expectType<typeof trimmed, readonly [1, 2]>('=');
assert.deepStrictEqual(trimmed, [1, 2]);

// Curried usage for pipe composition
const skipLast2 = Arr.skipLast(2);
const result = pipe([1, 2, 3, 4, 5]).map(skipLast2).value;
expectType<typeof result, readonly [1, 2, 3]>('=');
assert.deepStrictEqual(result, [1, 2, 3]);
