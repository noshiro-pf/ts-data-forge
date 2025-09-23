// Example: src/array/array-utils.mts (indexOf)
import { Arr } from 'ts-data-forge';

const values: readonly string[] = ['a', 'b', 'c', 'b'];
const firstB = Arr.indexOf(values, 'b');
const missing = Arr.indexOf(values, 'z');

const lettersResult = Arr.indexOf('b')(['x', 'y', 'b']);

assert.strictEqual(firstB, 1);
assert.strictEqual(lettersResult, 2);
assert.strictEqual(missing, -1);
assert.deepStrictEqual(values, ['a', 'b', 'c', 'b']);
