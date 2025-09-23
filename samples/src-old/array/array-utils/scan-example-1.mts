// Example: src/array/array-utils.mts (scan)
import { Arr } from 'ts-data-forge';

const numbers = [1, 2, 3, 4] as const;
const runningTotal = Arr.scan(numbers, (acc, value) => acc + value, 0);
const runningProduct = Arr.scan(numbers, (acc, value) => acc * value, 1);

const strings = ['a', 'b', 'c'] as const;
const prefixes = Arr.scan(strings, (acc, value) => acc + value, '');

assert.deepStrictEqual(numbers, [1, 2, 3, 4]);
assert.deepStrictEqual(prefixes, ['', 'a', 'ab', 'abc']);
assert.deepStrictEqual(runningProduct, [1, 1, 2, 6, 24]);
assert.deepStrictEqual(runningTotal, [0, 1, 3, 6, 10]);
assert.deepStrictEqual(strings, ['a', 'b', 'c']);
