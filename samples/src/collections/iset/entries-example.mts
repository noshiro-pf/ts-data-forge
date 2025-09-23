// Example: src/collections/iset.mts (entries)
import { ISet } from 'ts-data-forge';

const set = ISet.create(['red', 'blue']);

const entries = Array.from(set.entries());

assert.deepStrictEqual(entries, [
  ['red', 'red'],
  ['blue', 'blue'],
]);
