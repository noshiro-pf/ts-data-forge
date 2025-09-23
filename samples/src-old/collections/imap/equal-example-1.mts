// Example: src/collections/imap.mts
import { IMap, Optional } from 'ts-data-forge';

const map = IMap.create<string, number>([
  ['a', 1],
  ['b', 2],
]);

const updated = map.set('b', 3);
const value = Optional.unwrapOr(updated.get('a'), 0);

assert.strictEqual(updated.has('a'), true);
assert.strictEqual(updated.has('c'), false);
assert.strictEqual(updated.size, 2);
assert.strictEqual(value, 1);
assert.deepStrictEqual(updated.toValuesArray(), [1, 3]);
