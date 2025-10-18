// Example: src/collections/imap.mts (values)
import { IMap } from 'ts-data-forge';

// embed-sample-code-ignore-above
const entries = [
  ['a', 1],
  ['b', 2],
] satisfies readonly (readonly [string, number])[];

const map = IMap.create(entries);

const values = Array.from(map.values());

assert.deepStrictEqual(values, [1, 2]);
