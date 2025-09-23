// Example: src/array/array-utils.mts (isEmpty)
import { Arr } from 'ts-data-forge';

const emptyArray: readonly number[] = [];
const numbers = [1, 2, 3] as const;

const emptyCheck = Arr.isEmpty(emptyArray);
const nonEmptyCheck = Arr.isEmpty(numbers);

const describe = (values: readonly number[]) =>
  Arr.isEmpty(values) ? 'empty' : `size=${values.length}`;

assert.strictEqual(describe(emptyArray), 'empty');
assert.strictEqual(describe(numbers), 'size=3');
assert.deepStrictEqual(emptyArray, []);
assert.strictEqual(emptyCheck, true);
assert.strictEqual(nonEmptyCheck, false);
