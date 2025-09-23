// Example: src/array/array-utils.mts (isArray)
import { Arr } from 'ts-data-forge';

const maybeArray: unknown = [1, 2, 3];
const maybeValue: unknown = 'Ada';

assert.strictEqual(Arr.isArray(maybeArray), true);
assert.strictEqual(Arr.isArray(maybeValue), false);

if (Arr.isArray(maybeArray)) {
  assert.deepStrictEqual(maybeArray, [1, 2, 3]);
}
