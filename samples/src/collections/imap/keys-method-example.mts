// Example: src/collections/imap.mts (keys)
import { IMap } from 'ts-data-forge';

// embed-sample-code-ignore-above
const entries = [
  ['a', 1],
  ['b', 2],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

const keys = Array.from(map.keys());

assert.deepStrictEqual(keys, ['a', 'b']);
