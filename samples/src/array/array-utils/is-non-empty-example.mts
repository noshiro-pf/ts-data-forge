// Example: src/array/array-utils.mts (isNonEmpty)
import { Arr } from 'ts-data-forge';

const users: readonly { id: number }[] = [{ id: 1 }];
const emptyUsers: readonly { id: number }[] = [];

assert.strictEqual(Arr.isNonEmpty(users), true);
assert.strictEqual(Arr.isNonEmpty(emptyUsers), false);

if (Arr.isNonEmpty(users)) {
  assert.deepStrictEqual(users[0], { id: 1 });
}
