// Example: src/array/array-utils.mts (newArray)
import { Arr } from 'ts-data-forge';

const threeZeros = Arr.newArray(3, 0);
const greetings = Arr.newArray(2, 'hi');

assert.deepStrictEqual(threeZeros, [0, 0, 0]);
assert.deepStrictEqual(greetings, ['hi', 'hi']);
