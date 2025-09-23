// Example: src/collections/imap.mts (equal)
import { IMap } from 'ts-data-forge';

const first = IMap.create<'a' | 'b', number>([
  ['a', 1],
  ['b', 2],
]);

const second = IMap.create<'a' | 'b', number>([
  ['b', 2],
  ['a', 1],
]);

const third = IMap.create<'a' | 'b', number>([
  ['a', 1],
  ['b', 3],
]);

assert.strictEqual(IMap.equal(first, second), true);
assert.strictEqual(IMap.equal(first, third), false);
