// Example: src/array/array-utils.mts (isArrayOfLength)
import { Arr, expectType } from 'ts-data-forge';

const arr: readonly number[] = [1, 2, 3];

assert(Arr.isArrayOfLength(arr, 3));

// arr is now typed as readonly [number, number, number]
expectType<typeof arr, readonly [number, number, number]>('=');

assert.notOk(Arr.isArrayOfLength([1, 2], 3));
