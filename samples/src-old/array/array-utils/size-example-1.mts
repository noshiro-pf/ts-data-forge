// Example: src/array/array-utils.mts (size)
import { Arr } from 'ts-data-forge';

const tuple = ['a', 'b', 'c'] as const;
const numbers: readonly number[] = [1, 2, 3, 4];

const tupleSize = Arr.size(tuple);
const numberSize = Arr.size(numbers);
const emptySize = Arr.size([]);

assert.strictEqual(emptySize, 0);
assert.strictEqual(numberSize, 4);
assert.deepStrictEqual(numbers, [1, 2, 3, 4]);
assert.deepStrictEqual(tuple, ['a', 'b', 'c']);
assert.strictEqual(tupleSize, 3);
