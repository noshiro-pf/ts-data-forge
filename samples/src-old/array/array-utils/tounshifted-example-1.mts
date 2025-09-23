// Example: src/array/array-utils.mts (toUnshifted)
import { Arr, expectType, pipe } from 'ts-data-forge';

// Regular usage
const unshifted = Arr.toUnshifted([1, 2], 0);
expectType<typeof unshifted, readonly [0, 1, 2]>('=');
assert.deepStrictEqual(unshifted, [0, 1, 2]);

// Curried usage for pipe composition
const prependZero = Arr.toUnshifted(0);
const result = pipe([1, 2, 3]).map(prependZero).value;
expectType<typeof result, readonly [0, 1, 2, 3]>('=');
assert.deepStrictEqual(result, [0, 1, 2, 3]);
