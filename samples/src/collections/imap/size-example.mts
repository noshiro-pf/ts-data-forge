// Example: src/collections/imap.mts (size)
import { IMap } from 'ts-data-forge';

const entries = [
  ['a', 1],
  ['b', 2],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

assert.strictEqual(map.size, 2);
