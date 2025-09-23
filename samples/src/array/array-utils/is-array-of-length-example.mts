// Example: src/array/array-utils.mts (isArrayOfLength)
import { Arr } from 'ts-data-forge';

const pair: readonly number[] = [1, 2];
const triple: readonly number[] = [1, 2, 3];

assert.strictEqual(Arr.isArrayOfLength(pair, 2), true);
assert.strictEqual(Arr.isArrayOfLength(triple, 2), false);

if (Arr.isArrayOfLength(pair, 2)) {
  assert.deepStrictEqual(pair, [1, 2]);
}
