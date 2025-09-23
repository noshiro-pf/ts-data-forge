// Example: src/array/array-utils.mts (findIndex)
import { Arr } from 'ts-data-forge';

const numbers: readonly number[] = [1, 3, 5, 8, 13];
const firstEven = Arr.findIndex(numbers, (value) => value % 2 === 0);
const greaterThanTen = Arr.findIndex(numbers, (value) => value > 10);

const fruits: readonly string[] = ['apple', 'banana', 'cherry'];
const startsWithB = Arr.findIndex(fruits, (fruit) => fruit.startsWith('b'));
const startsWithZ = Arr.findIndex(fruits, (fruit) => fruit.startsWith('z'));

const firstEvenElement = firstEven !== -1 ? numbers[firstEven] : undefined;
const fallbackIndex = Math.max(greaterThanTen, 0);

assert.strictEqual(fallbackIndex, 4);
assert.strictEqual(firstEven, 3);
assert.strictEqual(firstEvenElement, 8);
assert.deepStrictEqual(fruits, ['apple', 'banana', 'cherry']);
assert.strictEqual(greaterThanTen, 4);
assert.deepStrictEqual(numbers, [1, 3, 5, 8, 13]);
assert.strictEqual(startsWithB, 1);
assert.strictEqual(startsWithZ, -1);
