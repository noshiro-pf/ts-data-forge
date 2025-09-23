// Example: src/array/array-utils.mts (zeros)
import { Arr } from 'ts-data-forge';

const emptyZeros = Arr.zeros(0);
const threeZeros = Arr.zeros(3);

assert.deepStrictEqual(emptyZeros, []);
assert.deepStrictEqual(threeZeros, [0, 0, 0]);
