// Example: src/array/array-utils.mts (butLast)
import { Arr, expectType } from 'ts-data-forge';

const trimmed = Arr.butLast([1, 2, 3]);
expectType<typeof trimmed, readonly [1, 2]>('=');
assert.deepStrictEqual(trimmed, [1, 2]);

const dropLastSingle = Arr.butLast([1]);
expectType<typeof dropLastSingle, readonly []>('=');
assert.deepStrictEqual(dropLastSingle, []);

const dropLastEmpty = Arr.butLast([]);
expectType<typeof dropLastEmpty, readonly []>('=');
assert.deepStrictEqual(dropLastEmpty, []);
