// Example: src/array/array-utils.mts (zeros)
import { Arr } from 'ts-data-forge';

const threeZeros = Arr.zeros(3);
const empty = Arr.zeros(0);
const count = 2;
const runtime = Arr.zeros(count);

assert.strictEqual(count, 2);
assert.deepStrictEqual(empty, []);
assert.deepStrictEqual(runtime, [0, 0]);
assert.deepStrictEqual(threeZeros, [0, 0, 0]);
