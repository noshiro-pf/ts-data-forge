// Example: src/array/array-utils.mts (range)
import { Arr } from 'ts-data-forge';

const oneToFour = Arr.range(1, 5);
const evens = Arr.range(0, 10, 2);
const countdown = Arr.range(5, 0, -1);
const empty = Arr.range(3, 3);

assert.deepStrictEqual(countdown, [5, 4, 3, 2, 1] as unknown);
assert.deepStrictEqual(empty, [] as unknown);
assert.deepStrictEqual(evens, [0, 2, 4, 6, 8] as unknown);
assert.deepStrictEqual(oneToFour, [1, 2, 3, 4] as unknown);
