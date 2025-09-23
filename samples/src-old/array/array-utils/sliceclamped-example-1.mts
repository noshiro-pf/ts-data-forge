// Example: src/array/array-utils.mts (sliceClamped)
import { Arr } from 'ts-data-forge';

const numbers: readonly number[] = [10, 20, 30, 40, 50];
const middle = Arr.sliceClamped(numbers, 1, 4);
const fromStart = Arr.sliceClamped(numbers, 0, 2);
const pastEnd = Arr.sliceClamped(numbers, 2, 10);

assert.deepStrictEqual(fromStart, [10, 20]);
assert.deepStrictEqual(middle, [20, 30, 40]);
assert.deepStrictEqual(numbers, [10, 20, 30, 40, 50]);
assert.deepStrictEqual(pastEnd, [30, 40, 50]);
