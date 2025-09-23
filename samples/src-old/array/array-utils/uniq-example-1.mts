// Example: src/array/array-utils.mts (uniq)
import { Arr, expectType } from 'ts-data-forge';

const uniqueNumbers = Arr.uniq([1, 2, 2, 3, 1, 4]);
expectType<typeof uniqueNumbers, NonEmptyArray<1 | 2 | 3 | 4>>('=');
assert.deepStrictEqual(uniqueNumbers, [1, 2, 3, 4]);
