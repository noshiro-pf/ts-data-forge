// Example: src/array/array-utils.mts (isEmpty)
import { Arr } from 'ts-data-forge';

const emptyNumbers: readonly number[] = [] as const;
const words = ['Ada', 'Lovelace'] as const;

assert.strictEqual(Arr.isEmpty(emptyNumbers), true);
assert.strictEqual(Arr.isEmpty(words), false);

if (Arr.isEmpty(emptyNumbers)) {
  assert.deepStrictEqual(emptyNumbers, []);
}
