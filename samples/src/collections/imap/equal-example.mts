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

assert.isOk(IMap.equal(first, second));
assert.isNotOk(IMap.equal(first, third));
