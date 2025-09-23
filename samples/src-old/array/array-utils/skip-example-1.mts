// Example: src/array/array-utils.mts (skip)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Regular usage
const skipped = Arr.skip([1, 2, 3, 4], 2);
expectType<typeof skipped, readonly [3, 4]>('=');
assert.deepStrictEqual(skipped, [3, 4]);

// Curried usage for pipe composition
const skipFirst2 = Arr.skip(2);
const result = pipe([1, 2, 3, 4, 5]).map(skipFirst2).value;
expectType<typeof result, readonly [3, 4, 5]>('=');
assert.deepStrictEqual(result, [3, 4, 5]);
