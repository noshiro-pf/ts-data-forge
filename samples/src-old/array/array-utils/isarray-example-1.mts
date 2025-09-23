// Example: src/array/array-utils.mts (isArray)
import { Arr } from 'ts-data-forge';

const values = [1, 2, 3] as const;
const isArray = Arr.isArray(values);

assert.strictEqual(isArray, true);
assert.deepStrictEqual(values, [1, 2, 3]);
