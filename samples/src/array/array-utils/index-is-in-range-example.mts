// Example: src/array/array-utils.mts (indexIsInRange)
import { Arr } from 'ts-data-forge';

const items = ['Ada', 'Grace', 'Katherine'] as const;

assert.strictEqual(Arr.indexIsInRange(items, 1), true);
assert.strictEqual(Arr.indexIsInRange(items, 3), false);

if (Arr.indexIsInRange(items, 2)) {
  assert.strictEqual(items[2], 'Katherine');
}
