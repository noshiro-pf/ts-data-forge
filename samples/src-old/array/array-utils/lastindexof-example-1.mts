// Example: src/array/array-utils.mts (lastIndexOf)
import { Arr } from 'ts-data-forge';

const values: readonly string[] = ['a', 'b', 'c', 'b'];
const lastB = Arr.lastIndexOf(values, 'b');
const missing = Arr.lastIndexOf(values, 'z');

const numbers = [1, 2, 3, 2, 1] as const;
const lastTwo = Arr.lastIndexOf(numbers, 2);

assert.strictEqual(lastB, 3);
assert.strictEqual(lastTwo, 3);
assert.strictEqual(missing, -1);
assert.deepStrictEqual(numbers, [1, 2, 3, 2, 1]);
assert.deepStrictEqual(values, ['a', 'b', 'c', 'b']);
