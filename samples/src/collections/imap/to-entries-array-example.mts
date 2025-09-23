// Example: src/collections/imap.mts (toEntriesArray)
import { IMap } from 'ts-data-forge';

const entries = [
  ['a', 1],
  ['b', 2],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

assert.deepStrictEqual(map.toEntriesArray(), [
  ['a', 1],
  ['b', 2],
]);
