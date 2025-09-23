// Example: src/array/array-utils.mts (isArrayAtLeastLength)
import { Arr, expectType } from 'ts-data-forge';

const arr: readonly number[] = [1, 2, 3];

assert(Arr.isArrayAtLeastLength(arr, 2));
// arr is now typed as readonly [number, number, ...number[]]
expectType<typeof arr, readonly [number, number, ...number[]]>('=');

assert.notOk(Arr.isArrayAtLeastLength([1], 2));
