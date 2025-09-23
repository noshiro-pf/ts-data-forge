// Example: src/array/array-utils.mts (seq)
import { Arr } from 'ts-data-forge';

const firstFour = Arr.seq(4);
const firstTwo = Arr.seq(2);
const empty = Arr.seq(0);

assert.deepStrictEqual(empty, []);
assert.deepStrictEqual(firstFour, [0, 1, 2, 3]);
assert.deepStrictEqual(firstTwo, [0, 1]);
