// Example: src/array/array-utils.mts (concat)
import { Arr, expectType } from 'ts-data-forge';

const concatenated = Arr.concat([1, 2], [3, 4]);
expectType<typeof concatenated, readonly [1, 2, 3, 4]>('=');
assert.deepStrictEqual(concatenated, [1, 2, 3, 4]);

const rightOnly = Arr.concat([], [1, 2]);
expectType<typeof rightOnly, readonly [1, 2]>('=');
assert.deepStrictEqual(rightOnly, [1, 2]);

const leftOnly = Arr.concat([1, 2], []);
expectType<typeof leftOnly, readonly [1, 2]>('=');
assert.deepStrictEqual(leftOnly, [1, 2]);
